// Generated from site/app/site-interactions.ts by tools/sync_site_interactions.cjs
(function () {
const exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizationExampleMarkup = exports.STEP_RESULTS = exports.CASE_METADATA = exports.CASE_INDUSTRIES = exports.CASE_TASKS = exports.normalizeSearch = exports.HOME_CASES = exports.HOME_CASE_FILTERS = exports.CARD_SUMMARIES = exports.SERVICE_CATALOG_TEXT = exports.SERVICE_SCOPE_TEXT = exports.CERTIFICATION = void 0;
exports.searchPages = searchPages;
exports.caseId = caseId;
exports.caseMatches = caseMatches;
exports.stepCheckMarkup = stepCheckMarkup;
exports.mountSiteInteractions = mountSiteInteractions;
exports.CERTIFICATION = {
    quality: 'ISO 9001:2015',
    it: 'ISO/IEC 20000-1:2018',
    scope: 'Системы менеджмента качества и IT-услуг компаний группы',
    description: 'Сертифицированы системы менеджмента качества по ГОСТ Р ИСО 9001-2015 (ISO 9001:2015) и менеджмента IT-услуг по ISO/IEC 20000-1:2018. Владельцы сертификатов — ООО «Амарант» и ИП Савицкая Е. В.',
};
exports.SERVICE_SCOPE_TEXT = 'Можно заказать отдельную услугу или комплексный проект.';
exports.SERVICE_CATALOG_TEXT = exports.SERVICE_SCOPE_TEXT;
/** Short teasers for catalogue cards; full source descriptions stay searchable. */
exports.CARD_SUMMARIES = {
    'inspection': 'Состояние НСИ, узкие места и план дальнейших работ.',
    'normalization': 'Единые записи, правила сопоставления и качество справочников.',
    'outsourcing-outstaffing': 'Ведение справочников, проверка заявок и поддержка пользователей.',
    'document-processing': 'Проверенные данные из документов и реестры записей.',
    'migration': 'Подготовка, перенос и проверка данных в новой системе.',
    'methodology': 'Правила работы с данными, роли и инструкции.',
    'information-systems': 'Внедрение, развитие и интеграция систем НСИ.',
    'express-servises': 'Диагностика и помощь с отдельными задачами проекта.',
    'bitrix24-implementation': 'CRM и процессы закупок, договоров, поддержки и HR.',
    '7tech-solution': '7TECH MDM: мастер-данные и интеграция через API.',
    'analitics': '1С: Аналитика и Loginom для анализа и обработки данных.',
    'bitrix24-applying': 'Как N-Forma использует Битрикс24 в своей работе.',
    'datareon-solution': 'DATAREON для управления мастер-данными и процессами.',
    'knowledge-space': 'Анализ и моделирование системы НСИ при обследовании.',
    'loginom-platform': 'Возможности Loginom для обработки и проверки НСИ.',
    'mdm-solutions-1c': 'Модель мастер-данных и MDM-решение на базе 1С.',
    'models-and-scenarios-in-loginom': 'Примеры проверки, загрузки и обработки данных в Loginom.',
    'normalization-technology': 'Принципы и ключевые операции нормализации данных.',
    'agile': 'Поэтапная работа с проверкой результатов и уточнением планов.',
    'groups': 'Роли, процессы и поддержка групп ведения НСИ.',
    'itil-outsourcing': 'Ведение НСИ как услуга на основе практик ITIL.',
    'maintenance-variants': 'Сравнение моделей ведения НСИ и их стоимости.',
    'project_framework': 'Состав проекта НСИ в зависимости от задач предприятия.',
    'reference-data': 'Структура справочников, подготовка данных и их ведение.',
    'express-diagnostic': 'Текущее состояние MDM-проекта и ближайшие приоритеты.',
    'mdm-form': 'Оценка зрелости НСИ и потребностей в развитии.',
    'company-history': 'Проекты в области НСИ и мастер-данных с 2006 года.',
    'iso-certificates': 'ISO 9001:2015 и ISO/IEC 20000-1:2018. Сертификаты и владельцы.',
    'our-experience': 'Проекты НСИ и ERP для предприятий разных отраслей.',
    'team': 'Управляющие партнёры и директора N-Forma.',
    'vacancies': 'Актуальные и перспективные вакансии компании.',
    'value': 'Опыт сложных проектов и надёжное ведение НСИ.',
};
exports.HOME_CASE_FILTERS = ['Все', 'Промышленность', 'Образование', 'Авиация и транспорт'];
exports.HOME_CASES = [
    { category: 'Промышленность', tag: 'Промышленные предприятия', title: 'Единая логика справочников для сложного производственного контура', text: 'Нормализация данных, методология и подготовка корпоративных систем к единому управлению НСИ.', visual: 'factory', href: 'https://n-forma.ru/our-cases' },
    { category: 'Образование', tag: 'Научные и образовательные организации', title: 'Методологическая поддержка и развитие системы НСИ', text: 'Настройка правил, ролей и процессов для устойчивой работы с мастер-данными организации.', visual: 'campus', href: 'https://n-forma.ru/our-cases' },
    { category: 'Авиация и транспорт', tag: 'Авиация и транспорт', title: 'Ведение НСИ в корпоративных информационных системах', text: 'Поддержка качества данных, регламентов и операционных процессов в отраслевом контуре.', visual: 'transport', href: 'https://n-forma.ru/our-cases' },
    { category: 'Авиация и транспорт', tag: 'Авиация и транспорт', title: 'Согласование справочников между разными системами', text: 'Синхронизация справочников материалов группы авиакомпаний в SAP R/3 и AMOS для единого учёта запасов.', visual: 'digital', href: 'https://n-forma.ru/project_25' },
];
const normalizeSearch = (value) => value.toLocaleLowerCase('ru').replaceAll('ё', 'е').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
exports.normalizeSearch = normalizeSearch;
const problemRoutes = [
    { problem: /дубл|повторя|разные назван|разные наимен|бардак|беспорядок|грязные данн|ошибки в данн/, route: /\/normalization$/ },
    { problem: /с чего начать|бардак|беспорядок|оценить|диагност|проверить/, route: /\/(inspection|mdm-form|express-diagnostic)$/ },
    { problem: /перенос|переезд|перейти на|новая система|новую систему|импорт/, route: /\/migration$/ },
    { problem: /поддержк|актуальн|вести справоч|ведение справоч|кто ведет|аутсорс/, route: /\/outsourcing-outstaffing$/ },
    { problem: /правила|ответствен|инструкц|регламент/, route: /\/(methodology|regulations)$/ },
    { problem: /скан|оцифров|бумаж|распознав/, route: /\/document-processing$/ },
];
function searchPages(pages, query) {
    const normalized = (0, exports.normalizeSearch)(query);
    if (!normalized)
        return [];
    const words = normalized.split(' ');
    return pages.map((page, index) => {
        const title = (0, exports.normalizeSearch)(page.title);
        const text = (0, exports.normalizeSearch)([page.title, page.section, page.description, page.sourceTitle].join(' '));
        const direct = words.every(word => text.includes(word));
        const problemIndex = problemRoutes.findIndex(({ problem, route }) => problem.test(normalized) && route.test(page.url));
        const score = (problemIndex >= 0 ? 140 - problemIndex * 10 : 0) + (direct ? 30 : 0) + (title.includes(normalized) ? 20 : 0);
        return { page, score, index };
    }).filter(result => result.score > 0).sort((a, b) => b.score - a.score || a.index - b.index).map(result => result.page);
}
exports.CASE_TASKS = {
    analysis: 'Обследование и выбор решения', normalization: 'Нормализация', migration: 'Миграция',
    methodology: 'Методология', support: 'Ведение и поддержка', integration: 'Внедрение и интеграция', documents: 'Оцифровка документов',
};
exports.CASE_INDUSTRIES = { aviation: 'Авиация и транспорт', education: 'Образование', industry: 'Промышленность', unspecified: 'Отрасль не указана' };
// Project descriptions plus explicit scope/client links in company-history and reviews.
// The added industry assignments are documented in docs/readability-and-content-2026-10-08.md.
exports.CASE_METADATA = {
    1: { tasks: ['analysis'], industry: 'unspecified', result: 'Обоснование экономического эффекта для решения о старте проекта.' },
    2: { tasks: ['normalization', 'methodology'], industry: 'aviation', result: 'Единые правила и данные для сквозного учёта материалов.' },
    3: { tasks: ['analysis'], industry: 'unspecified', result: 'Выбрана модель ведения справочника с учётом качества и затрат.' },
    4: { tasks: ['migration', 'normalization'], industry: 'aviation', result: 'Единые описания и кодировка материалов для корректного учёта.' },
    5: { tasks: ['normalization', 'methodology'], industry: 'aviation', result: 'Снижение затрат на закупку и запасов спецодежды и форменного обмундирования.' },
    6: { tasks: ['normalization', 'support'], industry: 'unspecified', result: 'Переход от складских таблиц Excel к единому учёту в SAP.' },
    7: { tasks: ['normalization'], industry: 'unspecified', result: 'Заявки на закупку согласованы с эталонным справочником.' },
    8: { tasks: ['normalization', 'migration'], industry: 'unspecified', result: 'Переход в единую ERP без прерывания производственных процессов.' },
    9: { tasks: ['migration'], industry: 'unspecified', result: 'Единые данные для планирования ремонта и обслуживания.' },
    10: { tasks: ['normalization', 'migration'], industry: 'aviation', result: 'Качественный учёт инструментов в единой ERP-системе.' },
    11: { tasks: ['normalization', 'support'], industry: 'aviation', result: 'Однозначный учёт затрат и снижение расходов на закупку услуг.' },
    12: { tasks: ['methodology'], industry: 'unspecified', result: 'Согласованные процессы ведения справочников и контроль качества.' },
    13: { tasks: ['methodology'], industry: 'education', result: 'Правила ведения справочника студентов и повышение качества данных.' },
    14: { tasks: ['documents'], industry: 'unspecified', result: 'Проверенная база договоров по единому стандарту качества.' },
    15: { tasks: ['normalization'], industry: 'education', result: 'Удалены дубли и неполные записи в справочнике студентов.' },
    16: { tasks: ['support'], industry: 'aviation', result: 'Качество справочников для ТОиР и поддержки лётной годности.' },
    17: { tasks: ['support'], industry: 'aviation', result: 'Учёт взаимозаменяемых материалов и аналогов для снабжения.' },
    18: { tasks: ['support'], industry: 'aviation', result: 'Упрощены планирование, бюджетирование и отчётность по номенклатуре.' },
    19: { tasks: ['support', 'methodology'], industry: 'unspecified', result: 'Стабильное ведение справочника с меньшей нагрузкой на персонал.' },
    20: { tasks: ['support'], industry: 'education', result: 'Согласованные справочники для учебных и научных процессов.' },
    21: { tasks: ['support'], industry: 'education', result: 'Качественные данные об активах для бухгалтерской отчётности.' },
    22: { tasks: ['support'], industry: 'aviation', result: 'Точная инвентаризация техники и планирование потребности в оборудовании.' },
    23: { tasks: ['methodology', 'integration'], industry: 'education', result: 'Методическая поддержка внедрения 1С:MDM и модели данных студентов.' },
    24: { tasks: ['documents', 'normalization'], industry: 'education', result: 'Подготовлены данные анкет сотрудников для загрузки в систему.' },
    25: { tasks: ['normalization', 'integration'], industry: 'aviation', result: 'Согласованы справочники материалов нескольких компаний группы.' },
    26: { tasks: ['analysis', 'methodology'], industry: 'industry', result: 'Техническое задание для согласования обследования и проведения конкурса.' },
};
// Platform terms verified in sources/site-snapshot/2026-10-07/pages/project_*.main.txt.
const CASE_SEARCH_TERMS = {
    "1": "",
    "2": "ERP SAP",
    "3": "",
    "4": "ERP SAP",
    "5": "ERP SAP",
    "6": "ERP MS EXCEL SAP",
    "7": "",
    "8": "ERP EXCEL SAP",
    "9": "ERP SAP",
    "10": "ERP MS EXCEL SAP",
    "11": "ERP SAP",
    "12": "1С: MDM ERP",
    "13": "1С: MDM ERP",
    "14": "",
    "15": "1С: MDM",
    "16": "ERP",
    "17": "ERP SAP",
    "18": "ERP SAP",
    "19": "ERP SAP",
    "20": "ERP",
    "21": "ERP",
    "22": "ERP SAP",
    "23": "1C: MDM 1С: MDM 1С:MDM",
    "24": "OCR",
    "25": "AMOS ERP SAP",
    "26": ""
};
function caseId(url) { return Number(url.match(/\/project_(\d+)$/)?.[1] ?? 0); }
function caseMatches(entry, task = '', industry = '', query = '') {
    const meta = exports.CASE_METADATA[caseId(entry.url)];
    if (!meta || (task && !meta.tasks.includes(task)) || (industry && meta.industry !== industry))
        return false;
    const text = (0, exports.normalizeSearch)([entry.title, entry.description, meta.result, CASE_SEARCH_TERMS[caseId(entry.url)], exports.CASE_INDUSTRIES[meta.industry], ...meta.tasks.map(key => exports.CASE_TASKS[key])].join(' '));
    return (0, exports.normalizeSearch)(query).split(' ').filter(Boolean).every(word => text.includes(word));
}
exports.STEP_RESULTS = ['Карта проблем и приоритетов', 'Модель данных и план решения', 'Подготовленные данные и процессы', 'Система в эксплуатации', 'Актуальные данные и поддержка'];
function stepCheckMarkup(index) {
    return `<svg viewBox="0 0 40 40" aria-hidden="true" focusable="false"><defs><mask id="step-ink-${index}" maskUnits="userSpaceOnUse" x="0" y="-6" width="44" height="48"><path class="step-check-trace" d="M1 17Q9 18 16 28Q26 11 43 -1" pathLength="1" /></mask></defs><path class="step-check-ink" d="M5 19Q10 19 16 25Q26 9 40 1L39 7Q27 17 18 33Q15 34 13 30Q10 23 5 19Z" mask="url(#step-ink-${index})" /></svg>`;
}
const boltMarkup = `<svg class="demo-bolt" viewBox="0 0 120 64" aria-hidden="true" focusable="false"><path d="M14 19 30 10l16 9v26l-16 9-16-9ZM14 19l16 9 16-9M30 28v26M46 26h57l8 6-8 6H46"/><path d="m57 26-5 12m15-12-5 12m15-12-5 12m15-12-5 12m15-12-5 12"/></svg>`;
exports.normalizationExampleMarkup = `<div class="container"><div class="section-heading"><div><p class="eyebrow"><span></span>От разрозненных записей к эталону</p><h2>Одна позиция.<br>Три разных названия.</h2></div><p class="demo-lead">Один и тот же болт завели трижды. Система видит разные позиции — и не показывает общую картину.</p></div>
  <div class="normalization-demo" data-normalization-demo data-state="raw" data-stage="0">
    <div class="demo-source"><div class="demo-column-head"><span>Исходные записи</span><span class="demo-count">3 кода</span></div><ul class="demo-records"><li><span class="demo-record-id">001</span><strong><span data-attribute="kind">Болт</span> <span data-attribute="diameter">М12</span>х<span data-attribute="length">40</span></strong><span class="demo-record-unit">20 шт</span></li><li><span class="demo-record-id">014</span><strong><span data-attribute="kind">БОЛТ</span> <span data-attribute="diameter">12</span>×<span data-attribute="length">40</span></strong><span class="demo-record-unit">30 штук</span></li><li><span class="demo-record-id">082</span><strong><span data-attribute="kind">болт</span> <span data-attribute="diameter">м12</span> * <span data-attribute="length">40</span></strong><span class="demo-record-unit">10 ШТ.</span></li></ul><p class="demo-source-note">Одно изделие, разные названия и единицы.</p></div>
    <div class="demo-connector" aria-hidden="true"><span></span><span class="arrow">→</span><span></span></div>
    <div class="demo-target"><div class="demo-column-head"><span data-demo-target-title>Что видит система</span><span class="demo-count" data-demo-target-count>3 позиции</span></div><div class="demo-placeholder" data-demo-placeholder><div class="demo-duplicates" aria-hidden="true"><span>${boltMarkup}<b>001</b></span><span>${boltMarkup}<b>014</b></span><span>${boltMarkup}<b>082</b></span></div><strong>Три карточки одного болта</strong><p>Остатки разнесены по дублям.<br>Есть риск заказать то, что уже лежит на складе.</p></div><div class="rx-demo-work" data-demo-work hidden></div><div class="demo-result" id="normalization-result" data-demo-result hidden><div class="demo-result-head"><span class="demo-bolt-assembly" aria-hidden="true">${boltMarkup.repeat(3)}</span><div><span class="demo-result-kicker">Единая запись · 001</span><h3><span data-attribute="kind">Болт</span> <span data-attribute="diameter">М12</span>×<span data-attribute="length">40</span></h3><p>Диаметр 12 мм · длина 40 мм</p></div></div><div class="demo-stock"><span>Общий остаток</span><strong>60 <small>шт.</small></strong></div><p class="demo-merged">3 записи → 1 эталон. Остаток виден целиком.</p></div></div>
    <div class="demo-controls"><button type="button" class="button button-primary" data-demo-toggle aria-controls="normalization-result" aria-expanded="false"><span data-demo-button-label>Привести в порядок</span><span class="arrow" aria-hidden="true">→</span></button><p class="demo-status" role="status" aria-live="polite" data-demo-status>Дубли мешают поиску, учёту и планированию закупок.</p></div>
    <details class="rx-demo-details" data-demo-details><summary>Разобрать по шагам</summary><div class="rx-demo-toolbar"><label>Что мешает учёту<select data-demo-mode><option value="names">Разные названия</option><option value="units">Разные единицы</option></select></label><div class="rx-demo-stages" role="group" aria-label="Шаги нормализации"><button type="button" data-demo-stage="0" aria-pressed="true">01 · Различия</button><button type="button" data-demo-stage="1" aria-pressed="false">02 · Признаки</button><button type="button" data-demo-stage="2" aria-pressed="false">03 · Проверка</button><button type="button" data-demo-stage="3" aria-pressed="false">04 · Эталон</button></div></div><button type="button" class="button button-secondary" data-demo-play aria-pressed="false">Показать по шагам</button></details>
  </div><p class="demo-note">Условный пример. В проекте совпадение записей проверяют по характеристикам, а остатки — по правилам учёта заказчика.</p></div>`;
function mountSiteInteractions(root) {
    const win = root.ownerDocument.defaultView;
    if (!win)
        return () => { };
    const dispose = [];
    const demo = root.querySelector('[data-normalization-demo]');
    const toggle = demo?.querySelector('[data-demo-toggle]');
    const result = demo?.querySelector('[data-demo-result]');
    const placeholder = demo?.querySelector('[data-demo-placeholder]');
    if (demo && toggle && result && placeholder) {
        const targetTitle = demo.querySelector('[data-demo-target-title]');
        const targetCount = demo.querySelector('[data-demo-target-count]');
        const label = toggle.querySelector('[data-demo-button-label]');
        const status = demo.querySelector('[data-demo-status]');
        const change = () => {
            const complete = demo.dataset.state !== 'normalized';
            demo.dataset.state = complete ? 'normalized' : 'raw';
            result.hidden = !complete;
            placeholder.hidden = complete;
            targetTitle.textContent = complete ? 'После нормализации' : 'Что видит система';
            targetCount.textContent = complete ? '1 позиция' : '3 позиции';
            toggle.setAttribute('aria-expanded', String(complete));
            label.textContent = complete ? 'Показать исходные записи' : 'Привести в порядок';
            status.textContent = complete ? 'Одна позиция, единое название и общий остаток. Можно планировать закупку.' : 'Дубли мешают поиску, учёту и планированию закупок.';
        };
        toggle.addEventListener('click', change);
        dispose.push(() => toggle.removeEventListener('click', change));
    }
    const filterRoot = root.querySelector('[data-case-filters]');
    if (filterRoot) {
        // Local control type avoids the worker runtime's HTMLSelectElement/lib.dom overlap.
        const task = filterRoot.querySelector('[name="task"]');
        const industry = filterRoot.querySelector('[name="industry"]');
        const query = filterRoot.querySelector('[name="case-query"]');
        const reset = filterRoot.querySelector('[data-case-reset]');
        const count = root.querySelector('[data-count]');
        const empty = root.querySelector('[data-case-empty]');
        const cards = [...root.querySelectorAll('[data-case-id]')];
        const update = (persist = true) => {
            let visible = 0;
            cards.forEach(card => {
                const entry = { title: card.dataset.caseTitle ?? '', description: card.dataset.caseDescription ?? '', url: `https://n-forma.ru/project_${card.dataset.caseId}` };
                const match = caseMatches(entry, task.value, industry.value, query.value);
                card.hidden = !match;
                if (match)
                    visible++;
            });
            count.textContent = `Показано ${visible} из ${cards.length} проектов`;
            empty.hidden = visible > 0;
            reset.disabled = !task.value && !industry.value && !query.value;
            if (persist) {
                const url = new URL(win.location.href);
                [['task', task.value], ['industry', industry.value], ['q', query.value.trim()]].forEach(([key, value]) => value ? url.searchParams.set(key, value) : url.searchParams.delete(key));
                win.history.replaceState(null, '', url);
            }
        };
        const restore = () => {
            const params = new URLSearchParams(win.location.search);
            const t = params.get('task') ?? '', i = params.get('industry') ?? '';
            task.value = Object.hasOwn(exports.CASE_TASKS, t) ? t : '';
            industry.value = Object.hasOwn(exports.CASE_INDUSTRIES, i) ? i : '';
            query.value = params.get('q') ?? '';
            update(false);
        };
        const onChange = () => update();
        const onReset = () => { task.value = ''; industry.value = ''; query.value = ''; update(); };
        [task, industry].forEach(el => { el.addEventListener('change', onChange); dispose.push(() => el.removeEventListener('change', onChange)); });
        query.addEventListener('input', onChange);
        reset.addEventListener('click', onReset);
        win.addEventListener('popstate', restore);
        dispose.push(() => { query.removeEventListener('input', onChange); reset.removeEventListener('click', onReset); win.removeEventListener('popstate', restore); });
        restore();
    }
    return () => dispose.forEach(fn => fn());
}

window.NFORMA_INTERACTIONS = exports;
function start() { const root = document.querySelector("main"); if (root) exports.mountSiteInteractions(root); }
if (document.readyState !== "complete") document.addEventListener("DOMContentLoaded", start, { once:true }); else start();
})();
