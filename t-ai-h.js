/* AI Hub landing: fixed dark theme, EN/RU language switch. Content uses data-i18n keys. */
(function () {
    'use strict';

    var labels = {
        en: {
            nav_home: 'Home',
            nav_features: 'Features',
            nav_ide: 'AI IDE',
            nav_mcp: 'MCP Protocols',
            nav_store: 'Assistant Store',
            nav_launch: 'Launch App',
            hero_badge: 'AGPLv3 Open Source \u2022 100% Serverless & Private',
            hero_title_prefix: 'Your Browser-Powered ',
            hero_title_accent: 'AI Sandbox & IDE',
            hero_sub: 'Connect directly to Groq, Gemini, OpenAI, OpenRouter, DeepSeek, Anthropic, and local LLMs (Ollama/Llama.cpp) without middlemen or server leaks.',
            hero_launch: 'Launch Web App',
            hero_github: 'Star on GitHub',
            hero_shot_alt: 'Traliran AI Hub interface screenshot',
            hero_caption_sub: 'Runs purely client-side in your browser storage.',
            privacy_t1: '100% Client-Side',
            privacy_d1: 'API keys stay strictly in your LocalStorage.',
            privacy_t2: 'Parallel Benchmarking',
            privacy_d2: 'Query multiple models side-by-side simultaneously.',
            privacy_t3: 'MCP Function Calling',
            privacy_d3: 'Connect external tools via Streamable HTTP MCP.',
            features_title: 'Everything you need in a modern AI workspace',
            features_sub: 'Designed for developers, researchers, and power users who demand control and privacy.',
            f1_t: 'Multi-Model Setup & Compare',
            f1_d: 'Select multiple models across different providers (Groq, OpenAI, Claude) and evaluate responses side-by-side instantly.',
            f2_t: 'AI Reasoning & Thinking',
            f2_d: 'Native rendering for reasoning models like DeepSeek-R1. Structural thoughts are organized into collapsible dropdowns.',
            f3_t: 'AI Group Debate Mode',
            f3_d: 'Run multi-agent discussion loops where specialized personas (Optimist, Critic, Technologist) cross-examine your thesis.',
            f4_t: 'Full In-Browser AI IDE',
            f4_d: 'Manage multi-file projects, edit code with syntax highlighting, preview HTML/JS live in an iframe, and export as ZIP.',
            f5_t: 'Model Context Protocol (MCP)',
            f5_d: 'Connect remote MCP servers over Streamable HTTP and expose dynamic tools to the AI agent loop seamlessly.',
            f6_t: 'Local Backends Support',
            f6_d: 'Easily hook up local instances of Ollama or Llama.cpp to run fully offline models without internet dependencies.',
            store_title: 'Assistant Store & Custom Presets',
            store_sub: 'Unlock production-ready system prompts and specialized configurations for scriptwriters, developers, and creators for just $4 \u2013 $6.',
            store_badge: 'Exclusive Presets',
            store_card_title: 'Pro Prompt Bundles',
            store_card_sub: 'Skip hours of prompt tuning and get fine-tuned workflows instantly.',
            store_price_suffix: '/ preset pack',
            store_li1: 'Advanced System Prompts',
            store_li2: 'Optimized Code & Text Editors',
            store_li3: 'Ideation & Content Creator Bots',
            store_cta: 'Explore Store in App',
            footer_repo: 'GitHub Repository',
            footer_b2b: 'B2B Custom Builds',
            footer_contact: 'Contact / Order',
            footer_copy: '\u00A9 2025 Traliran AI Hub. Privacy First.'
        },
        ru: {
            nav_home: '\u0413\u043B\u0430\u0432\u043D\u0430\u044F',
            nav_features: '\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438',
            nav_ide: 'AI IDE',
            nav_mcp: 'MCP-\u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u044B',
            nav_store: '\u041C\u0430\u0433\u0430\u0437\u0438\u043D \u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043D\u0442\u043E\u0432',
            nav_launch: '\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C',
            hero_badge: 'AGPLv3 Open Source \u2022 100% \u0431\u0435\u0437 \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u0432 \u0438 \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u043E',
            hero_title_prefix: '\u0412\u0430\u0448\u0430 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u043D\u0430\u044F ',
            hero_title_accent: 'AI-\u043F\u0435\u0441\u043E\u0447\u043D\u0438\u0446\u0430 \u0438 IDE',
            hero_sub: '\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0430\u0439\u0442\u0435\u0441\u044C \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E \u043A Groq, Gemini, OpenAI, OpenRouter, DeepSeek, Anthropic \u0438 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u043C LLM (Ollama/Llama.cpp) \u0431\u0435\u0437 \u043F\u043E\u0441\u0440\u0435\u0434\u043D\u0438\u043A\u043E\u0432 \u0438 \u0443\u0442\u0435\u0447\u0435\u043A \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u044B.',
            hero_launch: '\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0432\u0435\u0431-\u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435',
            hero_github: '\u0417\u0432\u0435\u0437\u0434\u0430 \u043D\u0430 GitHub',
            hero_shot_alt: '\u0421\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430 Traliran AI Hub',
            hero_caption_sub: '\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435 \u0438 \u0435\u0433\u043E \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435.',
            privacy_t1: '100% \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435',
            privacy_d1: 'API-\u043A\u043B\u044E\u0447\u0438 \u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u0432\u0430\u0448\u0435\u043C LocalStorage.',
            privacy_t2: '\u041F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u044B\u0439 \u0431\u0435\u043D\u0447\u043C\u043C\u0430\u0440\u043A\u0438\u043D\u0433',
            privacy_d2: '\u0417\u0430\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u0439\u0442\u0435 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u043F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u043E, \u0431\u043E\u043A \u043E \u0431\u043E\u043A.',
            privacy_t3: 'MCP-\u0432\u044B\u0437\u043E\u0432\u044B \u0444\u0443\u043D\u043A\u0446\u0438\u0439',
            privacy_d3: '\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0430\u0439\u0442\u0435 \u0432\u043D\u0435\u0448\u043D\u0438\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0447\u0435\u0440\u0435\u0437 Streamable HTTP MCP.',
            features_title: '\u0412\u0441\u0451 \u043D\u0443\u0436\u043D\u043E\u0435 \u0434\u043B\u044F \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0433\u043E AI-\u0432\u043E\u0440\u043A\u0441\u043F\u0435\u0439\u0441\u0430',
            features_sub: '\u0414\u043B\u044F \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u043E\u0432, \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u0438 \u043F\u0440\u043E\u0434\u0432\u0438\u043D\u0443\u0442\u044B\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439, \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u0432\u0430\u0436\u043D\u044B \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0438 \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u043E\u0441\u0442\u044C.',
            f1_t: '\u041C\u0443\u043B\u044C\u0442\u0438\u043C\u043E\u0434\u0435\u043B\u044C\u043D\u043E\u0435 \u0441\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435',
            f1_d: '\u0412\u044B\u0431\u0438\u0440\u0430\u0439\u0442\u0435 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u0440\u0430\u0437\u043D\u044B\u0445 \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u043E\u0432 (Groq, OpenAI, Claude) \u0438 \u0441\u0440\u0430\u0432\u043D\u0438\u0432\u0430\u0439\u0442\u0435 \u043E\u0442\u0432\u0435\u0442\u044B \u0431\u043E\u043A \u043E \u0431\u043E\u043A \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438.',
            f2_t: '\u0420\u0430\u0441\u0441\u0443\u0436\u0434\u0435\u043D\u0438\u044F \u0418\u0418',
            f2_d: '\u041D\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0440\u0435\u043D\u0434\u0435\u0440 reasoning-\u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u0432\u0440\u043E\u0434\u0435 DeepSeek-R1. \u0426\u0435\u043F\u043E\u0447\u043A\u0438 \u043C\u044B\u0441\u043B\u0435\u0439 \u0441\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0432 \u0441\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u0435\u043C\u044B\u0435 \u0431\u043B\u043E\u043A\u0438.',
            f3_t: '\u0413\u0440\u0443\u043F\u043F\u043E\u0432\u044B\u0435 \u0434\u0435\u0431\u0430\u0442\u044B \u0418\u0418',
            f3_d: '\u0417\u0430\u043F\u0443\u0441\u043A\u0430\u0439\u0442\u0435 \u043C\u0443\u043B\u044C\u0442\u0438\u0430\u0433\u0435\u043D\u0442\u043D\u044B\u0435 \u043E\u0431\u0441\u0443\u0436\u0434\u0435\u043D\u0438\u044F, \u0433\u0434\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u044B (\u041E\u043F\u0442\u0438\u043C\u0438\u0441\u0442, \u041A\u0440\u0438\u0442\u0438\u043A, \u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433) \u0441\u043F\u043E\u0440\u044F\u0442 \u043D\u0430\u0434 \u0432\u0430\u0448\u0438\u043C \u0442\u0435\u0437\u0438\u0441\u043E\u043C.',
            f4_t: '\u041F\u043E\u043B\u043D\u043E\u0446\u0435\u043D\u043D\u0430\u044F AI IDE \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435',
            f4_d: '\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0442\u0435 \u043C\u043D\u043E\u0433\u043E\u0444\u0430\u0439\u043B\u043E\u0432\u044B\u043C\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u043C\u0438, \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u043A\u043E\u0434 \u0441 \u043F\u043E\u0434\u0441\u0432\u0435\u0442\u043A\u043E\u0439, \u043F\u0440\u0435\u0432\u044C\u044E HTML/JS \u0432 iframe \u0438 \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u0432 ZIP.',
            f5_t: 'Model Context Protocol (MCP)',
            f5_d: '\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0430\u0439\u0442\u0435 \u0443\u0434\u0430\u043B\u0451\u043D\u043D\u044B\u0435 MCP-\u0441\u0435\u0440\u0432\u0435\u0440\u044B \u043F\u043E Streamable HTTP \u0438 \u0434\u0430\u0432\u0430\u0439\u0442\u0435 \u0434\u0438\u043D\u0430\u043C\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0430\u0433\u0435\u043D\u0442\u0441\u043A\u043E\u043C\u0443 \u0446\u0438\u043A\u043B\u0443.',
            f6_t: '\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0445 \u0431\u044D\u043A\u0435\u043D\u0434\u043E\u0432',
            f6_d: '\u041B\u0435\u0433\u043A\u043E \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0430\u0439\u0442\u0435 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 Ollama \u0438\u043B\u0438 Llama.cpp \u0434\u043B\u044F \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u043E\u0444\u043B\u0430\u0439\u043D-\u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u0431\u0435\u0437 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0438 \u043E\u0442 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442\u0430.',
            store_title: '\u041C\u0430\u0433\u0430\u0437\u0438\u043D \u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043D\u0442\u043E\u0432 \u0438 \u043F\u0440\u0435\u0441\u0435\u0442\u043E\u0432',
            store_sub: '\u0413\u043E\u0442\u043E\u0432\u044B\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0435 \u043F\u0440\u043E\u043C\u043F\u0442\u044B \u0438 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438 \u0434\u043B\u044F \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0441\u0442\u043E\u0432, \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u043E\u0432 \u0438 \u043A\u0440\u0435\u0430\u0442\u043E\u0440\u043E\u0432 \u0432\u0441\u0435\u0433\u043E \u0437\u0430 $4 \u2013 $6.',
            store_badge: '\u042D\u043A\u0441\u043A\u043B\u044E\u0437\u0438\u0432\u043D\u044B\u0435 \u043F\u0440\u0435\u0441\u0435\u0442\u044B',
            store_card_title: 'Pro-\u043D\u0430\u0431\u043E\u0440\u044B \u043F\u0440\u043E\u043C\u043F\u0442\u043E\u0432',
            store_card_sub: '\u041D\u0435 \u0442\u0440\u0430\u0442\u044C\u0442\u0435 \u0447\u0430\u0441\u044B \u043D\u0430 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0443 \u043F\u0440\u043E\u043C\u043F\u0442\u043E\u0432 \u2014 \u0437\u0430\u0431\u0438\u0440\u0430\u0439\u0442\u0435 \u0433\u043E\u0442\u043E\u0432\u044B\u0435 workflow.',
            store_price_suffix: '/ \u0437\u0430 \u043D\u0430\u0431\u043E\u0440',
            store_li1: '\u041F\u0440\u043E\u0434\u0432\u0438\u043D\u0443\u0442\u044B\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0435 \u043F\u0440\u043E\u043C\u043F\u0442\u044B',
            store_li2: '\u041E\u043F\u0442\u0438\u043C\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u044B \u043A\u043E\u0434\u0430 \u0438 \u0442\u0435\u043A\u0441\u0442\u0430',
            store_li3: '\u0411\u043E\u0442\u044B \u0434\u043B\u044F \u0438\u0434\u0435\u0439 \u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430',
            store_cta: '\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043C\u0430\u0433\u0430\u0437\u0438\u043D \u0432 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438',
            footer_repo: 'GitHub-\u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439',
            footer_b2b: 'B2B-\u0441\u0431\u043E\u0440\u043A\u0438',
            footer_contact: '\u041A\u043E\u043D\u0442\u0430\u043A\u0442 / \u0417\u0430\u043A\u0430\u0437',
            footer_copy: '\u00A9 2025 Traliran AI Hub. \u041F\u0440\u0438\u0432\u0430\u0442\u043D\u043E\u0441\u0442\u044C \u043F\u0440\u0435\u0436\u0434\u0435 \u0432\u0441\u0435\u0433\u043E.'
        }
    };

    var lang = 'en';

    function applyLang(next) {
        lang = next;
        document.documentElement.lang = next;
        var dict = labels[next];
        // Plain text nodes use textContent to keep markup safe.
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (dict[key]) el.textContent = dict[key];
        });
        // Price line keeps the "$4" amount and swaps only the suffix.
        var suffix = document.getElementById('store-price-suffix');
        if (suffix && dict.store_price_suffix) suffix.textContent = dict.store_price_suffix;
        // Image alt text follows the active language.
        var shot = document.getElementById('hero-shot');
        if (shot && dict.hero_shot_alt) shot.alt = dict.hero_shot_alt;
        document.getElementById('lang-toggle').textContent = next.toUpperCase();
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('lang-toggle').addEventListener('click', function () {
            applyLang(lang === 'en' ? 'ru' : 'en');
        });
        applyLang('en');
    });
})();
