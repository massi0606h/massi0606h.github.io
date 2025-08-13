// script.js

// --- Global Data (Simulated Backend) ---
let products = [
    { id: 'p1', name: 'Monture Élégance Noire', type: 'vue', gender: 'unisex', price: 12900.00, images: ['https://placehold.co/600x400/cbd5e0/4a5568?text=Vue+Moderne+1', 'https://placehold.co/600x400/cbd5e0/4a5568?text=Vue+Moderne+2'], colors: ['Noir', 'Argent'], stock: 10, description: 'Une monture élégante et moderne en métal léger, parfaite pour un usage quotidien et un look sophistiqué.', tags: ['moderne', 'métal', 'léger', 'sophistiqué', 'noir', 'vue'] },
    { id: 'p2', name: 'Aviateur Classique Or', type: 'soleil', gender: 'homme', price: 8999.00, images: ['https://placehold.co/600x400/b2f5ea/2c7a7b?text=Solaire+Aviateur+H1'], colors: ['Or', 'Noir Mat'], stock: 15, description: 'Style aviateur intemporel avec une finition dorée et des verres protecteurs, idéal pour hommes.', tags: ['aviateur', 'classique', 'or', 'soleil', 'homme', 'doré'] },
    { id: 'p3', name: 'Rétro Écaille Femme', type: 'vue', gender: 'femme', price: 14550.00, images: ['https://placehold.co/600x400/fed7d7/742a2a?text=Vue+Rétro+F1', 'https://placehold.co/600x400/fed7d7/742a2a?text=Vue+Rétro+F2', 'https://placehold.co/600x400/fed7d7/742a2a?text=Vue+Rétro+F3'], colors: ['Écaille Brun', 'Écaille Foncé'], stock: 5, description: 'Monture rétro en acétate motif écaille, chic et tendance pour femmes, alliant confort et style.', tags: ['rétro', 'écaille', 'femme', 'acétate', 'chic', 'vue', 'marron'] },
    { id: 'p4', name: 'Sport Performance Unisexe', type: 'soleil', gender: 'unisex', price: 11000.00, images: ['https://placehold.co/600x400/d6bcfa/553c9a?text=Sport+Design+U1'], colors: ['Noir/Rouge', 'Bleu Marine'], stock: 0, description: 'Lunettes de soleil sportives, haute performance avec un design aérodynamique unisexe, idéales pour toutes activités.', tags: ['sport', 'performance', 'unisexe', 'soleil', 'aérodynamique', 'noir', 'rouge', 'bleu'] },
    { id: 'p5', name: 'Monture Minimaliste Titane', type: 'vue', gender: 'unisex', price: 18500.00, images: ['https://placehold.co/600x400/e6fffa/234e52?text=Vue+Titane+1'], colors: ['Gris Titane', 'Noir Brossé'], stock: 8, description: 'Monture ultra-légère en titane, design minimaliste pour un confort maximal et une durabilité exceptionnelle.', tags: ['minimaliste', 'titane', 'léger', 'vue', 'durable', 'gris'] },
    { id: 'p6', name: 'Solaire Oeil de Chat Glamour', type: 'soleil', gender: 'femme', price: 9500.00, images: ['https://placehold.co/600x400/fff5f5/c53030?text=Solaire+CatEye+F1', 'https://placehold.co/600x400/fff5f5/c53030?text=Solaire+CatEye+F2'], colors: ['Noir Brillant', 'Rouge Cerise'], stock: 12, description: 'Lunettes de soleil oeil de chat, un accessoire glamour pour un look affirmé et féminin. Protection UV400.', tags: ['oeil de chat', 'cat eye', 'glamour', 'soleil', 'femme', 'uv400', 'noir', 'rouge'] },
    { id: 'p7', name: 'Wayfarer Urbain Noir Mat', type: 'soleil', gender: 'homme', price: 7800.00, images: ['https://placehold.co/600x400/4a5568/e2e8f0?text=Solaire+Wayfarer+H1'], colors: ['Noir Mat'], stock: 18, description: 'Classique Wayfarer revisité avec une finition noir mat. Parfait pour un style urbain décontracté.', tags: ['wayfarer', 'urbain', 'noir mat', 'soleil', 'homme', 'classique'] },
    { id: 'p8', name: 'Monture Ronde Vintage', type: 'vue', gender: 'unisex', price: 11200.00, images: ['https://placehold.co/600x400/fefcbf/975a16?text=Vue+Ronde+Vintage1'], colors: ['Bronze Vieilli', 'Argent Mat'], stock: 7, description: 'Inspiration vintage avec cette monture ronde en métal fin. Un look intellectuel et tendance.', tags: ['ronde', 'vintage', 'métal', 'vue', 'intellectuel', 'bronze', 'argent'] }
];

