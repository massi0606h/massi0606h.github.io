// admin.js

// Global variables (products, orders, siteInfo, categoryDisplayData, currentUser, etc.)
// are expected to be defined and initialized by script.js and auth.js, loaded before admin.js.

let currentEditingProductId = null;
let newProductImages = []; // For product modal image uploads (specific to gestion_produits.html)

// --- Admin Navigation Highlighting ---
function highlightAdminNavLink() {
    const currentPath = window.location.pathname.split("/").pop();
    const adminNavLinks = document.querySelectorAll('#admin-main-nav a.admin-main-nav-link');
    // console.log("Highlighting admin nav for path:", currentPath); // Debug

    adminNavLinks.forEach(link => {
        link.classList.remove('text-teal-600', 'border-teal-600', 'font-semibold', 'bg-gray-100');
        link.classList.add('text-gray-500', 'hover:text-gray-700', 'border-transparent', 'hover:border-gray-300');

        if (link.getAttribute('href') === currentPath) {
            link.classList.add('text-teal-600', 'border-teal-600', 'font-semibold', 'bg-gray-100');
            link.classList.remove('text-gray-500', 'hover:text-gray-700', 'border-transparent', 'hover:border-gray-300');
        }
    });
}


// --- Admin Product Management (Functions for gestion_produits.html) ---
function renderAdminProductsTable() {
    console.log("renderAdminProductsTable called"); // Debug
    const adminProductsTableBody = document.getElementById('admin-products-table-body');
    if (!adminProductsTableBody) {
        console.error("Admin products table body (id: admin-products-table-body) not found!");
        return;
    }

    // Use the global 'products' array, assuming it's correctly initialized by script.js
    // (which loads from localStorage or defaults)
    console.log("Products data for table:", products); // Debug

    if (!products || products.length === 0) {
        adminProductsTableBody.innerHTML = `<tr><td colspan="8" class="text-center py-10 text-gray-500">Aucun produit à afficher.</td></tr>`;
        console.log("No products to display in admin table."); // Debug
        return;
    }
    adminProductsTableBody.innerHTML = products.map(p => `
        <tr data-product-id="${p.id}" class="hover:bg-gray-50 transition-colors">
            <td class="p-3 border border-gray-200"><img src="${(p.images && p.images.length > 0 ? p.images[0] : 'https://placehold.co/64x48/ccc/999?text=IMG')}" alt="${p.name}" class="w-16 h-12 object-cover rounded-md shadow" onerror="this.onerror=null;this.src='https://placehold.co/64x48/ccc/999?text=IMG';"></td>
            <td class="p-3 border border-gray-200 font-medium text-gray-700">${p.name}</td>
            <td class="p-3 border border-gray-200 capitalize">${p.type}</td>
            <td class="p-3 border border-gray-200 capitalize">${p.gender}</td>
            <td class="p-3 border border-gray-200">${formatPrice(p.price)}</td>
            <td class="p-3 border border-gray-200 ${p.stock > 0 ? 'text-green-600' : 'text-red-600'} font-semibold">${p.stock}</td>
            <td class="p-3 border border-gray-200 text-xs">${p.colors ? p.colors.join(', ') : 'N/A'}</td>
            <td class="p-3 border border-gray-200">
                <button class="edit-product-btn text-blue-600 hover:text-blue-800 btn-admin-action p-1 rounded hover:bg-blue-100" data-id="${p.id}" title="Modifier"><i class="fas fa-edit fa-lg"></i></button>
                <button class="delete-product-btn text-red-600 hover:text-red-800 btn-admin-action p-1 rounded hover:bg-red-100" data-id="${p.id}" title="Supprimer"><i class="fas fa-trash fa-lg"></i></button>
            </td>
        </tr>`).join('');
    console.log("Admin products table rendered with " + products.length + " products."); // Debug

    document.querySelectorAll('.edit-product-btn').forEach(btn => btn.addEventListener('click', handleEditProduct));
    document.querySelectorAll('.delete-product-btn').forEach(btn => btn.addEventListener('click', handleDeleteProduct));
}

