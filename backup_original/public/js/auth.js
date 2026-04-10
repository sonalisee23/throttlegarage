document.addEventListener('DOMContentLoaded', () => {
    // Get the current page form
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Get registered users from localStorage or use default if none exist
    const defaultUsers = [
        {
            email: 'test@example.com',
            password: 'password123',
            name: 'Test User',
            fullName: 'Test User', // Added for consistency
            phone: '+1234567890',
            notifications: {
                orderUpdates: true,
                promotions: true
            }
        }
    ];
    
    // Initialize users in localStorage if not exists
    if (!localStorage.getItem('registeredUsers')) {
        localStorage.setItem('registeredUsers', JSON.stringify(defaultUsers));
    }

    // Handle Login Form
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.querySelector('input[type="checkbox"]').checked;

            // Show loading state
            const submitButton = loginForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Logging in...';
            submitButton.disabled = true;

            // Clear any existing messages
            removeMessages();

            // Get registered users and validate credentials
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const user = registeredUsers.find(u => u.email === email && u.password === password);

            if (user) {
                // Valid credentials - use the complete user data
                const userData = {
                    id: user.id || Date.now(),
                    fullName: user.fullName || user.name,
                    email: user.email,
                    phone: user.phone || '',
                    notifications: user.notifications || {
                        orderUpdates: true,
                        promotions: true
                    }
                };

                const token = 'auth_token_' + Math.random();

                // Store auth token and user data
                if (rememberMe) {
                    localStorage.setItem('authToken', token);
                    localStorage.setItem('userData', JSON.stringify(userData));
                    localStorage.setItem('isLoggedIn', 'true');
                } else {
                    sessionStorage.setItem('authToken', token);
                    sessionStorage.setItem('userData', JSON.stringify(userData));
                    sessionStorage.setItem('isLoggedIn', 'true');
                }

                // Redirect to profile page
                window.location.href = 'profile.html';
            } else {
                showError('Invalid email or password');
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Handle Register Form
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const termsAccepted = document.querySelector('input[type="checkbox"]').checked;

            // Validate passwords match
            if (password !== confirmPassword) {
                showError('Passwords do not match');
                return;
            }

            // Validate terms accepted
            if (!termsAccepted) {
                showError('Please accept the terms and conditions');
                return;
            }

            // Get existing users
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

            // Check if email already exists
            if (registeredUsers.some(user => user.email === email)) {
                showError('Email already registered');
                return;
            }

            // Show loading state
            const submitButton = registerForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Creating Account...';
            submitButton.disabled = true;

            // Create complete user data
            const userId = Date.now();
            const newUser = {
                id: userId,
                email: email,
                password: password,
                name: fullName,
                fullName: fullName,
                phone: '',
                notifications: {
                    orderUpdates: true,
                    promotions: true
                }
            };

            // Add new user to registered users
            registeredUsers.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

            // Create user data for session (excluding password)
            const userData = {
                id: userId,
                fullName: fullName,
                email: email,
                phone: '',
                notifications: {
                    orderUpdates: true,
                    promotions: true
                }
            };

            const token = 'auth_token_' + Math.random();

            // Store auth token and user data
            localStorage.setItem('authToken', token);
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('isLoggedIn', 'true');
            
            // Show success message and redirect
            showSuccess('Account created successfully!');
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1500);
        });
    }
});

// Helper Functions
function showError(message) {
    // Remove any existing messages
    removeMessages();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'auth-message error';
    errorDiv.textContent = message;

    // Insert error before the form
    const form = document.querySelector('.auth-form');
    form.parentNode.insertBefore(errorDiv, form);

    // Auto remove after 5 seconds
    setTimeout(() => errorDiv.remove(), 5000);
}

function showSuccess(message) {
    // Remove any existing messages
    removeMessages();

    const successDiv = document.createElement('div');
    successDiv.className = 'auth-message success';
    successDiv.textContent = message;

    // Insert success before the form
    const form = document.querySelector('.auth-form');
    form.parentNode.insertBefore(successDiv, form);
}

function removeMessages() {
    const messages = document.querySelectorAll('.auth-message');
    messages.forEach(message => message.remove());
}

function isPasswordStrong(password) {
    // Password should be at least 8 characters long and contain:
    // - At least one uppercase letter
    // - At least one lowercase letter
    // - At least one number
    // - At least one special character
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPassword.test(password);
}

// Simulate API call (replace with actual API calls)
function simulateApiCall(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate successful response with user data
            resolve({
                success: true,
                token: 'dummy_auth_token_' + Math.random(),
                userData: {
                    id: 1,
                    fullName: data.fullName || 'John Doe',
                    email: data.email,
                    phone: '+1234567890',
                    notifications: {
                        orderUpdates: true,
                        promotions: true
                    }
                },
                message: 'Operation successful'
            });
        }, 1000);
    });
} 