let cart = JSON.parse(localStorage.getItem('lunetteDallasCart')) || [];
let orders = JSON.parse(localStorage.getItem('lunetteDallasOrders')) || []; // User orders might be stored if needed across sessions for simulation

let siteInfo = JSON.parse(localStorage.getItem('lunetteDallasSiteInfo')) || {
    address: "123 Rue de la Vision, Béjaïa, Algérie",
    phone: "+213 550 12 34 56",
    email: "contact@lunettedallas.dz",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102438.26599504026!2d5.002941058380184!3d36.75280807075108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128d4e6a08a1a94b%3A0x2b159392ffd8030c!2sB%C3%A9ja%C3%AFa!5e0!3m2!1sfr!2sdz!4v1717059083388!5m2!1sfr!2sdz" // Default Béjaïa map
};

let categoryDisplayData = JSON.parse(localStorage.getItem('lunetteDallasCategories')) || {
    vue: { id: 'vue', name: 'Lunettes de Vue', image: 'https://placehold.co/400x300/a0aec0/4a5568?text=Lunettes+de+Vue', pageLink: 'vue.html', description: 'Styles variés pour un confort et une vision parfaits.' },
    soleil: { id: 'soleil', name: 'Lunettes de Soleil', image: 'https://placehold.co/400x300/a0aec0/4a5568?text=Lunettes+de+Soleil', pageLink: 'soleil.html', description: 'Protection UV et designs à la mode.' },
    homme: { id: 'homme', name: 'Lunettes Homme', image: 'https://placehold.co/400x300/90cdf4/2c5282?text=Lunettes+Homme', pageLink: 'homme.html', description: 'Designs masculins, du classique au moderne.' },
    femme: { id: 'femme', name: 'Lunettes Femme', image: 'https://placehold.co/400x300/fbb6ce/702459?text=Lunettes+Femme', pageLink: 'femme.html', description: 'Élégance et tendance pour toutes les occasions.' }
};

const algerianCities = ["Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arreridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal", "Béni Abbès", "In Salah", "In Guezzam", "Touggourt", "Djanet", "El M'Ghair", "El Meniaa"];
const CURRENCY_SYMBOL = "DA";

let currentDetailProduct = null;
let currentSelectedColor = null;
// newProductImages is now local to admin.js

// --- Utility Functions ---
const getEl = (id) => document.getElementById(id);
const querySelAll = (sel) => document.querySelectorAll(sel);
const querySel = (sel) => document.querySelector(sel); // Added for convenience

function generateId() { return 'p_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36); }
function formatPrice(price) { return `${parseFloat(price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${CURRENCY_SYMBOL}`; }

function showToast(message, type = 'success') {
    const toast = getEl('toast-notification');
    const toastMessage = getEl('toast-message');
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.className = 'fixed bottom-5 right-5 text-white py-3 px-6 rounded-lg shadow-xl transition-all duration-500 ease-in-out z-[101] transform';
    toast.classList.add(type === 'success' ? 'bg-green-600' : 'bg-red-600');
    toast.classList.remove('opacity-0', 'translate-y-full');
    toast.classList.add('opacity-100', 'translate-y-0');
    setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-full');
    }, 3000);
}

// --- Navigation Highlighting ---
function highlightActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop();
    const navLinksDesktop = querySelAll('header nav a.nav-link-header');
    const navLinksMobile = querySelAll('#mobile-menu a.nav-link-mobile'); // Assuming a class for mobile nav links

    navLinksDesktop.forEach(link => {
        link.classList.remove('active', 'text-teal-500', 'font-semibold', 'bg-teal-50');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active', 'text-teal-500', 'font-semibold', 'bg-teal-50');
        }
    });
    navLinksMobile.forEach(link => {
        link.classList.remove('active', 'text-teal-500', 'font-semibold', 'bg-teal-50');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active', 'text-teal-500', 'font-semibold', 'bg-teal-50');
        }
    });

    const accountLinkHeader = getEl('account-link-header');
     if (accountLinkHeader) {
        const accountPages = ['account.html', 'admin.html']; // user_dashboard is part of account.html now
        const onAccountRelatedPage = accountPages.includes(currentPath);
        accountLinkHeader.classList.toggle('active', onAccountRelatedPage);
        accountLinkHeader.classList.toggle('text-teal-500', onAccountRelatedPage);
    }
}


