document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-overlay ul li a');
    const mainNavLinks = document.querySelectorAll('.main-header .main-nav ul li a');

    // --- Mobile Menu Toggle ---
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileNavOverlay.classList.add('open');
            // Prevent scrolling when menu is open
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('open');
            // Restore scrolling
            document.body.style.overflow = '';
        });
    }

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Allow the browser to navigate to the new page
            mobileNavOverlay.classList.remove('open');
            document.body.style.overflow = ''; // Restore scrolling
        });
    });

    // --- Active Navigation Link on Page Load ---
    // This function will highlight the current page in the navigation
    function updateActiveNavLink() {
        const path = window.location.pathname;
        const currentPage = path.substring(path.lastIndexOf('/') + 1) || 'index.html'; // Default to index.html

        // Update desktop navigation
        mainNavLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
            }
        });

        // Update mobile navigation (optional, but good for consistency)
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
});