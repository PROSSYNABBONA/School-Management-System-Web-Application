// Function to load header
async function loadHeader() {
    try {
        // Get the current page path
        const currentPath = window.location.pathname;
        // Determine the correct path to header.html
        const headerPath = currentPath.includes('/js/') ? '../header.html' : './header.html';
        
        console.log('Loading header from:', headerPath);
        
        const response = await fetch(headerPath);
        if (!response.ok) {
            throw new Error(`Failed to load header: ${response.status} ${response.statusText}`);
        }
        
        const headerHtml = await response.text();
        
        // Insert header at the beginning of the body
        document.body.insertAdjacentHTML('afterbegin', headerHtml);
        
        // Create menu overlay if it doesn't exist
        let menuOverlay = document.querySelector('.menu-overlay');
        if (!menuOverlay) {
            menuOverlay = document.createElement('div');
            menuOverlay.className = 'menu-overlay';
            document.body.appendChild(menuOverlay);
        }
        
        // Set active state for current page
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        // Get the current page filename
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            // Check if the current page matches the link path exactly
            if (currentPage === linkPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Initialize mobile menu after header is loaded
        initializeMobileMenu();
        
        console.log('Header loaded successfully');
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;
    const topHeader = document.querySelector('.top-header');

    if (!mobileMenuToggle || !navMenu || !menuOverlay) {
        console.error('Mobile menu elements not found');
        return;
    }

    // Only show mobile menu toggle on mobile screens
    function updateMobileMenuVisibility() {
        if (window.innerWidth <= 768) {
            // Position the menu toggle on the header section
            mobileMenuToggle.style.display = 'block';
            mobileMenuToggle.style.position = 'absolute';
            mobileMenuToggle.style.right = '1rem';
            mobileMenuToggle.style.top = '50%';
            mobileMenuToggle.style.transform = 'translateY(-50%)';
            mobileMenuToggle.style.zIndex = '1001';
            mobileMenuToggle.style.background = 'var(--secondary-color)';
            mobileMenuToggle.style.borderRadius = '4px';
            mobileMenuToggle.style.padding = '0.8rem';
            mobileMenuToggle.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
            
            // Ensure the top header has the correct positioning
            if (topHeader) {
                topHeader.style.position = 'relative';
                topHeader.style.zIndex = '1000';
            }
        } else {
            mobileMenuToggle.style.display = 'none';
            // Ensure menu is closed when switching to desktop view
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
        }
    }

    // Initial check
    updateMobileMenuVisibility();

    // Toggle menu when clicking the button
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    });

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    });

    // Update visibility when window is resized
    window.addEventListener('resize', updateMobileMenuVisibility);
    
    console.log('Mobile menu initialized in header.js');
}

// Load header when DOM is ready
document.addEventListener('DOMContentLoaded', loadHeader);