// --- Category Rendering (Homepage) ---
function renderCategoryCards() {
    const container = getEl('categories-container');
    if (!container) return;
    container.innerHTML = Object.values(categoryDisplayData).map(cat => `
        <div class="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <img src="${cat.image}" alt="${cat.name}" id="category-img-${cat.id}" class="w-full h-48 object-cover rounded-md mb-4 mx-auto" onerror="this.onerror=null;this.src='https://placehold.co/400x300/ccc/999?text=Image+Indisponible';">
            <h3 class="text-2xl font-semibold mb-2 text-teal-600">${cat.name}</h3>
            <p class="text-gray-600 mb-4">${cat.description}</p>
            <a href="${cat.pageLink}" class="text-teal-500 hover:text-teal-700 font-semibold">Voir plus <i class="fas fa-arrow-right ml-1"></i></a>
        </div>
    `).join('');
}

// --- Product Rendering ---
function renderProductCard(product) {
    const firstImage = product.images && product.images.length > 0 ? product.images[0] : 'https://placehold.co/300x200/e2e8f0/4a5568?text=Image+Manquante';
    const stockStatus = product.stock > 0 ? `${product.stock} disponibles` : 'Épuisé';
    const stockColor = product.stock > 0 ? 'text-green-600' : 'text-red-600';
    return `
        <div class="product-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 flex flex-col hover:shadow-2xl">
            <div class="relative">
                <img src="${firstImage}" alt="${product.name}" class="w-full h-56 object-cover cursor-pointer product-detail-link" data-product-id="${product.id}" onerror="this.onerror=null;this.src='https://placehold.co/300x200/ccc/999?text=Image+Indisponible';">
                ${product.stock === 0 ? '<span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">ÉPUISÉ</span>' : ''}
                ${product.type === 'soleil' ? '<span class="absolute top-2 left-2 bg-yellow-400 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full"><i class="fas fa-sun mr-1"></i>Solaire</span>' : ''}
                ${product.type === 'vue' ? '<span class="absolute top-2 left-2 bg-blue-400 text-white text-xs font-semibold px-2 py-1 rounded-full"><i class="fas fa-eye mr-1"></i>Vue</span>' : ''}
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <h3 class="text-lg font-semibold mb-1 text-gray-800 truncate product-detail-link cursor-pointer" title="${product.name}" data-product-id="${product.id}">${product.name}</h3>
                <p class="text-gray-500 capitalize text-xs mb-2">${product.gender}</p>
                <p class="text-xs mb-3 ${stockColor} font-medium">${stockStatus}</p>
                <div class="mt-auto">
                    <p class="text-2xl font-bold text-teal-600 mb-3">${formatPrice(product.price)}</p>
                    <button class="w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-lg transition duration-300 add-to-cart-btn ${product.stock === 0 ? 'opacity-50 cursor-not-allowed !bg-gray-400' : ''}" data-product-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus mr-2"></i>Ajouter
                    </button>
                </div>
            </div>
        </div>
    `;
}

function populateProducts(containerId, filterFn) {
    const containerEl = getEl(containerId);
    if (containerEl) {
        const productsToDisplay = filterFn ? products.filter(filterFn) : products;
        if (productsToDisplay.length > 0) {
            containerEl.innerHTML = productsToDisplay.map(renderProductCard).join('');
        } else {
            containerEl.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10 text-lg">Aucun produit à afficher.</p>`;
        }
        attachProductActionListeners();
    }
}

function attachProductActionListeners() {
    querySelAll('.add-to-cart-btn').forEach(button => {
        const newButton = button.cloneNode(true); // Clone to remove old listeners if any
        button.parentNode.replaceChild(newButton, button);
        if (!newButton.disabled) {
            newButton.addEventListener('click', (event) => {
                const productId = event.currentTarget.dataset.productId;
                const product = products.find(p => p.id === productId);
                if (product && product.stock > 0) {
                    const selectedColor = product.colors && product.colors.length > 0 ? product.colors[0] : undefined;
                    addToCart({ ...product, quantity: 1, selectedColor: selectedColor });
                } else if (product && product.stock === 0) {
                    showToast("Article épuisé.", "error");
                }
            });
        }
    });

    querySelAll('.product-detail-link').forEach(element => {
        element.addEventListener('click', (event) => {
            const productId = event.currentTarget.dataset.productId;
            localStorage.setItem('selectedProductId', productId);
            window.location.href = 'produit_detail.html';
        });
    });
}

