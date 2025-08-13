// auth.js

let currentUser = JSON.parse(localStorage.getItem('lunetteDallasCurrentUser')) || null;

function updateAccountLink() {
    const accountLinkText = getEl('account-link-text'); // Desktop header
    const mobileAccountLink = getEl('mobile-account-link'); // Mobile menu
    const accountLinkHeader = getEl('account-link-header'); // The <a> tag in desktop header

    if (currentUser) {
        const namePart = currentUser.name ? currentUser.name.split(' ')[0] : 'Utilisateur';
        const dashboardLink = currentUser.isAdmin ? 'admin.html' : 'account.html'; // Admin goes to admin.html, user to account.html (which shows dashboard)
        
        if (accountLinkText) accountLinkText.textContent = currentUser.isAdmin ? 'Admin' : namePart;
        if (mobileAccountLink) mobileAccountLink.textContent = currentUser.isAdmin ? 'Tableau Admin' : 'Mon Tableau de Bord';
        
        if (accountLinkHeader) accountLinkHeader.href = dashboardLink;
        if (mobileAccountLink) mobileAccountLink.href = dashboardLink;

    } else {
        if (accountLinkText) accountLinkText.textContent = 'Compte';
        if (mobileAccountLink) mobileAccountLink.textContent = 'Mon Compte';
        if (accountLinkHeader) accountLinkHeader.href = 'account.html';
        if (mobileAccountLink) mobileAccountLink.href = 'account.html';
    }
}

function handleLoginForm() {
    const loginForm = getEl('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = getEl('login-email').value;
            const password = getEl('login-password').value;
            const loginErrorMessage = getEl('login-error-message');
            if (loginErrorMessage) loginErrorMessage.classList.add('hidden');

            // Simulated users
            if (email === 'massinissa432@gmail.com' && password === '27122004') {
                currentUser = { name: 'Massinissa Admin', email: email, isAdmin: true };
                localStorage.setItem('lunetteDallasCurrentUser', JSON.stringify(currentUser));
                showToast('Connexion Admin OK!', 'success');
                window.location.href = 'admin.html';
            } else if (email === 'user@example.com' && password === 'password') {
                currentUser = { name: 'Utilisateur Test', email: email, isAdmin: false, phone: '0512345678' };
                localStorage.setItem('lunetteDallasCurrentUser', JSON.stringify(currentUser));
                showToast('Connexion OK!', 'success');
                window.location.href = 'account.html'; // Redirect to account page, which will show dashboard
            } else {
                if (loginErrorMessage) {
                    loginErrorMessage.textContent = 'Email ou mot de passe incorrect.';
                    loginErrorMessage.classList.remove('hidden');
                }
                showToast('Échec de la connexion.', 'error');
            }
            updateAccountLink();
            loginForm.reset();
        });
    }
}

function handleRegisterForm() {
    const registerForm = getEl('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = getEl('register-name').value;
            // In a real app, you would save the user, etc.
            const registerFeedbackMessage = getEl('register-feedback-message');
            if (registerFeedbackMessage) {
                registerFeedbackMessage.textContent = `Merci ${name}, votre inscription est simulée! Vous pouvez maintenant vous connecter.`;
                registerFeedbackMessage.className = 'text-green-600 text-sm mb-4';
                registerFeedbackMessage.classList.remove('hidden');
            }
            showToast('Inscription simulée réussie!', 'success');
            registerForm.reset();
            setTimeout(() => {
                // Switch to login form view
                if (getEl('login-form-container')) getEl('login-form-container').classList.remove('hidden');
                if (getEl('register-form-container')) getEl('register-form-container').classList.add('hidden');
                if (registerFeedbackMessage) registerFeedbackMessage.classList.add('hidden');
            }, 3500);
        });
    }
}

function handleLogout() {
    const logoutButton = getEl('logout-button'); // In user_dashboard section
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            currentUser = null;
            localStorage.removeItem('lunetteDallasCurrentUser');
            showToast('Déconnecté avec succès.', 'success');
            updateAccountLink();
            window.location.href = 'account.html'; // Redirect to login/register page
        });
    }
}

