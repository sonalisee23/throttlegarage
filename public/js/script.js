// Menu button functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const mainNav = document.querySelector('.main-navigation');

    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', function() {
            menuBtn.classList.toggle('active');
            mainNav.classList.toggle('active');

            // Toggle icon
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuBtn.contains(e.target) && !mainNav.contains(e.target) && mainNav.classList.contains('active')) {
                menuBtn.click();
            }
            document.addEventListener("DOMContentLoaded", function() {
                const menuIcon = document.querySelector(".menu-icon");
                const navMenu = document.getElementById("navMenu");

                if (menuIcon) {
                    menuIcon.addEventListener("click", function() {
                        navMenu.classList.toggle("active");
                    });
                }
            });
        });
    }
});

// Check if we're in a secure context
if (!window.isSecureContext) {
    console.error('Not in a secure context. AR requires HTTPS.');
    showError('AR features require a secure connection (HTTPS). Please access this site using HTTPS.');
}

// Bike data for search
const bikes = [{
        id: 1,
        name: "BMW S1000RR",
        specs: {
            engine: "999cc",
            power: "205 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1635073943225-77faca64a381?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 2,
        name: "Ducati Panigale V4",
        specs: {
            engine: "1103cc",
            power: "214 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 3,
        name: "Kawasaki Ninja ZX-10R",
        specs: {
            engine: "998cc",
            power: "203 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1580310614729-ccd69652491d?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 4,
        name: "Yamaha YZF-R1M",
        specs: {
            engine: "998cc",
            power: "200 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 5,
        name: "Aprilia RSV4 Factory",
        specs: {
            engine: "1099cc",
            power: "217 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 6,
        name: "Honda CBR1000RR-R",
        specs: {
            engine: "1000cc",
            power: "215 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 7,
        name: "Suzuki GSX-R1000R",
        specs: {
            engine: "999.8cc",
            power: "199 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 8,
        name: "MV Agusta F4 RC",
        specs: {
            engine: "998cc",
            power: "212 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 9,
        name: "KTM 1290 Super Duke R",
        specs: {
            engine: "1301cc",
            power: "180 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1597005171707-55f7b5aa2f35?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 10,
        name: "Triumph Speed Triple 1200 RS",
        specs: {
            engine: "1160cc",
            power: "178 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 11,
        name: "Ducati Streetfighter V4",
        specs: {
            engine: "1103cc",
            power: "208 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 12,
        name: "Kawasaki Z H2",
        specs: {
            engine: "998cc",
            power: "200 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 13,
        name: "Ducati Monster SP",
        specs: {
            engine: "937cc",
            power: "111 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 14,
        name: "BMW M 1000 R",
        specs: {
            engine: "999cc",
            power: "205 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1635073943225-77faca64a381?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 15,
        name: "Yamaha MT-10 SP",
        specs: {
            engine: "998cc",
            power: "164 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 16,
        name: "Indian FTR R Carbon",
        specs: {
            engine: "1203cc",
            power: "120 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 17,
        name: "Husqvarna Vitpilen 701",
        specs: {
            engine: "693cc",
            power: "75 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1597005171707-55f7b5aa2f35?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 18,
        name: "Moto Guzzi V100 Mandello",
        specs: {
            engine: "1042cc",
            power: "115 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 19,
        name: "Norton V4SV",
        specs: {
            engine: "1200cc",
            power: "185 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 20,
        name: "Energica Ego",
        specs: {
            engine: "Electric",
            power: "169 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&h=500"
    }
];

// Sample product data
const products = [{
        id: 1,
        name: "Racing Exhaust System",
        price: 89999,
        compatibility: ["1", "2", "14"],
        type: "Exhaust",
        image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["15% Power Increase", "40% Lighter", "Track Legal"]
    },
    {
        id: 2,
        name: "Performance Air Filter",
        price: 4999,
        compatibility: ["1", "2", "3", "4", "5", "6", "7", "8", "14"],
        type: "Air Filter",
        image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["High Flow Design", "Washable", "Lifetime Warranty"]
    },
    {
        id: 3,
        name: "Racing ECU Flash",
        price: 29999,
        compatibility: ["1", "2", "3", "4", "5", "6", "7", "8"],
        type: "ECU",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["Custom Maps", "Launch Control", "Quick Shifter"]
    },
    {
        id: 4,
        name: "Carbon Fiber Fairing Kit",
        price: 149999,
        compatibility: ["1", "2", "3", "4", "5", "6", "7", "8"],
        type: "Bodywork",
        image: "https://images.unsplash.com/photo-1580310614729-ccd69652491d?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["Full Carbon", "Race Fit", "Weight Reduction"]
    },
    {
        id: 5,
        name: "Brembo Racing Brake Kit",
        price: 79999,
        compatibility: ["1", "2", "3", "4", "5", "6", "7", "8", "14"],
        type: "Brakes",
        image: "https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["Monoblock Calipers", "Racing Pads", "Stainless Lines"]
    },
    {
        id: 6,
        name: "Öhlins Racing Suspension",
        price: 199999,
        compatibility: ["1", "2", "3", "4", "5", "6", "7", "8", "14"],
        type: "Suspension",
        image: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["Fully Adjustable", "TTX Technology", "Race Ready"]
    },
    {
        id: 7,
        name: "Quick Shifter Pro",
        price: 24999,
        compatibility: ["1", "2", "3", "4", "5", "6", "7", "8"],
        type: "Electronics",
        image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["Up/Down Shifting", "Adjustable Sensitivity", "Plug & Play"]
    },
    {
        id: 8,
        name: "Racing Chain Kit",
        price: 15999,
        compatibility: ["1", "2", "3", "4", "5", "6", "7", "8", "14"],
        type: "Drivetrain",
        image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["X-Ring Design", "Gold Plated", "Racing Grade"]
    },
    {
        id: 9,
        name: "Racing Footpegs",
        price: 8999,
        compatibility: ["1", "2", "3", "4", "5", "6", "7", "8", "14"],
        type: "Controls",
        image: "https://images.unsplash.com/photo-1597005171707-55f7b5aa2f35?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["Adjustable", "Titanium", "Anti-Slip"]
    },
    {
        id: 10,
        name: "Racing Windscreen",
        price: 4999,
        compatibility: ["1", "2", "3", "4", "5", "6", "7", "8", "14"],
        type: "Bodywork",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["Double Bubble", "Smoked", "Aerodynamic"]
    }
];

// Bike models data
const bikeModels = {
    yamaha: {
        name: 'Yamaha',
        models: {
            'r1': { name: 'R1', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
            'r6': { name: 'R6', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
            'mt-09': { name: 'MT-09', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
            'mt-07': { name: 'MT-07', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] }
        }
    },
    honda: {
        name: 'Honda',
        models: {
            'cbr1000rr': { name: 'CBR1000RR', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
            'cbr600rr': { name: 'CBR600RR', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] }
        }
    },
    kawasaki: {
        name: 'Kawasaki',
        models: {
            'ninja-zx10r': { name: 'Ninja ZX-10R', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
            'ninja-zx6r': { name: 'Ninja ZX-6R', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] }
        }
    }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');

    // Handle search parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    const productId = urlParams.get('productId');

    if (searchTerm && productId) {
        // Highlight and scroll to the searched product
        setTimeout(() => {
            highlightSearchedProduct(searchTerm, productId);
        }, 1000);
    }

    // Initialize bike search if on shop-by-bike page
    if (window.location.pathname.includes('shop-by-bike.html')) {
        initBikeSearch();
    }

    // Initialize helmet search if on helmets page
    if (window.location.pathname.includes('helmets.html')) {
        console.log('Initializing helmet search for helmets page');
        initHelmetSearch();
    }

    // Check for bikeId in URL parameters
    const bikeId = urlParams.get('bikeId');

    if (bikeId) {
        // Handle bike highlight from URL parameters
        setTimeout(() => {
            handleBikeHighlight();
        }, 500);
    }

    // Initialize other features
    initProductGrid();
    initProductHoverEffects();
    initFilters();
    initParallaxEffect();
    initSpeedLines();
    initARDemo();
    initScrollAnimations();
    initChatButton();
    initLoginModal();
    checkLoginStatus();
    updateCartCount();
    loadFeaturedProducts();
    initShopNowButtons();
    initBikeCompatibility();
    initializeFeatures();
    initCompatibility();
    initConfigurator();
    initVirtualGarage();
    initBundleKits();
    initContactForm();
    initGuides();
    initGarage();
});

// Product Grid Functions
function initProductGrid() {
    displayProducts(products);
    initProductHoverEffects();
}

function displayProducts(productsToShow) {
    const partsGrid = document.querySelector('.parts-grid');
    const loadingElement = document.getElementById('loading');

    if (!partsGrid) return;

    // Hide loading element
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }

    if (productsToShow.length === 0) {
        partsGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>No compatible products found for your bike.</p>
                <p>Please try a different selection or contact us for custom parts.</p>
            </div>
        `;
        return;
    }

    const productsHTML = productsToShow.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${product.type}</p>
                <span class="price">₹${formatIndianPrice(product.price)}</span>
                <button class="add-to-cart" data-product-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    partsGrid.innerHTML = productsHTML;

    // Add event listeners for add to cart buttons
    const addToCartButtons = partsGrid.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');

            // Validate product ID
            if (!productId) {
                console.error('Missing product ID in data-product-id attribute');
                showCartNotification('Error: Product ID not found');
                return;
            }

            const parsedId = parseInt(productId);
            if (isNaN(parsedId)) {
                console.error('Invalid product ID:', productId);
                showCartNotification('Error: Invalid product ID');
                return;
            }

            const product = products.find(p => p.id === parsedId);
            if (product) {
                addToCart(product);
                showCartNotification(`${product.name} added to cart`);
            } else {
                console.error('Product not found with ID:', parsedId);
                showCartNotification('Error: Product not found');
            }
        });
    });
}

function initProductHoverEffects() {
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Filter Functions with Animation
function initFilters() {
    const bikeSelect = document.getElementById('bikeModel');
    const partSelect = document.getElementById('partType');

    [bikeSelect, partSelect].forEach(select => {
        select.addEventListener('change', (e) => {
            const grid = document.querySelector('.product-grid');
            grid.style.opacity = '0';
            grid.style.transform = 'scale(0.95)';

            setTimeout(() => {
                filterProducts();
                grid.style.opacity = '1';
                grid.style.transform = 'scale(1)';
            }, 300);
        });
    });
}

function filterProducts() {
    const selectedBike = document.getElementById('bikeModel').value;
    const selectedType = document.getElementById('partType').value;

    let filteredProducts = products;

    if (selectedBike) {
        filteredProducts = filteredProducts.filter(product =>
            product.compatibility.includes(selectedBike)
        );
    }

    if (selectedType) {
        filteredProducts = filteredProducts.filter(product =>
            product.type === selectedType
        );
    }

    displayProducts(filteredProducts);
    initProductHoverEffects();
}

// Parallax Effect
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
}

// Speed Lines Animation
function initSpeedLines() {
    const hero = document.querySelector('.hero');
    const lines = document.createElement('div');
    lines.className = 'speed-lines';

    for (let i = 0; i < 10; i++) {
        const line = document.createElement('div');
        line.className = 'speed-line';
        line.style.left = `${Math.random() * 100}%`;
        line.style.animationDelay = `${Math.random() * 2}s`;
        lines.appendChild(line);
    }

    hero.appendChild(lines);
}

// AR Demo Function with Enhanced Functionality
function initARDemo() {
    const arButton = document.querySelector('.ar-button');
    const arPreview = document.querySelector('.ar-preview');

    if (!arButton || !arPreview) {
        console.error('AR elements not found in the DOM');
        return;
    }

    // Check if the browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        arButton.addEventListener('click', () => {
            showError('Your browser does not support camera access. Please use a modern browser.');
        });
        return;
    }

    let stream = null;

    arButton.addEventListener('click', async() => {
        try {
            // Add loading state
            arButton.disabled = true;
            arButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

            // Request camera access with fallback options
            try {
                // First try to get the environment-facing camera (back camera)
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: { exact: "environment" }
                    }
                });
            } catch (err) {
                console.log('Failed to get environment camera, trying any camera:', err);
                // If that fails, try any available camera
                stream = await navigator.mediaDevices.getUserMedia({
                    video: true
                });
            }

            // Create video element for camera feed
            const video = document.createElement('video');
            video.srcObject = stream;
            video.autoplay = true;
            video.playsInline = true; // Important for iOS

            // Wait for video to be ready
            await new Promise((resolve) => {
                video.onloadedmetadata = () => {
                    resolve();
                };
            });

            // Start playing the video
            await video.play();

            // Create canvas for AR overlay
            const canvas = document.createElement('canvas');
            canvas.className = 'ar-overlay';

            // Clear previous content and add new elements
            arPreview.innerHTML = '';
            arPreview.appendChild(video);
            arPreview.appendChild(canvas);

            // Show the preview with animation
            arPreview.style.display = 'block';
            setTimeout(() => arPreview.classList.add('active'), 100);

            // Add close button
            const closeButton = document.createElement('button');
            closeButton.className = 'ar-close-button';
            closeButton.innerHTML = '<i class="fas fa-times"></i>';
            arPreview.appendChild(closeButton);

            // Handle close
            closeButton.addEventListener('click', () => {
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
                arPreview.classList.remove('active');
                setTimeout(() => {
                    arPreview.style.display = 'none';
                    arPreview.innerHTML = '';
                }, 300);

                // Reset button state
                arButton.disabled = false;
                arButton.innerHTML = '<i class="fas fa-camera"></i> Launch AR Experience';
            });

            // Add orientation change handler
            window.addEventListener('orientationchange', () => {
                // Give time for the orientation change to complete
                setTimeout(() => {
                    if (video.videoWidth > video.videoHeight !== window.matchMedia("(orientation: landscape)").matches) {
                        video.style.transform = "rotate(90deg)";
                    } else {
                        video.style.transform = "none";
                    }
                }, 200);
            });

        } catch (error) {
            console.error('AR Error:', error);

            // Show appropriate error message based on the error
            let errorMessage = 'An error occurred while accessing the camera.';

            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                errorMessage = 'Camera access was denied. Please enable camera permissions and try again.';
            } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
                errorMessage = 'No camera was found on your device.';
            } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
                errorMessage = 'Could not access your camera. It may be in use by another application.';
            } else if (error.name === 'OverconstrainedError') {
                errorMessage = 'Could not find a suitable camera. Please try using a different camera.';
            }

            showError(errorMessage);

            // Reset button state
            arButton.disabled = false;
            arButton.innerHTML = '<i class="fas fa-camera"></i> Launch AR Experience';
        }
    });
}

// Helper function to show error messages
function showError(message) {
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Scroll Animation with Intersection Observer
function initScrollAnimations() {
    const elements = document.querySelectorAll('.product-card, .ar-demo, .selector');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px) scale(0.95)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(element);
    });
}

// Product Details Modal (placeholder)
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`Coming soon: Detailed view for ${product.name}`);
    }
}

// Chat Button Initialization

// Modal functionality
function initLoginModal() {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const profileButtons = document.querySelectorAll('.profile-button');
    const closeButtons = document.querySelectorAll('.close-modal');
    const switchToRegister = document.querySelector('.switch-to-register');
    const switchToLogin = document.querySelector('.switch-to-login');

    // Open login modal when profile button is clicked
    profileButtons.forEach(button => {
        button.addEventListener('click', () => {
            loginModal.classList.add('active');
        });
    });

    // Close modals when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            loginModal.classList.remove('active');
            registerModal.classList.remove('active');
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
        }
    });

    // Switch between login and register modals
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('active');
        registerModal.classList.add('active');
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.classList.remove('active');
        loginModal.classList.add('active');
    });

    // Handle form submissions
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your login logic here
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        console.log('Login attempt:', { email, password });
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your registration logic here
        const formData = {
            fullName: registerForm.querySelector('input[type="text"]').value,
            email: registerForm.querySelector('input[type="email"]').value,
            password: registerForm.querySelectorAll('input[type="password"]')[0].value,
            confirmPassword: registerForm.querySelectorAll('input[type="password"]')[1].value
        };
        console.log('Register attempt:', formData);
    });
}

// Session Management
function checkLoginStatus() {
    return localStorage.getItem('isLoggedIn') === 'true' || sessionStorage.getItem('isLoggedIn') === 'true';
}

function handleProfileClick(event) {
    event.preventDefault();
    if (checkLoginStatus()) {
        // User is logged in, redirect to profile page
        window.location.href = 'profile.html';
    } else {
        // User is not logged in, redirect to login page
        window.location.href = 'login.html'; // Changed from register.html to login.html
    }
}

// Initialize profile link click handler
document.addEventListener('DOMContentLoaded', function() {
    // Make the selector more specific to only target the profile icon
    const profileLink = document.querySelector('.account-link[href="register.html"]');
    if (profileLink) {
        profileLink.addEventListener('click', handleProfileClick);
    }

    // Check if we're on profile page and handle access
    if (window.location.pathname.includes('profile.html')) {
        if (!checkLoginStatus()) {
            window.location.href = 'login.html';
        }
    }
});

// Function to set login status (call this when user successfully logs in)
function setLoggedIn(userData) {
    const storage = document.querySelector('input[type="checkbox"]') ? .checked ? localStorage : sessionStorage;
    storage.setItem('isLoggedIn', 'true');
    storage.setItem('userData', JSON.stringify(userData));

    // Trigger cart sync event
    document.dispatchEvent(new CustomEvent('userLoggedIn', { detail: userData }));
}

// Function to handle logout
function logout() {
    // Clear both localStorage and sessionStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('authToken');

    // Trigger cart logout event
    document.dispatchEvent(new CustomEvent('userLoggedOut'));

    // Redirect to home page
    window.location.href = 'index.html';
}

// Initialize search functionality
function initSearch() {
    console.log('Page loaded, initializing search...');
    const searchInput = document.getElementById('searchInput');
    const searchForm = document.getElementById('searchForm');
    const searchResults = document.getElementById('searchResults');

    if (searchInput && searchForm && searchResults) {
        console.log('Search elements found');

        // Handle input changes
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            console.log('Searching for:', searchTerm);

            if (searchTerm.length < 2) {
                searchResults.style.display = 'none';
                return;
            }

            const matches = bikes.filter(bike =>
                bike.name.toLowerCase().includes(searchTerm) ||
                bike.specs.engine.toLowerCase().includes(searchTerm) ||
                bike.specs.power.toLowerCase().includes(searchTerm)
            );

            console.log('Found matches:', matches);

            if (matches.length > 0) {
                displaySearchResults(matches);
            } else {
                searchResults.innerHTML = '<div class="search-result-item"><p>No matches found</p></div>';
                searchResults.style.display = 'block';
            }
        });

        // Handle form submission
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            return false;
        });

        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchResults.contains(e.target) && !searchInput.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    } else {
        console.log('Search elements not found');
    }
}

function scrollToBike(bikeId) {
    console.log('Scrolling to bike:', bikeId);

    // Check if we're on the shop-by-bike page
    if (!window.location.pathname.includes('shop-by-bike.html')) {
        // If not, redirect to shop-by-bike page with the bike ID
        window.location.href = `shop-by-bike.html?bikeId=${bikeId}`;
        return;
    }

    const bikeCard = document.querySelector(`[data-bike-id="${bikeId}"]`);

    if (bikeCard) {
        console.log('Found bike card');

        // First remove any existing highlights
        document.querySelectorAll('.bike-card').forEach(card => {
            card.classList.remove('highlight-bike');
        });

        // Add highlight to target bike
        bikeCard.classList.add('highlight-bike');

        // Calculate position with header offset
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const elementPosition = bikeCard.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - 20; // 20px extra padding

        // Scroll to the bike
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Hide search results
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.style.display = 'none';
        }

        // Remove highlight after animation
        setTimeout(() => {
            bikeCard.classList.remove('highlight-bike');
        }, 2000);
    } else {
        console.log('Bike card not found');
    }
}

// Update the search results click handler
function displaySearchResults(matches) {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.innerHTML = matches.map(item => {
            if (!item || !item.name) return ''; // Skip undefined items

            let displayInfo = '';
            let clickAction = '';

            if (item.type === 'bike' && item.specs) {
                displayInfo = `${item.specs.engine || 'N/A'} | ${item.specs.power || 'N/A'}`;
                clickAction = `onclick="navigateToBike(${item.id}, '${item.name}'); return false;"`;
            } else if (item.type === 'part' && item.price) {
                displayInfo = `${item.type || 'Part'} | ₹${item.price.toLocaleString('en-IN')}`;
                clickAction = `onclick="window.location.href='/bike-parts.html?search=${encodeURIComponent(item.name)}&productId=${item.id}'; return false;"`;
            } else {
                // Fallback for items without price or specs
                displayInfo = item.category || 'Product';
                clickAction = `onclick="return false;"`;
            }

            return `
                <div class="search-result-item" ${clickAction}>
                    <div class="search-result-info">
                        <h3>${item.name}</h3>
                        <p><span class="category-badge">${item.category || 'Product'}</span> ${displayInfo}</p>
                    </div>
                </div>
            `;
        }).filter(html => html !== '').join(''); // Filter out empty strings

        searchResults.style.display = 'block';
    }
}

// Add this function to handle URL parameters when page loads
function handleBikeHighlight() {
    const urlParams = new URLSearchParams(window.location.search);
    const bikeId = urlParams.get('bikeId');

    if (bikeId) {
        setTimeout(() => {
            const bikeElement = document.querySelector(`[data-bike-id="${bikeId}"]`);
            if (bikeElement) {
                // First remove any existing highlights
                document.querySelectorAll('.bike-card').forEach(card => {
                    card.classList.remove('highlight-bike');
                });

                // Add highlight to the target bike
                bikeElement.classList.add('highlight-bike');

                // Scroll to the bike with offset for header
                const headerOffset = 100;
                const elementPosition = bikeElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Remove highlight after animation
                setTimeout(() => {
                    bikeElement.classList.remove('highlight-bike');
                }, 2000);
            }
        }, 500); // Small delay to ensure page is loaded
    }
}

// Add click event listener to close search results when clicking outside
document.addEventListener('click', (event) => {
    const searchResults = document.getElementById('searchResults');
    const searchContainer = document.querySelector('.search-container');

    if (!searchContainer.contains(event.target)) {
        searchResults.classList.remove('active');
    }
});

// Add input event listener for real-time search
document.getElementById('searchInput').addEventListener('input', (event) => {
    handleSearch(event);
});

// Bike search functionality
function initBikeSearch() {
    const searchInput = document.getElementById('bikeSearchInput');
    const bikeCards = document.querySelectorAll('.bike-card');

    if (searchInput && bikeCards.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();

            bikeCards.forEach(card => {
                const bikeName = card.querySelector('.bike-name').textContent.toLowerCase();
                const bikeSpecs = card.querySelector('.bike-specs').textContent.toLowerCase();

                if (searchTerm === '' ||
                    bikeName.includes(searchTerm) ||
                    bikeSpecs.includes(searchTerm)) {
                    // Show card with fade in
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    // Hide card with fade out
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        if (card.style.opacity === '0') { // Check if still hidden
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });

            // Check if no results
            const visibleCards = document.querySelectorAll('.bike-card[style*="display: flex"]');
            const noResultsMsg = document.querySelector('.no-results-message');

            if (visibleCards.length === 0 && searchTerm !== '') {
                if (!noResultsMsg) {
                    const message = document.createElement('div');
                    message.className = 'no-results-message';
                    message.textContent = 'No bikes found matching your search';
                    document.querySelector('.bikes-grid').appendChild(message);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
        });
    }
}

// Helmet search functionality
function initHelmetSearch() {
    console.log('=== HELMET SEARCH INITIALIZATION ===');
    const searchInput = document.getElementById('helmetSearchInput');
    const helmetCards = document.querySelectorAll('.part-card');

    console.log('Search input found:', searchInput ? 'YES' : 'NO');
    console.log('Helmet cards found:', helmetCards.length);

    if (searchInput && helmetCards.length > 0) {
        console.log('Setting up helmet search event listener');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            console.log('Search term:', searchTerm);

            let visibleCount = 0;
            helmetCards.forEach((card, index) => {
                const helmetName = card.querySelector('.part-name').textContent.toLowerCase();
                const helmetDescription = card.querySelector('.part-description').textContent.toLowerCase();

                console.log(`Card ${index}: "${helmetName}" - matches: ${helmetName.includes(searchTerm) || helmetDescription.includes(searchTerm)}`);

                if (searchTerm === '' ||
                    helmetName.includes(searchTerm) ||
                    helmetDescription.includes(searchTerm)) {
                    // Show card with fade in
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    visibleCount++;
                } else {
                    // Hide card with fade out
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        if (card.style.opacity === '0') { // Check if still hidden
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });

            console.log('Visible cards:', visibleCount);

            // Check if no results
            const visibleCards = document.querySelectorAll('.part-card[style*="display: flex"]');
            const noResultsMsg = document.querySelector('.no-helmets-found');

            if (visibleCards.length === 0 && searchTerm !== '') {
                if (!noResultsMsg) {
                    const message = document.createElement('div');
                    message.className = 'no-helmets-found';
                    message.textContent = 'No helmets found matching your search';
                    document.querySelector('.bikes-grid').appendChild(message);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
        });

        console.log('Helmet search event listener added successfully');
    } else {
        console.error('Failed to initialize helmet search:', {
            searchInput: !!searchInput,
            helmetCards: helmetCards.length
        });
    }
}

// Add styles for transitions
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .bike-card {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .no-results-message {
            text-align: center;
            padding: 40px;
            width: 100%;
            color: rgba(255, 255, 255, 0.7);
            font-style: italic;
        }
        .category-badge {
            background: var(--primary-red);
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 500;
            margin-right: 8px;
        }
        .search-result-item {
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        .search-result-item:hover {
            background-color: rgba(227, 30, 36, 0.1);
        }
        .searched-product-highlight {
            animation: searchedProductPulse 2s ease-in-out;
            border: 2px solid var(--primary-red) !important;
            box-shadow: 0 0 20px rgba(227, 30, 36, 0.3) !important;
        }
        @keyframes searchedProductPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});

// Welcome Popup functionality
function showWelcomePopup() {
    // Force show popup regardless of localStorage
    // Create popup elements
    const popup = document.createElement('div');
    popup.className = 'welcome-popup';

    const popupContent = document.createElement('div');
    popupContent.className = 'welcome-popup-content';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'welcome-popup-close';
    closeBtn.innerHTML = '&times;';

    const heading = document.createElement('h2');
    heading.textContent = 'Welcome to 𝖳𝗁𝗋𝗈𝗍𝗍𝗅𝖾𝖦𝖺𝗋𝖺𝗀𝖾!';

    const message = document.createElement('p');
    message.textContent = 'Find the best parts and accessories for your superbike. Enjoy safe riding with our government-approved products!';

    const exploreBtn = document.createElement('button');
    exploreBtn.className = 'welcome-popup-button';
    exploreBtn.textContent = 'Explore Store';

    // Assemble popup
    popupContent.appendChild(closeBtn);
    popupContent.appendChild(heading);
    popupContent.appendChild(message);
    popupContent.appendChild(exploreBtn);
    popup.appendChild(popupContent);

    // Add to document
    document.body.appendChild(popup);

    // Show popup with animation
    setTimeout(() => {
        popup.classList.add('show');
    }, 500);

    // Handle close button click
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.remove();
        }, 300);
        localStorage.setItem('welcomePopupShown', 'true');
    });

    // Handle explore button click
    exploreBtn.addEventListener('click', () => {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.remove();
        }, 300);
        localStorage.setItem('welcomePopupShown', 'true');
    });
}

// Add CSS for the welcome popup
function addWelcomePopupStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .welcome-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
        }
        .welcome-popup.show {
            opacity: 1;
            visibility: visible;
        }
        .welcome-popup-content {
            background-color: #fff;
            padding: 30px;
            border-radius: 5px;
            max-width: 500px;
            text-align: center;
            position: relative;
            transform: scale(0.8);
            transition: transform 0.3s;
        }
        .welcome-popup.show .welcome-popup-content {
            transform: scale(1);
        }
        .welcome-popup-close {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: #333;
        }
        .welcome-popup h2 {
            color: #e74c3c;
            margin-top: 0;
        }
        .welcome-popup-button {
            background-color: #e74c3c;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 20px;
            transition: background-color 0.3s;
        }
        .welcome-popup-button:hover {
            background-color: #c0392b;
        }
    `;
    document.head.appendChild(style);
}

// Load cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add welcome popup styles
    addWelcomePopupStyles();

    // Only show welcome popup on the index page (homepage)
    if (window.location.pathname === '/index.html' || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        showWelcomePopup();
    }

    // Update cart count
    updateCartCount();

    // Initialize search if search form exists
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }

    // Initialize bike search if on the shop by bike page
    if (document.querySelector('.bike-search-section')) {
        initBikeSearch();
    }

    // Initialize helmet search if on the helmets page
    if (document.getElementById('helmetSearchInput')) {
        initHelmetSearch();
    }

    // Initialize featured products if on homepage
    if (document.getElementById('featuredProducts')) {
        loadFeaturedProducts();
    }
});

// Update cart count from local storage
function updateCartCount() {
    if (window.cartManager) {
        window.cartManager.updateCartCount();
    } else {
        // Fallback to old method
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
            element.classList.toggle('has-items', totalItems > 0);
        });
    }
}

// Format number to Indian currency format
function formatIndianPrice(number) {
    const roundedNum = Math.round(number);
    const str = roundedNum.toString();
    let lastThree = str.substring(str.length - 3);
    const otherNumbers = str.substring(0, str.length - 3);
    if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
    }
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
}

// Load featured products on homepage
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;

    // Sample featured product data with prices in USD converted to INR (1 USD = 83 INR)
    const featuredProducts = [{
            id: 1,
            name: 'AGV Pista GP RR',
            category: 'Helmets',
            price: 25000,
            image: 'https://www.twowheel.co.uk/images/detailed/130/agv-pista-gp-rr-performance-carbon-red-race-helmet-3.png'
        },
        {
            id: 2,
            name: 'Shoei X-14',
            category: 'Helmets',
            price: 15000,
            image: 'https://www.revzilla.com/product_images/0224/4057/shoei_x14_laverty_tc4.jpg'
        },
        {
            id: 3,
            name: 'Arai Corsair-X',
            category: 'Helmets',
            price: 12000,
            image: 'https://www.asphaltandrubber.com/wp-content/gallery/arai-corsair-x-helmet-review/Arai-Corsair-X-helmet-review-26.jpg'
        },
        {
            id: 4,
            name: 'Bell Race Star Flex DLX',
            category: 'Helmets',
            price: 16000,
            image: 'https://www.bellhelmets.com/on/demandware.static/-/Sites-bell-master-catalog/default/dw790e0a9b/images/large/bell-race-star-dlx-flex-carbon-street-full-face-motorcycle-helmet-labyrinth-gloss-white-black-right.jpg'
        },
        {
            id: 5,
            name: 'HJC RPHA 11 Pro',
            category: 'Helmets',
            price: 14000,
            image: 'https://th.bing.com/th/id/OIP.HZLE-2WSqXs_OM1iLAfr2QHaHa?rs=1&pid=ImgDetMain'
        },
        {
            id: 6,
            name: 'Akrapovic Exhaust System',
            category: 'Bike Parts',
            price: 129999,
            image: 'https://th.bing.com/th/id/OIP.uSVSHVa__4QOPSGQPZiUkAHaFF?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3'
        },
        {
            id: 7,
            name: 'Brembo Brake Kit',
            category: 'Bike Parts',
            price: 89999,
            image: 'https://www.motomillion.com/cdn/shop/products/Brembo_208973767_Racing_SuperSport_Rotor_Left_Right_Rotors_Set_BMW_S1000RR_K67_2019_2020_grande.jpg?v=1574714461'
        },
        {
            id: 8,
            name: 'Öhlins Racing Suspension',
            category: 'Bike Parts',
            price: 199999,
            image: 'https://th.bing.com/th/id/OIP.81zJ5cAeVPoCidiV2okTYQHaHa?w=1024&h=1024&rs=1&pid=ImgDetMain'
        }
    ];

    // Create container for scroll buttons
    const container = document.createElement('div');
    container.className = 'products-container';

    // Add scroll buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'scroll-btn prev';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'scroll-btn next';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';

    // Generate HTML for featured products
    const productsHTML = featuredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-price">₹${formatIndianPrice(product.price)}</p>
                <button class="add-to-cart-btn" data-product-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    // Create products grid
    const productsGrid = document.createElement('div');
    productsGrid.className = 'products-grid';
    productsGrid.innerHTML = productsHTML;

    // Append elements
    container.appendChild(prevBtn);
    container.appendChild(productsGrid);
    container.appendChild(nextBtn);
    featuredContainer.appendChild(container);

    // Add scroll functionality
    const scrollAmount = 400; // Scroll by 400px

    prevBtn.addEventListener('click', () => {
        productsGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        productsGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Add event listeners for add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));

            // Validate product ID
            if (!productId) {
                console.error('Missing product ID in data-product-id attribute');
                showCartNotification('Error: Product ID not found');
                return;
            }

            const parsedId = parseInt(productId);
            if (isNaN(parsedId)) {
                console.error('Invalid product ID:', productId);
                showCartNotification('Error: Invalid product ID');
                return;
            }

            const product = featuredProducts.find(p => p.id === parsedId);
            if (product) {
                addToCart(product);
                showCartNotification(`${product.name} added to cart`);
            } else {
                console.error('Product not found with ID:', parsedId);
                showCartNotification('Error: Product not found');
            }
        });
    });
}

// Add item to cart
function addToCart(product) {
    // Validate product data
    if (!product || !product.id) {
        console.error('Invalid product data:', product);
        showCartNotification('Error: Invalid product data');
        return;
    }

    if (!product.name || !product.price) {
        console.error('Product missing required fields:', product);
        showCartNotification('Error: Product missing required information');
        return;
    }

    if (window.cartManager) {
        window.cartManager.addToCart(product);
    } else {
        // Fallback to old method if cart manager is not available
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image || '',
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showCartNotification(`${product.name} added to cart`);
    }
}

// Show notification when item is added to cart
function showCartNotification(message) {
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
        setTimeout(() => notification.remove(), 3000);
    }, 3000);
}

// Handle search form submission
function handleSearch(event) {
    if (event) {
        event.preventDefault();
    }

    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput ? .value ? .toLowerCase().trim();
    const searchResults = document.getElementById('searchResults');

    if (!searchTerm || searchTerm.length < 2) {
        if (searchResults) {
            searchResults.style.display = 'none';
        }
        return;
    }

    // Search through bikes
    const bikeMatches = bikes.filter(bike =>
        bike.name.toLowerCase().includes(searchTerm) ||
        bike.specs.engine.toLowerCase().includes(searchTerm) ||
        bike.specs.power.toLowerCase().includes(searchTerm)
    );

    // Search through bike parts
    const partMatches = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.type.toLowerCase().includes(searchTerm) ||
        (product.specs && product.specs.some(spec => spec.toLowerCase().includes(searchTerm)))
    );

    // Combine all matches with proper error handling
    const allMatches = [
        ...bikeMatches.map(bike => ({...bike, category: 'Bike', type: 'bike' })),
        ...partMatches.map(part => ({...part, category: 'Bike Part', type: 'part' }))
    ].filter(item => item && item.name); // Filter out any undefined items

    // Display results
    if (searchResults) {
        if (allMatches.length > 0) {
            displaySearchResults(allMatches);
        } else {
            searchResults.innerHTML = '<div class="search-result-item"><p>No matches found</p></div>';
            searchResults.style.display = 'block';
        }
    }
}

// Add this new function to handle Shop Now buttons
function initShopNowButtons() {
    const shopNowButtons = document.querySelectorAll('.shop-now-btn');

    shopNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Get the bike ID from the parent card
            const bikeCard = this.closest('.bike-card');
            const bikeId = bikeCard.getAttribute('data-bike-id');
            const bikeName = bikeCard.querySelector('.bike-name').textContent;

            // Check if we are on shop-by-bike.html
            if (window.location.pathname.includes('shop-by-bike.html')) {
                // Filter products for this bike
                const compatibleProducts = products.filter(product =>
                    product.compatibility && product.compatibility.includes(bikeId)
                );

                console.log(`Found ${compatibleProducts.length} compatible products for bike ID ${bikeId}`);

                // Clear any previous product displays
                const existingBikeProducts = document.querySelector('.bike-products');
                if (existingBikeProducts) {
                    existingBikeProducts.remove();
                }

                // Create a container for the products
                const productsSection = document.createElement('div');
                productsSection.className = 'bike-products';
                productsSection.innerHTML = `
                    <div class="section-title">
                        <h2>Compatible Products for ${bikeName}</h2>
                    </div>
                    <div class="products-grid" id="compatibleProducts"></div>
                `;

                // Insert after the bikes grid
                const bikesGrid = document.querySelector('.bikes-grid');
                bikesGrid.after(productsSection);

                // Populate products
                const productsGrid = document.getElementById('compatibleProducts');

                if (compatibleProducts.length > 0) {
                    const productsHTML = compatibleProducts.map(product => `
                        <div class="product-card">
                            <div class="product-image">
                                <img src="${product.image}" alt="${product.name}">
                            </div>
                            <div class="product-info">
                                <h3>${product.name}</h3>
                                <p class="product-category">${product.type}</p>
                                <p class="product-price">$${product.price.toFixed(2)}</p>
                                <button class="add-to-cart-btn" data-product-id="${product.id}">
                                    <i class="fas fa-shopping-cart"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    `).join('');

                    productsGrid.innerHTML = productsHTML;

                    // Scroll to the products section
                    productsSection.scrollIntoView({ behavior: 'smooth' });

                    // Add event listeners for add to cart buttons
                    const addToCartButtons = productsSection.querySelectorAll('.add-to-cart-btn');
                    addToCartButtons.forEach(button => {
                        button.addEventListener('click', function() {
                            const productId = parseInt(this.getAttribute('data-product-id'));
                            const product = products.find(p => p.id === productId);

                            if (product) {
                                addToCart(product);
                                showCartNotification(`${product.name} added to cart`);
                            }
                        });
                    });
                } else {
                    productsGrid.innerHTML = `
                        <div class="no-products">
                            <p>No compatible products found for this bike. Please check back later or contact us for custom parts.</p>
                        </div>
                    `;
                }
            }
        });
    });
}

// Initialize bike compatibility checker
function initBikeCompatibility() {
    const bikeMakeSelect = document.getElementById('bikeMake');
    const bikeModelSelect = document.getElementById('bikeModel');
    const compatibilityForm = document.getElementById('compatibilityForm');

    if (bikeMakeSelect && bikeModelSelect) {
        // Update models when make is selected
        bikeMakeSelect.addEventListener('change', function() {
            const selectedMake = this.value;
            bikeModelSelect.innerHTML = '<option value="">Select Model</option>';

            if (selectedMake && bikeModels[selectedMake]) {
                bikeModels[selectedMake].models.forEach((model, key) => {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = model.name;
                    bikeModelSelect.appendChild(option);
                });
            }
        });

        // Handle form submission
        compatibilityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const year = document.getElementById('bikeYear').value;
            const make = bikeMakeSelect.value;
            const model = bikeModelSelect.value;

            if (year && make && model) {
                // Redirect to the filtered products page
                window.location.href = `/bike-parts.html?year=${year}&make=${make}&model=${model}`;
            }
        });
    }
}

// Menu and Feature Panel Functionality
document.addEventListener('DOMContentLoaded', function() {
            const menuBtn = document.getElementById('menuBtn');
            const mainNav = document.querySelector('.main-nav');
            let isMenuOpen = false;
            let activePanel = null;

            // Create the features menu HTML
            const featuresMenuHTML = `
        <div class="features-menu">
            <div class="features-header">
                <h3><i class="fas fa-tools"></i> Tools & Features</h3>
                <button class="close-features">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="features-list">
                <button class="feature-btn" data-feature="compatibility" id="openCompatibilityChecker">
                    <i class="fas fa-motorcycle"></i>
                    <span>
                        <strong>Bike-Specific Compatibility Checker</strong>
                        <small>Find parts for your bike</small>
                    </span>
                    <i class="fas fa-chevron-right"></i>
                </button>
                <button class="feature-btn" data-feature="virtual-garage" id="openVirtualGarage">
                    <i class="fas fa-warehouse"></i>
                    <span>
                        <strong>Virtual Garage</strong>
                        <small>Manage your bikes and maintenance</small>
                    </span>
                    <i class="fas fa-chevron-right"></i>
                </button>
                <button class="feature-btn" data-feature="bundle-kits" id="openBundleKits">
                    <i class="fas fa-box"></i>
                    <span>
                        <strong>Bundle Kits</strong>
                        <small>Pre-packaged upgrade kits with discounts</small>
                    </span>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    `;

            // Create the compatibility checker HTML
            const compatibilityHTML = `
        <div class="compatibility-checker panel">
            <div class="panel-header">
                <button class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h3><i class="fas fa-motorcycle"></i> Find Compatible Parts</h3>
                <button class="close-panel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="compatibilityForm">
                <select id="bikeMake" required>
                    <option value="">Select Make</option>
                    ${Object.entries(bikeModels).map(([key, make]) => 
                        `<option value="${key}">${make.name}</option>`
                    ).join('')}
                </select>
                <select id="bikeModel" required disabled>
                    <option value="">Select Model</option>
                </select>
                <select id="bikeYear" required disabled>
                    <option value="">Select Year</option>
                </select>
                <button type="submit" class="check-btn">
                    <i class="fas fa-search"></i> Find Parts
                </button>
            </form>
        </div>
    `;

    // Create the virtual garage HTML
    const virtualGarageHTML = `
        <div class="virtual-garage panel">
            <div class="panel-header">
                <button class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h3><i class="fas fa-warehouse"></i> Virtual Garage</h3>
                <button class="close-panel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="panel-content">
                <div class="garage-actions">
                    <button id="addBikeBtn" class="primary-button">
                        <i class="fas fa-plus"></i> Add New Bike
                    </button>
                </div>
                <div id="garageList" class="garage-list">
                    <!-- Bikes will be dynamically added here -->
                    <div class="empty-garage">
                        <i class="fas fa-motorcycle"></i>
                        <p>Your garage is empty</p>
                        <small>Add your first bike to get started</small>
                    </div>
                </div>
                <div id="addBikeForm" class="add-bike-form" style="display: none;">
                    <h4>Add New Bike</h4>
                    <form id="newBikeForm">
                        <div class="form-group">
                            <label for="bikeMake">Make</label>
                            <select id="bikeMake" required>
                                <option value="">Select Make</option>
                                <option value="honda">Honda</option>
                                <option value="yamaha">Yamaha</option>
                                <option value="kawasaki">Kawasaki</option>
                                <option value="suzuki">Suzuki</option>
                                <option value="bmw">BMW</option>
                                <option value="ducati">Ducati</option>
                                <option value="ktm">KTM</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="bikeModel">Model</label>
                            <input type="text" id="bikeModel" required placeholder="e.g., CBR 1000RR">
                        </div>
                        <div class="form-group">
                            <label for="bikeYear">Year</label>
                            <input type="number" id="bikeYear" required min="1900" max="2024" placeholder="e.g., 2023">
                        </div>
                        <div class="form-group">
                            <label for="bikeOdometer">Odometer (km)</label>
                            <input type="number" id="bikeOdometer" required min="0" placeholder="Current mileage">
                        </div>
                        <div class="form-group">
                            <label for="bikeNotes">Notes</label>
                            <textarea id="bikeNotes" placeholder="Add any notes about your bike"></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="cancel-btn" id="cancelAddBike">Cancel</button>
                            <button type="submit" class="primary-button">Add Bike</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Create the bundle kits HTML
    const bundleKitsHTML = `
        <div class="bundle-kits panel">
            <div class="panel-header">
                <button class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h3><i class="fas fa-box"></i> Bundle Kits</h3>
                <button class="close-panel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="panel-content">
                <div class="bundle-categories">
                    <button class="category-btn active" data-category="all">All Bundles</button>
                    <button class="category-btn" data-category="track">Track Day</button>
                    <button class="category-btn" data-category="touring">Touring</button>
                    <button class="category-btn" data-category="performance">Performance</button>
                </div>
                <div class="bundles-grid">
                    <!-- Track Day Bundles -->
                    <div class="bundle-card" data-category="track">
                        <div class="bundle-image">
                            <img src="https://placehold.co/400x300/2a2a2a/fff?text=Track+Day+Kit" alt="Track Day Essential Kit">
                            <span class="discount-badge">-15%</span>
                        </div>
                        <div class="bundle-info">
                            <h4>Track Day Essential Kit</h4>
                            <p>Complete package for track enthusiasts</p>
                            <ul class="bundle-items">
                                <li><i class="fas fa-check"></i> Öhlins TTX GP Shock</li>
                                <li><i class="fas fa-check"></i> Brembo M4.32 Calipers</li>
                                <li><i class="fas fa-check"></i> Pirelli Diablo Supercorsa</li>
                                <li><i class="fas fa-check"></i> Racing Air Filter</li>
                            </ul>
                            <div class="bundle-price">
                                <span class="original-price">₹149,999</span>
                                <span class="final-price">₹127,499</span>
                            </div>
                            <button class="add-bundle-btn" data-bundle-id="track-day-essential" data-bundle-name="Track Day Essential Kit" data-bundle-price="127499">
                                <i class="fas fa-cart-plus"></i>
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    <!-- Touring Bundles -->
                    <div class="bundle-card" data-category="touring">
                        <div class="bundle-image">
                            <img src="https://placehold.co/400x300/2a2a2a/fff?text=Touring+Pack" alt="Touring Comfort Pack">
                            <span class="discount-badge">-20%</span>
                        </div>
                        <div class="bundle-info">
                            <h4>Long Distance Touring Pack</h4>
                            <p>Ultimate comfort for long rides</p>
                            <ul class="bundle-items">
                                <li><i class="fas fa-check"></i> Touring Windscreen</li>
                                <li><i class="fas fa-check"></i> Comfort Seat</li>
                                <li><i class="fas fa-check"></i> Soft Panniers Set</li>
                                <li><i class="fas fa-check"></i> Tank Bag</li>
                            </ul>
                            <div class="bundle-price">
                                <span class="original-price">₹89,999</span>
                                <span class="final-price">₹71,999</span>
                            </div>
                            <button class="add-bundle-btn" data-bundle-id="touring-comfort" data-bundle-name="Long Distance Touring Pack" data-bundle-price="71999">
                                <i class="fas fa-cart-plus"></i>
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    <!-- Performance Bundles -->
                    <div class="bundle-card" data-category="performance">
                        <div class="bundle-image">
                            <img src="https://placehold.co/400x300/2a2a2a/fff?text=Performance+Kit" alt="Performance Pack">
                            <span class="discount-badge">-25%</span>
                        </div>
                        <div class="bundle-info">
                            <h4>Performance Upgrade Kit</h4>
                            <p>Maximize your bike's potential</p>
                            <ul class="bundle-items">
                                <li><i class="fas fa-check"></i> Akrapovič Full System</li>
                                <li><i class="fas fa-check"></i> Power Commander V</li>
                                <li><i class="fas fa-check"></i> K&N Air Filter</li>
                                <li><i class="fas fa-check"></i> Quick Shifter</li>
                            </ul>
                            <div class="bundle-price">
                                <span class="original-price">₹129,999</span>
                                <span class="final-price">₹97,499</span>
                            </div>
                            <button class="add-bundle-btn" data-bundle-id="performance-upgrade" data-bundle-name="Performance Upgrade Kit" data-bundle-price="97499">
                                <i class="fas fa-cart-plus"></i>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Create menu content
    const menuContent = document.createElement('div');
    menuContent.className = 'menu-content';
    menuContent.innerHTML = featuresMenuHTML;

    // Create panels container
    const panelsContainer = document.createElement('div');
    panelsContainer.className = 'panels-container';
    document.body.appendChild(panelsContainer);

    // Add menu toggle functionality
    if (menuBtn) {
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                menuBtn.innerHTML = '<i class="fas fa-times"></i>';
                document.body.appendChild(menuContent);
                menuContent.style.transform = 'translateX(0)';
            } else {
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                menuContent.style.transform = 'translateX(-100%)';
                setTimeout(() => {
                    if (menuContent.parentNode === document.body) {
                        document.body.removeChild(menuContent);
                    }
                }, 300);
            }
        });

        // Handle feature buttons
        document.addEventListener('click', function(e) {
            // Close menu when clicking outside
            if (!menuContent.contains(e.target) && !menuBtn.contains(e.target) && isMenuOpen) {
                menuBtn.click();
            }

            // Feature button clicks
            if (e.target.closest('.feature-btn')) {
                const feature = e.target.closest('.feature-btn').dataset.feature;
                if (feature === 'compatibility') {
                    // Open compatibility checker panel
                    const existingPanel = panelsContainer.querySelector('.panel');
                    if (existingPanel) existingPanel.remove();
                    panelsContainer.insertAdjacentHTML('beforeend', compatibilityHTML);
                    setTimeout(() => {
                        const panel = panelsContainer.querySelector('.compatibility-checker.panel');
                        if (panel) panel.classList.add('active');
                    }, 10);
                    // Panel close logic
                    const closeBtn = panelsContainer.querySelector('.compatibility-checker .close-panel');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', function() {
                            const panel = panelsContainer.querySelector('.compatibility-checker.panel');
                            if (panel) {
                                panel.classList.remove('active');
                                setTimeout(() => panel.remove(), 300);
                            }
                        });
                    }
                    // Form logic
                    const bikeMake = panelsContainer.querySelector('#bikeMake');
                    const bikeModel = panelsContainer.querySelector('#bikeModel');
                    const bikeYear = panelsContainer.querySelector('#bikeYear');
                    const compatibilityForm = panelsContainer.querySelector('#compatibilityForm');
                    // Populate models and years
                    bikeMake.addEventListener('change', function() {
                        const makeKey = this.value;
                        bikeModel.innerHTML = '<option value="">Select Model</option>';
                        bikeYear.innerHTML = '<option value="">Select Year</option>';
                        bikeModel.disabled = true;
                        bikeYear.disabled = true;
                        if (makeKey && bikeModels[makeKey]) {
                            bikeModel.disabled = false;
                            Object.entries(bikeModels[makeKey].models).forEach(([modelKey, modelObj]) => {
                                const option = document.createElement('option');
                                option.value = modelKey;
                                option.textContent = modelObj.name;
                                bikeModel.appendChild(option);
                            });
                        }
                    });
                    bikeModel.addEventListener('change', function() {
                        const makeKey = bikeMake.value;
                        const modelKey = this.value;
                        bikeYear.innerHTML = '<option value="">Select Year</option>';
                        bikeYear.disabled = true;
                        if (makeKey && modelKey && bikeModels[makeKey] && bikeModels[makeKey].models[modelKey]) {
                            bikeYear.disabled = false;
                            bikeModels[makeKey].models[modelKey].years.forEach(year => {
                                const option = document.createElement('option');
                                option.value = year;
                                option.textContent = year;
                                bikeYear.appendChild(option);
                            });
                        }
                    });
                    compatibilityForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        const makeKey = bikeMake.value;
                        const modelKey = bikeModel.value;
                        const year = bikeYear.value;
                        if (!makeKey || !modelKey || !year) return;
                        // Find compatible products
                        const selectedModel = bikeModels[makeKey].models[modelKey].name;
                        const compatible = products.filter(product => product.compatibility && product.compatibility.includes(modelKey));
                        let resultsDiv = panelsContainer.querySelector('#compatiblePartsResults');
                        if (!resultsDiv) {
                            resultsDiv = document.createElement('div');
                            resultsDiv.id = 'compatiblePartsResults';
                            compatibilityForm.insertAdjacentElement('afterend', resultsDiv);
                        }
                        if (compatible.length === 0) {
                            resultsDiv.innerHTML = '<p>No compatible parts found for this bike.</p>';
                        } else {
                            resultsDiv.innerHTML = '<h5>Compatible Parts:</h5>' + compatible.map(part => `
                                <div class="part-item">
                                    <strong>${part.name}</strong> - ₹${part.price.toLocaleString('en-IN')}<br>
                                    <small>${part.specs ? part.specs.join(', ') : ''}</small>
                                </div>
                            `).join('');
                        }
                    });
                    return;
                }
                if (feature === 'virtual-garage') {
                    // Open virtual garage panel
                    const existingPanel = panelsContainer.querySelector('.panel');
                    if (existingPanel) existingPanel.remove();
                    panelsContainer.insertAdjacentHTML('beforeend', virtualGarageHTML);
                    setTimeout(() => {
                        const panel = panelsContainer.querySelector('.virtual-garage.panel');
                        if (panel) panel.classList.add('active');
                    }, 10);
                    // Panel close logic
                    const closeBtn = panelsContainer.querySelector('.virtual-garage .close-panel');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', function() {
                            const panel = panelsContainer.querySelector('.virtual-garage.panel');
                            if (panel) {
                                panel.classList.remove('active');
                                setTimeout(() => panel.remove(), 300);
                            }
                        });
                    }
                    // Form logic
                    const addBikeBtn = panelsContainer.querySelector('#addBikeBtn');
                    const garageList = panelsContainer.querySelector('#garageList');
                    const addBikeForm = panelsContainer.querySelector('#addBikeForm');
                    const newBikeForm = panelsContainer.querySelector('#newBikeForm');
                    const cancelAddBike = panelsContainer.querySelector('#cancelAddBike');

                    addBikeBtn.addEventListener('click', () => {
                        addBikeForm.style.display = 'block';
                        garageList.style.display = 'none';
                        addBikeBtn.style.display = 'none';
                    });

                    cancelAddBike.addEventListener('click', () => {
                        addBikeForm.style.display = 'none';
                        garageList.style.display = 'block';
                        addBikeBtn.style.display = 'block';
                        newBikeForm.reset();
                    });

                    newBikeForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        const bike = {
                            id: Date.now(),
                            make: document.getElementById('bikeMake').value,
                            model: document.getElementById('bikeModel').value,
                            year: document.getElementById('bikeYear').value,
                            odometer: document.getElementById('bikeOdometer').value,
                            notes: document.getElementById('bikeNotes').value,
                            maintenanceHistory: [],
                            nextService: calculateNextService(document.getElementById('bikeOdometer').value)
                        };
                        addBikeToGarage(bike);
                        newBikeForm.reset();
                        addBikeForm.style.display = 'none';
                        garageList.style.display = 'block';
                        addBikeBtn.style.display = 'block';
                    });
                }
                if (feature === 'bundle-kits') {
                    // Open bundle kits panel
                    const existingPanel = panelsContainer.querySelector('.panel');
                    if (existingPanel) existingPanel.remove();
                    panelsContainer.insertAdjacentHTML('beforeend', bundleKitsHTML);
                    setTimeout(() => {
                        const panel = panelsContainer.querySelector('.bundle-kits.panel');
                        if (panel) panel.classList.add('active');
                    }, 10);
                    // Panel close logic
                    const closeBtn = panelsContainer.querySelector('.bundle-kits .close-panel');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', function() {
                            const panel = panelsContainer.querySelector('.bundle-kits.panel');
                            if (panel) {
                                panel.classList.remove('active');
                                setTimeout(() => panel.remove(), 300);
                            }
                        });
                    }
                    // Form logic
                    const bundleCategories = document.querySelectorAll('.category-btn');
                    const bundleCards = document.querySelectorAll('.bundle-card');
                    const addButtons = document.querySelectorAll('.add-bundle-btn');

                    bundleCategories.forEach(btn => {
                        btn.addEventListener('click', () => {
                            const category = btn.dataset.category;
                            
                            // Update active button
                            bundleCategories.forEach(b => b.classList.remove('active'));
                            btn.classList.add('active');

                            // Filter bundles
                            bundleCards.forEach(card => {
                                if (category === 'all' || card.dataset.category === category) {
                                    card.style.display = 'block';
                                } else {
                                    card.style.display = 'none';
                                }
                            });
                        });
                    });

                    // Add to cart functionality
                    addButtons.forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.preventDefault();
                            const bundleId = btn.getAttribute('data-bundle-id');
                            const bundleName = btn.getAttribute('data-bundle-name');
                            const bundlePrice = parseInt(btn.getAttribute('data-bundle-price'));

                            // Create bundle product object
                            const bundleProduct = {
                                id: bundleId,
                                name: bundleName,
                                price: bundlePrice,
                                image: 'https://placehold.co/400x300/2a2a2a/fff?text=Bundle+Kit',
                                description: 'Bundle Kit',
                                type: 'bundle',
                                quantity: 1
                            };

                            // Add to cart using cart manager if available
                            if (window.cartManager) {
                                window.cartManager.addToCart(bundleProduct);
                            } else {
                                // Fallback to localStorage
                                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                                const existingItem = cart.find(item => item.id === bundleId);
                                
                                if (existingItem) {
                                    existingItem.quantity += 1;
                                } else {
                                    cart.push(bundleProduct);
                                }
                                
                                localStorage.setItem('cart', JSON.stringify(cart));
                                
                                // Update cart count
                                const cartCount = document.querySelector('.cart-count');
                                if (cartCount) {
                                    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
                                    cartCount.textContent = totalItems;
                                    cartCount.classList.add('has-items');
                                }
                            }

                            // Add to cart animation
                            btn.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
                            btn.classList.add('added');
                            btn.disabled = true;

                            // Show notification
                            showNotification(`${bundleName} added to cart!`);

                            // Reset button after 2 seconds
                            setTimeout(() => {
                                btn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
                                btn.classList.remove('added');
                                btn.disabled = false;
                            }, 2000);
                        });
                    });
                }
                showFeaturePanel(feature);
            }

            // Back button clicks
            if (e.target.closest('.back-btn')) {
                hideFeaturePanel();
            }

            // Close button clicks
            if (e.target.closest('.close-panel') || e.target.closest('.close-features')) {
                hideFeaturePanel();
                if (isMenuOpen) menuBtn.click();
            }
        });

        // Handle compatibility form
        document.addEventListener('change', function(e) {
            if (e.target.id === 'bikeMake') {
                handleMakeSelection(e.target.value);
            }
            if (e.target.id === 'bikeModel') {
                handleModelSelection(e.target.value);
            }
        });

        document.addEventListener('submit', function(e) {
            if (e.target.id === 'compatibilityForm') {
                e.preventDefault();
                submitCompatibilityForm();
            }
        });
    }

    // Feature panel management
    function showFeaturePanel(feature) {
        // No-op: all feature panel logic removed
    }

    function hideFeaturePanel() {
        const panel = panelsContainer.querySelector('.panel');
        if (panel) {
            panel.classList.remove('active');
            setTimeout(() => {
                panelsContainer.innerHTML = '';
            }, 300);
        }
        activePanel = null;
    }

    // Form handlers
    function handleMakeSelection(selectedMake) {
        const modelSelect = document.getElementById('bikeModel');
        const yearSelect = document.getElementById('bikeYear');

        modelSelect.innerHTML = '<option value="">Select Model</option>';
        yearSelect.innerHTML = '<option value="">Select Year</option>';
        yearSelect.disabled = true;

        if (selectedMake) {
            modelSelect.disabled = false;
            Object.entries(bikeModels[selectedMake].models).forEach(([key, model]) => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = model.name;
                modelSelect.appendChild(option);
            });
        } else {
            modelSelect.disabled = true;
        }
    }

    function handleModelSelection(selectedModel) {
        const yearSelect = document.getElementById('bikeYear');
        const selectedMake = document.getElementById('bikeMake').value;

        yearSelect.innerHTML = '<option value="">Select Year</option>';

        if (selectedModel) {
            yearSelect.disabled = false;
            const years = bikeModels[selectedMake].models[selectedModel].years;
            years.forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            });
        } else {
            yearSelect.disabled = true;
        }
    }

    function submitCompatibilityForm() {
        const make = document.getElementById('bikeMake').value;
        const model = document.getElementById('bikeModel').value;
        const year = document.getElementById('bikeYear').value;

        if (make && model && year) {
            window.location.href = `/bike-parts.html?make=${make}&model=${model}&year=${year}`;
        }
    }

    // No placeholder functions needed anymore

    // Add to your existing event listeners
    document.addEventListener('DOMContentLoaded', function() {
        // ... existing code ...

        // Handle custom builder
        document.addEventListener('change', function(e) {
            if (e.target.closest('.builder-section')) {
                updateBuildSummary();
            }
        });

        document.addEventListener('click', function(e) {
            if (e.target.closest('.save-build-btn')) {
                saveBuild();
            }
        });
    });

    function updateBuildSummary() {
        const selectedParts = {
            engine: document.querySelector('input[name="engine"]:checked'),
            suspension: document.querySelector('input[name="suspension"]:checked'),
            exhaust: document.querySelector('input[name="exhaust"]:checked'),
            brakes: document.querySelector('input[name="brakes"]:checked'),
            wheels: document.querySelector('input[name="wheels"]:checked')
        };

        const summaryDiv = document.querySelector('.selected-parts');
        const saveButton = document.querySelector('.save-build-btn');
        let totalPrice = 0;
        let partsSelected = false;

        let summaryHTML = '';
        Object.entries(selectedParts).forEach(([category, input]) => {
            if (input) {
                partsSelected = true;
                const partId = input.value;
                const part = customBuilderParts[category].find(p => p.id === partId);
                totalPrice += part.price;
                summaryHTML += `
                    <div class="summary-item">
                        <span>${part.name}</span>
                        <span>₹${part.price.toLocaleString('en-IN')}</span>
                    </div>
                `;
            }
        });

        summaryDiv.innerHTML = partsSelected ? summaryHTML : '<p>No parts selected</p>';
        document.querySelector('.total-price span').textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
        saveButton.disabled = !partsSelected;
    }

    function saveBuild() {
        const selectedParts = {
            engine: document.querySelector('input[name="engine"]:checked'),
            suspension: document.querySelector('input[name="suspension"]:checked'),
            exhaust: document.querySelector('input[name="exhaust"]:checked'),
            brakes: document.querySelector('input[name="brakes"]:checked'),
            wheels: document.querySelector('input[name="wheels"]:checked')
        };

        const build = {
            id: Date.now(),
            date: new Date().toISOString(),
            parts: {},
            totalPrice: 0
        };

        Object.entries(selectedParts).forEach(([category, input]) => {
            if (input) {
                const partId = input.value;
                const part = customBuilderParts[category].find(p => p.id === partId);
                build.parts[category] = part;
                build.totalPrice += part.price;
            }
        });

        // Save to localStorage
        const savedBuilds = JSON.parse(localStorage.getItem('savedBuilds') || '[]');
        savedBuilds.push(build);
        localStorage.setItem('savedBuilds', JSON.stringify(savedBuilds));

        // Show success message
        alert('Build saved successfully! You can view it in your garage.');
    }

    // Add these styles
    style.textContent += `
        .builder-intro {
            text-align: center;
            margin-bottom: 30px;
        }

        .builder-intro h4 {
            margin: 0;
            color: white;
            font-size: 24px;
        }

        .builder-intro p {
            margin: 10px 0 0;
            color: #999;
        }

        .builder-sections {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-bottom: 30px;
        }

        .builder-section {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 20px;
        }

        .builder-section h5 {
            margin: 0 0 15px;
            color: white;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 16px;
        }

        .builder-section h5 i {
            color: #E31E24;
        }

        .parts-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .part-option {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .part-option:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .part-option input {
            margin-top: 4px;
        }

        .part-details {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        .part-details strong {
            color: white;
        }

        .part-details small {
            color: #999;
        }

        .part-price {
            color: #E31E24;
            font-weight: bold;
        }

        .builder-summary {
            position: sticky;
            bottom: 0;
            background: rgba(42, 42, 42, 0.98);
            backdrop-filter: blur(10px);
            margin: 0 -20px -20px;
            padding: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .summary-content {
            margin-bottom: 15px;
        }

        .summary-content h4 {
            margin: 0 0 10px;
            color: white;
        }

        .selected-parts {
            margin-bottom: 15px;
        }

        .summary-item {
            display: flex;
            justify-content: space-between;
            color: #999;
            margin-bottom: 5px;
        }

        .total-price {
            display: flex;
            justify-content: space-between;
            color: white;
            font-size: 18px;
            padding-top: 10px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .save-build-btn {
            width: 100%;
            padding: 15px;
            background: #E31E24;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s ease;
        }

        .save-build-btn:hover:not(:disabled) {
            background: #ff2a2a;
            transform: translateY(-2px);
        }

        .save-build-btn:disabled {
            background: #666;
            cursor: not-allowed;
        }
    `;
});

