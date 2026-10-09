/* B2B page: theme toggle + navbar language labels. Page content stays in English. */
(function () {
    'use strict';

    // Navbar labels only — the B2B content itself is English-only by design.
    var labels = {
        en: { nav_ecosystem: 'Ecosystem', nav_about: 'About', nav_news: 'News', nav_blog: 'Blog', nav_b2b: 'B2B' },
        ru: { nav_ecosystem: 'Экосистема', nav_about: 'Обо мне', nav_news: 'Новости', nav_blog: 'Блог', nav_b2b: 'B2B' }
    };

    var lang = 'en';

    function updateThemeIcon(theme) {
        var btn = document.getElementById('theme-toggle');
        if (btn) btn.textContent = theme === 'light' ? '☀️' : '🌙';
    }

    function initTheme() {
        var theme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
    }

    function applyLang(next) {
        lang = next;
        document.documentElement.lang = next;
        var dict = labels[next];
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (dict[key]) el.textContent = dict[key];
        });
        document.getElementById('lang-toggle').textContent = next.toUpperCase();
    }

    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        document.getElementById('theme-toggle').addEventListener('click', function () {
            var cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', cur);
            localStorage.setItem('theme', cur);
            updateThemeIcon(cur);
        });
        document.getElementById('lang-toggle').addEventListener('click', function () {
            applyLang(lang === 'en' ? 'ru' : 'en');
        });
        applyLang('en');
    });
})();