function displayUserDashboard() {
    const welcomeMsgEl = getEl('user-dashboard-welcome-message');
    const emailEl = getEl('user-dashboard-user-email');
    const nameEl = getEl('user-dashboard-user-name');
    const ordersContainer = getEl('user-orders-container');

    if (currentUser && !currentUser.isAdmin) {
        if (welcomeMsgEl) welcomeMsgEl.textContent = `Bienvenue, ${currentUser.name}!`;
        if (emailEl) emailEl.textContent = currentUser.email;
        if (nameEl) nameEl.textContent = currentUser.name;
        
        // Render user orders
        if (ordersContainer) {
            const userOrders = orders.filter(order => order.customerInfo.email === currentUser.email);
            if (userOrders.length === 0) {
                ordersContainer.innerHTML = '<p class="text-gray-600 mt-2">Vous n\'avez aucune commande pour le moment.</p>';
            } else {
                ordersContainer.innerHTML = userOrders.sort((a, b) => new Date(b.date) - new Date(a.date)).map(order => `
                    <div class="dashboard-card p-4 mb-3 text-sm border border-gray-200 rounded-md">
                        <div class="flex justify-between items-center">
                            <p class="font-semibold text-gray-700">Commande #${order.orderId}</p>
                            <span class="text-xs text-gray-500">${new Date(order.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <p class="mt-1">Total: <span class="font-bold text-teal-600">${formatPrice(order.total)}</span></p>
                        <details class="mt-2 text-xs">
                            <summary class="cursor-pointer text-blue-500 hover:underline">Voir les articles</summary>
                            <ul class="list-disc list-inside ml-4 mt-1 text-gray-600 space-y-0.5">
                                ${order.items.map(item => `<li>${item.name} (x${item.quantity}) ${item.selectedColor ? `- ${item.selectedColor}`: ''}</li>`).join('')}
                            </ul>
                        </details>
                    </div>
                `).join('');
            }
        }

    }
}


document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split("/").pop();

    if (currentPage === 'account.html') {
        const loginFormContainer = getEl('login-form-container');
        const registerFormContainer = getEl('register-form-container');
        const userDashboardContainer = getEl('user_dashboard'); // The section itself

        if (currentUser) {
            if (currentUser.isAdmin) {
                window.location.href = 'admin.html'; // Admins shouldn't land here, redirect
                return;
            }
            // Logged in as regular user, show dashboard
            if (loginFormContainer) loginFormContainer.classList.add('hidden');
            if (registerFormContainer) registerFormContainer.classList.add('hidden');
            if (userDashboardContainer) {
                 userDashboardContainer.classList.remove('hidden'); // Make sure it's visible
                 userDashboardContainer.style.display = 'block'; // Explicitly show
            }
            displayUserDashboard();
            handleLogout(); // Attach logout listener
        } else {
            // Not logged in, show login form by default
            if (loginFormContainer) loginFormContainer.classList.remove('hidden');
            if (registerFormContainer) registerFormContainer.classList.add('hidden');
            if (userDashboardContainer) {
                userDashboardContainer.classList.add('hidden'); // Hide dashboard
                userDashboardContainer.style.display = 'none'; // Explicitly hide
            }
            handleLoginForm();
            handleRegisterForm();

            const showRegisterLink = getEl('show-register-form-link');
            if (showRegisterLink) {
                showRegisterLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (loginFormContainer) loginFormContainer.classList.add('hidden');
                    if (registerFormContainer) registerFormContainer.classList.remove('hidden');
                    const loginErrorMsg = getEl('login-error-message');
                    if(loginErrorMsg) loginErrorMsg.classList.add('hidden');
                });
            }
            const showLoginLink = getEl('show-login-form-link');
            if (showLoginLink) {
                showLoginLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (loginFormContainer) loginFormContainer.classList.remove('hidden');
                    if (registerFormContainer) registerFormContainer.classList.add('hidden');
                     const regFeedbackMsg = getEl('register-feedback-message');
                    if(regFeedbackMsg) regFeedbackMsg.classList.add('hidden');
                });
            }
        }
    }
    
    // This needs to be available on all pages for the header link
    updateAccountLink();

    // Simulated social login buttons (if they exist on the current page)
    querySelAll('.social-login-btn').forEach(b => {
        b.addEventListener('click', () => {
            showToast(`Connexion sociale (simulation). Non implémenté.`, 'success');
        });
    });
});