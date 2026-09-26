let currentLang = 'ru';
let ecosystemData = null;

document.addEventListener('DOMContentLoaded', () => {
    loadNews();
    loadEcosystemData();
    setupEventListeners();
});

// 1. Загрузка новостей из news.json
async function loadNews() {
    try {
        const response = await fetch('data/news.json');
        const news = await response.json();
        const container = document.getElementById('news-container');
        container.innerHTML = '';

        news.forEach(item => {
            const el = document.createElement('div');
            el.className = 'news-item';
            el.innerHTML = `
                <div class="news-date">${item.date}</div>
                <div class="news-body">
                    <h4>${currentLang === 'ru' ? item.title_ru : item.title_en}</h4>
                    <p>${currentLang === 'ru' ? item.summary_ru : item.summary_en}</p>
                </div>
            `;
            container.appendChild(el);
        });
    } catch (e) {
        console.error('Ошибка загрузки news.json', e);
    }
}

// 2. Загрузка экосистемы из ecosystem.json
async function loadEcosystemData() {
    try {
        const response = await fetch('data/ecosystem.json');
        ecosystemData = await response.json();
    } catch (e) {
        console.error('Ошибка загрузки ecosystem.json', e);
    }
}

// 3. Открытие интерактивной страницы-модалки Traliran AI Hub
function openEcosystemModal() {
    if (!ecosystemData) return;
    const modal = document.getElementById('ecosystem-modal');
    const repoList = document.getElementById('modal-repo-list');

    document.getElementById('modal-hub-desc').innerText =
        currentLang === 'ru' ? ecosystemData.hub.description_ru : ecosystemData.hub.description_en;

    repoList.innerHTML = '';
    ecosystemData.hub.repositories.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.marginBottom = '20px';

        let screenshotsHTML = repo.screenshots.map(s => `<img src="${s}" onerror="this.src='https://placehold.co/500x250/1e1e2e/cba6f7?text=${repo.name}'">`).join('');

        card.innerHTML = `
            <h3>${repo.name} <span class="badge">${repo.type}</span></h3>
            <p style="margin: 10px 0;">${currentLang === 'ru' ? repo.desc_ru : repo.desc_en}</p>
            <div class="card-gallery-preview">${screenshotsHTML}</div>
            <div style="margin-top: 15px;">
                <a href="${repo.url}" target="_blank" class="btn btn-sm btn-primary">Repository ↗</a>
                ${repo.demo ? `<a href="${repo.demo}" target="_blank" class="btn btn-sm btn-secondary">Live Demo ↗</a>` : ''}
            </div>
        `;
        repoList.appendChild(card);
    });

    modal.classList.add('active');
}

function closeEcosystemModal(e) {
    if (e.target.id === 'ecosystem-modal') forceCloseModal();
}

function forceCloseModal() {
    document.getElementById('ecosystem-modal').classList.remove('active');
}

// Переключение языков и копирование
function setupEventListeners() {
    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = currentLang === 'ru' ? 'en' : 'ru';
        document.getElementById('lang-toggle').innerText = currentLang.toUpperCase();
        loadNews(); // перерисовать новости
    });
}

function copyCrypto(text) {
    navigator.clipboard.writeText(text);
    alert('Адрес скопирован!');
}