// Add styles dynamically
const style = document.createElement('style');
style.textContent = `
    .menu-content {
        position: fixed;
        top: 0;
        left: 0;
        width: 300px;
        height: 100vh;
        background: rgba(42, 42, 42, 0.98);
        backdrop-filter: blur(10px);
        z-index: 1000;
        padding: 80px 20px 20px;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    }

    .features-menu {
        padding: 20px;
        color: white;
    }

    .features-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .features-header h3 {
        font-size: 18px;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .features-header i {
        color: #E31E24;
    }

    .close-features {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
    }

    .features-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .feature-btn {
        display: flex;
        align-items: center;
        gap: 15px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 15px;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .feature-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateX(5px);
    }

    .feature-btn i:first-child {
        font-size: 1.2em;
        color: #E31E24;
        width: 24px;
        text-align: center;
    }

    .feature-btn span {
        flex: 1;
        text-align: left;
        display: flex;
        flex-direction: column;
    }

    .feature-btn small {
        color: #999;
        font-size: 0.8em;
    }

    .panels-container {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        pointer-events: none;
    }

    .panel {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        max-width: 400px;
        height: 100%;
        background: rgba(42, 42, 42, 0.98);
        backdrop-filter: blur(10px);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        pointer-events: auto;
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
    }

    .panel.active {
        transform: translateX(0);
    }

    .panel-header {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .panel-header h3 {
        flex: 1;
        margin: 0;
        font-size: 18px;
        color: white;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .panel-header i {
        color: #E31E24;
    }

    .back-btn, .close-panel {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        font-size: 1.2em;
    }

    .panel-content {
        padding: 20px;
        color: white;
    }

    #compatibilityForm {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    #compatibilityForm select {
        padding: 12px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 14px;
    }

    #compatibilityForm select:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    #compatibilityForm select:focus {
        outline: none;
        border-color: #E31E24;
    }

    .check-btn {
        background: #E31E24;
        color: white;
        border: none;
        padding: 12px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 14px;
        transition: all 0.3s ease;
    }

    .check-btn:hover {
        background: #ff2a2a;
        transform: translateY(-2px);
    }

    @media (max-width: 480px) {
        .panel {
            max-width: 100%;
        }
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        color: #fff;
        font-weight: bold;
    }

    .condition-options {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .condition-option {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .condition-option:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .condition-option input {
        display: none;
    }

    .condition-option input:checked + .condition-label {
        color: #E31E24;
    }

    .condition-label {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 10px;
        color: white;
    }

    .condition-label small {
        color: #999;
        margin-left: auto;
    }

    .mileage-input {
        position: relative;
    }

    .mileage-input input {
        width: 100%;
        padding: 12px;
        padding-right: 40px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        color: white;
    }

    .mileage-input .unit {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
    }

    textarea {
        width: 100%;
        padding: 12px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        color: white;
        resize: vertical;
        min-height: 80px;
    }

    .estimate-result {
        background: rgba(227, 30, 36, 0.1);
        border: 1px solid rgba(227, 30, 36, 0.2);
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
        text-align: center;
    }

    .estimate-result h4 {
        color: white;
        margin: 0 0 10px;
    }

    .estimate-value {
        font-size: 32px;
        font-weight: bold;
        color: #E31E24;
        margin: 10px 0;
    }

    .estimate-note {
        color: #999;
        font-size: 12px;
        margin: 0;
    }

    .submit-btn {
        width: 100%;
        padding: 15px;
        background: #E31E24;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.3s ease;
    }

    .submit-btn:hover {
        background: #ff2a2a;
        transform: translateY(-2px);
    }

    .garage-actions {
        margin-bottom: 20px;
    }

    .action-btn {
        background: #E31E24;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        transition: all 0.3s ease;
    }

    .action-btn:hover {
        background: #ff2a2a;
        transform: translateY(-2px);
    }

    .garage-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .garage-item {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .bike-info {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .bike-info i {
        font-size: 24px;
        color: #E31E24;
    }

    .bike-details h4 {
        margin: 0;
        color: white;
    }

    .bike-details p {
        margin: 5px 0 0;
        color: #999;
        font-size: 14px;
    }

    .bike-actions {
        display: flex;
        gap: 10px;
    }

    .bike-actions button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        opacity: 0.7;
        transition: all 0.3s ease;
    }

    .bike-actions button:hover {
        opacity: 1;
        transform: scale(1.1);
    }

    .empty-garage {
        text-align: center;
        padding: 40px 20px;
        color: #999;
    }

    .empty-garage i {
        font-size: 48px;
        color: #E31E24;
        margin-bottom: 20px;
    }

    .empty-garage p {
        margin: 0;
        font-size: 18px;
        color: white;
    }

    .empty-garage small {
        display: block;
        margin-top: 5px;
    }

    .add-bike-form, .edit-bike-form {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 20px;
    }

    .add-bike-form h4, .edit-bike-form h4 {
        margin: 0 0 20px;
        color: white;
    }

    .form-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }

    .cancel-btn, .cancel-edit-btn {
        flex: 1;
        padding: 12px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .cancel-btn:hover, .cancel-edit-btn:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

document.head.appendChild(style); 

// Add garage functionality
const garageStorage = {
    getGarage: () => {
        const garage = localStorage.getItem('myGarage');
        return garage ? JSON.parse(garage) : [];
    },
    saveGarage: (garage) => {
        localStorage.setItem('myGarage', JSON.stringify(garage));
    },
    addBike: (bike) => {
        const garage = garageStorage.getGarage();
        garage.push({ ...bike, id: Date.now() });
        garageStorage.saveGarage(garage);
    },
    removeBike: (bikeId) => {
        const garage = garageStorage.getGarage();
        const updatedGarage = garage.filter(bike => bike.id !== bikeId);
        garageStorage.saveGarage(updatedGarage);
    },
    updateBike: (bikeId, updates) => {
        const garage = garageStorage.getGarage();
        const index = garage.findIndex(bike => bike.id === bikeId);
        if (index !== -1) {
            garage[index] = { ...garage[index], ...updates };
            garageStorage.saveGarage(garage);
        }
    }
};

function createGarageHTML() {
    const garage = garageStorage.getGarage();
    
    return `
        <div class="garage-panel panel">
            <div class="panel-header">
                <button class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h3><i class="fas fa-warehouse"></i> My Garage</h3>
                <button class="close-panel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="panel-content">
                <div class="garage-actions">
                    <button id="addBikeBtn" class="primary-button">
                        <i class="fas fa-plus"></i> Add New Bike
                    </button>
                </div>

                <div id="garageList" class="garage-list">
                    ${garage.length > 0 ? garage.map(bike => `
                        <div class="garage-item" data-id="${bike.id}">
                            <div class="bike-info">
                                <i class="fas fa-motorcycle"></i>
                                <div class="bike-details">
                                    <h4>${bike.make} ${bike.model}</h4>
                                    <p>${bike.year} • ${bike.mileage}km</p>
                                </div>
                            </div>
                            <div class="bike-actions">
                                <button class="edit-bike" data-id="${bike.id}">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="remove-bike" data-id="${bike.id}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `).join('') : `
                        <div class="empty-garage">
                            <i class="fas fa-motorcycle"></i>
                            <p>Your garage is empty</p>
                            <small>Add your first bike to get started</small>
                        </div>
                    `}
                </div>

                <div id="addBikeForm" class="add-bike-form" style="display: none;">
                    <h4>Add New Bike</h4>
                    <form id="garageForm">
                        <select id="garageMake" required>
                            <option value="">Select Make</option>
                            ${Object.entries(bikeModels).map(([key, make]) => 
                                `<option value="${key}">${make.name}</option>`
                            ).join('')}
                        </select>
                        <select id="garageModel" required disabled>
                            <option value="">Select Model</option>
                        </select>
                        <select id="garageYear" required disabled>
                            <option value="">Select Year</option>
                        </select>
                        <div class="mileage-input">
                            <input type="number" id="garageMileage" required placeholder="Current Mileage">
                            <span class="unit">km</span>
                        </div>
                        <textarea id="garageNotes" placeholder="Notes (optional)"></textarea>
                        <div class="form-actions">
                            <button type="button" id="cancelAddBike" class="cancel-btn">Cancel</button>
                            <button type="submit" class="submit-btn">Add to Garage</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

