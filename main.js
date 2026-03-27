document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.header__toggle');
    const menu = document.querySelector('.header__menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            menu.classList.toggle('is-active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // 2. Scroll Effects (Sticky Header & Hero Parallax/Fade)
    const header = document.querySelector('.header');
    const heroElements = document.querySelectorAll('.hero, .hero-simple');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Header
        if (header) {
            if (scrollY > 50) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        }
        
        // Hero Parallax + Fade
        heroElements.forEach(hero => {
            const heroHeight = hero.offsetHeight;
            const opacity = 1 - (scrollY / heroHeight);
            hero.style.opacity = Math.max(0, opacity);
            hero.style.transform = `translateY(${scrollY * 0.2}px)`; // Parallax effect
        });
    }, { passive: true });

    // 3. Carousel Logic (Specifically targeting Mobile view)
    const carouselItems = document.querySelectorAll('.products__item');
    const prevBtn = document.querySelector('.carousel__arrow--prev');
    const nextBtn = document.querySelector('.carousel__arrow--next');
    
    if (carouselItems.length > 0) {
        let currentIndex = 0;
        let touchStartX = 0;
        let touchEndX = 0;

        const updateCarousel = () => {
            if (window.innerWidth <= 768) {
                carouselItems.forEach((item, index) => {
                    item.classList.toggle('is-active', index === currentIndex);
                });
            } else {
                carouselItems.forEach(item => {
                    item.classList.add('is-active'); // Desktop shows all via grid/flex
                });
            }
        };

        const goPrev = () => {
            currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
            updateCarousel();
        };

        const goNext = () => {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            updateCarousel();
        };

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', goPrev);
            nextBtn.addEventListener('click', goNext);
        }

        // Touch Support
        const carouselContainer = document.querySelector('.products__list');
        if(carouselContainer) {
            carouselContainer.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            }, {passive: true});
            
            carouselContainer.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                if(touchEndX < touchStartX - 50) goNext();
                if(touchEndX > touchStartX + 50) goPrev();
            }, {passive: true});
        }

        // Handle Resize
        window.addEventListener('resize', updateCarousel);
        updateCarousel(); // Initialize on load
    }
});