// --- Cart Logic ---
function updateCartDisplay() {
    const cartCountElement = getEl('cart-count');
    const cartItemsContainer = getEl('cart-items-container'); // For cart.html
    const cartSubtotalElement = getEl('cart-subtotal'); // For cart.html
    const cartTotalElement = getEl('cart-total'); // For cart.html
    const goToCheckoutButton = getEl('go-to-checkout-button'); // For cart.html

    if (cartCountElement) {
        cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    localStorage.setItem('lunetteDallasCart', JSON.stringify(cart)); // Persist cart

    if (cartItemsContainer) { // Only on cart.html
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-gray-500 if-empty text-center py-10">Votre panier est actuellement vide.</p>';
            if (goToCheckoutButton) goToCheckoutButton.disabled = true;
        } else {
            cartItemsContainer.innerHTML = cart.map((item, index) => `
                <div class="flex flex-col sm:flex-row justify-between items-center py-4 border-b border-gray-200" data-product-id="${item.id}">
                    <div class="flex items-center mb-3 sm:mb-0 w-full sm:w-2/3">
                        <img src="${(item.images && item.images.length > 0 ? item.images[0] : 'https://placehold.co/80x80/e0e0e0/777?text=IMG')}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg mr-4 shadow" onerror="this.onerror=null;this.src='https://placehold.co/80x80/ccc/999?text=IMG';">
                        <div>
                            <h4 class="font-semibold text-gray-800">${item.name}</h4>
                            <p class="text-sm text-gray-500">${formatPrice(item.price)} ${item.selectedColor ? `- Couleur: ${item.selectedColor}` : ''}</p>
                        </div>
                    </div>
                    <div class="flex items-center w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0">
                        <div class="flex items-center">
                            <button class="px-2.5 py-1 border rounded-md cart-quantity-decrease hover:bg-gray-100 transition-colors" data-index="${index}">-</button>
                            <input type="number" value="${item.quantity}" min="1" class="w-12 p-1 border-t border-b text-center mx-1 focus:outline-none" readonly>
                            <button class="px-2.5 py-1 border rounded-md cart-quantity-increase hover:bg-gray-100 transition-colors" data-index="${index}">+</button>
                        </div>
                        <span class="font-semibold w-28 text-right mx-2 sm:mx-4 text-gray-700">${formatPrice(item.price * item.quantity)}</span>
                        <button class="text-red-500 hover:text-red-700 remove-from-cart-btn transition-colors" data-index="${index}" title="Retirer"><i class="fas fa-trash-alt fa-lg"></i></button>
                    </div>
                </div>`).join('');
            if (goToCheckoutButton) goToCheckoutButton.disabled = false;

            querySelAll('.cart-quantity-decrease').forEach(b => b.addEventListener('click', handleQuantityChange));
            querySelAll('.cart-quantity-increase').forEach(b => b.addEventListener('click', handleQuantityChange));
            querySelAll('.remove-from-cart-btn').forEach(b => b.addEventListener('click', handleRemoveItem));
        }
    }
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartSubtotalElement) cartSubtotalElement.textContent = formatPrice(subtotal);
    if (cartTotalElement) cartTotalElement.textContent = formatPrice(subtotal);
}

function handleQuantityChange(event) {
    const index = parseInt(event.currentTarget.dataset.index);
    const isIncrease = event.currentTarget.classList.contains('cart-quantity-increase');
    const productInCart = cart[index];
    const originalProduct = products.find(p => p.id === productInCart.id);

    if (isIncrease) {
        if (productInCart.quantity < originalProduct.stock) {
            productInCart.quantity++;
        } else {
            showToast(`Stock maximum atteint pour ${originalProduct.name}.`, "error");
        }
    } else {
        if (productInCart.quantity > 1) {
            productInCart.quantity--;
        } else {
            // Optionally ask for confirmation before removing if quantity becomes 0
            // For now, just remove if quantity is 1 and decrease is clicked
            cart.splice(index, 1);
            showToast(`${productInCart.name} retiré du panier.`, 'error');
        }
    }
    updateCartDisplay();
}

function handleRemoveItem(event) {
    const index = parseInt(event.currentTarget.dataset.index);
    const removedItemName = cart[index].name;
    cart.splice(index, 1);
    updateCartDisplay();
    showToast(`${removedItemName} retiré du panier.`, 'error');
}

function addToCart(productData) {
    const existingItemIndex = cart.findIndex(item => item.id === productData.id && item.selectedColor === productData.selectedColor);
    const originalProduct = products.find(p => p.id === productData.id);

    if (!originalProduct || originalProduct.stock < (productData.quantity || 1)) {
        showToast("Stock insuffisant.", "error"); return;
    }

    if (existingItemIndex > -1) {
        const potentialNewQuantity = cart[existingItemIndex].quantity + (productData.quantity || 1);
        if (potentialNewQuantity <= originalProduct.stock) {
            cart[existingItemIndex].quantity = potentialNewQuantity;
        } else {
            showToast(`Stock insuffisant pour ${originalProduct.name}. Seuls ${originalProduct.stock - cart[existingItemIndex].quantity} de plus peuvent être ajoutés.`, "error");
            return;
        }
    } else {
        cart.push({ ...productData });
    }
    updateCartDisplay();
    showToast(`${productData.name} ${productData.selectedColor ? '('+productData.selectedColor+') ' : ''}ajouté au panier !`);
}

