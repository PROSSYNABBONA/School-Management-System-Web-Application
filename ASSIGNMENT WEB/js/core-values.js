document.addEventListener('DOMContentLoaded', function() {
    const coreValuesGrid = document.querySelector('.core-values-grid');
    const cards = document.querySelectorAll('.core-value-card');
    const prevButton = document.getElementById('prevValue');
    const nextButton = document.getElementById('nextValue');
    
    let currentIndex = 0;
    const cardWidth = 320; // 300px card width + 20px gap
    const visibleCards = Math.floor(coreValuesGrid.offsetWidth / cardWidth);
    
    // Initialize cards
    function initializeCards() {
        cards.forEach((card, index) => {
            if (index < visibleCards) {
                card.classList.add('active');
            }
        });
        updateButtons();
    }
    
    // Update navigation buttons state
    function updateButtons() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= cards.length - visibleCards;
    }
    
    // Animate cards
    function animateCards(direction) {
        const offset = direction * cardWidth;
        currentIndex += direction;
        
        // Update active state
        cards.forEach((card, index) => {
            if (index >= currentIndex && index < currentIndex + visibleCards) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        
        // Animate grid
        coreValuesGrid.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
        updateButtons();
    }
    
    // Event listeners
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            animateCards(-1);
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentIndex < cards.length - visibleCards) {
            animateCards(1);
        }
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            currentIndex = 0;
            coreValuesGrid.style.transform = 'translateX(0)';
            initializeCards();
        }, 250);
    });
    
    // Initialize on load
    initializeCards();
    
    // Auto-advance every 5 seconds
    setInterval(() => {
        if (!nextButton.disabled) {
            animateCards(1);
        }
    }, 5000);
}); 