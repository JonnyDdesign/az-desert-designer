// Hamburger Menu Function
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('show');
}

// Carousel
const carousel = document.getElementById('carousel');
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function showNextSlide() {
    currentIndex++;
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }
    const translateX = -currentIndex * 100; // Slide to the next image
    carousel.style.transform = `translateX(${translateX}%)`;
}

// Auto-slide every 5 seconds
setInterval(showNextSlide, 4000);