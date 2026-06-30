function myFunction() {
    const navUl = document.getElementById("nav-ul");
    const icon = document.getElementById("icon");
    if (!navUl) return;

    const isOpen = navUl.classList.contains("menu-open");

    if (isOpen) {
        navUl.classList.remove("menu-open");
        if (icon) {
            icon.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
        }
    } else {
        navUl.classList.add("menu-open");
        if (icon) {
            icon.innerHTML = '<i class="fa-solid fa-times"></i>';
        }
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                    navUl.classList.remove("menu-open");
                    if (icon) {
                        icon.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
                    }
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
            if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            html.classList.replace("light-mode", "dark-mode") || html.classList.add("dark-mode");
            body.classList.replace("light-mode", "dark-mode") || body.classList.add("dark-mode");
            if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
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

    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(emailText).then(() => {
                copyStatus.style.display = "block";
                setTimeout(() => {
                    copyStatus.style.display = "none";
                }, 2000);
            });
        });
    }
});

window.addEventListener("resize", function () {
    const navUl = document.getElementById("nav-ul");
    const icon = document.getElementById("icon");
    if (window.innerWidth > 750) {
        if (navUl) {
            navUl.classList.remove("menu-open");
        }
        if (icon) {
            icon.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
        }
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