// Add to your existing event listeners
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Handle garage interactions
    document.addEventListener('click', function(e) {
        if (e.target.id === 'addBikeBtn') {
            document.getElementById('addBikeForm').style.display = 'block';
            document.getElementById('garageList').style.display = 'none';
            e.target.style.display = 'none';
        }

        if (e.target.id === 'cancelAddBike') {
            document.getElementById('addBikeForm').style.display = 'none';
            document.getElementById('garageList').style.display = 'block';
            document.getElementById('addBikeBtn').style.display = 'block';
        }

        if (e.target.closest('.remove-bike')) {
            const bikeId = parseInt(e.target.closest('.remove-bike').dataset.id);
            if (confirm('Are you sure you want to remove this bike from your garage?')) {
                garageStorage.removeBike(bikeId);
                refreshGarage();
            }
        }

        if (e.target.closest('.edit-bike')) {
            const bikeId = parseInt(e.target.closest('.edit-bike').dataset.id);
            const garage = garageStorage.getGarage();
            const bike = garage.find(b => b.id === bikeId);
            if (bike) {
                showEditBikeForm(bike);
            }
        }
    });

    document.addEventListener('change', function(e) {
        if (e.target.id === 'garageMake') {
            handleGarageMakeSelection(e.target.value);
        }
        if (e.target.id === 'garageModel') {
            handleGarageModelSelection(e.target.value);
        }
    });

    document.addEventListener('submit', function(e) {
        if (e.target.id === 'garageForm') {
            e.preventDefault();
            const formData = {
                make: document.getElementById('garageMake').value,
                model: document.getElementById('garageModel').value,
                year: document.getElementById('garageYear').value,
                mileage: document.getElementById('garageMileage').value,
                notes: document.getElementById('garageNotes').value
            };

            garageStorage.addBike(formData);
            refreshGarage();
            
            // Reset form and show garage list
            e.target.reset();
            document.getElementById('addBikeForm').style.display = 'none';
            document.getElementById('garageList').style.display = 'block';
            document.getElementById('addBikeBtn').style.display = 'block';
        }
    });
});

function handleGarageMakeSelection(selectedMake) {
    const modelSelect = document.getElementById('garageModel');
    const yearSelect = document.getElementById('garageYear');

    modelSelect.innerHTML = '<option value="">Select Model</option>';
    yearSelect.innerHTML = '<option value="">Select Year</option>';
    yearSelect.disabled = true;

    if (selectedMake && bikeModels[selectedMake]) {
        modelSelect.disabled = false;
        Object.entries(bikeModels[selectedMake].models).forEach(([key, model]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = model.name;
            modelSelect.appendChild(option);
        });
    } else {
        modelSelect.disabled = true;
    }
}

function handleGarageModelSelection(selectedModel) {
    const yearSelect = document.getElementById('garageYear');
    const selectedMake = document.getElementById('garageMake').value;

    yearSelect.innerHTML = '<option value="">Select Year</option>';

    if (selectedModel && bikeModels[selectedMake].models[selectedModel]) {
        yearSelect.disabled = false;
        bikeModels[selectedMake].models[selectedModel].years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        });
    } else {
        yearSelect.disabled = true;
    }
}

function refreshGarage() {
    const garagePanel = document.querySelector('.garage-panel');
    if (garagePanel) {
        const newGaragePanel = createGarageHTML();
        garagePanel.outerHTML = newGaragePanel;
    }
}

function showEditBikeForm(bike) {
    const editForm = `
        <div class="edit-bike-form">
            <h4>Edit Bike</h4>
            <form id="editGarageForm" data-bike-id="${bike.id}">
                <div class="mileage-input">
                    <input type="number" id="editMileage" required value="${bike.mileage}" placeholder="Current Mileage">
                    <span class="unit">km</span>
                </div>
                <textarea id="editNotes" placeholder="Notes (optional)">${bike.notes || ''}</textarea>
                <div class="form-actions">
                    <button type="button" class="cancel-edit-btn">Cancel</button>
                    <button type="submit" class="submit-btn">Save Changes</button>
                </div>
            </form>
        </div>
    `;

    const garageItem = document.querySelector(`.garage-item[data-id="${bike.id}"]`);
    garageItem.innerHTML = editForm;
}

// Add custom builder data
const customBuilderParts = {
    engine: [
        { id: 9, name: 'Racing Engine Kit', price: 150000, description: 'High-performance racing engine kit with increased power output' },
        { id: 10, name: 'Street Performance Engine', price: 120000, description: 'Balanced performance for street and track use' },
        { id: 11, name: 'Standard Engine Rebuild Kit', price: 80000, description: 'Complete engine rebuild kit with OEM specifications' }
    ],
    suspension: [
        { id: 12, name: 'Öhlins Racing Suspension', price: 85000, description: 'Professional racing suspension system' },
        { id: 13, name: 'Showa Premium Suspension', price: 65000, description: 'High-quality suspension for street and track' },
        { id: 14, name: 'Standard Suspension Kit', price: 45000, description: 'OEM-grade suspension system' }
    ],
    exhaust: [
        { id: 15, name: 'Akrapovič Full System', price: 75000, description: 'Full titanium exhaust system' },
        { id: 16, name: 'Yoshimura Slip-on', price: 45000, description: 'High-performance slip-on exhaust' },
        { id: 17, name: 'Standard Exhaust System', price: 25000, description: 'OEM-style exhaust system' }
    ],
    brakes: [
        { id: 18, name: 'Brembo GP4-RX Caliper Kit', price: 95000, description: 'Professional racing brake system' },
        { id: 19, name: 'Performance Brake Kit', price: 65000, description: 'Enhanced braking for street and track' },
        { id: 20, name: 'Standard Brake Kit', price: 35000, description: 'OEM-specification brake system' }
    ],
    wheels: [
        { id: 21, name: 'Marchesini Forged Wheels', price: 120000, description: 'Lightweight forged aluminum wheels' },
        { id: 22, name: 'OZ Racing Wheels', price: 90000, description: 'Performance aluminum wheels' },
        { id: 23, name: 'Standard Alloy Wheels', price: 50000, description: 'OEM-style alloy wheels' }
    ]
};

function createBuilderHTML() {
    return `
        <div class="builder-panel panel">
            <div class="panel-header">
                <button class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h3><i class="fas fa-wrench"></i> Custom Builder</h3>
                <button class="close-panel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="panel-content">
                <div class="builder-intro">
                    <h4>Build Your Dream Bike</h4>
                    <p>Select components to create your perfect custom build</p>
                </div>

                <div class="builder-sections">
                    <div class="builder-section" data-section="engine">
                        <h5><i class="fas fa-cog"></i> Engine</h5>
                        <div class="parts-list">
                            ${customBuilderParts.engine.map(part => `
                                <label class="part-option">
                                    <input type="radio" name="engine" value="${part.id}">
                                    <span class="part-details">
                                        <strong>${part.name}</strong>
                                        <small>${part.description}</small>
                                        <span class="part-price">₹${part.price.toLocaleString('en-IN')}</span>
                                    </span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="builder-section" data-section="suspension">
                        <h5><i class="fas fa-compress-alt"></i> Suspension</h5>
                        <div class="parts-list">
                            ${customBuilderParts.suspension.map(part => `
                                <label class="part-option">
                                    <input type="radio" name="suspension" value="${part.id}">
                                    <span class="part-details">
                                        <strong>${part.name}</strong>
                                        <small>${part.description}</small>
                                        <span class="part-price">₹${part.price.toLocaleString('en-IN')}</span>
                                    </span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="builder-section" data-section="exhaust">
                        <h5><i class="fas fa-wind"></i> Exhaust</h5>
                        <div class="parts-list">
                            ${customBuilderParts.exhaust.map(part => `
                                <label class="part-option">
                                    <input type="radio" name="exhaust" value="${part.id}">
                                    <span class="part-details">
                                        <strong>${part.name}</strong>
                                        <small>${part.description}</small>
                                        <span class="part-price">₹${part.price.toLocaleString('en-IN')}</span>
                                    </span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="builder-section" data-section="brakes">
                        <h5><i class="fas fa-brake-code"></i> Brakes</h5>
                        <div class="parts-list">
                            ${customBuilderParts.brakes.map(part => `
                                <label class="part-option">
                                    <input type="radio" name="brakes" value="${part.id}">
                                    <span class="part-details">
                                        <strong>${part.name}</strong>
                                        <small>${part.description}</small>
                                        <span class="part-price">₹${part.price.toLocaleString('en-IN')}</span>
                                    </span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="builder-section" data-section="wheels">
                        <h5><i class="fas fa-circle"></i> Wheels</h5>
                        <div class="parts-list">
                            ${customBuilderParts.wheels.map(part => `
                                <label class="part-option">
                                    <input type="radio" name="wheels" value="${part.id}">
                                    <span class="part-details">
                                        <strong>${part.name}</strong>
                                        <small>${part.description}</small>
                                        <span class="part-price">₹${part.price.toLocaleString('en-IN')}</span>
                                    </span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="builder-summary">
                    <div class="summary-content">
                        <h4>Build Summary</h4>
                        <div class="selected-parts">
                            <p>No parts selected</p>
                        </div>
                        <div class="total-price">
                            <strong>Total:</strong>
                            <span>₹0</span>
                        </div>
                    </div>
                    <button class="save-build-btn" disabled>
                        <i class="fas fa-save"></i> Save Build
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Add to your existing event listeners
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Handle custom builder
    document.addEventListener('change', function(e) {
        if (e.target.closest('.builder-section')) {
            updateBuildSummary();
        }
    });

    document.addEventListener('click', function(e) {
        if (e.target.closest('.save-build-btn')) {
            saveBuild();
        }
    });
});

function updateBuildSummary() {
    const selectedParts = {
        engine: document.querySelector('input[name="engine"]:checked'),
        suspension: document.querySelector('input[name="suspension"]:checked'),
        exhaust: document.querySelector('input[name="exhaust"]:checked'),
        brakes: document.querySelector('input[name="brakes"]:checked'),
        wheels: document.querySelector('input[name="wheels"]:checked')
    };

    const summaryDiv = document.querySelector('.selected-parts');
    const saveButton = document.querySelector('.save-build-btn');
    let totalPrice = 0;
    let partsSelected = false;

    let summaryHTML = '';
    Object.entries(selectedParts).forEach(([category, input]) => {
        if (input) {
            partsSelected = true;
            const partId = input.value;
            const part = customBuilderParts[category].find(p => p.id === partId);
            totalPrice += part.price;
            summaryHTML += `
                <div class="summary-item">
                    <span>${part.name}</span>
                    <span>₹${part.price.toLocaleString('en-IN')}</span>
                </div>
            `;
        }
    });

    summaryDiv.innerHTML = partsSelected ? summaryHTML : '<p>No parts selected</p>';
    document.querySelector('.total-price span').textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
    saveButton.disabled = !partsSelected;
}

function saveBuild() {
    const selectedParts = {
        engine: document.querySelector('input[name="engine"]:checked'),
        suspension: document.querySelector('input[name="suspension"]:checked'),
        exhaust: document.querySelector('input[name="exhaust"]:checked'),
        brakes: document.querySelector('input[name="brakes"]:checked'),
        wheels: document.querySelector('input[name="wheels"]:checked')
    };

    const build = {
        id: Date.now(),
        date: new Date().toISOString(),
        parts: {},
        totalPrice: 0
    };

    Object.entries(selectedParts).forEach(([category, input]) => {
        if (input) {
            const partId = input.value;
            const part = customBuilderParts[category].find(p => p.id === partId);
            build.parts[category] = part;
            build.totalPrice += part.price;
        }
    });

    // Save to localStorage
    const savedBuilds = JSON.parse(localStorage.getItem('savedBuilds') || '[]');
    savedBuilds.push(build);
    localStorage.setItem('savedBuilds', JSON.stringify(savedBuilds));

    // Show success message
    alert('Build saved successfully! You can view it in your garage.');
}

function createBundlesHTML() {
    return `
        <div class="bundles-panel panel">
            <div class="panel-header">
                <button class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h3><i class="fas fa-box-open"></i> Bundle Kits</h3>
                <button class="close-panel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="panel-content">
                <div class="bundles-intro">
                    <h4>Pre-packaged Upgrade Kits</h4>
                    <p>Save money with our curated bundles for specific riding styles</p>
                </div>

                <div class="bundles-grid">
                    <div class="bundle-card">
                        <div class="bundle-header">
                            <i class="fas fa-flag-checkered"></i>
                            <h5>Track Day Kit</h5>
                        </div>
                        <div class="bundle-content">
                            <ul class="bundle-items">
                                <li><i class="fas fa-check"></i> Racing Slick Tires</li>
                                <li><i class="fas fa-check"></i> Performance Brake Pads</li>
                                <li><i class="fas fa-check"></i> Quick-shifter</li>
                                <li><i class="fas fa-check"></i> Race Fairings</li>
                            </ul>
                            <div class="bundle-price">
                                <span class="original-price">₹89,999</span>
                                <span class="discounted-price">₹74,999</span>
                            </div>
                            <button class="view-bundle-btn">View Details</button>
                        </div>
                    </div>

                    <div class="bundle-card">
                        <div class="bundle-header">
                            <i class="fas fa-route"></i>
                            <h5>Touring Pack</h5>
                        </div>
                        <div class="bundle-content">
                            <ul class="bundle-items">
                                <li><i class="fas fa-check"></i> Touring Windscreen</li>
                                <li><i class="fas fa-check"></i> Comfort Seat</li>
                                <li><i class="fas fa-check"></i> Saddlebags</li>
                                <li><i class="fas fa-check"></i> Tank Bag</li>
                            </ul>
                            <div class="bundle-price">
                                <span class="original-price">₹64,999</span>
                                <span class="discounted-price">₹54,999</span>
                            </div>
                            <button class="view-bundle-btn">View Details</button>
                        </div>
                    </div>

                    <div class="bundle-card">
                        <div class="bundle-header">
                            <i class="fas fa-mountain"></i>
                            <h5>Adventure Kit</h5>
                        </div>
                        <div class="bundle-content">
                            <ul class="bundle-items">
                                <li><i class="fas fa-check"></i> Off-road Tires</li>
                                <li><i class="fas fa-check"></i> Crash Guards</li>
                                <li><i class="fas fa-check"></i> Skid Plate</li>
                                <li><i class="fas fa-check"></i> LED Fog Lights</li>
                            </ul>
                            <div class="bundle-price">
                                <span class="original-price">₹79,999</span>
                                <span class="discounted-price">₹67,999</span>
                            </div>
                            <button class="view-bundle-btn">View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Handle feature button clicks
document.querySelectorAll('.feature-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const feature = btn.getAttribute('data-feature');
        const panel = document.querySelector(`.${feature}-panel`);
        if (panel) {
            hideAllPanels();
            panel.style.display = 'block';
            setTimeout(() => panel.classList.add('active'), 10);
        }
    });
});

// Add ThrottleTalk HTML generation
function createThrottleTalkHTML() {
    return `
        <div class="throttletalk-panel">
            <div class="panel-header">
                <h2><i class="fas fa-comments"></i> ThrottleTalk Community</h2>
                <button class="close-panel"><i class="fas fa-times"></i></button>
            </div>
            <div class="panel-content">
                <div class="channels-list">
                    <a href="throttletalk.html#diy" class="channel-preview">
                        <i class="fas fa-tools"></i>
                        <div class="channel-info">
                            <strong>🛠️ DIY Mods & Builds</strong>
                            <small>Share custom builds and mods</small>
                        </div>
                    </a>
                    <a href="throttletalk.html#tech-help" class="channel-preview">
                        <i class="fas fa-question-circle"></i>
                        <div class="channel-info">
                            <strong>❓ Tech Help</strong>
                            <small>Ask about issues or compatibility</small>
                        </div>
                    </a>
                    <a href="throttletalk.html#events" class="channel-preview">
                        <i class="fas fa-calendar"></i>
                        <div class="channel-info">
                            <strong>🏍️ Ride Events</strong>
                            <small>Coordinate meetups and rides</small>
                        </div>
                    </a>
                    <a href="throttletalk.html#showcase" class="channel-preview">
                        <i class="fas fa-camera"></i>
                        <div class="channel-info">
                            <strong>📸 Show Your Ride</strong>
                            <small>Post bike pics and gear</small>
                        </div>
                    </a>
                    <a href="throttletalk.html#deals" class="channel-preview">
                        <i class="fas fa-tag"></i>
                        <div class="channel-info">
                            <strong>🔥 Deals & Drops</strong>
                            <small>Exclusive community offers</small>
                        </div>
                    </a>
                    <a href="throttletalk.html#general" class="channel-preview">
                        <i class="fas fa-comments"></i>
                        <div class="channel-info">
                            <strong>💬 General Chat</strong>
                            <small>Casual discussions</small>
                        </div>
                    </a>
                </div>
                <div class="community-stats">
                    <div class="stat">
                        <i class="fas fa-users"></i>
                        <div class="stat-info">
                            <strong>5,234</strong>
                            <small>Members</small>
                        </div>
                    </div>
                    <div class="stat">
                        <i class="fas fa-comments"></i>
                        <div class="stat-info">
                            <strong>1,287</strong>
                            <small>Online</small>
                        </div>
                    </div>
                    <div class="stat">
                        <i class="fas fa-message"></i>
                        <div class="stat-info">
                            <strong>23,456</strong>
                            <small>Messages Today</small>
                        </div>
                    </div>
                </div>
                <div class="join-community">
                    <a href="throttletalk.html" class="primary-button">
                        <i class="fas fa-right-to-bracket"></i>
                        Join the Community
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Add ThrottleTalk initialization
function initThrottleTalk() {
    const closeBtn = document.querySelector('.throttletalk-panel .close-panel');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideFeaturePanel);
    }

    const channelPreviews = document.querySelectorAll('.channel-preview');
    channelPreviews.forEach(preview => {
        preview.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            window.location.href = href;
        });
    });
}

// Create features menu HTML
function createFeaturesMenuHTML() {
    return `
        <div class="features-menu">
            <div class="features-header">
                <h3><i class="fas fa-tools"></i> Tools & Features</h3>
                <button class="close-features">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="features-list">
                <button class="feature-btn" data-feature="compatibility" id="openCompatibilityChecker">
                    <i class="fas fa-motorcycle"></i>
                    <span>
                        <strong>Bike-Specific Compatibility Checker</strong>
                        <small>Find parts for your bike</small>
                    </span>
                    <i class="fas fa-chevron-right"></i>
                </button>
                <button class="feature-btn" data-feature="virtual-garage" id="openVirtualGarage">
                    <i class="fas fa-warehouse"></i>
                    <span>
                        <strong>Virtual Garage</strong>
                        <small>Manage your bikes and maintenance</small>
                    </span>
                    <i class="fas fa-chevron-right"></i>
                </button>
                <button class="feature-btn" data-feature="bundle-kits" id="openBundleKits">
                    <i class="fas fa-box"></i>
                    <span>
                        <strong>Bundle Kits</strong>
                        <small>Pre-packaged upgrade kits with discounts</small>
                    </span>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    `;
}

// ... existing code ...

// Handle feature button clicks
document.addEventListener('click', function(e) {
    if (e.target.closest('.feature-btn')) {
        const feature = e.target.closest('.feature-btn').dataset.feature;
        showFeaturePanel(feature);
    }
});

function showFeaturePanel(feature) {
    const panel = document.createElement('div');
    panel.className = 'feature-panel';
    
    switch(feature) {
        case 'compatibility':
            panel.innerHTML = compatibilityHTML;
            break;
        case 'virtual-garage':
            panel.innerHTML = virtualGarageHTML;
            break;
        case 'bundle-kits':
            panel.innerHTML = bundleKitsHTML;
            break;
        // ... other cases ...
    }
    
    document.body.appendChild(panel);
    setTimeout(() => panel.classList.add('active'), 10);
    
    // Initialize feature-specific functionality
    switch(feature) {
        case 'compatibility':
            initCompatibility();
            break;
        case 'virtual-garage':
            initVirtualGarage();
            break;
        case 'bundle-kits':
            initBundleKits();
            break;
        // ... other cases ...
    }
}

// ... existing code ...

// Initialize garage functionality
function initGarage() {
    const addBikeBtn = document.getElementById('addBikeBtn');
    const addBikeForm = document.getElementById('addBikeForm');
    const garageList = document.getElementById('garageList');
    const newBikeForm = document.getElementById('newBikeForm');
    const cancelBtn = document.querySelector('.cancel-btn');
    const bikeMake = document.getElementById('bikeMake');
    const bikeModel = document.getElementById('bikeModel');
    const bikeYear = document.getElementById('bikeYear');

    // Load saved bikes
    loadGarage();

    // Add bike button click
    addBikeBtn.addEventListener('click', () => {
        addBikeForm.style.display = 'block';
        addBikeBtn.style.display = 'none';
    });

    // Cancel button click
    cancelBtn.addEventListener('click', () => {
        addBikeForm.style.display = 'none';
        addBikeBtn.style.display = 'block';
        newBikeForm.reset();
    });

    // Handle make selection
    bikeMake.addEventListener('change', () => {
        const selectedMake = bikeMake.value;
        if (selectedMake) {
            bikeModel.disabled = false;
            bikeModel.innerHTML = '<option value="">Select Model</option>' +
                bikes.filter(bike => bike.name.startsWith(selectedMake))
                    .map(bike => `<option value="${bike.name}">${bike.name}</option>`)
                    .join('');
        } else {
            bikeModel.disabled = true;
            bikeModel.innerHTML = '<option value="">Select Model</option>';
        }
        bikeYear.disabled = true;
        bikeYear.innerHTML = '<option value="">Select Year</option>';
    });

    // Handle model selection
    bikeModel.addEventListener('change', () => {
        const selectedModel = bikeModel.value;
        if (selectedModel) {
            bikeYear.disabled = false;
            bikeYear.innerHTML = '<option value="">Select Year</option>' +
                Array.from({length: 25}, (_, i) => new Date().getFullYear() - i)
                    .map(year => `<option value="${year}">${year}</option>`)
                    .join('');
        } else {
            bikeYear.disabled = true;
            bikeYear.innerHTML = '<option value="">Select Year</option>';
        }
    });

    // Handle form submission
    newBikeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const bike = {
            id: Date.now(),
            make: bikeMake.value,
            model: bikeModel.value,
            year: bikeYear.value,
            mileage: document.getElementById('bikeMileage').value,
            lastService: document.getElementById('lastServiceDate').value,
            maintenanceReminders: []
        };

        // Save bike to localStorage
        const garage = JSON.parse(localStorage.getItem('garage') || '[]');
        garage.push(bike);
        localStorage.setItem('garage', JSON.stringify(garage));

        // Reset form and UI
        newBikeForm.reset();
        addBikeForm.style.display = 'none';
        addBikeBtn.style.display = 'block';

        // Reload garage
        loadGarage();
    });
}

