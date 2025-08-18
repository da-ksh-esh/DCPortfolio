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


document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;


    if (localStorage.getItem("theme") !== "light") {
        body.classList.add("dark-mode");
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        body.classList.add("light-mode");
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

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

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

