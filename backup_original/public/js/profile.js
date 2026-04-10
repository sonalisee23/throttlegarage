document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!checkLoginStatus()) {
        window.location.href = 'login.html';
        return;
    }

    // Load user data from the appropriate storage
    const userData = JSON.parse(localStorage.getItem('userData')) || JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
        initializeProfile(userData);
    } else {
        window.location.href = 'login.html';
    }

    // Setup logout button
    const logoutBtn = document.querySelector('.logout-button');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});

// Check login status
function checkLoginStatus() {
    return localStorage.getItem('isLoggedIn') === 'true' || sessionStorage.getItem('isLoggedIn') === 'true';
}

// Initialize profile with user data
function initializeProfile(userData) {
    // Set user name in profile header
    const profileHeader = document.querySelector('.profile-header');
    if (profileHeader) {
        const welcomeHeading = document.querySelector('.profile-header h1');
        if (welcomeHeading) {
            welcomeHeading.textContent = `Welcome, ${userData.fullName}!`;
        }
    }

    // Set avatar
    const avatarPlaceholder = document.querySelector('.avatar-placeholder');
    if (avatarPlaceholder) {
        if (userData.avatar) {
            switch (userData.avatar.type) {
                case 'image':
                    avatarPlaceholder.innerHTML = `<img src="${userData.avatar.value}" alt="User Avatar">`;
                    break;
                case 'color':
                    avatarPlaceholder.innerHTML = `<i class="fas fa-user"></i>`;
                    avatarPlaceholder.style.backgroundColor = userData.avatar.value;
                    break;
                case 'emoji':
                    avatarPlaceholder.innerHTML = userData.avatar.value;
                    avatarPlaceholder.style.backgroundColor = '#E31E24';
                    break;
                default:
                    avatarPlaceholder.innerHTML = userData.fullName.charAt(0).toUpperCase();
            }
        } else {
            avatarPlaceholder.innerHTML = userData.fullName.charAt(0).toUpperCase();
        }
    }

    // Initialize sample bikes if user doesn't have any
    if (!userData.bikes || userData.bikes.length === 0) {
        initializeSampleBikes(userData);
    }

    // Load all profile sections
    loadPersonalInfo(userData);
    loadCartItems();
    loadUserBikes(userData);
    loadOrderHistory(userData);
    loadSettings(userData);
    initializeEventListeners();
    initializeAvatarFunctionality();
}

// Initialize sample bikes for new users
function initializeSampleBikes(userData) {
    const sampleBikes = [
        {
            make: 'Honda',
            model: 'CBR1000RR',
            year: 2022
        },
        {
            make: 'Kawasaki',
            model: 'Ninja ZX-10R',
            year: 2021
        }
    ];
    
    userData.bikes = sampleBikes;
    
    // Save to storage
    localStorage.setItem('userData', JSON.stringify(userData));
    if (sessionStorage.getItem('userData')) {
        sessionStorage.setItem('userData', JSON.stringify(userData));
    }
}

// Load personal information
function loadPersonalInfo(userData) {
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    if (fullNameInput) fullNameInput.value = userData.fullName || '';
    if (emailInput) emailInput.value = userData.email || '';
    if (phoneInput) phoneInput.value = userData.phone || '';
}

// Load user settings
function loadSettings(userData) {
    const orderUpdatesToggle = document.getElementById('orderUpdates');
    const promotionsToggle = document.getElementById('promotions');

    if (orderUpdatesToggle) {
        orderUpdatesToggle.checked = userData.notifications?.orderUpdates ?? true;
    }
    if (promotionsToggle) {
        promotionsToggle.checked = userData.notifications?.promotions ?? true;
    }
}