// Load garage bikes
function loadGarage() {
    const garageList = document.getElementById('garageList');
    const garage = JSON.parse(localStorage.getItem('garage') || '[]');

    if (garage.length === 0) {
        garageList.innerHTML = `
            <div class="empty-garage">
                <i class="fas fa-warehouse"></i>
                <p>Your garage is empty</p>
                <small>Add your first bike to get started</small>
            </div>
        `;
        return;
    }

    garageList.innerHTML = garage.map(bike => `
        <div class="garage-item" data-id="${bike.id}">
            <div class="bike-info">
                <i class="fas fa-motorcycle"></i>
                <div class="bike-details">
                    <h4>${bike.model}</h4>
                    <p>${bike.year} • ${bike.mileage} km</p>
                </div>
            </div>
            <div class="bike-actions">
                <button class="maintenance-btn" title="Maintenance">
                    <i class="fas fa-tools"></i>
                </button>
                <button class="parts-btn" title="Compatible Parts">
                    <i class="fas fa-cogs"></i>
                </button>
                <button class="delete-btn" title="Remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners for bike actions
    document.querySelectorAll('.maintenance-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const bikeId = btn.closest('.garage-item').dataset.id;
            showMaintenancePanel(bikeId);
        });
    });

    document.querySelectorAll('.parts-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const bikeId = btn.closest('.garage-item').dataset.id;
            showCompatibleParts(bikeId);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const bikeId = btn.closest('.garage-item').dataset.id;
// Menu button functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const mainNav = document.querySelector('.main-navigation');

    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', function() {
            menuBtn.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuBtn.contains(e.target) && !mainNav.contains(e.target) && mainNav.classList.contains('active')) {
                menuBtn.click();
            }
        });
    }
});

// Check if we're in a secure context
if (!window.isSecureContext) {
    console.error('Not in a secure context. AR requires HTTPS.');
    showError('AR features require a secure connection (HTTPS). Please access this site using HTTPS.');
}

// Bike data for search
const bikes = [
    {
        id: 1,
        name: "BMW S1000RR",
        specs: {
            engine: "999cc",
            power: "205 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1635073943225-77faca64a381?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 2,
        name: "Ducati Panigale V4",
        specs: {
            engine: "1103cc",
            power: "214 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 3,
        name: "Kawasaki Ninja ZX-10R",
        specs: {
            engine: "998cc",
            power: "203 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1580310614729-ccd69652491d?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 4,
        name: "Yamaha YZF-R1M",
        specs: {
            engine: "998cc",
            power: "200 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 5,
        name: "Aprilia RSV4 Factory",
        specs: {
            engine: "1099cc",
            power: "217 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 6,
        name: "Honda CBR1000RR-R",
        specs: {
            engine: "1000cc",
            power: "215 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 7,
        name: "Suzuki GSX-R1000R",
        specs: {
            engine: "999.8cc",
            power: "199 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 8,
        name: "MV Agusta F4 RC",
        specs: {
            engine: "998cc",
            power: "212 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 9,
        name: "KTM 1290 Super Duke R",
        specs: {
            engine: "1301cc",
            power: "180 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1597005171707-55f7b5aa2f35?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 10,
        name: "Triumph Speed Triple 1200 RS",
        specs: {
            engine: "1160cc",
            power: "178 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 11,
        name: "Ducati Streetfighter V4",
        specs: {
            engine: "1103cc",
            power: "208 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 12,
        name: "Kawasaki Z H2",
        specs: {
            engine: "998cc",
            power: "200 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 13,
        name: "Ducati Monster SP",
        specs: {
            engine: "937cc",
            power: "111 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 14,
        name: "BMW M 1000 R",
        specs: {
            engine: "999cc",
            power: "205 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1635073943225-77faca64a381?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 15,
        name: "Yamaha MT-10 SP",
        specs: {
            engine: "998cc",
            power: "164 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 16,
        name: "Indian FTR R Carbon",
        specs: {
            engine: "1203cc",
            power: "120 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 17,
        name: "Husqvarna Vitpilen 701",
        specs: {
            engine: "693cc",
            power: "75 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1597005171707-55f7b5aa2f35?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 18,
        name: "Moto Guzzi V100 Mandello",
        specs: {
            engine: "1042cc",
            power: "115 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 19,
        name: "Norton V4SV",
        specs: {
            engine: "1200cc",
            power: "185 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&h=500"
    },
    {
        id: 20,
        name: "Energica Ego",
        specs: {
            engine: "Electric",
            power: "169 HP",
            year: "2023"
        },
        image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&h=500"
    }
];

// Sample product data
const products = [
    {
        id: 1,
        name: "Racing Exhaust System",
        price: 89999,
        compatibility: ["1", "2", "14"],
        type: "Exhaust",
        image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["15% Power Increase", "40% Lighter", "Track Legal"]
    },
    {
        id: 2,
        name: "Performance Air Filter",
        price: 4999,
        compatibility: ["1", "2", "3", "4", "5", "6", "7", "8", "14"],
        type: "Air Filter",
        image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["High Flow Design", "Washable", "Lifetime Warranty"]
    },
    {
        id: 3,
        name: "Racing ECU Flash",
        price: 29999,
        compatibility: ["1", "2", "3", "4", "5", "6", "7", "8"],
        type: "ECU",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["Custom Maps", "Launch Control", "Quick Shifter"]
    },
    {
        id: 4,
        name: "Carbon Fiber Fairing Kit",
        price: 149999,
        compatibility: ["1", "2", "3", "4", "5", "6", "7", "8"],
        type: "Bodywork",
        image: "https://images.unsplash.com/photo-1580310614729-ccd69652491d?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["Full Carbon", "Race Fit", "Weight Reduction"]
    },
    {
        id: 5,
        name: "Brembo Racing Brake Kit",
        price: 79999,
        compatibility: ["1", "2", "3", "4", "5", "6", "7", "8", "14"],
        type: "Brakes",
        image: "https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["Monoblock Calipers", "Racing Pads", "Stainless Lines"]
    },
    {
        id: 6,
        name: "Öhlins Racing Suspension",
        price: 199999,
        compatibility: ["1", "2", "3", "4", "5", "6", "7", "8", "14"],
        type: "Suspension",
        image: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["Fully Adjustable", "TTX Technology", "Race Ready"]
    },
    {
        id: 7,
        name: "Quick Shifter Pro",
        price: 24999,
        compatibility: ["1", "2", "3", "4", "5", "6", "7", "8"],
        type: "Electronics",
        image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["Up/Down Shifting", "Adjustable Sensitivity", "Plug & Play"]
    },
    {
        id: 8,
        name: "Racing Chain Kit",
        price: 15999,
        compatibility: ["1", "2", "3", "4", "5", "6", "7", "8", "14"],
        type: "Drivetrain",
        image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["X-Ring Design", "Gold Plated", "Racing Grade"]
    },
    {
        id: 9,
        name: "Racing Footpegs",
        price: 8999,
        compatibility: ["1", "2", "3", "4", "5", "6", "7", "8", "14"],
        type: "Controls",
        image: "https://images.unsplash.com/photo-1597005171707-55f7b5aa2f35?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["Adjustable", "Titanium", "Anti-Slip"]
    },
    {
        id: 10,
        name: "Racing Windscreen",
        price: 4999,
        compatibility: ["1", "2", "3", "4", "5", "6", "7", "8", "14"],
        type: "Bodywork",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80",
        approved: true,
        specs: ["Double Bubble", "Smoked", "Aerodynamic"]
    }
];

// Bike models data
const bikeModels = {
    yamaha: {
        name: 'Yamaha',
        models: {
            'r1': { name: 'R1', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
            'r6': { name: 'R6', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
            'mt-09': { name: 'MT-09', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
            'mt-07': { name: 'MT-07', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] }
        }
    },
    honda: {
        name: 'Honda',
        models: {
            'cbr1000rr': { name: 'CBR1000RR', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
            'cbr600rr': { name: 'CBR600RR', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] }
        }
    },
    kawasaki: {
        name: 'Kawasaki',
        models: {
            'ninja-zx10r': { name: 'Ninja ZX-10R', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
            'ninja-zx6r': { name: 'Ninja ZX-6R', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] }
        }
    }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Handle search parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    const productId = urlParams.get('productId');
    
    if (searchTerm && productId) {
        // Highlight and scroll to the searched product
        setTimeout(() => {
            highlightSearchedProduct(searchTerm, productId);
        }, 1000);
    }
    
    // Initialize bike search if on shop-by-bike page
    if (window.location.pathname.includes('shop-by-bike.html')) {
        initBikeSearch();
    }
    
    // Initialize helmet search if on helmets page
    if (window.location.pathname.includes('helmets.html')) {
        console.log('Initializing helmet search for helmets page');
        initHelmetSearch();
    }
    
    // Check for bikeId in URL parameters
    const bikeId = urlParams.get('bikeId');
    
    if (bikeId) {
        // Handle bike highlight from URL parameters
        setTimeout(() => {
            handleBikeHighlight();
        }, 500);
    }
    
    // Initialize other features
    initProductGrid();
    initProductHoverEffects();
    initFilters();
    initParallaxEffect();
    initSpeedLines();
    initARDemo();
    initScrollAnimations();
    initChatButton();
    initLoginModal();
    checkLoginStatus();
    updateCartCount();
    loadFeaturedProducts();
    initShopNowButtons();
    initBikeCompatibility();
    initializeFeatures();
    initCompatibility();
    initConfigurator();
    initVirtualGarage();
    initBundleKits();
    initContactForm();
    initGuides();
    initGarage();
});

// Product Grid Functions
function initProductGrid() {
    displayProducts(products);
    initProductHoverEffects();
}

function displayProducts(productsToShow) {
    const partsGrid = document.querySelector('.parts-grid');
    const loadingElement = document.getElementById('loading');
    
    if (!partsGrid) return;

    // Hide loading element
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }

    if (productsToShow.length === 0) {
        partsGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>No compatible products found for your bike.</p>
                <p>Please try a different selection or contact us for custom parts.</p>
            </div>
        `;
        return;
    }

    const productsHTML = productsToShow.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${product.type}</p>
                <span class="price">₹${formatIndianPrice(product.price)}</span>
                <button class="add-to-cart" data-product-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    partsGrid.innerHTML = productsHTML;

    // Add event listeners for add to cart buttons
    const addToCartButtons = partsGrid.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            
            // Validate product ID
            if (!productId) {
                console.error('Missing product ID in data-product-id attribute');
                showCartNotification('Error: Product ID not found');
                return;
            }
            
            const parsedId = parseInt(productId);
            if (isNaN(parsedId)) {
                console.error('Invalid product ID:', productId);
                showCartNotification('Error: Invalid product ID');
                return;
            }
            
            const product = products.find(p => p.id === parsedId);
            if (product) {
                addToCart(product);
                showCartNotification(`${product.name} added to cart`);
            } else {
                console.error('Product not found with ID:', parsedId);
                showCartNotification('Error: Product not found');
            }
        });
    });
}

function initProductHoverEffects() {
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Filter Functions with Animation
function initFilters() {
    const bikeSelect = document.getElementById('bikeModel');
    const partSelect = document.getElementById('partType');

    [bikeSelect, partSelect].forEach(select => {
        select.addEventListener('change', (e) => {
            const grid = document.querySelector('.product-grid');
            grid.style.opacity = '0';
            grid.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                filterProducts();
                grid.style.opacity = '1';
                grid.style.transform = 'scale(1)';
            }, 300);
        });
    });
}

function filterProducts() {
    const selectedBike = document.getElementById('bikeModel').value;
    const selectedType = document.getElementById('partType').value;

    let filteredProducts = products;

    if (selectedBike) {
        filteredProducts = filteredProducts.filter(product => 
            product.compatibility.includes(selectedBike)
        );
    }

    if (selectedType) {
        filteredProducts = filteredProducts.filter(product => 
            product.type === selectedType
        );
    }

    displayProducts(filteredProducts);
    initProductHoverEffects();
}

// Parallax Effect
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
}

// Speed Lines Animation
function initSpeedLines() {
    const hero = document.querySelector('.hero');
    const lines = document.createElement('div');
    lines.className = 'speed-lines';
    
    for (let i = 0; i < 10; i++) {
        const line = document.createElement('div');
        line.className = 'speed-line';
        line.style.left = `${Math.random() * 100}%`;
        line.style.animationDelay = `${Math.random() * 2}s`;
        lines.appendChild(line);
    }
    
    hero.appendChild(lines);
}

// AR Demo Function with Enhanced Functionality
function initARDemo() {
    const arButton = document.querySelector('.ar-button');
    const arPreview = document.querySelector('.ar-preview');
    
    if (!arButton || !arPreview) {
        console.error('AR elements not found in the DOM');
        return;
    }

    // Check if the browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        arButton.addEventListener('click', () => {
            showError('Your browser does not support camera access. Please use a modern browser.');
        });
        return;
    }
    
    let stream = null;
    
    arButton.addEventListener('click', async () => {
        try {
            // Add loading state
            arButton.disabled = true;
            arButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Request camera access with fallback options
            try {
                // First try to get the environment-facing camera (back camera)
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { 
                        facingMode: { exact: "environment" }
                    } 
                });
            } catch (err) {
                console.log('Failed to get environment camera, trying any camera:', err);
                // If that fails, try any available camera
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: true
                });
            }
            
            // Create video element for camera feed
            const video = document.createElement('video');
            video.srcObject = stream;
            video.autoplay = true;
            video.playsInline = true; // Important for iOS
            
            // Wait for video to be ready
            await new Promise((resolve) => {
                video.onloadedmetadata = () => {
                    resolve();
                };
            });

            // Start playing the video
            await video.play();
            
            // Create canvas for AR overlay
            const canvas = document.createElement('canvas');
            canvas.className = 'ar-overlay';
            
            // Clear previous content and add new elements
            arPreview.innerHTML = '';
            arPreview.appendChild(video);
            arPreview.appendChild(canvas);
            
            // Show the preview with animation
            arPreview.style.display = 'block';
            setTimeout(() => arPreview.classList.add('active'), 100);
            
            // Add close button
            const closeButton = document.createElement('button');
            closeButton.className = 'ar-close-button';
            closeButton.innerHTML = '<i class="fas fa-times"></i>';
            arPreview.appendChild(closeButton);
            
            // Handle close
            closeButton.addEventListener('click', () => {
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
                arPreview.classList.remove('active');
                setTimeout(() => {
                    arPreview.style.display = 'none';
                    arPreview.innerHTML = '';
                }, 300);
                
                // Reset button state
                arButton.disabled = false;
                arButton.innerHTML = '<i class="fas fa-camera"></i> Launch AR Experience';
            });

            // Add orientation change handler
            window.addEventListener('orientationchange', () => {
                // Give time for the orientation change to complete
                setTimeout(() => {
                    if (video.videoWidth > video.videoHeight !== window.matchMedia("(orientation: landscape)").matches) {
                        video.style.transform = "rotate(90deg)";
                    } else {
                        video.style.transform = "none";
                    }
                }, 200);
            });
            
        } catch (error) {
            console.error('AR Error:', error);
            
            // Show appropriate error message based on the error
            let errorMessage = 'An error occurred while accessing the camera.';
            
            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                errorMessage = 'Camera access was denied. Please enable camera permissions and try again.';
            } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
                errorMessage = 'No camera was found on your device.';
            } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
                errorMessage = 'Could not access your camera. It may be in use by another application.';
            } else if (error.name === 'OverconstrainedError') {
                errorMessage = 'Could not find a suitable camera. Please try using a different camera.';
            }
            
            showError(errorMessage);
            
            // Reset button state
            arButton.disabled = false;
            arButton.innerHTML = '<i class="fas fa-camera"></i> Launch AR Experience';
        }
    });
}

// Helper function to show error messages
function showError(message) {
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Scroll Animation with Intersection Observer
function initScrollAnimations() {
    const elements = document.querySelectorAll('.product-card, .ar-demo, .selector');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px) scale(0.95)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(element);
    });
}

// Product Details Modal (placeholder)
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`Coming soon: Detailed view for ${product.name}`);
    }
}

// Chat Button Initialization

// Modal functionality
function initLoginModal() {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const profileButtons = document.querySelectorAll('.profile-button');
    const closeButtons = document.querySelectorAll('.close-modal');
    const switchToRegister = document.querySelector('.switch-to-register');
    const switchToLogin = document.querySelector('.switch-to-login');

    // Open login modal when profile button is clicked
    profileButtons.forEach(button => {
        button.addEventListener('click', () => {
            loginModal.classList.add('active');
        });
    });

    // Close modals when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            loginModal.classList.remove('active');
            registerModal.classList.remove('active');
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
        }
    });

    // Switch between login and register modals
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('active');
        registerModal.classList.add('active');
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.classList.remove('active');
        loginModal.classList.add('active');
    });

    // Handle form submissions
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your login logic here
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        console.log('Login attempt:', { email, password });
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your registration logic here
        const formData = {
            fullName: registerForm.querySelector('input[type="text"]').value,
            email: registerForm.querySelector('input[type="email"]').value,
            password: registerForm.querySelectorAll('input[type="password"]')[0].value,
            confirmPassword: registerForm.querySelectorAll('input[type="password"]')[1].value
        };
        console.log('Register attempt:', formData);
    });
}

// Session Management
function checkLoginStatus() {
    return localStorage.getItem('isLoggedIn') === 'true' || sessionStorage.getItem('isLoggedIn') === 'true';
}

function handleProfileClick(event) {
    event.preventDefault();
    if (checkLoginStatus()) {
        // User is logged in, redirect to profile page
        window.location.href = 'profile.html';
    } else {
        // User is not logged in, redirect to login page
        window.location.href = 'login.html';  // Changed from register.html to login.html
    }
}

// Initialize profile link click handler
document.addEventListener('DOMContentLoaded', function() {
    // Make the selector more specific to only target the profile icon
    const profileLink = document.querySelector('.account-link[href="register.html"]');
    if (profileLink) {
        profileLink.addEventListener('click', handleProfileClick);
    }

    // Check if we're on profile page and handle access
    if (window.location.pathname.includes('profile.html')) {
        if (!checkLoginStatus()) {
            window.location.href = 'login.html';
        }
    }
});

// Function to set login status (call this when user successfully logs in)
function setLoggedIn(userData) {
    const storage = document.querySelector('input[type="checkbox"]')?.checked ? localStorage : sessionStorage;
    storage.setItem('isLoggedIn', 'true');
    storage.setItem('userData', JSON.stringify(userData));
    
    // Trigger cart sync event
    document.dispatchEvent(new CustomEvent('userLoggedIn', { detail: userData }));
}

// Function to handle logout
function logout() {
    // Clear both localStorage and sessionStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('authToken');
    
    // Trigger cart logout event
    document.dispatchEvent(new CustomEvent('userLoggedOut'));
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Initialize search functionality
function initSearch() {
    console.log('Page loaded, initializing search...');
    const searchInput = document.getElementById('searchInput');
    const searchForm = document.getElementById('searchForm');
    const searchResults = document.getElementById('searchResults');

    if (searchInput && searchForm && searchResults) {
        console.log('Search elements found');
        
        // Handle input changes
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            console.log('Searching for:', searchTerm);
            
            if (searchTerm.length < 2) {
                searchResults.style.display = 'none';
                return;
            }

            const matches = bikes.filter(bike => 
                bike.name.toLowerCase().includes(searchTerm) ||
                bike.specs.engine.toLowerCase().includes(searchTerm) ||
                bike.specs.power.toLowerCase().includes(searchTerm)
            );

            console.log('Found matches:', matches);

            if (matches.length > 0) {
                displaySearchResults(matches);
            } else {
                searchResults.innerHTML = '<div class="search-result-item"><p>No matches found</p></div>';
                searchResults.style.display = 'block';
            }
        });

        // Handle form submission
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            return false;
        });

        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchResults.contains(e.target) && !searchInput.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    } else {
        console.log('Search elements not found');
    }
}

function scrollToBike(bikeId) {
    console.log('Scrolling to bike:', bikeId);
    
    // Check if we're on the shop-by-bike page
    if (!window.location.pathname.includes('shop-by-bike.html')) {
        // If not, redirect to shop-by-bike page with the bike ID
        window.location.href = `shop-by-bike.html?bikeId=${bikeId}`;
        return;
    }
    
    const bikeCard = document.querySelector(`[data-bike-id="${bikeId}"]`);
    
    if (bikeCard) {
        console.log('Found bike card');
        
        // First remove any existing highlights
        document.querySelectorAll('.bike-card').forEach(card => {
            card.classList.remove('highlight-bike');
        });
        
        // Add highlight to target bike
        bikeCard.classList.add('highlight-bike');
        
        // Calculate position with header offset
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const elementPosition = bikeCard.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - 20; // 20px extra padding
        
        // Scroll to the bike
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Hide search results
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
        
        // Remove highlight after animation
        setTimeout(() => {
            bikeCard.classList.remove('highlight-bike');
        }, 2000);
    } else {
        console.log('Bike card not found');
    }
}

// Update the search results click handler
function displaySearchResults(matches) {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.innerHTML = matches.map(item => {
            if (!item || !item.name) return ''; // Skip undefined items
            
            let displayInfo = '';
            let clickAction = '';
            
            if (item.type === 'bike' && item.specs) {
                displayInfo = `${item.specs.engine || 'N/A'} | ${item.specs.power || 'N/A'}`;
                clickAction = `onclick="navigateToBike(${item.id}, '${item.name}'); return false;"`;
            } else if (item.type === 'part' && item.price) {
                displayInfo = `${item.type || 'Part'} | ₹${item.price.toLocaleString('en-IN')}`;
                clickAction = `onclick="window.location.href='/bike-parts.html?search=${encodeURIComponent(item.name)}&productId=${item.id}'; return false;"`;
            } else {
                // Fallback for items without price or specs
                displayInfo = item.category || 'Product';
                clickAction = `onclick="return false;"`;
            }
            
            return `
                <div class="search-result-item" ${clickAction}>
                    <div class="search-result-info">
                        <h3>${item.name}</h3>
                        <p><span class="category-badge">${item.category || 'Product'}</span> ${displayInfo}</p>
                    </div>
                </div>
            `;
        }).filter(html => html !== '').join(''); // Filter out empty strings
        
        searchResults.style.display = 'block';
    }
}

// Add this function to handle URL parameters when page loads
function handleBikeHighlight() {
    const urlParams = new URLSearchParams(window.location.search);
    const bikeId = urlParams.get('bikeId');
    
    if (bikeId) {
        setTimeout(() => {
            const bikeElement = document.querySelector(`[data-bike-id="${bikeId}"]`);
            if (bikeElement) {
                // First remove any existing highlights
                document.querySelectorAll('.bike-card').forEach(card => {
                    card.classList.remove('highlight-bike');
                });
                
                // Add highlight to the target bike
                bikeElement.classList.add('highlight-bike');
                
                // Scroll to the bike with offset for header
                const headerOffset = 100;
                const elementPosition = bikeElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Remove highlight after animation
                setTimeout(() => {
                    bikeElement.classList.remove('highlight-bike');
                }, 2000);
            }
        }, 500); // Small delay to ensure page is loaded
    }
}

// Add click event listener to close search results when clicking outside
document.addEventListener('click', (event) => {
    const searchResults = document.getElementById('searchResults');
    const searchContainer = document.querySelector('.search-container');
    
    if (!searchContainer.contains(event.target)) {
        searchResults.classList.remove('active');
    }
});

// Add input event listener for real-time search
document.getElementById('searchInput').addEventListener('input', (event) => {
    handleSearch(event);
});

