/**
 * ReUse Market - Global State Management
 */

class AppState {
  constructor() {
    this.products = getStoredProducts();
    this.wishlist = new Set(getStoredWishlist());
    this.currentUser = getStoredUser();
    
    this.defaultFilters = {
      search: '',
      category: 'all',
      city: 'all',
      conditions: ['Like New', 'Good', 'Average', 'Used'],
      minPrice: 0,
      maxPrice: 200000,
      sort: 'recent' // 'recent', 'price-asc', 'price-desc', 'discount', 'popular'
    };

    this.filters = { ...this.defaultFilters };
    
    this.currentRoute = {
      view: 'home',
      id: null
    };

    this.activeModal = null; // 'auth', 'contact', 'wishlist', 'owner-inquiry'
    this.modalPayload = null;

    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(event, data) {
    this.listeners.forEach(listener => {
      try {
        listener(event, data, this);
      } catch (err) {
        console.error('State listener error:', err);
      }
    });
  }

  // Navigation / Route Handling
  navigate(view, id = null, replaceState = false) {
    this.currentRoute = { view, id };
    const hash = id ? `#${view}/${id}` : `#${view}`;
    if (window.location.hash !== hash) {
      if (replaceState) {
        window.history.replaceState(null, '', hash);
      } else {
        window.location.hash = hash;
      }
    }
    this.notify('route_change', this.currentRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Products & Filtering
  addProduct(productData) {
    const newProduct = {
      id: 'prod-' + Date.now(),
      views: 1,
      postedDate: 'Just now',
      featured: false,
      popularDeal: false,
      ...productData
    };

    this.products.unshift(newProduct);
    saveStoredProducts(this.products);
    this.notify('product_added', newProduct);
    return newProduct;
  }

  getProductById(id) {
    return this.products.find(p => p.id === id);
  }

  setFilters(partial) {
    this.filters = { ...this.filters, ...partial };
    this.notify('filter_change', this.filters);
  }

  resetFilters() {
    this.filters = { ...this.defaultFilters };
    this.notify('filter_change', this.filters);
  }

  getFilteredProducts() {
    let result = [...this.products];

    // Search query
    if (this.filters.search && this.filters.search.trim() !== '') {
      const q = this.filters.search.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        getCategoryById(p.category).name.toLowerCase().includes(q)
      );
    }

    // Category
    if (this.filters.category && this.filters.category !== 'all') {
      result = result.filter(p => p.category === this.filters.category);
    }

    // City / Location
    if (this.filters.city && this.filters.city !== 'all') {
      result = result.filter(p => p.city.toLowerCase() === this.filters.city.toLowerCase());
    }

    // Condition
    if (this.filters.conditions && this.filters.conditions.length > 0) {
      result = result.filter(p => this.filters.conditions.includes(p.condition));
    }

    // Price Range
    if (typeof this.filters.minPrice === 'number') {
      result = result.filter(p => p.sellingPrice >= this.filters.minPrice);
    }
    if (typeof this.filters.maxPrice === 'number' && this.filters.maxPrice > 0) {
      result = result.filter(p => p.sellingPrice <= this.filters.maxPrice);
    }

    // Sorting
    switch (this.filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.sellingPrice - b.sellingPrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.sellingPrice - a.sellingPrice);
        break;
      case 'discount':
        result.sort((a, b) => {
          const discA = ((a.originalPrice - a.sellingPrice) / a.originalPrice) * 100;
          const discB = ((b.originalPrice - b.sellingPrice) / b.originalPrice) * 100;
          return discB - discA;
        });
        break;
      case 'popular':
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'recent':
      default:
        // maintain order (most recent first)
        break;
    }

    return result;
  }

  // Wishlist
  toggleWishlist(productId) {
    if (this.wishlist.has(productId)) {
      this.wishlist.delete(productId);
      showToast('Removed from Wishlist', 'Item has been removed from your saved items.', 'info');
    } else {
      this.wishlist.add(productId);
      showToast('Saved to Wishlist!', 'Item added to your favorites.', 'success');
    }
    saveStoredWishlist(Array.from(this.wishlist));
    this.notify('wishlist_change', Array.from(this.wishlist));
  }

  isWishlisted(productId) {
    return this.wishlist.has(productId);
  }

  getWishlistProducts() {
    return this.products.filter(p => this.wishlist.has(p.id));
  }

  // Auth (Mock)
  login(userData) {
    this.currentUser = userData;
    saveStoredUser(userData);
    this.notify('auth_change', this.currentUser);
    showToast('Welcome back, ' + userData.name + '!', 'You are now signed in to ReUse Market.', 'success');
  }

  logout() {
    this.currentUser = null;
    saveStoredUser(null);
    this.notify('auth_change', null);
    showToast('Signed Out', 'You have been signed out safely.', 'info');
  }

  // Modal State
  openModal(modalName, payload = null) {
    this.activeModal = modalName;
    this.modalPayload = payload;
    this.notify('modal_open', { modal: modalName, payload });
  }

  closeModal() {
    const prev = this.activeModal;
    this.activeModal = null;
    this.modalPayload = null;
    this.notify('modal_close', prev);
  }
}

// Global state instance
const state = new AppState();

