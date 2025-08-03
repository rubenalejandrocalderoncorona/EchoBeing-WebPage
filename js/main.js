document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    // Removed closeMenu as the menuToggle will now handle both open/close
    const mobileNavLinks = document.querySelectorAll('.mobile-menu-list li a'); // Target all links within the new menu structure
    const mainHeader = document.querySelector('.main-header');

    // --- Mobile Menu Toggle ---
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Toggle the 'open' class on the overlay
            mobileNavOverlay.classList.toggle('open');
            // Toggle the 'is-active' class on the menu toggle for animation
            menuToggle.classList.toggle('is-active');

            // Prevent/restore scrolling
            if (mobileNavOverlay.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Allow the browser to navigate to the new page
            mobileNavOverlay.classList.remove('open');
            menuToggle.classList.remove('is-active'); // Reset hamburger icon
            document.body.style.overflow = ''; // Restore scrolling
        });
    });

    // --- Active Navigation Link on Page Load ---
    function updateActiveNavLink() {
        const path = window.location.pathname;
        const currentPage = path.substring(path.lastIndexOf('/') + 1) || 'index.html'; // Default to index.html

        // Update mobile navigation
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // Call on load
    updateActiveNavLink();

    // --- Initial Page Load Animations ---
    // Add a class to body after DOM is loaded to trigger CSS animations
    // This is for elements with .reveal-on-load and .reveal-item classes
    document.body.classList.add('page-loaded');


    // --- Header Shrink/Grow on Scroll ---
    const scrollThreshold = 50; // Pixels scrolled before header shrinks

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > scrollThreshold) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });

    // --- Parallax-like effect for Insights Banner ---
    const bannerSection = document.querySelector('.insights-banner-section');
    if (bannerSection) {
        const bannerBackground = bannerSection.querySelector('.banner-background');
        const bannerText = bannerSection.querySelector('.banner-text');

        window.addEventListener('scroll', () => {
            // Check if the banner section is in viewport
            const rect = bannerSection.getBoundingClientRect();
            const isInViewport = (
                rect.top < window.innerHeight &&
                rect.bottom > 0
            );

            if (isInViewport) {
                // Calculate scroll position relative to the section's top
                // This value will be 0 when the top of the section hits the top of the viewport
                // and increase as you scroll down.
                const scrollOffset = window.pageYOffset - bannerSection.offsetTop;

                // Apply inverse parallax to background (moves slower than scroll)
                // Data-speed attribute defines how fast it moves relative to scroll
                const backgroundSpeed = parseFloat(bannerBackground.getAttribute('data-speed') || 0.2);
                const backgroundY = scrollOffset * backgroundSpeed;
                bannerBackground.style.transform = `translateY(${backgroundY}px)`;

                // Apply parallax to text (moves faster than scroll, or at a different rate)
                const textSpeed = parseFloat(bannerText.getAttribute('data-speed') || 0.8);
                const textY = scrollOffset * textSpeed;
                bannerText.style.transform = `translateY(${textY}px)`;
            }
        });
    }
});