// --- Product Detail Logic (produit_detail.html) ---
function loadProductDetail() {
    const productId = localStorage.getItem('selectedProductId');
    if (!productId) {
        // Handle case where no product ID is found, maybe redirect or show error
        const detailContainer = getEl('produit_detail_content'); // Assuming a main container for product detail
        if(detailContainer) detailContainer.innerHTML = "<p class='text-center text-red-500 py-10'>Produit non trouvé.</p>";
        return;
    }
    currentDetailProduct = products.find(p => p.id === productId);
    if (!currentDetailProduct) {
        const detailContainer = getEl('produit_detail_content');
        if(detailContainer) detailContainer.innerHTML = "<p class='text-center text-red-500 py-10'>Détails du produit non disponibles.</p>";
        return;
    }

    currentSelectedColor = (currentDetailProduct.colors && currentDetailProduct.colors.length > 0) ? currentDetailProduct.colors[0] : null;

    const mainImageEl = getEl('product-detail-main-image');
    const nameEl = getEl('product-detail-name');
    const categoryGenderEl = getEl('product-detail-category-gender');
    const descriptionEl = getEl('product-detail-description');
    const priceEl = getEl('product-detail-price');
    const quantityInputEl = getEl('product-detail-quantity');
    const addToCartBtnEl = getEl('product-detail-add-to-cart-btn');
    const thumbnailsContainerEl = getEl('product-detail-thumbnails-container');
    const colorsContainerEl = getEl('product-detail-colors-container');
    const selectedColorNameEl = getEl('product-detail-selected-color-name');
    const stockEl = getEl('product-detail-stock');


    if (mainImageEl) {
        mainImageEl.src = (currentDetailProduct.images && currentDetailProduct.images.length > 0) ? currentDetailProduct.images[0] : 'https://placehold.co/600x400/ccc/999?text=Image+Indisponible';
        mainImageEl.alt = currentDetailProduct.name;
    }
    if (nameEl) nameEl.textContent = currentDetailProduct.name;
    if (categoryGenderEl) categoryGenderEl.innerHTML = `Type: <span class="font-semibold">${currentDetailProduct.type}</span>, Genre: <span class="font-semibold">${currentDetailProduct.gender}</span>`;
    if (descriptionEl) descriptionEl.textContent = currentDetailProduct.description;
    if (priceEl) priceEl.textContent = formatPrice(currentDetailProduct.price);
    if (quantityInputEl) quantityInputEl.value = "1";
    if (addToCartBtnEl) addToCartBtnEl.dataset.productId = currentDetailProduct.id;

    if (thumbnailsContainerEl) {
        thumbnailsContainerEl.innerHTML = '';
        if (currentDetailProduct.images && currentDetailProduct.images.length > 1) {
            currentDetailProduct.images.forEach((imgSrc, index) => {
                const thumb = document.createElement('img');
                thumb.src = imgSrc; thumb.alt = `${currentDetailProduct.name} miniature ${index + 1}`;
                thumb.className = 'product-detail-thumbnail';
                if (index === 0) thumb.classList.add('active');
                thumb.addEventListener('click', () => {
                    if (mainImageEl) mainImageEl.src = imgSrc;
                    querySelAll('.product-detail-thumbnail.active').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                });
                thumbnailsContainerEl.appendChild(thumb);
            });
        }
    }

    if (colorsContainerEl && selectedColorNameEl) {
        colorsContainerEl.innerHTML = '';
        selectedColorNameEl.textContent = currentSelectedColor || 'N/A';
        if (currentDetailProduct.colors && currentDetailProduct.colors.length > 0) {
            currentDetailProduct.colors.forEach((color) => {
                const swatch = document.createElement('span');
                swatch.className = 'color-swatch';
                const cssColor = color.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/gi, '');
                swatch.style.backgroundColor = cssColor;
                 if (swatch.style.backgroundColor === '' || swatch.style.backgroundColor === 'transparent' || ['white', 'ivory', 'lightyellow', 'honeydew', 'azure', 'écaille', 'ecaille', 'écaillebrun', 'écaillefoncé'].includes(cssColor)) {
                    const predefinedColors = ['#D32F2F', '#303F9F', '#00796B', '#FBC02D', '#5D4037', '#455A64', '#C2185B', '#7B1FA2', '#FFA000', '#4CAF50'];
                    swatch.style.backgroundColor = predefinedColors[Math.abs(color.split("").reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)) % predefinedColors.length];
                    const initial = document.createElement('span'); initial.textContent = color.substring(0,1).toUpperCase();
                    initial.style.cssText = 'color:white; mix-blend-mode:difference; font-size:12px; display:flex; align-items:center; justify-content:center; width:100%; height:100%; font-weight:bold;';
                    swatch.appendChild(initial);
                    swatch.style.border = '1px solid #ccc';
                }
                swatch.title = color;
                if (color === currentSelectedColor) swatch.classList.add('active');
                swatch.addEventListener('click', () => {
                    currentSelectedColor = color; selectedColorNameEl.textContent = color;
                    querySelAll('.color-swatch.active').forEach(s => s.classList.remove('active'));
                    swatch.classList.add('active');
                });
                colorsContainerEl.appendChild(swatch);
            });
        } else {
            selectedColorNameEl.textContent = 'Couleur unique';
        }
    }

    if (stockEl && addToCartBtnEl) {
        if (currentDetailProduct.stock > 0) {
            stockEl.textContent = `En stock (${currentDetailProduct.stock})`;
            stockEl.className = 'ml-4 text-sm font-medium text-green-600';
            addToCartBtnEl.disabled = false;
            addToCartBtnEl.classList.remove('opacity-50', 'cursor-not-allowed', '!bg-gray-400');
        } else {
            stockEl.textContent = 'Épuisé';
            stockEl.className = 'ml-4 text-sm font-medium text-red-600';
            addToCartBtnEl.disabled = true;
            addToCartBtnEl.classList.add('opacity-50', 'cursor-not-allowed', '!bg-gray-400');
        }
    }
    // Add to cart from detail page
    if (addToCartBtnEl) {
        // Remove previous listener if any by cloning
        const newBtn = addToCartBtnEl.cloneNode(true);
        addToCartBtnEl.parentNode.replaceChild(newBtn, addToCartBtnEl);
        newBtn.addEventListener('click', (event) => {
            const productId = event.currentTarget.dataset.productId;
            if (productId === "0" || !productId || !currentDetailProduct) { showToast("Erreur produit.", "error"); return;}
            const quantityInput = getEl('product-detail-quantity');
            const quantity = parseInt(quantityInput.value) || 1;
            if (quantity <= 0) { showToast("Quantité invalide.", "error"); quantityInput.value = "1"; return; }
            if (currentDetailProduct.stock < quantity) { showToast(`Stock insuffisant. ${currentDetailProduct.stock} disponible(s).`, "error"); quantityInput.value = currentDetailProduct.stock > 0 ? currentDetailProduct.stock : "1"; return; }
            addToCart({ ...currentDetailProduct, quantity: quantity, selectedColor: currentSelectedColor });
        });
    }
}

