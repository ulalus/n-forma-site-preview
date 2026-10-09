// Generated from site/app/research-enhancements.ts
(function(){const exports={};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqMarkup = exports.auditMarkup = exports.lifecycleMarkup = exports.featuredCaseMarkup = exports.architectureMarkup = exports.architectureLayers = exports.rolesMarkup = exports.roleScenarios = void 0;
exports.mountResearchEnhancements = mountResearchEnhancements;
/** Evidence-led additions; shared by React and the seven-page static preview. */
const arrow = '<span class="arrow" aria-hidden="true">→</span>';
const tabs = (id, labels) => `<div class="rx-tabs" role="tablist" aria-label="${id === 'roles' ? 'Ваша задача' : 'Слои архитектуры'}">${labels.map((label, i) => `<button type="button" role="tab" id="${id}-tab-${i}" aria-controls="${id}-panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${label}</button>`).join('')}</div>`;
const panel = (id, i, html) => `<div role="tabpanel" id="${id}-panel-${i}" aria-labelledby="${id}-tab-${i}" tabindex="0" ${i ? 'hidden' : ''}>${html}</div>`;
exports.roleScenarios = [
    { title: 'Закупать нужное. Видеть то, что уже есть.', problem: 'Один материал завели под разными названиями. Остатки разнесены, а в закупку снова попадает та же позиция.', work: 'Сопоставляем номенклатуру, характеристики и единицы измерения. Связываем исходные коды с эталонными записями.', result: 'Общий остаток по материалу и понятная основа для планирования закупки.', href: 'https://n-forma.ru/normalization', link: 'Нормализация номенклатуры', tag: 'Закупки и снабжение' },
    { title: 'Связать системы общим языком данных.', problem: 'В ERP и отраслевых системах разные коды, форматы и правила. При переносе расхождения переходят в новую систему.', work: 'Проектируем модель и таблицы соответствия, готовим данные к переносу и проверяем результат загрузки.', result: 'Согласованные справочники и контролируемый переход между системами.', href: 'https://n-forma.ru/migration', link: 'Миграция и интеграция', tag: 'ИТ и архитектура' },
    { title: 'Сохранить порядок после запуска.', problem: 'Правила есть в отдельных файлах, заявки проверяют вручную, а качество справочника зависит от конкретных сотрудников.', work: 'Определяем роли, проверки и маршрут согласования. Готовим регламенты и организуем ведение справочников.', result: 'Понятная ответственность за каждую запись и повторяемый процесс контроля.', href: 'https://n-forma.ru/outsourcing-outstaffing', link: 'Ведение и сопровождение НСИ', tag: 'Команда НСИ' },
];
exports.rolesMarkup = `<div class="rx-roles" data-rx-tabs><div class="rx-role-intro"><p class="rx-kicker">С какой задачей вы пришли?</p><h3>Один порядок в данных.<br>Разные задачи команды.</h3>${tabs('roles', ['Закупки', 'ИТ', 'Команда НСИ'])}</div><div class="rx-role-content">${exports.roleScenarios.map((r, i) => panel('roles', i, `<span class="rx-kicker">${r.tag}</span><h4>${r.title}</h4><p>${r.problem}</p><p><strong>Что делаем</strong> ${r.work}</p><div class="rx-role-result"><span>На выходе</span>${r.result}</div><a class="text-link" href="${r.href}">${r.link} ${arrow}</a>`)).join('')}</div></div>`;
exports.architectureLayers = [
    { title: 'Собрать и понять источники', subtitle: 'ERP · Excel · отраслевые системы', work: 'Изучаем структуру справочников, связи и правила ведения. Определяем, где возникают расхождения.', output: 'Карта источников, проблем и приоритетов.', owner: 'Владелец данных и ИТ-команда', visual: ['ERP', 'Excel', 'ТОиР'], next: 'Карта источников' },
    { title: 'Проверить и согласовать правила', subtitle: 'Классы · признаки · единицы', work: 'Разбираем записи на характеристики, ищем кандидатов в дубли, согласуем спорные совпадения с экспертами.', output: 'Правила качества и проверенные соответствия записей.', owner: 'Эксперт НСИ и профильный специалист', visual: ['Класс', 'Признаки', 'Проверка'], next: 'Согласованные правила' },
    { title: 'Собрать эталонные данные', subtitle: 'Единая запись · связи с кодами', work: 'Формируем единое описание и сохраняем связи с исходными кодами. Настраиваем порядок создания и изменения записей.', output: 'Эталонный справочник и таблица соответствий.', owner: 'Владелец справочника', visual: ['Код 001', 'Код 014', 'Код 082'], next: 'Эталонная запись' },
    { title: 'Передать в рабочие системы', subtitle: 'ERP · ТОиР · аналитика', work: 'Готовим форматы обмена и загрузки, проверяем полноту и согласованность данных в системах-потребителях.', output: 'Согласованные данные для операций и отчётности.', owner: 'ИТ-команда и владельцы процессов', visual: ['ERP', 'ТОиР', 'Отчётность'], next: 'Контроль обмена' },
];
exports.architectureMarkup = `<div class="rx-architecture" data-rx-tabs><div class="rx-architecture-head"><div><p class="rx-kicker">Как связаны данные</p><h3>От источников к рабочим системам</h3></div><p>Выберите слой — посмотрите, что делаем и кто участвует.</p></div><div class="rx-architecture-layout">${tabs('architecture', ['01 · Источники', '02 · Правила и качество', '03 · Эталонные данные', '04 · Системы-потребители'])}<div class="rx-architecture-content">${exports.architectureLayers.map((l, i) => panel('architecture', i, `<div class="rx-flow" aria-hidden="true"><div>${l.visual.map(v => `<span>${v}</span>`).join('')}</div><i>→</i><strong>${l.next}</strong></div><p class="rx-kicker">${l.subtitle}</p><h4>${l.title}</h4><p>${l.work}</p><dl class="rx-layer-facts"><div><dt>Результат</dt><dd>${l.output}</dd></div><div><dt>Участники</dt><dd>${l.owner}</dd></div></dl>`)).join('')}</div></div><p class="rx-footnote">Типовая схема проекта. Состав систем, роли и способы обмена уточняем при обследовании.</p></div>`;
exports.featuredCaseMarkup = `<article class="rx-featured" aria-labelledby="featured-case-title"><div class="rx-feature-story"><p class="rx-kicker">Разбор проекта · Авиация и транспорт</p><h3 id="featured-case-title">Один материал —<br>одинаковый смысл<br>в SAP и AMOS</h3><p>У компаний группы справочники описывали одни и те же материалы по-разному. Для единого учёта запасов понадобилось согласовать записи ERP и систем технического обслуживания.</p><div class="rx-case-result"><span>Результат проекта</span><strong>Согласованные справочники для закупок, учёта и ТОиР</strong><p>В публикации N-Forma отмечены снижение запасов и затрат на закупку, повышение качества учёта и улучшение ТОиР.</p></div><a class="text-link" href="https://n-forma.ru/project_25">Полное описание проекта ${arrow}</a></div><div class="rx-case-passport"><div class="rx-case-diagram" aria-label="Согласование справочников SAP R/3 и AMOS"><span>SAP R/3<small>Головная компания</small></span><b aria-hidden="true">↔</b><span>AMOS<small>Компании группы</small></span><strong>Таблица соответствий материалов</strong></div><dl><div><dt>Объект</dt><dd>Справочники материалов и данные о запасах</dd></div><div><dt>Масштаб</dt><dd>Несколько тысяч записей · периодические работы</dd></div><div><dt>Что согласовали</dt><dd>Наименования, классы, единицы измерения и исходные коды</dd></div><div><dt>Что подготовили</dt><dd>Методику пересчёта и кросс-таблицу соответствий</dd></div></dl><p class="rx-footnote">По опубликованному кейсу N-Forma № 25. Срок и числовой эффект в источнике не указаны.</p></div></article>`;
exports.lifecycleMarkup = `<div class="rx-lifecycle" aria-label="Жизненный цикл НСИ">${[
    ['01', 'Находим', 'Справочники, процессы и системы', 'Карта проблем и план работ', 'inspection'],
    ['02', 'Приводим в порядок', 'Записи, признаки и связи', 'Эталонные данные и правила', 'normalization'],
    ['03', 'Поддерживаем', 'Заявки, изменения и качество', 'Актуальный справочник', 'outsourcing-outstaffing'],
].map(([n, title, object, result, path]) => `<a href="https://n-forma.ru/${path}"><span class="rx-kicker">${n}</span><h3>${title}</h3><p>${object}</p><strong>${result}</strong>${arrow}</a>`).join('')}</div>`;
exports.auditMarkup = `<section class="rx-audit" id="audit-example" aria-labelledby="audit-title"><div class="rx-audit-intro"><p class="rx-kicker">Понятный первый шаг</p><h2 id="audit-title">Что вы получите<br>после обследования</h2><p>Не просто список ошибок, а основу для решения: что исправлять, в каком порядке и какие участники нужны.</p><ol><li><strong>Передаёте</strong>Пример справочника, описание систем и задачи.</li><li><strong>Проверяем</strong>Структуру, качество записей, связи и процесс ведения.</li><li><strong>Получаете</strong>Карту проблем, приоритеты и предложения по составу работ.</li></ol><a class="button button-primary" href="https://n-forma.ru/mdm-form">Оценить систему НСИ ${arrow}</a></div><div class="rx-audit-sheet"><div class="rx-sheet-head"><span>N-FORMA / ОБСЛЕДОВАНИЕ</span><span class="rx-sample-label">Демонстрационный образец</span></div><h3>Карта качества справочника</h3><p>Условный фрагмент отчёта · выборка 1 000 записей</p><div class="rx-audit-findings"><details open><summary><span>01</span> Кандидаты в дубли <b>120 записей</b></summary><p><strong>Как проверяем:</strong> сопоставляем классы, признаки и единицы. Совпадение названий само по себе не доказывает дубль.</p><p><strong>Рекомендация:</strong> подтвердить группы с экспертом и связать исходные коды с эталоном.</p></details><details><summary><span>02</span> Неполные характеристики <b>85 записей</b></summary><p><strong>Как проверяем:</strong> сравниваем заполненность с обязательными признаками класса.</p><p><strong>Рекомендация:</strong> дополнить данные из технической документации и задать проверки при вводе.</p></details><details><summary><span>03</span> Разные единицы измерения <b>40 записей</b></summary><p><strong>Как проверяем:</strong> ищем разные обозначения и проверяем коэффициенты пересчёта.</p><p><strong>Рекомендация:</strong> согласовать базовую единицу, пересчитать остатки и проверить загрузку.</p></details></div><div class="rx-audit-priority"><span>Первый приоритет</span><strong>Подтвердить дубли до миграции</strong><p>Затем — дополнить признаки и согласовать правила ведения.</p></div><p class="rx-footnote">Все числа в этом образце вымышлены. Категории могут пересекаться. Это пример структуры результата, а не отчёт по клиентскому проекту.</p></div></section>`;
exports.faqMarkup = `<section class="rx-faq" aria-labelledby="rx-faq-title"><p class="rx-kicker">До начала проекта</p><h2 id="rx-faq-title">Несколько важных вопросов</h2>${[
    ['Нужно ли сразу внедрять MDM-систему?', 'Не обязательно. Начать можно с обследования, нормализации одного справочника или настройки правил ведения. Потребность в платформе определяют задачи, масштаб и текущие системы.'],
    ['Можно ли заказать отдельную услугу?', 'Да. Обследование, нормализация, миграция, методология и сопровождение могут быть самостоятельными работами. Состав и границы результата фиксируются в договоре.'],
    ['Что подготовить для первого разговора?', 'Опишите задачу, используемые системы и проблемный справочник. Для первичного обсуждения достаточно обезличенного примера; состав и способ передачи рабочих данных согласуем отдельно.'],
    ['Сколько времени занимает проект?', 'Срок зависит от объёма и качества данных, числа систем и правил согласования. После обследования можно определить этапы, необходимые ресурсы и реалистичный график.'],
].map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</section>`;
/** WAI-ARIA tabs with manual activation: arrow keys move focus, Enter/Space selects. */
function mountResearchEnhancements(root) {
    const cleanups = [];
    const featured = root.querySelector('.cases-section .rx-featured');
    if (featured)
        root.querySelectorAll('.filters .filter').forEach(button => {
            const filter = () => { featured.hidden = !['Все', 'Авиация и транспорт'].includes(button.textContent?.trim() ?? ''); };
            button.addEventListener('click', filter);
            cleanups.push(() => button.removeEventListener('click', filter));
        });
    const demo = root.querySelector('[data-normalization-demo]');
    const win = root.ownerDocument.defaultView;
    if (demo && win) {
        const stages = [...demo.querySelectorAll('[data-demo-stage]')];
        const play = demo.querySelector('[data-demo-play]');
        const toggle = demo.querySelector('[data-demo-toggle]');
        const work = demo.querySelector('[data-demo-work]');
        const result = demo.querySelector('[data-demo-result]');
        const placeholder = demo.querySelector('[data-demo-placeholder]');
        const mode = demo.querySelector('[data-demo-mode]');
        const status = demo.querySelector('[data-demo-status]');
        const reduced = win.matchMedia('(prefers-reduced-motion: reduce)');
        let stage = 0, timer, playing = false;
        const stop = () => { win.clearTimeout(timer); timer = undefined; playing = false; play.textContent = stage === 3 ? 'Повторить по шагам' : stage === 0 ? 'Показать по шагам' : 'Продолжить по шагам'; play.setAttribute('aria-pressed', 'false'); };
        const setStage = (next) => {
            stage = next;
            demo.dataset.stage = String(stage);
            demo.dataset.state = stage === 3 ? 'normalized' : 'raw';
            stages.forEach((b, i) => b.setAttribute('aria-pressed', String(i === stage)));
            result.hidden = stage !== 3;
            placeholder.hidden = stage !== 0;
            work.hidden = stage === 0 || stage === 3;
            work.innerHTML = stage === 1
                ? '<span class="rx-kicker">Выделяем признаки</span><h3>Название меняется.<br>Характеристики совпадают.</h3><div class="rx-attributes"><span data-attribute="kind">Болт</span><span data-attribute="diameter">Ø 12 мм</span><span data-attribute="length">40 мм</span></div><p>Цвет связывает один признак в исходных строках и в эталоне.</p>'
                : `<span class="rx-kicker">Согласуем правило</span><h3>Сравниваем признаки,<br>а не только строки.</h3><p>Класс + диаметр + длина. Стандарт, материал и класс прочности в этом примере считаем одинаковыми.</p><p class="rx-unit-rule">${mode.value === 'units' ? '2 уп. × 10 шт. + 30 шт. + 10 шт. = 60 шт.' : '20 шт. + 30 штук + 10 ШТ. = 60 шт.'}</p>`;
            demo.querySelector('[data-demo-target-title]').textContent = ['Что видит система', 'Из чего состоит запись', 'Правило сопоставления', 'После нормализации'][stage];
            demo.querySelector('[data-demo-target-count]').textContent = stage === 3 ? '1 позиция' : '3 позиции';
            toggle.setAttribute('aria-expanded', String(stage === 3));
            toggle.querySelector('[data-demo-button-label]').textContent = stage === 3 ? 'Показать исходные записи' : 'Привести в порядок';
            status.textContent = ['Дубли мешают поиску, учёту и планированию закупок.', 'Выделили тип изделия, диаметр и длину в каждой записи.', 'Проверили совпадение характеристик и согласовали единицы учёта.', 'Одна позиция, единое название и общий остаток. Можно планировать закупку.'][stage];
        };
        const advance = () => {
            if (stage >= 3) {
                stop();
                return;
            }
            timer = win.setTimeout(() => { setStage(stage + 1); advance(); }, 2600);
        };
        const onPlay = () => {
            if (playing) {
                stop();
                return;
            }
            if (stage === 3)
                setStage(0);
            if (reduced.matches) {
                setStage(stage + 1);
                stop();
                return;
            }
            playing = true;
            play.textContent = 'Пауза';
            play.setAttribute('aria-pressed', 'true');
            if (stage === 0)
                setStage(1);
            advance();
        };
        const onToggle = () => { stop(); setStage(demo.dataset.state === 'normalized' ? 3 : 0); stop(); };
        const onMode = () => { stop(); demo.querySelector('.demo-record-unit').textContent = mode.value === 'units' ? '2 уп. × 10 шт.' : '20 шт'; setStage(0); };
        const onVisibility = () => { if (root.ownerDocument.hidden)
            stop(); };
        stages.forEach((b, i) => { const fn = () => { stop(); setStage(i); stop(); }; b.addEventListener('click', fn); cleanups.push(() => b.removeEventListener('click', fn)); });
        play.addEventListener('click', onPlay);
        toggle.addEventListener('click', onToggle);
        mode.addEventListener('change', onMode);
        root.ownerDocument.addEventListener('visibilitychange', onVisibility);
        const onReduced = () => { if (reduced.matches)
            stop(); };
        reduced.addEventListener('change', onReduced);
        const observer = typeof win.IntersectionObserver === 'function' ? new win.IntersectionObserver(entries => { if (!entries[0].isIntersecting)
            stop(); }) : null;
        observer?.observe(demo);
        cleanups.push(() => { stop(); observer?.disconnect(); reduced.removeEventListener('change', onReduced); play.removeEventListener('click', onPlay); toggle.removeEventListener('click', onToggle); mode.removeEventListener('change', onMode); root.ownerDocument.removeEventListener('visibilitychange', onVisibility); });
        setStage(0);
    }
    root.querySelectorAll('[data-rx-tabs]').forEach(group => {
        const buttons = [...group.querySelectorAll('[role="tab"]')];
        const panels = [...group.querySelectorAll('[role="tabpanel"]')];
        const select = (button) => {
            buttons.forEach(b => { b.setAttribute('aria-selected', String(b === button)); b.tabIndex = b === button ? 0 : -1; });
            panels.forEach(p => p.hidden = p.id !== button.getAttribute('aria-controls'));
        };
        buttons.forEach((button, index) => {
            const click = () => select(button);
            const key = (e) => {
                const offsets = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
                let next = index;
                if (e.key === 'Home')
                    next = 0;
                else if (e.key === 'End')
                    next = buttons.length - 1;
                else if (e.key in offsets)
                    next = (index + offsets[e.key] + buttons.length) % buttons.length;
                else
                    return;
                e.preventDefault();
                buttons.forEach((b, i) => b.tabIndex = i === next ? 0 : -1);
                buttons[next].focus();
            };
            button.addEventListener('click', click);
            button.addEventListener('keydown', key);
            cleanups.push(() => { button.removeEventListener('click', click); button.removeEventListener('keydown', key); });
        });
    });
    return () => cleanups.forEach(fn => fn());
}

const start=()=>{const root=document.querySelector("main");if(root)exports.mountResearchEnhancements(root);};if(document.readyState!=="complete")document.addEventListener("DOMContentLoaded",start,{once:true});else start();})();
