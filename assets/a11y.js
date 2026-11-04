// 阅读设置：字号放大缩小、高对比度配色。不开 JavaScript 也能正常阅读，这里只是锦上添花。
(function () {
  var root = document.documentElement;
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var MIN = -1, MAX = 3;
  document.querySelectorAll('[data-font-step]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cur = parseInt(root.getAttribute('data-font') || '0', 10);
      var next = Math.max(MIN, Math.min(MAX, cur + parseInt(btn.getAttribute('data-font-step'), 10)));
      if (next === 0) root.removeAttribute('data-font'); else root.setAttribute('data-font', String(next));
      save('pingshi-font', next === 0 ? '' : String(next));
    });
  });

  var t = document.getElementById('theme-toggle');
  if (t) {
    var sync = function () { t.setAttribute('aria-pressed', root.getAttribute('data-theme') === 'contrast' ? 'true' : 'false'); };
    sync();
    t.addEventListener('click', function () {
      if (root.getAttribute('data-theme') === 'contrast') { root.removeAttribute('data-theme'); save('pingshi-theme', ''); }
      else { root.setAttribute('data-theme', 'contrast'); save('pingshi-theme', 'contrast'); }
      sync();
    });
  }
})();
