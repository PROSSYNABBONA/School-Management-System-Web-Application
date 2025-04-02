document.addEventListener('DOMContentLoaded', function() {
    // Check if mobile menu is already initialized by header.js
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) {
        console.log('Navigation menu not found. It may be loaded by header.js');
        return;
    }
    
    // Get the mobile menu toggle button
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (!mobileMenuToggle) {
        console.log('Mobile menu toggle button not found. It may be loaded by header.js');
        return;
    }
    
    // Check if menu overlay already exists
    let menuOverlay = document.querySelector('.menu-overlay');
    if (!menuOverlay) {
        // Create menu overlay
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
    }

    // Function to toggle menu
    function toggleMenu() {
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    // Add click event listeners
    mobileMenuToggle.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a navigation link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when window is resized to desktop view
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    console.log('Mobile menu initialized in mobile-menu.js');
}); 