function openProductModal(productData = null) {
    const productForm = document.getElementById('product-form');
    const productModal = document.getElementById('product-modal');
    const productImagePreviews = document.getElementById('product-image-previews');

    if (!productModal || !productForm) {
        console.error("Product modal or form not found for openProductModal");
        return;
    }
    productForm.reset();
    newProductImages = [];
    if (productImagePreviews) productImagePreviews.innerHTML = '';

    currentEditingProductId = productData ? productData.id : null;

    if (productData) {
        if (document.getElementById('product-modal-title')) document.getElementById('product-modal-title').textContent = 'Modifier Produit';
        if (document.getElementById('product-id-input')) document.getElementById('product-id-input').value = productData.id;
        if (document.getElementById('product-name-input')) document.getElementById('product-name-input').value = productData.name;
        if (document.getElementById('product-type-input')) document.getElementById('product-type-input').value = productData.type;
        if (document.getElementById('product-gender-input')) document.getElementById('product-gender-input').value = productData.gender;
        if (document.getElementById('product-price-input')) document.getElementById('product-price-input').value = productData.price;
        if (document.getElementById('product-stock-input')) document.getElementById('product-stock-input').value = productData.stock;
        if (document.getElementById('product-colors-input')) document.getElementById('product-colors-input').value = productData.colors ? productData.colors.join(',') : '';
        if (document.getElementById('product-description-input')) document.getElementById('product-description-input').value = productData.description;
        if (productData.images && productData.images.length > 0) {
            newProductImages = [...productData.images];
            renderImagePreviews();
        }
    } else {
        if (document.getElementById('product-modal-title')) document.getElementById('product-modal-title').textContent = 'Ajouter Produit';
        if (document.getElementById('product-id-input')) document.getElementById('product-id-input').value = '';
    }
    productModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const productModal = document.getElementById('product-modal');
    if (productModal) productModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    newProductImages = [];
    currentEditingProductId = null;
    const productForm = document.getElementById('product-form');
    if (productForm) productForm.reset();
    const imagePreviews = document.getElementById('product-image-previews');
    if (imagePreviews) imagePreviews.innerHTML = '';
}

function renderImagePreviews() {
    const productImagePreviews = document.getElementById('product-image-previews');
    if (!productImagePreviews) return;
    productImagePreviews.innerHTML = '';
    newProductImages.forEach((imgDataUrl, index) => {
        const pWrap = document.createElement('div');
        pWrap.className = 'img-preview-item group relative';
        const img = document.createElement('img');
        img.src = imgDataUrl;
        img.alt = `Aperçu ${index + 1}`;
        img.className = 'w-24 h-24 object-cover rounded border border-gray-300';

        const rmvBtn = document.createElement('button');
        rmvBtn.innerHTML = '×';
        rmvBtn.className = 'remove-preview-btn absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity leading-none hover:bg-red-700';
        rmvBtn.type = 'button';
        rmvBtn.title = "Retirer cette image";
        rmvBtn.onclick = () => {
            newProductImages.splice(index, 1);
            renderImagePreviews();
        };
        pWrap.appendChild(img);
        pWrap.appendChild(rmvBtn);
        productImagePreviews.appendChild(pWrap);
    });
}

function handleProductFormSubmit() {
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const id = currentEditingProductId;
            const colorsArray = document.getElementById('product-colors-input').value.split(',').map(c => c.trim()).filter(c => c);
            const nameValue = document.getElementById('product-name-input').value.trim();
            const descriptionValue = document.getElementById('product-description-input').value.trim();
            
            // Use the global 'products' array which should be up-to-date via script.js
            let currentProductsList = [...products]; // Create a working copy

            const productData = {
                name: nameValue,
                type: document.getElementById('product-type-input').value,
                gender: document.getElementById('product-gender-input').value,
                price: parseFloat(document.getElementById('product-price-input').value),
                images: [...newProductImages],
                colors: colorsArray,
                stock: parseInt(document.getElementById('product-stock-input').value) || 0,
                description: descriptionValue,
                tags: (nameValue.toLowerCase() + " " + descriptionValue.toLowerCase())
                      .match(/\b(\w+)\b/g) || []
                      .filter((word, index, self) => self.indexOf(word) === index)
            };

            if (!productData.name || !productData.price || isNaN(productData.price) || productData.price < 0 || isNaN(productData.stock) || productData.stock < 0) {
                showToast("Nom, prix et stock sont obligatoires et doivent être valides.", "error");
                return;
            }

            if (id) { // Editing
                const index = currentProductsList.findIndex(p => p.id === id);
                if (index !== -1) {
                    currentProductsList[index] = { ...currentProductsList[index], ...productData };
                    showToast('Produit mis à jour avec succès!', 'success');
                } else {
                    showToast('Erreur: Produit à modifier non trouvé.', 'error');
                    return;
                }
            } else { // Adding new
                const newProdId = generateId();
                currentProductsList.push({ id: newProdId, ...productData });
                showToast('Produit ajouté avec succès!', 'success');
            }
            
            products = [...currentProductsList]; // Update the global 'products' variable
            localStorage.setItem('lunetteDallasProducts', JSON.stringify(products)); // Persist

            closeProductModal();
            renderAdminProductsTable();
        });
    }
}

