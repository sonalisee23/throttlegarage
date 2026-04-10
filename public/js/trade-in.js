document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tradeInForm');
    const successMsg = document.getElementById('tradeInSuccess');
    const listingsContainer = document.getElementById('tradeInListings');

    // Helper: Get listings from localStorage
    function getListings() {
        return JSON.parse(localStorage.getItem('tradeInListings') || '[]');
    }

    // Helper: Save listings to localStorage
    function saveListings(listings) {
        localStorage.setItem('tradeInListings', JSON.stringify(listings));
    }

    // Helper: Get cart from localStorage
    function getCart() {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    }

    // Helper: Save cart to localStorage
    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Show notification using cart manager's method
    function showNotification(msg) {
        if (window.cartManager && window.cartManager.showNotification) {
            window.cartManager.showNotification(msg);
        } else {
            // Fallback notification
            let n = document.createElement('div');
            n.className = 'notification success';
            n.innerHTML = `<i class="fas fa-check-circle"></i><span>${msg}</span>`;
            document.body.appendChild(n);
            setTimeout(() => { n.classList.add('fade-out'); }, 1800);
            setTimeout(() => { n.remove(); }, 2500);
        }
    }

    // Render listings
    function renderListings() {
        const listings = getListings();
        if (!listings.length) {
            listingsContainer.innerHTML = '<p class="no-listings">No trade-in listings yet. Be the first to submit!</p>';
            return;
        }
        listingsContainer.innerHTML = listings.map((listing, idx) => `
            <div class="trade-in-listing-card">
                <div class="listing-image">
                    ${listing.image ? `<img src="${listing.image}" alt="${listing.partName}">` : '<div class="no-image">No Image</div>'}
                </div>
                <div class="listing-info">
                    <h3>${listing.partName}</h3>
                    <p><strong>Condition:</strong> ${listing.condition}</p>
                    <p><strong>Description:</strong> ${listing.description}</p>
                    <p><strong>Price:</strong> ₹${listing.price ? Number(listing.price).toLocaleString('en-IN') : 'N/A'}</p>
                    <p><strong>Listed by:</strong> ${listing.name}</p>
                    <button class="add-to-cart-btn" data-idx="${idx}">Add to Cart</button>
                </div>
            </div>
        `).join('');

        // Add event listeners for Add to Cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = this.getAttribute('data-idx');
                const listing = getListings()[idx];
                addToCart(listing);
            });
        });
    }

    // Add to cart logic
    function addToCart(listing) {
        try {
            console.log('Adding to cart:', listing);
            
            // Use cart manager if available
            if (window.cartManager) {
                const product = {
                    id: 'tradein-' + (listing.partName + '-' + listing.name + '-' + (listing.price || '0')).replace(/\s+/g, '-').toLowerCase(),
                    name: listing.partName,
                    price: Number(listing.price) || 0,
                    image: '', // No image to avoid large payload
                    description: listing.description || '',
                    source: 'trade-in',
                    condition: listing.condition || '',
                    listedBy: listing.name || ''
                };
                
                window.cartManager.addToCart(product);
                showNotification('Added to cart!');
            } else {
                // Fallback to localStorage
                const cart = getCart();
                const key = 'tradein-' + (listing.partName + '-' + listing.name + '-' + (listing.price || '0')).replace(/\s+/g, '-').toLowerCase();
                const existing = cart.find(item => item.key === key);
                
                if (existing) {
                    existing.quantity += 1;
                    console.log('Updated existing item quantity:', existing);
                } else {
                    const newItem = {
                        key,
                        id: key,
                        name: listing.partName,
                        price: Number(listing.price) || 0,
                        quantity: 1,
                        image: '', // No image to avoid large payload
                        description: listing.description || '',
                        source: 'trade-in',
                        condition: listing.condition || '',
                        listedBy: listing.name || ''
                    };
                    cart.push(newItem);
                    console.log('Added new item to cart:', newItem);
                }
                
                saveCart(cart);
                console.log('Cart saved, total items:', cart.length);
                showNotification('Added to cart!');
                
                // Update cart count manually if cart manager not available
                updateCartCountManually();
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            showNotification('Error adding to cart. Please try again.');
        }
    }

    // Manual cart count update fallback
    function updateCartCountManually() {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        const cartCountElements = document.querySelectorAll('.cart-count');
        
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
            element.classList.toggle('has-items', totalItems > 0);
        });
    }

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const listing = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            partName: formData.get('partName'),
            description: formData.get('description'),
            condition: formData.get('condition'),
            price: formData.get('price'),
            image: ''
        };
        
        const file = formData.get('image');
        if (file && file.size > 0) {
            // Check file size (limit to 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showNotification('Image file is too large. Please use an image smaller than 5MB.');
            return;
            }
            
            // Create a smaller thumbnail instead of full base64
            const reader = new FileReader();
            reader.onload = function(evt) {
                // Create a canvas to resize the image
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    // Set maximum dimensions
                    const maxWidth = 300;
                    const maxHeight = 300;
                    
                    let { width, height } = img;
                    
                    // Calculate new dimensions
                    if (width > height) {
                        if (width > maxWidth) {
                            height = (height * maxWidth) / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = (width * maxHeight) / height;
                            height = maxHeight;
                        }
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    // Draw resized image
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Convert to smaller JPEG format
                    const resizedImage = canvas.toDataURL('image/jpeg', 0.7);
                    listing.image = resizedImage;
                    saveAndRender(listing);
                };
                img.src = evt.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            saveAndRender(listing);
        }
        
        form.reset();
        successMsg.style.display = 'block';
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 4000);
    });

    function saveAndRender(listing) {
        const listings = getListings();
        listings.unshift(listing); // newest first
        saveListings(listings);
        renderListings();
    }

    // Initial render
    renderListings();
}); 