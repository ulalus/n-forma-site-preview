(() => {
  const data = window.NFORMA_DATA;
  if (!data) return;
  const escape = (s) => String(s ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const page = document.body.dataset.page;
  const menu = data.sections.map(s => `<a href="${s.key}.html"${page === s.key ? ' aria-current="page"' : ''}>${escape(s.menu)}</a>`).join('');
  document.querySelector('[data-header]').innerHTML = `<div class="container nav-wrap"><a class="brand" href="index.html" aria-label="N-Forma — на главную"><img src="assets/logo-white-accent.svg" class="brand-logo" width="199" height="64" alt="N-Forma — Качественные системы НСИ"></a><nav class="main-nav" id="main-nav" aria-label="Основная навигация">${menu}<div class="mobile-assessments"><a href="https://n-forma.ru/mdm-form">Оценить систему НСИ →</a><a href="https://n-forma.ru/express-diagnostic">Оценить проект MDM →</a></div></nav><div class="nav-actions"><button class="icon-button" type="button" data-open-search aria-label="Поиск по сайту"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/></svg></button><a class="button button-cyan header-cta" href="https://n-forma.ru/mdm-form">Оценить систему НСИ <span class="arrow" aria-hidden="true">→</span></a><button class="icon-button menu-toggle" type="button" aria-label="Открыть меню" aria-expanded="false" aria-controls="main-nav"><span></span><span></span><span></span></button></div></div>`;
  const footerTarget = document.querySelector('[data-footer]');
  if (footerTarget) footerTarget.innerHTML = `<div class="container footer-grid"><div class="footer-brand"><a href="index.html" aria-label="N-Forma — на главную"><img src="assets/logo-white-accent.svg" class="brand-logo" width="199" height="64" alt="N-Forma — Качественные системы НСИ"></a><p>Обследование, подготовка данных<br>и сопровождение систем НСИ.</p></div><nav class="footer-nav" aria-label="Разделы в футере">${menu}<a href="https://n-forma.ru/mdm-form">Оценить систему</a><a href="https://n-forma.ru/express-diagnostic">Оценить проект</a></nav><div class="footer-contact"><a href="tel:+74951252516"><strong>+7 495 125 25 16</strong></a><a href="mailto:info@n-forma.ru">info@n-forma.ru</a><span>Москва, Новоясеневский проспект, 9</span><a href="https://n-forma.ru/contacts#to-the-company-management">Связаться с руководством →</a></div></div><div class="container footer-bottom"><span>© N-Forma, 2026</span><a href="https://n-forma.ru/privacy">Политика обработки персональных данных</a><a href="https://n-forma.ru/contacts">Реквизиты и контакты →</a></div><a class="button button-primary mobile-cta" href="contacts.html#question">Обсудить задачу <span class="arrow" aria-hidden="true">→</span></a>`;
  const onScroll = () => document.querySelector('.site-header').classList.toggle('is-scrolled',window.scrollY>16);
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  const mobileCta = document.querySelector('.mobile-cta');
  const heroActions = document.querySelector('.hero .actions, .hero .hero-actions');
  if (heroActions) {
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      mobileCta.classList.toggle('is-visible', !entry.isIntersecting && entry.boundingClientRect.bottom < 76);
    }, {rootMargin:'-76px 0px 0px 0px'});
    observer.observe(heroActions);
  } else if (page !== 'contacts') mobileCta.classList.add('is-visible');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const closeMenu = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Открыть меню'); toggle.classList.remove('is-open'); };
  toggle.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); toggle.classList.toggle('is-open',open); toggle.setAttribute('aria-expanded',String(open)); toggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  window.matchMedia('(min-width:1181px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
  const dialog = document.querySelector('.search-dialog');
  const input = document.querySelector('#site-search');
  const results = document.querySelector('.search-results');
  const normalize = s => s.toLocaleLowerCase('ru').replaceAll('ё','е');
  const showResults = () => {
    const query = normalize(input.value.trim());
    if (!query) { results.innerHTML = '<p class="empty-results">Введите название услуги, тему или задачу.</p>'; return; }
    const matches = window.NFORMA_INTERACTIONS ? window.NFORMA_INTERACTIONS.searchPages(data.pages, query) : data.pages.filter(p => normalize(p.title+' '+p.section+' '+p.description+' '+p.sourceTitle).includes(query));
    results.innerHTML = matches.length ? matches.map(p => `<a class="search-result" href="${escape(p.url)}">${escape(p.title)}<small>${escape(p.section)}</small></a>`).join('') : '<p class="empty-results">Совпадений не найдено. Попробуйте другое слово или откройте каталог услуг.</p>';
  };
  document.querySelector('[data-open-search]').addEventListener('click', () => { closeMenu(); dialog.showModal(); showResults(); input.focus(); });
  document.querySelector('[data-close-search]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if(e.target === dialog){ const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close(); } });
  input.addEventListener('input', showResults);
  const overview = document.querySelector('[data-overview]');
  if (overview) {
    const section = data.sections.find(s => s.key === page);
    document.querySelector('[data-page-title]').textContent = section.title;
    document.querySelector('[data-page-description]').textContent = section.description;
    document.querySelector('[data-breadcrumb-title]').textContent = section.menu;
    const entries = section.items || data.pages.filter(p => section.groups.includes(p.section) && (page !== 'cases' || /\/project_\d+$/.test(p.url)));
    const amberPositions = {
      services: [0, 2],
      cases: [0, 4],
      technologies: [1, 3],
      knowledge: [2],
      company: []
    };
    const brandbookCards = Object.hasOwn(amberPositions, page);
    overview.classList.toggle('brandbook-cards', brandbookCards);
    document.querySelector('[data-count]').textContent = `${entries.length} ${page==='services'?'направлений':page==='cases'?'проектов':'материалов'}`;
    const interactions = window.NFORMA_INTERACTIONS;
    const catalogCases = page === 'cases' && interactions;
    if (catalogCases) {
      const options = values => Object.entries(values).map(([key,label]) => `<option value="${key}">${escape(label)}</option>`).join('');
      overview.insertAdjacentHTML('beforebegin', `<div class="case-filter-panel" data-case-filters role="group" aria-label="Фильтры проектов"><label>Задача<select name="task" aria-controls="case-catalog"><option value="">Все задачи</option>${options(interactions.CASE_TASKS)}</select></label><label>Отрасль<select name="industry" aria-controls="case-catalog"><option value="">Все отрасли</option>${options(interactions.CASE_INDUSTRIES)}</select></label><label>Поиск по кейсам<input type="search" name="case-query" placeholder="Например, SAP или студенты" aria-controls="case-catalog"></label><button type="button" class="button button-secondary" data-case-reset>Сбросить фильтры</button></div>`);
      overview.id = 'case-catalog';
      document.querySelector('[data-count]').setAttribute('role','status');
      document.querySelector('[data-count]').setAttribute('aria-live','polite');
    }
    overview.innerHTML = entries.map((p, index) => {
      const amber = brandbookCards && amberPositions[page].includes(index);
      const id = catalogCases ? interactions.caseId(p.url) : 0;
      const meta = catalogCases ? interactions.CASE_METADATA[id] : null;
      const attrs = meta ? ` data-case-id="${id}" data-case-title="${escape(p.title)}" data-case-description="${escape(p.description)}"` : '';
      const tags = meta ? `<div class="case-tags"><span>${escape(interactions.CASE_INDUSTRIES[meta.industry])}</span>${meta.tasks.map(task => `<span>${escape(interactions.CASE_TASKS[task])}</span>`).join('')}</div>` : '';
      const description = meta ? `<p class="case-result"><strong>Результат</strong>${escape(meta.result)}</p><details class="case-context"><summary>Контекст и подробности</summary><p>${escape(p.description)}</p></details>` : `<p>${escape(p.description)}</p>`;
      return `<article class="overview-card${amber ? ' overview-card--amber' : ''}"${attrs}>${tags}<h2><a href="${escape(p.url)}">${escape(p.title)}</a></h2>${description}<div class="card-link"><a href="${escape(p.url)}">${page==='cases'?'Смотреть проект':'Подробнее'} <span class="arrow" aria-hidden="true">→</span></a>${p.secondary_url?`<a href="${escape(p.secondary_url)}">${escape(p.secondary_label)} →</a>`:''}</div></article>`;
    }).join('');
    if (catalogCases) overview.insertAdjacentHTML('afterend', '<div class="case-empty" data-case-empty hidden><h2>Подходящих проектов не найдено</h2><p>Попробуйте другую задачу, уберите отрасль или сбросьте фильтры.</p></div>');
    if (page === 'services') overview.insertAdjacentHTML('afterend', '<div class="overview-note"><h2>Шесть блоков комплексного проекта</h2><p>Анализ и моделирование · подготовка эталонных данных · подготовка информационных систем · подготовка процессов ведения НСИ · миграция данных справочников · ведение НСИ и сопровождение.</p><p><a class="text-link" href="https://n-forma.ru/services">Состав работ и результаты →</a></p><p><a href="https://n-forma.ru/mdm-form">Оценить систему НСИ →</a> · <a href="https://n-forma.ru/express-diagnostic">Оценить проект MDM →</a></p></div>');
    if (page === 'cases') document.querySelector('.overview-tools').insertAdjacentHTML('beforeend','<a class="text-link" href="https://n-forma.ru/reviews">Отзывы заказчиков →</a>');
  }
  const prototypeCases = window.NFORMA_PROTOTYPE_CASES;
  if (prototypeCases && document.querySelector('.filters')) {
    const cards = [...document.querySelectorAll('.cases-grid .case-card')];
    cards.forEach((card,index) => card.dataset.category = prototypeCases[index].category);
    document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
      const filter = button.textContent.trim();
      document.querySelectorAll('.filter').forEach(other => {
        const active = other === button; other.classList.toggle('is-active',active); other.setAttribute('aria-pressed',String(active));
      });
      cards.forEach(card => card.hidden = filter !== 'Все' && card.dataset.category !== filter);
    }));
  }
  // Give arrows in plain-text links the same optical alignment as buttons.
  document.querySelectorAll('a').forEach(link => {
    [...link.childNodes].forEach(node => {
      if (node.nodeType !== Node.TEXT_NODE || !/[→↗]\s*$/.test(node.textContent)) return;
      const text = node.textContent.replace(/[→↗]\s*$/, '');
      node.textContent = text;
      const arrow = document.createElement('span');
      arrow.className = 'arrow'; arrow.setAttribute('aria-hidden','true'); arrow.textContent = '→';
      node.after(arrow);
    });
  });
  document.querySelectorAll('a span[aria-hidden="true"]').forEach(span => {
    if (!/^[→↗]$/.test(span.textContent.trim())) return;
    span.classList.add('arrow'); span.textContent = '→';
  });
  const contact = document.querySelector('[data-contact-form]');
  if (contact) contact.addEventListener('submit', e => { e.preventDefault(); if (!contact.reportValidity()) return; const fields=new FormData(contact); const body=`Здравствуйте!\n\n${fields.get('task')}\n\nИмя: ${fields.get('name')}\nОрганизация: ${fields.get('company')}\nEmail: ${fields.get('email')}`; window.location.href=`mailto:info@n-forma.ru?subject=${encodeURIComponent('Обсуждение задачи по НСИ')}&body=${encodeURIComponent(body)}`; });
})();
