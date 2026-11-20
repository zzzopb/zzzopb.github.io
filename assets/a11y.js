// 阅读设置：字号放大缩小、高对比度配色。不开 JavaScript 也能正常阅读，这里只是锦上添花。
(function () {
  var root = document.documentElement;
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var MIN = -1, MAX = 3;
  var NAMES = { '-1': '小', '0': '标准', '1': '大', '2': '较大', '3': '特大' };
  var now = document.getElementById('font-now');  // 按钮中间看得见的"字号：标准"
  var say = document.getElementById('font-say');  // 看不见、专门让读屏软件念的区域
  function curFont() { return parseInt(root.getAttribute('data-font') || '0', 10); }
  function show() { if (now) now.textContent = '字号：' + NAMES[curFont()]; }
  function speak(msg) {
    if (!say) return;
    // 先清空再填，这样连按两次"已经是最大字号"也会再念一遍
    say.textContent = '';
    setTimeout(function () { say.textContent = msg; }, 50);
  }
  show();  // 打开页面时显示读者上次选的字号（这时不念，免得每页都念一遍）

  document.querySelectorAll('[data-font-step]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cur = curFont();
      var next = cur + parseInt(btn.getAttribute('data-font-step'), 10);
      if (next > MAX) { speak('已经是最大字号'); return; }
      if (next < MIN) { speak('已经是最小字号'); return; }
      if (next === 0) root.removeAttribute('data-font'); else root.setAttribute('data-font', String(next));
      save('pingshi-font', next === 0 ? '' : String(next));
      show();
      speak('字号：' + NAMES[next]);
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
