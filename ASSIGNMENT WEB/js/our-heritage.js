// Our Heritage Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Get the heritage section
  const heritageSection = document.querySelector('.card[data-aos="fade-right"]');
  
  if (heritageSection) {
    // Add animation to the heritage image
    const heritageImage = heritageSection.querySelector('.image img');
    if (heritageImage) {
      heritageImage.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.5s ease';
      });
      
      heritageImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    }
    
    // Add animation to the heritage text
    const heritageText = heritageSection.querySelector('.text');
    if (heritageText) {
      heritageText.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'transform 0.3s ease';
      });
      
      heritageText.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    }
    
    // Add a highlight effect to the heritage heading
    const heritageHeading = heritageSection.querySelector('h2');
    if (heritageHeading) {
      heritageHeading.addEventListener('mouseenter', function() {
        this.style.color = 'var(--secondary-color)';
        this.style.transition = 'color 0.3s ease';
      });
      
      heritageHeading.addEventListener('mouseleave', function() {
        this.style.color = 'var(--primary-color)';
      });
    }
    
    // Add a subtle animation to the heritage paragraph
    const heritageParagraph = heritageSection.querySelector('p');
    if (heritageParagraph) {
      heritageParagraph.addEventListener('mouseenter', function() {
        this.style.color = 'var(--primary-color)';
        this.style.transition = 'color 0.3s ease';
      });
      
      heritageParagraph.addEventListener('mouseleave', function() {
        this.style.color = '#666';
      });
    }
  }
  
  // Add a scroll reveal effect for the heritage section
  const heritageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('heritage-visible');
        heritageObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  if (heritageSection) {
    heritageObserver.observe(heritageSection);
  }
}); 