// Initialize all event listeners
function initializeEventListeners() {
    // Personal Info Form
    const personalInfoForm = document.getElementById('personalInfoForm');
    if (personalInfoForm) {
        personalInfoForm.addEventListener('submit', handlePersonalInfoUpdate);
    }

    // Add Bike
    const addBikeBtn = document.getElementById('addBikeBtn');
    const addBikeModal = document.getElementById('addBikeModal');
    const addBikeForm = document.getElementById('addBikeForm');

    if (addBikeBtn) {
        addBikeBtn.addEventListener('click', () => {
            if (addBikeModal) {
                addBikeModal.classList.add('active');
            }
        });
    }

    if (addBikeForm) {
        addBikeForm.addEventListener('submit', handleAddBike);
    }

    // Change Password Button
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const changePasswordModal = document.getElementById('changePasswordModal');
    const changePasswordForm = document.getElementById('changePasswordForm');

    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            if (changePasswordModal) {
                changePasswordModal.classList.add('active');
            }
        });
    }

    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', handleChangePassword);
    }

    // Close modals
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
                
                // Reset add bike form if it's the add bike modal
                if (modal.id === 'addBikeModal') {
                    const form = document.getElementById('addBikeForm');
                    if (form) {
                        form.reset();
                        form.removeAttribute('data-editing-index');
                        form.onsubmit = handleAddBike; // Reset to add bike handler
                        
                        const modalTitle = modal.querySelector('.modal-header h2');
                        if (modalTitle) {
                            modalTitle.textContent = 'Add New Bike';
                        }
                    }
                }
            });
        });
    });

    // Settings form
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        const toggleInputs = settingsForm.querySelectorAll('input[type="checkbox"]');
        toggleInputs.forEach(input => {
            input.addEventListener('change', handleSettingsChange);
        });
    }

    // Switch User Button
    const switchUserBtn = document.getElementById('switchUserBtn');
    if (switchUserBtn) {
        switchUserBtn.addEventListener('click', handleSwitchUser);
    }

    // Sign Out Button
    const signOutBtn = document.getElementById('signOutBtn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', handleSignOut);
    }
}

