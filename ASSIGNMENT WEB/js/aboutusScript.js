// Initialize AOS (Animate on Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

// Initialize Swiper for testimonials
document.addEventListener('DOMContentLoaded', function() {
  const testimonialsSwiper = new Swiper('.testimonials-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    }
  });
});

// Animate statistics numbers
const stats = document.querySelectorAll('.stat-number');

function animateNumber(element) {
  const target = parseInt(element.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const updateNumber = () => {
    current += step;
    if (current < target) {
      element.textContent = Math.round(current);
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = target;
    }
  };

  updateNumber();
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      stats.forEach(stat => animateNumber(stat));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrolled = window.pageYOffset;
  hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Add hover effect to initiative cards
const initiativeCards = document.querySelectorAll('.initiative-card');
initiativeCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'scale(1.05)';
    card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'scale(1)';
    card.style.boxShadow = 'none';
  });
});
