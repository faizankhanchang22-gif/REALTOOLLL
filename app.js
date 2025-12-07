// Get DOM elements
const loginBox = document.getElementById('loginBox');
const portal = document.getElementById('portal');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const errorMsg = document.getElementById('errorMsg');
const searchInput = document.getElementById('searchInput');
const gridContainer = document.getElementById('gridContainer');

// Show error message
function showError(message) {
    errorMsg.textContent = message;
    setTimeout(() => {
        errorMsg.textContent = '';
    }, 3000);
}

// Load resources to portal
function loadResources() {
    gridContainer.innerHTML = '';
    
    allResources.forEach(category => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <h3>${category.category}</h3>
            ${category.items.map(item => `
                <div class="link">
                    <a href="${item.url}" target="_blank">${item.name}</a>
                </div>
            `).join('')}
        `;
        
        gridContainer.appendChild(card);
    });
}

// Search functionality
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
});

// ✅ LOGIN FUNCTION
loginBtn.addEventListener('click', function() {
    const enteredCode = passwordInput.value.trim();
    
    // Check if code is valid
    if (accessCodes.includes(enteredCode)) {
        // Hide login, show portal
        loginBox.style.display = 'none';
        portal.style.display = 'block';
        
        // Load resources
        loadResources();
        
        // Clear password field
        passwordInput.value = '';
    } else {
        // Show error
        showError('❌ Invalid Access Code!');
        passwordInput.value = '';
        passwordInput.focus();
    }
});

// Logout function
logoutBtn.addEventListener('click', function() {
    portal.style.display = 'none';
    loginBox.style.display = 'block';
    passwordInput.value = '';
    passwordInput.focus();
    searchInput.value = '';
});

// Allow Enter key to login
passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        loginBtn.click();
    }
});

// Focus on password input on load
window.addEventListener('load', function() {
    passwordInput.focus();
});