// --- Checkout Logic (checkout.html) ---
function populateAlgerianCities() {
    const select = getEl('checkout-ville'); if (!select) return;
    select.innerHTML = '<option value="" disabled selected>-- Wilaya --</option>';
    algerianCities.sort().forEach(city => {
        const opt = document.createElement('option'); opt.value = city; opt.textContent = city; select.appendChild(opt);
    });
}
function handleCheckoutForm() {
    const form = getEl('customer-checkout-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const customerInfo = {
                prenom: getEl('checkout-prenom').value.trim(), nom: getEl('checkout-nom').value.trim(),
                adresse: getEl('checkout-adresse').value.trim(), telephone: getEl('checkout-telephone').value.trim(),
                ville: getEl('checkout-ville').value, email: getEl('checkout-email').value.trim(),
            };
            if (!customerInfo.prenom || !customerInfo.nom || !customerInfo.adresse || !customerInfo.telephone || !customerInfo.ville || !customerInfo.email) {
                showToast("Veuillez remplir tous les champs.", "error"); return;
            }
            if (!/^\S+@\S+\.\S+$/.test(customerInfo.email)) { showToast("Email invalide.", "error"); return; }
            if (!/^(05|06|07)\d{8}$/.test(customerInfo.telephone)) { showToast("Numéro de téléphone algérien invalide (ex: 05XXAAXXAA).", "error"); return; }

            const orderId = 'LD-' + Date.now().toString().slice(-6).toUpperCase();
            const newOrder = { orderId, customerInfo, items: [...cart], total: cart.reduce((s, i) => s + (i.price * i.quantity), 0), date: new Date().toISOString() };
            orders.push(newOrder);
            localStorage.setItem('lunetteDallasOrders', JSON.stringify(orders)); // Persist orders

            newOrder.items.forEach(cartItem => { // Update stock
                const productIndex = products.findIndex(p => p.id === cartItem.id);
                if (productIndex !== -1) { products[productIndex].stock -= cartItem.quantity; if (products[productIndex].stock < 0) products[productIndex].stock = 0; }
            });
            // Note: products array modification won't persist across sessions unless saved to localStorage too.
            // For this simulation, stock changes are in-memory for the current session.

            localStorage.setItem('lastOrderId', orderId); // Pass orderId to confirmation page
            cart = []; updateCartDisplay(); // Clear cart
            form.reset(); showToast('Commande passée!', 'success');
            window.location.href = 'verify.html';
        });
    }
}

