function myFunction() {
    let menuItems = document.querySelectorAll("#nav-res-ext1, #nav-res-ext2, #nav-res-ext3, #nav-res-ext4");
    let icon = document.getElementById("icon");
    let hiddenPortfolio = document.getElementById("hidden"); // "PORTFOLIO" heading

    let isOpen = menuItems[0].style.display === "block";

    menuItems.forEach(item => {
        item.style.display = isOpen ? "none" : "block";
    });

    hiddenPortfolio.style.display = isOpen ? "inline-flex" : "none";

    icon.innerHTML = isOpen 
        ? '<i class="fa-solid fa-bars-staggered"></i>'  // Show hamburger menu
        : '<i class="fa-solid fa-times"></i>';         // Show close icon
}

// **Reset Navbar Visibility When Resizing**
window.addEventListener("resize", function () {
    let menuItems = document.querySelectorAll("#nav-res-ext1, #nav-res-ext2, #nav-res-ext3, #nav-res-ext4");
    let hiddenPortfolio = document.getElementById("hidden");

    if (window.innerWidth > 750) {
        menuItems.forEach(item => {
            item.style.display = "block";  // Ensure they are visible on larger screens
        });
        hiddenPortfolio.style.display = "none"; // Hide "PORTFOLIO" heading
    } else {
        menuItems.forEach(item => {
            item.style.display = "none";  // Hide them again for smaller screens
        });
        hiddenPortfolio.style.display = "inline-flex"; // Show "PORTFOLIO" only in small screens
    }
});

// **Back-to-Top Button Visibility**
window.onscroll = function () {
    toggleBackToTopButton();
};

function toggleBackToTopButton() {
    const button = document.getElementById("backToTop");
    if (document.documentElement.scrollTop > 250) { // **Changed to 800px**
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// **Dark Mode Toggle (Default: Dark Mode)**
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // **Set Dark Mode as Default**
    if (localStorage.getItem("theme") !== "light") {
        body.classList.add("dark-mode");
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        body.classList.add("light-mode");
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

    // **Toggle Dark/Light Mode**
    themeToggle.addEventListener("click", () => {
        if (body.classList.contains("light-mode")) {
            body.classList.replace("light-mode", "dark-mode");
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.replace("dark-mode", "light-mode");
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem("theme", "light");
        }
    });
});