// Bike search functionality
function initBikeSearch() {
    const searchInput = document.getElementById('bikeSearchInput');
    const bikeCards = document.querySelectorAll('.bike-card');
    
    if (searchInput && bikeCards.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            bikeCards.forEach(card => {
                const bikeName = card.querySelector('.bike-name').textContent.toLowerCase();
                const bikeSpecs = card.querySelector('.bike-specs').textContent.toLowerCase();
                
                if (searchTerm === '' || 
                    bikeName.includes(searchTerm) || 
                    bikeSpecs.includes(searchTerm)) {
                    // Show card with fade in
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    // Hide card with fade out
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        if (card.style.opacity === '0') { // Check if still hidden
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
            
            // Check if no results
            const visibleCards = document.querySelectorAll('.bike-card[style*="display: flex"]');
            const noResultsMsg = document.querySelector('.no-results-message');
            
            if (visibleCards.length === 0 && searchTerm !== '') {
                if (!noResultsMsg) {
                    const message = document.createElement('div');
                    message.className = 'no-results-message';
                    message.textContent = 'No bikes found matching your search';
                    document.querySelector('.bikes-grid').appendChild(message);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
        });
    }
}

// Helmet search functionality
function initHelmetSearch() {
    console.log('=== HELMET SEARCH INITIALIZATION ===');
    const searchInput = document.getElementById('helmetSearchInput');
    const helmetCards = document.querySelectorAll('.part-card');
    
    console.log('Search input found:', searchInput ? 'YES' : 'NO');
    console.log('Helmet cards found:', helmetCards.length);
    
    if (searchInput && helmetCards.length > 0) {
        console.log('Setting up helmet search event listener');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            console.log('Search term:', searchTerm);
            
            let visibleCount = 0;
            helmetCards.forEach((card, index) => {
                const helmetName = card.querySelector('.part-name').textContent.toLowerCase();
                const helmetDescription = card.querySelector('.part-description').textContent.toLowerCase();
                
                console.log(`Card ${index}: "${helmetName}" - matches: ${helmetName.includes(searchTerm) || helmetDescription.includes(searchTerm)}`);
                
                if (searchTerm === '' || 
                    helmetName.includes(searchTerm) || 
                    helmetDescription.includes(searchTerm)) {
                    // Show card with fade in
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    visibleCount++;
                } else {
                    // Hide card with fade out
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        if (card.style.opacity === '0') { // Check if still hidden
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
            
            console.log('Visible cards:', visibleCount);
            
            // Check if no results
            const visibleCards = document.querySelectorAll('.part-card[style*="display: flex"]');
            const noResultsMsg = document.querySelector('.no-helmets-found');
            
            if (visibleCards.length === 0 && searchTerm !== '') {
                if (!noResultsMsg) {
                    const message = document.createElement('div');
                    message.className = 'no-helmets-found';
                    message.textContent = 'No helmets found matching your search';
                    document.querySelector('.bikes-grid').appendChild(message);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
        });
        
        console.log('Helmet search event listener added successfully');
    } else {
        console.error('Failed to initialize helmet search:', {
            searchInput: !!searchInput,
            helmetCards: helmetCards.length
        });
    }
}

// Add styles for transitions
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .bike-card {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .no-results-message {
            text-align: center;
            padding: 40px;
            width: 100%;
            color: rgba(255, 255, 255, 0.7);
            font-style: italic;
        }
        .category-badge {
            background: var(--primary-red);
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 500;
            margin-right: 8px;
        }
        .search-result-item {
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        .search-result-item:hover {
            background-color: rgba(227, 30, 36, 0.1);
        }
        .searched-product-highlight {
            animation: searchedProductPulse 2s ease-in-out;
            border: 2px solid var(--primary-red) !important;
            box-shadow: 0 0 20px rgba(227, 30, 36, 0.3) !important;
        }
        @keyframes searchedProductPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});

// Welcome Popup functionality
function showWelcomePopup() {
    // Force show popup regardless of localStorage
    // Create popup elements
    const popup = document.createElement('div');
    popup.className = 'welcome-popup';
    
    const popupContent = document.createElement('div');
    popupContent.className = 'welcome-popup-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'welcome-popup-close';
    closeBtn.innerHTML = '&times;';
    
    const heading = document.createElement('h2');
    heading.textContent = 'Welcome to 𝖳𝗁𝗋𝗈𝗍𝗍𝗅𝖾𝖦𝖺𝗋𝖺𝗀𝖾!';
    
    const message = document.createElement('p');
    message.textContent = 'Find the best parts and accessories for your superbike. Enjoy safe riding with our government-approved products!';
    
    const exploreBtn = document.createElement('button');
    exploreBtn.className = 'welcome-popup-button';
    exploreBtn.textContent = 'Explore Store';
    
    // Assemble popup
    popupContent.appendChild(closeBtn);
    popupContent.appendChild(heading);
    popupContent.appendChild(message);
    popupContent.appendChild(exploreBtn);
    popup.appendChild(popupContent);
    
    // Add to document
    document.body.appendChild(popup);
    
    // Show popup with animation
    setTimeout(() => {
        popup.classList.add('show');
    }, 500);
    
    // Handle close button click
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.remove();
        }, 300);
        localStorage.setItem('welcomePopupShown', 'true');
    });
    
    // Handle explore button click
    exploreBtn.addEventListener('click', () => {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.remove();
        }, 300);
        localStorage.setItem('welcomePopupShown', 'true');
    });
}

// Add CSS for the welcome popup
function addWelcomePopupStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .welcome-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
        }
        .welcome-popup.show {
            opacity: 1;
            visibility: visible;
        }
        .welcome-popup-content {
            background-color: #fff;
            padding: 30px;
            border-radius: 5px;
            max-width: 500px;
            text-align: center;
            position: relative;
            transform: scale(0.8);
            transition: transform 0.3s;
        }
        .welcome-popup.show .welcome-popup-content {
            transform: scale(1);
        }
        .welcome-popup-close {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: #333;
        }
        .welcome-popup h2 {
            color: #e74c3c;
            margin-top: 0;
        }
        .welcome-popup-button {
            background-color: #e74c3c;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 20px;
            transition: background-color 0.3s;
        }
        .welcome-popup-button:hover {
            background-color: #c0392b;
        }
    `;
    document.head.appendChild(style);
}

// Load cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add welcome popup styles
    addWelcomePopupStyles();
    
    // Only show welcome popup on the index page (homepage)
    if (window.location.pathname === '/index.html' || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        showWelcomePopup();
    }
    
    // Update cart count
    updateCartCount();
    
    // Initialize search if search form exists
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
    
    // Initialize bike search if on the shop by bike page
    if (document.querySelector('.bike-search-section')) {
        initBikeSearch();
    }
    
    // Initialize helmet search if on the helmets page
    if (document.getElementById('helmetSearchInput')) {
        initHelmetSearch();
    }
    
    // Initialize featured products if on homepage
    if (document.getElementById('featuredProducts')) {
        loadFeaturedProducts();
    }
});

// Update cart count from local storage
function updateCartCount() {
    if (window.cartManager) {
        window.cartManager.updateCartCount();
    } else {
        // Fallback to old method
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
            element.classList.toggle('has-items', totalItems > 0);
        });
    }
}

// Format number to Indian currency format
function formatIndianPrice(number) {
    const roundedNum = Math.round(number);
    const str = roundedNum.toString();
    let lastThree = str.substring(str.length - 3);
    const otherNumbers = str.substring(0, str.length - 3);
    if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
    }
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
}

// Load featured products on homepage
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;
    
    // Sample featured product data with prices in USD converted to INR (1 USD = 83 INR)
    const featuredProducts = [
        {
            id: 1,
            name: 'AGV Pista GP RR',
            category: 'Helmets',
            price: 25000,
            image: 'https://www.twowheel.co.uk/images/detailed/130/agv-pista-gp-rr-performance-carbon-red-race-helmet-3.png'
        },
        {
            id: 2,
            name: 'Shoei X-14',
            category: 'Helmets',
            price: 15000,
            image: 'https://www.revzilla.com/product_images/0224/4057/shoei_x14_laverty_tc4.jpg'
        },
        {
            id: 3,
            name: 'Arai Corsair-X',
            category: 'Helmets',
            price: 12000,
            image: 'https://www.asphaltandrubber.com/wp-content/gallery/arai-corsair-x-helmet-review/Arai-Corsair-X-helmet-review-26.jpg'
        },
        {
            id: 4,
            name: 'Bell Race Star Flex DLX',
            category: 'Helmets',
            price: 16000,
            image: 'https://www.bellhelmets.com/on/demandware.static/-/Sites-bell-master-catalog/default/dw790e0a9b/images/large/bell-race-star-dlx-flex-carbon-street-full-face-motorcycle-helmet-labyrinth-gloss-white-black-right.jpg'
        },
        {
            id: 5,
            name: 'HJC RPHA 11 Pro',
            category: 'Helmets',
            price: 14000,
            image: 'https://th.bing.com/th/id/OIP.HZLE-2WSqXs_OM1iLAfr2QHaHa?rs=1&pid=ImgDetMain'
        },
        {
            id: 6,
            name: 'Akrapovic Exhaust System',
            category: 'Bike Parts',
            price: 129999,
            image: 'https://th.bing.com/th/id/OIP.uSVSHVa__4QOPSGQPZiUkAHaFF?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3'
        },
        {
            id: 7,
            name: 'Brembo Brake Kit',
            category: 'Bike Parts',
            price: 89999,
            image: 'https://www.motomillion.com/cdn/shop/products/Brembo_208973767_Racing_SuperSport_Rotor_Left_Right_Rotors_Set_BMW_S1000RR_K67_2019_2020_grande.jpg?v=1574714461'
        },
        {
            id: 8,
            name: 'Öhlins Racing Suspension',
            category: 'Bike Parts',
            price: 199999,
            image: 'https://th.bing.com/th/id/OIP.81zJ5cAeVPoCidiV2okTYQHaHa?w=1024&h=1024&rs=1&pid=ImgDetMain'
        }
    ];
    
    // Create container for scroll buttons
    const container = document.createElement('div');
    container.className = 'products-container';
    
    // Add scroll buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'scroll-btn prev';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'scroll-btn next';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    
    // Generate HTML for featured products
    const productsHTML = featuredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-price">₹${formatIndianPrice(product.price)}</p>
                <button class="add-to-cart-btn" data-product-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
    
    // Create products grid
    const productsGrid = document.createElement('div');
    productsGrid.className = 'products-grid';
    productsGrid.innerHTML = productsHTML;
    
    // Append elements
    container.appendChild(prevBtn);
    container.appendChild(productsGrid);
    container.appendChild(nextBtn);
    featuredContainer.appendChild(container);
    
    // Add scroll functionality
    const scrollAmount = 400; // Scroll by 400px
    
    prevBtn.addEventListener('click', () => {
        productsGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        productsGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Add event listeners for add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            
            // Validate product ID
            if (!productId) {
                console.error('Missing product ID in data-product-id attribute');
                showCartNotification('Error: Product ID not found');
                return;
            }
            
            const parsedId = parseInt(productId);
            if (isNaN(parsedId)) {
                console.error('Invalid product ID:', productId);
                showCartNotification('Error: Invalid product ID');
                return;
            }
            
            const product = featuredProducts.find(p => p.id === parsedId);
            if (product) {
                addToCart(product);
                showCartNotification(`${product.name} added to cart`);
            } else {
                console.error('Product not found with ID:', parsedId);
                showCartNotification('Error: Product not found');
            }
        });
    });
}

// Add item to cart
function addToCart(product) {
    // Validate product data
    if (!product || !product.id) {
        console.error('Invalid product data:', product);
        showCartNotification('Error: Invalid product data');
        return;
    }

    if (!product.name || !product.price) {
        console.error('Product missing required fields:', product);
        showCartNotification('Error: Product missing required information');
        return;
    }

    if (window.cartManager) {
        window.cartManager.addToCart(product);
    } else {
        // Fallback to old method if cart manager is not available
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image || '',
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showCartNotification(`${product.name} added to cart`);
    }
}

// Show notification when item is added to cart
function showCartNotification(message) {
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
        setTimeout(() => notification.remove(), 3000);
    }, 3000);
}

// Handle search form submission
function handleSearch(event) {
    if (event) {
        event.preventDefault();
    }
    
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput?.value?.toLowerCase().trim();
    const searchResults = document.getElementById('searchResults');
    
    if (!searchTerm || searchTerm.length < 2) {
        if (searchResults) {
            searchResults.style.display = 'none';
        }
        return;
    }
    
    // Search through bikes
    const bikeMatches = bikes.filter(bike => 
        bike.name.toLowerCase().includes(searchTerm) ||
        bike.specs.engine.toLowerCase().includes(searchTerm) ||
        bike.specs.power.toLowerCase().includes(searchTerm)
    );
    
    // Search through bike parts
    const partMatches = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.type.toLowerCase().includes(searchTerm) ||
        (product.specs && product.specs.some(spec => spec.toLowerCase().includes(searchTerm)))
    );
    
    // Combine all matches with proper error handling
    const allMatches = [
        ...bikeMatches.map(bike => ({ ...bike, category: 'Bike', type: 'bike' })),
        ...partMatches.map(part => ({ ...part, category: 'Bike Part', type: 'part' }))
    ].filter(item => item && item.name); // Filter out any undefined items
    
    // Display results
    if (searchResults) {
        if (allMatches.length > 0) {
            displaySearchResults(allMatches);
        } else {
            searchResults.innerHTML = '<div class="search-result-item"><p>No matches found</p></div>';
            searchResults.style.display = 'block';
        }
    }
}

// Add this new function to handle Shop Now buttons
function initShopNowButtons() {
    const shopNowButtons = document.querySelectorAll('.shop-now-btn');
    
    shopNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the bike ID from the parent card
            const bikeCard = this.closest('.bike-card');
            const bikeId = bikeCard.getAttribute('data-bike-id');
            const bikeName = bikeCard.querySelector('.bike-name').textContent;
            
            // Check if we are on shop-by-bike.html
            if (window.location.pathname.includes('shop-by-bike.html')) {
                // Filter products for this bike
                const compatibleProducts = products.filter(product => 
                    product.compatibility && product.compatibility.includes(bikeId)
                );
                
                console.log(`Found ${compatibleProducts.length} compatible products for bike ID ${bikeId}`);
                
                // Clear any previous product displays
                const existingBikeProducts = document.querySelector('.bike-products');
                if (existingBikeProducts) {
                    existingBikeProducts.remove();
                }
                
                // Create a container for the products
                const productsSection = document.createElement('div');
                productsSection.className = 'bike-products';
                productsSection.innerHTML = `
                    <div class="section-title">
                        <h2>Compatible Products for ${bikeName}</h2>
                    </div>
                    <div class="products-grid" id="compatibleProducts"></div>
                `;
                
                // Insert after the bikes grid
                const bikesGrid = document.querySelector('.bikes-grid');
                bikesGrid.after(productsSection);
                
                // Populate products
                const productsGrid = document.getElementById('compatibleProducts');
                
                if (compatibleProducts.length > 0) {
                    const productsHTML = compatibleProducts.map(product => `
                        <div class="product-card">
                            <div class="product-image">
                                <img src="${product.image}" alt="${product.name}">
                            </div>
                            <div class="product-info">
                                <h3>${product.name}</h3>
                                <p class="product-category">${product.type}</p>
                                <p class="product-price">$${product.price.toFixed(2)}</p>
                                <button class="add-to-cart-btn" data-product-id="${product.id}">
                                    <i class="fas fa-shopping-cart"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    `).join('');
                    
                    productsGrid.innerHTML = productsHTML;
                    
                    // Scroll to the products section
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Add event listeners for add to cart buttons
                    const addToCartButtons = productsSection.querySelectorAll('.add-to-cart-btn');
                    addToCartButtons.forEach(button => {
                        button.addEventListener('click', function() {
                            const productId = parseInt(this.getAttribute('data-product-id'));
                            const product = products.find(p => p.id === productId);
                            
                            if (product) {
                                addToCart(product);
                                showCartNotification(`${product.name} added to cart`);
                            }
                        });
                    });
                } else {
                    productsGrid.innerHTML = `
                        <div class="no-products">
                            <p>No compatible products found for this bike. Please check back later or contact us for custom parts.</p>
                        </div>
                    `;
                }
            }
        });
    });
}

// Initialize bike compatibility checker
function initBikeCompatibility() {
    const bikeMakeSelect = document.getElementById('bikeMake');
    const bikeModelSelect = document.getElementById('bikeModel');
    const compatibilityForm = document.getElementById('compatibilityForm');

    if (bikeMakeSelect && bikeModelSelect) {
        // Update models when make is selected
        bikeMakeSelect.addEventListener('change', function() {
            const selectedMake = this.value;
            bikeModelSelect.innerHTML = '<option value="">Select Model</option>';
            
            if (selectedMake && bikeModels[selectedMake]) {
                bikeModels[selectedMake].models.forEach((model, key) => {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = model.name;
                    bikeModelSelect.appendChild(option);
                });
            }
        });

        // Handle form submission
        compatibilityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const year = document.getElementById('bikeYear').value;
            const make = bikeMakeSelect.value;
            const model = bikeModelSelect.value;

            if (year && make && model) {
                // Redirect to the filtered products page
                window.location.href = `/bike-parts.html?year=${year}&make=${make}&model=${model}`;
            }
        });
    }
}

// Menu and Feature Panel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const mainNav = document.querySelector('.main-nav');
    let isMenuOpen = false;
    let activePanel = null;

    // Create the features menu HTML
    const featuresMenuHTML = `
        <div class="features-menu">
            <div class="features-header">
                <h3><i class="fas fa-tools"></i> Tools & Features</h3>
                <button class="close-features">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="features-list">
                <button class="feature-btn" data-feature="compatibility" id="openCompatibilityChecker">
                    <i class="fas fa-motorcycle"></i>
                    <span>
                        <strong>Bike-Specific Compatibility Checker</strong>
                        <small>Find parts for your bike</small>
                    </span>
                    <i class="fas fa-chevron-right"></i>
                </button>
                <button class="feature-btn" data-feature="virtual-garage" id="openVirtualGarage">
                    <i class="fas fa-warehouse"></i>
                    <span>
                        <strong>Virtual Garage</strong>
                        <small>Manage your bikes and maintenance</small>
                    </span>
                    <i class="fas fa-chevron-right"></i>
                </button>
                <button class="feature-btn" data-feature="bundle-kits" id="openBundleKits">
                    <i class="fas fa-box"></i>
                    <span>
                        <strong>Bundle Kits</strong>
                        <small>Pre-packaged upgrade kits with discounts</small>
                    </span>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    `;

    // Create the compatibility checker HTML
    const compatibilityHTML = `
        <div class="compatibility-checker panel">
            <div class="panel-header">
                <button class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h3><i class="fas fa-motorcycle"></i> Find Compatible Parts</h3>
                <button class="close-panel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="compatibilityForm">
                <select id="bikeMake" required>
                    <option value="">Select Make</option>
                    ${Object.entries(bikeModels).map(([key, make]) => 
                        `<option value="${key}">${make.name}</option>`
                    ).join('')}
                </select>
                <select id="bikeModel" required disabled>
                    <option value="">Select Model</option>
                </select>
                <select id="bikeYear" required disabled>
                    <option value="">Select Year</option>
                </select>
                <button type="submit" class="check-btn">
                    <i class="fas fa-search"></i> Find Parts
                </button>
            </form>
        </div>
    `;

    // Create the virtual garage HTML
    const virtualGarageHTML = `
        <div class="virtual-garage panel">
            <div class="panel-header">
                <button class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h3><i class="fas fa-warehouse"></i> Virtual Garage</h3>
                <button class="close-panel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="panel-content">
                <div class="garage-actions">
                    <button id="addBikeBtn" class="primary-button">
                        <i class="fas fa-plus"></i> Add New Bike
                    </button>
                </div>
                <div id="garageList" class="garage-list">
                    <!-- Bikes will be dynamically added here -->
                    <div class="empty-garage">
                        <i class="fas fa-motorcycle"></i>
                        <p>Your garage is empty</p>
                        <small>Add your first bike to get started</small>
                    </div>
                </div>
                <div id="addBikeForm" class="add-bike-form" style="display: none;">
                    <h4>Add New Bike</h4>
                    <form id="newBikeForm">
                        <div class="form-group">
                            <label for="bikeMake">Make</label>
                            <select id="bikeMake" required>
                                <option value="">Select Make</option>
                                <option value="honda">Honda</option>
                                <option value="yamaha">Yamaha</option>
                                <option value="kawasaki">Kawasaki</option>
                                <option value="suzuki">Suzuki</option>
                                <option value="bmw">BMW</option>
                                <option value="ducati">Ducati</option>
                                <option value="ktm">KTM</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="bikeModel">Model</label>
                            <input type="text" id="bikeModel" required placeholder="e.g., CBR 1000RR">
                        </div>
                        <div class="form-group">
                            <label for="bikeYear">Year</label>
                            <input type="number" id="bikeYear" required min="1900" max="2024" placeholder="e.g., 2023">
                        </div>
                        <div class="form-group">
                            <label for="bikeOdometer">Odometer (km)</label>
                            <input type="number" id="bikeOdometer" required min="0" placeholder="Current mileage">
                        </div>
                        <div class="form-group">
                            <label for="bikeNotes">Notes</label>
                            <textarea id="bikeNotes" placeholder="Add any notes about your bike"></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="cancel-btn" id="cancelAddBike">Cancel</button>
                            <button type="submit" class="primary-button">Add Bike</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Create the bundle kits HTML
    const bundleKitsHTML = `
        <div class="bundle-kits panel">
            <div class="panel-header">
                <button class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h3><i class="fas fa-box"></i> Bundle Kits</h3>
                <button class="close-panel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="panel-content">
                <div class="bundle-categories">
                    <button class="category-btn active" data-category="all">All Bundles</button>
                    <button class="category-btn" data-category="track">Track Day</button>
                    <button class="category-btn" data-category="touring">Touring</button>
                    <button class="category-btn" data-category="performance">Performance</button>
                </div>
                <div class="bundles-grid">
                    <!-- Track Day Bundles -->
                    <div class="bundle-card" data-category="track">
                        <div class="bundle-image">
                            <img src="https://placehold.co/400x300/2a2a2a/fff?text=Track+Day+Kit" alt="Track Day Essential Kit">
                            <span class="discount-badge">-15%</span>
                        </div>
                        <div class="bundle-info">
                            <h4>Track Day Essential Kit</h4>
                            <p>Complete package for track enthusiasts</p>
                            <ul class="bundle-items">
                                <li><i class="fas fa-check"></i> Öhlins TTX GP Shock</li>
                                <li><i class="fas fa-check"></i> Brembo M4.32 Calipers</li>
                                <li><i class="fas fa-check"></i> Pirelli Diablo Supercorsa</li>
                                <li><i class="fas fa-check"></i> Racing Air Filter</li>
                            </ul>
                            <div class="bundle-price">
                                <span class="original-price">₹149,999</span>
                                <span class="final-price">₹127,499</span>
                            </div>
                            <button class="add-bundle-btn" data-bundle-id="track-day-essential" data-bundle-name="Track Day Essential Kit" data-bundle-price="127499">
                                <i class="fas fa-cart-plus"></i>
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    <!-- Touring Bundles -->
                    <div class="bundle-card" data-category="touring">
                        <div class="bundle-image">
                            <img src="https://placehold.co/400x300/2a2a2a/fff?text=Touring+Pack" alt="Touring Comfort Pack">
                            <span class="discount-badge">-20%</span>
                        </div>
                        <div class="bundle-info">
                            <h4>Long Distance Touring Pack</h4>
                            <p>Ultimate comfort for long rides</p>
                            <ul class="bundle-items">
                                <li><i class="fas fa-check"></i> Touring Windscreen</li>
                                <li><i class="fas fa-check"></i> Comfort Seat</li>
                                <li><i class="fas fa-check"></i> Soft Panniers Set</li>
                                <li><i class="fas fa-check"></i> Tank Bag</li>
                            </ul>
                            <div class="bundle-price">
                                <span class="original-price">₹89,999</span>
                                <span class="final-price">₹71,999</span>
                            </div>
                            <button class="add-bundle-btn" data-bundle-id="touring-comfort" data-bundle-name="Long Distance Touring Pack" data-bundle-price="71999">
                                <i class="fas fa-cart-plus"></i>
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    <!-- Performance Bundles -->
                    <div class="bundle-card" data-category="performance">
                        <div class="bundle-image">
                            <img src="https://placehold.co/400x300/2a2a2a/fff?text=Performance+Kit" alt="Performance Pack">
                            <span class="discount-badge">-25%</span>
                        </div>
                        <div class="bundle-info">
                            <h4>Performance Upgrade Kit</h4>
                            <p>Maximize your bike's potential</p>
                            <ul class="bundle-items">
                                <li><i class="fas fa-check"></i> Akrapovič Full System</li>
                                <li><i class="fas fa-check"></i> Power Commander V</li>
                                <li><i class="fas fa-check"></i> K&N Air Filter</li>
                                <li><i class="fas fa-check"></i> Quick Shifter</li>
                            </ul>
                            <div class="bundle-price">
                                <span class="original-price">₹129,999</span>
                                <span class="final-price">₹97,499</span>
                            </div>
                            <button class="add-bundle-btn" data-bundle-id="performance-upgrade" data-bundle-name="Performance Upgrade Kit" data-bundle-price="97499">
                                <i class="fas fa-cart-plus"></i>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Create menu content
    const menuContent = document.createElement('div');
    menuContent.className = 'menu-content';
    menuContent.innerHTML = featuresMenuHTML;

    // Create panels container
    const panelsContainer = document.createElement('div');
    panelsContainer.className = 'panels-container';
    document.body.appendChild(panelsContainer);

    // Add menu toggle functionality
    if (menuBtn) {
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                menuBtn.innerHTML = '<i class="fas fa-times"></i>';
                document.body.appendChild(menuContent);
                menuContent.style.transform = 'translateX(0)';
            } else {
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                menuContent.style.transform = 'translateX(-100%)';
                setTimeout(() => {
                    if (menuContent.parentNode === document.body) {
                        document.body.removeChild(menuContent);
                    }
                }, 300);
            }
        });

        // Handle feature buttons
        document.addEventListener('click', function(e) {
            // Close menu when clicking outside
            if (!menuContent.contains(e.target) && !menuBtn.contains(e.target) && isMenuOpen) {
                menuBtn.click();
            }

            // Feature button clicks
            if (e.target.closest('.feature-btn')) {
                const feature = e.target.closest('.feature-btn').dataset.feature;
                if (feature === 'compatibility') {
                    // Open compatibility checker panel
                    const existingPanel = panelsContainer.querySelector('.panel');
                    if (existingPanel) existingPanel.remove();
                    panelsContainer.insertAdjacentHTML('beforeend', compatibilityHTML);
                    setTimeout(() => {
                        const panel = panelsContainer.querySelector('.compatibility-checker.panel');
                        if (panel) panel.classList.add('active');
                    }, 10);
                    // Panel close logic
                    const closeBtn = panelsContainer.querySelector('.compatibility-checker .close-panel');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', function() {
                            const panel = panelsContainer.querySelector('.compatibility-checker.panel');
                            if (panel) {
                                panel.classList.remove('active');
                                setTimeout(() => panel.remove(), 300);
                            }
                        });
                    }
                    // Form logic
                    const bikeMake = panelsContainer.querySelector('#bikeMake');
                    const bikeModel = panelsContainer.querySelector('#bikeModel');
                    const bikeYear = panelsContainer.querySelector('#bikeYear');
                    const compatibilityForm = panelsContainer.querySelector('#compatibilityForm');
                    // Populate models and years
                    bikeMake.addEventListener('change', function() {
                        const makeKey = this.value;
                        bikeModel.innerHTML = '<option value="">Select Model</option>';
                        bikeYear.innerHTML = '<option value="">Select Year</option>';
                        bikeModel.disabled = true;
                        bikeYear.disabled = true;
                        if (makeKey && bikeModels[makeKey]) {
                            bikeModel.disabled = false;
                            Object.entries(bikeModels[makeKey].models).forEach(([modelKey, modelObj]) => {
                                const option = document.createElement('option');
                                option.value = modelKey;
                                option.textContent = modelObj.name;
                                bikeModel.appendChild(option);
                            });
                        }
                    });
                    bikeModel.addEventListener('change', function() {
                        const makeKey = bikeMake.value;
                        const modelKey = this.value;
                        bikeYear.innerHTML = '<option value="">Select Year</option>';
                        bikeYear.disabled = true;
                        if (makeKey && modelKey && bikeModels[makeKey] && bikeModels[makeKey].models[modelKey]) {
                            bikeYear.disabled = false;
                            bikeModels[makeKey].models[modelKey].years.forEach(year => {
                                const option = document.createElement('option');
                                option.value = year;
                                option.textContent = year;
                                bikeYear.appendChild(option);
                            });
                        }
                    });
                    compatibilityForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        const makeKey = bikeMake.value;
                        const modelKey = bikeModel.value;
                        const year = bikeYear.value;
                        if (!makeKey || !modelKey || !year) return;
                        // Find compatible products
                        const selectedModel = bikeModels[makeKey].models[modelKey].name;
                        const compatible = products.filter(product => product.compatibility && product.compatibility.includes(modelKey));
                        let resultsDiv = panelsContainer.querySelector('#compatiblePartsResults');
                        if (!resultsDiv) {
                            resultsDiv = document.createElement('div');
                            resultsDiv.id = 'compatiblePartsResults';
                            compatibilityForm.insertAdjacentElement('afterend', resultsDiv);
                        }
                        if (compatible.length === 0) {
                            resultsDiv.innerHTML = '<p>No compatible parts found for this bike.</p>';
                        } else {
                            resultsDiv.innerHTML = '<h5>Compatible Parts:</h5>' + compatible.map(part => `
                                <div class="part-item">
                                    <strong>${part.name}</strong> - ₹${part.price.toLocaleString('en-IN')}<br>
                                    <small>${part.specs ? part.specs.join(', ') : ''}</small>
                                </div>
                            `).join('');
                        }
                    });
                    return;
                }
                if (feature === 'virtual-garage') {
                    // Open virtual garage panel
                    const existingPanel = panelsContainer.querySelector('.panel');
                    if (existingPanel) existingPanel.remove();
                    panelsContainer.insertAdjacentHTML('beforeend', virtualGarageHTML);
                    setTimeout(() => {
                        const panel = panelsContainer.querySelector('.virtual-garage.panel');
                        if (panel) panel.classList.add('active');
                    }, 10);
                    // Panel close logic
                    const closeBtn = panelsContainer.querySelector('.virtual-garage .close-panel');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', function() {
                            const panel = panelsContainer.querySelector('.virtual-garage.panel');
                            if (panel) {
                                panel.classList.remove('active');
                                setTimeout(() => panel.remove(), 300);
                            }
                        });
                    }
                    // Form logic
                    const addBikeBtn = panelsContainer.querySelector('#addBikeBtn');
                    const garageList = panelsContainer.querySelector('#garageList');
                    const addBikeForm = panelsContainer.querySelector('#addBikeForm');
                    const newBikeForm = panelsContainer.querySelector('#newBikeForm');
                    const cancelAddBike = panelsContainer.querySelector('#cancelAddBike');

                    addBikeBtn.addEventListener('click', () => {
                        addBikeForm.style.display = 'block';
                        garageList.style.display = 'none';
                        addBikeBtn.style.display = 'none';
                    });

                    cancelAddBike.addEventListener('click', () => {
                        addBikeForm.style.display = 'none';
                        garageList.style.display = 'block';
                        addBikeBtn.style.display = 'block';
                        newBikeForm.reset();
                    });

                    newBikeForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        const bike = {
                            id: Date.now(),
                            make: document.getElementById('bikeMake').value,
                            model: document.getElementById('bikeModel').value,
                            year: document.getElementById('bikeYear').value,
                            odometer: document.getElementById('bikeOdometer').value,
                            notes: document.getElementById('bikeNotes').value,
                            maintenanceHistory: [],
                            nextService: calculateNextService(document.getElementById('bikeOdometer').value)
                        };
                        addBikeToGarage(bike);
                        newBikeForm.reset();
                        addBikeForm.style.display = 'none';
                        garageList.style.display = 'block';
                        addBikeBtn.style.display = 'block';
                    });
                }
                if (feature === 'bundle-kits') {
                    // Open bundle kits panel
                    const existingPanel = panelsContainer.querySelector('.panel');
                    if (existingPanel) existingPanel.remove();
                    panelsContainer.insertAdjacentHTML('beforeend', bundleKitsHTML);
                    setTimeout(() => {
                        const panel = panelsContainer.querySelector('.bundle-kits.panel');
                        if (panel) panel.classList.add('active');
                    }, 10);
                    // Panel close logic
                    const closeBtn = panelsContainer.querySelector('.bundle-kits .close-panel');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', function() {
                            const panel = panelsContainer.querySelector('.bundle-kits.panel');
                            if (panel) {
                                panel.classList.remove('active');
                                setTimeout(() => panel.remove(), 300);
                            }
                        });
                    }
                    // Form logic
                    const bundleCategories = document.querySelectorAll('.category-btn');
                    const bundleCards = document.querySelectorAll('.bundle-card');
                    const addButtons = document.querySelectorAll('.add-bundle-btn');

                    bundleCategories.forEach(btn => {
                        btn.addEventListener('click', () => {
                            const category = btn.dataset.category;
                            
                            // Update active button
                            bundleCategories.forEach(b => b.classList.remove('active'));
                            btn.classList.add('active');

                            // Filter bundles
                            bundleCards.forEach(card => {
                                if (category === 'all' || card.dataset.category === category) {
                                    card.style.display = 'block';
                                } else {
                                    card.style.display = 'none';
                                }
                            });
                        });
                    });

                    // Add to cart functionality
                    addButtons.forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.preventDefault();
                            const bundleId = btn.getAttribute('data-bundle-id');
                            const bundleName = btn.getAttribute('data-bundle-name');
                            const bundlePrice = parseInt(btn.getAttribute('data-bundle-price'));

                            // Create bundle product object
                            const bundleProduct = {
                                id: bundleId,
                                name: bundleName,
                                price: bundlePrice,
                                image: 'https://placehold.co/400x300/2a2a2a/fff?text=Bundle+Kit',
                                description: 'Bundle Kit',
                                type: 'bundle',
                                quantity: 1
                            };

                            // Add to cart using cart manager if available
                            if (window.cartManager) {
                                window.cartManager.addToCart(bundleProduct);
                            } else {
                                // Fallback to localStorage
                                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                                const existingItem = cart.find(item => item.id === bundleId);
                                
                                if (existingItem) {
                                    existingItem.quantity += 1;
                                } else {
                                    cart.push(bundleProduct);
                                }
                                
                                localStorage.setItem('cart', JSON.stringify(cart));
                                
                                // Update cart count
                                const cartCount = document.querySelector('.cart-count');
                                if (cartCount) {
                                    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
                                    cartCount.textContent = totalItems;
                                    cartCount.classList.add('has-items');
                                }
                            }

                            // Add to cart animation
                            btn.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
                            btn.classList.add('added');
                            btn.disabled = true;

                            // Show notification
                            showNotification(`${bundleName} added to cart!`);

                            // Reset button after 2 seconds
                            setTimeout(() => {
                                btn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
                                btn.classList.remove('added');
                                btn.disabled = false;
                            }, 2000);
                        });
                    });
                }
                showFeaturePanel(feature);
            }

            // Back button clicks
            if (e.target.closest('.back-btn')) {
                hideFeaturePanel();
            }

            // Close button clicks
            if (e.target.closest('.close-panel') || e.target.closest('.close-features')) {
                hideFeaturePanel();
                if (isMenuOpen) menuBtn.click();
            }
        });

        // Handle compatibility form
        document.addEventListener('change', function(e) {
            if (e.target.id === 'bikeMake') {
                handleMakeSelection(e.target.value);
            }
            if (e.target.id === 'bikeModel') {
                handleModelSelection(e.target.value);
            }
        });

        document.addEventListener('submit', function(e) {
            if (e.target.id === 'compatibilityForm') {
                e.preventDefault();
                submitCompatibilityForm();
            }
        });
    }

    // Feature panel management
    function showFeaturePanel(feature) {
        // No-op: all feature panel logic removed
    }

    function hideFeaturePanel() {
        const panel = panelsContainer.querySelector('.panel');
        if (panel) {
            panel.classList.remove('active');
            setTimeout(() => {
                panelsContainer.innerHTML = '';
            }, 300);
        }
        activePanel = null;
    }

    // Form handlers
    function handleMakeSelection(selectedMake) {
        const modelSelect = document.getElementById('bikeModel');
        const yearSelect = document.getElementById('bikeYear');

        modelSelect.innerHTML = '<option value="">Select Model</option>';
        yearSelect.innerHTML = '<option value="">Select Year</option>';
        yearSelect.disabled = true;

        if (selectedMake) {
            modelSelect.disabled = false;
            Object.entries(bikeModels[selectedMake].models).forEach(([key, model]) => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = model.name;
                modelSelect.appendChild(option);
            });
        } else {
            modelSelect.disabled = true;
        }
    }

    function handleModelSelection(selectedModel) {
        const yearSelect = document.getElementById('bikeYear');
        const selectedMake = document.getElementById('bikeMake').value;

        yearSelect.innerHTML = '<option value="">Select Year</option>';

        if (selectedModel) {
            yearSelect.disabled = false;
            const years = bikeModels[selectedMake].models[selectedModel].years;
            years.forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            });
        } else {
            yearSelect.disabled = true;
        }
    }

    function submitCompatibilityForm() {
        const make = document.getElementById('bikeMake').value;
        const model = document.getElementById('bikeModel').value;
        const year = document.getElementById('bikeYear').value;

        if (make && model && year) {
            window.location.href = `/bike-parts.html?make=${make}&model=${model}&year=${year}`;
        }
    }

    // No placeholder functions needed anymore

    // Add to your existing event listeners
    document.addEventListener('DOMContentLoaded', function() {
        // ... existing code ...

        // Handle custom builder
        document.addEventListener('change', function(e) {
            if (e.target.closest('.builder-section')) {
                updateBuildSummary();
            }
        });

        document.addEventListener('click', function(e) {
            if (e.target.closest('.save-build-btn')) {
                saveBuild();
            }
        });
    });

    function updateBuildSummary() {
        const selectedParts = {
            engine: document.querySelector('input[name="engine"]:checked'),
            suspension: document.querySelector('input[name="suspension"]:checked'),
            exhaust: document.querySelector('input[name="exhaust"]:checked'),
            brakes: document.querySelector('input[name="brakes"]:checked'),
            wheels: document.querySelector('input[name="wheels"]:checked')
        };

        const summaryDiv = document.querySelector('.selected-parts');
        const saveButton = document.querySelector('.save-build-btn');
        let totalPrice = 0;
        let partsSelected = false;

        let summaryHTML = '';
        Object.entries(selectedParts).forEach(([category, input]) => {
            if (input) {
                partsSelected = true;
                const partId = input.value;
                const part = customBuilderParts[category].find(p => p.id === partId);
                totalPrice += part.price;
                summaryHTML += `
                    <div class="summary-item">
                        <span>${part.name}</span>
                        <span>₹${part.price.toLocaleString('en-IN')}</span>
                    </div>
                `;
            }
        });

        summaryDiv.innerHTML = partsSelected ? summaryHTML : '<p>No parts selected</p>';
        document.querySelector('.total-price span').textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
        saveButton.disabled = !partsSelected;
    }

    function saveBuild() {
        const selectedParts = {
            engine: document.querySelector('input[name="engine"]:checked'),
            suspension: document.querySelector('input[name="suspension"]:checked'),
            exhaust: document.querySelector('input[name="exhaust"]:checked'),
            brakes: document.querySelector('input[name="brakes"]:checked'),
            wheels: document.querySelector('input[name="wheels"]:checked')
        };

        const build = {
            id: Date.now(),
            date: new Date().toISOString(),
            parts: {},
            totalPrice: 0
        };

        Object.entries(selectedParts).forEach(([category, input]) => {
            if (input) {
                const partId = input.value;
                const part = customBuilderParts[category].find(p => p.id === partId);
                build.parts[category] = part;
                build.totalPrice += part.price;
            }
        });

        // Save to localStorage
        const savedBuilds = JSON.parse(localStorage.getItem('savedBuilds') || '[]');
        savedBuilds.push(build);
        localStorage.setItem('savedBuilds', JSON.stringify(savedBuilds));

        // Show success message
        alert('Build saved successfully! You can view it in your garage.');
    }

    // Add these styles
    style.textContent += `
        .builder-intro {
            text-align: center;
            margin-bottom: 30px;
        }

        .builder-intro h4 {
            margin: 0;
            color: white;
            font-size: 24px;
        }

        .builder-intro p {
            margin: 10px 0 0;
            color: #999;
        }

        .builder-sections {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-bottom: 30px;
        }

        .builder-section {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 20px;
        }

        .builder-section h5 {
            margin: 0 0 15px;
            color: white;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 16px;
        }

        .builder-section h5 i {
            color: #E31E24;
        }

        .parts-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .part-option {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .part-option:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .part-option input {
            margin-top: 4px;
        }

        .part-details {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        .part-details strong {
            color: white;
        }

        .part-details small {
            color: #999;
        }

        .part-price {
            color: #E31E24;
            font-weight: bold;
        }

        .builder-summary {
            position: sticky;
            bottom: 0;
            background: rgba(42, 42, 42, 0.98);
            backdrop-filter: blur(10px);
            margin: 0 -20px -20px;
            padding: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .summary-content {
            margin-bottom: 15px;
        }

        .summary-content h4 {
            margin: 0 0 10px;
            color: white;
        }

        .selected-parts {
            margin-bottom: 15px;
        }

        .summary-item {
            display: flex;
            justify-content: space-between;
            color: #999;
            margin-bottom: 5px;
        }

        .total-price {
            display: flex;
            justify-content: space-between;
            color: white;
            font-size: 18px;
            padding-top: 10px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .save-build-btn {
            width: 100%;
            padding: 15px;
            background: #E31E24;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s ease;
        }

        .save-build-btn:hover:not(:disabled) {
            background: #ff2a2a;
            transform: translateY(-2px);
        }

        .save-build-btn:disabled {
            background: #666;
            cursor: not-allowed;
        }
    `;
});

// Add styles dynamically
const style = document.createElement('style');
style.textContent = `
    .menu-content {
        position: fixed;
        top: 0;
        left: 0;
        width: 300px;
        height: 100vh;
        background: rgba(42, 42, 42, 0.98);
        backdrop-filter: blur(10px);
        z-index: 1000;
        padding: 80px 20px 20px;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    }

    .features-menu {
        padding: 20px;
        color: white;
    }

    .features-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .features-header h3 {
        font-size: 18px;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .features-header i {
        color: #E31E24;
    }

    .close-features {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
    }

    .features-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .feature-btn {
        display: flex;
        align-items: center;
        gap: 15px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 15px;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .feature-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateX(5px);
    }

    .feature-btn i:first-child {
        font-size: 1.2em;
        color: #E31E24;
        width: 24px;
        text-align: center;
    }

    .feature-btn span {
        flex: 1;
        text-align: left;
        display: flex;
        flex-direction: column;
    }

    .feature-btn small {
        color: #999;
        font-size: 0.8em;
    }

    .panels-container {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        pointer-events: none;
    }

    .panel {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        max-width: 400px;
        height: 100%;
        background: rgba(42, 42, 42, 0.98);
        backdrop-filter: blur(10px);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        pointer-events: auto;
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
    }

    .panel.active {
        transform: translateX(0);
    }

    .panel-header {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .panel-header h3 {
        flex: 1;
        margin: 0;
        font-size: 18px;
        color: white;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .panel-header i {
        color: #E31E24;
    }

    .back-btn, .close-panel {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        font-size: 1.2em;
    }

    .panel-content {
        padding: 20px;
        color: white;
    }

    #compatibilityForm {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    #compatibilityForm select {
        padding: 12px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 14px;
    }

    #compatibilityForm select:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    #compatibilityForm select:focus {
        outline: none;
        border-color: #E31E24;
    }

    .check-btn {
        background: #E31E24;
        color: white;
        border: none;
        padding: 12px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 14px;
        transition: all 0.3s ease;
    }

    .check-btn:hover {
        background: #ff2a2a;
        transform: translateY(-2px);
    }

    @media (max-width: 480px) {
        .panel {
            max-width: 100%;
        }
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        color: #fff;
        font-weight: bold;
    }

    .condition-options {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .condition-option {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .condition-option:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .condition-option input {
        display: none;
    }

    .condition-option input:checked + .condition-label {
        color: #E31E24;
    }

    .condition-label {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 10px;
        color: white;
    }

    .condition-label small {
        color: #999;
        margin-left: auto;
    }

    .mileage-input {
        position: relative;
    }

    .mileage-input input {
        width: 100%;
        padding: 12px;
        padding-right: 40px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        color: white;
    }

    .mileage-input .unit {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
    }

    textarea {
        width: 100%;
        padding: 12px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        color: white;
        resize: vertical;
        min-height: 80px;
    }

    .estimate-result {
        background: rgba(227, 30, 36, 0.1);
        border: 1px solid rgba(227, 30, 36, 0.2);
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
        text-align: center;
    }

    .estimate-result h4 {
        color: white;
        margin: 0 0 10px;
    }

    .estimate-value {
        font-size: 32px;
        font-weight: bold;
        color: #E31E24;
        margin: 10px 0;
    }

    .estimate-note {
        color: #999;
        font-size: 12px;
        margin: 0;
    }

    .submit-btn {
        width: 100%;
        padding: 15px;
        background: #E31E24;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.3s ease;
    }

    .submit-btn:hover {
        background: #ff2a2a;
        transform: translateY(-2px);
    }

    .garage-actions {
        margin-bottom: 20px;
    }

    .action-btn {
        background: #E31E24;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        transition: all 0.3s ease;
    }

    .action-btn:hover {
        background: #ff2a2a;
        transform: translateY(-2px);
    }

    .garage-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .garage-item {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .bike-info {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .bike-info i {
        font-size: 24px;
        color: #E31E24;
    }

    .bike-details h4 {
        margin: 0;
        color: white;
    }

    .bike-details p {
        margin: 5px 0 0;
        color: #999;
        font-size: 14px;
    }

    .bike-actions {
        display: flex;
        gap: 10px;
    }

    .bike-actions button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        opacity: 0.7;
        transition: all 0.3s ease;
    }

    .bike-actions button:hover {
        opacity: 1;
        transform: scale(1.1);
    }

    .empty-garage {
        text-align: center;
        padding: 40px 20px;
        color: #999;
    }

    .empty-garage i {
        font-size: 48px;
        color: #E31E24;
        margin-bottom: 20px;
    }

    .empty-garage p {
        margin: 0;
        font-size: 18px;
        color: white;
    }

    .empty-garage small {
        display: block;
        margin-top: 5px;
    }

    .add-bike-form, .edit-bike-form {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 20px;
    }

    .add-bike-form h4, .edit-bike-form h4 {
        margin: 0 0 20px;
        color: white;
    }

    .form-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }

    .cancel-btn, .cancel-edit-btn {
        flex: 1;
        padding: 12px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .cancel-btn:hover, .cancel-edit-btn:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

document.head.appendChild(style); 

// Add garage functionality
const garageStorage = {
    getGarage: () => {
        const garage = localStorage.getItem('myGarage');
        return garage ? JSON.parse(garage) : [];
    },
    saveGarage: (garage) => {
        localStorage.setItem('myGarage', JSON.stringify(garage));
    },
    addBike: (bike) => {
        const garage = garageStorage.getGarage();
        garage.push({ ...bike, id: Date.now() });
        garageStorage.saveGarage(garage);
    },
    removeBike: (bikeId) => {
        const garage = garageStorage.getGarage();
        const updatedGarage = garage.filter(bike => bike.id !== bikeId);
        garageStorage.saveGarage(updatedGarage);
    },
    updateBike: (bikeId, updates) => {
        const garage = garageStorage.getGarage();
        const index = garage.findIndex(bike => bike.id === bikeId);
        if (index !== -1) {
            garage[index] = { ...garage[index], ...updates };
            garageStorage.saveGarage(garage);
        }
    }
};

function createGarageHTML() {
    const garage = garageStorage.getGarage();
    
    return `
        <div class="garage-panel panel">
            <div class="panel-header">
                <button class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h3><i class="fas fa-warehouse"></i> My Garage</h3>
                <button class="close-panel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="panel-content">
                <div class="garage-actions">
                    <button id="addBikeBtn" class="primary-button">
                        <i class="fas fa-plus"></i> Add New Bike
                    </button>
                </div>

                <div id="garageList" class="garage-list">
                    ${garage.length > 0 ? garage.map(bike => `
                        <div class="garage-item" data-id="${bike.id}">
                            <div class="bike-info">
                                <i class="fas fa-motorcycle"></i>
                                <div class="bike-details">
                                    <h4>${bike.make} ${bike.model}</h4>
                                    <p>${bike.year} • ${bike.mileage}km</p>
                                </div>
                            </div>
                            <div class="bike-actions">
                                <button class="edit-bike" data-id="${bike.id}">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="remove-bike" data-id="${bike.id}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `).join('') : `
                        <div class="empty-garage">
                            <i class="fas fa-motorcycle"></i>
                            <p>Your garage is empty</p>
                            <small>Add your first bike to get started</small>
                        </div>
                    `}
                </div>

                <div id="addBikeForm" class="add-bike-form" style="display: none;">
                    <h4>Add New Bike</h4>
                    <form id="garageForm">
                        <select id="garageMake" required>
                            <option value="">Select Make</option>
                            ${Object.entries(bikeModels).map(([key, make]) => 
                                `<option value="${key}">${make.name}</option>`
                            ).join('')}
                        </select>
                        <select id="garageModel" required disabled>
                            <option value="">Select Model</option>
                        </select>
                        <select id="garageYear" required disabled>
                            <option value="">Select Year</option>
                        </select>
                        <div class="mileage-input">
                            <input type="number" id="garageMileage" required placeholder="Current Mileage">
                            <span class="unit">km</span>
                        </div>
                        <textarea id="garageNotes" placeholder="Notes (optional)"></textarea>
                        <div class="form-actions">
                            <button type="button" id="cancelAddBike" class="cancel-btn">Cancel</button>
                            <button type="submit" class="submit-btn">Add to Garage</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

// Add to your existing event listeners
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Handle garage interactions
    document.addEventListener('click', function(e) {
        if (e.target.id === 'addBikeBtn') {
            document.getElementById('addBikeForm').style.display = 'block';
            document.getElementById('garageList').style.display = 'none';
            e.target.style.display = 'none';
        }

        if (e.target.id === 'cancelAddBike') {
            document.getElementById('addBikeForm').style.display = 'none';
            document.getElementById('garageList').style.display = 'block';
            document.getElementById('addBikeBtn').style.display = 'block';
        }

        if (e.target.closest('.remove-bike')) {
            const bikeId = parseInt(e.target.closest('.remove-bike').dataset.id);
            if (confirm('Are you sure you want to remove this bike from your garage?')) {
                garageStorage.removeBike(bikeId);
                refreshGarage();
            }
        }

        if (e.target.closest('.edit-bike')) {
            const bikeId = parseInt(e.target.closest('.edit-bike').dataset.id);
            const garage = garageStorage.getGarage();
            const bike = garage.find(b => b.id === bikeId);
            if (bike) {
                showEditBikeForm(bike);
            }
        }
    });

    document.addEventListener('change', function(e) {
        if (e.target.id === 'garageMake') {
            handleGarageMakeSelection(e.target.value);
        }
        if (e.target.id === 'garageModel') {
            handleGarageModelSelection(e.target.value);
        }
    });

    document.addEventListener('submit', function(e) {
        if (e.target.id === 'garageForm') {
            e.preventDefault();
            const formData = {
                make: document.getElementById('garageMake').value,
                model: document.getElementById('garageModel').value,
                year: document.getElementById('garageYear').value,
                mileage: document.getElementById('garageMileage').value,
                notes: document.getElementById('garageNotes').value
            };

            garageStorage.addBike(formData);
            refreshGarage();
            
            // Reset form and show garage list
            e.target.reset();
            document.getElementById('addBikeForm').style.display = 'none';
            document.getElementById('garageList').style.display = 'block';
            document.getElementById('addBikeBtn').style.display = 'block';
        }
    });
});

function handleGarageMakeSelection(selectedMake) {
    const modelSelect = document.getElementById('garageModel');
    const yearSelect = document.getElementById('garageYear');

    modelSelect.innerHTML = '<option value="">Select Model</option>';
    yearSelect.innerHTML = '<option value="">Select Year</option>';
    yearSelect.disabled = true;

    if (selectedMake && bikeModels[selectedMake]) {
        modelSelect.disabled = false;
        Object.entries(bikeModels[selectedMake].models).forEach(([key, model]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = model.name;
            modelSelect.appendChild(option);
        });
    } else {
        modelSelect.disabled = true;
    }
}

function handleGarageModelSelection(selectedModel) {
    const yearSelect = document.getElementById('garageYear');
    const selectedMake = document.getElementById('garageMake').value;

    yearSelect.innerHTML = '<option value="">Select Year</option>';

    if (selectedModel && bikeModels[selectedMake].models[selectedModel]) {
        yearSelect.disabled = false;
        bikeModels[selectedMake].models[selectedModel].years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        });
    } else {
        yearSelect.disabled = true;
    }
}

function refreshGarage() {
    const garagePanel = document.querySelector('.garage-panel');
    if (garagePanel) {
        const newGaragePanel = createGarageHTML();
        garagePanel.outerHTML = newGaragePanel;
    }
}

function showEditBikeForm(bike) {
    const editForm = `
        <div class="edit-bike-form">
            <h4>Edit Bike</h4>
            <form id="editGarageForm" data-bike-id="${bike.id}">
                <div class="mileage-input">
                    <input type="number" id="editMileage" required value="${bike.mileage}" placeholder="Current Mileage">
                    <span class="unit">km</span>
                </div>
                <textarea id="editNotes" placeholder="Notes (optional)">${bike.notes || ''}</textarea>
                <div class="form-actions">
                    <button type="button" class="cancel-edit-btn">Cancel</button>
                    <button type="submit" class="submit-btn">Save Changes</button>
                </div>
            </form>
        </div>
    `;

    const garageItem = document.querySelector(`.garage-item[data-id="${bike.id}"]`);
    garageItem.innerHTML = editForm;
}

// Add custom builder data
const customBuilderParts = {
    engine: [
        { id: 9, name: 'Racing Engine Kit', price: 150000, description: 'High-performance racing engine kit with increased power output' },
        { id: 10, name: 'Street Performance Engine', price: 120000, description: 'Balanced performance for street and track use' },
        { id: 11, name: 'Standard Engine Rebuild Kit', price: 80000, description: 'Complete engine rebuild kit with OEM specifications' }
    ],
    suspension: [
        { id: 12, name: 'Öhlins Racing Suspension', price: 85000, description: 'Professional racing suspension system' },
        { id: 13, name: 'Showa Premium Suspension', price: 65000, description: 'High-quality suspension for street and track' },
        { id: 14, name: 'Standard Suspension Kit', price: 45000, description: 'OEM-grade suspension system' }
    ],
    exhaust: [
        { id: 15, name: 'Akrapovič Full System', price: 75000, description: 'Full titanium exhaust system' },
        { id: 16, name: 'Yoshimura Slip-on', price: 45000, description: 'High-performance slip-on exhaust' },
        { id: 17, name: 'Standard Exhaust System', price: 25000, description: 'OEM-style exhaust system' }
    ],
    brakes: [
        { id: 18, name: 'Brembo GP4-RX Caliper Kit', price: 95000, description: 'Professional racing brake system' },
        { id: 19, name: 'Performance Brake Kit', price: 65000, description: 'Enhanced braking for street and track' },
        { id: 20, name: 'Standard Brake Kit', price: 35000, description: 'OEM-specification brake system' }
    ],
    wheels: [
        { id: 21, name: 'Marchesini Forged Wheels', price: 120000, description: 'Lightweight forged aluminum wheels' },
        { id: 22, name: 'OZ Racing Wheels', price: 90000, description: 'Performance aluminum wheels' },
        { id: 23, name: 'Standard Alloy Wheels', price: 50000, description: 'OEM-style alloy wheels' }
    ]
};

function createBuilderHTML() {
    return `
        <div class="builder-panel panel">
            <div class="panel-header">
                <button class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h3><i class="fas fa-wrench"></i> Custom Builder</h3>
                <button class="close-panel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="panel-content">
                <div class="builder-intro">
                    <h4>Build Your Dream Bike</h4>
                    <p>Select components to create your perfect custom build</p>
                </div>

                <div class="builder-sections">
                    <div class="builder-section" data-section="engine">
                        <h5><i class="fas fa-cog"></i> Engine</h5>
                        <div class="parts-list">
                            ${customBuilderParts.engine.map(part => `
                                <label class="part-option">
                                    <input type="radio" name="engine" value="${part.id}">
                                    <span class="part-details">
                                        <strong>${part.name}</strong>
                                        <small>${part.description}</small>
                                        <span class="part-price">₹${part.price.toLocaleString('en-IN')}</span>
                                    </span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="builder-section" data-section="suspension">
                        <h5><i class="fas fa-compress-alt"></i> Suspension</h5>
                        <div class="parts-list">
                            ${customBuilderParts.suspension.map(part => `
                                <label class="part-option">
                                    <input type="radio" name="suspension" value="${part.id}">
                                    <span class="part-details">
                                        <strong>${part.name}</strong>
                                        <small>${part.description}</small>
                                        <span class="part-price">₹${part.price.toLocaleString('en-IN')}</span>
                                    </span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="builder-section" data-section="exhaust">
                        <h5><i class="fas fa-wind"></i> Exhaust</h5>
                        <div class="parts-list">
                            ${customBuilderParts.exhaust.map(part => `
                                <label class="part-option">
                                    <input type="radio" name="exhaust" value="${part.id}">
                                    <span class="part-details">
                                        <strong>${part.name}</strong>
                                        <small>${part.description}</small>
                                        <span class="part-price">₹${part.price.toLocaleString('en-IN')}</span>
                                    </span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="builder-section" data-section="brakes">
                        <h5><i class="fas fa-brake-code"></i> Brakes</h5>
                        <div class="parts-list">
                            ${customBuilderParts.brakes.map(part => `
                                <label class="part-option">
                                    <input type="radio" name="brakes" value="${part.id}">
                                    <span class="part-details">
                                        <strong>${part.name}</strong>
                                        <small>${part.description}</small>
                                        <span class="part-price">₹${part.price.toLocaleString('en-IN')}</span>
                                    </span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="builder-section" data-section="wheels">
                        <h5><i class="fas fa-circle"></i> Wheels</h5>
                        <div class="parts-list">
                            ${customBuilderParts.wheels.map(part => `
                                <label class="part-option">
                                    <input type="radio" name="wheels" value="${part.id}">
                                    <span class="part-details">
                                        <strong>${part.name}</strong>
                                        <small>${part.description}</small>
                                        <span class="part-price">₹${part.price.toLocaleString('en-IN')}</span>
                                    </span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="builder-summary">
                    <div class="summary-content">
                        <h4>Build Summary</h4>
                        <div class="selected-parts">
                            <p>No parts selected</p>
                        </div>
                        <div class="total-price">
                            <strong>Total:</strong>
                            <span>₹0</span>
                        </div>
                    </div>
                    <button class="save-build-btn" disabled>
                        <i class="fas fa-save"></i> Save Build
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Add to your existing event listeners
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Handle custom builder
    document.addEventListener('change', function(e) {
        if (e.target.closest('.builder-section')) {
            updateBuildSummary();
        }
    });

    document.addEventListener('click', function(e) {
        if (e.target.closest('.save-build-btn')) {
            saveBuild();
        }
    });
});

function updateBuildSummary() {
    const selectedParts = {
        engine: document.querySelector('input[name="engine"]:checked'),
        suspension: document.querySelector('input[name="suspension"]:checked'),
        exhaust: document.querySelector('input[name="exhaust"]:checked'),
        brakes: document.querySelector('input[name="brakes"]:checked'),
        wheels: document.querySelector('input[name="wheels"]:checked')
    };

    const summaryDiv = document.querySelector('.selected-parts');
    const saveButton = document.querySelector('.save-build-btn');
    let totalPrice = 0;
    let partsSelected = false;

    let summaryHTML = '';
    Object.entries(selectedParts).forEach(([category, input]) => {
        if (input) {
            partsSelected = true;
            const partId = input.value;
            const part = customBuilderParts[category].find(p => p.id === partId);
            totalPrice += part.price;
            summaryHTML += `
                <div class="summary-item">
                    <span>${part.name}</span>
                    <span>₹${part.price.toLocaleString('en-IN')}</span>
                </div>
            `;
        }
    });

    summaryDiv.innerHTML = partsSelected ? summaryHTML : '<p>No parts selected</p>';
    document.querySelector('.total-price span').textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
    saveButton.disabled = !partsSelected;
}

function saveBuild() {
    const selectedParts = {
        engine: document.querySelector('input[name="engine"]:checked'),
        suspension: document.querySelector('input[name="suspension"]:checked'),
        exhaust: document.querySelector('input[name="exhaust"]:checked'),
        brakes: document.querySelector('input[name="brakes"]:checked'),
        wheels: document.querySelector('input[name="wheels"]:checked')
    };

    const build = {
        id: Date.now(),
        date: new Date().toISOString(),
        parts: {},
        totalPrice: 0
    };

    Object.entries(selectedParts).forEach(([category, input]) => {
        if (input) {
            const partId = input.value;
            const part = customBuilderParts[category].find(p => p.id === partId);
            build.parts[category] = part;
            build.totalPrice += part.price;
        }
    });

    // Save to localStorage
    const savedBuilds = JSON.parse(localStorage.getItem('savedBuilds') || '[]');
    savedBuilds.push(build);
    localStorage.setItem('savedBuilds', JSON.stringify(savedBuilds));

    // Show success message
    alert('Build saved successfully! You can view it in your garage.');
}

function createBundlesHTML() {
    return `
        <div class="bundles-panel panel">
            <div class="panel-header">
                <button class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h3><i class="fas fa-box-open"></i> Bundle Kits</h3>
                <button class="close-panel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="panel-content">
                <div class="bundles-intro">
                    <h4>Pre-packaged Upgrade Kits</h4>
                    <p>Save money with our curated bundles for specific riding styles</p>
                </div>

                <div class="bundles-grid">
                    <div class="bundle-card">
                        <div class="bundle-header">
                            <i class="fas fa-flag-checkered"></i>
                            <h5>Track Day Kit</h5>
                        </div>
                        <div class="bundle-content">
                            <ul class="bundle-items">
                                <li><i class="fas fa-check"></i> Racing Slick Tires</li>
                                <li><i class="fas fa-check"></i> Performance Brake Pads</li>
                                <li><i class="fas fa-check"></i> Quick-shifter</li>
                                <li><i class="fas fa-check"></i> Race Fairings</li>
                            </ul>
                            <div class="bundle-price">
                                <span class="original-price">₹89,999</span>
                                <span class="discounted-price">₹74,999</span>
                            </div>
                            <button class="view-bundle-btn">View Details</button>
                        </div>
                    </div>

                    <div class="bundle-card">
                        <div class="bundle-header">
                            <i class="fas fa-route"></i>
                            <h5>Touring Pack</h5>
                        </div>
                        <div class="bundle-content">
                            <ul class="bundle-items">
                                <li><i class="fas fa-check"></i> Touring Windscreen</li>
                                <li><i class="fas fa-check"></i> Comfort Seat</li>
                                <li><i class="fas fa-check"></i> Saddlebags</li>
                                <li><i class="fas fa-check"></i> Tank Bag</li>
                            </ul>
                            <div class="bundle-price">
                                <span class="original-price">₹64,999</span>
                                <span class="discounted-price">₹54,999</span>
                            </div>
                            <button class="view-bundle-btn">View Details</button>
                        </div>
                    </div>

                    <div class="bundle-card">
                        <div class="bundle-header">
                            <i class="fas fa-mountain"></i>
                            <h5>Adventure Kit</h5>
                        </div>
                        <div class="bundle-content">
                            <ul class="bundle-items">
                                <li><i class="fas fa-check"></i> Off-road Tires</li>
                                <li><i class="fas fa-check"></i> Crash Guards</li>
                                <li><i class="fas fa-check"></i> Skid Plate</li>
                                <li><i class="fas fa-check"></i> LED Fog Lights</li>
                            </ul>
                            <div class="bundle-price">
                                <span class="original-price">₹79,999</span>
                                <span class="discounted-price">₹67,999</span>
                            </div>
                            <button class="view-bundle-btn">View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Handle feature button clicks
document.querySelectorAll('.feature-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const feature = btn.getAttribute('data-feature');
        const panel = document.querySelector(`.${feature}-panel`);
        if (panel) {
            hideAllPanels();
            panel.style.display = 'block';
            setTimeout(() => panel.classList.add('active'), 10);
        }
    });
});

// Add ThrottleTalk HTML generation
function createThrottleTalkHTML() {
    return `
        <div class="throttletalk-panel">
            <div class="panel-header">
                <h2><i class="fas fa-comments"></i> ThrottleTalk Community</h2>
                <button class="close-panel"><i class="fas fa-times"></i></button>
            </div>
            <div class="panel-content">
                <div class="channels-list">
                    <a href="throttletalk.html#diy" class="channel-preview">
                        <i class="fas fa-tools"></i>
                        <div class="channel-info">
                            <strong>🛠️ DIY Mods & Builds</strong>
                            <small>Share custom builds and mods</small>
                        </div>
                    </a>
                    <a href="throttletalk.html#tech-help" class="channel-preview">
                        <i class="fas fa-question-circle"></i>
                        <div class="channel-info">
                            <strong>❓ Tech Help</strong>
                            <small>Ask about issues or compatibility</small>
                        </div>
                    </a>
                    <a href="throttletalk.html#events" class="channel-preview">
                        <i class="fas fa-calendar"></i>
                        <div class="channel-info">
                            <strong>🏍️ Ride Events</strong>
                            <small>Coordinate meetups and rides</small>
                        </div>
                    </a>
                    <a href="throttletalk.html#showcase" class="channel-preview">
                        <i class="fas fa-camera"></i>
                        <div class="channel-info">
                            <strong>📸 Show Your Ride</strong>
                            <small>Post bike pics and gear</small>
                        </div>
                    </a>
                    <a href="throttletalk.html#deals" class="channel-preview">
                        <i class="fas fa-tag"></i>
                        <div class="channel-info">
                            <strong>🔥 Deals & Drops</strong>
                            <small>Exclusive community offers</small>
                        </div>
                    </a>
                    <a href="throttletalk.html#general" class="channel-preview">
                        <i class="fas fa-comments"></i>
                        <div class="channel-info">
                            <strong>💬 General Chat</strong>
                            <small>Casual discussions</small>
                        </div>
                    </a>
                </div>
                <div class="community-stats">
                    <div class="stat">
                        <i class="fas fa-users"></i>
                        <div class="stat-info">
                            <strong>5,234</strong>
                            <small>Members</small>
                        </div>
                    </div>
                    <div class="stat">
                        <i class="fas fa-comments"></i>
                        <div class="stat-info">
                            <strong>1,287</strong>
                            <small>Online</small>
                        </div>
                    </div>
                    <div class="stat">
                        <i class="fas fa-message"></i>
                        <div class="stat-info">
                            <strong>23,456</strong>
                            <small>Messages Today</small>
                        </div>
                    </div>
                </div>
                <div class="join-community">
                    <a href="throttletalk.html" class="primary-button">
                        <i class="fas fa-right-to-bracket"></i>
                        Join the Community
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Add ThrottleTalk initialization
function initThrottleTalk() {
    const closeBtn = document.querySelector('.throttletalk-panel .close-panel');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideFeaturePanel);
    }

    const channelPreviews = document.querySelectorAll('.channel-preview');
    channelPreviews.forEach(preview => {
        preview.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            window.location.href = href;
        });
    });
}

// Create features menu HTML
function createFeaturesMenuHTML() {
    return `
        <div class="features-menu">
            <div class="features-header">
                <h3><i class="fas fa-tools"></i> Tools & Features</h3>
                <button class="close-features">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="features-list">
                <button class="feature-btn" data-feature="compatibility" id="openCompatibilityChecker">
                    <i class="fas fa-motorcycle"></i>
                    <span>
                        <strong>Bike-Specific Compatibility Checker</strong>
                        <small>Find parts for your bike</small>
                    </span>
                    <i class="fas fa-chevron-right"></i>
                </button>
                <button class="feature-btn" data-feature="virtual-garage" id="openVirtualGarage">
                    <i class="fas fa-warehouse"></i>
                    <span>
                        <strong>Virtual Garage</strong>
                        <small>Manage your bikes and maintenance</small>
                    </span>
                    <i class="fas fa-chevron-right"></i>
                </button>
                <button class="feature-btn" data-feature="bundle-kits" id="openBundleKits">
                    <i class="fas fa-box"></i>
                    <span>
                        <strong>Bundle Kits</strong>
                        <small>Pre-packaged upgrade kits with discounts</small>
                    </span>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    `;
}

// ... existing code ...

// Handle feature button clicks
document.addEventListener('click', function(e) {
    if (e.target.closest('.feature-btn')) {
        const feature = e.target.closest('.feature-btn').dataset.feature;
        showFeaturePanel(feature);
    }
});

function showFeaturePanel(feature) {
    const panel = document.createElement('div');
    panel.className = 'feature-panel';
    
    switch(feature) {
        case 'compatibility':
            panel.innerHTML = compatibilityHTML;
            break;
        case 'virtual-garage':
            panel.innerHTML = virtualGarageHTML;
            break;
        case 'bundle-kits':
            panel.innerHTML = bundleKitsHTML;
            break;
        // ... other cases ...
    }
    
    document.body.appendChild(panel);
    setTimeout(() => panel.classList.add('active'), 10);
    
    // Initialize feature-specific functionality
    switch(feature) {
        case 'compatibility':
            initCompatibility();
            break;
        case 'virtual-garage':
            initVirtualGarage();
            break;
        case 'bundle-kits':
            initBundleKits();
            break;
        // ... other cases ...
    }
}

// ... existing code ...

// Initialize garage functionality
function initGarage() {
    const addBikeBtn = document.getElementById('addBikeBtn');
    const addBikeForm = document.getElementById('addBikeForm');
    const garageList = document.getElementById('garageList');
    const newBikeForm = document.getElementById('newBikeForm');
    const cancelBtn = document.querySelector('.cancel-btn');
    const bikeMake = document.getElementById('bikeMake');
    const bikeModel = document.getElementById('bikeModel');
    const bikeYear = document.getElementById('bikeYear');

    // Load saved bikes
    loadGarage();

    // Add bike button click
    addBikeBtn.addEventListener('click', () => {
        addBikeForm.style.display = 'block';
        addBikeBtn.style.display = 'none';
    });

    // Cancel button click
    cancelBtn.addEventListener('click', () => {
        addBikeForm.style.display = 'none';
        addBikeBtn.style.display = 'block';
        newBikeForm.reset();
    });

    // Handle make selection
    bikeMake.addEventListener('change', () => {
        const selectedMake = bikeMake.value;
        if (selectedMake) {
            bikeModel.disabled = false;
            bikeModel.innerHTML = '<option value="">Select Model</option>' +
                bikes.filter(bike => bike.name.startsWith(selectedMake))
                    .map(bike => `<option value="${bike.name}">${bike.name}</option>`)
                    .join('');
        } else {
            bikeModel.disabled = true;
            bikeModel.innerHTML = '<option value="">Select Model</option>';
        }
        bikeYear.disabled = true;
        bikeYear.innerHTML = '<option value="">Select Year</option>';
    });

    // Handle model selection
    bikeModel.addEventListener('change', () => {
        const selectedModel = bikeModel.value;
        if (selectedModel) {
            bikeYear.disabled = false;
            bikeYear.innerHTML = '<option value="">Select Year</option>' +
                Array.from({length: 25}, (_, i) => new Date().getFullYear() - i)
                    .map(year => `<option value="${year}">${year}</option>`)
                    .join('');
        } else {
            bikeYear.disabled = true;
            bikeYear.innerHTML = '<option value="">Select Year</option>';
        }
    });

    // Handle form submission
    newBikeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const bike = {
            id: Date.now(),
            make: bikeMake.value,
            model: bikeModel.value,
            year: bikeYear.value,
            mileage: document.getElementById('bikeMileage').value,
            lastService: document.getElementById('lastServiceDate').value,
            maintenanceReminders: []
        };

        // Save bike to localStorage
        const garage = JSON.parse(localStorage.getItem('garage') || '[]');
        garage.push(bike);
        localStorage.setItem('garage', JSON.stringify(garage));

        // Reset form and UI
        newBikeForm.reset();
        addBikeForm.style.display = 'none';
        addBikeBtn.style.display = 'block';

        // Reload garage
        loadGarage();
    });
}

// Load garage bikes
function loadGarage() {
    const garageList = document.getElementById('garageList');
    const garage = JSON.parse(localStorage.getItem('garage') || '[]');

    if (garage.length === 0) {
        garageList.innerHTML = `
            <div class="empty-garage">
                <i class="fas fa-warehouse"></i>
                <p>Your garage is empty</p>
                <small>Add your first bike to get started</small>
            </div>
        `;
        return;
    }

    garageList.innerHTML = garage.map(bike => `
        <div class="garage-item" data-id="${bike.id}">
            <div class="bike-info">
                <i class="fas fa-motorcycle"></i>
                <div class="bike-details">
                    <h4>${bike.model}</h4>
                    <p>${bike.year} • ${bike.mileage} km</p>
                </div>
            </div>
            <div class="bike-actions">
                <button class="maintenance-btn" title="Maintenance">
                    <i class="fas fa-tools"></i>
                </button>
                <button class="parts-btn" title="Compatible Parts">
                    <i class="fas fa-cogs"></i>
                </button>
                <button class="delete-btn" title="Remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners for bike actions
    document.querySelectorAll('.maintenance-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const bikeId = btn.closest('.garage-item').dataset.id;
            showMaintenancePanel(bikeId);
        });
    });

    document.querySelectorAll('.parts-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const bikeId = btn.closest('.garage-item').dataset.id;
            showCompatibleParts(bikeId);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const bikeId = btn.closest('.garage-item').dataset.id;
            deleteBike(bikeId);
        });
    });
}

// Show maintenance panel
function showMaintenancePanel(bikeId) {
    const garage = JSON.parse(localStorage.getItem('garage') || '[]');
    const bike = garage.find(b => b.id === parseInt(bikeId));
    
    if (!bike) return;

    const panel = document.createElement('div');
    panel.className = 'maintenance-panel panel';
    panel.innerHTML = `
        <div class="panel-header">
            <button class="back-btn">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h3><i class="fas fa-tools"></i> Maintenance Schedule</h3>
            <button class="close-panel">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="maintenance-content">
            <div class="bike-info">
                <h4>${bike.model}</h4>
                <p>${bike.year} • ${bike.mileage} km</p>
            </div>
            <div class="maintenance-actions">
                <button class="primary-button" id="addReminderBtn">
                    <i class="fas fa-plus"></i> Add Reminder
                </button>
            </div>
            <div class="reminders-list" id="remindersList">
                ${bike.maintenanceReminders.map(reminder => `
                    <div class="reminder-item">
                        <div class="reminder-info">
                            <h5>${reminder.type}</h5>
                            <p>Due: ${new Date(reminder.dueDate).toLocaleDateString()}</p>
                        </div>
                        <div class="reminder-actions">
                            <button class="complete-btn" data-id="${reminder.id}">
                                <i class="fas fa-check"></i>
                            </button>
                            <button class="delete-btn" data-id="${reminder.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="add-reminder-form" id="addReminderForm" style="display: none;">
                <h4>Add Maintenance Reminder</h4>
                <form id="newReminderForm">
                    <div class="form-group">
                        <label>Maintenance Type</label>
                        <select id="reminderType" required>
                            <option value="">Select Type</option>
                            <option value="Oil Change">Oil Change</option>
                            <option value="Chain Service">Chain Service</option>
                            <option value="Brake Service">Brake Service</option>
                            <option value="Tire Change">Tire Change</option>
                            <option value="General Service">General Service</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Due Date</label>
                        <input type="date" id="dueDate" required>
                    </div>
                    <div class="form-group">
                        <label>Notes</label>
                        <textarea id="reminderNotes" rows="3"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="cancel-btn">Cancel</button>
                        <button type="submit" class="submit-btn">Add Reminder</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Add panel to container
    const panelsContainer = document.querySelector('.panels-container');
    panelsContainer.appendChild(panel);
    setTimeout(() => panel.classList.add('active'), 10);

    // Add event listeners
    const addReminderBtn = panel.querySelector('#addReminderBtn');
    const addReminderForm = panel.querySelector('#addReminderForm');
    const newReminderForm = panel.querySelector('#newReminderForm');
    const cancelBtn = panel.querySelector('.cancel-btn');
    const backBtn = panel.querySelector('.back-btn');
    const closeBtn = panel.querySelector('.close-panel');

    addReminderBtn.addEventListener('click', () => {
        addReminderForm.style.display = 'block';
        addReminderBtn.style.display = 'none';
    });

    cancelBtn.addEventListener('click', () => {
        addReminderForm.style.display = 'none';
        addReminderBtn.style.display = 'block';
        newReminderForm.reset();
    });

    newReminderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const reminder = {
            id: Date.now(),
            type: document.getElementById('reminderType').value,
            dueDate: document.getElementById('dueDate').value,
            notes: document.getElementById('reminderNotes').value,
            completed: false
        };

        // Add reminder to bike
        const garage = JSON.parse(localStorage.getItem('garage') || '[]');
        const bikeIndex = garage.findIndex(b => b.id === parseInt(bikeId));
        if (bikeIndex !== -1) {
            garage[bikeIndex].maintenanceReminders.push(reminder);
            localStorage.setItem('garage', JSON.stringify(garage));
        }

        // Reset form and UI
        newReminderForm.reset();
        addReminderForm.style.display = 'none';
        addReminderBtn.style.display = 'block';

        // Reload maintenance panel
        panel.remove();
        showMaintenancePanel(bikeId);
    });

    backBtn.addEventListener('click', () => {
        panel.classList.remove('active');
        setTimeout(() => panel.remove(), 300);
    });

    closeBtn.addEventListener('click', () => {
        panel.classList.remove('active');
        setTimeout(() => panel.remove(), 300);
    });
}

// Show compatible parts
function showCompatibleParts(bikeId) {
    const garage = JSON.parse(localStorage.getItem('garage') || '[]');
    const bike = garage.find(b => b.id === parseInt(bikeId));
    
    if (!bike) return;

    const panel = document.createElement('div');
    panel.className = 'parts-panel panel';
    panel.innerHTML = `
        <div class="panel-header">
            <button class="back-btn">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h3><i class="fas fa-cogs"></i> Compatible Parts</h3>
            <button class="close-panel">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="parts-content">
            <div class="bike-info">
                <h4>${bike.model}</h4>
                <p>${bike.year} • ${bike.mileage} km</p>
            </div>
            <div class="parts-categories">
                <button class="category-btn active" data-category="all">All Parts</button>
                <button class="category-btn" data-category="performance">Performance</button>
                <button class="category-btn" data-category="maintenance">Maintenance</button>
                <button class="category-btn" data-category="accessories">Accessories</button>
            </div>
            <div class="parts-grid" id="partsGrid">
                <!-- Parts will be loaded here -->
            </div>
        </div>
    `;

    // Add panel to container
    const panelsContainer = document.querySelector('.panels-container');
    panelsContainer.appendChild(panel);
    setTimeout(() => panel.classList.add('active'), 10);

    // Load compatible parts
    loadCompatibleParts(bike, panel.querySelector('#partsGrid'));

    // Add event listeners
    const backBtn = panel.querySelector('.back-btn');
    const closeBtn = panel.querySelector('.close-panel');
    const categoryBtns = panel.querySelectorAll('.category-btn');

    backBtn.addEventListener('click', () => {
        panel.classList.remove('active');
        setTimeout(() => panel.remove(), 300);
    });

    closeBtn.addEventListener('click', () => {
        panel.classList.remove('active');
        setTimeout(() => panel.remove(), 300);
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadCompatibleParts(bike, panel.querySelector('#partsGrid'), btn.dataset.category);
        });
    });
}

// Load compatible parts
function loadCompatibleParts(bike, container, category = 'all') {
    // Filter parts based on bike model and category
    const compatibleParts = parts.filter(part => {
        const isCompatible = part.compatibleWith.includes(bike.model);
        if (category === 'all') return isCompatible;
        return isCompatible && part.category === category;
    });

    if (compatibleParts.length === 0) {
        container.innerHTML = `
            <div class="empty-parts">
                <i class="fas fa-cogs"></i>
                <p>No compatible parts found</p>
                <small>Try a different category</small>
            </div>
        `;
        return;
    }

    container.innerHTML = compatibleParts.map(part => `
        <div class="part-card">
            <div class="part-image">
                <img src="${part.image}" alt="${part.name}">
            </div>
            <div class="part-info">
                <h5>${part.name}</h5>
                <p class="part-category">${part.category}</p>
                <p class="part-price">₹${formatIndianPrice(part.price)}</p>
                <button class="add-to-cart-btn" data-part-id="${part.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners for add to cart buttons
    container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const partId = btn.dataset.partId;
            const part = compatibleParts.find(p => p.id === partId);
            if (part) {
                addToCart(part);
                showCartNotification(`${part.name} added to cart`);
            }
        });
    });
}

// Delete bike from garage
function deleteBike(bikeId) {
    if (confirm('Are you sure you want to remove this bike from your garage?')) {
        const garage = JSON.parse(localStorage.getItem('garage') || '[]');
        const updatedGarage = garage.filter(bike => bike.id !== parseInt(bikeId));
        localStorage.setItem('garage', JSON.stringify(updatedGarage));
        loadGarage();
    }
}

// ... existing code ...

// Initialize guides functionality
function initGuides() {
    const guidesGrid = document.getElementById('guidesGrid');
    const uploadGuideBtn = document.getElementById('uploadGuideBtn');
    const uploadForm = document.getElementById('uploadForm');
    const newGuideForm = document.getElementById('newGuideForm');
    const cancelBtn = document.querySelector('.cancel-btn');
    const searchInput = document.getElementById('guidesSearch');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');

    let selectedDifficulty = null;

    // Initialize sample guides if none exist
    if (!localStorage.getItem('guides')) {
        const sampleGuides = [
            {
                id: 1,
                title: "How to Install Öhlins TTX GP Shock",
                category: "official",
                partType: "suspension",
                difficulty: "2",
                content: "Step 1: Remove the old shock\nStep 2: Install the new Öhlins TTX GP shock\nStep 3: Adjust preload and damping settings\nStep 4: Test ride and fine-tune",
                videoUrl: "https://www.youtube.com/watch?v=8X2kFbM6yJw",
                images: [],
                author: "Öhlins Racing",
                date: "2024-03-15T10:00:00Z",
                ratings: [
                    { id: 1, rating: 5, user: "User1", date: "2024-03-16T10:00:00Z" },
                    { id: 2, rating: 4, user: "User2", date: "2024-03-17T10:00:00Z" }
                ],
                comments: [
                    {
                        id: 1,
                        author: "User1",
                        content: "Great tutorial! The shock installation was much easier than I expected.",
                        date: "2024-03-16T10:00:00Z"
                    }
                ]
            },
            {
                id: 2,
                title: "Brembo M4.32 Caliper Installation Guide",
                category: "official",
                partType: "brakes",
                difficulty: "2",
                content: "Step 1: Remove old caliper\nStep 2: Install new Brembo caliper\nStep 3: Bleed brake system\nStep 4: Test brakes before riding",
                videoUrl: "https://www.youtube.com/watch?v=QZPcUFyJ8Po",
                images: [],
                author: "Brembo",
                date: "2024-03-14T10:00:00Z",
                ratings: [
                    { id: 1, rating: 5, user: "User3", date: "2024-03-15T10:00:00Z" }
                ],
                comments: []
            },
            {
                id: 3,
                title: "Akrapovič Exhaust Installation",
                category: "official",
                partType: "exhaust",
                difficulty: "1",
                content: "Step 1: Remove stock exhaust\nStep 2: Install Akrapovič system\nStep 3: Check for leaks\nStep 4: Enjoy the sound!",
                videoUrl: "https://www.youtube.com/watch?v=6X5U4zB5pgU",
                images: [],
                author: "Akrapovič",
                date: "2024-03-13T10:00:00Z",
                ratings: [
                    { id: 1, rating: 5, user: "User4", date: "2024-03-14T10:00:00Z" },
                    { id: 2, rating: 5, user: "User5", date: "2024-03-15T10:00:00Z" }
                ],
                comments: [
                    {
                        id: 1,
                        author: "User4",
                        content: "Perfect fit and amazing sound quality!",
                        date: "2024-03-14T10:00:00Z"
                    }
                ]
            },
            {
                id: 4,
                title: "Dynojet Power Commander Installation",
                category: "community",
                partType: "electrical",
                difficulty: "3",
                content: "Step 1: Locate ECU\nStep 2: Install Power Commander\nStep 3: Connect to laptop\nStep 4: Upload map\nStep 5: Test ride",
                videoUrl: "https://www.youtube.com/watch?v=2YQqW8P3dsY",
                images: [],
                author: "Community Expert",
                date: "2024-03-12T10:00:00Z",
                ratings: [
                    { id: 1, rating: 4, user: "User6", date: "2024-03-13T10:00:00Z" }
                ],
                comments: []
            },
            {
                id: 5,
                title: "Quick Shifter Installation Guide",
                category: "videos",
                partType: "electrical",
                difficulty: "2",
                content: "Step 1: Mount sensor\nStep 2: Connect to ECU\nStep 3: Adjust sensitivity\nStep 4: Test on track",
                videoUrl: "https://www.youtube.com/watch?v=1YQqW8P3dsY",
                images: [],
                author: "Track Day Pro",
                date: "2024-03-11T10:00:00Z",
                ratings: [
                    { id: 1, rating: 5, user: "User7", date: "2024-03-12T10:00:00Z" },
                    { id: 2, rating: 4, user: "User8", date: "2024-03-13T10:00:00Z" }
                ],
                comments: [
                    {
                        id: 1,
                        author: "User7",
                        content: "Made my track days so much better!",
                        date: "2024-03-12T10:00:00Z"
                    }
                ]
            }
        ];
        localStorage.setItem('guides', JSON.stringify(sampleGuides));
    }

    // Load guides
    loadGuides();

    // Upload guide button click
    uploadGuideBtn.addEventListener('click', () => {
        uploadForm.style.display = 'block';
        uploadGuideBtn.style.display = 'none';
    });

    // Cancel button click
    cancelBtn.addEventListener('click', () => {
        uploadForm.style.display = 'none';
        uploadGuideBtn.style.display = 'block';
        newGuideForm.reset();
        selectedDifficulty = null;
        difficultyBtns.forEach(btn => btn.classList.remove('active'));
    });

    // Search functionality
    searchInput.addEventListener('input', debounce(() => {
        const searchTerm = searchInput.value.toLowerCase();
        filterGuides(searchTerm);
    }, 300));

    // Category filter
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterGuides(searchInput.value.toLowerCase(), btn.dataset.category);
        });
    });

    // Difficulty selection
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            difficultyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedDifficulty = btn.dataset.level;
        });
    });

    // Form submission
    newGuideForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const guide = {
            id: Date.now(),
            title: document.getElementById('guideTitle').value,
            category: document.getElementById('guideCategory').value,
            partType: document.getElementById('guidePartType').value,
            difficulty: selectedDifficulty,
            content: document.getElementById('guideContent').value,
            videoUrl: document.getElementById('guideVideo').value,
            images: [], // Handle image uploads here
            author: 'Current User', // Replace with actual user
            date: new Date().toISOString(),
            ratings: [],
            comments: []
        };

        // Save guide to localStorage
        const guides = JSON.parse(localStorage.getItem('guides') || '[]');
        guides.push(guide);
        localStorage.setItem('guides', JSON.stringify(guides));

        // Reset form and UI
        newGuideForm.reset();
        uploadForm.style.display = 'none';
        uploadGuideBtn.style.display = 'block';
        selectedDifficulty = null;
        difficultyBtns.forEach(btn => btn.classList.remove('active'));

        // Reload guides
        loadGuides();
    });
}

// Load guides
function loadGuides(searchTerm = '', category = 'all') {
    const guidesGrid = document.getElementById('guidesGrid');
    const guides = JSON.parse(localStorage.getItem('guides') || '[]');

    // Filter guides
    const filteredGuides = guides.filter(guide => {
        const matchesSearch = guide.title.toLowerCase().includes(searchTerm) ||
                            guide.content.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || guide.category === category;
        return matchesSearch && matchesCategory;
    });

    if (filteredGuides.length === 0) {
        guidesGrid.innerHTML = `
            <div class="empty-guides">
                <i class="fas fa-book"></i>
                <p>No guides found</p>
                <small>Try a different search or category</small>
            </div>
        `;
        return;
    }

    guidesGrid.innerHTML = filteredGuides.map(guide => `
        <div class="guide-card">
            <div class="guide-header">
                <div class="guide-category">
                    <span class="category-badge ${guide.category}">${guide.category}</span>
                    <span class="difficulty-badge level-${guide.difficulty}">
                        ${getDifficultyLabel(guide.difficulty)}
                    </span>
                </div>
                <div class="guide-actions">
                    <button class="rate-btn" title="Rate Guide">
                        <i class="fas fa-star"></i>
                    </button>
                    <button class="share-btn" title="Share Guide">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
            <div class="guide-content">
                <h4>${guide.title}</h4>
                <p class="guide-meta">
                    <span><i class="fas fa-user"></i> ${guide.author}</span>
                    <span><i class="fas fa-calendar"></i> ${formatDate(guide.date)}</span>
                </p>
                <p class="guide-excerpt">${guide.content.substring(0, 150)}...</p>
                ${guide.videoUrl ? `
                    <div class="guide-video">
                        <iframe src="${getEmbedUrl(guide.videoUrl)}" frameborder="0" allowfullscreen></iframe>
                    </div>
                ` : ''}
                ${guide.images.length > 0 ? `
                    <div class="guide-images">
                        ${guide.images.map(img => `
                            <img src="${img}" alt="Guide Image">
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="guide-footer">
                <div class="guide-stats">
                    <span><i class="fas fa-star"></i> ${getAverageRating(guide.ratings)}</span>
                    <span><i class="fas fa-comment"></i> ${guide.comments.length}</span>
                </div>
                <button class="view-guide-btn" data-id="${guide.id}">
                    View Full Guide
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners
    document.querySelectorAll('.view-guide-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const guideId = btn.dataset.id;
            showGuideDetails(guideId);
        });
    });

    document.querySelectorAll('.rate-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const guideCard = btn.closest('.guide-card');
            const guideId = guideCard.querySelector('.view-guide-btn').dataset.id;
            showRatingModal(guideId);
        });
    });

    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const guideCard = btn.closest('.guide-card');
            const guideId = guideCard.querySelector('.view-guide-btn').dataset.id;
            shareGuide(guideId);
        });
    });
}

