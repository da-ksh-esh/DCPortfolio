document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 0;
    const slides = document.getElementsByClassName("slide");
    const counter = document.getElementById("slide-counter");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    function showSlides(n) {
        if (slides.length === 0) return;
        
        if (n >= slides.length) slideIndex = 0;
        if (n < 0) slideIndex = slides.length - 1;

        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
            slides[i].style.display = "none";
        }

        slides[slideIndex].style.display = "block";
        slides[slideIndex].classList.add("active");
        if (counter) {
            counter.innerText = `${slideIndex + 1} / ${slides.length}`;
        }
    }

    function changeSlide(n) {
        slideIndex += n;
        showSlides(slideIndex);
    }

    // Initial show
    showSlides(slideIndex);

    if (prevBtn) {
        prevBtn.addEventListener("click", () => changeSlide(-1));
    }
    if (nextBtn) {
        nextBtn.addEventListener("click", () => changeSlide(1));
    }
});
