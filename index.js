// Hamburger Menu Function
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('show');
}

// Image Carousel
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
setInterval(showNextSlide, 5000);


// Testimonial Carousel
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    // Show the first testimonial card
    cards[currentIndex].classList.add('active');

    // Function to show a specific card
    function showCard(index) {
        cards.forEach((card, i) => {
            card.classList.remove('active');
            card.style.display = 'none'; // Hide all cards
            if (i === index) {
                card.classList.add('active');
                card.style.display = 'block'; // Only show the active card
            }
        });
    }

    // Next button click
    document.querySelector('.carousel-next').addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
    });

    // Previous button click
    document.querySelector('.carousel-prev').addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(currentIndex);
    });

    // Optional: Autoplay carousel (3 seconds delay)
    setInterval(function() {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
    }, 5000); // 5000ms = 5 seconds
});