function handleEditProduct(event) {
    const id = event.currentTarget.dataset.id;
    // Use global 'products' array
    const productToEdit = products.find(p => p.id === id);
    if (productToEdit) {
        openProductModal(productToEdit);
    } else {
        console.error("Produit à modifier non trouvé (ID: " + id + ")");
    }
}

function handleDeleteProduct(event) {
    const id = event.currentTarget.dataset.id;
    let currentProductsList = [...products]; // Work with a copy of the global 'products'
    const productName = currentProductsList.find(p => p.id === id)?.name || "ce produit";

    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmationMessage = document.getElementById('confirmation-message');
    const confirmYesBtn = document.getElementById('confirm-yes-btn');
    const confirmNoBtn = document.getElementById('confirm-no-btn');

    if (confirmationModal && confirmationMessage && confirmYesBtn && confirmNoBtn) {
        confirmationMessage.textContent = `Êtes-vous sûr de vouloir supprimer "${productName}" ? Cette action est irréversible.`;
        confirmationModal.classList.remove('hidden');

        const newConfirmYesBtn = confirmYesBtn.cloneNode(true);
        confirmYesBtn.parentNode.replaceChild(newConfirmYesBtn, confirmYesBtn);
        
        const newConfirmNoBtn = confirmNoBtn.cloneNode(true);
        confirmNoBtn.parentNode.replaceChild(newConfirmNoBtn, confirmNoBtn);

        newConfirmYesBtn.addEventListener('click', function yesAction() {
            currentProductsList = currentProductsList.filter(p => p.id !== id);
            products = [...currentProductsList]; // Update global
            localStorage.setItem('lunetteDallasProducts', JSON.stringify(products));
            showToast(`"${productName}" a été supprimé.`, 'error');
            renderAdminProductsTable();
            confirmationModal.classList.add('hidden');
        });

        newConfirmNoBtn.addEventListener('click', function noAction() {
            confirmationModal.classList.add('hidden');
        });
    } else {
        if (confirm(`Êtes-vous sûr de vouloir supprimer "${productName}" ? Cette action est irréversible.`)) {
            currentProductsList = currentProductsList.filter(p => p.id !== id);
            products = [...currentProductsList];
            localStorage.setItem('lunetteDallasProducts', JSON.stringify(products));
            showToast(`"${productName}" a été supprimé.`, 'error');
            renderAdminProductsTable();
        }
    }
}

// --- Admin Order Management (Functions for voir_commandes.html) ---
function renderAdminOrders() {
    console.log("renderAdminOrders called"); // Debug
    const container = document.getElementById('admin-orders-container');
    if (!container) {
        console.error("Admin orders container (id: admin-orders-container) not found!");
        return;
    }
    // Use global 'orders' array
    console.log("Orders data for display:", orders); // Debug

    if (!orders || orders.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-10">Aucune commande pour le moment.</p>';
        return;
    }
    container.innerHTML = orders.sort((a, b) => new Date(b.date) - new Date(a.date)).map(order => `
        <div class="admin-card p-4 mb-4 border border-gray-200 rounded-lg">
            <div class="flex justify-between items-center mb-2">
                <h3 class="text-lg font-semibold text-teal-700">Commande #${order.orderId}</h3>
                <span class="text-sm text-gray-500">${new Date(order.date).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })}</span>
            </div>
            <p><strong>Client:</strong> ${order.customerInfo.prenom} ${order.customerInfo.nom} (<a href="mailto:${order.customerInfo.email}" class="text-blue-500 hover:underline">${order.customerInfo.email}</a>)</p>
            <p><strong>Téléphone:</strong> ${order.customerInfo.telephone}</p>
            <p><strong>Adresse:</strong> ${order.customerInfo.adresse}, ${order.customerInfo.ville}</p>
            <p class="mt-1"><strong>Total:</strong> <span class="font-bold text-xl text-teal-600">${formatPrice(order.total)}</span></p>
            <h4 class="font-medium mt-3 mb-1 text-gray-700">Articles commandés:</h4>
            <ul class="list-disc list-inside text-sm text-gray-600 pl-4 space-y-1">
                ${order.items.map(item => `<li>${item.name} (x${item.quantity}) ${item.selectedColor ? `- ${item.selectedColor}`: ''} - ${formatPrice(item.price * item.quantity)}</li>`).join('')}
            </ul>
        </div>`).join('');
    console.log("Admin orders rendered."); // Debug
}

