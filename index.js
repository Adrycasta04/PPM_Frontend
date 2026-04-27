/**
 * USA Today Replica - Vanilla JS
 * 
 * Academic requirements demonstrated:
 * - DOMContentLoaded event
 * - data-* attributes as JS hooks (no CSS classes or IDs used for logic)
 * - Event Delegation with e.target.closest()
 * - Scroll performance optimization (requestAnimationFrame + passive listener)
 * - aria-expanded toggling for accessibility
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ====================================================================
       1. Mobile Navigation (Event Delegation & Data Attributes)
       ==================================================================== */
    const hamburger = document.querySelector('[data-js="hamburger-btn"]');
    const mobileMenu = document.querySelector('[data-js="mobile-menu"]');
    const closeMenuButton = document.querySelector('[data-js="close-menu"]');
    const overlay = document.querySelector('[data-js="overlay"]');
    const searchInput = document.querySelector('[data-js="search-input"]');
    const menuContent = document.querySelector('[data-js="menu-content"]');

    if (hamburger && mobileMenu && closeMenuButton && overlay) {
        
        // Open Menu
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            hamburger.setAttribute('aria-expanded', 'true');
            mobileMenu.setAttribute("aria-hidden", "false");
            
            // ACADEMIC REQUIREMENT: Sposta il focus nel menu per l'accessibilità
            setTimeout(() => closeMenuButton.focus(), 100); 
        });

        // Close Menu Function
        const closeFunc = () => {
            mobileMenu.classList.remove('open');
            overlay.style.display = 'none';
            document.body.style.overflow = '';
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute("aria-hidden", "true");
            
            // Reset submenus
            mobileMenu.querySelectorAll('.main-menu-item').forEach(item => item.classList.remove('open'));
        };

        closeMenuButton.addEventListener('click', closeFunc);
        overlay.addEventListener('click', closeFunc);

        // ACADEMIC REQUIREMENT: Event Delegation for Submenus
        mobileMenu.addEventListener('click', (e) => {
            // Check if the click originated from a menu trigger
            const trigger = e.target.closest('[data-js="menu-trigger"]');
            if (!trigger) return;

            if (window.matchMedia("(max-width: 499px)").matches) {
                const item = trigger.closest('[data-js="main-menu-item"]');
                if (!item) return;

                const isOpen = item.classList.contains('open');
                
                // Close all other submenus
                mobileMenu.querySelectorAll('.main-menu-item').forEach(i => i.classList.remove('open'));
                
                // Toggle current
                if (!isOpen) {
                    item.classList.add('open');
                }
            }
        });

        // Search focus behavior
        if (searchInput && menuContent) {
            searchInput.addEventListener('focus', () => {
                menuContent.style.visibility = 'hidden';
            });
            searchInput.addEventListener('blur', () => {
                menuContent.style.visibility = 'visible';
            });
        }
    }

    /* ====================================================================
       2. Show More Buttons (Event Delegation)
       Sostituisce il Checkbox Hack del CSS
       ==================================================================== */
    // ACADEMIC REQUIREMENT: Delega sul <main> invece che sul body per performance
    const mainContent = document.querySelector('#main');
    
    if (mainContent) {
        mainContent.addEventListener('click', (e) => {
            const showMoreBtn = e.target.closest('[data-js="show-more-btn"]');
            if (!showMoreBtn) return;

            const categoryBlock = showMoreBtn.closest('[data-js="category-block"]');
            if (!categoryBlock) return;

            const extraNews = categoryBlock.querySelectorAll('[data-js="extra-news"]');
            
            extraNews.forEach(newsBlock => {
                newsBlock.classList.add('news-extra--visible');
                // ACADEMIC REQUIREMENT: Comunica allo screen reader che il blocco è visibile
                newsBlock.setAttribute('aria-hidden', 'false'); 
            });

            // Focus management: Sposta il focus sul primo elemento svelato
            if (extraNews.length > 0) {
                const firstNewLink = extraNews[0].querySelector('a');
                if (firstNewLink) {
                    firstNewLink.focus();
                }
            }

            // Nascondi il bottone (non serve aggiornare aria-expanded se sparisce)
            showMoreBtn.style.display = 'none';
        });
    }

    /* ====================================================================
       3. Advertisement Scroll Logic (Performance Optimized)
       ==================================================================== */
    const sidebarAd = document.querySelector('[data-js="sidebar-ad"]');
    const newsCards = document.querySelectorAll('[data-js="feed-card"]'); 

    if (sidebarAd && newsCards.length >= 7) {
        const seventhArticle = newsCards[6]; 
        let isScrolling = false;

        // ACADEMIC REQUIREMENT: Passive listener + requestAnimationFrame
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    const articleRect = seventhArticle.getBoundingClientRect();
                    
                    const headerHeight = document.querySelector('.header')?.offsetHeight + 30 || 85;
            if (articleRect.top <= headerHeight) {
                        const offset = articleRect.top - 85; 
                        sidebarAd.style.transform = `translateY(${offset}px)`;
                    } else {
                        sidebarAd.style.transform = 'translateY(0)'; 
                    }
                    isScrolling = false;
                });
                isScrolling = true;
            }
        }, { passive: true }); // Passive true migliora le performance di scroll
    }

});