// Handle logout
function handleLogout() {
    // Clear stored data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('isLoggedIn');
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Load user's bikes from user data
function loadUserBikes(userData) {
    const bikesList = document.getElementById('bikesList');
    if (!bikesList) return;
    
    try {
        // Get bikes from user data (local storage)
        const bikes = userData.bikes || [];
        
        bikesList.innerHTML = '';
        
        if (bikes.length === 0) {
            bikesList.innerHTML = '<p class="no-bikes">No bikes added yet. Click "Add New Bike" to get started!</p>';
            return;
        }
        
        bikes.forEach((bike, index) => {
            const bikeCard = createBikeCard(bike, index);
            bikesList.appendChild(bikeCard);
        });
    } catch (error) {
        console.error('Error loading bikes:', error);
        bikesList.innerHTML = '<p class="error-message">Failed to load bikes</p>';
    }
}

// Create bike card element
function createBikeCard(bike, index) {
    const div = document.createElement('div');
    div.className = 'bike-card';
    div.innerHTML = `
        <div class="bike-info">
            <i class="fas fa-motorcycle"></i>
            <div class="bike-details">
                <h4>${bike.make} ${bike.model}</h4>
                <p>Year: ${bike.year}</p>
            </div>
        </div>
        <div class="bike-actions">
            <button onclick="editBike(${index})" class="edit-btn" title="Edit Bike">
                <i class="fas fa-edit"></i>
            </button>
            <button onclick="deleteBike(${index})" class="delete-btn" title="Delete Bike">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    return div;
}

// Load order history from API or local storage
function loadOrderHistory(userData) {
    const ordersList = document.getElementById('ordersList');
    if (!ordersList) return;
    
    // Helper to display orders
    function displayOrders(orders, isLocal = false) {
        ordersList.innerHTML = '';
        if (!orders || orders.length === 0) {
            ordersList.innerHTML = isLocal
                ? '<p class="no-orders">No local orders found</p>'
                : '<p class="no-orders">No orders yet</p>';
            return;
        }
        // Sort orders by date (newest first)
        orders.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
        // Show only the top 2
        const topOrders = orders.slice(0, 2);
        topOrders.forEach(order => {
            const orderCard = createOrderCard(order);
            ordersList.appendChild(orderCard);
        });
    }

    // Try to fetch from API
    fetch('/api/orders', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('API request failed');
        }
    })
    .then(orders => {
        if (orders && orders.length > 0) {
            displayOrders(orders);
        } else {
            // Fallback to localStorage if no orders from API
            const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
            displayOrders(localOrders, true);
        }
    })
    .catch(error => {
        console.error('Error fetching orders:', error);
        // Fallback to localStorage if API fails
        const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        displayOrders(localOrders, true);
    });
}

// Create order card element
function createOrderCard(order) {
    const div = document.createElement('div');
    div.className = 'order-card';
    
    const orderId = order.id || order._id || `ORD${Math.floor(Math.random() * 10000)}`;
    const orderDate = order.createdAt || order.date || new Date().toISOString();
    const orderStatus = order.status || 'processing';
    
    // Handle different order item formats
    let orderItems = [];
    if (order.items && Array.isArray(order.items)) {
        orderItems = order.items;
    }
    
    // Calculate total if not provided
    let orderTotal = Number(order.totalAmount || order.total || 0);
    if (orderTotal === 0 && orderItems.length > 0) {
        orderTotal = orderItems.reduce((sum, item) => {
            const itemPrice = Number(item.price) || 0;
            const itemQuantity = Number(item.quantity) || 1;
            return sum + (itemPrice * itemQuantity);
        }, 0);
    }
    
    div.innerHTML = `
        <div class="order-header">
            <span class="order-number">Order #${orderId}</span>
            <span class="order-date">${new Date(orderDate).toLocaleDateString()}</span>
            <span class="order-status ${orderStatus}">${orderStatus}</span>
        </div>
        <div class="order-items">
            ${orderItems.map(item => {
                const itemName = item.name || (item.product && (item.product.name || item.product)) || 'Product';
                const itemPrice = Number(item.price) || 0;
                const itemQuantity = Number(item.quantity) || 1;
                return `
                    <div class="order-item">
                        <span>${itemName}</span>
                        <span>Qty: ${itemQuantity}</span>
                        <span>₹${itemPrice.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                `;
            }).join('')}
        </div>
        <div class="order-total">
            <span>Total:</span>
            <span>₹${orderTotal.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
    `;
    return div;
}

// Handle form submissions
async function handlePersonalInfoUpdate(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;

    try {
        submitButton.textContent = 'Saving...';
        submitButton.disabled = true;

        const updatedData = {
            fullName: form.fullName.value,
            email: form.email.value,
            phone: form.phone.value
        };

        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await fetch('/api/users/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            const result = await response.json();
            updateStoredUserData(result.user);
            showSuccess('Profile updated successfully');
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update profile');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        showError(error.message || 'Failed to update profile');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Update user data in storage
function updateStoredUserData(newData) {
    // Get existing data
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');

    // Update data
    userData = { ...userData, ...newData };

    // Save back to storage
    localStorage.setItem('userData', JSON.stringify(userData));
    if (sessionStorage.getItem('userData')) {
        sessionStorage.setItem('userData', JSON.stringify(userData));
    }
}

// Handle adding a new bike
function handleAddBike(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;

    try {
        submitButton.textContent = 'Adding...';
        submitButton.disabled = true;

        const newBike = {
            make: form.bikeMake.value.trim(),
            model: form.bikeModel.value.trim(),
            year: parseInt(form.bikeYear.value)
        };

        // Validate input
        if (!newBike.make || !newBike.model || !newBike.year) {
            throw new Error('Please fill in all fields');
        }

        if (newBike.year < 1900 || newBike.year > new Date().getFullYear() + 1) {
            throw new Error('Please enter a valid year');
        }

        // Add bike to local storage
        addBikeToUserData(newBike);
        
        // Reset form and close modal
        form.reset();
        document.getElementById('addBikeModal').classList.remove('active');
        showSuccess('Bike added successfully');
        
        // Refresh bikes list
        const userData = JSON.parse(localStorage.getItem('userData')) || JSON.parse(sessionStorage.getItem('userData'));
        loadUserBikes(userData);
        
    } catch (error) {
        console.error('Error adding bike:', error);
        showError(error.message || 'Could not add bike');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Add bike to user data
function addBikeToUserData(newBike) {
    // Get existing data
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // Initialize bikes array if it doesn't exist
    if (!userData.bikes) {
        userData.bikes = [];
    }
    
    // Add new bike
    userData.bikes.push(newBike);
    
    // Save back to storage
    localStorage.setItem('userData', JSON.stringify(userData));
    if (sessionStorage.getItem('userData')) {
        sessionStorage.setItem('userData', JSON.stringify(userData));
    }
}

// Handle password change
async function handleChangePassword(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    const currentPassword = form.currentPassword.value;
    const newPassword = form.newPassword.value;
    const confirmNewPassword = form.confirmNewPassword.value;
    
    if (newPassword !== confirmNewPassword) {
        showError('New passwords do not match');
        return;
    }
    
    try {
        submitButton.textContent = 'Updating...';
        submitButton.disabled = true;
        
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await fetch('/api/users/password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                currentPassword,
                newPassword
            })
        });
        
        if (response.ok) {
            showSuccess('Password updated successfully');
            form.reset();
            document.getElementById('changePasswordModal').classList.remove('active');
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update password');
        }
    } catch (error) {
        console.error('Error updating password:', error);
        showError(error.message || 'Failed to update password');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Handle settings changes
async function handleSettingsChange(e) {
    const toggleInput = e.target;
    const settingName = toggleInput.id;
    const isChecked = toggleInput.checked;
    
    // Get existing user data
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // Initialize notifications object if needed
    if (!userData.notifications) {
        userData.notifications = {};
    }
    
    // Update the specific setting
    userData.notifications[settingName] = isChecked;
    
    // Save to storage
    localStorage.setItem('userData', JSON.stringify(userData));
    if (sessionStorage.getItem('userData')) {
        sessionStorage.setItem('userData', JSON.stringify(userData));
    }
    
    // Try API call
    try {
        const response = await fetch('/api/users/notifications', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                notifications: userData.notifications
            })
        });
        
        if (!response.ok) {
            console.warn('Failed to update notification settings on server');
        }
    } catch (error) {
        console.error('Error updating notification settings:', error);
    }
    
    showSuccess('Settings updated');
}

// Edit bike
function editBike(bikeIndex) {
    try {
        // Get current user data
        let userData = JSON.parse(localStorage.getItem('userData')) || JSON.parse(sessionStorage.getItem('userData'));
        
        if (!userData.bikes || !userData.bikes[bikeIndex]) {
            throw new Error('Bike not found');
        }
        
        const bike = userData.bikes[bikeIndex];
        
        // Populate the add bike form with current values
        const form = document.getElementById('addBikeForm');
        const modal = document.getElementById('addBikeModal');
        const modalTitle = modal.querySelector('.modal-header h2');
        
        // Change modal title to indicate editing
        modalTitle.textContent = 'Edit Bike';
        
        // Populate form fields
        form.bikeMake.value = bike.make;
        form.bikeModel.value = bike.model;
        form.bikeYear.value = bike.year;
        
        // Add data attribute to track which bike is being edited
        form.setAttribute('data-editing-index', bikeIndex);
        
        // Show modal
        modal.classList.add('active');
        
        // Update form submission handler for editing
        form.onsubmit = function(e) {
            e.preventDefault();
            handleEditBike(e, bikeIndex);
        };
        
    } catch (error) {
        console.error('Error editing bike:', error);
        showError('Failed to edit bike');
    }
}

// Handle editing a bike
function handleEditBike(e, bikeIndex) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;

    try {
        submitButton.textContent = 'Updating...';
        submitButton.disabled = true;

        const updatedBike = {
            make: form.bikeMake.value.trim(),
            model: form.bikeModel.value.trim(),
            year: parseInt(form.bikeYear.value)
        };

        // Validate input
        if (!updatedBike.make || !updatedBike.model || !updatedBike.year) {
            throw new Error('Please fill in all fields');
        }

        if (updatedBike.year < 1900 || updatedBike.year > new Date().getFullYear() + 1) {
            throw new Error('Please enter a valid year');
        }

        // Get current user data
        let userData = JSON.parse(localStorage.getItem('userData')) || JSON.parse(sessionStorage.getItem('userData'));
        
        // Update bike in array
        userData.bikes[bikeIndex] = updatedBike;
        
        // Save updated data
        localStorage.setItem('userData', JSON.stringify(userData));
        if (sessionStorage.getItem('userData')) {
            sessionStorage.setItem('userData', JSON.stringify(userData));
        }
        
        // Reset form and close modal
        form.reset();
        form.removeAttribute('data-editing-index');
        form.onsubmit = handleAddBike; // Reset to add bike handler
        
        const modal = document.getElementById('addBikeModal');
        const modalTitle = modal.querySelector('.modal-header h2');
        modalTitle.textContent = 'Add New Bike';
        modal.classList.remove('active');
        
        showSuccess('Bike updated successfully');
        
        // Refresh bikes list
        loadUserBikes(userData);
        
    } catch (error) {
        console.error('Error updating bike:', error);
        showError(error.message || 'Could not update bike');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Delete bike
function deleteBike(bikeIndex) {
    if (confirm('Are you sure you want to delete this bike?')) {
        try {
            // Get current user data
            let userData = JSON.parse(localStorage.getItem('userData')) || JSON.parse(sessionStorage.getItem('userData'));
            
            if (!userData.bikes || !userData.bikes[bikeIndex]) {
                throw new Error('Bike not found');
            }
            
            // Remove bike from array
            userData.bikes.splice(bikeIndex, 1);
            
            // Save updated data
            localStorage.setItem('userData', JSON.stringify(userData));
            if (sessionStorage.getItem('userData')) {
                sessionStorage.setItem('userData', JSON.stringify(userData));
            }
            
            // Refresh bikes list
            loadUserBikes(userData);
            showSuccess('Bike removed successfully');
            
        } catch (error) {
            console.error('Error deleting bike:', error);
            showError('Failed to delete bike');
        }
    }
}

// Error and Success messages
function showProfileMessage(message, type) {
    const msgDiv = document.getElementById('profileMessage');
    if (!msgDiv) return;
    msgDiv.textContent = message;
    msgDiv.className = 'auth-message ' + (type === 'success' ? 'success' : 'error');
    msgDiv.style.display = 'block';
    setTimeout(() => {
        msgDiv.style.display = 'none';
    }, 4000);
}

function showSuccess(message) {
    showProfileMessage(message, 'success');
}

function showError(message) {
    showProfileMessage(message, 'error');
}

// Load current cart items
function loadCartItems() {
    const cartItemsList = document.getElementById('cartItemsList');
    if (!cartItemsList) return;
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        return;
    }
    
    // Display up to 3 items with a "View More" option if there are more
    const displayLimit = 3;
    const itemsToDisplay = cart.slice(0, displayLimit);
    const remainingItems = cart.length - displayLimit;
    
    // Create HTML for cart items
    const cartItemsHTML = itemsToDisplay.map(item => `
        <div class="profile-cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">₹${item.price.toFixed(2)}</p>
                <p class="cart-item-quantity">Quantity: ${item.quantity}</p>
            </div>
        </div>
    `).join('');
    
    // Add remaining items message if needed
    const remainingHTML = remainingItems > 0 ? 
        `<p class="more-items">+${remainingItems} more item${remainingItems > 1 ? 's' : ''}</p>` : '';
    
    // Calculate cart total
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Combine all HTML
    cartItemsList.innerHTML = `
        ${cartItemsHTML}
        ${remainingHTML}
        <div class="cart-summary">
            <p class="cart-total">Total: ₹${cartTotal.toFixed(2)}</p>
        </div>
    `;
}

// Handle Switch User
function handleSwitchUser() {
    // Store the current page URL in sessionStorage
    sessionStorage.setItem('returnUrl', window.location.href);
    
    // Clear current user session but keep some cart data
    const cart = localStorage.getItem('cart');
    
    // Clear all storage except cart
    localStorage.clear();
    sessionStorage.clear();
    
    // Restore cart data
    if (cart) {
        localStorage.setItem('cart', cart);
    }
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Handle Sign Out
function handleSignOut() {
    // Show confirmation dialog
    if (confirm('Are you sure you want to sign out?')) {
        // Clear all storage
        localStorage.clear();
        sessionStorage.clear();
        
        // Show success message
        showSuccess('Successfully signed out');
        
        // Redirect to home page after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
}

// Avatar functionality
function initializeAvatarFunctionality() {
    const changeAvatarBtn = document.querySelector('.change-avatar');
    const avatarModal = document.getElementById('avatarModal');
    const uploadArea = document.getElementById('uploadArea');
    const avatarUpload = document.getElementById('avatarUpload');
    const avatarPresets = document.querySelectorAll('.avatar-preset');
    const avatarPlaceholder = document.querySelector('.avatar-placeholder');

    // Open avatar modal
    changeAvatarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        avatarModal.classList.add('active');
    });

    // Handle file upload
    uploadArea.addEventListener('click', () => avatarUpload.click());

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });

    avatarUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });

    // Handle preset avatars
    avatarPresets.forEach(preset => {
        // Set background color for color-based presets
        if (preset.dataset.color) {
            preset.style.backgroundColor = preset.dataset.color;
        }

        preset.addEventListener('click', () => {
            // Remove selection from other presets
            avatarPresets.forEach(p => p.classList.remove('selected'));
            preset.classList.add('selected');

            if (preset.dataset.color) {
                // Color-based avatar
                avatarPlaceholder.innerHTML = `<i class="fas fa-user"></i>`;
                avatarPlaceholder.style.backgroundColor = preset.dataset.color;
                saveAvatarData({ type: 'color', value: preset.dataset.color });
            } else if (preset.dataset.emoji) {
                // Emoji avatar
                avatarPlaceholder.innerHTML = preset.dataset.emoji;
                avatarPlaceholder.style.backgroundColor = '#E31E24';
                saveAvatarData({ type: 'emoji', value: preset.dataset.emoji });
            }

            // Close modal after selection
            setTimeout(() => {
                avatarModal.classList.remove('active');
                showSuccess('Avatar updated successfully');
            }, 500);
        });
    });
}

function handleImageUpload(file) {
    if (!file.type.startsWith('image/')) {
        showError('Please upload an image file');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const avatarPlaceholder = document.querySelector('.avatar-placeholder');
        avatarPlaceholder.innerHTML = `<img src="${e.target.result}" alt="User Avatar">`;
        
        // Save avatar data
        saveAvatarData({ type: 'image', value: e.target.result });

        // Close modal and show success message
        document.getElementById('avatarModal').classList.remove('active');
        showSuccess('Avatar updated successfully');
    };
    reader.readAsDataURL(file);
}

function saveAvatarData(avatarData) {
    // Get current user data
    let userData = JSON.parse(localStorage.getItem('userData') || sessionStorage.getItem('userData') || '{}');
    
    // Update avatar data
    userData.avatar = avatarData;
    
    // Save back to storage
    if (localStorage.getItem('userData')) {
        localStorage.setItem('userData', JSON.stringify(userData));
    }
    if (sessionStorage.getItem('userData')) {
        sessionStorage.setItem('userData', JSON.stringify(userData));
    }
}

// Add function to get user data from API
async function getUserData() {
    try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await fetch('/api/users/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.user;
        } else {
            throw new Error('Failed to fetch user data');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
} 