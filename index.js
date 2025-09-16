function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    if (!navLinks || !hamburger) return;
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', () => {

    // -----------------------
    // Image Carousel (if present)
    // -----------------------
    (function initCarousel() {
        const carouselEl = document.getElementById('carousel');
        if (!carouselEl) return;

        const slides = carouselEl.querySelectorAll('.carousel-slide');
        if (!slides || slides.length === 0) return;

        let carouselIndex = 0;
        const totalSlides = slides.length;

        function showNextSlide() {
            carouselIndex = (carouselIndex + 1) % totalSlides;
            carouselEl.style.transform = `translateX(${-carouselIndex * 100}%)`;
        }

        // Ensure initial state
        carouselEl.style.transform = 'translateX(0%)';

        // Auto-slide every 5 seconds
        setInterval(showNextSlide, 5000);
    })();


    // -----------------------
    // Testimonial Carousel (if present)
    // -----------------------
    (function initTestimonials() {
        const cards = document.querySelectorAll('.testimonial-card');
        if (!cards || cards.length === 0) return;

        let testimonialIndex = 0;

        function showCard(index) {
            cards.forEach((card, i) => {
                card.classList.toggle('active', i === index);
                card.style.display = (i === index) ? 'block' : 'none';
            });
        }

        showCard(testimonialIndex);

        const nextBtn = document.querySelector('.carousel-next');
        const prevBtn = document.querySelector('.carousel-prev');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                testimonialIndex = (testimonialIndex + 1) % cards.length;
                showCard(testimonialIndex);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                testimonialIndex = (testimonialIndex - 1 + cards.length) % cards.length;
                showCard(testimonialIndex);
            });
        }

        // Optional autoplay (5s)
        setInterval(() => {
            testimonialIndex = (testimonialIndex + 1) % cards.length;
        showCard(testimonialIndex);
        }, 5000);
    })();


    // -----------------------
    // Lightbox Gallery (if present)
    // -----------------------
    (function initLightbox() {
        // Select all images, but filter out images with empty src attributes
        const galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'))
            .filter(img => img.getAttribute('src') && img.getAttribute('src').trim() !== '');

        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.querySelector('.lightbox-img');
        if (!galleryImages.length || !lightbox || !lightboxImg) return;

        const closeBtn = lightbox.querySelector('.close');
        const prevBtn = lightbox.querySelector('.prev');
        const nextBtn = lightbox.querySelector('.next');

        let galleryCurrentIndex = -1;

        function openLightbox(idx) {
            galleryCurrentIndex = idx;
            updateLightboxImage();
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // prevent background scroll
        }

        function closeLightbox() {
            lightbox.style.display = 'none';
            lightboxImg.src = '';
            galleryCurrentIndex = -1;
            document.body.style.overflow = '';
        }

        function updateLightboxImage() {
            const img = galleryImages[galleryCurrentIndex];
            if (!img) return;
            // Use the src attribute (relative paths remain as intended)
            lightboxImg.src = img.getAttribute('src');
            lightboxImg.alt = img.getAttribute('alt') || '';
        }

        function showNextImage() {
            if (galleryCurrentIndex < 0) return;
            galleryCurrentIndex = (galleryCurrentIndex + 1) % galleryImages.length;
            updateLightboxImage();
        }

        function showPrevImage() {
            if (galleryCurrentIndex < 0) return;
            galleryCurrentIndex = (galleryCurrentIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightboxImage();
        }

        // Click thumbnails to open (only real images, filtered)
        galleryImages.forEach((img, idx) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => openLightbox(idx));
        });

        // Close button (X)
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeLightbox();
            });
        }

        // Prev / Next arrow buttons (in-lightbox)
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showPrevImage();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showNextImage();
            });
        }

        // Click outside image closes
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display !== 'flex') return;
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
        });

        // Touch swipe (minimal)
            let touchStartX = 0;
            let touchEndX = 0;
            lightbox.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            lightbox.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchEndX - touchStartX;
                if (Math.abs(diff) > 40) {
                    if (diff < 0) showNextImage();
                    else showPrevImage();
                }
            }, { passive: true });

    })();

}); // end DOMContentLoaded