// Show guide details
function showGuideDetails(guideId) {
    const guides = JSON.parse(localStorage.getItem('guides') || '[]');
    const guide = guides.find(g => g.id === parseInt(guideId));
    
    if (!guide) return;

    const panel = document.createElement('div');
    panel.className = 'guide-details-panel panel';
    panel.innerHTML = `
        <div class="panel-header">
            <button class="back-btn">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h3><i class="fas fa-book"></i> Guide Details</h3>
            <button class="close-panel">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="guide-details-content">
            <div class="guide-header">
                <div class="guide-category">
                    <span class="category-badge ${guide.category}">${guide.category}</span>
                    <span class="difficulty-badge level-${guide.difficulty}">
                        ${getDifficultyLabel(guide.difficulty)}
                    </span>
                </div>
                <div class="guide-actions">
                    <button class="rate-btn" title="Rate Guide">
                        <i class="fas fa-star"></i>
                    </button>
                    <button class="share-btn" title="Share Guide">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
            <h2>${guide.title}</h2>
            <div class="guide-meta">
                <span><i class="fas fa-user"></i> ${guide.author}</span>
                <span><i class="fas fa-calendar"></i> ${formatDate(guide.date)}</span>
                <span><i class="fas fa-star"></i> ${getAverageRating(guide.ratings)}</span>
            </div>
            ${guide.videoUrl ? `
                <div class="guide-video">
                    <iframe src="${getEmbedUrl(guide.videoUrl)}" frameborder="0" allowfullscreen></iframe>
                </div>
            ` : ''}
            <div class="guide-content">
                ${guide.content.split('\n').map(paragraph => `
                    <p>${paragraph}</p>
                `).join('')}
            </div>
            ${guide.images.length > 0 ? `
                <div class="guide-images">
                    ${guide.images.map(img => `
                        <img src="${img}" alt="Guide Image">
                    `).join('')}
                </div>
            ` : ''}
            <div class="guide-comments">
                <h4>Comments</h4>
                <div class="comments-list">
                    ${guide.comments.map(comment => `
                        <div class="comment">
                            <div class="comment-header">
                                <span class="comment-author">${comment.author}</span>
                                <span class="comment-date">${formatDate(comment.date)}</span>
                            </div>
                            <p>${comment.content}</p>
                        </div>
                    `).join('')}
                </div>
                <form class="comment-form">
                    <textarea placeholder="Add a comment..." required></textarea>
                    <button type="submit">Post Comment</button>
                </form>
            </div>
        </div>
    `;

    // Add panel to container
    const panelsContainer = document.querySelector('.panels-container');
    panelsContainer.appendChild(panel);
    setTimeout(() => panel.classList.add('active'), 10);

    // Add event listeners
    const backBtn = panel.querySelector('.back-btn');
    const closeBtn = panel.querySelector('.close-panel');
    const rateBtn = panel.querySelector('.rate-btn');
    const shareBtn = panel.querySelector('.share-btn');
    const commentForm = panel.querySelector('.comment-form');

    backBtn.addEventListener('click', () => {
        panel.classList.remove('active');
        setTimeout(() => panel.remove(), 300);
    });

    closeBtn.addEventListener('click', () => {
        panel.classList.remove('active');
        setTimeout(() => panel.remove(), 300);
    });

    rateBtn.addEventListener('click', () => {
        showRatingModal(guideId);
    });

    shareBtn.addEventListener('click', () => {
        shareGuide(guideId);
    });

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const content = commentForm.querySelector('textarea').value;
        
        // Add comment to guide
        const guides = JSON.parse(localStorage.getItem('guides') || '[]');
        const guideIndex = guides.findIndex(g => g.id === parseInt(guideId));
        if (guideIndex !== -1) {
            guides[guideIndex].comments.push({
                id: Date.now(),
                author: 'Current User', // Replace with actual user
                content: content,
                date: new Date().toISOString()
            });
            localStorage.setItem('guides', JSON.stringify(guides));
        }

        // Reset form and reload guide details
        commentForm.reset();
        panel.remove();
        showGuideDetails(guideId);
    });
}

