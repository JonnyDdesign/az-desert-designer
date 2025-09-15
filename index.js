// Hamburger Menu Function
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');

    navLinks.classList.toggle('show');
    hamburger.classList.toggle('show');
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


// Lightbox Gallery With Keyboard Support
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.close');

    const images = document.querySelectorAll('.gallery-grid img');
    let currentIndex = -1;

    // Open lightbox on image click
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            if (img.src) {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                currentIndex = index;
            }
        });
    });

    // Close on x click
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    //Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
        }
    })

    // Helper functions
    function closeLightbox() {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
        currentIndex = -1;
    }

    function showNextImage() {
        if (currentIndex >= 0) {
            currentIndex = (currentIndex + 1) % images.length;
            updateLightboxImage();
        }
    }

    function showPrevImage() {
        if (currentIndex >= 0) {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightboxImage();
        }
    }

    function updateLightboxImage() {
        const img = images[currentIndex];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
    }
});