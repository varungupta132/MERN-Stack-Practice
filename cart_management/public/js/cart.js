// Cart management JavaScript

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

// Add to cart function
function addToCart(productId) {
    const quantityInput = document.getElementById(`qty-${productId}`);
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    
    fetch('/api/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            productId: productId,
            quantity: quantity
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showToast('Product added to cart successfully!', 'success');
            updateCartCount();
            // Reset quantity to 1
            if (quantityInput) {
                quantityInput.value = 1;
            }
        } else {
            showToast(data.message || 'Failed to add product to cart', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('An error occurred while adding to cart', 'error');
    });
}

// Update cart count in navbar
function updateCartCount() {
    fetch('/api/cart')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const cartCount = document.getElementById('cart-count');
                if (cartCount) {
                    cartCount.textContent = data.data.itemCount || 0;
                }
            }
        })
        .catch(error => {
            console.error('Error updating cart count:', error);
        });
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (toast && toastMessage) {
        // Set message
        toastMessage.textContent = message;
        
        // Remove existing classes
        toast.classList.remove('bg-success', 'bg-danger', 'bg-info', 'bg-warning');
        
        // Add appropriate class based on type
        switch(type) {
            case 'success':
                toast.classList.add('bg-success', 'text-white');
                break;
            case 'error':
                toast.classList.add('bg-danger', 'text-white');
                break;
            case 'warning':
                toast.classList.add('bg-warning');
                break;
            default:
                toast.classList.add('bg-info', 'text-white');
        }
        
        // Show toast
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    }
}

// Quick add to cart (for product cards)
function quickAddToCart(productId) {
    addToCart(productId);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Debounce function for search/filter
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

// Search products (if search functionality is added)
function searchProducts(query) {
    const products = document.querySelectorAll('.product-item');
    const searchTerm = query.toLowerCase();
    
    products.forEach(product => {
        const productName = product.dataset.name.toLowerCase();
        const productDesc = product.querySelector('.card-text').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Handle API errors
function handleApiError(error) {
    console.error('API Error:', error);
    showToast('An error occurred. Please try again.', 'error');
}

// Confirm action
function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
    }
}