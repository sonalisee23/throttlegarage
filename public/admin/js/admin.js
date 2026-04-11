// Admin Panel JavaScript
let allOrders = [];

// Check if user is authenticated as admin
function checkAdminAuth() {
    const isAdmin = localStorage.getItem('adminAuthenticated');

    // Handle various path formats (relative paths, etc.)
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath.includes('login.html') || currentPath.endsWith('/login');

    if (!isAdmin && !isLoginPage) {
        // Save the current page URL for redirection after login
        const fullPath = window.location.pathname.split('/').pop() + window.location.hash;
        sessionStorage.setItem('adminRedirectUrl', fullPath);

        // Redirect to login
        window.location.href = 'login.html';
    }
}

// Sample data for demonstration
const sampleOrders = [{
        id: 'ORD-001',
        customer: 'John Doe',
        email: 'john.doe@example.com',
        date: '2024-05-15',
        amount: 432.99,
        status: 'completed',
        items: [
            { id: 1, name: 'Racing Exhaust System', price: 899.99, quantity: 1 },
            { id: 2, name: 'Performance ECU Tuner', price: 699.99, quantity: 1 }
        ],
        address: '123 Main St, New York, NY 10001',
        phone: '(555) 123-4567'
    },
    {
        id: 'ORD-002',
        customer: 'Jane Smith',
        email: 'jane.smith@example.com',
        date: '2024-05-14',
        amount: 219.50,
        status: 'pending',
        items: [
            { id: 3, name: 'Racing Brake System', price: 799.99, quantity: 1 }
        ],
        address: '456 Oak Ave, Los Angeles, CA 90001',
        phone: '(555) 987-6543'
    },
    {
        id: 'ORD-003',
        customer: 'Robert Brown',
        email: 'robert.brown@example.com',
        date: '2024-05-13',
        amount: 753.25,
        status: 'completed',
        items: [
            { id: 4, name: 'Carbon Fiber Fairings', price: 2499.99, quantity: 1 }
        ],
        address: '789 Pine Rd, Chicago, IL 60007',
        phone: '(555) 456-7890'
    },
    {
        id: 'ORD-004',
        customer: 'Michael Wilson',
        email: 'michael.wilson@example.com',
        date: '2024-05-12',
        amount: 99.99,
        status: 'cancelled',
        items: [
            { id: 5, name: 'Quad Lock Phone Mount', price: 79.99, quantity: 1 }
        ],
        address: '321 Cedar St, Houston, TX 77001',
        phone: '(555) 321-0987'
    },
    {
        id: 'ORD-005',
        customer: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        date: '2024-05-11',
        amount: 325.75,
        status: 'completed',
        items: [
            { id: 1, name: 'Racing Exhaust System', price: 899.99, quantity: 1 }
        ],
        address: '654 Maple Ave, Seattle, WA 98101',
        phone: '(555) 654-3210'
    }
];

const sampleUsers = [{
        id: 'USR-001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        registeredDate: '2024-01-15',
        status: 'active',
        orders: 5,
        phone: '(555) 123-4567',
        address: '123 Main St, New York, NY 10001'
    },
    {
        id: 'USR-002',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        registeredDate: '2024-02-20',
        status: 'active',
        orders: 2,
        phone: '(555) 987-6543',
        address: '456 Oak Ave, Los Angeles, CA 90001'
    },
    {
        id: 'USR-003',
        name: 'Robert Brown',
        email: 'robert.brown@example.com',
        registeredDate: '2024-03-10',
        status: 'inactive',
        orders: 1,
        phone: '(555) 456-7890',
        address: '789 Pine Rd, Chicago, IL 60007'
    },
    {
        id: 'USR-004',
        name: 'Michael Wilson',
        email: 'michael.wilson@example.com',
        registeredDate: '2024-04-05',
        status: 'active',
        orders: 3,
        phone: '(555) 321-0987',
        address: '321 Cedar St, Houston, TX 77001'
    },
    {
        id: 'USR-005',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        registeredDate: '2024-05-01',
        status: 'active',
        orders: 1,
        phone: '(555) 654-3210',
        address: '654 Maple Ave, Seattle, WA 98101'
    }
];

