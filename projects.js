document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 0;
    const slides = document.getElementsByClassName("slide");
    const counter = document.getElementById("slide-counter");

    function showSlides(n) {
        if (n >= slides.length) { slideIndex = 0; }
        if (n < 0) { slideIndex = slides.length - 1; }

        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // Show the active slide
        slides[slideIndex].style.display = "block";
    }

    function changeSlide(n) {
        slideIndex += n;
        showSlides(slideIndex);
    }

    showSlides(slideIndex);
    document.querySelector(".prev").addEventListener("click", () => changeSlide(-1));
    document.querySelector(".next").addEventListener("click", () => changeSlide(1));
});

document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 0;
    const slides = document.getElementsByClassName("slide");
    const counter = document.getElementById("slide-counter");

    function showSlides(n) {
        if (n >= slides.length) slideIndex = 0;
        if (n < 0) slideIndex = slides.length - 1;

        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
        }

        slides[slideIndex].classList.add("active");
        counter.innerText = `${slideIndex + 1} / ${slides.length}`;
    }

    function changeSlide(n) {
        slideIndex += n;
        showSlides(slideIndex);
    }
    showSlides(slideIndex);
    document.querySelector(".prev").addEventListener("click", () => changeSlide(-1));
    document.querySelector(".next").addEventListener("click", () => changeSlide(1));
});

