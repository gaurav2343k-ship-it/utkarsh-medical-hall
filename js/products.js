/**
 * UTKARSH MEDICAL HALL - PRODUCT CATALOG & DATA ENGINE
 */

const INITIAL_PRODUCTS = [
  // --- OTC & Pain Relief ---
  {
    id: 'MED-101',
    name: 'Dolo 650 Tablet',
    category: 'otc',
    categoryName: 'OTC & Pain Relief',
    composition: 'Paracetamol (650mg)',
    manufacturer: 'Micro Labs Ltd',
    price: 32,
    mrp: 35,
    discount: 8,
    dosageForm: 'Strip of 15 Tablets',
    requiresRx: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 324,
    description: 'Dolo 650 is an analgesic and antipyretic medication used to relieve mild to moderate pain and reduce fever.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'MED-102',
    name: 'Volini Pain Relief Gel',
    category: 'otc',
    categoryName: 'OTC & Pain Relief',
    composition: 'Diclofenac Diethylamine (1.16% w/w) + Menthol',
    manufacturer: 'Sun Pharma',
    price: 135,
    mrp: 155,
    discount: 13,
    dosageForm: '50g Tube',
    requiresRx: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 180,
    description: 'Fast acting pain relief gel for joint pain, backache, neck pain, sprains and muscle aches with quick absorption.',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'MED-103',
    name: 'Digene Gel Antacid (Mint)',
    category: 'otc',
    categoryName: 'OTC & Pain Relief',
    composition: 'Magnesium Hydroxide + Aluminium Hydroxide + Simethicone',
    manufacturer: 'Abbott Healthcare',
    price: 148,
    mrp: 170,
    discount: 13,
    dosageForm: '200ml Bottle',
    requiresRx: false,
    inStock: true,
    rating: 4.7,
    reviewsCount: 142,
    description: 'Provides quick and effective relief from acidity, heartburn, gas, and stomach upset with a refreshing mint taste.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'MED-104',
    name: 'Electral Powder (Apple Flavor)',
    category: 'otc',
    categoryName: 'OTC & Pain Relief',
    composition: 'WHO Formula Oral Rehydration Salts (ORS)',
    manufacturer: 'FDC Ltd',
    price: 21,
    mrp: 23,
    discount: 9,
    dosageForm: '21.8g Sachet',
    requiresRx: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 410,
    description: 'Restores body fluids & electrolytes lost due to dehydration, heat stress, diarrhoea, and strenuous activity.',
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=500&auto=format&fit=crop&q=60'
  },

  // --- Prescription & Chronic Care ---
  {
    id: 'MED-201',
    name: 'Augmentin 625 Duo Tablet',
    category: 'prescription',
    categoryName: 'Prescription Drugs',
    composition: 'Amoxicillin (500mg) + Clavulanic Acid (125mg)',
    manufacturer: 'GlaxoSmithKline (GSK)',
    price: 182,
    mrp: 204,
    discount: 11,
    dosageForm: 'Strip of 10 Tablets',
    requiresRx: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 95,
    description: 'Broad-spectrum antibiotic used to treat bacterial infections of the respiratory tract, ear, nose, skin, and soft tissue. Prescription required.',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'MED-202',
    name: 'Pan-D Capsule',
    category: 'prescription',
    categoryName: 'Prescription Drugs',
    composition: 'Pantoprazole (40mg) + Domperidone (30mg)',
    manufacturer: 'Alkem Laboratories',
    price: 175,
    mrp: 199,
    discount: 12,
    dosageForm: 'Strip of 15 Capsules',
    requiresRx: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 220,
    description: 'Prescribed for Gastroesophageal reflux disease (GERD), peptic ulcer disease, and nausea associated with hyperacidity.',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'MED-203',
    name: 'Telma 40 Tablet',
    category: 'prescription',
    categoryName: 'Prescription Drugs',
    composition: 'Telmisartan (40mg)',
    manufacturer: 'Glenmark Pharmaceuticals',
    price: 215,
    mrp: 245,
    discount: 12,
    dosageForm: 'Strip of 30 Tablets',
    requiresRx: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 155,
    description: 'Antihypertensive medicine used in the management of high blood pressure (hypertension) and cardiovascular risk reduction.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'MED-204',
    name: 'Glycomet-GP 1 Forte Tablet',
    category: 'prescription',
    categoryName: 'Prescription Drugs',
    composition: 'Glimepiride (1mg) + Metformin (1000mg)',
    manufacturer: 'USV Pvt Ltd',
    price: 130,
    mrp: 148,
    discount: 12,
    dosageForm: 'Strip of 15 Tablets',
    requiresRx: true,
    inStock: true,
    rating: 4.7,
    reviewsCount: 88,
    description: 'Dual action antidiabetic medicine for controlling elevated blood glucose in adults with type 2 diabetes mellitus.',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60'
  },

  // --- Vitamins & Health Supplements ---
  {
    id: 'MED-301',
    name: 'Becosules Z Capsules',
    category: 'vitamins',
    categoryName: 'Vitamins & Supplements',
    composition: 'B-Complex Vitamins + Vitamin C + Zinc Sulphate',
    manufacturer: 'Pfizer Ltd',
    price: 48,
    mrp: 54,
    discount: 11,
    dosageForm: 'Strip of 20 Capsules',
    requiresRx: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 512,
    description: 'Nutritional supplement containing essential B-complex vitamins and zinc to enhance immunity, metabolism, and cure mouth ulcers.',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'MED-302',
    name: 'Shelcal 500 Tablet',
    category: 'vitamins',
    categoryName: 'Vitamins & Supplements',
    composition: 'Elemental Calcium (500mg) + Vitamin D3 (250 IU)',
    manufacturer: 'Torrent Pharmaceuticals',
    price: 118,
    mrp: 135,
    discount: 13,
    dosageForm: 'Strip of 15 Tablets',
    requiresRx: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 340,
    description: 'Provides calcium and vitamin D3 required for strong bones, joints, and preventing osteoporosis in all age groups.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'MED-303',
    name: 'Revital H Daily Health Supplement',
    category: 'vitamins',
    categoryName: 'Vitamins & Supplements',
    composition: 'Ginseng Extract + 10 Vitamins + 9 Minerals',
    manufacturer: 'Sun Pharma',
    price: 310,
    mrp: 350,
    discount: 11,
    dosageForm: 'Bottle of 30 Softgels',
    requiresRx: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 290,
    description: 'Daily energy booster with pure Ginseng extract that helps overcome fatigue, boosts stamina, and supports mental agility.',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'MED-304',
    name: 'Limcee 500mg Chewable Vitamin C',
    category: 'vitamins',
    categoryName: 'Vitamins & Supplements',
    composition: 'Ascorbic Acid (Vitamin C 500mg) Orange Flavor',
    manufacturer: 'Abbott',
    price: 24,
    mrp: 28,
    discount: 14,
    dosageForm: 'Strip of 15 Chewable Tablets',
    requiresRx: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 450,
    description: 'Delicious orange flavored chewable Vitamin C tablet that helps improve daily immune defense and skin health.',
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=500&auto=format&fit=crop&q=60'
  },

  // --- Ayurvedic & Herbal ---
  {
    id: 'MED-401',
    name: 'Dabur Chyawanprash Awaleha 2X Immunity',
    category: 'ayurveda',
    categoryName: 'Ayurvedic & Herbal',
    composition: 'Amla, Ashwagandha, Pippali & 40+ Ayurvedic Herbs',
    manufacturer: 'Dabur India Ltd',
    price: 360,
    mrp: 410,
    discount: 12,
    dosageForm: '1 kg Jar',
    requiresRx: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 680,
    description: 'Time-tested Ayurvedic formulation that doubles natural immunity, fights seasonal infections, and builds stamina.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'MED-402',
    name: 'Himalaya Liv.52 DS Tablets',
    category: 'ayurveda',
    categoryName: 'Ayurvedic & Herbal',
    composition: 'Himsra + Kasani + Kakamachi + Arjuna Extract',
    manufacturer: 'The Himalaya Drug Company',
    price: 180,
    mrp: 200,
    discount: 10,
    dosageForm: 'Bottle of 60 Tablets',
    requiresRx: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 310,
    description: 'Double strength herbal hepatoprotective tablet designed to support healthy liver function, appetite, and metabolism.',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'MED-403',
    name: 'Zandu Balm Ultra Power',
    category: 'ayurveda',
    categoryName: 'Ayurvedic & Herbal',
    composition: 'Gaultheria Oil + Mentha + Eucalyptus Oil',
    manufacturer: 'Emami Ltd',
    price: 45,
    mrp: 50,
    discount: 10,
    dosageForm: '8ml Tub',
    requiresRx: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 195,
    description: 'Instant relief from severe headaches, cold, body ache and back pain with natural essential herbs and wintergreen oil.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format&fit=crop&q=60'
  },

  // --- Healthcare Devices & First Aid ---
  {
    id: 'MED-501',
    name: 'Accu-Chek Active Blood Glucose Monitor',
    category: 'devices',
    categoryName: 'Health Devices',
    composition: 'Digital Meter + 10 Test Strips + Lancing Device',
    manufacturer: 'Roche Diabetes Care',
    price: 1450,
    mrp: 1699,
    discount: 15,
    dosageForm: 'Complete Kit with Carrying Case',
    requiresRx: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 145,
    description: 'Gold standard glucometer with simple handling, 5-second test time, and 500-test memory for accurate diabetes monitoring.',
    image: 'https://images.unsplash.com/photo-1583912267670-6575ad4e2e28?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'MED-502',
    name: 'Omron Automatic Digital Blood Pressure Monitor',
    category: 'devices',
    categoryName: 'Health Devices',
    composition: 'Upper Arm BP Monitor with Intellisense Tech',
    manufacturer: 'Omron Healthcare',
    price: 2150,
    mrp: 2490,
    discount: 14,
    dosageForm: 'Box with Universal Cuff & Batteries',
    requiresRx: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 220,
    description: 'Clinically validated accurate digital blood pressure meter with irregular heartbeat detector and memory storage.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'MED-503',
    name: 'Dettol Antiseptic Liquid',
    category: 'devices',
    categoryName: 'First Aid & Devices',
    composition: 'Chloroxylenol (4.8% w/v)',
    manufacturer: 'Reckitt Benckiser',
    price: 135,
    mrp: 145,
    discount: 7,
    dosageForm: '250ml Bottle',
    requiresRx: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 560,
    description: 'Trusted antiseptic disinfectant liquid for first aid cuts, wounds, bites, personal hygiene, and surface disinfection.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop&q=60'
  },

  // --- Mother & Baby Care ---
  {
    id: 'MED-601',
    name: 'Sebamed Baby Gentle Wash',
    category: 'baby',
    categoryName: 'Baby & Mother Care',
    composition: 'pH 5.5 Tear-Free Botanical Formula',
    manufacturer: 'Sebapharma Germany',
    price: 495,
    mrp: 550,
    discount: 10,
    dosageForm: '200ml Pump Bottle',
    requiresRx: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 160,
    description: 'Specially formulated 100% soap and alkali-free gentle wash with active moisturizers for delicate newborn skin.',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'MED-602',
    name: 'Nestle Cerelac Baby Cereal (Wheat-Apple)',
    category: 'baby',
    categoryName: 'Baby & Mother Care',
    composition: 'Iron + Vitamin D + Calcium + Multi-Grains',
    manufacturer: 'Nestle India',
    price: 290,
    mrp: 310,
    discount: 6,
    dosageForm: '300g Bag-in-Box',
    requiresRx: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 280,
    description: 'Nutritious complementary cereal for babies from 6 months upwards, rich in iron, zinc, and 12 essential vitamins.',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=60'
  }
];

