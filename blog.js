/* Blog page: RSS feed reader — full articles on-site, no redirect to dev.to.
 * Source: https://dev.to/feed/traliran (RSS <description> already holds full HTML).
 * Strategy: direct fetch -> CORS proxies -> dev.to REST API fallback. Cache in localStorage.
 */
(function () {
    'use strict';

    var FEED_URL = 'https://dev.to/feed/traliran';
    var API_LIST = 'https://dev.to/api/articles?username=traliran&per_page=30';
    var CACHE_KEY = 'traliran_blog_cache_v1';
    var CACHE_TTL = 30 * 60 * 1000; // 30 min
    var PROXIES = [
        function (u) { return 'https://api.allorigins.win/raw?url=' + encodeURIComponent(u); },
        function (u) { return 'https://corsproxy.io/?url=' + encodeURIComponent(u); },
        function (u) { return 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(u); }
    ];

    var state = { posts: [], currentLang: 'en', openedId: null, scrollY: 0 };

    var i18n = {
        en: {
            nav_ecosystem: 'Ecosystem', nav_about: 'About', nav_news: 'News', nav_blog: 'Blog',
            blog_badge: 'Blog — synced from dev.to RSS',
            blog_title: 'Articles, readable right here',
            blog_refresh: 'Refresh', blog_error: 'Could not load the RSS feed.',
            blog_back: 'All articles', blog_back2: 'All articles',
            search_ph: 'Search articles…', all_tags: 'All tags',
            read: 'Read on-site →', cached: 'cached', updated: 'updated',
            articles: 'articles', copied: '✓ Copied', copy_link: 'Copy link'
        },
        ru: {
            nav_ecosystem: 'Экосистема', nav_about: 'Обо мне', nav_news: 'Новости', nav_blog: 'Блог',
            blog_badge: 'Блог — синхронизация с dev.to RSS',
            blog_title: 'Статьи — читайте прямо здесь',
            blog_refresh: 'Обновить', blog_error: 'Не удалось загрузить RSS-ленту.',
            blog_back: 'Все статьи', blog_back2: 'Все статьи',
            search_ph: 'Поиск по статьям…', all_tags: 'Все теги',
            read: 'Читать на сайте →', cached: 'из кэша', updated: 'обновлено',
            articles: 'статей', copied: '✓ Скопировано', copy_link: 'Скопировать ссылку'
        }
    };

    function $(id) { return document.getElementById(id); }

    function esc(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // Strip scripts / event handlers / iframes from article HTML, keep formatting.
    function sanitize(html) {
        var tpl = document.createElement('template');
        tpl.innerHTML = html;
        tpl.content.querySelectorAll('script, iframe, object, embed, form').forEach(function (n) { n.remove(); });
        tpl.content.querySelectorAll('*').forEach(function (n) {
            Array.prototype.slice.call(n.attributes).forEach(function (a) {
                if (/^on/i.test(a.name) || (a.name === 'href' && /^\s*javascript:/i.test(a.value))) {
                    n.removeAttribute(a.name);
                }
            });
            if (n.tagName === 'A') {
                n.setAttribute('target', '_blank');
                n.setAttribute('rel', 'noopener');
            }
            if (n.tagName === 'IMG') {
                n.setAttribute('loading', 'lazy');
                n.removeAttribute('width'); n.removeAttribute('height');
            }
        });
        return tpl.innerHTML;
    }

    function stripHtml(html) {
        var d = document.createElement('div');
        d.innerHTML = html;
        return (d.textContent || '').replace(/\s+/g, ' ').trim();
    }

    function excerpt(html, n) {
        var t = stripHtml(html);
        n = n || 180;
        return t.length > n ? t.slice(0, n) + '…' : t;
    }

    function fmtDate(pubDate) {
        var d = new Date(pubDate);
        if (isNaN(d.getTime())) return pubDate || '';
        return d.toLocaleDateString(state.currentLang === 'ru' ? 'ru-RU' : 'en-US',
            { year: 'numeric', month: 'short', day: 'numeric' });
    }

    // ---------- RSS parsing ----------

    function parseRss(xmlText) {
        var doc = new DOMParser().parseFromString(xmlText, 'text/xml');
        if (doc.querySelector('parsererror')) throw new Error('bad xml');
        var items = Array.prototype.slice.call(doc.querySelectorAll('item'));
        return items.map(function (it, i) {
            function text(sel) {
                var n = it.querySelector(sel);
                return n ? n.textContent.trim() : '';
            }
            var cats = Array.prototype.slice.call(it.querySelectorAll('category'))
                .map(function (c) { return c.textContent.trim(); }).filter(Boolean);
            var link = text('link') || text('guid');
            var desc = '';
            // description content is escaped HTML — read raw text then it is the HTML
            var dNode = it.querySelector('description');
            if (dNode) desc = dNode.textContent;
            // cover image: media:content / enclosure / first img in body
            var cover = '';
            var enc = it.querySelector('enclosure[url]');
            if (enc) cover = enc.getAttribute('url');
            if (!cover) {
                var m = /<img[^>]+src="([^"]+)"/i.exec(desc);
                if (m) cover = m[1];
            }
            var title = text('title') || 'Untitled';
            return {
                id: 'rss-' + i + '-' + hashStr(link || title),
                title: title,
                link: link,
                pubDate: text('pubDate'),
                tags: cats,
                bodyHtml: desc,
                cover: cover
            };
        });
    }

    function hashStr(s) {
        var h = 0, i;
        for (i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0; }
        return (h >>> 0).toString(36);
    }

    // ---------- Loaders ----------

    function fetchText(url, ms) {
        ms = ms || 12000;
        var ctrl = ('AbortController' in window) ? new AbortController() : null;
        var timer = null;
        var opts = {};
        if (ctrl) { opts.signal = ctrl.signal; timer = setTimeout(function () { ctrl.abort(); }, ms); }
        return fetch(url, opts).then(function (r) {
            if (timer) clearTimeout(timer);
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.text();
        }).catch(function (e) {
            if (timer) clearTimeout(timer);
            throw e;
        });
    }

    function fetchJson(url, ms) {
        return fetchText(url, ms).then(function (t) { return JSON.parse(t); });
    }

    function loadViaRss() {
        var attempts = [FEED_URL].concat(PROXIES.map(function (p) { return p(FEED_URL); }));
        var chain = Promise.reject(new Error('start'));
        attempts.forEach(function (u) {
            chain = chain.catch(function () {
                return fetchText(u).then(function (t) {
                    if (t.trim().charAt(0) !== '<') throw new Error('not xml');
                    return parseRss(t);
                });
            });
        });
        return chain;
    }

    function loadViaApi() {
        return fetchJson(API_LIST).then(function (arr) {
            return (arr || []).map(function (a) {
                return {
                    id: 'api-' + a.id,
                    apiId: a.id,
                    title: a.title,
                    link: a.url,
                    pubDate: a.published_at,
                    tags: a.tag_list || [],
                    bodyHtml: a.description ? '<p>' + esc(a.description) + '</p>' : '',
                    cover: a.cover_image || a.social_image || '',
                    needsFetch: true
                };
            });
        });
    }

    function fetchFullBody(post) {
        if (!post.needsFetch || post.fullLoaded) return Promise.resolve(post);
        return fetchJson('https://dev.to/api/articles/' + post.apiId)
            .then(function (a) {
                if (a && a.body_html) { post.bodyHtml = a.body_html; post.fullLoaded = true; }
                return post;
            })
            .catch(function () { return post; }); // keep description fallback
    }

    // ---------- Cache ----------

    function readCache() {
        try {
            var raw = localStorage.getItem(CACHE_KEY);
            if (!raw) return null;
            var c = JSON.parse(raw);
            if (!c || !c.posts || !c.time) return null;
            return c;
        } catch (e) { return null; }
    }

    function writeCache(posts) {
        try {
            // don't cache unbounded HTML? sizes are modest (~30 posts) — fine
            localStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), posts: posts }));
        } catch (e) { /* quota — ignore */ }
    }

    // ---------- Render ----------

    function allTags() {
        var set = {};
        state.posts.forEach(function (p) { p.tags.forEach(function (t) { set[t] = 1; }); });
        return Object.keys(set).sort();
    }

    function filteredPosts() {
        var q = ($('blog-search').value || '').toLowerCase().trim();
        var tag = $('blog-tag-filter').value;
        return state.posts.filter(function (p) {
            if (tag && p.tags.indexOf(tag) === -1) return false;
            if (!q) return true;
            return (p.title + ' ' + stripHtml(p.bodyHtml) + ' ' + p.tags.join(' ')).toLowerCase().indexOf(q) !== -1;
        });
    }

    function renderTagOptions() {
        var sel = $('blog-tag-filter');
        var cur = sel.value;
        sel.innerHTML = '<option value="">' + esc(i18n[state.currentLang].all_tags) + '</option>' +
            allTags().map(function (t) { return '<option value="' + esc(t) + '">' + esc(t) + '</option>'; }).join('');
        sel.value = cur;
    }

    function renderList() {
        var list = $('blog-list');
        var posts = filteredPosts();
        var t = i18n[state.currentLang];
        list.innerHTML = posts.map(function (p) {
            return '<div class="card blog-card" data-id="' + esc(p.id) + '" tabindex="0" role="button">' +
                (p.cover ? '<div class="blog-cover"><img src="' + esc(p.cover) + '" alt="" loading="lazy"></div>' : '') +
                '<div class="news-date">' + esc(fmtDate(p.pubDate)) + '</div>' +
                '<h3>' + esc(p.title) + '</h3>' +
                '<p>' + esc(excerpt(p.bodyHtml)) + '</p>' +
                (p.tags.length ? '<div class="tags">' + p.tags.map(function (x) {
                    return '<span>' + esc(x) + '</span>';
                }).join('') + '</div>' : '') +
                '<span class="news-link">' + esc(t.read) + '</span>' +
                '</div>';
        }).join('');
        list.querySelectorAll('.blog-card').forEach(function (card) {
            card.addEventListener('click', function () { openPost(card.getAttribute('data-id')); });
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPost(card.getAttribute('data-id')); }
            });
        });
        var upd = readCache();
        $('blog-count').textContent = posts.length + ' ' + t.articles;
        $('blog-updated').textContent = upd ? ' · ' + t.updated + ' ' + new Date(upd.time).toLocaleString() : '';
    }

    function findPost(id) {
        for (var i = 0; i < state.posts.length; i++) {
            if (String(state.posts[i].id) === String(id)) return state.posts[i];
        }
        return null;
    }

    function openPost(id, pushHash) {
        var p = findPost(id);
        if (!p) return;
        state.openedId = id;
        if (!state.scrollY) state.scrollY = window.scrollY;
        openOverlay();
        $('reader-title').textContent = p.title;
        $('reader-date').textContent = fmtDate(p.pubDate);
        $('reader-tags').innerHTML = p.tags.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('');
        $('reader-original').href = p.link;
        $('reader-original-bottom').href = p.link;
        var showBody = function () {
            $('reader-body').innerHTML = sanitize(p.bodyHtml) ||
                '<p><a href="' + esc(p.link) + '" target="_blank" rel="noopener">Open original ↗</a></p>';
            if (p.cover) {
                $('reader-cover-wrap').hidden = false;
                $('reader-cover').src = p.cover;
                $('reader-cover').alt = p.title;
            } else {
                $('reader-cover-wrap').hidden = true;
            }
        };
        $('reader-body').scrollTop = 0;
        $('blog-reader').scrollTop = 0;
        if (p.needsFetch && !p.fullLoaded) {
            $('reader-body').innerHTML = '<p>Loading full text…</p>';
            fetchFullBody(p).then(showBody);
        } else {
            showBody();
        }
        if (pushHash !== false) {
            try { location.hash = 'post-' + encodeURIComponent(id); } catch (e) { /* ignore */ }
        }
    }

    // Reader opens above the page (overlay), list stays untouched underneath.
    function openOverlay() {
        var ov = $('reader-overlay');
        ov.hidden = false;
        document.body.classList.add('reader-open');
        // force reflow so the transition runs on every open
        void ov.offsetWidth;
        ov.classList.add('active');
        $('reader-close').focus();
    }

    function closePost() {
        state.openedId = null;
        var ov = $('reader-overlay');
        ov.classList.remove('active');
        document.body.classList.remove('reader-open');
        var done = function () { ov.hidden = true; };
        if (ov.addEventListener) {
            ov.addEventListener('transitionend', done, { once: true });
            setTimeout(done, 300); // fallback if transition never fires
        } else {
            done();
        }
        try {
            history.replaceState(null, '', location.pathname + location.search);
        } catch (e) { /* ignore */ }
        var y = state.scrollY || 0;
        state.scrollY = 0;
        window.scrollTo({ top: y, behavior: 'auto' });
    }

    // ---------- Boot ----------

    function setLoading(on) { $('blog-loading').hidden = !on; }
    function setError(on) { $('blog-error').hidden = !on; }

    function boot(force) {
        setError(false);
        if (!state.posts.length || force) setLoading(true);
        var cached = readCache();
        var fresh = cached && (Date.now() - cached.time < CACHE_TTL);
        if (cached && cached.posts.length && (fresh || !navigator.onLine) && !force) {
            state.posts = cached.posts;
            setLoading(false);
            renderTagOptions(); renderList();
            openFromHash();
            return;
        }
        if (cached && cached.posts.length && !force) {
            // show stale instantly, refresh in background
            state.posts = cached.posts;
            renderTagOptions(); renderList();
            openFromHash();
        }
        loadViaRss()
            .catch(function () { return loadViaApi(); })
            .then(function (posts) {
                if (!posts || !posts.length) throw new Error('empty');
                state.posts = posts;
                writeCache(posts);
                setLoading(false); setError(false);
                renderTagOptions(); renderList();
                if (state.openedId) openPost(state.openedId, false);
                else openFromHash();
            })
            .catch(function (e) {
                console.error('blog load failed', e);
                setLoading(false);
                if (!state.posts.length) setError(true);
            });
    }

    function openFromHash() {
        var h = (location.hash || '').replace(/^#post-/, '');
        if (h) {
            var id = decodeURIComponent(h);
            if (findPost(id)) { openPost(id, false); return; }
        }
        // hash cleared (browser Back) -> close the overlay
        if (state.openedId) closePost();
    }

    // theme (shared with index via localStorage)
    function initTheme() {
        var theme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
    }
    function updateThemeIcon(theme) {
        var btn = $('theme-toggle');
        if (btn) btn.textContent = theme === 'light' ? '☀️' : '🌙';
    }

    function applyLang(lang) {
        state.currentLang = lang;
        document.documentElement.lang = lang;
        var dict = i18n[lang];
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var k = el.getAttribute('data-i18n');
            if (dict[k]) el.textContent = dict[k];
        });
        $('blog-search').placeholder = dict.search_ph;
        $('lang-toggle').textContent = lang.toUpperCase();
        $('reader-copy').textContent = dict.copy_link;
        renderTagOptions(); renderList();
    }

    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        $('theme-toggle').addEventListener('click', function () {
            var cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', cur);
            localStorage.setItem('theme', cur);
            updateThemeIcon(cur);
        });
        $('lang-toggle').addEventListener('click', function () {
            applyLang(state.currentLang === 'en' ? 'ru' : 'en');
        });
        $('blog-search').addEventListener('input', renderList);
        $('blog-tag-filter').addEventListener('change', renderList);
        $('blog-refresh').addEventListener('click', function () { boot(true); });
        $('blog-retry').addEventListener('click', function () { boot(true); });
        $('reader-back').addEventListener('click', closePost);
        $('reader-back-bottom').addEventListener('click', closePost);
        $('reader-close').addEventListener('click', closePost);
        $('reader-backdrop').addEventListener('click', closePost);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && state.openedId) closePost();
        });
        $('reader-copy').addEventListener('click', function () {
            var url = location.href;
            var done = function () {
                $('reader-copy').textContent = i18n[state.currentLang].copied;
                setTimeout(function () { $('reader-copy').textContent = i18n[state.currentLang].copy_link; }, 1200);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(done, done);
            } else {
                var ta = document.createElement('textarea');
                ta.value = url; document.body.appendChild(ta); ta.select();
                try { document.execCommand('copy'); } catch (e) { /* ignore */ }
                ta.remove(); done();
            }
        });
        window.addEventListener('hashchange', openFromHash);
        applyLang('en');
        boot(false);
    });
})();