// Initialize the admin panel
document.addEventListener('DOMContentLoaded', async function() {
    // Check admin authentication
    checkAdminAuth();

    // Setup navigation
    setupNavigation();

    // Load initial data
    try {
        const [stats, orders, users] = await Promise.all([
            fetchAdminStats(),
            fetchAdminOrders(),
            fetchAdminUsers()
        ]);
        console.log('Fetched stats:', stats);
        console.log('Fetched orders:', orders);
        console.log('Fetched users:', users);
        renderDashboardCards(stats);
        renderRecentOrders(orders);
        allOrders = orders;
        loadOrdersData(allOrders);
        loadUsersData(users);
    } catch (err) {
        let errorMsg = err.message;
        if (err.response) {
            try {
                const data = await err.response.json();
                errorMsg = data.message || errorMsg;
            } catch {}
        }
        document.getElementById('recentOrdersTableBody').innerHTML = '<tr><td colspan="6" style="text-align:center;color:#fff;">Failed to load orders: ' + errorMsg + '</td></tr>';
        document.getElementById('ordersTableBody').innerHTML = '<tr><td colspan="6" style="text-align:center;color:#fff;">Failed to load orders: ' + errorMsg + '</td></tr>';
        document.getElementById('usersTableBody').innerHTML = '<tr><td colspan="6" style="text-align:center;color:#fff;">Failed to load users: ' + errorMsg + '</td></tr>';
        // Also show error at the top of the dashboard if available
        const dashHeader = document.querySelector('.dashboard-header');
        if (dashHeader) {
            let errDiv = document.getElementById('dashboardErrorMsg');
            if (!errDiv) {
                errDiv = document.createElement('div');
                errDiv.id = 'dashboardErrorMsg';
                errDiv.style.color = '#ff6666';
                errDiv.style.background = 'rgba(255,0,0,0.1)';
                errDiv.style.padding = '10px';
                errDiv.style.marginBottom = '10px';
                errDiv.style.borderRadius = '5px';
                dashHeader.parentNode.insertBefore(errDiv, dashHeader.nextSibling);
            }
            errDiv.textContent = 'Dashboard error: ' + errorMsg;
        }
    }

    // Setup event listeners
    setupEventListeners();
});

// Setup navigation between sections
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    // Check for hash in URL to set active section
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.replace('#', '') + '-section';
        const section = document.getElementById(sectionId);
        const link = document.querySelector(`[data-section="${sectionId}"]`);

        if (section && link) {
            // Activate the appropriate section and link
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            navLinks.forEach(l => l.classList.remove('active'));

            section.classList.add('active');
            link.classList.add('active');

            // Update header title
            const sectionTitle = link.textContent.trim();
            document.querySelector('.dashboard-title').textContent = sectionTitle;
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links and sections
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });

            // Add active class to clicked link
            this.classList.add('active');

            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('active');

                // Update URL hash
                const hashPart = sectionId.replace('-section', '');
                window.location.hash = hashPart;

                // Update header title
                const sectionTitle = this.textContent.trim();
                document.querySelector('.dashboard-title').textContent = sectionTitle;
            }

            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 768) {
                document.getElementById('adminSidebar').classList.remove('active');
            }
        });
    });

    // Mobile sidebar toggle
    const toggleSidebar = document.getElementById('toggleSidebar');
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', function() {
            document.getElementById('adminSidebar').classList.toggle('active');
        });
    }
}

// Load orders data into the orders table
function loadOrdersData(orders) {
    const ordersTableBody = document.getElementById('ordersTableBody');
    if (!ordersTableBody) return;
    if (!orders || orders.length === 0) {
        ordersTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#fff;">No orders found.</td></tr>';
        return;
    }
    let ordersHTML = '';
    orders.forEach(order => {
        ordersHTML += `
            <tr data-order-id="${order.id}">
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.date}</td>
                <td>₹${(order.amount ?? 0).toFixed(2)}</td>
                <td><span class="status-badge status-${order.status ?? 'pending'}">${capitalizeFirstLetter(order.status ?? 'pending')}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit-btn" data-order-id="${order.id}"><i class="fas fa-edit"></i></button>
                        <button class="action-btn delete-btn" data-order-id="${order.id}"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `;
    });
    ordersTableBody.innerHTML = ordersHTML;
}

