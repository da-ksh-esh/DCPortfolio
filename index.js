const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setMenuOpen(open) {
    const navUl = document.getElementById("nav-ul");
    const icon = document.getElementById("icon");
    if (navUl) {
        navUl.classList.toggle("menu-open", open);
    }
    if (icon) {
        icon.innerHTML = open
            ? '<i class="fa-solid fa-times"></i>'
            : '<i class="fa-solid fa-bars-staggered"></i>';
        icon.setAttribute("aria-expanded", String(open));
        icon.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
}

function myFunction() {
    const navUl = document.getElementById("nav-ul");
    if (!navUl) return;
    setMenuOpen(!navUl.classList.contains("menu-open"));
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
    const icon = document.getElementById("icon");
    if (icon) {
        icon.addEventListener("click", myFunction);
    }

    const navUl = document.getElementById("nav-ul");
    if (navUl) {
        const navLinks = navUl.querySelectorAll("a");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 750) {
                    setMenuOpen(false);
                }
            });
        });
    }

    // One toggle lives in the mobile navbar and one in the desktop icon rail.
    const themeToggles = document.querySelectorAll(".theme-toggle");
    const html = document.documentElement;
    const body = document.body;

    function updateTheme(theme) {
        if (theme === "light") {
            html.classList.replace("dark-mode", "light-mode") || html.classList.add("light-mode");
            body.classList.replace("dark-mode", "light-mode") || body.classList.add("light-mode");
            themeToggles.forEach(btn => btn.setAttribute("aria-label", "Switch to dark mode"));
        } else {
            html.classList.replace("light-mode", "dark-mode") || html.classList.add("dark-mode");
            body.classList.replace("light-mode", "dark-mode") || body.classList.add("dark-mode");
            themeToggles.forEach(btn => btn.setAttribute("aria-label", "Switch to light mode"));
        }
    }

    const savedTheme = localStorage.getItem("theme") || "dark";
    updateTheme(savedTheme);

    themeToggles.forEach(btn => {
        btn.addEventListener("click", () => {
            const currentTheme = body.classList.contains("light-mode") ? "light" : "dark";
            const newTheme = currentTheme === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            updateTheme(newTheme);
        });
    });

    const backToTopBtn = document.getElementById("backToTop");
    
    window.addEventListener("scroll", () => {
        if (backToTopBtn) {
            if (document.documentElement.scrollTop > 250) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", scrollToTop);
    }

    const copyBtn = document.getElementById("copy-email");
    // Read the address from the page so it only has to be updated in the HTML.
    const emailText = copyBtn ? copyBtn.querySelector(".vis-value").textContent.trim() : "";
    const copyStatus = document.getElementById("copy-status");

    let copyStatusTimer;

    function showCopyStatus(message) {
        if (!copyStatus) return;
        copyStatus.textContent = message;
        copyStatus.style.display = "block";
        clearTimeout(copyStatusTimer);
        copyStatusTimer = setTimeout(() => {
            copyStatus.style.display = "none";
            copyStatus.textContent = "";
        }, 2000);
    }

    // Fallback for browsers or contexts (e.g. file://, plain http) without the Clipboard API.
    function legacyCopy(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        let ok = false;
        try {
            ok = document.execCommand("copy");
        } catch (e) {
            ok = false;
        }
        textarea.remove();
        return ok;
    }

    if (copyBtn) {
        copyBtn.addEventListener("click", async () => {
            let ok = false;
            if (navigator.clipboard && window.isSecureContext) {
                try {
                    await navigator.clipboard.writeText(emailText);
                    ok = true;
                } catch (e) {
                    ok = legacyCopy(emailText);
                }
            } else {
                ok = legacyCopy(emailText);
            }
            showCopyStatus(ok ? "Copied!" : "Copy failed");
        });
    }
});

window.addEventListener("resize", function () {
    const navUl = document.getElementById("nav-ul");
    if (window.innerWidth > 750 && navUl && navUl.classList.contains("menu-open")) {
        setMenuOpen(false);
    }
});

window.dispatchEvent(new Event("resize"));

