// Cart Management System
let cart = [];

// Initialize cart functionality
function initCart() {
    // Clean up any invalid items in the cart
    cleanupCart();
    updateCartCount();
    addCartEventListeners();
}

// Clean up invalid items from cart
function cleanupCart() {
    let storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    // Remove any items with undefined id, name, or invalid price
    cart = storedCart.filter(item => {
        return item && 
               item.id && 
               item.id !== 'undefined' && 
               item.name && 
               item.name !== 'undefined' && 
               !isNaN(item.price) && 
               !isNaN(item.quantity) &&
               item.quantity > 0;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add event listeners for cart functionality
function addCartEventListeners() {
    document.querySelectorAll('.add-to-cart, .shop-now-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productCard = this.closest('.product-card, .bike-card');
            const productId = productCard ? (productCard.dataset.productId || this.dataset.productId) : this.dataset.productId;
            if (productId && productId !== 'undefined') {
                addToCart(productId, event);
            }
        });
    });

    // Add checkout button event listener
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleCheckout();
        });
    }
}

// Handle checkout process
function handleCheckout() {
    // Check if cart is empty
    if (cart.length === 0) {
        showMessage('Your cart is empty', 'error');
        return;
    }

    // Check if user is logged in
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
        showMessage('Please log in to proceed with checkout', 'error');
        setTimeout(() => {
            window.location.href = '/login.html';
        }, 2000);
        return;
    }

    // Proceed to checkout
    window.location.href = '/checkout.html';
}

// Add item to cart
function addToCart(productId, event) {
    if (!productId || productId === 'undefined') {
        console.error('Invalid product ID provided to addToCart function');
        return;
    }
    
    let card;
    if (event && event.target) {
        // Try to find the product card from the event
        card = event.target.closest('.product-card, .bike-card');
    }
    
    let product;
    
    if (card) {
        // Extract product details from the card
        const nameElement = card.querySelector('h3, .bike-name, .product-name, .product-title');
        const priceElement = card.querySelector('.price, .bike-specs, .product-price');
        const imageElement = card.querySelector('img, .bike-image, .product-image');
        const descElement = card.querySelector('p, .product-description');
        
        // Make sure we have the required elements
        if (nameElement && priceElement) {
            // Extract price from text content (handles different currency formats)
            let priceText = priceElement.textContent;
            let priceMatch = priceText.match(/[₹$](\d+(?:,\d+)*(?:\.\d{2})?)/);
            let price = priceMatch ? parseFloat(priceMatch[1].replace(/,/g, '')) : 0;
            
            if (!isNaN(price)) {
                product = {
                    id: productId,
                    name: nameElement.textContent.trim(),
                    price: price,
                    image: imageElement ? imageElement.src : 'https://placehold.co/400x300/222/fff?text=Product+Image',
                    description: descElement ? descElement.textContent.trim() : '',
                    quantity: 1
                };
            }
        }
    }
    
    // Fallback for cases where card data is incomplete
    if (!product) {
        showMessage('Unable to add product to cart', 'error');
        return;
    }

    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart display
    updateCartDisplay();
    updateCartCount();
    
    // Show success message
    showMessage(product.name + ' added to cart!');
}

// Remove item from cart
function removeFromCart(productId) {
    if (!productId || productId === 'undefined') {
        // Clean up the entire cart if there are invalid items
        cleanupCart();
    } else {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    updateCartDisplay();
    updateCartCount();
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    // Clean up cart before displaying
    cleanupCart();

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="index.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
        updateCartTotals(0, 0);
        return;
    }

    const itemsHtml = cart.map(item => {
        if (!item || !item.id || item.id === 'undefined') return '';
        
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 0;
        const totalPrice = price * quantity;

        return `
            <div class="cart-item" data-product-id="${item.id}">
                <img src="${item.source === 'trade-in' ? 'https://placehold.co/400x300/222/fff?text=Trade-in+Item' : item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://placehold.co/400x300/222/fff?text=Product+Image'">
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-description">${item.description || ''}</p>
                    ${item.source === 'trade-in' ? `<p class="cart-item-condition"><strong>Condition:</strong> ${item.condition || 'N/A'}</p>` : ''}
                    ${item.source === 'trade-in' ? `<p class="cart-item-listed-by"><strong>Listed by:</strong> ${item.listedBy || 'N/A'}</p>` : ''}
                    <p class="cart-item-price">₹${totalPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" onclick="updateQuantity('${item.id}', -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span>${quantity}</span>
                        <button class="quantity-btn plus" onclick="updateQuantity('${item.id}', 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    cartItemsContainer.innerHTML = itemsHtml;

    // Calculate totals
    const subtotal = cart.reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 0;
        return total + (price * quantity);
    }, 0);
    
    const shipping = subtotal > 0 ? 150 : 0; // ₹150 shipping for non-empty cart
    updateCartTotals(subtotal, shipping);
}

// Update cart totals
function updateCartTotals(subtotal, shipping) {
    const total = subtotal + shipping;
    
    const totalsContainer = document.querySelector('.cart-totals');
    if (totalsContainer) {
        totalsContainer.innerHTML = `
            <div class="total-line">
                <span>Subtotal:</span>
                <span>₹${subtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
            <div class="total-line">
                <span>Shipping:</span>
                <span>₹${shipping.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
            <div class="total-line total">
                <span>Total:</span>
                <span>₹${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
        `;
    }

    // Update checkout button state
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.disabled = subtotal === 0;
    }
}

// Update item quantity
function updateQuantity(productId, change) {
    if (!productId || productId === 'undefined') {
        cleanupCart();
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        const newQuantity = (parseInt(item.quantity) || 0) + change;
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    }
}

// Update cart count
function updateCartCount() {
    // Clean up cart before counting
    cleanupCart();
    
    const totalItems = cart.reduce((sum, item) => {
        return sum + (parseInt(item.quantity) || 0);
    }, 0);
    
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        element.classList.toggle('has-items', totalItems > 0);
    });
}

// Show message
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    // Add show class for animation
    setTimeout(() => messageDiv.classList.add('show'), 10);
    
    // Remove after delay
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', initCart); 