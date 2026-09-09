document.addEventListener('DOMContentLoaded', () => {
    // Simple intersection observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // After a short delay, find all elements with animation classes and observe them
    // The delay ensures components loaded via fetch are present in DOM
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.slide-up, .slide-up-delay-1, .slide-up-delay-2, .slide-up-delay-3, .slide-up-delay-4, .fade-in');
        
        // Ensure hero elements fade in immediately if they are in viewport
        animatedElements.forEach(el => {
            observer.observe(el);
            
            // Fallback for immediate visibility without scroll
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                setTimeout(() => el.classList.add('visible'), 100);
            }
        });
    }, 300); // 300ms delay to allow fetch components to load
});
