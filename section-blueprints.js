/* Native WebGL enhancement of the existing section drawings. No dependencies. */
(function () {
  'use strict';
  const vertexSource = `
    attribute vec3 aPosition;
    attribute float aLayer;
    attribute vec4 aColor;
    uniform vec2 uFit;
    uniform vec2 uPointer;
    uniform float uProgress;
    uniform float uEntrance;
    uniform float uKind;
    uniform float uDpr;
    varying vec4 vColor;
    void main() {
      vec3 p = aPosition;
      if (aLayer > 0.5) {
        if (uKind < 1.5) p.y += p.z * .90 * uProgress;
        else if (uKind > 3.5 && uKind < 4.5) {
          p.x += p.z * .90 * uProgress;
          p.y += p.z * .40 * uProgress;
        } else p.x += p.z * .25 * uProgress;
        float rx = uProgress * .10 + uPointer.y * .035;
        float ry = uProgress * .15 + uPointer.x * .065;
        p.yz = mat2(cos(rx), sin(rx), -sin(rx), cos(rx)) * p.yz;
        p.xz = mat2(cos(ry), -sin(ry), sin(ry), cos(ry)) * p.xz;
        p.xy *= 900.0 / (900.0 + p.z);
        p.y += (1.0 - uEntrance) * 8.0;
      }
      gl_Position = vec4(p.x / 200.0 * uFit.x, -p.y / 130.0 * uFit.y, 0.0, 1.0);
      gl_PointSize = 6.0 * uDpr;
      vColor = aColor;
      vColor.a *= smoothstep(0.0, 1.0, clamp(uEntrance * 1.55 - aLayer * .12, 0.0, 1.0));
    }`;
  const fragmentSource = `
    precision mediump float;
    uniform float uPoint;
    varying vec4 vColor;
    void main() {
      float alpha = vColor.a;
      if (uPoint > .5) alpha *= 1.0 - smoothstep(.12, .5, length(gl_PointCoord - .5));
      gl_FragColor = vec4(vColor.rgb, alpha);
    }`;
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  function routeSampler(route) {
    const distances = [0];
    for (let i = 1; i < route.length; i++) {
      distances.push(distances[i - 1] + Math.hypot(route[i][0] - route[i - 1][0], route[i][1] - route[i - 1][1]));
    }
    return t => {
      const distance = clamp(t, 0, 1) * distances[distances.length - 1];
      let i = 1;
      while (i < distances.length - 1 && distances[i] < distance) i++;
      const fraction = (distance - distances[i - 1]) / Math.max(.001, distances[i] - distances[i - 1]);
      return route[i - 1].map((value, axis) => value + (route[i][axis] - value) * fraction);
    };
  }

  function createRenderer(host, mesh, kind, onFailure) {
    const canvas = document.createElement('canvas');
    canvas.className = 'section-blueprint-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.setAttribute('role', 'presentation');
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, depth: false, stencil: false });
    if (!gl) return null;
    const shaders = [], buffers = [];
    let program, frame = 0, destroyed = false, visible = true;
    let width = 0, height = 0, dpr = 1, progress = 0, target = 0;
    let pointer = [0, 0], pointerTarget = [0, 0];
    let enteredAt = 0, burstAt = -10000, lastBurstAt = -10000;
    const sample = routeSampler(mesh.route);

    const shader = (type, source) => {
      const value = gl.createShader(type);
      shaders.push(value);
      gl.shaderSource(value, source);
      gl.compileShader(value);
      if (!gl.getShaderParameter(value, gl.COMPILE_STATUS)) throw new Error('Blueprint shader unavailable');
      return value;
    };
    const buffer = (data, dynamic = false) => {
      const value = gl.createBuffer();
      buffers.push(value);
      gl.bindBuffer(gl.ARRAY_BUFFER, value);
      gl.bufferData(gl.ARRAY_BUFFER, dynamic ? 12 * 8 * 4 : new Float32Array(data), dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW);
      return { value, count: dynamic ? 12 : data.length / 8 };
    };
    let faces, lines, pulse, attrs, uniforms;
    try {
      program = gl.createProgram();
      gl.attachShader(program, shader(gl.VERTEX_SHADER, vertexSource));
      gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragmentSource));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Blueprint program unavailable');
      faces = buffer(mesh.faces); lines = buffer(mesh.lines); pulse = buffer([], true);
      attrs = ['aPosition', 'aLayer', 'aColor'].map(name => gl.getAttribLocation(program, name));
      uniforms = Object.fromEntries(['uFit', 'uPointer', 'uProgress', 'uEntrance', 'uKind', 'uDpr', 'uPoint'].map(name => [name, gl.getUniformLocation(program, name)]));
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
    } catch {
      buffers.forEach(value => gl.deleteBuffer(value));
      shaders.forEach(value => gl.deleteShader(value));
      if (program) gl.deleteProgram(program);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return null;
    }

    function request() {
      if (!frame && !destroyed && visible && !document.hidden) frame = requestAnimationFrame(render);
    }
    function measure() {
      const box = canvas.getBoundingClientRect();
      if (!box.width || !box.height) return false;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (width !== box.width || height !== box.height || canvas.width !== Math.round(box.width * dpr)) {
        width = box.width; height = box.height;
        canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
      return true;
    }
    function draw(batch, mode) {
      gl.bindBuffer(gl.ARRAY_BUFFER, batch.value);
      attrs.forEach(location => gl.enableVertexAttribArray(location));
      gl.vertexAttribPointer(attrs[0], 3, gl.FLOAT, false, 32, 0);
      gl.vertexAttribPointer(attrs[1], 1, gl.FLOAT, false, 32, 12);
      gl.vertexAttribPointer(attrs[2], 4, gl.FLOAT, false, 32, 16);
      gl.drawArrays(mode, 0, batch.count);
    }
    function render(now) {
      frame = 0;
      if (destroyed || !visible || document.hidden || !measure()) return;
      if (!enteredAt) { enteredAt = now; burstAt = now + 500; lastBurstAt = now; }
      progress += (target - progress) * .18;
      pointer = pointer.map((n, i) => n + (pointerTarget[i] - n) * .16);
      const entrance = clamp((now - enteredAt) / 850, 0, 1);
      const scale = Math.min(width / 400, height / 260);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform2f(uniforms.uFit, scale * 400 / width, scale * 260 / height);
      gl.uniform2f(uniforms.uPointer, pointer[0], pointer[1]);
      gl.uniform1f(uniforms.uProgress, progress);
      gl.uniform1f(uniforms.uEntrance, entrance);
      gl.uniform1f(uniforms.uKind, kind);
      gl.uniform1f(uniforms.uDpr, dpr);
      gl.uniform1f(uniforms.uPoint, 0);
      draw(faces, gl.TRIANGLES); draw(lines, gl.LINES);
      const phase = (now - burstAt) / 1250;
      if (phase >= 0 && phase <= 1) {
        const data = [];
        const opacity = Math.min(1, phase * 12, (1 - phase) * 10) * .85;
        for (let i = 0; i < 12; i++) {
          data.push(...sample(phase - (11 - i) * .008), 22 / 255, 199 / 255, 217 / 255, opacity * i / 11);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, pulse.value);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(data));
        draw(pulse, gl.LINE_STRIP);
        gl.uniform1f(uniforms.uPoint, 1);
        gl.drawArrays(gl.POINTS, 11, 1);
      }
      host.classList.add('section-blueprint-active');
      canvas.dataset.scrollProgress = progress.toFixed(3);
      // Stop completely after the entrance, scroll easing and short signal finish.
      if (entrance < 1 || phase < 1 || Math.abs(target - progress) > .0005 || pointer.some((n, i) => Math.abs(n - pointerTarget[i]) > .001)) request();
    }
    function scroll() {
      const section = host.parentElement;
      const box = section.getBoundingClientRect();
      const next = clamp(-box.top / Math.max(1, section.offsetHeight * .4), 0, 1);
      const now = performance.now();
      if (Math.abs(next - target) > .006 && now - lastBurstAt > 1000 && visible) {
        burstAt = now; lastBurstAt = now;
      }
      target = next;
      request();
    }
    function move(event) {
      if (event.pointerType === 'touch') return;
      const box = canvas.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) return leave();
      pointerTarget = [clamp((event.clientX - box.left) / box.width * 2 - 1, -1, 1), clamp((event.clientY - box.top) / box.height * 2 - 1, -1, 1)];
      request();
    }
    function leave() { pointerTarget = [0, 0]; request(); }
    function visibility() {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else scroll();
    }
    function lost(event) {
      event.preventDefault();
      destroy();
      onFailure();
    }
    const observer = typeof IntersectionObserver === 'function' ? new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) scroll();
      else { cancelAnimationFrame(frame); frame = 0; }
    }) : null;
    function destroy() {
      if (destroyed) return;
      destroyed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', scroll);
      document.removeEventListener('visibilitychange', visibility);
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerleave', leave);
      host.removeEventListener('pointercancel', leave);
      canvas.removeEventListener('webglcontextlost', lost);
      buffers.forEach(value => gl.deleteBuffer(value));
      shaders.forEach(value => gl.deleteShader(value));
      gl.deleteProgram(program);
      canvas.remove();
      host.classList.remove('section-blueprint-active');
      if (!gl.isContextLost()) gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
    host.appendChild(canvas);
    canvas.addEventListener('webglcontextlost', lost);
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll, { passive: true });
    document.addEventListener('visibilitychange', visibility);
    host.addEventListener('pointermove', move, { passive: true });
    host.addEventListener('pointerleave', leave, { passive: true });
    host.addEventListener('pointercancel', leave, { passive: true });
    observer?.observe(host.parentElement);
    scroll();
    return { destroy };
  }

  function start() {
    const page = document.body.dataset.page;
    const kinds = { services: 1, cases: 2, technologies: 3, knowledge: 4, company: 5 };
    const host = document.querySelector('.section-intro--diagram > .container');
    const mesh = window.NFORMA_BLUEPRINT_MESHES?.[page];
    if (!host || !mesh) return;
    const desktop = matchMedia('(min-width:901px) and (hover:hover) and (pointer:fine)');
    const reduced = matchMedia('(prefers-reduced-motion:reduce)');
    let renderer = null, failed = false;
    function update() {
      const enabled = desktop.matches && !reduced.matches && !failed;
      if (!enabled) { renderer?.destroy(); renderer = null; }
      else if (!renderer) renderer = createRenderer(host, mesh, kinds[page], () => { failed = true; renderer = null; });
    }
    function stop() {
      renderer?.destroy(); renderer = null;
      desktop.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
      window.removeEventListener('pagehide', stop);
    }
    desktop.addEventListener('change', update);
    reduced.addEventListener('change', update);
    window.addEventListener('pagehide', stop, { once: true });
    update();
  }
  window.addEventListener('pageshow', event => { if (event.persisted) start(); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
