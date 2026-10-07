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
        const navLinks = navUl.querySelectorAll("a:not(#icon)");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 750) {
                    setMenuOpen(false);
                }
            });
        });
    }

    const themeToggle = document.getElementById("theme-toggle");
    const html = document.documentElement;
    const body = document.body;

    function updateTheme(theme) {
        if (theme === "light") {
            html.classList.replace("dark-mode", "light-mode") || html.classList.add("light-mode");
            body.classList.replace("dark-mode", "light-mode") || body.classList.add("light-mode");
            if (themeToggle) themeToggle.setAttribute("aria-label", "Switch to dark mode");
        } else {
            html.classList.replace("light-mode", "dark-mode") || html.classList.add("dark-mode");
            body.classList.replace("light-mode", "dark-mode") || body.classList.add("dark-mode");
            if (themeToggle) themeToggle.setAttribute("aria-label", "Switch to light mode");
        }
    }

    const savedTheme = localStorage.getItem("theme") || "dark";
    updateTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = body.classList.contains("light-mode") ? "light" : "dark";
            const newTheme = currentTheme === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            updateTheme(newTheme);
        });
    }

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

    const emailText = "chauhan06dakshesh@gmail.com";
    const copyBtn = document.getElementById("copy-email");
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

window.addEventListener("scroll", () => {
    const sections = [
        document.getElementById("about-section"),
        document.getElementById("skills-section"),
        document.getElementById("projects-section"),
        document.getElementById("certifications-section"),
        document.getElementById("contact-section")
    ];

    const navLinks = {
        "about-section": document.getElementById("nav-res-ext1"),
        "skills-section": document.getElementById("nav-res-ext2"),
        "projects-section": document.getElementById("nav-res-ext3"),
        "certifications-section": document.getElementById("nav-res-ext5"),
        "contact-section": document.getElementById("nav-res-ext4")
    };

    let currentSectionId = "";
    let minDistance = Infinity;
    const triggerLine = 200;

    sections.forEach(section => {
        if (section) {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top - triggerLine);

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                if (distance < minDistance) {
                    minDistance = distance;
                    currentSectionId = section.id;
                }
            }
        }
    });

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 80) {
        currentSectionId = "contact-section";
    }

    Object.keys(navLinks).forEach(id => {
        const link = navLinks[id];
        if (link) {
            if (id === currentSectionId) {
                link.classList.add("active-nav");
            } else {
                link.classList.remove("active-nav");
            }
        }
    });
});



