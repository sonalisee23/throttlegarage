document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Clear any existing messages
        clearMessages();

        // Validate passwords match
        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Show success message
                showSuccess('Registration successful! Redirecting to login...');

                // Redirect to login page after a short delay
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                showError(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            showError('An error occurred during registration. Please try again.');
        }
    });
});

function clearMessages() {
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

function showError(message) {
    clearMessages();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'auth-message error';
    errorDiv.textContent = message;
    
    const form = document.getElementById('registerForm');
    form.insertBefore(errorDiv, form.firstChild);
}

function showSuccess(message) {
    clearMessages();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'auth-message success';
    successDiv.textContent = message;
    
    const form = document.getElementById('registerForm');
    form.insertBefore(successDiv, form.firstChild);
} 