// Catalog filter and render helper
const ProductEngine = {
  products: [],

  init: async () => {
    ProductEngine.products = await UtkarshDB.getProducts();
    if (!ProductEngine.products || ProductEngine.products.length === 0) {
      ProductEngine.products = INITIAL_PRODUCTS;
      await UtkarshDB.saveProducts(INITIAL_PRODUCTS);
    }
  },

  getAll: () => ProductEngine.products,

  getById: (id) => ProductEngine.products.find(p => p.id === id),

  filterProducts: ({ category, search, rxRequired, maxPrice, inStockOnly, sort }) => {
    let list = [...ProductEngine.products];

    if (category && category !== 'all') {
      list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        (p.composition && p.composition.toLowerCase().includes(q)) ||
        (p.manufacturer && p.manufacturer.toLowerCase().includes(q))
      );
    }

    if (rxRequired !== undefined && rxRequired !== 'all') {
      const isRx = rxRequired === 'rx';
      list = list.filter(p => p.requiresRx === isRx);
    }

    if (inStockOnly) {
      list = list.filter(p => p.inStock);
    }

    if (maxPrice) {
      list = list.filter(p => p.price <= maxPrice);
    }

    if (sort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === 'discount') {
      list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    } else if (sort === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  },

  renderCardHTML: (p) => {
    return `
      <div class="product-card" data-id="${p.id}">
        <div class="product-badges">
          ${p.requiresRx ? '<span class="badge badge-rx"><i class="fa-solid fa-prescription"></i> Rx Required</span>' : '<span class="badge badge-otc">OTC Medicine</span>'}
          ${p.discount ? `<span class="badge badge-discount">${p.discount}% OFF</span>` : ''}
        </div>
        <div class="product-image-wrap" onclick="ProductEngine.openQuickView('${p.id}')" style="cursor:pointer;">
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60'">
        </div>
        <span class="product-category-tag">${p.categoryName || p.category}</span>
        <h3 class="product-title" onclick="ProductEngine.openQuickView('${p.id}')" style="cursor:pointer;">${p.name}</h3>
        <p class="product-composition">${p.composition || p.dosageForm}</p>
        
        <div class="product-pricing">
          <span class="price-current">₹${p.price}</span>
          ${p.mrp ? `<span class="price-mrp">₹${p.mrp}</span>` : ''}
          ${p.inStock ? '<span class="badge badge-instock" style="margin-left:auto;">In Stock</span>' : '<span class="badge badge-outstock" style="margin-left:auto;">Out of Stock</span>'}
        </div>

        <div class="product-actions">
          <button class="btn-add-cart" onclick="UtkarshCart.addItem('${p.id}')" ${!p.inStock ? 'disabled style="opacity:0.6;cursor:not-allowed;"' : ''}>
            <i class="fa-solid fa-cart-shopping"></i> Add to Cart
          </button>
          <button class="btn-quick-view" title="Quick View" onclick="ProductEngine.openQuickView('${p.id}')">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>
      </div>
    `;
  },

  openQuickView: (productId) => {
    const product = ProductEngine.getById(productId);
    if (!product) return;

    let modal = document.getElementById('product-quickview-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'product-quickview-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-box" style="max-width: 650px;">
        <div class="modal-header">
          <div>
            <span class="section-tag" style="margin:0;">${product.categoryName || product.category}</span>
            <h3 style="margin-top:4px;">${product.name}</h3>
          </div>
          <button onclick="document.getElementById('product-quickview-modal').classList.remove('active')" style="font-size:1.4rem;color:#94a3b8;"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="modal-body">
          <div style="display:grid;grid-template-columns: 1fr 1fr;gap: 1.5rem;align-items:center;margin-bottom:1.5rem;">
            <div style="background:#f8fafc;padding:1.5rem;border-radius:12px;display:flex;align-items:center;justify-content:center;">
              <img src="${product.image}" alt="${product.name}" style="max-height:180px;object-fit:contain;">
            </div>
            <div>
              <div style="margin-bottom:0.75rem;">
                ${product.requiresRx ? '<span class="badge badge-rx"><i class="fa-solid fa-prescription"></i> Prescription Required</span>' : '<span class="badge badge-otc">OTC - No Prescription Needed</span>'}
              </div>
              <div style="font-size:1.5rem;font-weight:800;color:var(--text-main);display:flex;align-items:baseline;gap:0.6rem;margin-bottom:0.5rem;">
                <span>₹${product.price}</span>
                ${product.mrp ? `<span style="font-size:1rem;color:#94a3b8;text-decoration:line-through;">₹${product.mrp}</span>` : ''}
                ${product.discount ? `<span style="font-size:0.85rem;color:#dc2626;font-weight:700;">${product.discount}% OFF</span>` : ''}
              </div>
              <p style="font-size:0.88rem;color:#475569;margin-bottom:0.4rem;"><strong>Composition:</strong> ${product.composition || 'Standard formulation'}</p>
              <p style="font-size:0.88rem;color:#475569;margin-bottom:0.4rem;"><strong>Manufacturer:</strong> ${product.manufacturer || 'Certified Pharma'}</p>
              <p style="font-size:0.88rem;color:#475569;margin-bottom:0.85rem;"><strong>Package:</strong> ${product.dosageForm || 'Unit Pack'}</p>
            </div>
          </div>
          <div style="background:#f1f5f9;padding:1rem;border-radius:10px;margin-bottom:1.5rem;">
            <h4 style="font-size:0.92rem;margin-bottom:0.35rem;color:#0f172a;"><i class="fa-solid fa-circle-info" style="color:var(--primary);"></i> Description & Usage</h4>
            <p style="font-size:0.85rem;color:#475569;line-height:1.5;">${product.description}</p>
          </div>
          <div style="display:flex;gap:0.75rem;">
            <button class="btn btn-primary" style="flex:1;" onclick="UtkarshCart.addItem('${product.id}'); document.getElementById('product-quickview-modal').classList.remove('active');">
              <i class="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>
            <a href="https://wa.me/919876543210?text=${encodeURIComponent('Hello Utkarsh Medical Hall, I would like to order: ' + product.name + ' (₹' + product.price + ')')}" target="_blank" class="btn btn-whatsapp" style="flex:1;">
              <i class="fa-brands fa-whatsapp"></i> Buy on WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
  }
};
