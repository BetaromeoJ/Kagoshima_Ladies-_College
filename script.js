// ============================================================
// 鹿児島レディスカレッジ「スマホ1台でできる！生成AI×広報デザイン実践講座」
// 共通スクリプト
//
// 構成:
//   1. initSplash()        … オープニング演出（全ページ共通）。幕（ローズ×ラベンダー
//                              のグラデーション）が下から上へ流れて2秒程度で消える。
//                              sessionStorageを使い、ページごとに同一セッション中は
//                              一度だけ表示する（再訪時は表示しない）。
//   2. initHeroReveal()    … ヒーローの英文コピーを静かにフェードインさせる。
//   3. initScrollReveal()  … セクション見出しなどを、スクロールで少しだけ
//                              浮き上がらせる（IntersectionObserver・軽量）。
//   4. initMobileNav()     … 固定ヘッダーのハンバーガーメニュー開閉。
//   5. initBottomNav()     … スマホ下部固定ナビの現在地ハイライト。
//   6. initBackToTop()     … 一定量スクロールしたら「トップへ戻る」ボタンを表示。
//   7. initCopyButtons()   … プロンプトのコピー機能＋「コピーしました」トースト。
//   8. initAccordions()    … 開閉式の項目（使うページがあれば）。
//   9. initSmoothAnchors() … ページ内リンクのスムーススクロール。
// ============================================================

function initSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const storageKey = 'klc-splash-shown:' + location.pathname;
  const alreadyShown = sessionStorage.getItem(storageKey) === '1';

  if (alreadyShown || prefersReducedMotion) {
    splash.remove();
    return;
  }

  sessionStorage.setItem(storageKey, '1');

  const closeSplash = () => {
    splash.classList.add('hide');
    setTimeout(() => splash.remove(), 650);
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(() => splash.classList.add('show'));
  });

  // 演出は2秒程度で終わり、操作を妨げない（幕が下から上へ流れて消える）
  setTimeout(closeSplash, 2000);
}

function initHeroReveal() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => hero.classList.add('is-ready'));
  });
}

function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('in'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  targets.forEach((el) => observer.observe(el));
}

function initMobileNav() {
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('mobileNav');
  const overlay = document.getElementById('navOverlay');
  const closeBtn = document.getElementById('navCloseBtn');
  if (!menuBtn || !nav || !overlay) return;

  const openNav = () => {
    nav.classList.add('open');
    overlay.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
  };
  const closeNav = () => {
    nav.classList.remove('open');
    overlay.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  };

  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    expanded ? closeNav() : openNav();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  overlay.addEventListener('click', closeNav);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeNav));
}

function initBottomNav() {
  const links = document.querySelectorAll('.bottom-nav a[href^="#"]');
  const headerLinks = document.querySelectorAll('.header-nav a[href^="#"]');
  if (!links.length && !headerLinks.length) return;

  const idToLinks = new Map();
  [...links, ...headerLinks].forEach((a) => {
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    if (!idToLinks.has(id)) idToLinks.set(id, []);
    idToLinks.get(id).push(a);
  });

  const sections = [...idToLinks.keys()]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  if (!sections.length || !('IntersectionObserver' in window)) return;

  const setActive = (id) => {
    idToLinks.forEach((linkList, key) => {
      linkList.forEach((a) => a.classList.toggle('active', key === id));
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach((sec) => observer.observe(sec));
}

function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  const toggle = () => {
    if (window.scrollY > 480) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  };
  window.addEventListener('scroll', toggle, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  toggle();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  const label = toast.querySelector('.toast-label');
  if (label) label.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 2000);
}

function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    const targetSel = btn.getAttribute('data-copy-target');
    const source = targetSel ? document.querySelector(targetSel) : null;
    if (!source) return;

    const defaultLabel = btn.querySelector('.copy-label');
    const originalText = defaultLabel ? defaultLabel.textContent : '';
    const liveRegion = document.getElementById('copy-announcer');

    btn.addEventListener('click', () => {
      const text = source.innerText || source.textContent || '';

      const onSuccess = () => {
        btn.classList.add('copied');
        if (defaultLabel) defaultLabel.textContent = 'コピーしました';
        if (liveRegion) liveRegion.textContent = 'プロンプトをコピーしました';
        showToast('コピーしました！');
        setTimeout(() => {
          btn.classList.remove('copied');
          if (defaultLabel) defaultLabel.textContent = originalText;
        }, 2000);
      };

      const fallbackCopy = () => {
        try {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.setAttribute('readonly', '');
          textarea.style.position = 'absolute';
          textarea.style.left = '-9999px';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          onSuccess();
        } catch (err) {
          if (liveRegion) liveRegion.textContent = 'コピーに失敗しました。テキストを選択して手動でコピーしてください。';
        }
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
    });
  });
}

function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const panelId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.classList.toggle('open', !expanded);
    });
  });
}

function initSmoothAnchors() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
}

function initTapLift() {
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.add('lift');
      setTimeout(() => btn.classList.remove('lift'), 260);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSplash();
  initHeroReveal();
  initScrollReveal();
  initMobileNav();
  initBottomNav();
  initBackToTop();
  initCopyButtons();
  initAccordions();
  initSmoothAnchors();
  initTapLift();
});
