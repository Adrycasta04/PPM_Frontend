/**
 * USA Today Replica - Vanilla JS Logic
 * Requirements: Event Delegation, decouple CSS classes, wait for DOMContentLoaded.
 */

document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // Core Elements bindings
    // =========================================================================
    const mobileNav = document.querySelector('[data-js="mobile-nav"]');
    const overlay = document.querySelector('[data-js="menu-overlay"]');
    
    if (!mobileNav || !overlay) {
        console.error('Core UI elements missing in DOM.');
        return;
    }

    // =========================================================================
    // State Handlers
    // =========================================================================
    const toggleMenu = () => {
        const isMenuOpen = mobileNav.getAttribute('aria-hidden') === 'false';
        const newState = !isMenuOpen;
        
        mobileNav.setAttribute('aria-hidden', (!newState).toString());
        // Non usiamo le classi CSS per identificare elementi, ma possiamo
        // togglearle tranquillamente per il painting visuale.
        mobileNav.classList.toggle('mobile-nav--open');
        overlay.classList.toggle('mobile-nav__overlay--active');
        
        // Update the ARIA state of the toggle button if accessible
        const menuBtn = document.querySelector('[data-js="menu-toggle"]');
        if (menuBtn) {
            menuBtn.setAttribute('aria-expanded', newState.toString());
        }
    };

    const closeMenu = () => {
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileNav.classList.remove('mobile-nav--open');
        overlay.classList.remove('mobile-nav__overlay--active');
        
        const menuBtn = document.querySelector('[data-js="menu-toggle"]');
        if (menuBtn) {
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.focus(); // Accessibilità: ripristina focus
        }
    };

    // =========================================================================
    // Event Delegation (Single Body Listener)
    // =========================================================================
    document.body.addEventListener('click', (e) => {
        // Toggle mobile menu
        if (e.target.closest('[data-js="menu-toggle"]')) {
            toggleMenu();
            return;
        }

        // Close mobile menu (via cross button)
        if (e.target.closest('[data-js="menu-close"]')) {
            closeMenu();
            return;
        }

        // Close mobile menu via overlay clicking
        if (e.target.closest('[data-js="menu-overlay"]')) {
            closeMenu();
            return;
        }

        // Feature placeholder per article click (Json-LD trigger future)
        const article = e.target.closest('[data-js="news-article"]');
        if (article) {
            // Qui in futuro l'injector semantico JSON-LD a runtime potebbe 
            // processare la traccia della user experience
        }
    });

    // Accessibilità tastiera Escape per chiudere il menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.getAttribute('aria-hidden') === 'false') {
            closeMenu();
        }
    });
});
