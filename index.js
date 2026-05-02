

document.addEventListener('DOMContentLoaded', () => {

    
    const hamburger = document.querySelector('[data-js="hamburger-btn"]');
    const mobileMenu = document.querySelector('[data-js="mobile-menu"]');
    const closeMenuButton = document.querySelector('[data-js="close-menu"]');
    const overlay = document.querySelector('[data-js="overlay"]');
    const searchInput = document.querySelector('[data-js="search-input"]');
    const menuContent = document.querySelector('[data-js="menu-content"]');

    if (hamburger && mobileMenu && closeMenuButton && overlay) {
        
        
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            hamburger.setAttribute('aria-expanded', 'true');
            mobileMenu.setAttribute("aria-hidden", "false");
            
            
            setTimeout(() => closeMenuButton.focus(), 100); 
        });

        
        const closeFunc = () => {
            mobileMenu.classList.remove('open');
            overlay.style.display = 'none';
            document.body.style.overflow = '';
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute("aria-hidden", "true");
            
            
            mobileMenu.querySelectorAll('.main-menu-item').forEach(item => item.classList.remove('open'));
        };

        closeMenuButton.addEventListener('click', closeFunc);
        overlay.addEventListener('click', closeFunc);

        
        mobileMenu.addEventListener('click', (e) => {
            
            const trigger = e.target.closest('[data-js="menu-trigger"]');
            if (!trigger) return;

            if (window.matchMedia("(max-width: 640px)").matches) {
                const item = trigger.closest('[data-js="main-menu-item"]');
                if (!item) return;

                const isOpen = item.classList.contains('open');
                
                
                mobileMenu.querySelectorAll('.main-menu-item').forEach(i => i.classList.remove('open'));
                
                
                if (!isOpen) {
                    item.classList.add('open');
                }
            }
        });

        
        if (searchInput && menuContent) {
            searchInput.addEventListener('focus', () => {
                menuContent.style.visibility = 'hidden';
            });
            searchInput.addEventListener('blur', () => {
                menuContent.style.visibility = 'visible';
            });
        }
    }

    
    
    const mainContent = document.querySelector('#main');
    
    if (mainContent) {
        mainContent.addEventListener('click', (e) => {
            const showMoreBtn = e.target.closest('[data-js="show-more-btn"]');
            if (!showMoreBtn || showMoreBtn.classList.contains('is-disabled')) return;

            const categoryBlock = showMoreBtn.closest('[data-js="category-block"]');
            if (!categoryBlock) return;

            
            const hiddenBlocks = categoryBlock.querySelectorAll('.news-extra:not(.news-extra--visible)');
            
            if (hiddenBlocks.length > 0) {
                const blockToShow = hiddenBlocks[0];
                
                
                blockToShow.classList.add('news-extra--visible');
                blockToShow.setAttribute('aria-hidden', 'false');

                
                const firstNewLink = blockToShow.querySelector('a');
                if (firstNewLink) {
                    setTimeout(() => firstNewLink.focus(), 100); 
                }

                
                if (hiddenBlocks.length === 1) {
                    showMoreBtn.classList.add('is-disabled');
                    showMoreBtn.setAttribute('aria-expanded', 'true');
                }
            }
        });
    }

    
    const sidebarAd = document.querySelector('[data-js="sidebar-ad"]');
    const newsCards = document.querySelectorAll('[data-js="feed-card"]'); 

    if (sidebarAd && newsCards.length >= 7) {
        const seventhArticle = newsCards[6]; 
        let isScrolling = false;

        
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    const articleRect = seventhArticle.getBoundingClientRect();
                    
                    const headerHeight = document.querySelector('[data-js="header"]')?.offsetHeight + 30 || 85;
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
        }, { passive: true }); 
    }

});

