// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formGroups = document.querySelectorAll('.form-group');

    // Function to show error message
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        input.classList.add('error');
    }

    // Function to remove error message
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
        input.classList.remove('error');
    }

    // Function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to validate form
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        // Reset previous errors
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const errorMessage = group.querySelector('.error-message');
            if (input) {
                input.classList.remove('error');
                errorMessage.textContent = '';
                errorMessage.style.display = 'none';
            }
        });

        // Validate name
        if (name.value.trim() === '') {
            showError(name, 'Please enter your name');
            isValid = false;
        }

        // Validate email
        if (email.value.trim() === '') {
            showError(email, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate message
        if (message.value.trim() === '') {
            showError(message, 'Please enter your message');
            isValid = false;
        }

        return isValid;
    }

    // Add input event listeners for real-time validation
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (input) {
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    removeError(input);
                }
            });
        }
    });

    // Handle form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Message sent successfully!';
            contactForm.appendChild(successMessage);

            // Reset form
            contactForm.reset();

            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    });

    // Map functionality
    const mapContainer = document.querySelector('.map-container');
    const schoolLocation = {
        lat: 0.319444,
        lng: 32.633889
    };

    // Add Get Directions button
    const directionsButton = document.createElement('button');
    directionsButton.className = 'directions-btn';
    directionsButton.innerHTML = '<i class="fas fa-directions"></i> Get Directions';
    mapContainer.appendChild(directionsButton);

    // Handle Get Directions click
    directionsButton.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    
                    // Open Google Maps with directions
                    const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${schoolLocation.lat},${schoolLocation.lng}&travelmode=driving`;
                    window.open(directionsUrl, '_blank');
                },
                (error) => {
                    alert('Unable to get your location. Please enable location services or enter your location manually.');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser. Please enter your location manually.');
        }
    });
});

// Add styles for error and success messages
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: var(--accent-color) !important;
    }

    .success-message {
        background-color: #4caf50;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        margin-top: 1rem;
        text-align: center;
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style); 