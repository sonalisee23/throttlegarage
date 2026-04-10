// Stock and Delivery Management
class StockDeliveryManager {
    constructor() {
        this.zipCode = '';
        this.currentProductId = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Listen for zip code input changes
        document.addEventListener('DOMContentLoaded', () => {
            const zipInput = document.getElementById('delivery-zip-code');
            if (zipInput) {
                zipInput.addEventListener('input', (e) => {
                    this.zipCode = e.target.value;
                    if (this.zipCode.length === 5) {
                        this.updateStockInfo();
                    }
                });
            }

            // Try to get user's location
            this.tryGetUserLocation();
        });
    }

    async tryGetUserLocation() {
        if ('geolocation' in navigator) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                
                // Convert coordinates to zip code using reverse geocoding
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
                );
                const data = await response.json();
                
                if (data.results && data.results[0]) {
                    const zipCode = data.results[0].address_components.find(
                        component => component.types.includes('postal_code')
                    )?.long_name;

                    if (zipCode) {
                        const zipInput = document.getElementById('delivery-zip-code');
                        if (zipInput) {
                            zipInput.value = zipCode;
                            this.zipCode = zipCode;
                            this.updateStockInfo();
                        }
                    }
                }
            } catch (error) {
                console.warn('Error getting user location:', error);
            }
        }
    }

    async checkStock(productId) {
        if (!this.zipCode) {
            return null;
        }

        try {
            const response = await fetch(`/api/stock/availability/${productId}?zip_code=${this.zipCode}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error checking stock:', error);
            return null;
        }
    }

    async updateStockInfo() {
        if (!this.currentProductId || !this.zipCode) {
            return;
        }

        const stockInfo = await this.checkStock(this.currentProductId);
        this.updateStockDisplay(stockInfo);
    }

    updateStockDisplay(stockInfo) {
        const stockDisplay = document.getElementById('stock-availability');
        const deliveryDisplay = document.getElementById('delivery-estimate');
        
        if (!stockDisplay || !deliveryDisplay) {
            return;
        }

        if (!stockInfo) {
            stockDisplay.innerHTML = '<p class="text-warning">Please enter a valid ZIP code to check availability</p>';
            deliveryDisplay.innerHTML = '';
            return;
        }

        if (stockInfo.in_stock) {
            stockDisplay.innerHTML = `
                <p class="text-success">
                    <i class="fas fa-check-circle"></i> In Stock
                    <span class="stock-quantity">(${stockInfo.quantity_available} available)</span>
                </p>
            `;

            deliveryDisplay.innerHTML = `
                <div class="delivery-estimate-box">
                    <i class="fas fa-truck"></i>
                    <p>Estimated Delivery:</p>
                    <p class="delivery-dates">
                        ${stockInfo.estimated_delivery.min_date} - ${stockInfo.estimated_delivery.max_date}
                    </p>
                    <p class="delivery-days">
                        (${stockInfo.estimated_delivery.min_days}-${stockInfo.estimated_delivery.max_days} business days)
                    </p>
                </div>
            `;
        } else {
            stockDisplay.innerHTML = `
                <p class="text-danger">
                    <i class="fas fa-times-circle"></i> Out of Stock
                </p>
            `;

            if (stockInfo.next_restock) {
                deliveryDisplay.innerHTML = `
                    <div class="restock-info">
                        <p>Expected Restock Date: ${stockInfo.next_restock}</p>
                    </div>
                `;
            } else {
                deliveryDisplay.innerHTML = `
                    <div class="restock-info">
                        <p>No restock date available</p>
                    </div>
                `;
            }
        }
    }

    setCurrentProduct(productId) {
        this.currentProductId = productId;
        this.updateStockInfo();
    }
}

// Initialize the stock delivery manager
const stockDeliveryManager = new StockDeliveryManager();

// Export for use in other scripts
window.stockDeliveryManager = stockDeliveryManager; 