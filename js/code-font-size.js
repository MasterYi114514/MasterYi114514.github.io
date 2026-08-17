/**
 * 文章字体大小调整按钮
 * 在右下角工具栏添加 −/A/+ 按钮，调整文章正文字体大小
 * 代码块字体同步按比例缩放
 */
document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'article-font-size';
  const MIN = 14;
  const MAX = 22;
  const DEFAULT = 16;
  const STEP = 1;
  // 代码块字体相对于正文的比例（默认 14/16）
  const CODE_RATIO = 14 / 16;

  // 读取已保存的字体大小
  let currentSize = parseInt(localStorage.getItem(STORAGE_KEY)) || DEFAULT;

  // 应用字体大小
  function applyFontSize(size) {
    // 文章正文区域
    const container = document.getElementById('article-container');
    if (container) {
      container.style.fontSize = size + 'px';
    }
    // 代码块按比例同步缩放
    const codeSize = Math.round(size * CODE_RATIO);
    document.querySelectorAll('figure.highlight pre, figure.highlight code, .container pre code').forEach(el => {
      el.style.fontSize = codeSize + 'px';
    });
    // 代码块行号同步
    document.querySelectorAll('figure.highlight .line, figure.highlight .gutter pre').forEach(el => {
      el.style.fontSize = codeSize + 'px';
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

    const minusBtn = createBtn('fas fa-minus', '缩小文章字体', () => {
      if (currentSize > MIN) {
        currentSize -= STEP;
        applyFontSize(currentSize);
        localStorage.setItem(STORAGE_KEY, currentSize);
      }
    });

    const plusBtn = createBtn('fas fa-plus', '放大文章字体', () => {
      if (currentSize < MAX) {
        currentSize += STEP;
        applyFontSize(currentSize);
        localStorage.setItem(STORAGE_KEY, currentSize);
      }
    });

    const resetBtn = createBtn('fas fa-font', '重置文章字体', () => {
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
