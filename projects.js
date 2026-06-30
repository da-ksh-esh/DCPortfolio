document.addEventListener("DOMContentLoaded", () => {
    const projectItems = document.querySelectorAll(".project-reveal-item");
    const bgImages = document.querySelectorAll(".reveal-bg");

    projectItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            const bgId = item.getAttribute("data-bg");
            
            bgImages.forEach((bg) => {
                bg.classList.remove("active");
            });

            const targetBg = document.getElementById(bgId);
            if (targetBg) {
                targetBg.classList.add("active");
            }
        });
    });

    if (bgImages.length > 0) {
        bgImages[0].classList.add("active");
    }
});
