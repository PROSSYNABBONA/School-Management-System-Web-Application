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
        
        // Set active state for current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
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
    const body = document.body;

    if (!mobileMenuToggle || !navMenu) {
        console.error('Mobile menu elements not found');
        return;
    }

    // Create menu overlay if it doesn't exist
    let menuOverlay = document.querySelector('.menu-overlay');
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
    }

    function toggleMenu() {
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Toggle menu when clicking the button
    mobileMenuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
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
    
    console.log('Mobile menu initialized in header.js');
}

// Load header when DOM is ready
document.addEventListener('DOMContentLoaded', loadHeader);
