document.addEventListener("DOMContentLoaded", () => {
    const projectItems = document.querySelectorAll(".project-reveal-item");
    const bgImages = document.querySelectorAll(".reveal-bg");

    projectItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            const bgId = item.getAttribute("data-bg");
            
            // Remove active class from all bg images
            bgImages.forEach((bg) => {
                bg.classList.remove("active");
            });

            // Add active class to the hovered bg image
            const targetBg = document.getElementById(bgId);
            if (targetBg) {
                targetBg.classList.add("active");
            }
        });

        // Optional: Reset on mouse leave of the entire list
        // If you want the background to stay until another is hovered, don't use this.
    });

    // Handle initial state: show first project background by default
    if (bgImages.length > 0) {
        bgImages[0].classList.add("active");
    }
});
