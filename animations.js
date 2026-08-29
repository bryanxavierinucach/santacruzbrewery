document.documentElement.classList.add('motion-enabled');

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const revealSelectors = [
        '.featured-header', '.products-item', '.hero-art-content', '.hero-art-image',
        '.about-text', '.about-image', '.mv-card', '.values-header', '.value-card',
        '.process-header', '.process-step', '.cta-container',
        '.beer-detail-art', '.beer-detail-content',
        '.plant-intro-copy', '.plant-intro-photo', '.plant-section-heading',
        '.plant-package', '.plant-flexibility-copy', '.plant-flexibility-photos',
        '.plant-gallery-item', '.plant-agencies-content', '.plant-agencies-photo',
        '.restaurant-copy', '.restaurant-photo', '.food-photo',
        '.restaurant-music-content', '.restaurant-groups-content',
        '.shop-intro', '.product-card', '.checkout-heading', '.checkout-layout',
        '.contact-quick-card', '.contacto-info', '.contacto-formulario'
    ];

    const elements = [...document.querySelectorAll(revealSelectors.join(','))];

    elements.forEach((element, index) => {
        element.classList.add('motion-reveal');

        if (element.matches('.about-image, .beer-detail-art, .plant-intro-photo, .plant-agencies-photo, .restaurant-photo')) {
            element.classList.add('motion-from-left');
        }

        if (element.matches('.about-text, .beer-detail-content, .plant-intro-copy, .plant-agencies-content, .restaurant-copy')) {
            element.classList.add('motion-from-right');
        }

        const parent = element.parentElement;
        if (parent && parent.matches('.products-list, .mv-grid, .values-grid, .process-timeline, .plant-gallery, .products-grid, .contact-quick-actions')) {
            const siblings = [...parent.children].filter((child) => child.matches(revealSelectors.join(',')));
            const position = siblings.indexOf(element);
            element.style.setProperty('--motion-delay', `${Math.max(0, position) * 85}ms`);
        } else {
            element.style.setProperty('--motion-delay', `${(index % 3) * 55}ms`);
        }
    });

    if (!('IntersectionObserver' in window)) {
        elements.forEach((element) => element.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -45px' });

    elements.forEach((element) => observer.observe(element));

    document.querySelectorAll('.hero-simple-content, .hero-logo').forEach((element) => {
        element.classList.add('motion-hero-enter');
    });
});
