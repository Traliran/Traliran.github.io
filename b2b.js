/* B2B page: theme toggle + full EN/RU language switch. Content uses data-i18n keys, like index and blog pages. */
(function () {
    'use strict';

    var labels = {
        en: {
            nav_ecosystem: 'Ecosystem', nav_about: 'About', nav_news: 'News', nav_blog: 'Blog', nav_b2b: 'B2B',
            b2b_badge: '🛠️ Custom Builds & B2B',
            b2b_title: 'Custom Builds, B2B Deployments & Integrations',
            b2b_subtitle: 'is 100% free and open-source under the AGPLv3 license. If you are a team, agency, or Web3 project that needs a ready-to-use, zero-server AI workspace tailored to your internal workflows without spending weeks on configuration — I provide custom turn-key deployments.',
            b2b_order: 'Order Custom Build ↗',
            b2b_view_services: 'View services ↓',
            b2b_services_title: 'Available B2B Services',
            b2b_services_sub: 'Pay once for implementation, use forever with your own API keys.',
            b2b_t1_title: 'Branded Workspace',
            b2b_t1_f1t: 'Custom UI Branding:',
            b2b_t1_f1d: 'your company logo, color palette, and custom styling.',
            b2b_t1_f2t: 'Team Prompt Library:',
            b2b_t1_f2d: "pre-configured system prompts and templates tailored for your team's everyday tasks.",
            b2b_t2_title: 'Self-Hosted Hub + Python/SQLite Sync',
            b2b_t2_f1: 'Everything in Branded Workspace.',
            b2b_t2_f2t: 'Lightweight Local Backend:',
            b2b_t2_f2d: 'fast Python + SQLite micro-service for optional internal history and prompt synchronization between team members without third-party SaaS dependency.',
            b2b_t3_title: 'Custom Feature Development',
            b2b_t3_f1: 'Specialized sandbox environments.',
            b2b_t3_f2: 'Custom API integrations, data parsers, or specific export/import formats.',
            b2b_privacy_title: 'Privacy & Infrastructure',
            b2b_p1_title: '100% Client-Side / Zero-Server Footprint',
            b2b_p1_text: "API keys and sensitive prompts stay in your team's local browser storage (IndexedDB) or local SQLite DB.",
            b2b_p2_title: 'Zero Monthly SaaS Fees',
            b2b_p2_text: 'Pay once for implementation, use forever with your own API keys (OpenAI, Anthropic, OpenRouter, Ollama, etc.).',
            b2b_steps_title: 'How to Order',
            b2b_step: 'Step',
            b2b_s1_title: 'Fill out the request form',
            b2b_s1_text: 'Describe your team size, workflow, and what you need.',
            b2b_form_link: 'Order Custom Build (Google Forms) ↗',
            b2b_s2_title: 'Finalize specs',
            b2b_s2_text: 'We finalize specs & details via Telegram, Discord, or Reddit DM.',
            b2b_s3_title: '50% prepay in crypto',
            b2b_s3_text: 'USDT, USDC, SOL, BTC, ETH.',
            b2b_s4_title: 'Test build in 1–3 days',
            b2b_s4_text: 'Build delivered within 1–3 days on a test instance.',
            b2b_s5_title: 'Approval & handover',
            b2b_s5_text: 'Final approval, remaining 50% payment, and transfer of sources / deployment scripts.',
            b2b_cta_title: 'Ready to start?',
            b2b_cta_text: 'Tell me about your workflow — I will reply with specs, timeline, and a fixed quote.',
            b2b_telegram: 'Contact via Telegram ↗'
        },
        ru: {
            nav_ecosystem: 'Экосистема', nav_about: 'Обо мне', nav_news: 'Новости', nav_blog: 'Блог', nav_b2b: 'B2B',
            b2b_badge: '🛠️ Кастомные сборки и B2B',
            b2b_title: 'Кастомные сборки, B2B-внедрения и интеграции',
            b2b_subtitle: '— это 100% бесплатный проект с открытым кодом под лицензией AGPLv3. Если вы команда, агентство или Web3-проект и вам нужно готовое AI-рабочее место без серверов под ваши внутренние процессы, без недель настройки — я делаю внедрения под ключ.',
            b2b_order: 'Заказать сборку ↗',
            b2b_view_services: 'Смотреть услуги ↓',
            b2b_services_title: 'Доступные B2B-услуги',
            b2b_services_sub: 'Оплатите внедрение один раз и пользуйтесь вечно с вашими собственными API-ключами.',
            b2b_t1_title: 'Брендированное рабочее место',
            b2b_t1_f1t: 'Кастомный UI-брендинг:',
            b2b_t1_f1d: 'ваш логотип, фирменная палитра и стили.',
            b2b_t1_f2t: 'Библиотека промптов команды:',
            b2b_t1_f2d: 'готовые системные промпты и шаблоны под повседневные задачи вашей команды.',
            b2b_t2_title: 'Селфхостед-хаб + синхронизация Python/SQLite',
            b2b_t2_f1: 'Всё из тарифа «Брендированное рабочее место».',
            b2b_t2_f2t: 'Лёгкий локальный бэкенд:',
            b2b_t2_f2d: 'быстрый микросервис на Python + SQLite для внутренней истории и синхронизации промптов между участниками команды без сторонних SaaS-зависимостей.',
            b2b_t3_title: 'Кастомная разработка',
            b2b_t3_f1: 'Специализированные песочницы.',
            b2b_t3_f2: 'Кастомные API-интеграции, парсеры данных или нужные форматы экспорта/импорта.',
            b2b_privacy_title: 'Приватность и инфраструктура',
            b2b_p1_title: '100% клиентская архитектура / ноль серверов',
            b2b_p1_text: 'API-ключи и чувствительные промпты хранятся в локальном хранилище браузера вашей команды (IndexedDB) или в локальной SQLite-базе.',
            b2b_p2_title: 'Ноль ежемесячных SaaS-платежей',
            b2b_p2_text: 'Оплатите внедрение один раз и пользуйтесь вечно с вашими собственными API-ключами (OpenAI, Anthropic, OpenRouter, Ollama и др.).',
            b2b_steps_title: 'Как заказать',
            b2b_step: 'Шаг',
            b2b_s1_title: 'Заполните форму заявки',
            b2b_s1_text: 'Опишите размер команды, рабочие процессы и что вам нужно.',
            b2b_form_link: 'Заказать сборку (Google Forms) ↗',
            b2b_s2_title: 'Финализируем ТЗ',
            b2b_s2_text: 'Финализируем ТЗ и детали через Telegram, Discord или Reddit DM.',
            b2b_s3_title: 'Предоплата 50% в крипте',
            b2b_s3_text: 'USDT, USDC, SOL, BTC, ETH.',
            b2b_s4_title: 'Тестовая сборка за 1–3 дня',
            b2b_s4_text: 'Сборка будет готова за 1–3 дня на тестовом инстансе.',
            b2b_s5_title: 'Приёмка и передача',
            b2b_s5_text: 'Финальное подтверждение, оставшиеся 50% оплаты и передача исходников / скриптов деплоя.',
            b2b_cta_title: 'Готовы начать?',
            b2b_cta_text: 'Расскажите о ваших процессах — я отвечу с ТЗ, сроками и фиксированной ценой.',
            b2b_telegram: 'Написать в Telegram ↗'
        }
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
        // Step numbers share one label ("Step N" / "Шаг N").
        document.querySelectorAll('[data-step]').forEach(function (el) {
            el.textContent = dict.b2b_step + ' ' + el.getAttribute('data-step');
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