// Load users data into the users table
function loadUsersData(users) {
    const usersTableBody = document.getElementById('usersTableBody');
    if (!usersTableBody) return;
    if (!users || users.length === 0) {
        usersTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#fff;">No users found.</td></tr>';
        return;
    }
    let usersHTML = '';
    users.forEach(user => {
        usersHTML += `
            <tr data-user-id="${user.id}">
                <td>${user.id}</td>
                <td>${user.name ?? ''}</td>
                <td>${user.email ?? ''}</td>
                <td>${user.registeredDate ?? ''}</td>
                <td><span class="status-badge ${(user.status === 'active' ? 'status-completed' : 'status-cancelled')}">${capitalizeFirstLetter(user.status ?? 'inactive')}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn view-btn" data-user-id="${user.id}"><i class="fas fa-eye"></i></button>
                        <button class="action-btn edit-btn" data-user-id="${user.id}"><i class="fas fa-edit"></i></button>
                        <button class="action-btn delete-btn" data-user-id="${user.id}"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `;
    });
    usersTableBody.innerHTML = usersHTML;
}

// Setup all event listeners
function setupEventListeners() {
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('adminAuthenticated');
            window.location.href = 'login.html';
        });
    }

    // View order buttons - use event delegation for buttons that may be loaded dynamically
    document.addEventListener('click', async function(e) {
        // View order button handler
        if (e.target.closest('.view-btn[data-order-id]')) {
            const button = e.target.closest('.view-btn[data-order-id]');
            const orderId = button.getAttribute('data-order-id');
            const order = allOrders.find(o => o.id === orderId);

            if (order) {
                showOrderDetails(order);
            }
        }

        // // Edit order button handler
        // else if (e.target.closest('.edit-btn[data-order-id]')) {
        //     const button = e.target.closest('.edit-btn[data-order-id]');
        //     const orderId = button.getAttribute('data-order-id');
        //     const order = allOrders.find(o => o.id === orderId);

        //     if (order) {
        //         showEditOrderForm(order);
        //     }
        // }
        else if (e.target.closest('.edit-btn[data-order-id]')) {
            const button = e.target.closest('.edit-btn[data-order-id]');
            const orderId = button.getAttribute('data-order-id');

            try {
                const token = localStorage.getItem('adminToken');

                // ✅ Fetch latest order from DB
                const res = await fetch(`/api/admin/orders/${orderId}`, {
                    headers: { 'auth-token': token }
                });

                if (!res.ok) throw new Error('Failed to fetch order');

                const order = await res.json();

                // ✅ Open modal with real data
                showEditOrderForm(order);

            } catch (err) {
                alert('Error fetching order: ' + err.message);
            }
        }


        // Delete order button handler
        else if (e.target.closest('.delete-btn[data-order-id]')) {
            const button = e.target.closest('.delete-btn[data-order-id]');

            const orderId = button.getAttribute('data-order-id');

            if (confirm('Are you sure you want to delete this order?')) {
                try {
                    const token = localStorage.getItem('adminToken');

                    const res = await fetch(`/api/admin/orders/${orderId}`, {
                        method: 'DELETE',
                        headers: {
                            'auth-token': token
                        }
                    });

                    if (!res.ok) throw new Error('Delete failed');

                    // Remove from UI
                    allOrders = allOrders.filter(o => o.id !== orderId);
                    loadOrdersData(allOrders);

                    alert('Order deleted successfully!');
                } catch (err) {
                    alert('Error deleting order: ' + err.message);
                }
            }
        }
    });

    // Modal close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside the content
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // Cancel buttons in modals
    document.querySelectorAll('[data-dismiss="modal"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Edit order form submission
    const editOrderForm = document.getElementById('editOrderForm');
    if (editOrderForm) {
        // editOrderForm.addEventListener('submit', async function(e) {

        //     const token = localStorage.getItem('adminToken');

        //     const res = await fetch(`/api/admin/orders/${orderId}`, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'auth-token': token
        //         },
        //         body: JSON.stringify({ status })
        //     });

        //     if (!res.ok) throw new Error('Update failed');

        //     // update UI
        //     const index = allOrders.findIndex(o => o.id === orderId);
        //     if (index !== -1) {
        //         allOrders[index].status = status;
        //         loadOrdersData(allOrders);
        //     }

        // });

        // editOrderForm.addEventListener('submit', async function(e) {
        //     e.preventDefault(); // ✅ VERY IMPORTANT

        //     const orderId = this.getAttribute('data-order-id'); // ✅ FIX
        //     const status = document.getElementById('orderStatus').value; // ✅ FIX
        //     const token = localStorage.getItem('adminToken');

        //     try {
        //         const res = await fetch(`/api/admin/orders/${orderId}`, {
        //             method: 'PUT',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'auth-token': token
        //             },
        //             body: JSON.stringify({ status })
        //         });

        //         if (!res.ok) throw new Error('Update failed');

        //         // ✅ Update UI
        //         const index = allOrders.findIndex(o => o.id == orderId);
        //         if (index !== -1) {
        //             allOrders[index].status = status;
        //             loadOrdersData(allOrders);
        //         }

        //         // ✅ Close modal
        //         closeModal(document.getElementById('editOrderModal'));

        //         alert('Order updated successfully!');

        //     } catch (err) {
        //         alert('Error updating order: ' + err.message);
        //     }
        // });


        editOrderForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const orderId = this.getAttribute('data-order-id');
            const status = document.getElementById('orderStatus').value;
            const token = localStorage.getItem('adminToken');

            try {
                const res = await fetch(`/api/admin/orders/${orderId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    },
                    body: JSON.stringify({ status })
                });

                // if (!res.ok) throw new Error('Update failed');

                // // ✅ Reload fresh data from DB
                // const updatedOrders = await fetchAdminOrders();
                // allOrders = updatedOrders;
                // loadOrdersData(allOrders);

                // // ✅ Close modal
                // closeModal(document.getElementById('editOrderModal'));

                // alert('Order updated successfully!');

                if (!res.ok) throw new Error('Update failed');

                // ✅ STEP 1: Fetch fresh data from DB
                const [stats, orders] = await Promise.all([
                    fetchAdminStats(),
                    fetchAdminOrders()
                ]);

                // ✅ STEP 2: Update global data
                allOrders = orders;

                // ✅ STEP 3: Refresh UI everywhere
                loadOrdersData(allOrders); // Orders page
                renderRecentOrders(allOrders); // Dashboard table
                renderDashboardCards(stats); // Dashboard stats

                // ✅ STEP 4: Close modal
                closeModal(document.getElementById('editOrderModal'));

                alert('Order updated successfully!');

            } catch (err) {
                alert('Error updating order: ' + err.message);
            }
        });


    }
}

// Show order details in modal
function showOrderDetails(order) {
    const orderDetails = document.getElementById('orderDetails');

    let itemsHTML = '';
    order.items.forEach(item => {
        itemsHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>₹${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `;
    });

    orderDetails.innerHTML = `
        <div class="order-info">
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Customer:</strong> ${order.customer}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>Address:</strong> ${order.address}</p>
            <p><strong>Date:</strong> ${order.date}</p>
            <p><strong>Status:</strong> <span class="status-badge status-${order.status}">${formatStatus(order.status)}</span></p>
        </div>
        
        <h3>Order Items</h3>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHTML}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" style="text-align: right;"><strong>Total:</strong></td>
                    <td>₹${order.amount.toFixed(2)}</td>
                </tr>
            </tfoot>
        </table>
    `;

    openModal(document.getElementById('viewOrderModal'));
}

function formatStatus(status) {
    if (status === 'delivered') return 'Completed';
    if (status === 'cancelled') return 'Rejected';
    return capitalizeFirstLetter(status);
}

// // Show edit order form in modal
// function showEditOrderForm(order) {
//     const editOrderForm = document.getElementById('editOrderForm');
//     const orderStatus = document.getElementById('orderStatus');

//     // Set form data attribute
//     editOrderForm.setAttribute('data-order-id', order.id);

//     // Set selected status
//     orderStatus.value = order.status;

//     // Open modal
//     openModal(document.getElementById('editOrderModal'));
// }

function showEditOrderForm(order) {
    const editOrderForm = document.getElementById('editOrderForm');
    const orderStatus = document.getElementById('orderStatus');

    // ✅ store order id
    editOrderForm.setAttribute('data-order-id', order.id);

    // ✅ set values
    orderStatus.value = order.status;

    // (optional future fields)
    // document.getElementById('customerName').value = order.customer;

    // ✅ open modal
    openModal(document.getElementById('editOrderModal'));
}

// Open modal
function openModal(modal) {
    modal.classList.add('active');
}

// Close modal
function closeModal(modal) {
    modal.classList.remove('active');
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function fetchAdminStats() {
    const token = localStorage.getItem('adminToken');
    const res = await fetch('/api/admin/stats', {
        headers: { 'auth-token': token }
    });
    if (!res.ok) throw new Error('Failed to fetch stats');
    return await res.json();
}

async function fetchAdminOrders() {
    const token = localStorage.getItem('adminToken');
    const res = await fetch('/api/admin/orders', {
        headers: { 'auth-token': token }
    });
    if (!res.ok) throw new Error('Failed to fetch orders');
    return await res.json();
}

async function fetchAdminUsers() {
    const token = localStorage.getItem('adminToken');
    const res = await fetch('/api/admin/users', {
        headers: { 'auth-token': token }
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    return await res.json();
}

function renderDashboardCards(stats) {
    const cardsHtml = `
        <div class="dashboard-card">
            <div class="card-header">
                <h3 class="card-title">Total Orders</h3>
                <i class="fas fa-shopping-cart"></i>
            </div>
            <div class="card-value">${stats.totalOrders}</div>
            <div class="card-footer up">
                <i class="fas fa-arrow-up"></i> ${stats.ordersTrend}% from last month
            </div>
        </div>
        <div class="dashboard-card">
            <div class="card-header">
                <h3 class="card-title">Total Revenue</h3>
                <i class="fas fa-dollar-sign"></i>
            </div>
            <div class="card-value">₹${stats.totalRevenue.toLocaleString()}</div>
            <div class="card-footer up">
                <i class="fas fa-arrow-up"></i> ${stats.revenueTrend}% from last month
            </div>
        </div>
        <div class="dashboard-card">
            <div class="card-header">
                <h3 class="card-title">Total Users</h3>
                <i class="fas fa-users"></i>
            </div>
            <div class="card-value">${stats.totalUsers}</div>
            <div class="card-footer up">
                <i class="fas fa-arrow-up"></i> ${stats.usersTrend}% from last month
            </div>
        </div>
        <div class="dashboard-card">
            <div class="card-header">
                <h3 class="card-title">Conversion Rate</h3>
                <i class="fas fa-chart-line"></i>
            </div>
            <div class="card-value">${stats.conversionRate}%</div>
            <div class="card-footer ${stats.conversionTrend >= 0 ? 'up' : 'down'}">
                <i class="fas fa-arrow-${stats.conversionTrend >= 0 ? 'up' : 'down'}"></i> ${Math.abs(stats.conversionTrend)}% from last month
            </div>
        </div>
    `;
    document.getElementById('dashboardCards').innerHTML = cardsHtml;
}

function renderRecentOrders(orders) {
    const recent = orders.slice(0, 5);
    const tbody = document.getElementById('recentOrdersTableBody');
    if (!orders || orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#fff;">No orders found.</td></tr>';
        return;
    }
    tbody.innerHTML = recent.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.date}</td>
            <td>₹${(order.amount ?? 0).toFixed(2)}</td>
            <td><span class="status-badge status-${order.status ?? 'pending'}">${capitalizeFirstLetter(order.status ?? 'pending')}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit-btn" data-order-id="${order.id}"><i class="fas fa-edit"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}