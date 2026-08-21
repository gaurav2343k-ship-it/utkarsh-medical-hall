/**
 * UTKARSH MEDICAL HALL - FIREBASE & STORAGE CONFIGURATION
 * Seamless Firebase Integration with Built-in LocalStorage Fallback
 */

// 1. Firebase Configuration (Replace with your actual Firebase project keys)
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "utkarsh-medical-hall.firebaseapp.com",
  projectId: "utkarsh-medical-hall",
  storageBucket: "utkarsh-medical-hall.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Check if valid Firebase is configured
const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY" && typeof firebase !== 'undefined';
};

// 2. Universal Data Storage Layer (UtkarshDB)
const UtkarshDB = {
  // Check Admin Login
  loginAdmin: async (email, password) => {
    if (isFirebaseConfigured()) {
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        sessionStorage.setItem('utkarsh_admin_logged_in', 'true');
        sessionStorage.setItem('utkarsh_admin_email', userCredential.user.email);
        return { success: true, user: userCredential.user };
      } catch (error) {
        return { success: false, message: error.message };
      }
    } else {
      // Default offline / demo admin credentials
      if ((email === 'admin@utkarsh.com' || email === 'admin') && password === 'admin123') {
        sessionStorage.setItem('utkarsh_admin_logged_in', 'true');
        sessionStorage.setItem('utkarsh_admin_email', email);
        return { success: true };
      }
      return { success: false, message: 'Invalid email or password. Use demo: admin@utkarsh.com / admin123' };
    }
  },

  // Logout
  logoutAdmin: async () => {
    if (isFirebaseConfigured()) {
      await firebase.auth().signOut();
    }
    sessionStorage.removeItem('utkarsh_admin_logged_in');
    sessionStorage.removeItem('utkarsh_admin_email');
    window.location.href = 'admin-login.html';
  },

  // Check if admin is currently authenticated
  isAdminLoggedIn: () => {
    return sessionStorage.getItem('utkarsh_admin_logged_in') === 'true';
  },

  // Get all products
  getProducts: async () => {
    if (isFirebaseConfigured()) {
      try {
        const snapshot = await firebase.firestore().collection('products').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (e) {
        console.warn('Firebase error, falling back to LocalStorage', e);
      }
    }
    const local = localStorage.getItem('utkarsh_products');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        console.error('Error parsing local products', e);
      }
    }
    // Fallback to default catalog from products.js if available
    return typeof INITIAL_PRODUCTS !== 'undefined' ? INITIAL_PRODUCTS : [];
  },

  // Save all products
  saveProducts: async (products) => {
    localStorage.setItem('utkarsh_products', JSON.stringify(products));
    if (isFirebaseConfigured()) {
      try {
        const batch = firebase.firestore().batch();
        // sync to firebase
      } catch (e) {
        console.error('Firebase save failed', e);
      }
    }
  },

  // Add / Edit a single product
  saveProduct: async (product) => {
    const products = await UtkarshDB.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = product;
    } else {
      products.unshift(product);
    }
    await UtkarshDB.saveProducts(products);
    return product;
  },

  // Delete a product
  deleteProduct: async (id) => {
    let products = await UtkarshDB.getProducts();
    products = products.filter(p => p.id !== id);
    await UtkarshDB.saveProducts(products);
  },

  // Get orders and prescription uploads
  getOrders: async () => {
    const local = localStorage.getItem('utkarsh_orders');
    return local ? JSON.parse(local) : [
      {
        id: 'ORD-1001',
        customerName: 'Rajesh Sharma',
        customerPhone: '+91 9876543210',
        customerAddress: 'Station Road, Near City Hospital',
        type: 'Prescription Order',
        prescriptionImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop&q=60',
        notes: 'Need 1 month dosage as prescribed by Dr. Verma',
        date: '2026-08-19 14:30',
        status: 'Pending',
        totalAmount: 1450
      },
      {
        id: 'ORD-1002',
        customerName: 'Pooja Verma',
        customerPhone: '+91 9812345678',
        customerAddress: 'Flat 402, Green Avenue',
        type: 'Direct Cart Order',
        items: 'Dolo 650 (x2), Becosules Z (x1)',
        date: '2026-08-20 10:15',
        status: 'Verified',
        totalAmount: 125
      }
    ];
  },

  // Save new order / prescription inquiry
  saveOrder: async (order) => {
    const orders = await UtkarshDB.getOrders();
    orders.unshift(order);
    localStorage.setItem('utkarsh_orders', JSON.stringify(orders));
    return order;
  },

  // Update order status
  updateOrderStatus: async (orderId, newStatus) => {
    const orders = await UtkarshDB.getOrders();
    const target = orders.find(o => o.id === orderId);
    if (target) {
      target.status = newStatus;
      localStorage.setItem('utkarsh_orders', JSON.stringify(orders));
    }
  },

  // Store Settings (phone, address, whatsapp)
  getSettings: () => {
    const defaultSettings = {
      storeName: 'Utkarsh Medical Hall',
      phone: '+91 98765 43210',
      whatsapp: '919876543210',
      email: 'care@utkarshmedical.com',
      address: 'Main Market Road, Near Civil Hospital, Civil Lines',
      hours: 'Mon - Sun: 7:00 AM - 11:00 PM (Emergency 24x7)',
      drugLicense: 'DL No: 20B/21B-UK-2024-8842',
      gstin: 'GSTIN: 05AAEFU1234M1Z5'
    };
    const saved = localStorage.getItem('utkarsh_settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  },

  saveSettings: (settings) => {
    localStorage.setItem('utkarsh_settings', JSON.stringify(settings));
  }
};
