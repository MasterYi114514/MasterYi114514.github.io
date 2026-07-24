/**
 * 代码块字体大小调整按钮
 * 在右下角工具栏添加 +/- 按钮，允许调整代码字体大小
 */
document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'code-font-size';
  const MIN = 12;
  const MAX = 22;
  const DEFAULT = 14;
  const STEP = 1;

  // 读取已保存的字体大小
  let currentSize = parseInt(localStorage.getItem(STORAGE_KEY)) || DEFAULT;

  // 应用字体大小到所有代码块
  function applyFontSize(size) {
    document.querySelectorAll('figure.highlight pre, figure.highlight code, .container pre code').forEach(el => {
      el.style.fontSize = size + 'px';
    });
    // 同步调整行号
    document.querySelectorAll('figure.highlight .line, figure.highlight .gutter pre').forEach(el => {
      el.style.fontSize = size + 'px';
    });
  }

  // 创建按钮
  function createBtn(icon, title, onClick) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.title = title;
    btn.innerHTML = `<i class="${icon}"></i>`;
    btn.addEventListener('click', onClick);
    return btn;
  }

  // 插入按钮到 rightside
  function injectButtons() {
    const rightsideShow = document.getElementById('rightside-config-show');
    if (!rightsideShow) return;

    const minusBtn = createBtn('fas fa-minus', '缩小代码字体', () => {
      if (currentSize > MIN) {
        currentSize -= STEP;
        applyFontSize(currentSize);
        localStorage.setItem(STORAGE_KEY, currentSize);
      }
    });

    const plusBtn = createBtn('fas fa-plus', '放大代码字体', () => {
      if (currentSize < MAX) {
        currentSize += STEP;
        applyFontSize(currentSize);
        localStorage.setItem(STORAGE_KEY, currentSize);
      }
    });

    const resetBtn = createBtn('fas fa-font', '重置代码字体', () => {
      currentSize = DEFAULT;
      applyFontSize(currentSize);
      localStorage.setItem(STORAGE_KEY, currentSize);
    });

    // 插入到回顶部按钮之前
    const goUpBtn = document.getElementById('go-up');
    if (goUpBtn) {
      goUpBtn.before(minusBtn, resetBtn, plusBtn);
    } else {
      rightsideShow.appendChild(minusBtn);
      rightsideShow.appendChild(resetBtn);
      rightsideShow.appendChild(plusBtn);
    }
  }

  // 初始化
  applyFontSize(currentSize);
  injectButtons();
});
