document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    // Sample user data - in a real app, this would come from a backend
    const validUsers = [{
            email: 'test@example.com',
            password: 'password123',
            fullName: 'Test User'
        },
        {
            email: 'admin@throtlegarage.com',
            password: 'admin123',
            fullName: 'Admin User'
        }
    ];

    // Check if user is already logged in
    if (checkLoginStatus()) {
        const returnUrl = sessionStorage.getItem('returnUrl');
        if (returnUrl) {
            sessionStorage.removeItem('returnUrl');
            window.location.href = returnUrl;
        } else {
            window.location.href = 'profile.html';
        }
        return;
    }

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Clear any existing error messages
        clearErrors();

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Store the token and user data
                const storage = rememberMe ? localStorage : sessionStorage;
                storage.setItem('token', data.token);
                storage.setItem('userData', JSON.stringify(data.user));
                storage.setItem('isLoggedIn', 'true');

                // Show success message
                showSuccess('Login successful! Redirecting...');

                // Redirect after a short delay
                setTimeout(() => {
                    const returnUrl = sessionStorage.getItem('returnUrl');
                    if (returnUrl) {
                        sessionStorage.removeItem('returnUrl');
                        window.location.href = returnUrl;
                    } else {
                        window.location.href = 'profile.html';
                    }
                }, 1500);
            } else {
                showError(data.message || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            showError('An error occurred. Please try again.');
        }
    });
});

function checkLoginStatus() {
    return localStorage.getItem('isLoggedIn') === 'true' || sessionStorage.getItem('isLoggedIn') === 'true';
}

function setLoggedIn(userData, rememberMe = false) {
    if (rememberMe) {
        // Store in localStorage for persistent login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(userData));
    } else {
        // Store in sessionStorage for session-only login
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userData', JSON.stringify(userData));
    }
}

function clearErrors() {
    const messages = document.querySelectorAll('.auth-message');
    messages.forEach(msg => msg.remove());
}

function showError(message) {
    clearErrors();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'auth-message error';
    errorDiv.textContent = message;

    const form = document.getElementById('loginForm');
    form.insertBefore(errorDiv, form.firstChild);
}

function showSuccess(message) {
    clearErrors();

    const successDiv = document.createElement('div');
    successDiv.className = 'auth-message success';
    successDiv.textContent = message;

    const form = document.getElementById('loginForm');
    form.insertBefore(successDiv, form.firstChild);
}