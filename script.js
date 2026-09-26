let currentLang = 'en'; // default language — English

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadNews();
    setupEventListeners();
});

const i18n = {
    ru: {
        nav_ecosystem: 'Экосистема',
        nav_about: 'Обо мне',
        nav_news: 'Новости',
        hero_badge: '✨ Minimalist Unix & AI Ecosystem',
        hero_title: 'Создаю легкие, высокоскоростные инструменты и приватные ИИ-системы',
        hero_desc: 'Чистый C11, POSIX утилиты, веб-клиенты без серверов-посредников и акцент на абсолютную производительность.',
        btn_view_projects: 'Смотреть проекты ↓',
        title_projects: 'Проекты и Разработки',
        card_taih_desc: 'Лёгкий приватный веб-клиент для LLM прямо в браузере: Groq, Gemini, OpenAI, OpenRouter, DeepSeek, Qwen, GLM, Claude и локальные Ollama / Llama.cpp без посредников.',
        card_drift_desc: 'Специальная редакция AI Hub в эстетике тайлинговых оконных менеджеров: бесконечный десктоп-канвас и workflow для клавиатурных пользователей.',
        card_cli_desc: 'Терминальный интерфейс AI Hub: параллельный бенчмаркинг моделей, Vim-mode и работа с локальными бэкендами прямо из консоли.',
        durank_desc: 'Ультрабыстрый анализатор занятого места на диске. Написан на C11 в одном файле, мгновенно визуализирует структуры папок прямо в терминале.',
        notess_desc: 'Минималистичный десктопный клиент для мгновенной отправки заметок в Memos API v1. Без тяжелых JSON-библиотек и фреймворков.',
        title_about: 'Обо мне и Инженерной философии',
        about_lead: 'Привет! Я Traliran — разработчик программного обеспечения, сфокусированный на создании легковесных системных утилит, приватных инструментов для работы с ИИ.',
        about_body: 'Мой подход основан на снижении системных накладных расходов: я предпочитаю чистый C11, ванильный JavaScript и POSIX-совместимые стандарты громоздким фреймворкам. Всё ПО разрабатывается по принципам Unix — каждая утилита делает одну вещь и делает её максимально быстро.',
        ph_bloat: 'Минимальное потребление ОЗУ, отсутствие тяжелых зависимостей и мгновенный холодный запуск.',
        ph_privacy: 'Прямое взаимодействие клиент-сервер (включая работу с LLM) без сбора метрик и сторонних прокси.',
        title_news: 'Новости и Релизы',
        devto_desc: 'Публикую разборы системного программирования, Arch Linux, написания клиентов C/GTK и тонкостей оптимизации.',
        footer_slogan: 'Crafting lightweight Linux ecosystem & privacy-first AI software.',
        support_title: 'Поддержать разработку ☕',
        support_sub: 'Если мои open-source проекты приносят вам пользу:'
    },
    en: {
        nav_ecosystem: 'Ecosystem',
        nav_about: 'About',
        nav_news: 'News',
        hero_badge: '✨ Minimalist Unix & AI Ecosystem',
        hero_title: 'Building lightweight, high-speed tools and privacy-first AI systems',
        hero_desc: 'Pure C11, POSIX utilities, serverless web clients with zero middlemen and absolute performance focus.',
        btn_view_projects: 'View projects ↓',
        title_projects: 'Projects & Work',
        card_taih_desc: 'Lightweight privacy-first LLM web client running in your browser: Groq, Gemini, OpenAI, OpenRouter, DeepSeek, Qwen, GLM, Claude and local Ollama / Llama.cpp with zero middlemen.',
        card_drift_desc: 'Special AI Hub edition in tiling window manager aesthetics: infinite desktop canvas and keyboard-first workflow.',
        card_cli_desc: 'Terminal-native AI Hub interface: parallel model benchmarking, Vim-mode and local backends right from the console.',
        durank_desc: 'Ultra-fast disk usage analyzer. Single-file C11, instantly visualizes folder structures in the terminal.',
        notess_desc: 'Minimalist desktop client for instant note capture to Memos API v1. No heavy JSON libs or frameworks.',
        title_about: 'About & Engineering Philosophy',
        about_lead: 'Hi! I’m Traliran — a software developer focused on lightweight system utilities, privacy-first AI tools.',
        about_body: 'My approach is about cutting overhead: pure C11, vanilla JavaScript and POSIX standards instead of bloated frameworks. All software follows the Unix way — do one thing and do it fast.',
        ph_bloat: 'Minimal RAM usage, no heavy dependencies and instant cold start.',
        ph_privacy: 'Direct client-server communication (including LLMs) with no metrics collection or third-party proxies.',
        title_news: 'News & Releases',
        devto_desc: 'I write about systems programming, Arch Linux, C/GTK clients and optimization details.',
        footer_slogan: 'Crafting lightweight Linux ecosystem & privacy-first AI software.',
        support_title: 'Support development ☕',
        support_sub: 'If my open-source projects are useful to you:'
    }
};

function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    const dict = i18n[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.innerText = dict[key];
    });
    document.getElementById('lang-toggle').innerText = lang.toUpperCase();
    loadNews();
}

// 1. Загрузка новостей из news.json (с кликабельной ссылкой на проект)
async function loadNews() {
    try {
        const response = await fetch('data/news.json');
        const news = await response.json();
        const container = document.getElementById('news-container');
        if (!container) return;
        container.innerHTML = '';

        news.forEach(item => {
            const el = document.createElement('div');
            el.className = 'news-item';
            el.innerHTML = `
                <div class="news-date">${item.date}</div>
                <div class="news-body">
                    <h4>${currentLang === 'ru' ? item.title_ru : item.title_en}</h4>
                    <p>${currentLang === 'ru' ? item.summary_ru : item.summary_en}</p>
                    ${item.link ? `<a class="news-link" href="${item.link}" target="_blank" rel="noopener">${currentLang === 'ru' ? 'Открыть проект ↗' : 'Open project ↗'}</a>` : ''}
                </div>
            `;
            container.appendChild(el);
        });
    } catch (e) {
        console.error('Ошибка загрузки news.json', e);
    }
}

// Тема: тёмная по умолчанию, светлая по кнопке
function initTheme() {
    const saved = localStorage.getItem('theme');
    const theme = saved || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', cur);
    localStorage.setItem('theme', cur);
    updateThemeIcon(cur);
}

function updateThemeIcon(theme) {
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.innerText = theme === 'light' ? '☀️' : '🌙';
}

function setupEventListeners() {
    document.getElementById('lang-toggle').addEventListener('click', () => {
        applyLang(currentLang === 'en' ? 'ru' : 'en');
    });
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    applyLang('en');
}

async function copyCrypto(text, btn) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
    }
    if (btn) {
        const old = btn.innerText;
        btn.innerText = '✓';
        setTimeout(() => { btn.innerText = old; }, 1200);
    }
}