// --- Admin Category Image Management (Functions for gestion_categories.html) ---
function renderAdminCategoriesEditor() {
    console.log("renderAdminCategoriesEditor called"); // Debug
    const container = document.getElementById('admin-categories-editor');
    if (!container) {
        console.error("Admin categories editor (id: admin-categories-editor) not found!");
        return;
    }
    // Use global 'categoryDisplayData'
    console.log("Category data for editor:", categoryDisplayData); // Debug

    if (!categoryDisplayData || Object.keys(categoryDisplayData).length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-10">Aucune catégorie à configurer.</p>';
        return;
    }
    container.innerHTML = Object.values(categoryDisplayData).map(cat => `
        <div class="admin-card p-4">
            <h3 class="text-lg font-semibold text-gray-700 mb-2">${cat.name}</h3>
            <div class="category-image-preview-container mb-3">
                <img src="${cat.image}" alt="${cat.name}" class="category-image-preview" id="admin-cat-img-${cat.id}">
            </div>
            <label for="cat-img-upload-${cat.id}" class="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg text-sm text-center cursor-pointer">
                <i class="fas fa-upload mr-2"></i>Changer l'image
            </label>
            <input type="file" id="cat-img-upload-${cat.id}" class="hidden" accept="image/*" data-category-id="${cat.id}">
        </div>
    `).join('');
    console.log("Admin categories editor rendered."); // Debug

    document.querySelectorAll('input[type="file"][data-category-id]').forEach(input => {
        input.addEventListener('change', handleAdminCategoryImageUpload);
    });
}

function handleAdminCategoryImageUpload(event) {
    const file = event.target.files[0];
    const categoryId = event.target.dataset.categoryId;
    // Work with a copy of the global 'categoryDisplayData'
    let currentCategoryData = {...categoryDisplayData};

    if (file && categoryId && currentCategoryData[categoryId]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const newImageUrl = e.target.result;
            currentCategoryData[categoryId].image = newImageUrl;
            localStorage.setItem('lunetteDallasCategories', JSON.stringify(currentCategoryData));
            categoryDisplayData = {...currentCategoryData}; // Update global

            const previewImgAdmin = document.getElementById(`admin-cat-img-${categoryId}`);
            if (previewImgAdmin) previewImgAdmin.src = newImageUrl;
            showToast(`L'image de la catégorie "${currentCategoryData[categoryId].name}" a été mise à jour.`);
        }
        reader.readAsDataURL(file);
        event.target.value = null;
    }
}

// --- Admin Site Info Management (Functions for info_site.html) ---
function renderAdminSiteInfoEditor() {
    console.log("renderAdminSiteInfoEditor called"); // Debug
    // Use global 'siteInfo'
    console.log("Site info for editor:", siteInfo); // Debug
    if (document.getElementById('site-info-address')) document.getElementById('site-info-address').value = siteInfo.address;
    if (document.getElementById('site-info-phone')) document.getElementById('site-info-phone').value = siteInfo.phone;
    if (document.getElementById('site-info-email')) document.getElementById('site-info-email').value = siteInfo.email;
    if (document.getElementById('site-info-map-url')) document.getElementById('site-info-map-url').value = siteInfo.mapUrl;
    console.log("Admin site info editor rendered."); // Debug
}

function handleSiteInfoFormSubmit() {
    const siteInfoForm = document.getElementById('site-info-form');
    if (siteInfoForm) {
        siteInfoForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let currentSiteInfo = {...siteInfo}; // Work with a copy
            currentSiteInfo.address = document.getElementById('site-info-address').value;
            currentSiteInfo.phone = document.getElementById('site-info-phone').value;
            currentSiteInfo.email = document.getElementById('site-info-email').value;
            currentSiteInfo.mapUrl = document.getElementById('site-info-map-url').value;

            localStorage.setItem('lunetteDallasSiteInfo', JSON.stringify(currentSiteInfo));
            siteInfo = {...currentSiteInfo}; // Update global
            showToast('Informations du site mises à jour!', 'success');
            if (typeof updateFooterContactInfo === 'function') {
                updateFooterContactInfo(); 
            }
        });
    }
}