// Highlight the link for the section currently in view, in both the mobile
// navbar and the desktop icon rail.
function updateActiveSection() {
    const sections = [...document.querySelectorAll("main > section[id]")];
    if (sections.length === 0) return;

    const triggerLine = window.innerHeight * 0.4;
    let current = sections[0];
    sections.forEach(section => {
        if (section.getBoundingClientRect().top <= triggerLine) {
            current = section;
        }
    });

    const root = document.documentElement;
    if (window.innerHeight + window.scrollY >= root.scrollHeight - 4) {
        current = sections[sections.length - 1];
    }

    document.querySelectorAll("[data-section-link]").forEach(link => {
        const active = link.dataset.sectionLink === current.id;
        link.classList.toggle("is-active", active);
        if (active) {
            link.setAttribute("aria-current", "true");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

let activeSectionTicking = false;
window.addEventListener("scroll", () => {
    if (activeSectionTicking) return;
    activeSectionTicking = true;
    requestAnimationFrame(() => {
        updateActiveSection();
        activeSectionTicking = false;
    });
});
window.addEventListener("resize", updateActiveSection);
document.addEventListener("DOMContentLoaded", updateActiveSection);

// Scroll reveal: fade sections in as they enter the viewport. The inline
// <head> script only adds .js-reveal when IntersectionObserver exists, so
// without it nothing is ever hidden.
document.addEventListener("DOMContentLoaded", () => {
    if (!document.documentElement.classList.contains("js-reveal")) return;

    // Once the fade-in finishes, drop the reveal classes so the element is
    // back to normal. Leaving the animation applied keeps its opacity
    // "animating" forever, which breaks Chrome's backdrop-filter blur on the
    // glass pills and cards inside it (smeared/dark patches on hover).
    function finishReveal(event) {
        if (event.target !== event.currentTarget || event.animationName !== "reveal-in") return;
        const el = event.currentTarget;
        el.classList.remove("reveal", "is-visible");
        el.style.removeProperty("--reveal-delay");
        el.removeEventListener("animationend", finishReveal);
    }

    const observer = new IntersectionObserver((entries) => {
        const entering = entries.filter(entry => entry.isIntersecting);
        entering.forEach((entry, i) => {
            // Stagger items that enter together (e.g. a row of cards).
            entry.target.style.setProperty("--reveal-delay", `${i * 0.08}s`);
            entry.target.addEventListener("animationend", finishReveal);
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, { rootMargin: "0px 0px -8% 0px" });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});

// Landing-page grid background: around the cursor the grid lights up and bulges
// out slightly, like a lens. The dim, flat grid is plain CSS (.hero-bg-grid);
// this draws only the lit, warped patch on a canvas layered over it.
(() => {
    const grid = document.querySelector(".hero-bg-grid");
    const canvas = grid && grid.querySelector("canvas.hero-grid-lit");
    if (!canvas) return;
    // Touch screens have no hovering cursor, so the grid just stays dim there.
    if (!window.matchMedia("(hover: hover)").matches) return;

    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const CELL = 44; // must match background-size of .hero-bg-grid in index.css
    const RADIUS = 130; // how far the glow reaches from the cursor
    const BULGE = reduceMotion ? 0 : 0.08; // how much cells near the cursor swell (kept subtle)
    const STEP = 4; // px between sample points along each line

    let width = 0;
    let height = 0;
    let rgb = "68, 241, 166";

    let pointerX = null; // last cursor position in the viewport
    let pointerY = null;
    let targetX = 0; // where the bump should be, relative to the grid
    let targetY = 0;
    let bumpX = 0; // where it currently is
    let bumpY = 0;
    let targetLevel = 0; // 1 while the cursor is over the grid, else 0
    let level = 0; // eased 0..1: drives both the glow and the pop-out
    let placed = false;
    let rafId = 0;

    function readAccent() {
        const hex = getComputedStyle(document.documentElement).getPropertyValue("--accent-color").trim();
        const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
        if (m) rgb = m.slice(1).map((h) => parseInt(h, 16)).join(", ");
    }

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        draw();
    }

    // Push a point away from the bump centre. The push is zero at the centre
    // and at the edge of the radius, so the warped patch meets the flat grid.
    function warp(x, y) {
        const dx = x - bumpX;
        const dy = y - bumpY;
        const t = Math.hypot(dx, dy) / RADIUS;
        if (t >= 1) return [x, y];
        const falloff = (1 - t * t) ** 2;
        const scale = 1 + BULGE * level * falloff;
        return [bumpX + dx * scale, bumpY + dy * scale];
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        if (level < 0.01) return;

        const fade = (alpha) => {
            const g = ctx.createRadialGradient(bumpX, bumpY, 0, bumpX, bumpY, RADIUS);
            g.addColorStop(0, `rgba(${rgb}, ${alpha * level})`);
            g.addColorStop(0.55, `rgba(${rgb}, ${alpha * 0.45 * level})`);
            g.addColorStop(1, `rgba(${rgb}, 0)`);
            return g;
        };

        // Soft tint under the lines
        ctx.fillStyle = fade(0.035);
        ctx.fillRect(bumpX - RADIUS, bumpY - RADIUS, RADIUS * 2, RADIUS * 2);

        ctx.strokeStyle = fade(0.5);
        ctx.lineWidth = 1 + 0.15 * level;
        ctx.shadowColor = `rgba(${rgb}, ${0.35 * level})`;
        ctx.shadowBlur = 4;

        // The CSS grid is centred horizontally and starts at the top edge.
        const offsetX = (((width / 2 - CELL / 2) % CELL) + CELL) % CELL + 0.5;
        const offsetY = 0.5;

        // Vertical lines within reach of the bump
        for (let x = offsetX + Math.ceil((bumpX - RADIUS - offsetX) / CELL) * CELL; x <= bumpX + RADIUS; x += CELL) {
            const half = Math.sqrt(Math.max(RADIUS * RADIUS - (x - bumpX) ** 2, 0));
            ctx.beginPath();
            for (let y = bumpY - half; y <= bumpY + half + STEP; y += STEP) {
                const [px, py] = warp(x, Math.min(y, bumpY + half));
                ctx.lineTo(px, py);
            }
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = offsetY + Math.ceil((bumpY - RADIUS - offsetY) / CELL) * CELL; y <= bumpY + RADIUS; y += CELL) {
            const half = Math.sqrt(Math.max(RADIUS * RADIUS - (y - bumpY) ** 2, 0));
            ctx.beginPath();
            for (let x = bumpX - half; x <= bumpX + half + STEP; x += STEP) {
                const [px, py] = warp(Math.min(x, bumpX + half), y);
                ctx.lineTo(px, py);
            }
            ctx.stroke();
        }

        ctx.shadowBlur = 0;
    }

    function tick() {
        rafId = 0;
        // Ease towards the cursor and towards the target glow level, so the
        // bump trails the cursor slightly and rises/settles instead of snapping.
        const follow = reduceMotion ? 1 : 0.2;
        const rise = reduceMotion ? 1 : 0.12;
        bumpX += (targetX - bumpX) * follow;
        bumpY += (targetY - bumpY) * follow;
        level += (targetLevel - level) * rise;
        draw();
        const moving = Math.abs(targetX - bumpX) + Math.abs(targetY - bumpY) > 0.3;
        const changing = Math.abs(targetLevel - level) > 0.005;
        if (moving || changing) {
            rafId = requestAnimationFrame(tick);
        } else if (targetLevel === 0) {
            level = 0;
            draw();
        }
    }

    function retarget() {
        const rect = canvas.getBoundingClientRect();
        targetX = pointerX - rect.left;
        targetY = pointerY - rect.top;
        targetLevel = pointerY >= rect.top && pointerY <= rect.bottom ? 1 : 0;
        if (!placed) {
            // First move: rise under the cursor instead of sliding in from the corner.
            bumpX = targetX;
            bumpY = targetY;
            placed = true;
        }
        if (!rafId) rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", (e) => {
        if (e.pointerType === "touch") return;
        pointerX = e.clientX;
        pointerY = e.clientY;
        retarget();
    });

    // The grid scrolls with the page, so the spot under a still cursor changes.
    window.addEventListener("scroll", () => {
        if (pointerX !== null) retarget();
    }, { passive: true });

    // Settle back to flat when the cursor leaves the window.
    document.documentElement.addEventListener("pointerleave", () => {
        targetLevel = 0;
        if (!rafId) rafId = requestAnimationFrame(tick);
    });

    // Follow light/dark theme changes.
    new MutationObserver(() => {
        readAccent();
        draw();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 150);
    });

    readAccent();
    resize();
})();
