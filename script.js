/* ==========================================================
   MELLENA Official Website
   script.js
   Part1
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       GSAP
    ========================================== */

    gsap.registerPlugin(ScrollTrigger);

    /* ==========================================
       Lenis
    ========================================== */

    const lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 1
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    /* ==========================================
       Loading
    ========================================== */

    const loading = document.getElementById("loading");
    const progress = document.getElementById("loadingProgress");
    const text = document.getElementById("loadingText");

    let percent = 0;

    const timer = setInterval(() => {

        percent++;

        progress.style.width = percent + "%";
        text.textContent = `Loading ${percent}%`;

        if (percent >= 100) {

            clearInterval(timer);

            gsap.to("#loading", {
                opacity: 0,
                duration: 0.8,
                delay: 0.3,
                onComplete() {

                    loading.style.display = "none";

                }
            });

            heroAnimation();

        }

    }, 18);

    /* ==========================================
       Header
    ========================================== */

    const header = document.getElementById("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

    /* ==========================================
       Mobile Menu
    ========================================== */

    const menuButton = document.getElementById("menuButton");
    const mobileNav = document.getElementById("mobileNav");

    menuButton.addEventListener("click", () => {

        mobileNav.classList.toggle("active");

    });

    mobileNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("active");

        });

    });

    /* ==========================================
       Hero Animation
    ========================================== */

    function heroAnimation() {

        const tl = gsap.timeline();

        tl.from(".hero__eyebrow", {

            y: 40,
            opacity: 0,
            duration: .8

        })

        .from(".hero__title", {

            y: 80,
            opacity: 0,
            duration: 1

        }, "-=.4")

        .from(".hero__subtitle", {

            y: 50,
            opacity: 0,
            duration: .8

        }, "-=.5")

        .from(".hero__text", {

            y: 40,
            opacity: 0,
            duration: .8

        }, "-=.5")

        .from(".hero__buttons", {

            y: 30,
            opacity: 0,
            duration: .8

        }, "-=.4")

        .from(".scroll-indicator", {

            opacity: 0,
            duration: .8

        }, "-=.2");

    }

});
