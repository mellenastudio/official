/* ==========================================================
   MELLENA Official Website
   script.js FINAL VERSION
========================================================== */

console.log("Lenis:", window.Lenis);

document.addEventListener("DOMContentLoaded", () => {

   const heroVideo = document.querySelector(".hero__video");

   if (heroVideo) {
    heroVideo.play().catch(() => {
        console.log("Autoplay blocked");
       });
   }

    if (!window.Lenis) {
        console.error("Lenis読み込み失敗（CDN問題）");
        return;
    }

    const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
});

    /* ======================================================
       ELEMENTS
    ====================================================== */

    const loading = document.getElementById("loading");
    const progress = document.getElementById("loadingProgress");
    const loadingText = document.getElementById("loadingText");

    const header = document.getElementById("header");
    const mobileNav = document.getElementById("mobileNav");
    const menuButton = document.getElementById("menuButton");
    const backTop = document.getElementById("backTop");

    const cursor = document.querySelector(".cursor");
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorLabel = document.querySelector(".cursor-label");

    /* ======================================================
       LOADING
    ====================================================== */

    let percent = 0;

    const loader = setInterval(() => {

        percent++;

        progress.style.width = percent + "%";
        loadingText.textContent = `Loading ${percent}%`;

        if (percent >= 100) {

            clearInterval(loader);

            gsap.to("#loading", {
                opacity: 0,
                duration: 0.8,
                onComplete: () => {
                    loading.style.display = "none";
                    heroAnimation();
                }
            });
        }

    }, 15);

    /* ======================================================
       HERO ANIMATION
    ====================================================== */

    function heroAnimation() {

        gsap.timeline()

            .from(".hero__eyebrow", { y: 30, opacity: 0 })
            .from(".hero__title", { y: 80, opacity: 0 }, "-=0.4")
            .from(".hero__subtitle", { y: 40, opacity: 0 }, "-=0.3")
            .from(".hero__text", { y: 30, opacity: 0 }, "-=0.3")
            .from(".hero__buttons", { y: 20, opacity: 0 }, "-=0.3")
            .from(".scroll-indicator", { opacity: 0 }, "-=0.2");

    }

    /* ======================================================
       HEADER SCROLL
    ====================================================== */

    window.addEventListener("scroll", () => {

        header.classList.toggle("scrolled", window.scrollY > 80);
        backTop.classList.toggle("show", window.scrollY > 600);

    });

    /* ======================================================
       MOBILE MENU
    ====================================================== */

    menuButton.addEventListener("click", () => {
        mobileNav.classList.toggle("active");
    });

    mobileNav.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
            mobileNav.classList.remove("active");
        });
    });

    /* ======================================================
       BACK TO TOP
    ====================================================== */

    backTop.addEventListener("click", () => {
        lenis.scrollTo(0);
    });

    /* ======================================================
       CURSOR
    ====================================================== */

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.transform = `translate(${mouseX}px,${mouseY}px)`;
        cursorDot.style.transform = `translate(${mouseX}px,${mouseY}px)`;
        cursorLabel.style.transform = `translate(${mouseX}px,${mouseY}px)`;

    });

    const hoverTargets = document.querySelectorAll("a,button,.work");

    hoverTargets.forEach(el => {

        el.addEventListener("mouseenter", () => {
            cursor.classList.add("active");
            cursorLabel.classList.add("show");

            if (el.classList.contains("work")) {
                cursorLabel.textContent = "VIEW";
            } else {
                cursorLabel.textContent = "OPEN";
            }
        });

        el.addEventListener("mouseleave", () => {
            cursor.classList.remove("active");
            cursorLabel.classList.remove("show");
        });

    });

    /* ======================================================
       SCROLL ANIMATIONS
    ====================================================== */

    gsap.utils.toArray("section").forEach(sec => {

        gsap.from(sec, {
            opacity: 0,
            y: 60,
            duration: 1,
            scrollTrigger: {
                trigger: sec,
                start: "top 80%"
            }
        });

    });

    /* ======================================================
       SERVICES / WORKS
    ====================================================== */

    gsap.from(".service", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".services",
            start: "top 80%"
        }
    });

    gsap.from(".work", {
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".works",
            start: "top 80%"
        }
    });

    /* ======================================================
       NUMBERS COUNTER
    ====================================================== */

    const counters = document.querySelectorAll(".number h2");

    counters.forEach(counter => {

        const target = +counter.dataset.count;

        ScrollTrigger.create({
            trigger: counter,
            start: "top 85%",
            once: true,
            onEnter: () => {

                let obj = { val: 0 };

                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: () => {
                        counter.textContent = Math.floor(obj.val);
                    }
                });

            }
        });

    });

    /* ======================================================
       PARALLAX
    ====================================================== */

    gsap.to(".hero__video", {
        y: 100,
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            scrub: true
        }
    });

    /* ======================================================
       NEWS
    ====================================================== */

    gsap.from(".news__item", {
        x: -50,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".news",
            start: "top 80%"
        }
    });

    /* ======================================================
       CONTACT
    ====================================================== */

    gsap.from(".contact-form input, .contact-form textarea, .contact-form button", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".contact",
            start: "top 80%"
        }
    });

let lenis;

if (typeof Lenis !== "undefined") {

    lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

function heroAnimation() {

    if (!window.gsap) return;

    gsap.timeline()
        .from(".hero__eyebrow", { y: 30, opacity: 0 })
        .from(".hero__title", { y: 80, opacity: 0 }, "-=0.4")
        .from(".hero__subtitle", { y: 40, opacity: 0 }, "-=0.3")
        .from(".hero__text", { y: 30, opacity: 0 }, "-=0.3")
        .from(".hero__buttons", { y: 20, opacity: 0 }, "-=0.3")
        .from(".scroll-indicator", { opacity: 0 }, "-=0.2");
}