// Show rating modal
function showRatingModal(guideId) {
    const modal = document.createElement('div');
    modal.className = 'rating-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h4>Rate this Guide</h4>
            <div class="rating-stars">
                ${Array.from({length: 5}, (_, i) => `
                    <button class="star-btn" data-rating="${i + 1}">
                        <i class="far fa-star"></i>
                    </button>
                `).join('')}
            </div>
            <div class="modal-actions">
                <button class="cancel-btn">Cancel</button>
                <button class="submit-btn" disabled>Submit Rating</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);

    let selectedRating = 0;
    const starBtns = modal.querySelectorAll('.star-btn');
    const submitBtn = modal.querySelector('.submit-btn');

    starBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const rating = parseInt(btn.dataset.rating);
            selectedRating = rating;
            
            // Update stars
            starBtns.forEach((star, index) => {
                star.innerHTML = `<i class="${index < rating ? 'fas' : 'far'} fa-star"></i>`;
            });

            submitBtn.disabled = false;
        });
    });

    modal.querySelector('.cancel-btn').addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    });

    submitBtn.addEventListener('click', () => {
        if (selectedRating > 0) {
            // Add rating to guide
            const guides = JSON.parse(localStorage.getItem('guides') || '[]');
            const guideIndex = guides.findIndex(g => g.id === parseInt(guideId));
            if (guideIndex !== -1) {
                guides[guideIndex].ratings.push({
                    id: Date.now(),
                    rating: selectedRating,
                    user: 'Current User', // Replace with actual user
                    date: new Date().toISOString()
                });
                localStorage.setItem('guides', JSON.stringify(guides));
            }

            // Close modal and reload guides
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
                loadGuides();
            }, 300);
        }
    });
}

// Share guide
function shareGuide(guideId) {
    const guides = JSON.parse(localStorage.getItem('guides') || '[]');
    const guide = guides.find(g => g.id === parseInt(guideId));
    
    if (!guide) return;

    const shareUrl = `${window.location.origin}/guide/${guideId}`;
    const shareText = `Check out this guide: ${guide.title}`;

    if (navigator.share) {
        navigator.share({
            title: guide.title,
            text: shareText,
            url: shareUrl
        }).catch(console.error);
    } else {
        // Fallback for browsers that don't support Web Share API
        const tempInput = document.createElement('input');
        tempInput.value = shareUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        showNotification('Link copied to clipboard!');
    }
}

// Helper functions
function getDifficultyLabel(level) {
    switch (level) {
        case '1': return 'Beginner';
        case '2': return 'Intermediate';
        case '3': return 'Advanced';
        default: return 'Unknown';
    }
}

function getAverageRating(ratings) {
    if (!ratings.length) return 'No ratings';
    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    return (sum / ratings.length).toFixed(1);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getEmbedUrl(url) {
    // Convert YouTube URL to embed URL
    if (url.includes('youtube.com/watch')) {
        const videoId = url.split('v=')[1];
        return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('active'), 10);
    setTimeout(() => {
        notification.classList.remove('active');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ... existing code ...

// Initialize all features
function initializeFeatures() {
    initMenuButton();
    initCart();
    initSearch();
    initCompatibility();
    initBundles();
    initConfigurator();
    initGarage();
    initGuides(); // Add this line to initialize guides
}

// ... existing code ...

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeFeatures();
    loadCart();
    updateCartCount();
    updateCartTotal();
});

// ... existing code ...

// Bike compatibility data
const bikeData = {
    makes: ['Yamaha', 'Honda', 'Kawasaki', 'Suzuki', 'BMW', 'Ducati', 'KTM', 'Triumph', 'Harley-Davidson'],
    models: {
        'Yamaha': ['R1', 'R6', 'MT-10', 'MT-07', 'YZF-R3'],
        'Honda': ['CBR1000RR', 'CBR600RR', 'CB1000R', 'CB650R', 'CBR500R'],
        'Kawasaki': ['Ninja ZX-10R', 'Ninja ZX-6R', 'Ninja 400', 'Z900', 'Versys 1000'],
        'Suzuki': ['GSX-R1000', 'GSX-R600', 'GSX-S1000', 'SV650', 'V-Strom 650'],
        'BMW': ['S1000RR', 'M1000RR', 'R1250GS', 'F900R', 'F850GS'],
        'Ducati': ['Panigale V4', 'Streetfighter V4', 'Monster', 'Multistrada', 'Scrambler'],
        'KTM': ['1290 Super Duke R', '890 Duke', '390 Duke', '1290 Super Adventure', '790 Adventure'],
        'Triumph': ['Street Triple', 'Speed Triple', 'Tiger 900', 'Bonneville', 'Rocket 3'],
        'Harley-Davidson': ['Street Bob', 'Road King', 'Sport Glide', 'Low Rider', 'Pan America']
    },
    years: Array.from({length: 25}, (_, i) => (new Date().getFullYear() - i).toString())
};

// Sample compatible parts data
const compatibleParts = {
    'Yamaha R1 2020': [
        { name: 'Full System Exhaust', description: 'Complete exhaust system with headers and muffler', price: '$1,299.99' },
        { name: 'ECU Flash Kit', description: 'Performance ECU tuning kit', price: '$499.99' },
        { name: 'Quick Shifter', description: 'Electronic quick shifter for seamless gear changes', price: '$299.99' }
    ],
    'Honda CBR1000RR 2020': [
        { name: 'Race Fairing Kit', description: 'Complete race fairing set', price: '$899.99' },
        { name: 'Brembo Brake Kit', description: 'Upgraded brake system with calipers and rotors', price: '$1,499.99' },
        { name: 'Öhlins Suspension', description: 'Complete suspension upgrade kit', price: '$2,999.99' }
    ]
};

// Initialize compatibility checker
function initCompatibility() {
    const compatibilityBtn = document.querySelector('.feature-btn[data-feature="compatibility"]');
    if (compatibilityBtn) {
        compatibilityBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showCompatibilityPanel();
        });
    }
}