// --- Order Confirmation (verify.html) ---
function displayOrderConfirmation() {
    const orderIdEl = getEl('confirmation-order-id');
    const lastOrderId = localStorage.getItem('lastOrderId');
    if (orderIdEl && lastOrderId) {
        orderIdEl.textContent = lastOrderId;
        // localStorage.removeItem('lastOrderId'); // Optional: clear after display
    } else if (orderIdEl) {
        orderIdEl.textContent = "N/A";
    }
}

// --- Search Logic ---
function handleSearchInput(query, suggestionsContainer, inputElement) {
    const searchTerm = query.toLowerCase().trim();
    suggestionsContainer.innerHTML = '';
    if (!searchTerm) { suggestionsContainer.classList.add('hidden'); return; }

    const matchedProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.type.toLowerCase().includes(searchTerm) ||
        p.gender.toLowerCase().includes(searchTerm)
    ).slice(0, 5);

    if (matchedProducts.length > 0) {
        matchedProducts.forEach(p => {
            const item = document.createElement('div');
            item.className = 'suggestion-item p-2 hover:bg-gray-100 cursor-pointer text-sm';
            item.textContent = p.name;
            item.addEventListener('click', () => {
                localStorage.setItem('selectedProductId', p.id);
                window.location.href = 'produit_detail.html';
                suggestionsContainer.classList.add('hidden');
                inputElement.value = '';
            });
            suggestionsContainer.appendChild(item);
        });
        suggestionsContainer.classList.remove('hidden');
    } else {
        suggestionsContainer.classList.add('hidden');
    }
}

function displaySearchResults() {
    const query = localStorage.getItem('searchQuery');
    const resultsContainer = getEl('search-results-container');
    const queryDisplay = getEl('search-query-display');
    const resultsCountDisplay = getEl('search-results-count');

    if (!query || !resultsContainer || !queryDisplay || !resultsCountDisplay) {
      if(resultsContainer) resultsContainer.innerHTML = "<p class='col-span-full text-center text-gray-500 py-10 text-lg'>Erreur lors de l'affichage des résultats.</p>";
      return;
    }
    queryDisplay.textContent = query;
    const searchTerm = query.toLowerCase().trim();

    const matchedProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.type.toLowerCase().includes(searchTerm) ||
        p.gender.toLowerCase().includes(searchTerm)
    );
    resultsCountDisplay.textContent = `${matchedProducts.length} résultat(s) trouvé(s).`;
    if (matchedProducts.length > 0) {
        resultsContainer.innerHTML = matchedProducts.map(renderProductCard).join('');
        attachProductActionListeners();
    } else {
        resultsContainer.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10 text-lg">Aucun produit ne correspond à votre recherche.</p>`;
    }
    // localStorage.removeItem('searchQuery'); // Optional: clear after display
}

// --- Contact Page Logic ---
function updateContactPageInfo() {
    if (getEl('contact-page-address')) getEl('contact-page-address').textContent = siteInfo.address;
    if (getEl('contact-page-phone')) getEl('contact-page-phone').textContent = siteInfo.phone;
    if (getEl('contact-page-email')) getEl('contact-page-email').textContent = siteInfo.email;
    if (getEl('contact-page-email-link')) getEl('contact-page-email-link').href = `mailto:${siteInfo.email}`;
}

