document.addEventListener("DOMContentLoaded", () => {
    const projectItems = document.querySelectorAll(".project-reveal-item");
    const bgImages = document.querySelectorAll(".reveal-bg");

    function showBackground(item) {
        const bgId = item.getAttribute("data-bg");

        bgImages.forEach((bg) => {
            bg.classList.remove("active");
        });

        const targetBg = document.getElementById(bgId);
        if (targetBg) {
            targetBg.classList.add("active");
        }
    }

    projectItems.forEach((item) => {
        // pointerenter covers mouse, pen and touch; focusin covers keyboard navigation.
        item.addEventListener("pointerenter", () => showBackground(item));
        item.addEventListener("focusin", () => showBackground(item));
    });

    if (bgImages.length > 0) {
        bgImages[0].classList.add("active");
    }
});
