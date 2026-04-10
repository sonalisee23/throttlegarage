// Cart Manager - Syncs with backend
class CartManager {
    constructor() {
        this.cart = [];
        this.isLoggedIn = false;
        this.token = localStorage.getItem('token') || sessionStorage.getItem('token');
        this.init();
    }

    async init() {
        // Check if user is logged in
        this.token = localStorage.getItem('token') || sessionStorage.getItem('token');
        this.isLoggedIn = !!this.token;

        // Always load from localStorage first to preserve any existing cart
        this.loadCartFromLocalStorage();

        if (this.isLoggedIn) {
            // Then sync with server if logged in
            await this.loadCartFromServer();
        }

        this.updateCartCount();
        this.setupEventListeners();
        
        // Listen for page visibility changes to ensure cart persistence
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.loadCartFromLocalStorage();
                this.updateCartCount();
            }
        });
    }

    async loadCartFromServer() {
        try {
            const response = await fetch('http://localhost:5001/api/cart', {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    // Get local products (string IDs) that should be preserved
                    const localProducts = this.cart.filter(item => typeof item.id === 'string');
                    
                    // Convert server cart to local format
                    const serverCart = data.cart.map(item => ({
                        id: item.product_id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        quantity: item.quantity
                    }));
                    
                    // Merge server cart with existing local products, avoiding duplicates
                    const mergedCart = [...serverCart];
                    
                    // Add local products that don't exist in server cart
                    localProducts.forEach(localItem => {
                        const existingItem = mergedCart.find(item => item.id === localItem.id);
                        if (!existingItem) {
                            mergedCart.push(localItem);
                        }
                    });
                    
                    this.cart = mergedCart;
                    this.saveCartToLocalStorage();
                }
            }
        } catch (error) {
            console.error('Error loading cart from server:', error);
            // Fallback to localStorage
            this.loadCartFromLocalStorage();
        }
    }

    loadCartFromLocalStorage() {
        const savedCart = localStorage.getItem('cart');
        this.cart = savedCart ? JSON.parse(savedCart) : [];
    }

    saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    async addToCart(product) {
        // Validate product data
        if (!product || !product.id) {
            console.error('Invalid product data:', product);
            this.showNotification('Error: Invalid product data');
            return;
        }

        if (!product.name || !product.price) {
            console.error('Product missing required fields:', product);
            this.showNotification('Error: Product missing required information');
            return;
        }

        // Add to local cart first for immediate feedback
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image || '',
                quantity: 1
            });
        }

        this.saveCartToLocalStorage();
        this.updateCartCount();

        // If logged in and product has integer ID (database product), sync with server
        if (this.isLoggedIn && typeof product.id === 'number') {
            await this.syncCartToServer();
        } else if (this.isLoggedIn && typeof product.id === 'string') {
            // For string IDs (bike parts, trade-in items), just save to localStorage
            // These are local products not in the database
            // Don't sync trade-in items (with 'tradein-' prefix) as they contain large image data
            if (product.id.startsWith('tradein-')) {
                console.log('Trade-in item added to cart (local only):', product.name);
            } else {
                console.log('Local product added to cart:', product.name);
            }
        }

        this.showNotification(`${product.name} added to cart`);
    }

    async syncCartToServer() {
        try {
            // Filter out local products (string IDs) and trade-in items, only sync database products (integer IDs)
            const databaseProducts = this.cart.filter(item => 
                typeof item.id === 'number' && !item.id.toString().startsWith('tradein-')
            );
            
            const response = await fetch('http://localhost:5001/api/cart/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    localCart: databaseProducts
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    // Get local products (string IDs) and trade-in items that should remain in cart
                    const localProducts = this.cart.filter(item => 
                        typeof item.id === 'string' || item.id.toString().startsWith('tradein-')
                    );
                    
                    // Combine server cart with local products, but preserve existing local items
                    const serverCart = data.cart.map(item => ({
                        id: item.product_id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        quantity: item.quantity
                    }));
                    
                    // Merge server cart with existing local products, avoiding duplicates
                    const mergedCart = [...serverCart];
                    
                    // Add local products that don't exist in server cart
                    localProducts.forEach(localItem => {
                        const existingItem = mergedCart.find(item => item.id === localItem.id);
                        if (!existingItem) {
                            mergedCart.push(localItem);
                        }
                    });
                    
                    this.cart = mergedCart;
                    this.saveCartToLocalStorage();
                }
            }
        } catch (error) {
            console.error('Error syncing cart to server:', error);
        }
    }

    async updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                await this.removeFromCart(productId);
                return;
            }
            
            item.quantity = newQuantity;
            this.saveCartToLocalStorage();
            this.updateCartCount();

            // Only sync with server for database products (integer IDs)
            if (this.isLoggedIn && typeof productId === 'number' && !productId.toString().startsWith('tradein-')) {
                try {
                    const response = await fetch(`http://localhost:5001/api/cart/update/${productId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.token}`
                        },
                        body: JSON.stringify({ quantity: newQuantity })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.success) {
                            // Get local products (string IDs) that should remain in cart
                            const localProducts = this.cart.filter(item => typeof item.id === 'string');
                            
                            // Combine server cart with local products, avoiding duplicates
                            const serverCart = data.cart.map(item => ({
                                id: item.product_id,
                                name: item.name,
                                price: item.price,
                                image: item.image,
                                quantity: item.quantity
                            }));
                            
                            // Merge server cart with existing local products, avoiding duplicates
                            const mergedCart = [...serverCart];
                            
                            // Add local products that don't exist in server cart
                            localProducts.forEach(localItem => {
                                const existingItem = mergedCart.find(item => item.id === localItem.id);
                                if (!existingItem) {
                                    mergedCart.push(localItem);
                                }
                            });
                            
                            this.cart = mergedCart;
                            this.saveCartToLocalStorage();
                        }
                    }
                } catch (error) {
                    console.error('Error updating quantity on server:', error);
                }
            }
        }
    }

    async removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCartToLocalStorage();
        this.updateCartCount();

        // Only sync with server for database products (integer IDs)
        if (this.isLoggedIn && typeof productId === 'number' && !productId.toString().startsWith('tradein-')) {
            try {
                const response = await fetch(`http://localhost:5001/api/cart/remove/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        // Get local products (string IDs) that should remain in cart
                        const localProducts = this.cart.filter(item => typeof item.id === 'string');
                        
                        // Combine server cart with local products, avoiding duplicates
                        const serverCart = data.cart.map(item => ({
                            id: item.product_id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            quantity: item.quantity
                        }));
                        
                        this.cart = [...serverCart, ...localProducts];
                        this.saveCartToLocalStorage();
                    }
                }
            } catch (error) {
                console.error('Error removing item from server cart:', error);
            }
        }
    }

    async clearCart() {
        this.cart = [];
        this.saveCartToLocalStorage();
        this.updateCartCount();

        if (this.isLoggedIn) {
            try {
                const response = await fetch('http://localhost:5001/api/cart/clear', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });
            } catch (error) {
                console.error('Error clearing server cart:', error);
            }
        }
    }

    updateCartCount() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('.cart-count');
        
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
            element.classList.toggle('has-items', totalItems > 0);
        });
    }

    showNotification(message) {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.cart-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    setupEventListeners() {
        // Listen for login/logout events
        window.addEventListener('storage', (e) => {
            if (e.key === 'token' || e.key === null) {
                // Token changed or was removed
                this.token = localStorage.getItem('token') || sessionStorage.getItem('token');
                this.isLoggedIn = !!this.token;
                
                if (this.isLoggedIn) {
                    this.loadCartFromServer();
                } else {
                    this.loadCartFromLocalStorage();
                }
            }
        });

        // Listen for custom login event
        document.addEventListener('userLoggedIn', () => {
            this.token = localStorage.getItem('token') || sessionStorage.getItem('token');
            this.isLoggedIn = !!this.token;
            if (this.isLoggedIn) {
                this.loadCartFromServer();
            }
        });

        // Listen for custom logout event
        document.addEventListener('userLoggedOut', () => {
            this.isLoggedIn = false;
            this.token = null;
            this.loadCartFromLocalStorage();
        });
    }

    getCart() {
        return this.cart;
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}

// Initialize cart manager
const cartManager = new CartManager();

// Export for use in other files
window.cartManager = cartManager;

// Ensure cart manager is available when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (!window.cartManager) {
        window.cartManager = new CartManager();
    }
});

// Ensure cart persistence across page navigation
window.addEventListener('beforeunload', () => {
    if (window.cartManager) {
        window.cartManager.saveCartToLocalStorage();
    }
}); 