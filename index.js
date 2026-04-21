/**
 * Portfolio Website Logic
 * Handles: Theme Toggle, Mobile Menu, Scroll Animations, Back to Top Button, Section Highlighting
 */

function myFunction() {
    let menuItems = document.querySelectorAll("#nav-res-ext1, #nav-res-ext2, #nav-res-ext3, #nav-res-ext4");
    let icon = document.getElementById("icon");
    let hiddenPortfolio = document.getElementById("hidden"); 

    let isOpen = menuItems[0].style.display === "block";

    menuItems.forEach(item => {
        item.style.display = isOpen ? "none" : "block";
    });

    hiddenPortfolio.style.display = isOpen ? "inline-flex" : "none";

    icon.innerHTML = isOpen 
        ? '<i class="fa-solid fa-bars-staggered"></i>'  
        : '<i class="fa-solid fa-times"></i>';         
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
    // --- Mobile Menu Toggle ---
    const icon = document.getElementById("icon");
    if (icon) {
        icon.addEventListener("click", myFunction);
    }

    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById("theme-toggle");
    const html = document.documentElement;
    const body = document.body;

    function updateTheme(theme) {
        if (theme === "light") {
            html.classList.add("light-mode");
            body.classList.add("light-mode");
            if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            html.classList.remove("light-mode");
            body.classList.remove("light-mode");
            if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    }

    // Set initial theme based on saved preference
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

    // --- Intersection Observer for Reveal and Highlighting ---
    const navLinks = document.querySelectorAll(".nav-bar-container li a:not(#icon)");
    const sections = document.querySelectorAll("section");

    // Observer for reveal animations
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, { threshold: 0.1 });

    // Observer for active link highlighting (excluding Contact)
    const activeLinkObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute("id");
            if (id === "contact-section") return;

            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
                });
            }
        });
    }, { rootMargin: "-10% 0px -45% 0px" });

    sections.forEach(section => {
        revealObserver.observe(section);
        activeLinkObserver.observe(section);
    });

    // Immediate highlighting on click (excluding Contact)
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#") && href !== "#contact-section") {
                navLinks.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
            } else if (href === "#contact-section") {
                navLinks.forEach(l => l.classList.remove("active"));
            }
        });
    });

    // --- Back to Top ---
    const backToTopBtn = document.getElementById("backToTop");
    
    window.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > 250) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", scrollToTop);
    }

    // --- Copy Email to Clipboard ---
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
    let menuItems = document.querySelectorAll("#nav-res-ext1, #nav-res-ext2, #nav-res-ext3, #nav-res-ext4");
    let hiddenPortfolio = document.getElementById("hidden");

    if (window.innerWidth > 750) {
        menuItems.forEach(item => {
            item.style.display = "block";
        });
        hiddenPortfolio.style.display = "none";
    } else {
        menuItems.forEach(item => {
            item.style.display = "none";
        });
        hiddenPortfolio.style.display = "inline-flex";
    }
});
