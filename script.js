// Function to show a specific page and hide others
        function showPage(pageId) {
            const pages = document.querySelectorAll('.page-content');
            pages.forEach(page => {
                page.classList.add('hidden');
                page.classList.remove('active');
            });
            const activePage = document.getElementById(`${pageId}-page`);
            if (activePage) {
                activePage.classList.remove('hidden');
                activePage.classList.add('active');
                // Adjust main-content alignment for profile page
                const mainContent = document.querySelector('.main-content');
                if (pageId === 'profile') {
                    mainContent.style.alignItems = 'center'; // Center vertically for profile
                } else {
                    mainContent.style.alignItems = 'flex-start'; // Align to top for other pages
                }
            }
        }

        // Initial page load: show home page
        document.addEventListener('DOMContentLoaded', () => {
            showPage('home');
            // Set initial theme based on local storage or default
            const savedTheme = localStorage.getItem('theme') || 'light-mode';
            document.body.className = savedTheme;
        });

        // Toggle Password Visibility
        function togglePasswordVisibility(fieldId) {
            const passwordField = document.getElementById(fieldId);
            const toggleIcon = document.getElementById(`toggle${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)}`);
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
            } else {
                passwordField.type = 'password';
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
            }
        }

        // Modal functions
        const submissionModal = document.getElementById('submissionModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');

        function showModal(title, message) {
            modalTitle.textContent = title;
            modalMessage.textContent = message;
            submissionModal.style.display = 'flex'; // Use flex to center content
        }

        function closeModal() {
            submissionModal.style.display = 'none';
        }

        // Close modal if user clicks outside of it
        window.onclick = function(event) {
            if (event.target == submissionModal) {
                closeModal();
            }
        }

        // Form Validation Functions
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        }

        // Registration Form Validation
        document.getElementById('registrationForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            let isValid = true;

            // Name validation
            const regName = document.getElementById('regName');
            const regNameError = document.getElementById('regNameError');
            if (regName.value.trim() === '') {
                regNameError.classList.remove('hidden');
                isValid = false;
            } else {
                regNameError.classList.add('hidden');
            }

            // Email validation
            const regEmail = document.getElementById('regEmail');
            const regEmailError = document.getElementById('regEmailError');
            if (!validateEmail(regEmail.value.trim())) {
                regEmailError.classList.remove('hidden');
                isValid = false;
            } else {
                regEmailError.classList.add('hidden');
            }

            // Password validation
            const regPassword = document.getElementById('regPassword');
            const regPasswordError = document.getElementById('regPasswordError');
            if (regPassword.value.length < 8) {
                regPasswordError.classList.remove('hidden');
                isValid = false;
            } else {
                regPasswordError.classList.add('hidden');
            }

            // Confirm Password validation
            const regConfirmPassword = document.getElementById('regConfirmPassword');
            const regConfirmPasswordError = document.getElementById('regConfirmPasswordError');
            if (regPassword.value !== regConfirmPassword.value) {
                regConfirmPasswordError.classList.remove('hidden');
                isValid = false;
            } else {
                regConfirmPasswordError.classList.add('hidden');
            }

            if (isValid) {
                showModal('Registration Successful!', 'Your account has been registered. (Backend integration required)');
                // In a real application, you would send this data to your PHP backend
                // For demonstration, we'll populate the profile page with this data
                document.getElementById('profileName').textContent = regName.value.trim();
                document.getElementById('profileEmail').textContent = regEmail.value.trim();
                document.getElementById('profileStatus').textContent = 'Registered (not logged in)';
                // Optionally clear the form
                this.reset();
            } else {
                showModal('Validation Error', 'Please correct the errors in the form.');
            }
        });

        // Login Form Validation
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            let isValid = true;

            // Email validation
            const loginEmail = document.getElementById('loginEmail');
            const loginEmailError = document.getElementById('loginEmailError');
            if (!validateEmail(loginEmail.value.trim())) {
                loginEmailError.classList.remove('hidden');
                isValid = false;
            } else {
                loginEmailError.classList.add('hidden');
            }

            // Password validation (just checking for empty here, real login would check credentials)
            const loginPassword = document.getElementById('loginPassword');
            const loginPasswordError = document.getElementById('loginPasswordError');
            if (loginPassword.value.trim() === '') {
                loginPasswordError.classList.remove('hidden');
                isValid = false;
            } else {
                loginPasswordError.classList.add('hidden');
            }

            if (isValid) {
                showModal('Login Attempted', 'Login logic would be handled by the backend. (Simulated success)');
                // In a real application, if login is successful, you would redirect or update UI
                // For demonstration, we'll update profile status
                document.getElementById('profileStatus').textContent = `Logged in as ${loginEmail.value.trim()}`;
                // Optionally clear the form
                this.reset();
            } else {
                showModal('Validation Error', 'Please correct the errors in the form.');
            }
        });

        // Contact Form Validation
        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            let isValid = true;

            // Name validation
            const contactName = document.getElementById('contactName');
            const contactNameError = document.getElementById('contactNameError');
            if (contactName.value.trim() === '') {
                contactNameError.classList.remove('hidden');
                isValid = false;
            } else {
                contactNameError.classList.add('hidden');
            }

            // Email validation
            const contactEmail = document.getElementById('contactEmail');
            const contactEmailError = document.getElementById('contactEmailError');
            if (!validateEmail(contactEmail.value.trim())) {
                contactEmailError.classList.remove('hidden');
                isValid = false;
            } else {
                contactEmailError.classList.add('hidden');
            }

            // Message validation
            const contactMessage = document.getElementById('contactMessage');
            const contactMessageError = document.getElementById('contactMessageError');
            if (contactMessage.value.trim() === '') {
                contactMessageError.classList.remove('hidden');
                isValid = false;
            } else {
                contactMessageError.classList.add('hidden');
            }

            // Rating validation
            const contactRatingError = document.getElementById('contactRatingError');
            const selectedRating = document.querySelector('input[name="rating"]:checked');
            if (!selectedRating) {
                contactRatingError.classList.remove('hidden');
                isValid = false;
            } else {
                contactRatingError.classList.add('hidden');
            }

            if (isValid) {
                showModal('Contact Form Submitted', 'Thank you for your message! We will get back to you soon. (Backend integration required)');
                // In a real application, you would send this data to your PHP backend
                // Optionally clear the form
                this.reset();
            } else {
                showModal('Validation Error', 'Please correct the errors in the form.');
            }
        });

        // Light/Dark Mode Toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            if (document.body.classList.contains('light-mode')) {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                localStorage.setItem('theme', 'light-mode');
            }
        });