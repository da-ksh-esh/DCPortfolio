/**
 * Portfolio Website Logic
 * Handles: Theme Toggle, Mobile Menu, Scroll Animations, Back to Top Button
 */

function myFunction() {
    let menuItems = document.querySelectorAll("#nav-res-ext1, #nav-res-ext2, #nav-res-ext3, #nav-res-ext4");
    let icon = document.getElementById("icon");
    let hiddenPortfolio = document.getElementById("hidden"); 

    if (menuItems.length === 0) return;

    let isOpen = menuItems[0].style.display === "block";

    menuItems.forEach(item => {
        item.style.display = isOpen ? "none" : "block";
    });

    if (hiddenPortfolio) hiddenPortfolio.style.display = isOpen ? "inline-flex" : "none";

    if (icon) {
        icon.innerHTML = isOpen 
            ? '<i class="fa-solid fa-bars-staggered"></i>'  
            : '<i class="fa-solid fa-times"></i>';         
    }
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
            html.classList.replace("dark-mode", "light-mode") || html.classList.add("light-mode");
            body.classList.replace("dark-mode", "light-mode") || body.classList.add("light-mode");
            if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            html.classList.replace("light-mode", "dark-mode") || html.classList.add("dark-mode");
            body.classList.replace("light-mode", "dark-mode") || body.classList.add("dark-mode");
            if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    }


    // Set initial icon and ensure theme classes are synced
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

    // --- Back to Top ---
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
        if (hiddenPortfolio) hiddenPortfolio.style.display = "none";
    } else {
        menuItems.forEach(item => {
            item.style.display = "none";
        });
        if (hiddenPortfolio) hiddenPortfolio.style.display = "inline-flex";
    }
});

// Trigger initial state
window.dispatchEvent(new Event("resize"));

