/* =========================================================
   MELLENA STUDIO
   FRONTEND JAVASCRIPT
   WHITE × YELLOW × BLACK
========================================================= */

"use strict";

/* =========================================================
   01. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initMobileMenu();
  initScrollReveal();
  initScrollProgress();
  initFooterYear();
  initSmoothScroll();
  initMarquee();
  initImageFallback();
});


/* =========================================================
   02. LOADING SCREEN
========================================================= */

function initLoader() {
  const loader = document.querySelector(".loader");
  const percent = document.querySelector(".loader-percent");
  const progressBar = document.querySelector(".loader-line span");

  if (!loader) {
    document.body.classList.remove("loading");
    return;
  }

  document.body.classList.add("loading");

  let progress = 0;
  let finished = false;

  const duration = 1200;
  const startTime = performance.now();

  function updateProgress(now) {
    if (finished) return;

    const elapsed = now - startTime;

    // 最後は100%まで進める
    progress = Math.min(
      100,
      Math.round((elapsed / duration) * 100)
    );

    if (percent) {
      percent.textContent =
        `${String(progress).padStart(2, "0")}%`;
    }

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (progress < 100) {
      requestAnimationFrame(updateProgress);
    }
  }

  requestAnimationFrame(updateProgress);

  function hideLoader() {
    if (finished) return;

    finished = true;

    if (percent) {
      percent.textContent = "100%";
    }

    if (progressBar) {
      progressBar.style.width = "100%";
    }

    // CSSの進捗アニメーションと同期させる
    setTimeout(() => {
      loader.classList.add("is-hidden");
      document.body.classList.remove("loading");

      // 初期表示位置での表示要素をチェック
      window.dispatchEvent(new Event("scroll"));

      setTimeout(() => {
  loader.remove();

  // スクロールを妨げる設定を解除
  document.documentElement.style.removeProperty("overflow");
  document.body.style.removeProperty("overflow");

  document.documentElement.style.removeProperty("position");
  document.body.style.removeProperty("position");

  document.documentElement.classList.remove("no-scroll");
  document.body.classList.remove("no-scroll");

      }, 5000);
    }, 180);
  }

  // ページの読み込みが完了したら終了
  if (document.readyState === "complete") {
    setTimeout(hideLoader, 350);
  } else {
    window.addEventListener("load", () => {
      setTimeout(hideLoader, 350);
    }, { once: true });
  }

  // 通信状況などにかかわらずローディングが残らないようにする
  setTimeout(hideLoader, 2500);
}


/* =========================================================
   03. MOBILE MENU
========================================================= */

function initMobileMenu() {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (!menuButton || !navigation) return;

  const body = document.body;

  function openMenu() {
    navigation.classList.add("open");
    menuButton.classList.add("active");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "メニューを閉じる");

    body.classList.add("menu-open");
  }

  function closeMenu() {
    navigation.classList.remove("open");
    menuButton.classList.remove("active");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "メニューを開く");

    body.classList.remove("menu-open");
  }

  function toggleMenu() {
    const isOpen = navigation.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuButton.addEventListener("click", toggleMenu);

  // ナビゲーションを選択したら閉じる
  navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Escキーで閉じる
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // PC表示へ切り替わったらメニューをリセット
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });

  // メニュー外をクリックした場合にも閉じる
  document.addEventListener("click", event => {
    const isOpen = navigation.classList.contains("open");

    if (!isOpen) return;

    if (
      !navigation.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMenu();
    }
  });
}


/* =========================================================
   04. SCROLL REVEAL
========================================================= */

function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (!elements.length) return;

  // ブラウザがIntersectionObserverに対応していない場合
  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => {
      element.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          // 一度表示した要素は監視を終了
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -45px 0px",
      threshold: 0.08
    }
  );

  elements.forEach((element, index) => {
    // 同じグループ内の要素に少しだけ時間差をつける
    if (element.classList.contains("service-item")) {
      const siblings = Array.from(
        element.parentElement.children
      );

      const siblingIndex = siblings.indexOf(element);

      element.style.transitionDelay =
        `${Math.min(siblingIndex * 70, 280)}ms`;
    }

    observer.observe(element);
  });
}


