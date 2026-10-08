// Generated from site/app/living-blueprint.ts by tools/sync_living_blueprint.cjs
(function () {
const exports = {};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASSEMBLY_PLANES = void 0;
exports.createLogoBlueprint = createLogoBlueprint;
exports.mountLivingBlueprint = mountLivingBlueprint;
// Approved flat logo contours, with clear gaps between the three facets.
const LOGO_FACETS = [
    [[24, 14], [30.782, 20.782], [30.782, 48], [24, 41.218]],
    [[35.333, 22.924], [41.669, 29.260], [41.669, 38.362], [35.333, 32.026]],
    [[45.774, 14], [52.556, 20.782], [52.556, 48], [45.774, 41.218]],
];
exports.ASSEMBLY_PLANES = LOGO_FACETS.map(facet => facet.map(([x, y]) => [130 + (x - 24) * 11.2, 44 + (y - 14) * 11.2]));
let logoInstance = 0;
/** Four large architectural faces gently become a glass/grid version of the brand mark. */
function createLogoBlueprint(doc) {
    const ns = 'http://www.w3.org/2000/svg';
    const id = `lb-logo-${++logoInstance}`;
    const make = (tag, attributes, parent) => {
        const el = doc.createElementNS(ns, tag);
        Object.entries(attributes).forEach(([name, value]) => el.setAttribute(name, value));
        parent?.appendChild(el);
        return el;
    };
    const svg = make('svg', { class: 'lb-logo', viewBox: '0 0 560 470', 'aria-hidden': 'true', focusable: 'false' });
    svg.setAttribute('data-instance', id);
    const guides = make('g', { class: 'lb-logo-guides' }, svg);
    make('path', { d: 'M106 20V445M474 20V445M92 445H489', 'stroke-dasharray': '2 6' }, guides);
    const format = (points) => points.map(point => point.join(',')).join(' ');
    // Reproduce the original CSS illustration at its 560px reference width, including
    // its offset glass sheets and long planes projecting to the RIGHT. These are
    // deliberately open construction planes, not closed replacement boxes.
    const back = [[212, 125.659], [482, 58.341], [482, 288.341], [212, 355.659]];
    const front = [[198, 327.868], [538, 292.132], [538, 394.132], [198, 429.868]];
    const backGlass = [[101, 154.335], [213, 185.96], [213, 413.96], [101, 382.335]];
    const frontGlass = [[64, 342.952], [199, 383.306], [199, 483.306], [64, 442.952]];
    const matrix = (p) => `matrix(${[(p[1][0] - p[0][0]) / 100, (p[1][1] - p[0][1]) / 100, (p[3][0] - p[0][0]) / 100, (p[3][1] - p[0][1]) / 100, p[0][0], p[0][1]].join(',')})`;
    const plane = (parent, start, end, kind, delay, columns = 0, rows = 0) => {
        const target = matrix(end);
        const group = make('g', {
            class: `lb-logo-plane lb-logo-${kind}`, transform: target,
            style: `--plane-from:${matrix(start)};--plane-to:${target};--plane-delay:${delay}s`,
        }, parent);
        make('polygon', { points: '0,0 100,0 100,100 0,100', class: 'lb-logo-face', 'vector-effect': 'non-scaling-stroke' }, group);
        if (columns && rows) {
            let stripes = '', crosslines = '';
            for (let x = 1; x < columns; x++)
                stripes += `M${x * 100 / columns} 0V100`;
            for (let y = 1; y < rows; y++)
                crosslines += `M0 ${y * 100 / rows}H100`;
            make('path', { d: stripes, class: 'lb-logo-mesh lb-logo-stripes', 'vector-effect': 'non-scaling-stroke' }, group);
            make('path', { d: crosslines, class: 'lb-logo-mesh lb-logo-cross', 'vector-effect': 'non-scaling-stroke' }, group);
            make('path', { d: 'M0 0H100', class: 'lb-plane-scan', 'vector-effect': 'non-scaling-stroke' }, group);
            if (kind === 'back')
                make('rect', { x: '0', y: '77', width: '100', height: '14', class: 'lb-logo-floor' }, group);
            if (kind === 'front')
                make('path', { d: 'M21 14V100M83 14V100', class: 'lb-logo-mesh lb-logo-beams', 'vector-effect': 'non-scaling-stroke' }, group);
        }
    };
    // These open construction sheets stay in their original positions throughout
    // assembly. Only the four filled faces below participate in the logo morph.
    const roofs = make('g', { class: 'lb-logo-roofs' }, svg);
    [
        [[322.08, 41.213], [590.08, -25.605], [481, 59.59], [213, 126.408]],
        [[338.402, 266.112], [676.402, 230.587], [537, 293.238], [199, 328.763]],
    ].forEach((points, i) => {
        const sheet = make('g', { class: 'lb-logo-roof' }, roofs);
        const outline = format(points);
        make('polygon', { points: outline, class: 'lb-logo-face', 'vector-effect': 'non-scaling-stroke' }, sheet);
        make('polygon', { points: outline, class: 'lb-logo-signal', pathLength: '100', 'vector-effect': 'non-scaling-stroke', style: `--signal-delay:${2.5 + i * 4.2}s` }, sheet);
    });
    exports.ASSEMBLY_PLANES.forEach((facet, facetIndex) => {
        const group = make('g', { class: `lb-logo-facet lb-logo-facet-${facetIndex}` }, svg);
        const lerp = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
        if (facetIndex === 1) {
            for (let half = 0; half < 2; half++) {
                const target = [
                    lerp(facet[0], facet[3], half / 2), lerp(facet[1], facet[2], half / 2),
                    lerp(facet[1], facet[2], (half + 1) / 2), lerp(facet[0], facet[3], (half + 1) / 2),
                ];
                plane(group, half === 0 ? backGlass : frontGlass, target, 'glass', .25);
            }
        }
        else {
            plane(group, facetIndex === 0 ? front : back, facet.map(point => [...point]), facetIndex === 0 ? 'front' : 'back', 0, facetIndex === 0 ? 10 : 12, facetIndex === 0 ? 5 : 10);
        }
        const outline = format(facet);
        make('polygon', { points: outline, class: 'lb-logo-contour', pathLength: '100' }, group);
        make('polygon', { points: outline, class: 'lb-logo-signal', pathLength: '100', style: `--signal-delay:${5.2 + facetIndex * 1.8}s` }, group);
    });
    [exports.ASSEMBLY_PLANES[0][0], exports.ASSEMBLY_PLANES[0][2], exports.ASSEMBLY_PLANES[2][0], exports.ASSEMBLY_PLANES[2][2]].forEach(([cx, cy], i) => {
        const node = make('g', { class: 'lb-logo-node', style: `--ring-delay:${8 + i * 7}s` }, svg);
        make('circle', { cx: `${cx}`, cy: `${cy}`, r: '2.3', class: 'lb-logo-point' }, node);
        make('circle', { cx: `${cx}`, cy: `${cy}`, r: '10', class: 'lb-logo-ring' }, node);
    });
    return svg;
}
/** Progressive enhancement; the page keeps its content and original no-JS geometry. */
function mountLivingBlueprint(root) {
    const doc = root.ownerDocument;
    const win = doc.defaultView;
    if (!win)
        return () => { };
    const reduced = win.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = win.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 821px)');
    const compact = win.matchMedia('(max-width:820px)');
    const blueprint = root.querySelector('.blueprint');
    const hero = root.querySelector('.hero');
    const disposers = [];
    const decorations = [];
    const originalClasses = new Map();
    const originalStyles = new Map();
    const observed = new WeakSet();
    const boundCards = new WeakSet();
    let destroyed = false;
    let heroVisible = true;
    let scrollFrame = 0;
    let pointerFrame = 0;
    const pointerWrites = new Map();
    const clamp = (n, low, high) => Math.min(high, Math.max(low, n));
    function addClass(el, name) {
        if (!originalClasses.has(el))
            originalClasses.set(el, new Set(el.classList));
        el.classList.add(name);
    }
    function set(el, name, value) {
        if (!originalStyles.has(el))
            originalStyles.set(el, new Map());
        const styles = originalStyles.get(el);
        if (!styles.has(name))
            styles.set(name, el.style.getPropertyValue(name));
        el.style.setProperty(name, value);
    }
    function listen(el, type, fn) {
        el.addEventListener(type, fn, { passive: true });
        disposers.push(() => el.removeEventListener(type, fn));
    }
    function addPlaneTrace(selector, width, height, route) {
        const plane = blueprint?.querySelector(selector);
        if (!plane || typeof doc.createElementNS !== 'function')
            return;
        const ns = 'http://www.w3.org/2000/svg';
        const svg = doc.createElementNS(ns, 'svg');
        svg.setAttribute('class', 'lb-trace');
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');
        const paths = [
            ['lb-outline', `M.5 .5H${width - .5}V${height - .5}H.5Z`],
            ['lb-scan', `M0 ${height / 2}H${width}`],
            ['lb-route', route],
        ];
        paths.forEach(([name, d]) => {
            const path = doc.createElementNS(ns, 'path');
            path.setAttribute('class', name);
            path.setAttribute('d', d);
            path.setAttribute('pathLength', '100');
            svg.appendChild(path);
        });
        plane.appendChild(svg);
        decorations.push(svg);
    }
    function resetPointer(el, card = false) {
        const values = card ? { '--lb-card-rx': '0deg', '--lb-card-ry': '0deg', '--lb-highlight': '0' }
            : { '--lb-rx': '0deg', '--lb-ry': '0deg', '--lb-x': '0px', '--lb-y': '0px' };
        pointerWrites.delete(el);
        Object.entries(values).forEach(([key, value]) => set(el, key, value));
    }
    function queuePointer(el, values) {
        pointerWrites.set(el, values);
        if (pointerFrame)
            return;
        pointerFrame = win.requestAnimationFrame(() => {
            pointerFrame = 0;
            if (!destroyed && !reduced.matches && desktop.matches && !doc.hidden) {
                pointerWrites.forEach((values, element) => Object.entries(values).forEach(([key, value]) => set(element, key, value)));
            }
            pointerWrites.clear();
        });
    }
    function bindCard(card) {
        if (boundCards.has(card))
            return;
        boundCards.add(card);
        addClass(card, 'lb-tilt');
        listen(card, 'pointermove', e => {
            if (reduced.matches || !desktop.matches || e.pointerType === 'touch' || doc.hidden)
                return;
            const bounds = card.getBoundingClientRect();
            if (!bounds.width || !bounds.height)
                return;
            const x = clamp((e.clientX - bounds.left) / bounds.width - .5, -.5, .5);
            const y = clamp((e.clientY - bounds.top) / bounds.height - .5, -.5, .5);
            queuePointer(card, { '--lb-card-rx': `${-y * .6}deg`, '--lb-card-ry': `${x * .8}deg`, '--lb-glow-x': `${(x + .5) * 100}%`, '--lb-glow-y': `${(y + .5) * 100}%`, '--lb-highlight': '1' });
        });
        listen(card, 'pointerleave', () => resetPointer(card, true));
        listen(card, 'pointercancel', () => resetPointer(card, true));
    }
    const revealObserver = typeof win.IntersectionObserver === 'function' ? new win.IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting)
                return;
            addClass(entry.target, 'lb-visible');
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: .08, rootMargin: '0px 0px -12px 0px' }) : null;
    function register() {
        root.querySelectorAll('.section-heading, .service-card, .case-card, .step, .partner-layout, .cta-layout, .overview-card').forEach(el => {
            if (observed.has(el))
                return;
            observed.add(el);
            addClass(el, 'lb-reveal');
            const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
            const index = siblings.indexOf(el);
            set(el, '--lb-delay', `${Math.max(0, index % 5) * 45}ms`);
            const bounds = el.getBoundingClientRect();
            if (!revealObserver || reduced.matches || (bounds.top < win.innerHeight && bounds.bottom > 0))
                addClass(el, 'lb-visible');
            else
                revealObserver.observe(el);
        });
        root.querySelectorAll('.service-card').forEach(bindCard);
        root.querySelectorAll('.process-section, .services-section, .cta-structure').forEach(section => {
            if (observed.has(section))
                return;
            observed.add(section);
            addClass(section, 'lb-section');
            if (revealObserver && !reduced.matches)
                revealObserver.observe(section);
            else
                addClass(section, 'lb-visible');
        });
    }
    function applyScroll() {
        scrollFrame = 0;
        if (!hero || !blueprint || reduced.matches || !desktop.matches || doc.hidden)
            return;
        const bounds = hero.getBoundingClientRect();
        const progress = clamp(-bounds.top / Math.max(hero.offsetHeight * .82, 1), 0, 1);
        set(blueprint, '--lb-scroll-y', `${progress * 6}px`);
        set(blueprint, '--lb-back-x', `${progress * -6}px`);
        set(blueprint, '--lb-front-x', `${progress * 8}px`);
        set(blueprint, '--lb-axis-y', `${progress * 3}px`);
        set(blueprint, '--lb-fade', `${1 - progress * .06}`);
        const stack = root.querySelector('.layer-stack');
        if (stack)
            set(stack, '--lb-stack-y', `${progress * 2}px`);
    }
    function onScroll() {
        if (scrollFrame || reduced.matches || !desktop.matches || doc.hidden)
            return;
        scrollFrame = win.requestAnimationFrame(applyScroll);
    }
    function pauseHero() {
        if (blueprint)
            blueprint.classList.toggle('lb-paused', doc.hidden || !heroVisible);
        if (doc.hidden) {
            if (pointerFrame)
                win.cancelAnimationFrame(pointerFrame);
            pointerFrame = 0;
            pointerWrites.clear();
            if (scrollFrame)
                win.cancelAnimationFrame(scrollFrame);
            scrollFrame = 0;
        }
        else
            onScroll();
    }
    const heroObserver = hero && typeof win.IntersectionObserver === 'function' ? new win.IntersectionObserver(entries => {
        heroVisible = entries[0]?.isIntersecting ?? true;
        pauseHero();
    }, { threshold: 0 }) : null;
    function updateMode() {
        root.classList.toggle('lb-ready', !reduced.matches);
        root.classList.toggle('lb-desktop', !reduced.matches && desktop.matches);
        if (blueprint) {
            blueprint.querySelector('.lb-logo')?.setAttribute('viewBox', compact.matches ? '120 34 340 400' : '0 0 560 470');
            resetPointer(blueprint);
            ['--lb-scroll-y', '--lb-back-x', '--lb-front-x', '--lb-axis-y'].forEach(key => set(blueprint, key, '0px'));
            set(blueprint, '--lb-fade', '1');
        }
        root.querySelectorAll('.service-card').forEach(card => resetPointer(card, true));
        if (reduced.matches)
            root.querySelectorAll('.lb-reveal, .lb-section').forEach(el => addClass(el, 'lb-visible'));
        pauseHero();
        onScroll();
    }
    if (blueprint) {
        addClass(blueprint, 'lb-blueprint');
        const scene = blueprint.querySelector('.lb-scene');
        if (scene && typeof doc.createElementNS === 'function') {
            const logo = createLogoBlueprint(doc);
            scene.appendChild(logo);
            decorations.push(logo);
            addClass(blueprint, 'lb-logo-mode');
        }
        // Cue the mobile contour once when the actual illustration enters view,
        // rather than spending its short animation while the text is on screen.
        const bounds = blueprint.getBoundingClientRect();
        if (!revealObserver || reduced.matches || (bounds.top < win.innerHeight && bounds.bottom > 0))
            addClass(blueprint, 'lb-visible');
        else
            revealObserver.observe(blueprint);
        // Trace the existing 22px / 34×24px face grids without changing their geometry.
        addPlaneTrace('.building.back', 270, 230, 'M22 220V154H132V66H242');
        addPlaneTrace('.building.front', 340, 102, 'M34 96V48H170V24H306');
        blueprint.querySelectorAll('.axis').forEach(axis => set(axis, '--lb-distance', `${axis.offsetWidth}px`));
        // Hero motion is autonomous: no pointer listeners or cursor-driven transforms.
    }
    // React filter updates and the current HTML catalogue may insert new cards.
    const mutations = typeof win.MutationObserver === 'function' ? new win.MutationObserver(register) : null;
    const onFocus = (e) => {
        const el = e.target instanceof win.Element ? e.target.closest('.lb-reveal') : null;
        if (el)
            addClass(el, 'lb-visible');
    };
    register();
    mutations?.observe(root, { childList: true, subtree: true });
    heroObserver?.observe(hero);
    reduced.addEventListener('change', updateMode);
    desktop.addEventListener('change', updateMode);
    compact.addEventListener('change', updateMode);
    win.addEventListener('scroll', onScroll, { passive: true });
    doc.addEventListener('visibilitychange', pauseHero);
    root.addEventListener('focusin', onFocus);
    // Save root/blueprint class state before introducing runtime-only flags.
    if (!originalClasses.has(root))
        originalClasses.set(root, new Set(root.classList));
    updateMode();
    return () => {
        destroyed = true;
        revealObserver?.disconnect();
        heroObserver?.disconnect();
        mutations?.disconnect();
        reduced.removeEventListener('change', updateMode);
        desktop.removeEventListener('change', updateMode);
        compact.removeEventListener('change', updateMode);
        win.removeEventListener('scroll', onScroll);
        doc.removeEventListener('visibilitychange', pauseHero);
        root.removeEventListener('focusin', onFocus);
        disposers.forEach(dispose => dispose());
        decorations.forEach(decoration => decoration.remove());
        if (scrollFrame)
            win.cancelAnimationFrame(scrollFrame);
        if (pointerFrame)
            win.cancelAnimationFrame(pointerFrame);
        pointerWrites.clear();
        originalClasses.forEach((classes, el) => {
            [...el.classList].filter(name => name.startsWith('lb-') && !classes.has(name)).forEach(name => el.classList.remove(name));
        });
        originalStyles.forEach((styles, el) => styles.forEach((value, name) => value ? el.style.setProperty(name, value) : el.style.removeProperty(name)));
    };
}

function start() { const root = document.querySelector("main"); if (root) exports.mountLivingBlueprint(root); }
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true }); else start();
})();