// --- DOMContentLoaded Main Logic for Admin Pages ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("Admin page DOMContentLoaded - Start");
    const currentPage = window.location.pathname.split("/").pop();
    console.log("Admin current page:", currentPage);
    const localCurrentUser = JSON.parse(localStorage.getItem('lunetteDallasCurrentUser'));

    if (!localCurrentUser || !localCurrentUser.isAdmin) {
        console.warn("Admin access denied. Redirecting to account.html");
        showToast("Accès non autorisé. Veuillez vous connecter en tant qu'administrateur.", "error");
        setTimeout(() => { window.location.href = 'account.html'; }, 500);
        return;
    }
    currentUser = localCurrentUser; 
    console.log("Admin user authenticated:", currentUser.name);

    if(document.getElementById('admin-dashboard-welcome-message')) {
        document.getElementById('admin-dashboard-welcome-message').textContent = `Tableau de Bord - ${currentUser.name}`;
    }

    highlightAdminNavLink(); 

    if (currentPage === 'gestion_produits.html') {
        console.log("Initializing gestion_produits.html specific functions");
        renderAdminProductsTable();
        
        const addNewProductBtn = document.getElementById('add-new-product-btn');
        if (addNewProductBtn) addNewProductBtn.addEventListener('click', () => openProductModal());

        const closeProductModalBtn = document.getElementById('close-product-modal-btn');
        if (closeProductModalBtn) closeProductModalBtn.addEventListener('click', closeProductModal);
        
        const cancelProductFormBtn = document.getElementById('cancel-product-form-btn');
        if (cancelProductFormBtn) cancelProductFormBtn.addEventListener('click', closeProductModal);

        const productModalEl = document.getElementById('product-modal');
        if(productModalEl) window.addEventListener('click', (event) => {
            if (event.target === productModalEl) closeProductModal();
        });
        
        const productImageUpload = document.getElementById('product-image-upload');
        if (productImageUpload) {
            productImageUpload.addEventListener('change', (event) => {
                const files = event.target.files; if (!files) return;
                Array.from(files).forEach(file => {
                    if (newProductImages.length >= 5) {
                        showToast("Vous ne pouvez télécharger que 5 images au maximum.", "error");
                        return;
                    }
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        newProductImages.push(e.target.result);
                        renderImagePreviews();
                    }
                    reader.readAsDataURL(file);
                });
                event.target.value = null; 
            });
        }
        handleProductFormSubmit(); 

        const productTypeSelect = document.getElementById('product-type-input');
        if (productTypeSelect && productTypeSelect.options.length <= 1) {
            ['vue', 'soleil'].forEach(opt => {
                const option = document.createElement('option');
                option.value = opt; option.textContent = opt.charAt(0).toUpperCase() + opt.slice(1);
                productTypeSelect.appendChild(option);
            });
        }
        const productGenderSelect = document.getElementById('product-gender-input');
        if (productGenderSelect && productGenderSelect.options.length <=1) {
            ['homme', 'femme', 'unisex'].forEach(opt => {
                const option = document.createElement('option');
                option.value = opt; option.textContent = opt.charAt(0).toUpperCase() + opt.slice(1);
                productGenderSelect.appendChild(option);
            });
        }
        const closeConfirmModalBtn = document.getElementById('close-confirmation-modal-btn'); 
        const confirmationModal = document.getElementById('confirmation-modal'); 
        if (closeConfirmModalBtn && confirmationModal) { 
            closeConfirmModalBtn.addEventListener('click', () => {
                confirmationModal.classList.add('hidden');
            });
        }
    } else if (currentPage === 'voir_commandes.html') {
        console.log("Initializing voir_commandes.html specific functions");
        renderAdminOrders();
    } else if (currentPage === 'gestion_categories.html') {
        console.log("Initializing gestion_categories.html specific functions");
        renderAdminCategoriesEditor();
    } else if (currentPage === 'info_site.html') {
        console.log("Initializing info_site.html specific functions");
        renderAdminSiteInfoEditor();
        handleSiteInfoFormSubmit(); 
    } else if (currentPage === 'admin.html') {
        console.log("Admin hub page (admin.html) loaded.");
    }
    console.log("Admin page DOMContentLoaded - End");
});