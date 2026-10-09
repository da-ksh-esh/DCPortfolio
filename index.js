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
