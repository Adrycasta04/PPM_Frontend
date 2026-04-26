/**
 * USA Today Replica - Vanilla JS
 * 
 * Academic requirements demonstrated:
 * - DOMContentLoaded event
 * - data-* attributes as JS hooks (no CSS classes used)
 * - Event Delegation with e.target.closest()
 * - defer loading in <head>
 * - aria-expanded toggling for accessibility
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ====================================================================
       Mobile Navigation: Hamburger Menu
       ==================================================================== */
    /* ====================================================================
       Mobile Navigation
       ==================================================================== */
    const hamburger = document.querySelector('[data-js="hamburger-btn"]');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenuButton = document.getElementById('closeMenu');
    const overlay = document.getElementById('overlay');
    const menuItems = document.querySelectorAll('.main-menu-item');

    if (hamburger && mobileMenu && closeMenuButton && overlay) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            hamburger.setAttribute('aria-expanded', 'true');
            mobileMenu.setAttribute("aria-hidden", "false");
        });

        const closeFunc = () => {
            mobileMenu.classList.remove('open');
            overlay.style.display = 'none';
            document.body.style.overflow = '';
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute("aria-hidden", "true");
            // Reset submenus
            menuItems.forEach(item => item.classList.remove('open'));
        };

        closeMenuButton.addEventListener('click', closeFunc);
        overlay.addEventListener('click', closeFunc);

        // Mobile specific submenu toggling
        menuItems.forEach(item => {
            const trigger = item.querySelector('.menu');
            if (!trigger) return;

            trigger.addEventListener('click', function (e) {
                if (window.innerWidth <= 499) {
                    const isOpen = item.classList.contains('open');
                    // Close others
                    menuItems.forEach(i => i.classList.remove('open'));
                    // Toggle current
                    if (!isOpen) {
                        item.classList.add('open');
                    }
                }
            });
        });

        // Search focus behavior
        const searchInput = document.getElementById('searchInput');
        const menuContent = document.getElementById('menuContent');
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
       Event Delegation: "Show More" Category Buttons
       Single listener on <main>, intercepts all show-more clicks.
       ==================================================================== */
    const mainContent = document.querySelector('#main');

    if (mainContent) {
        mainContent.addEventListener('click', (e) => {
            const showMoreBtn = e.target.closest('[data-js="show-more"]');
            if (!showMoreBtn) return;

            e.preventDefault();
            const category = showMoreBtn.getAttribute('data-category');
            const hiddenCards = document.querySelectorAll(
                `[data-js="extra-card"][data-category="${category}"]`
            );

            const isExpanded = showMoreBtn.getAttribute('aria-expanded') === 'true';

            hiddenCards.forEach(card => {
                card.style.display = isExpanded ? 'none' : '';
            });

            showMoreBtn.setAttribute('aria-expanded', String(!isExpanded));
            const label = showMoreBtn.querySelector('[data-js="show-more-label"]');
            if (label) {
                label.textContent = isExpanded ? 'Show more' : 'Show less';
            }
        });
    }

    /* ====================================================================
       Keyboard: Close mobile nav with Escape key
       ==================================================================== */
    /* ====================================================================
       ACADEMIC REQUIREMENT: Logica custom per la sparizione della Scritta "Advertisement"
       (Disaccoppiata tramite Data-JS Attributes & Element Arrays)
       ==================================================================== */
    const sidebarAd = document.querySelector('.sidebar-ad');
    const newsCards = document.querySelectorAll('.story'); // Seleziona le nuove Notizie Feed (.story)

    // Intercetta l'elemento alla settima posizione nell'Array (indice 6)
    if (sidebarAd && newsCards.length >= 7) {
        const seventhArticle = newsCards[6]; 

        window.addEventListener('scroll', () => {
            const articleRect = seventhArticle.getBoundingClientRect();
            
            // L'Advertisement è sticky a top: 85px.
            // Quando il ritaglio superiore del 7° articolo raggiunge gli 85px di altezza,
            // spingiamo la pubblicità gradualmente verso l'alto simulando uno sblocco naturale
            if (articleRect.top <= 85) {
                const offset = articleRect.top - 85; // Dà un numero negativo proporzionale allo scroll
                sidebarAd.style.transform = `translateY(${offset}px)`;
            } else {
                sidebarAd.style.transform = 'translateY(0)'; // Rimane fissa
            }
        });
    }

});
