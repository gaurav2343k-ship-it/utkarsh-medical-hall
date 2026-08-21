/**
 * UTKARSH MEDICAL HALL - ADMIN DASHBOARD CONTROLLER
 */

const AdminApp = {
  products: [],
  orders: [],
  settings: {},

  init: async () => {
    // 1. Auth Guard
    if (!UtkarshDB.isAdminLoggedIn()) {
      window.location.href = 'admin-login.html';
      return;
    }

    // 2. Load Data
    await AdminApp.loadData();

    // 3. Render Views
    AdminApp.renderStats();
    AdminApp.renderProductsTable();
    AdminApp.renderOrdersTable();
    AdminApp.renderLowStockTable();
    AdminApp.populateSettingsForm();

    // 4. Bind Events
    AdminApp.bindNavigation();
    AdminApp.bindSearch();
  },

  loadData: async () => {
    AdminApp.products = await UtkarshDB.getProducts();
    AdminApp.orders = await UtkarshDB.getOrders();
    AdminApp.settings = UtkarshDB.getSettings();
  },

  // Calculate & Render Metric Cards
  renderStats: () => {
    const totalProdEl = document.getElementById('stat-total-products');
    const totalOrdEl = document.getElementById('stat-total-orders');
    const lowStockEl = document.getElementById('stat-low-stock');
    const totalRevEl = document.getElementById('stat-total-revenue');

    const totalProducts = AdminApp.products.length;
    const totalOrders = AdminApp.orders.length;
    const lowStockCount = AdminApp.products.filter(p => !p.inStock).length;
    
    const revenue = AdminApp.orders.reduce((sum, o) => {
      const amt = typeof o.totalAmount === 'number' ? o.totalAmount : 0;
      return sum + amt;
    }, 0);

    if (totalProdEl) totalProdEl.textContent = totalProducts;
    if (totalOrdEl) totalOrdEl.textContent = totalOrders;
    if (lowStockEl) lowStockEl.textContent = lowStockCount;
    if (totalRevEl) totalRevEl.textContent = `₹${revenue.toLocaleString()}`;
  },

  // Tab Navigation
  bindNavigation: () => {
    const navLinks = document.querySelectorAll('.admin-nav-item a');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = link.getAttribute('data-tab');
        
        document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
        link.parentElement.classList.add('active');

        document.querySelectorAll('.admin-tab-section').forEach(sec => sec.classList.remove('active'));
        const targetSec = document.getElementById(`tab-section-${tabId}`);
        if (targetSec) targetSec.classList.add('active');

        // Close sidebar on mobile
        const sidebar = document.querySelector('.admin-sidebar');
        if (sidebar) sidebar.classList.remove('open');
      });
    });

    const menuToggle = document.getElementById('admin-menu-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        document.querySelector('.admin-sidebar').classList.toggle('open');
      });
    }
  },

  // Products Table Search
  bindSearch: () => {
    const prodSearch = document.getElementById('admin-product-search');
    if (prodSearch) {
      prodSearch.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        const filtered = AdminApp.products.filter(p => 
          p.name.toLowerCase().includes(q) || 
          p.category.toLowerCase().includes(q) || 
          (p.composition && p.composition.toLowerCase().includes(q))
        );
        AdminApp.renderProductsTable(filtered);
      });
    }
  },

  // Render Product Inventory Table
  renderProductsTable: (list = AdminApp.products) => {
    const tbody = document.getElementById('admin-products-tbody');
    if (!tbody) return;

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:2rem;color:#64748b;">No medicines found.</td></tr>`;
      return;
    }

    let html = '';
    list.forEach(p => {
      html += `
        <tr>
          <td>
            <img src="${p.image}" alt="${p.name}" class="table-product-thumb" onerror="this.src='https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60'">
          </td>
          <td>
            <strong style="color:#0f172a;display:block;">${p.name}</strong>
            <span style="font-size:0.8rem;color:#64748b;">${p.composition || p.dosageForm}</span>
          </td>
          <td><span style="text-transform:capitalize;font-weight:600;font-size:0.85rem;color:#0d9488;">${p.categoryName || p.category}</span></td>
          <td>
            <strong style="color:#0f172a;">₹${p.price}</strong> 
            ${p.mrp ? `<span style="font-size:0.8rem;color:#94a3b8;text-decoration:line-through;">₹${p.mrp}</span>` : ''}
          </td>
          <td>
            ${p.requiresRx ? '<span class="table-badge badge-low-stock">Rx Required</span>' : '<span class="table-badge badge-in-stock">OTC</span>'}
          </td>
          <td>
            <button onclick="AdminApp.toggleStock('${p.id}')" class="table-badge ${p.inStock ? 'badge-in-stock' : 'badge-out-stock'}" style="cursor:pointer;border:none;">
              ${p.inStock ? '● In Stock' : '✕ Out of Stock'}
            </button>
          </td>
          <td>
            <div class="table-actions">
              <button class="btn-icon-action" title="Edit Medicine" onclick="AdminApp.openEditModal('${p.id}')">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="btn-icon-action delete" title="Delete Medicine" onclick="AdminApp.deleteProduct('${p.id}')">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  },

  // Toggle Stock Status
  toggleStock: async (id) => {
    const p = AdminApp.products.find(item => item.id === id);
    if (p) {
      p.inStock = !p.inStock;
      await UtkarshDB.saveProduct(p);
      AdminApp.renderProductsTable();
      AdminApp.renderStats();
      AdminApp.renderLowStockTable();
      showToast(`Updated stock status for ${p.name}`);
    }
  },

  // Open Add Product Modal
  openAddModal: () => {
    document.getElementById('product-modal-title').textContent = 'Add New Medicine / Product';
    document.getElementById('product-form').reset();
    document.getElementById('edit-product-id').value = '';
    document.getElementById('admin-product-modal').classList.add('active');
  },

  // Open Edit Product Modal
  openEditModal: (id) => {
    const p = AdminApp.products.find(item => item.id === id);
    if (!p) return;

    document.getElementById('product-modal-title').textContent = 'Edit Medicine Details';
    document.getElementById('edit-product-id').value = p.id;
    document.getElementById('modal-prod-name').value = p.name || '';
    document.getElementById('modal-prod-category').value = p.category || 'otc';
    document.getElementById('modal-prod-composition').value = p.composition || '';
    document.getElementById('modal-prod-manufacturer').value = p.manufacturer || '';
    document.getElementById('modal-prod-price').value = p.price || 0;
    document.getElementById('modal-prod-mrp').value = p.mrp || p.price;
    document.getElementById('modal-prod-dosage').value = p.dosageForm || '';
    document.getElementById('modal-prod-rx').checked = !!p.requiresRx;
    document.getElementById('modal-prod-image').value = p.image || '';
    document.getElementById('modal-prod-desc').value = p.description || '';

    document.getElementById('admin-product-modal').classList.add('active');
  },

  closeProductModal: () => {
    document.getElementById('admin-product-modal').classList.remove('active');
  },

  // Save Product (Add or Update)
  saveProductForm: async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-product-id').value || 'MED-' + Date.now();
    const name = document.getElementById('modal-prod-name').value;
    const category = document.getElementById('modal-prod-category').value;
    const composition = document.getElementById('modal-prod-composition').value;
    const manufacturer = document.getElementById('modal-prod-manufacturer').value;
    const price = parseFloat(document.getElementById('modal-prod-price').value) || 0;
    const mrp = parseFloat(document.getElementById('modal-prod-mrp').value) || price;
    const dosageForm = document.getElementById('modal-prod-dosage').value;
    const requiresRx = document.getElementById('modal-prod-rx').checked;
    let image = document.getElementById('modal-prod-image').value;
    const description = document.getElementById('modal-prod-desc').value;

    if (!image) {
      image = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60';
    }

    const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

    const productObj = {
      id,
      name,
      category,
      categoryName: category.toUpperCase(),
      composition,
      manufacturer,
      price,
      mrp,
      discount,
      dosageForm,
      requiresRx,
      inStock: true,
      image,
      description
    };

    await UtkarshDB.saveProduct(productObj);
    await AdminApp.loadData();
    AdminApp.renderProductsTable();
    AdminApp.renderStats();
    AdminApp.closeProductModal();
    showToast('Product saved successfully!', 'success');
  },

  // Delete Product
  deleteProduct: async (id) => {
    if (confirm('Are you sure you want to remove this product from the catalog?')) {
      await UtkarshDB.deleteProduct(id);
      await AdminApp.loadData();
      AdminApp.renderProductsTable();
      AdminApp.renderStats();
      showToast('Product deleted from inventory.', 'info');
    }
  },

  // Render Orders & Prescriptions Table
  renderOrdersTable: () => {
    const tbody = document.getElementById('admin-orders-tbody');
    if (!tbody) return;

    if (AdminApp.orders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:2rem;color:#64748b;">No active orders or prescription requests.</td></tr>`;
      return;
    }

    let html = '';
    AdminApp.orders.forEach(o => {
      let badgeClass = 'badge-pending';
      if (o.status === 'Verified') badgeClass = 'badge-in-stock';
      if (o.status === 'Delivered') badgeClass = 'badge-in-stock';
      if (o.status === 'Cancelled') badgeClass = 'badge-out-stock';

      html += `
        <tr>
          <td><strong>#${o.id}</strong></td>
          <td>
            <div style="font-weight:600;color:#0f172a;">${o.customerName}</div>
            <div style="font-size:0.8rem;color:#64748b;"><i class="fa-solid fa-phone" style="font-size:0.75rem;"></i> ${o.customerPhone}</div>
          </td>
          <td>
            <span style="font-weight:600;font-size:0.85rem;color:#0f766e;">${o.type}</span>
            <div style="font-size:0.8rem;color:#64748b;max-width:220px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              ${o.items || o.notes || 'Prescription image attached'}
            </div>
          </td>
          <td><span style="font-size:0.85rem;color:#64748b;">${o.date}</span></td>
          <td><strong>${typeof o.totalAmount === 'number' ? '₹' + o.totalAmount : o.totalAmount}</strong></td>
          <td>
            <select onchange="AdminApp.updateOrderStatus('${o.id}', this.value)" style="padding:0.35rem 0.6rem;border-radius:6px;border:1px solid #cbd5e1;font-size:0.82rem;font-weight:600;">
              <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>⏳ Pending</option>
              <option value="Verified" ${o.status === 'Verified' ? 'selected' : ''}>✓ Verified</option>
              <option value="Dispatched" ${o.status === 'Dispatched' ? 'selected' : ''}>🚚 Dispatched</option>
              <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>🎉 Delivered</option>
              <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>✕ Cancelled</option>
            </select>
          </td>
          <td>
            <button class="btn btn-primary btn-sm" onclick="AdminApp.openOrderDetails('${o.id}')">
              View
            </button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  },

  updateOrderStatus: async (orderId, newStatus) => {
    await UtkarshDB.updateOrderStatus(orderId, newStatus);
    await AdminApp.loadData();
    AdminApp.renderOrdersTable();
    showToast(`Order #${orderId} status updated to ${newStatus}`);
  },

  openOrderDetails: (orderId) => {
    const o = AdminApp.orders.find(item => item.id === orderId);
    if (!o) return;

    alert(`Order Details (#${o.id})\n\nCustomer: ${o.customerName}\nPhone: ${o.customerPhone}\nAddress: ${o.customerAddress}\nType: ${o.type}\nDetails: ${o.items || o.notes}\nTotal: ${o.totalAmount}\nStatus: ${o.status}`);
  },

  // Render Low Stock Table
  renderLowStockTable: () => {
    const tbody = document.getElementById('admin-lowstock-tbody');
    if (!tbody) return;

    const outOfStock = AdminApp.products.filter(p => !p.inStock);

    if (outOfStock.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:2rem;color:#059669;"><i class="fa-solid fa-check-circle"></i> All inventory items are currently well-stocked!</td></tr>`;
      return;
    }

    let html = '';
    outOfStock.forEach(p => {
      html += `
        <tr>
          <td><img src="${p.image}" class="table-product-thumb"></td>
          <td><strong>${p.name}</strong><br><span style="font-size:0.8rem;color:#64748b;">${p.composition}</span></td>
          <td>${p.manufacturer}</td>
          <td><span class="table-badge badge-out-stock">Out of Stock</span></td>
          <td>
            <button class="btn btn-primary btn-sm" onclick="AdminApp.toggleStock('${p.id}')">
              Mark Restocked
            </button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  },

  // Populate & Save Settings
  populateSettingsForm: () => {
    const s = AdminApp.settings;
    if (document.getElementById('set-store-name')) {
      document.getElementById('set-store-name').value = s.storeName || '';
      document.getElementById('set-phone').value = s.phone || '';
      document.getElementById('set-whatsapp').value = s.whatsapp || '';
      document.getElementById('set-email').value = s.email || '';
      document.getElementById('set-address').value = s.address || '';
      document.getElementById('set-hours').value = s.hours || '';
      document.getElementById('set-license').value = s.drugLicense || '';
    }
  },

  saveSettingsForm: (e) => {
    e.preventDefault();
    const updated = {
      storeName: document.getElementById('set-store-name').value,
      phone: document.getElementById('set-phone').value,
      whatsapp: document.getElementById('set-whatsapp').value,
      email: document.getElementById('set-email').value,
      address: document.getElementById('set-address').value,
      hours: document.getElementById('set-hours').value,
      drugLicense: document.getElementById('set-license').value
    };

    UtkarshDB.saveSettings(updated);
    AdminApp.settings = updated;
    showToast('Pharmacy settings updated successfully!', 'success');
  },

  // Export JSON Backup
  exportData: () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AdminApp.products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `utkarsh_inventory_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Inventory exported to JSON backup.');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AdminApp.init();
});