/* =========================================================
   05. SCROLL PROGRESS BAR
========================================================= */

function initScrollProgress() {
  const progressBar = document.querySelector(".scroll-progress");

  if (!progressBar) return;

  let ticking = false;

  function updateProgress() {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    let progress = 0;

    if (documentHeight > 0) {
      progress = (scrollTop / documentHeight) * 100;
    }

    progress = Math.max(0, Math.min(100, progress));

    progressBar.style.width = `${progress}%`;

    ticking = false;
  }

  function requestUpdate() {
    if (ticking) return;

    ticking = true;

    window.requestAnimationFrame(updateProgress);
  }

  window.addEventListener("scroll", requestUpdate, {
    passive: true
  });

  window.addEventListener("resize", requestUpdate);

  updateProgress();
}


/* =========================================================
   06. FOOTER YEAR
========================================================= */

function initFooterYear() {
  const yearElements = document.querySelectorAll("[data-year]");

  const currentYear = new Date().getFullYear();

  yearElements.forEach(element => {
    element.textContent = currentYear;
  });
}


/* =========================================================
   07. SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener("click", event => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: getScrollBehavior(),
        block: "start"
      });

      // URLのハッシュも更新
      if (history.replaceState) {
        history.replaceState(null, "", href);
      }
    });
  });
}


/* =========================================================
   08. SCROLL BEHAVIOR
========================================================= */

function getScrollBehavior() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  return prefersReducedMotion ? "auto" : "smooth";
}


/* =========================================================
   09. MARQUEE
========================================================= */

function initMarquee() {
  const marqueeTrack = document.querySelector(".marquee-track");

  if (!marqueeTrack) return;

  const mediaQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  function updateMarquee() {
    if (mediaQuery.matches) {
      marqueeTrack.style.animation = "none";
    } else {
      marqueeTrack.style.removeProperty("animation");
    }
  }

  updateMarquee();

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", updateMarquee);
  } else {
    mediaQuery.addListener(updateMarquee);
  }
}


/* =========================================================
   10. IMAGE FALLBACK
========================================================= */

function initImageFallback() {
  const images = document.querySelectorAll("img");

  images.forEach(img => {
    img.addEventListener("error", () => {
      // ロゴ画像が見つからない場合などに、
      // 壊れた画像アイコンを表示し続けない
      img.classList.add("image-load-error");

      // altテキストはアクセシビリティのため維持
      img.setAttribute("data-image-error", "true");
    }, { once: true });
  });
}


/* =========================================================
   11. CURRENT PAGE NAVIGATION
========================================================= */

function initCurrentPageNavigation() {
  const currentPath = window.location.pathname;

  document.querySelectorAll(".main-nav a").forEach(link => {
    const href = link.getAttribute("href");

    if (!href || href.startsWith("#")) return;

    const linkUrl = new URL(href, window.location.href);

    if (linkUrl.pathname === currentPath) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

initCurrentPageNavigation();


/* =========================================================
   12. BACK TO TOP
   .back-to-top クラスを持つ要素がある場合のみ動作
========================================================= */

function initBackToTop() {
  const button = document.querySelector(".back-to-top");

  if (!button) return;

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: getScrollBehavior()
    });
  });

  function updateButton() {
    button.classList.toggle("is-visible", window.scrollY > 400);
  }

  window.addEventListener("scroll", updateButton, {
    passive: true
  });

  updateButton();
}

initBackToTop();


/* =========================================================
   13. CONSOLE MESSAGE
========================================================= */

console.log(
  "%c MELLENA STUDIO ",
  "background:#ffc247;color:#111;font-size:16px;font-weight:bold;padding:8px 12px;"
);

console.log(
  "%cCreate What's Next.",
  "color:#111;font-size:12px;font-weight:bold;"
);
