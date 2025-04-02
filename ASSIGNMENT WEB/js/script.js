// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Store preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

// Testimonial auto-scroll
let currentTestimonial = 0;
const testimonials = [
    {text: "Excellent school...", author: "Parent 1"},
    {text: "Great teachers...", author: "Parent 2"}
];

function showTestimonial() {
    const container = document.querySelector('.testimonial-container');
    container.innerHTML = `
        <div class="testimonial">
            <p>"${testimonials[currentTestimonial].text}"</p>
            <em>${testimonials[currentTestimonial].author}</em>
        </div>
    `;
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
}
setInterval(showTestimonial, 5000);

// Modified JavaScript for horizontal sliding
let slideIndex = 0;
const slidesWrapper = document.querySelector('.slides-wrapper');
const slides = document.querySelectorAll('.mySlides');

function moveSlides() {
    slidesWrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
}

function autoSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    moveSlides();
}

// Start automatic sliding
let slideInterval = setInterval(autoSlide, 5000);

// Pause on hover
slidesWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
slidesWrapper.addEventListener('mouseleave', () => {
    slideInterval = setInterval(autoSlide, 5000);
});

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    // Toggle menu function
    function toggleMenu() {
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Event listeners
    mobileMenuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu on window resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Dark Mode Toggle and other JS remains the same