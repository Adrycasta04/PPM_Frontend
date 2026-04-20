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
    const hamburgerBtn = document.querySelector('[data-js="hamburger-btn"]');
    const mobileNav = document.querySelector('[data-js="mobile-nav"]');
    const mobileNavClose = document.querySelector('[data-js="mobile-nav-close"]');
    const mobileNavOverlay = document.querySelector('[data-js="mobile-nav-overlay"]');

    function openMobileNav() {
        if (!mobileNav || !mobileNavOverlay) return;
        mobileNav.classList.add('mobile-nav--open');
        mobileNavOverlay.classList.add('mobile-nav__overlay--active');
        document.body.style.overflow = 'hidden';
        if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
        mobileNav.setAttribute('aria-hidden', 'false');
    }

    function closeMobileNav() {
        if (!mobileNav || !mobileNavOverlay) return;
        mobileNav.classList.remove('mobile-nav--open');
        mobileNavOverlay.classList.remove('mobile-nav__overlay--active');
        document.body.style.overflow = '';
        if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileNav);
    if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
    if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileNav);

    /* ====================================================================
       Event Delegation: Mobile Nav Submenu Toggles
       Uses e.target.closest() on the parent list container.
       ==================================================================== */
    const mobileNavList = document.querySelector('[data-js="mobile-nav-list"]');

    if (mobileNavList) {
        mobileNavList.addEventListener('click', (e) => {
            const toggle = e.target.closest('[data-js="submenu-toggle"]');
            if (!toggle) return;

            e.preventDefault();
            const parentItem = toggle.closest('[data-js="submenu-parent"]');
            if (!parentItem) return;

            const isOpen = parentItem.classList.contains('mobile-nav__item--open');

            // Close all open submenus first
            mobileNavList.querySelectorAll('[data-js="submenu-parent"]').forEach(item => {
                item.classList.remove('mobile-nav__item--open');
                const btn = item.querySelector('[data-js="submenu-toggle"]');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });

            // Toggle the clicked one
            if (!isOpen) {
                parentItem.classList.add('mobile-nav__item--open');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });
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
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav &&
            mobileNav.classList.contains('mobile-nav--open')) {
            closeMobileNav();
        }
    });

});