function renderContactPageMap() {
    const mapContainer = getEl('contact-map-container');
    if (mapContainer) {
        if (siteInfo.mapUrl) {
            mapContainer.innerHTML = `<iframe src="${siteInfo.mapUrl}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
        } else {
            mapContainer.innerHTML = '<p class="text-center text-gray-500">Lien de la carte non configuré.</p>';
        }
    }
}

function handleContactForm() {
    const form = getEl('contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const feedbackEl = getEl('form-feedback');
            if (feedbackEl) {
                feedbackEl.innerHTML = '<p class="text-green-600">Merci ! Message envoyé (simulation).</p>';
                setTimeout(() => { feedbackEl.innerHTML = ''; }, 3000);
            }
            form.reset();
        });
    }
}

// --- Footer Logic ---
function updateFooterContactInfo() {
    if (getEl('footer-address')) getEl('footer-address').textContent = siteInfo.address;
    if (getEl('footer-phone')) getEl('footer-phone').textContent = siteInfo.phone;
    if (getEl('footer-email')) getEl('footer-email').textContent = siteInfo.email;
    if (getEl('footer-email-link')) getEl('footer-email-link').href = `mailto:${siteInfo.email}`;
    if (getEl('currentYear')) getEl('currentYear').textContent = new Date().getFullYear();
}


// --- General Event Listeners & Initializers ---
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split("/").pop();

    // Common for all pages
    updateFooterContactInfo();
    updateCartDisplay(); // Update cart count in header
    highlightActiveNavLink();
    if (typeof updateAccountLink === 'function') { // Check if auth.js is loaded and function exists
        updateAccountLink();
    }


    const mobileMenuButton = getEl('mobile-menu-button');
    const mobileMenu = getEl('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    }
    
    // Search bar listeners
    const searchInputDesktop = getEl('search-input');
    const searchSuggestionsDesktop = getEl('search-suggestions');
    if (searchInputDesktop && searchSuggestionsDesktop) {
        searchInputDesktop.addEventListener('input', () => handleSearchInput(searchInputDesktop.value, searchSuggestionsDesktop, searchInputDesktop));
        searchInputDesktop.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && searchInputDesktop.value.trim()) {
                localStorage.setItem('searchQuery', searchInputDesktop.value.trim());
                window.location.href = 'search_results.html';
                searchSuggestionsDesktop.classList.add('hidden');
            }
        });
        document.addEventListener('click', (event) => { // Hide suggestions on outside click
            if (!searchInputDesktop.contains(event.target) && !searchSuggestionsDesktop.contains(event.target)) {
                searchSuggestionsDesktop.classList.add('hidden');
            }
        });
    }

    const searchInputMobile = getEl('mobile-search-input');
    const searchSuggestionsMobile = getEl('mobile-search-suggestions');
    if (searchInputMobile && searchSuggestionsMobile) {
        searchInputMobile.addEventListener('input', () => handleSearchInput(searchInputMobile.value, searchSuggestionsMobile, searchInputMobile));
        searchInputMobile.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && searchInputMobile.value.trim()) {
                localStorage.setItem('searchQuery', searchInputMobile.value.trim());
                window.location.href = 'search_results.html';
                searchSuggestionsMobile.classList.add('hidden');
            }
        });
         document.addEventListener('click', (event) => { // Hide suggestions on outside click
            if (!searchInputMobile.contains(event.target) && !searchSuggestionsMobile.contains(event.target)) {
                searchSuggestionsMobile.classList.add('hidden');
            }
        });
    }


    // Page-specific initializations
    if (currentPage === 'index.html' || currentPage === '') {
        renderCategoryCards();
        populateProducts('featured-products-container', product => products.indexOf(product) < 4); // Example: first 4 as featured
    } else if (currentPage === 'vue.html') {
        populateProducts('lunettes_vue-products-container', p => p.type === 'vue');
    } else if (currentPage === 'soleil.html') {
        populateProducts('lunettes_soleil-products-container', p => p.type === 'soleil');
    } else if (currentPage === 'homme.html') {
        populateProducts('lunettes_homme-products-container', p => p.gender === 'homme' || p.gender === 'unisex');
    } else if (currentPage === 'femme.html') {
        populateProducts('lunettes_femme-products-container', p => p.gender === 'femme' || p.gender === 'unisex');
    } else if (currentPage === 'produit_detail.html') {
        loadProductDetail();
        const backBtn = getEl('back-to-products-btn');
        if(backBtn) backBtn.addEventListener('click', (e) => { e.preventDefault(); history.back();}); // Simple history back
    } else if (currentPage === 'panier.html') { // cart.html
        // updateCartDisplay is already called, specific cart page listeners are in updateCartDisplay
        const goToCheckoutBtn = getEl('go-to-checkout-button');
        if(goToCheckoutBtn) goToCheckoutBtn.addEventListener('click', () => {
             if (cart.length > 0) window.location.href = 'checkout.html'; else showToast('Panier vide.', 'error');
        });
    } else if (currentPage === 'checkout.html') {
        populateAlgerianCities();
        handleCheckoutForm();
    } else if (currentPage === 'verify.html') {
        displayOrderConfirmation();
        const continueShoppingBtn = querySel('button.nav-link[data-page="accueil"]'); // More specific selector
        if(continueShoppingBtn) continueShoppingBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    } else if (currentPage === 'search_results.html') {
        displaySearchResults();
    } else if (currentPage === 'contact.html') {
        updateContactPageInfo();
        renderContactPageMap();
        handleContactForm();
    }
    // Auth and Admin pages will have their specific initializers in auth.js and admin.js
});