// Show compatibility panel
function showCompatibilityPanel() {
    // Create panel if it doesn't exist
    if (!document.querySelector('.compatibility-panel')) {
        const panel = document.createElement('div');
        panel.className = 'compatibility-panel';
        panel.innerHTML = `
            <div class="compatibility-header">
                <h3><i class="fas fa-motorcycle"></i> Bike Compatibility Checker</h3>
                <button class="close-compatibility">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="compatibility-content">
                <div class="compatibility-form">
                    <div class="form-group">
                        <label for="bike-make">Make</label>
                        <select id="bike-make">
                            <option value="">Select Make</option>
                            ${bikeData.makes.map(make => `<option value="${make}">${make}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="bike-model">Model</label>
                        <select id="bike-model" disabled>
                            <option value="">Select Model</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="bike-year">Year</label>
                        <select id="bike-year">
                            <option value="">Select Year</option>
                            ${bikeData.years.map(year => `<option value="${year}">${year}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="vin-decoder">
                    <h4>Or Enter VIN</h4>
                    <div class="form-group">
                        <input type="text" id="vin-input" placeholder="Enter 17-digit VIN" maxlength="17">
                    </div>
                </div>
                <div class="compatibility-results" style="display: none;">
                    <h4>Compatible Parts</h4>
                    <div class="compatible-parts"></div>
                </div>
            </div>
        `;
        document.body.appendChild(panel);

        // Add event listeners
        const closeBtn = panel.querySelector('.close-compatibility');
        closeBtn.addEventListener('click', hideCompatibilityPanel);

        const makeSelect = panel.querySelector('#bike-make');
        const modelSelect = panel.querySelector('#bike-model');
        const yearSelect = panel.querySelector('#bike-year');
        const vinInput = panel.querySelector('#vin-input');

        makeSelect.addEventListener('change', function() {
            const make = this.value;
            modelSelect.disabled = !make;
            modelSelect.innerHTML = '<option value="">Select Model</option>';
            if (make && bikeData.models[make]) {
                bikeData.models[make].forEach(model => {
                    modelSelect.innerHTML += `<option value="${model}">${model}</option>`;
                });
            }
        });

        // Check compatibility when all selections are made
        [makeSelect, modelSelect, yearSelect].forEach(select => {
            select.addEventListener('change', checkCompatibility);
        });

        vinInput.addEventListener('input', function() {
            if (this.value.length === 17) {
                decodeVIN(this.value);
            }
        });
    }

    // Show panel
    const panel = document.querySelector('.compatibility-panel');
    if (panel) {
        panel.classList.add('active');
    }
}

// Hide compatibility panel
function hideCompatibilityPanel() {
    const panel = document.querySelector('.compatibility-panel');
    if (panel) {
        panel.classList.remove('active');
    }
}

// Check compatibility based on selections
function checkCompatibility() {
    const make = document.querySelector('#bike-make').value;
    const model = document.querySelector('#bike-model').value;
    const year = document.querySelector('#bike-year').value;

    if (make && model && year) {
        const bikeKey = `${make} ${model} ${year}`;
        const results = document.querySelector('.compatibility-results');
        const partsContainer = document.querySelector('.compatible-parts');

        if (compatibleParts[bikeKey]) {
            partsContainer.innerHTML = compatibleParts[bikeKey].map(part => `
                <div class="part-item">
                    <h5>${part.name}</h5>
                    <p>${part.description}</p>
                    <p><strong>${part.price}</strong></p>
                </div>
            `).join('');
            results.style.display = 'block';
        } else {
            partsContainer.innerHTML = '<p>No compatible parts found for this bike.</p>';
            results.style.display = 'block';
        }
    }
}

// Decode VIN and show compatible parts
function decodeVIN(vin) {
    // This is a simplified VIN decoder
    // In a real application, you would validate the VIN and decode it properly
    const make = vin.substring(0, 1);
    const year = vin.substring(9, 10);
    
    // For demo purposes, we'll just show some sample parts
    const results = document.querySelector('.compatibility-results');
    const partsContainer = document.querySelector('.compatible-parts');
    
    partsContainer.innerHTML = `
        <div class="part-item">
            <h5>Universal Fit Parts</h5>
            <p>Parts that fit most motorcycles</p>
            <p><strong>$299.99 - $1,999.99</strong></p>
        </div>
    `;
    results.style.display = 'block';
}

// ... existing code ...

// Add compatibility checker panel logic
document.addEventListener('DOMContentLoaded', function() {
    const menuContent = document.querySelector('.menu-content');
    if (!menuContent) return;
    
    // Create panels container if it doesn't exist
    let panelsContainer = document.querySelector('.panels-container');
    if (!panelsContainer) {
        panelsContainer = document.createElement('div');
        panelsContainer.className = 'panels-container';
        document.body.appendChild(panelsContainer);
    }

    // Handle feature button clicks
    document.addEventListener('click', function(e) {
        const featureBtn = e.target.closest('.feature-btn');
        if (featureBtn) {
            const feature = featureBtn.dataset.feature;
            if (feature === 'compatibility') {
                // Close any open panel
                const existingPanel = panelsContainer.querySelector('.panel');
                if (existingPanel) {
                    existingPanel.classList.remove('active');
                    setTimeout(() => existingPanel.remove(), 300);
                }

                // Create and add the compatibility panel
                const panel = document.createElement('div');
                panel.className = 'compatibility-checker panel';
                panel.innerHTML = `
                    <div class="panel-header">
                        <button class="back-btn">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <h3><i class="fas fa-motorcycle"></i> Find Compatible Parts</h3>
                        <button class="close-panel">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form id="compatibilityForm">
                        <select id="bikeMake" required>
                            <option value="">Select Make</option>
                        </select>
                        <select id="bikeModel" required disabled>
                            <option value="">Select Model</option>
                        </select>
                        <select id="bikeYear" required disabled>
                            <option value="">Select Year</option>
                        </select>
                        <div class="vin-input">
                            <p>- OR -</p>
                            <input type="text" id="vinNumber" placeholder="Enter VIN Number">
                        </div>
                        <button type="submit" class="check-btn">
                            <i class="fas fa-search"></i> Find Parts
                        </button>
                    </form>
                    <div id="compatiblePartsResults"></div>
                `;

                panelsContainer.appendChild(panel);
                
                // Trigger the slide animation after a brief delay
                requestAnimationFrame(() => {
                    panel.classList.add('active');
                });

                // Add close button functionality
                const closeBtn = panel.querySelector('.close-panel');
                if (closeBtn) {
                    closeBtn.addEventListener('click', function() {
                        panel.classList.remove('active');
                        setTimeout(() => panel.remove(), 300);
                    });
                }

                // Add back button functionality
                const backBtn = panel.querySelector('.back-btn');
                if (backBtn) {
                    backBtn.addEventListener('click', function() {
                        panel.classList.remove('active');
                        setTimeout(() => panel.remove(), 300);
                    });
                }
            }
        }
    });
});

// ... existing code ...

// Bike configurator state
let currentBikeConfig = {
    baseModel: null,
    exhaust: null,
    wheels: null,
    fairings: null,
    brakes: null,
    totalPrice: 0,
    rotation: 0
};

// Initialize configurator
function initConfigurator() {
    const configuratorPanel = document.querySelector('.configurator-panel');
    if (!configuratorPanel) return;

    // Base model selection
    const baseModelSelect = document.getElementById('baseModel');
    if (baseModelSelect) {
        baseModelSelect.addEventListener('change', function() {
            currentBikeConfig.baseModel = this.value;
            updateConfiguratorPreview();
            updateTotalPrice();
        });
    }

    // Option tabs
    const optionTabs = document.querySelectorAll('.option-tab');
    const optionPanels = document.querySelectorAll('.option-panel');

    optionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            optionTabs.forEach(t => t.classList.remove('active'));
            optionPanels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const panel = document.getElementById(tab.dataset.tab + 'Panel');
            if (panel) panel.classList.add('active');
        });
    });

    // Part selection
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            const partType = this.dataset.part;
            const price = parseFloat(this.dataset.price);
            
            // Remove active class from other cards in same category
            const siblings = document.querySelectorAll(`.option-card[data-part="${partType}"]`);
            siblings.forEach(s => s.classList.remove('active'));
            
            // Toggle selection
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                currentBikeConfig[partType] = null;
            } else {
                this.classList.add('active');
                currentBikeConfig[partType] = {
                    id: this.dataset.id,
                    price: price
                };
            }
            
            updateConfiguratorPreview();
            updateTotalPrice();
        });
    });

    // Rotation controls
    const rotateButtons = document.querySelectorAll('.rotate-btn');
    rotateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const direction = btn.dataset.direction === 'left' ? -1 : 1;
            currentBikeConfig.rotation += direction * 90;
            updateConfiguratorPreview();
        });
    });

    // Share build button
    const shareBtn = document.querySelector('.share-build-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareBikeConfiguration);
    }

    // Save build button
    const saveBtn = document.querySelector('.save-build-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveBikeConfiguration);
    }
}

// Update bike preview based on selected parts
function updateConfiguratorPreview() {
    const preview = document.getElementById('bikePreview');
    if (!preview) return;

    // Apply rotation
    preview.style.transform = `rotate(${currentBikeConfig.rotation}deg)`;

    // Update preview image based on selected parts
    // In a real implementation, this would combine the different part images
    // For now, we'll just show the base model
    if (currentBikeConfig.baseModel) {
        preview.src = getBikeModelImage(currentBikeConfig.baseModel);
    }
}

// Update total price
function updateTotalPrice() {
    const totalPriceElement = document.querySelector('.total-price .price');
    if (!totalPriceElement) return;

    let total = 0;
    
    // Add base model price
    if (currentBikeConfig.baseModel) {
        total += getBaseModelPrice(currentBikeConfig.baseModel);
    }

    // Add selected parts prices
    ['exhaust', 'wheels', 'fairings', 'brakes'].forEach(part => {
        if (currentBikeConfig[part]) {
            total += currentBikeConfig[part].price;
        }
    });

    currentBikeConfig.totalPrice = total;
    totalPriceElement.textContent = `₹${total.toLocaleString('en-IN')}`;
}

// Share bike configuration
function shareBikeConfiguration() {
    const config = encodeURIComponent(JSON.stringify(currentBikeConfig));
    const shareUrl = `${window.location.origin}/configurator?config=${config}`;
    
    // Create a temporary input to copy the URL
    const tempInput = document.createElement('input');
    tempInput.value = shareUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Show notification
    showNotification('Configuration link copied to clipboard!');
}

// Save bike configuration
function saveBikeConfiguration() {
    const savedConfigs = JSON.parse(localStorage.getItem('savedBikeConfigs') || '[]');
    savedConfigs.push({
        ...currentBikeConfig,
        savedAt: new Date().toISOString()
    });
    localStorage.setItem('savedBikeConfigs', JSON.stringify(savedConfigs));
    showNotification('Configuration saved successfully!');
}

// Helper functions
function getBikeModelImage(model) {
    const bikeImages = {
        'sport': 'assets/images/bikes/sport-bike.jpg',
        'naked': 'assets/images/bikes/naked-bike.jpg',
        'touring': 'assets/images/bikes/touring-bike.jpg'
    };
    return bikeImages[model] || bikeImages['sport'];
}

function getBaseModelPrice(model) {
    const basePrices = {
        'sport': 1299999,
        'naked': 1099999,
        'touring': 1499999
    };
    return basePrices[model] || 0;
}

// Add event listener for configurator button
document.addEventListener('DOMContentLoaded', function() {
    const configuratorBtn = document.getElementById('openConfigurator');
    if (configuratorBtn) {
        configuratorBtn.addEventListener('click', function() {
            showFeaturePanel('configurator');
            initConfigurator();
        });
    }
});

// ... existing code ...

// Initialize Virtual Garage functionality
function initVirtualGarage() {
    const garageList = document.getElementById('garageList');
    const addBikeBtn = document.getElementById('addBikeBtn');
    const addBikeForm = document.getElementById('addBikeForm');
    const newBikeForm = document.getElementById('newBikeForm');
    const cancelAddBike = document.getElementById('cancelAddBike');

    // Load bikes from localStorage
    loadGarage();

    // Add bike button click handler
    addBikeBtn.addEventListener('click', () => {
        addBikeForm.style.display = 'block';
        garageList.style.display = 'none';
        addBikeBtn.style.display = 'none';
    });

    // Cancel add bike
    cancelAddBike.addEventListener('click', () => {
        addBikeForm.style.display = 'none';
        garageList.style.display = 'block';
        addBikeBtn.style.display = 'block';
        newBikeForm.reset();
    });

    // Form submission handler
    newBikeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const bike = {
            id: Date.now(),
            make: document.getElementById('bikeMake').value,
            model: document.getElementById('bikeModel').value,
            year: document.getElementById('bikeYear').value,
            odometer: document.getElementById('bikeOdometer').value,
            notes: document.getElementById('bikeNotes').value,
            maintenanceHistory: [],
            nextService: calculateNextService(document.getElementById('bikeOdometer').value)
        };
        addBikeToGarage(bike);
        newBikeForm.reset();
        addBikeForm.style.display = 'none';
        garageList.style.display = 'block';
        addBikeBtn.style.display = 'block';
    });
}

// Load garage from localStorage
function loadGarage() {
    const garageList = document.getElementById('garageList');
    const bikes = JSON.parse(localStorage.getItem('virtualGarage')) || [];
    
    if (bikes.length === 0) {
        garageList.innerHTML = `
            <div class="empty-garage">
                <i class="fas fa-motorcycle"></i>
                <p>Your garage is empty</p>
                <small>Add your first bike to get started</small>
            </div>
        `;
        return;
    }

    garageList.innerHTML = bikes.map(bike => createBikeCard(bike)).join('');
    attachBikeEventListeners();
}

// Create bike card HTML
function createBikeCard(bike) {
    const nextService = calculateNextService(bike.odometer);
    return `
        <div class="garage-item" data-bike-id="${bike.id}">
            <div class="bike-info">
                <i class="fas fa-motorcycle"></i>
                <div class="bike-details">
                    <h4>${bike.year} ${bike.make} ${bike.model}</h4>
                    <p>${bike.odometer} km | Next service: ${nextService} km</p>
                </div>
            </div>
            <div class="bike-actions">
                <button class="edit-bike" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-bike" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="primary-button add-maintenance" data-bike-id="${bike.id}">
                    <i class="fas fa-plus"></i> Add Maintenance Record
                </button>
            </div>
        </div>
    `;
}

// Calculate next service
function calculateNextService(currentOdometer) {
    const serviceInterval = 5000; // 5000 km between services
    return Math.ceil(currentOdometer / serviceInterval) * serviceInterval;
}

// Add bike to garage
function addBikeToGarage(bike) {
    const bikes = JSON.parse(localStorage.getItem('virtualGarage')) || [];
    bikes.push(bike);
    localStorage.setItem('virtualGarage', JSON.stringify(bikes));
    loadGarage();
}

// Attach event listeners to bike cards
function attachBikeEventListeners() {
    document.querySelectorAll('.delete-bike').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const bikeId = e.target.closest('.garage-item').dataset.bikeId;
            deleteBike(bikeId);
        });
    });

    document.querySelectorAll('.view-maintenance').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const bikeId = e.target.closest('.garage-item').dataset.bikeId;
            showMaintenanceHistory(bikeId);
        });
    });
}

// Delete bike from garage
function deleteBike(bikeId) {
    if (!confirm('Are you sure you want to remove this bike from your garage?')) {
        return;
    }
    
    const bikes = JSON.parse(localStorage.getItem('virtualGarage')) || [];
    const updatedBikes = bikes.filter(bike => bike.id !== parseInt(bikeId));
    localStorage.setItem('virtualGarage', JSON.stringify(updatedBikes));
    loadGarage();
}

// Show maintenance history
function showMaintenanceHistory(bikeId) {
    const bikes = JSON.parse(localStorage.getItem('virtualGarage')) || [];
    const bike = bikes.find(b => b.id === parseInt(bikeId));
    
    if (!bike) return;

    const maintenanceHTML = `
        <div class="maintenance-history panel">
            <div class="panel-header">
                <button class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h3><i class="fas fa-history"></i> Maintenance History</h3>
                <button class="close-panel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="panel-content">
                <h4>${bike.year} ${bike.make} ${bike.model}</h4>
                <div class="maintenance-list">
                    ${bike.maintenanceHistory.length === 0 ? 
                        '<p class="no-history">No maintenance history recorded</p>' :
                        bike.maintenanceHistory.map(record => `
                            <div class="maintenance-record">
                                <div class="record-date">${new Date(record.date).toLocaleDateString()}</div>
                                <div class="record-details">
                                    <strong>${record.type}</strong>
                                    <p>${record.notes}</p>
                                </div>
                                <div class="record-odometer">${record.odometer} km</div>
                            </div>
                        `).join('')
                    }
                </div>
                <button class="action-btn add-maintenance" data-bike-id="${bike.id}">
                    <i class="fas fa-plus"></i> Add Maintenance Record
                </button>
            </div>
        </div>
    `;

    const panelsContainer = document.querySelector('.panels-container');
    const existingPanel = panelsContainer.querySelector('.panel');
    if (existingPanel) {
        existingPanel.remove();
    }
    panelsContainer.insertAdjacentHTML('beforeend', maintenanceHTML);
    
    // Add event listeners for the new panel
    const newPanel = panelsContainer.querySelector('.maintenance-history');
    setTimeout(() => newPanel.classList.add('active'), 10);
}

// ... existing code ...

// Update the showFeaturePanel function to handle virtual garage
function showFeaturePanel(feature) {
    const panel = document.createElement('div');
    panel.className = 'feature-panel';
    
    switch(feature) {
        case 'compatibility':
            panel.innerHTML = compatibilityHTML;
            break;
        case 'virtual-garage':
            panel.innerHTML = virtualGarageHTML;
            break;
        case 'bundle-kits':
            panel.innerHTML = bundleKitsHTML;
            break;
        // ... other cases ...
    }
    
    document.body.appendChild(panel);
    setTimeout(() => panel.classList.add('active'), 10);
    
    // Initialize feature-specific functionality
    switch(feature) {
        case 'compatibility':
            initCompatibility();
            break;
        case 'virtual-garage':
            initVirtualGarage();
            break;
        case 'bundle-kits':
            initBundleKits();
            break;
        // ... other cases ...
    }
}

// ... existing code ...

// Initialize Bundle Kits functionality
function initBundleKits() {
    const bundleCategories = document.querySelectorAll('.category-btn');
    const bundleCards = document.querySelectorAll('.bundle-card');
    const addButtons = document.querySelectorAll('.add-bundle-btn');

    // Category filter functionality
    bundleCategories.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            
            // Update active button
            bundleCategories.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter bundles
            bundleCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Add to cart functionality
    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const bundleId = btn.getAttribute('data-bundle-id');
            const bundleName = btn.getAttribute('data-bundle-name');
            const bundlePrice = parseInt(btn.getAttribute('data-bundle-price'));

            // Create bundle product object
            const bundleProduct = {
                id: bundleId,
                name: bundleName,
                price: bundlePrice,
                image: 'https://placehold.co/400x300/2a2a2a/fff?text=Bundle+Kit',
                description: 'Bundle Kit',
                type: 'bundle',
                quantity: 1
            };

            // Add to cart using cart manager if available
            if (window.cartManager) {
                window.cartManager.addToCart(bundleProduct);
            } else {
                // Fallback to localStorage
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                const existingItem = cart.find(item => item.id === bundleId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push(bundleProduct);
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Update cart count
                const cartCount = document.querySelector('.cart-count');
                if (cartCount) {
                    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
                    cartCount.textContent = totalItems;
                    cartCount.classList.add('has-items');
                }
            }

            // Add to cart animation
            btn.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
            btn.classList.add('added');
            btn.disabled = true;

            // Show notification
            showNotification(`${bundleName} added to cart!`);

            // Reset button after 2 seconds
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
                btn.classList.remove('added');
                btn.disabled = false;
            }, 2000);
        });
    });
}

// Show notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ... existing code ...

// Contact form handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    const successMessage = document.querySelector('.success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = {
                name: this.querySelector('input[name="name"]').value,
                email: this.querySelector('input[name="email"]').value,
                subject: this.querySelector('input[name="subject"]').value,
                message: this.querySelector('textarea[name="message"]').value
            };

            try {
                const response = await fetch('/api/contact/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    // Show success message
                    successMessage.style.display = 'block';
                    successMessage.textContent = 'Message sent successfully!';
                    
                    // Clear form
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                } else {
                    throw new Error(data.message || 'Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to send message: ' + error.message);
            }
        });
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

// Initialize helmet search if on the helmets page
if (document.getElementById('helmetSearchInput')) {
    console.log('Initializing helmet search for helmet search input');
    initHelmetSearch();
}

// Initialize helmet search if on the helmets page
if (document.getElementById('helmetSearchInput')) {
    console.log('Helmet search input found, initializing...');
    initHelmetSearch();
} else {
    console.log('Helmet search input not found');
}

// Function to navigate to specific bike
function navigateToBike(bikeId, bikeName) {
    // Check if we're on the shop-by-bike page
    if (window.location.pathname.includes('shop-by-bike.html')) {
        // Scroll to the bike on current page
        scrollToBike(bikeId);
    } else {
        // Navigate to shop-by-bike page with bike ID
        window.location.href = `/shop-by-bike.html?bikeId=${bikeId}&search=${encodeURIComponent(bikeName)}`;
    }
}

// Function to navigate to specific products
function navigateToProduct(type, productId, productName) {
    let targetPage = '';
    
    switch(type) {
        case 'part':
            targetPage = '/bike-parts.html';
            break;
        case 'gear':
            targetPage = '/riding-gear.html';
            break;
        case 'apparel':
            targetPage = '/apparel.html';
            break;
        default:
            return;
    }
    
    // Navigate to the page with search parameters
    window.location.href = `${targetPage}?search=${encodeURIComponent(productName)}&productId=${productId}`;
}

// Function to highlight and scroll to searched product
function highlightSearchedProduct(searchTerm, productId) {
    // Find all product cards
    const productCards = document.querySelectorAll('.part-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('.part-name')?.textContent || '';
        const productIdAttr = card.querySelector('.view-details-btn')?.getAttribute('data-part-id') || 
                             card.querySelector('.view-details-btn')?.getAttribute('data-gear-id') ||
                             card.querySelector('.view-details-btn')?.getAttribute('data-apparel-id');
        
        // Check if this is the searched product
        if (productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
            productIdAttr === productId) {
            
            // Add highlight class
            card.classList.add('searched-product-highlight');
            
            // Scroll to the product
            const headerOffset = 100;
            const elementPosition = card.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                card.classList.remove('searched-product-highlight');
            }, 3000);
            
            return; // Found the product, exit loop
        }
    });
}

// ===== SEARCH FUNCTIONALITY =====

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initGlobalSearch();
});

// Main search initialization function
function initGlobalSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) {
        console.log('Search elements not found');
        return;
    }
    
    // Add input event listener for real-time search
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        performSearch(searchTerm);
    });
    
    // Add form submission handler
    const searchForm = searchInput.closest('form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.toLowerCase().trim();
            if (searchTerm.length >= 2) {
                performSearch(searchTerm);
            }
        });
    }
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchResults.contains(e.target) && !searchInput.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
    
    // Handle keyboard navigation
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchResults.style.display = 'none';
            searchInput.blur();
        }
    });
}

// Perform the actual search
function performSearch(searchTerm) {
    const searchResults = document.getElementById('searchResults');
    
    if (!searchTerm || searchTerm.length < 2) {
        searchResults.style.display = 'none';
        return;
    }
    
    // Search through bikes
    const bikeMatches = bikes.filter(bike => 
        (bike.name && bike.name.toLowerCase().includes(searchTerm)) ||
        (bike.specs && bike.specs.engine && bike.specs.engine.toLowerCase().includes(searchTerm)) ||
        (bike.specs && bike.specs.power && bike.specs.power.toLowerCase().includes(searchTerm))
    ).map(bike => ({ ...bike, category: 'Bike', type: 'bike' }));
    
    // Search through bike parts (improved matching)
    const partMatches = products.filter(product => {
        const nameMatch = product.name && product.name.toLowerCase().includes(searchTerm);
        const typeMatch = product.type && product.type.toLowerCase().includes(searchTerm);
        const specsMatch = product.specs && Array.isArray(product.specs) && product.specs.some(spec => spec && spec.toLowerCase().includes(searchTerm));
        const idValid = product.id !== undefined && product.id !== null && product.id !== '';
        const nameValid = product.name && product.name.trim() !== '';
        return (nameMatch || typeMatch || specsMatch) && idValid && nameValid;
    }).map(part => ({ ...part, category: 'Bike Part', type: 'part' }));
    
    // Search through helmets (from helmets.html)
    const helmetMatches = getHelmetData().filter(helmet => {
        const nameMatch = helmet.name && helmet.name.toLowerCase().includes(searchTerm);
        const brandMatch = helmet.brand && helmet.brand.toLowerCase().includes(searchTerm);
        const typeMatch = helmet.type && helmet.type.toLowerCase().includes(searchTerm);
        const featuresMatch = helmet.features && Array.isArray(helmet.features) && helmet.features.some(feature => feature && feature.toLowerCase().includes(searchTerm));
        return nameMatch || brandMatch || typeMatch || featuresMatch;
    }).map(helmet => ({ ...helmet, category: 'Helmet', type: 'helmet' }));
    
    // Search through riding gear (from riding-gear.html)
    const gearMatches = getGearData().filter(gear => {
        const nameMatch = gear.name && gear.name.toLowerCase().includes(searchTerm);
        const brandMatch = gear.brand && gear.brand.toLowerCase().includes(searchTerm);
        const typeMatch = gear.type && gear.type.toLowerCase().includes(searchTerm);
        const featuresMatch = gear.features && Array.isArray(gear.features) && gear.features.some(feature => feature && feature.toLowerCase().includes(searchTerm));
        return nameMatch || brandMatch || typeMatch || featuresMatch;
    }).map(gear => ({ ...gear, category: 'Riding Gear', type: 'gear' }));
    
    // Search through apparel (from apparel.html)
    const apparelMatches = getApparelData().filter(apparel => {
        const nameMatch = apparel.name && apparel.name.toLowerCase().includes(searchTerm);
        const brandMatch = apparel.brand && apparel.brand.toLowerCase().includes(searchTerm);
        const typeMatch = apparel.type && apparel.type.toLowerCase().includes(searchTerm);
        const featuresMatch = apparel.features && Array.isArray(apparel.features) && apparel.features.some(feature => feature && feature.toLowerCase().includes(searchTerm));
        return nameMatch || brandMatch || typeMatch || featuresMatch;
    }).map(apparel => ({ ...apparel, category: 'Apparel', type: 'apparel' }));
    
    // Combine all matches
    const allMatches = [...bikeMatches, ...partMatches, ...helmetMatches, ...gearMatches, ...apparelMatches];
    
    // Display results
    if (allMatches.length > 0) {
        displaySearchResults(allMatches);
    } else {
        searchResults.innerHTML = '<div class="search-result-item"><p>No matches found</p></div>';
        searchResults.style.display = 'block';
    }
}

// Get helmet data (simplified structure for search)
function getHelmetData() {
    return [
        {
            id: 'agv-pista-gp-rr',
            name: 'AGV Pista GP RR',
            brand: 'AGV',
            type: 'Racing Helmet',
            price: 25000,
            features: ['Carbon Fiber Shell', 'ECE 22.06 Certified', 'Advanced Aerodynamics']
        },
        {
            id: 'shoei-x-14',
            name: 'Shoei X-14',
            brand: 'Shoei',
            type: 'Racing Helmet',
            price: 28000,
            features: ['AIM+ Shell', 'DOT/ECE Certified', 'CWR-1 Visor']
        },
        {
            id: 'arai-rx-7v',
            name: 'Arai RX-7V',
            brand: 'Arai',
            type: 'Racing Helmet',
            price: 32000,
            features: ['Periphery Belt', 'Snell M2020', 'VAS Shield']
        },
        {
            id: 'bell-race-star',
            name: 'Bell Race Star',
            brand: 'Bell',
            type: 'Racing Helmet',
            price: 22000,
            features: ['Flex Energy Management', 'MIPS Technology', 'DOT/ECE Certified']
        },
        {
            id: 'hjc-rpha-11',
            name: 'HJC RPHA 11',
            brand: 'HJC',
            type: 'Racing Helmet',
            price: 18000,
            features: ['PIM+ Shell', 'Advanced Channeling Ventilation', 'DOT/ECE Certified']
        }
    ];
}

// Get gear data (simplified structure for search)
function getGearData() {
    return [
        {
            id: 'dainese-racing-suit',
            name: 'Dainese Racing Suit',
            brand: 'Dainese',
            type: 'Racing Suit',
            price: 45000,
            features: ['Kangaroo Leather', 'CE Level 2 Armor', 'Thermal Lining']
        },
        {
            id: 'alpinestars-gp-tech',
            name: 'Alpinestars GP Tech',
            brand: 'Alpinestars',
            type: 'Racing Suit',
            price: 42000,
            features: ['Premium Leather', 'CE Level 2 Protection', 'Race Fit']
        },
        {
            id: 'revit-ignition-3',
            name: 'REV\'IT! Ignition 3',
            brand: 'REV\'IT!',
            type: 'Racing Suit',
            price: 38000,
            features: ['Goat Leather', 'CE Level 2 Armor', 'Perforated Panels']
        },
        {
            id: 'dainese-torque-3',
            name: 'Dainese Torque 3',
            brand: 'Dainese',
            type: 'Racing Boots',
            price: 15000,
            features: ['Full Grain Leather', 'Shin Protection', 'Reinforced Toe']
        },
        {
            id: 'alpinestars-supertech-r',
            name: 'Alpinestars Supertech R',
            brand: 'Alpinestars',
            type: 'Racing Boots',
            price: 18000,
            features: ['Microfiber Upper', 'TPU Protection', 'Race Sole']
        }
    ];
}

// Get apparel data (simplified structure for search)
function getApparelData() {
    return [
        {
            id: 'throttle-garage-jacket',
            name: 'ThrottleGarage Racing Jacket',
            brand: 'ThrottleGarage',
            type: 'Racing Jacket',
            price: 12000,
            features: ['Premium Leather', 'CE Armor', 'Ventilation System']
        },
        {
            id: 'throttle-garage-pants',
            name: 'ThrottleGarage Racing Pants',
            brand: 'ThrottleGarage',
            type: 'Racing Pants',
            price: 8000,
            features: ['Cordura Fabric', 'Knee Protection', 'Adjustable Fit']
        },
        {
            id: 'throttle-garage-gloves',
            name: 'ThrottleGarage Racing Gloves',
            brand: 'ThrottleGarage',
            type: 'Racing Gloves',
            price: 3000,
            features: ['Goat Leather', 'Knuckle Protection', 'Grip Enhancement']
        },
        {
            id: 'throttle-garage-hoodie',
            name: 'ThrottleGarage Racing Hoodie',
            brand: 'ThrottleGarage',
            type: 'Casual Wear',
            price: 2500,
            features: ['Premium Cotton', 'Racing Graphics', 'Comfortable Fit']
        },
        {
            id: 'throttle-garage-tshirt',
            name: 'ThrottleGarage Racing T-Shirt',
            brand: 'ThrottleGarage',
            type: 'Casual Wear',
            price: 1500,
            features: ['100% Cotton', 'Racing Design', 'Multiple Sizes']
        }
    ];
}

// Display search results
function displaySearchResults(matches) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    const resultsHTML = matches.map(item => {
        if (!item || !item.name || !item.id) {
            console.warn('Skipping item with missing id or name:', item);
            return '';
        }
        
        let displayInfo = '';
        let clickAction = '';
        let disabled = false;
        let tooltip = '';
        
        if (item.type === 'bike' && item.specs) {
            const engine = item.specs.engine || 'N/A';
            const power = item.specs.power || 'N/A';
            displayInfo = `${engine} | ${power}`;
            clickAction = `onclick="navigateToBike(${item.id}, '${item.name.replace(/'/g, "\'")}'); return false;"`;
        } else if (item.type === 'part' && item.price) {
            displayInfo = `${item.type || 'Part'} | ₹${item.price.toLocaleString('en-IN')}`;
            clickAction = `onclick="window.location.href='/bike-parts.html?search=${encodeURIComponent(item.name)}&productId=${item.id}'; return false;"`;
        } else if (item.type === 'helmet' && item.price) {
            displayInfo = `${item.brand || 'Helmet'} | ₹${item.price.toLocaleString('en-IN')}`;
            clickAction = `onclick="window.location.href='/helmets.html?search=${encodeURIComponent(item.name)}&productId=${item.id}'; return false;"`;
        } else if (item.type === 'gear' && item.price) {
            displayInfo = `${item.brand || 'Gear'} | ₹${item.price.toLocaleString('en-IN')}`;
            clickAction = `onclick="window.location.href='/riding-gear.html?search=${encodeURIComponent(item.name)}&productId=${item.id}'; return false;"`;
        } else if (item.type === 'apparel' && item.price) {
            displayInfo = `${item.brand || 'Apparel'} | ₹${item.price.toLocaleString('en-IN')}`;
            clickAction = `onclick="window.location.href='/apparel.html?search=${encodeURIComponent(item.name)}&productId=${item.id}'; return false;"`;
        } else {
            displayInfo = item.category || 'Product';
            disabled = true;
            tooltip = 'Product data incomplete';
        }
        
        return `
            <div class="search-result-item${disabled ? ' disabled' : ''}" ${clickAction} ${tooltip ? `title='${tooltip}'` : ''}>
                <div class="search-result-info">
                    <h3>${item.name}</h3>
                    <p><span class="category-badge">${item.category || 'Product'}</span> ${displayInfo}</p>
                </div>
            </div>
        `;
    }).filter(html => html !== '').join('');
    
    searchResults.innerHTML = resultsHTML;
    searchResults.style.display = 'block';
}

// Navigate to bike function
function navigateToBike(bikeId, bikeName) {
    // Check if we're on the shop-by-bike page
    if (window.location.pathname.includes('shop-by-bike.html')) {
        // Scroll to the bike on current page
        scrollToBike(bikeId);
    } else {
        // Navigate to shop-by-bike page with bike ID
        window.location.href = `/shop-by-bike.html?bikeId=${bikeId}&search=${encodeURIComponent(bikeName)}`;
    }
    
    // Hide search results
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

// Scroll to bike function
function scrollToBike(bikeId) {
    console.log('Scrolling to bike:', bikeId);
    
    const bikeCard = document.querySelector(`[data-bike-id="${bikeId}"]`);
    
    if (bikeCard) {
        console.log('Found bike card');
        
        // Remove any existing highlights
        document.querySelectorAll('.bike-card').forEach(card => {
            card.classList.remove('highlight-bike');
        });
        
        // Add highlight to target bike
        bikeCard.classList.add('highlight-bike');
        
        // Calculate position with header offset
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const elementPosition = bikeCard.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - 20;
        
        // Scroll to the bike
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Remove highlight after animation
        setTimeout(() => {
            bikeCard.classList.remove('highlight-bike');
        }, 2000);
    } else {
        console.log('Bike card not found');
    }
}

// Handle bike highlight from URL parameters
function handleBikeHighlight() {
    const urlParams = new URLSearchParams(window.location.search);
    const bikeId = urlParams.get('bikeId');
    
    if (bikeId) {
        setTimeout(() => {
            scrollToBike(bikeId);
        }, 500);
    }
}

// ===== END SEARCH FUNCTIONALITY =====