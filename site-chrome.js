/* Shared site header + footer, injected so the markup lives in one place.
   Path prefix is recovered from this script's own src (works under file://
   and http), and the active nav item is inferred from the URL. Runs inline
   (not deferred) so chrome exists before page scripts that read it. */
(function () {
  var me = document.currentScript;
  var prefix = (me ? me.getAttribute('src') : '').replace(/site-chrome\.js.*$/, '');

  var path = location.pathname;
  var section = 'about';
  if (/filmography/.test(path)) section = 'filmography';
  else if (/blackboard/.test(path)) section = 'blackboard';
  else if (/playground/.test(path)) section = 'playground';

  var items = [
    ['filmography', 'filmography.html', 'Filmography'],
    ['blackboard', 'blackboard.html', 'Blackboard'],
    ['playground', 'playground.html', 'Playground']
  ];

  var nav = items.map(function (it) {
    var cur = it[0] === section ? ' class="nav-current" aria-current="page"' : '';
    return '<a href="' + prefix + it[1] + '"' + cur + '>' + it[2] + '</a>';
  }).join('');

  var logoCurrent = section === 'about' ? ' aria-current="page"' : '';

  var header =
    '<div class="site-header-inner">' +
      '<div class="logo-block">' +
        '<a href="' + prefix + 'index.html" class="logo-text"' + logoCurrent + '>LIM YESUNG</a>' +
      '</div>' +
      '<nav class="site-nav">' + nav + '</nav>' +
    '</div>';

  var footer =
    '<div class="site-footer-inner">' +
      '<span>© 2026</span>' +
      '<span>limyesung</span>' +
      '<a href="https://github.com/imyesung" class="footer-github" aria-label="GitHub">' +
        '<svg class="github-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>' +
      '</a>' +
    '</div>';

  var h = document.querySelector('[data-site-header]');
  if (h) { h.className = 'site-header'; h.innerHTML = header; }

  var f = document.querySelector('[data-site-footer]');
  if (f) { f.className = 'site-footer'; f.innerHTML = footer; }

  /* Keep math available site-wide without charging every page for MathJax.
     Pages containing TeX delimiters load the same MathJax 3 renderer used by
     the reference article; ordinary pages make no extra network request. */
  var pageText = document.body ? document.body.textContent : '';
  var hasMath = /\\\(|\\\[/.test(pageText);
  var hasMathJaxLoader = Array.prototype.some.call(document.scripts, function (script) {
    return /mathjax/i.test(script.src);
  });

  if (hasMath && !hasMathJaxLoader) {
    var mathJaxConfig = window.MathJax || {};
    mathJaxConfig.tex = mathJaxConfig.tex || {};
    if (!mathJaxConfig.tex.inlineMath) mathJaxConfig.tex.inlineMath = [['\\(', '\\)']];
    if (!mathJaxConfig.tex.displayMath) mathJaxConfig.tex.displayMath = [['\\[', '\\]']];
    if (typeof mathJaxConfig.tex.processEscapes === 'undefined') {
      mathJaxConfig.tex.processEscapes = true;
    }
    window.MathJax = mathJaxConfig;

    var mathScript = document.createElement('script');
    mathScript.id = 'MathJax-script';
    mathScript.async = true;
    mathScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-mml-chtml.js';
    document.head.appendChild(mathScript);
  }
})();
