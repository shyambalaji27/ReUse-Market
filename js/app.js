/**
 * ReUse Market - Core Application & Routing
 * "Give Products a Second Life."
 */

// Selected image preview in sell form
let uploadedImageUrls = [];

/**
 * Initialize App on DOMContentLoaded & HashChange
 */
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

window.addEventListener('hashchange', () => {
  handleRoute();
});

function initApp() {
  // Subscribe to state changes to update badge counts or re-render modals
  state.subscribe((event, data) => {
    if (event === 'wishlist_change') {
      updateNavbarWishlistBadge();
      // If wishlist modal is open, re-render it
      if (state.activeModal === 'wishlist') {
        renderModalContainer();
      }
    } else if (event === 'auth_change') {
      updateNavbarAuth();
    } else if (event === 'modal_open' || event === 'modal_close') {
      renderModalContainer();
    } else if (event === 'filter_change') {
      if (state.currentRoute.view === 'products') {
        renderProductsGridOnly();
      }
    }
  });

  // Initial Route
  handleRoute();
}

/**
 * Hash-based Router
 */
function handleRoute() {
  const hash = window.location.hash.replace(/^#/, '') || 'home';
  const parts = hash.split('/');
  const view = parts[0] || 'home';
  const id = parts[1] || null;

  state.currentRoute = { view, id };

  const appContent = document.getElementById('app-content');
  const navbarContainer = document.getElementById('navbar-container');
  const footerContainer = document.getElementById('footer-container');

  if (navbarContainer) navbarContainer.innerHTML = renderNavbar();
  if (footerContainer) footerContainer.innerHTML = renderFooter();

  if (!appContent) return;

  switch (view) {
    case 'home':
      appContent.innerHTML = renderHomePage();
      initHomeMapPreview();
      break;

    case 'products':
      appContent.innerHTML = renderProductsPage();
      break;

    case 'product-detail':
      appContent.innerHTML = renderProductDetailPage(id);
      initProductDetailPageMap(id);
      break;

    case 'first-owners':
      appContent.innerHTML = renderFirstOwnersPage();
      break;

    case 'first-owner':
      appContent.innerHTML = renderOwnerDetailPage(id);
      break;

    case 'sell':
      appContent.innerHTML = renderSellPage();
      initSellForm();
      break;

    case 'about':
      appContent.innerHTML = renderAboutPage();
      break;

    case 'contact':
      appContent.innerHTML = renderContactPage();
      break;

    case 'map':
      appContent.innerHTML = renderMapPage();
      setTimeout(() => initMarketplaceMap('fullscreen-map', state.filters.city), 150);
      break;

    default:
      appContent.innerHTML = renderHomePage();
      initHomeMapPreview();
      break;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavbarWishlistBadge() {
  const container = document.getElementById('navbar-container');
  if (container) container.innerHTML = renderNavbar();
}

function updateNavbarAuth() {
  const container = document.getElementById('navbar-container');
  if (container) container.innerHTML = renderNavbar();
}

function renderModalContainer() {
  const container = document.getElementById('modal-container');
  if (!container) return;

  if (!state.activeModal) {
    container.innerHTML = '';
    return;
  }

  switch (state.activeModal) {
    case 'auth':
      container.innerHTML = renderAuthModal();
      break;
    case 'contact':
    case 'owner-inquiry':
      container.innerHTML = renderContactModal(state.modalPayload || {});
      break;
    case 'wishlist':
      container.innerHTML = renderWishlistDrawer();
      break;
    default:
      container.innerHTML = '';
  }
}

// Global modal backdrop close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state.activeModal) {
    state.closeModal();
  }
});

/* =========================================================================
   1. HOME PAGE RENDERER
   ========================================================================= */
function renderHomePage() {
  const featured = state.products.filter(p => p.featured).slice(0, 4);
  const recent = [...state.products].slice(0, 4);
  const popularDeals = state.products.filter(p => p.popularDeal).slice(0, 4);

  return `
    <!-- Hero Section -->
    <section class="relative bg-navy-950 text-white overflow-hidden py-16 sm:py-24 border-b border-navy-800">
      <!-- Decorative background blur circles -->
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div class="text-center max-w-3xl mx-auto mb-10">
          
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
            <i class="fa-solid fa-leaf"></i>
            <span>Sustainable Second-Hand Marketplace</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
            Buy Smart. Sell Easy. <br class="hidden sm:inline"/>
            <span class="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
              Reuse More.
            </span>
          </h1>

          <p class="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl mx-auto">
            Give quality pre-owned products a second life. Connect directly with transparent first owners, test in-person before paying, and save up to 70% while reducing landfill waste.
          </p>

          <!-- Call to Action Buttons -->
          <div class="flex flex-wrap items-center justify-center gap-3.5 mb-10">
            <button onclick="state.navigate('products')" 
              class="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-sm tracking-wide shadow-xl shadow-emerald-500/25 flex items-center gap-2 transform hover:-translate-y-0.5 transition">
              <i class="fa-solid fa-compass"></i>
              <span>Explore Products</span>
            </button>
            <button onclick="state.navigate('sell')" 
              class="px-7 py-3.5 rounded-2xl bg-navy-800/90 hover:bg-navy-700/90 text-white font-bold text-sm tracking-wide border border-navy-700 flex items-center gap-2 transform hover:-translate-y-0.5 transition">
              <i class="fa-solid fa-circle-plus text-emerald-400"></i>
              <span>Sell Your Product</span>
            </button>
          </div>

          <!-- Quick Stat Pill Badges -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-left">
            <div class="bg-navy-900/80 border border-navy-800 rounded-xl p-3">
              <span class="text-lg font-black text-emerald-400 block">${state.products.length}+</span>
              <span class="text-[11px] text-slate-400">Verified Products</span>
            </div>
            <div class="bg-navy-900/80 border border-navy-800 rounded-xl p-3">
              <span class="text-lg font-black text-white block">8 Hubs</span>
              <span class="text-[11px] text-slate-400">Metro & State Cities</span>
            </div>
            <div class="bg-navy-900/80 border border-navy-800 rounded-xl p-3">
              <span class="text-lg font-black text-orange-400 block">100%</span>
              <span class="text-[11px] text-slate-400">First-Owner Direct</span>
            </div>
            <div class="bg-navy-900/80 border border-navy-800 rounded-xl p-3">
              <span class="text-lg font-black text-emerald-400 block">0%</span>
              <span class="text-[11px] text-slate-400">Middleman Cuts</span>
            </div>
          </div>

        </div>

        <!-- Interactive Hero Search Bar -->
        <div class="max-w-4xl mx-auto bg-white rounded-3xl p-3 sm:p-4 shadow-2xl border border-slate-100 text-slate-800">
          <form onsubmit="handleHeroSearch(event)" class="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center">
            
            <!-- Keyword Input -->
            <div class="sm:col-span-5 relative">
              <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-slate-400 text-sm"></i>
              <input type="text" id="hero-search-query" 
                placeholder="Search iPhone, MacBook, Sofa, Bike..."
                class="w-full pl-10 pr-3 py-3 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
            </div>

            <!-- Category Dropdown -->
            <div class="sm:col-span-3">
              <select id="hero-search-category" 
                class="w-full px-3 py-3 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white">
                <option value="all">All Categories</option>
                ${CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
              </select>
            </div>

            <!-- City Dropdown -->
            <div class="sm:col-span-2">
              <select id="hero-search-city" 
                class="w-full px-3 py-3 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white">
                <option value="all">All Cities</option>
                ${CITIES.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>

            <!-- Submit Button -->
            <div class="sm:col-span-2">
              <button type="submit" 
                class="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-1.5">
                <span>Find Deals</span>
                <i class="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>

    <!-- Browse Categories Section -->
    <section class="py-16 bg-slate-50 border-b border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div class="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
              <i class="fa-solid fa-shapes"></i>
              <span>Explore by Category</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Browse Verified Categories</h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">Discover meticulously maintained goods across 9 curated lifestyle departments.</p>
          </div>
          <button onclick="state.navigate('products')" class="mt-4 sm:mt-0 text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            <span>View All Categories</span>
            <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          ${CATEGORIES.map(cat => {
            const count = state.products.filter(p => p.category === cat.id).length;
            return `
              <div onclick="state.setFilters({ category: '${cat.id}' }); state.navigate('products')"
                class="group relative bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between">
                
                <div class="flex items-start justify-between mb-4">
                  <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center text-xl transition-colors shadow-sm">
                    <i class="${cat.icon}"></i>
                  </div>
                  <span class="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition">
                    ${count} Items
                  </span>
                </div>

                <div>
                  <h3 class="font-extrabold text-slate-900 text-sm sm:text-base group-hover:text-emerald-600 transition">
                    ${cat.name}
                  </h3>
                  <p class="text-xs text-slate-500 mt-1 line-clamp-1">${cat.description}</p>
                </div>

                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
                  <span>Explore Listings</span>
                  <i class="fa-solid fa-arrow-right text-[11px] transform group-hover:translate-x-1 transition-transform"></i>
                </div>

              </div>
            `;
          }).join('')}
        </div>

      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-16 bg-white border-b border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div class="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
              <i class="fa-solid fa-star"></i>
              <span>Top Condition Picks</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Featured Products</h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">Inspected items with original bills, boxes, and high first-owner ratings.</p>
          </div>
          <button onclick="state.setFilters({ conditions: ['Like New'] }); state.navigate('products')" 
            class="mt-4 sm:mt-0 text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            <span>See All Featured</span>
            <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${featured.map(p => renderProductCard(p)).join('')}
        </div>

      </div>
    </section>

    <!-- Recently Added Products Section -->
    <section class="py-16 bg-slate-50 border-b border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div class="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
              <i class="fa-solid fa-clock-rotate-left"></i>
              <span>Fresh Off The Shelves</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Recently Added Products</h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">Brand new pre-owned listings posted by our verified community.</p>
          </div>
          <button onclick="state.setFilters({ sort: 'recent' }); state.navigate('products')" 
            class="mt-4 sm:mt-0 text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            <span>Explore All Recent</span>
            <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${recent.map(p => renderProductCard(p)).join('')}
        </div>

      </div>
    </section>

    <!-- Popular Deals Section -->
    <section class="py-16 bg-white border-b border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div class="inline-flex items-center gap-1.5 text-orange-600 text-xs font-bold uppercase tracking-wider mb-2">
              <i class="fa-solid fa-fire"></i>
              <span>High Value Reductions</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Popular Deals & Super Savings</h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">Get authentic flagships, gaming laptops, and furniture with up to 60% discounts.</p>
          </div>
          <button onclick="state.setFilters({ sort: 'discount' }); state.navigate('products')" 
            class="mt-4 sm:mt-0 text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1">
            <span>View All Deals</span>
            <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${popularDeals.map(p => renderProductCard(p)).join('')}
        </div>

      </div>
    </section>

    <!-- Interactive Map Banner Preview Section -->
    <section class="py-16 bg-navy-950 text-white border-b border-navy-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span class="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <i class="fa-solid fa-map-location-dot"></i>
              <span>Geo-Located Pre-Owned Inventory</span>
            </span>
            <h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight">Explore Items In Your Neighborhood</h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">
              Find pre-owned items located right in Chennai, Tambaram, Bengaluru, Mumbai, and 4 other hubs with interactive pins.
            </p>
          </div>
          <button onclick="state.navigate('map')" 
            class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 self-start md:self-auto shadow-lg shadow-emerald-500/20 transition">
            <i class="fa-solid fa-expand"></i>
            <span>Open Fullscreen Map</span>
          </button>
        </div>

        <!-- Embedded Map Container -->
        <div class="rounded-3xl overflow-hidden border border-navy-800 shadow-2xl relative">
          <div id="home-map-preview" class="w-full h-80 sm:h-96 bg-navy-900"></div>
          
          <!-- Floating City Selector Pill Bar -->
          <div class="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-[400] flex flex-wrap gap-1.5 bg-navy-900/90 backdrop-blur-md p-2 rounded-2xl border border-navy-700 shadow-xl">
            <button onclick="initMarketplaceMap('home-map-preview', 'all')" class="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white">All Hubs</button>
            <button onclick="initMarketplaceMap('home-map-preview', 'Chennai')" class="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-navy-800">Chennai</button>
            <button onclick="initMarketplaceMap('home-map-preview', 'Tambaram')" class="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-navy-800">Tambaram</button>
            <button onclick="initMarketplaceMap('home-map-preview', 'Bengaluru')" class="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-navy-800">Bengaluru</button>
            <button onclick="initMarketplaceMap('home-map-preview', 'Mumbai')" class="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-navy-800">Mumbai</button>
          </div>
        </div>

      </div>
    </section>

    <!-- Environmental Sustainability Impact Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="bg-gradient-to-br from-emerald-900 via-navy-950 to-navy-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-emerald-800/40">
          <div class="max-w-2xl">
            <div class="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
              <i class="fa-solid fa-earth-americas"></i>
              <span>Circular Economy Impact</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Every Pre-Owned Purchase Heals Our Environment
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
              Manufacturing a brand-new smartphone emits over 70kg of CO2 and exhausts critical rare-earth metals. By adopting high-quality pre-owned products on ReUse Market, you prevent electronic waste and conserve clean freshwater.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <span class="text-2xl sm:text-3xl font-black text-emerald-400 block">4.8 Tons</span>
                <span class="text-xs text-slate-300">CO2 Emissions Saved</span>
              </div>
              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <span class="text-2xl sm:text-3xl font-black text-teal-300 block">1,840 Kg</span>
                <span class="text-xs text-slate-300">E-Waste Diverted</span>
              </div>
              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <span class="text-2xl sm:text-3xl font-black text-orange-400 block">3.2M Liters</span>
                <span class="text-xs text-slate-300">Water Preserved</span>
              </div>
            </div>

            <button onclick="state.navigate('about')" class="px-6 py-3 rounded-xl bg-white text-navy-950 font-black text-xs hover:bg-slate-100 shadow transition flex items-center gap-2">
              <span>Read Our Sustainability Mission</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

      </div>
    </section>
  `;
}

function handleHeroSearch(e) {
  e.preventDefault();
  const query = document.getElementById('hero-search-query').value;
  const category = document.getElementById('hero-search-category').value;
  const city = document.getElementById('hero-search-city').value;

  state.setFilters({
    search: query,
    category: category,
    city: city
  });

  state.navigate('products');
}

function initHomeMapPreview() {
  setTimeout(() => {
    initMarketplaceMap('home-map-preview', 'all');
  }, 200);
}

/* =========================================================================
   2. PRODUCTS LISTING PAGE RENDERER
   ========================================================================= */
function renderProductsPage() {
  const filtered = state.getFilteredProducts();

  return `
    <div class="bg-slate-50 min-h-screen py-8 sm:py-12 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Breadcrumb & Title Bar -->
        <div class="mb-8">
          <nav class="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <a href="#home" onclick="state.navigate('home'); return false;" class="hover:text-emerald-600">Home</a>
            <i class="fa-solid fa-chevron-right text-[9px]"></i>
            <span class="text-slate-800 font-semibold">Pre-Owned Marketplace</span>
          </nav>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Explore Pre-Owned Products</h1>
              <p class="text-xs sm:text-sm text-slate-500 mt-1">Every item listed directly by verified original first owners.</p>
            </div>
            
            <!-- Quick View Toggle or City Filter Pills -->
            <div class="flex items-center gap-2">
              <button onclick="state.navigate('map')" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-emerald-600 hover:border-emerald-300 flex items-center gap-1.5 shadow-sm transition">
                <i class="fa-solid fa-map-location-dot text-emerald-600"></i>
                <span>Map View</span>
              </button>
              <button onclick="toggleMobileFilterDrawer()" class="lg:hidden px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm">
                <i class="fa-solid fa-filter"></i>
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Layout Grid: Sidebar + Products -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <!-- Left: Desktop Filter Sidebar -->
          <div class="hidden lg:block lg:col-span-1">
            <div class="sticky top-28">
              ${renderFilterSidebar()}
            </div>
          </div>

          <!-- Right: Product Grid & Controls -->
          <div class="lg:col-span-3 space-y-6">
            
            <!-- Top Toolbar (Count + Sort) -->
            <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-slate-900 text-sm" id="product-results-count">
                  ${filtered.length} Product${filtered.length === 1 ? '' : 's'}
                </span>
                <span class="text-xs text-slate-400">found for your criteria</span>
              </div>

              <!-- Sorting Dropdown -->
              <div class="flex items-center gap-2">
                <label class="text-xs font-bold text-slate-600 uppercase tracking-wider">Sort by:</label>
                <select onchange="handleSortChange(this.value)" 
                  class="px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 outline-none bg-white font-medium text-slate-800">
                  <option value="recent" ${state.filters.sort === 'recent' ? 'selected' : ''}>Recently Added</option>
                  <option value="price-asc" ${state.filters.sort === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
                  <option value="price-desc" ${state.filters.sort === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
                  <option value="discount" ${state.filters.sort === 'discount' ? 'selected' : ''}>Biggest Savings</option>
                  <option value="popular" ${state.filters.sort === 'popular' ? 'selected' : ''}>Most Popular</option>
                </select>
              </div>
            </div>

            <!-- Product Cards Grid Container -->
            <div id="products-grid-container" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              ${filtered.length === 0 ? `
                <div class="col-span-full bg-white rounded-3xl p-12 text-center border border-slate-200">
                  <div class="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-2xl mx-auto mb-4">
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <h3 class="text-base font-bold text-slate-800">No products match your filters</h3>
                  <p class="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">Try broadening your search keyword, adjusting the price slider, or selecting "All Locations".</p>
                  <button onclick="state.resetFilters()" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition">
                    Clear All Filters
                  </button>
                </div>
              ` : filtered.map(p => renderProductCard(p)).join('')}
            </div>

          </div>

        </div>

      </div>
    </div>

    <!-- Mobile Filter Drawer -->
    <div id="mobile-filter-drawer" class="fixed inset-0 z-50 hidden bg-navy-950/70 backdrop-blur-sm animate-fade-in" onclick="toggleMobileFilterDrawer(false)">
      <div class="bg-white w-4/5 max-w-xs h-full p-5 overflow-y-auto animate-slide-left" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <h3 class="font-bold text-slate-900 text-sm">Filters</h3>
          <button onclick="toggleMobileFilterDrawer(false)" class="text-slate-400 hover:text-slate-600">
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>
        ${renderFilterSidebar()}
      </div>
    </div>
  `;
}

function toggleMobileFilterDrawer(force) {
  const drawer = document.getElementById('mobile-filter-drawer');
  if (!drawer) return;
  if (typeof force === 'boolean') {
    if (force) drawer.classList.remove('hidden');
    else drawer.classList.add('hidden');
  } else {
    drawer.classList.toggle('hidden');
  }
}

function renderProductsGridOnly() {
  const container = document.getElementById('products-grid-container');
  const countDisplay = document.getElementById('product-results-count');
  if (!container) return;

  const filtered = state.getFilteredProducts();
  if (countDisplay) {
    countDisplay.innerText = `${filtered.length} Product${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full bg-white rounded-3xl p-12 text-center border border-slate-200">
        <div class="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-2xl mx-auto mb-4">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <h3 class="text-base font-bold text-slate-800">No products match your filters</h3>
        <p class="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">Try broadening your search keyword, adjusting the price slider, or selecting "All Locations".</p>
        <button onclick="state.resetFilters()" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition">
          Clear All Filters
        </button>
      </div>
    `;
  } else {
    container.innerHTML = filtered.map(p => renderProductCard(p)).join('');
  }
}

/* =========================================================================
   3. PRODUCT DETAILS PAGE RENDERER
   ========================================================================= */
function renderProductDetailPage(productId) {
  const product = state.getProductById(productId);
  if (!product) {
    return `
      <div class="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 class="text-2xl font-black text-slate-900 mb-2">Product Not Found</h2>
        <p class="text-slate-500 text-xs mb-6">The requested product listing may have been sold or removed.</p>
        <button onclick="state.navigate('products')" class="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs">
          Browse Active Marketplace
        </button>
      </div>
    `;
  }

  const owner = getOwnerById(product.ownerId);
  const category = getCategoryById(product.category);
  const discount = calculateDiscount(product.originalPrice, product.sellingPrice);
  const isSaved = state.isWishlisted(product.id);
  const similar = state.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return `
    <div class="bg-slate-50 min-h-screen py-8 sm:py-12 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Breadcrumbs -->
        <nav class="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <a href="#home" onclick="state.navigate('home'); return false;" class="hover:text-emerald-600">Home</a>
          <i class="fa-solid fa-chevron-right text-[9px]"></i>
          <a href="#products" onclick="state.setFilters({ category: '${category.id}' }); state.navigate('products'); return false;" class="hover:text-emerald-600">${category.name}</a>
          <i class="fa-solid fa-chevron-right text-[9px]"></i>
          <span class="text-slate-800 font-semibold truncate max-w-xs">${product.name}</span>
        </nav>

        <!-- Main Product Card & Details Container -->
        <div class="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-12">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            <!-- Left: Multi-Image Gallery -->
            <div class="lg:col-span-6 space-y-4">
              <!-- Main Active Image -->
              <div class="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img id="detail-main-image" src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-cover">
                
                <div class="absolute top-4 left-4 flex flex-col gap-1.5">
                  ${getConditionBadge(product.condition)}
                  ${discount > 0 ? `
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black bg-orange-600 text-white shadow-md">
                      ${discount}% OFF
                    </span>
                  ` : ''}
                </div>

                <button onclick="state.toggleWishlist('${product.id}')"
                  class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 hover:text-red-500 shadow-lg flex items-center justify-center transition">
                  <i class="fa-${isSaved ? 'solid text-red-500' : 'regular'} fa-heart text-base"></i>
                </button>
              </div>

              <!-- Thumbnail Strips -->
              <div class="flex items-center gap-3 overflow-x-auto pb-1">
                ${product.images.map((imgUrl, idx) => `
                  <button onclick="changeDetailImage('${imgUrl}', this)" 
                    class="detail-thumb w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${idx === 0 ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200 opacity-70 hover:opacity-100'}">
                    <img src="${imgUrl}" class="w-full h-full object-cover">
                  </button>
                `).join('')}
              </div>

              <!-- Quick Assurance Highlights -->
              <div class="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <div>
                  <i class="fa-solid fa-shield-check text-emerald-600 text-base mb-1 block"></i>
                  <span class="text-[11px] font-bold text-slate-800 block">Single Handed</span>
                  <span class="text-[9px] text-slate-400">1st Owner Only</span>
                </div>
                <div>
                  <i class="fa-solid fa-handshake-angle text-blue-600 text-base mb-1 block"></i>
                  <span class="text-[11px] font-bold text-slate-800 block">Inspect & Pay</span>
                  <span class="text-[9px] text-slate-400">Test before buying</span>
                </div>
                <div>
                  <i class="fa-solid fa-leaf text-teal-600 text-base mb-1 block"></i>
                  <span class="text-[11px] font-bold text-slate-800 block">Eco Friendly</span>
                  <span class="text-[9px] text-slate-400">Zero plastic waste</span>
                </div>
              </div>

            </div>

            <!-- Right: Details & Buying Actions -->
            <div class="lg:col-span-6 space-y-6">
              
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">${category.name}</span>
                  <span class="text-slate-300">•</span>
                  <span class="text-xs text-slate-400"><i class="fa-regular fa-clock mr-1"></i>Posted ${product.postedDate}</span>
                  <span class="text-slate-300">•</span>
                  <span class="text-xs text-slate-400"><i class="fa-regular fa-eye mr-1"></i>${product.views || 100} views</span>
                </div>

                <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                  ${product.name}
                </h1>
              </div>

              <!-- Pricing Highlight Box -->
              <div class="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <span class="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">Pre-Owned Selling Price</span>
                  <div class="flex items-baseline gap-3">
                    <span class="text-3xl sm:text-4xl font-black text-emerald-600">${formatCurrency(product.sellingPrice)}</span>
                    <span class="text-base text-slate-400 line-through">${formatCurrency(product.originalPrice)}</span>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs font-bold text-emerald-700 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-sm block">
                    You Save ${formatCurrency(product.originalPrice - product.sellingPrice)} (${discount}%)
                  </span>
                </div>
              </div>

              <!-- Condition Report -->
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-bold text-slate-800 uppercase tracking-wider">Product Condition:</span>
                  ${getConditionBadge(product.condition)}
                </div>
                <p class="text-xs text-slate-600 leading-relaxed">
                  ${product.conditionDetails || 'Carefully maintained by the original owner. All features in 100% operational order.'}
                </p>
              </div>

              <!-- Description -->
              <div>
                <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Overview</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  ${product.description}
                </p>
              </div>

              <!-- Primary CTAs -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button onclick="state.openModal('contact', { product, owner })"
                  class="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition">
                  <i class="fa-solid fa-phone"></i>
                  <span>Contact First Owner</span>
                </button>
                <button onclick="state.openModal('contact', { product, owner })"
                  class="w-full py-3.5 px-6 rounded-2xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition">
                  <i class="fa-solid fa-comments"></i>
                  <span>Send Direct Inquiry</span>
                </button>
              </div>

            </div>

          </div>

          <!-- Bottom Grid: Specifications & First Owner Story & Map -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 mt-10 border-t border-slate-100">
            
            <!-- Technical Specifications Table -->
            <div class="lg:col-span-6 space-y-4">
              <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <i class="fa-solid fa-list-check text-emerald-600"></i>
                <span>Product Specifications</span>
              </h3>
              
              <div class="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 text-xs">
                ${Object.entries(product.specifications || {}).map(([key, val]) => `
                  <div class="grid grid-cols-3 p-3 bg-white">
                    <span class="font-bold text-slate-500">${key}</span>
                    <span class="col-span-2 text-slate-800 font-medium">${val}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- First Owner Profile & Story Card -->
            <div class="lg:col-span-6 space-y-4">
              <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <i class="fa-solid fa-user-check text-emerald-600"></i>
                <span>First Owner & Origin</span>
              </h3>

              <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div class="flex items-start gap-4 mb-4">
                  <img src="${owner.avatar}" alt="${owner.name}" class="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-sm">
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <h4 class="font-black text-slate-900 text-base hover:text-emerald-600 cursor-pointer" onclick="state.navigate('first-owner', '${owner.id}')">
                        ${owner.name}
                      </h4>
                      <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Verified 1st Owner
                      </span>
                    </div>
                    <p class="text-xs text-slate-500 mt-0.5"><i class="fa-solid fa-location-dot text-orange-500 mr-1"></i>${product.area}, ${product.city}</p>
                    <div class="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
                      <span class="font-bold text-amber-600"><i class="fa-solid fa-star"></i> ${owner.rating}</span>
                      <span>•</span>
                      <span>Member since ${owner.memberSince}</span>
                      <span>•</span>
                      <span>${owner.productsSold} items re-homed</span>
                    </div>
                  </div>
                </div>

                <!-- Personal Ownership Story -->
                <div class="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed mb-4">
                  <span class="font-bold text-slate-900 block mb-1">
                    <i class="fa-solid fa-quote-left text-emerald-500 mr-1.5"></i>
                    Seller's Ownership Note:
                  </span>
                  "${product.ownershipStory || owner.bio}"
                </div>

                <div class="flex items-center gap-3">
                  <button onclick="state.openModal('contact', { product, owner })"
                    class="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition">
                    Contact ${owner.name.split(' ')[0]}
                  </button>
                  <button onclick="state.navigate('first-owner', '${owner.id}')"
                    class="py-2.5 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs transition">
                    View Other Items
                  </button>
                </div>
              </div>

            </div>

          </div>

          <!-- Product Dummy Location Map Section -->
          <div class="pt-10 mt-10 border-t border-slate-100">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <div>
                <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <i class="fa-solid fa-location-dot text-orange-500"></i>
                  <span>Product Location & Pickup Zone</span>
                </h3>
                <p class="text-xs text-slate-500 mt-0.5">Approximate coordinates for safe local meeting and direct testing in ${product.area || product.city}.</p>
              </div>
              <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                <i class="fa-solid fa-map-pin text-orange-500 mr-1"></i>${product.city} (${CITIES.find(c => c.name.toLowerCase() === product.city.toLowerCase())?.state || 'India'})
              </span>
            </div>

            <!-- Embedded Map -->
            <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative">
              <div id="product-detail-map" class="w-full h-72 bg-slate-100"></div>
            </div>
            
            <p class="text-[11px] text-slate-400 mt-2 text-center">
              <i class="fa-solid fa-circle-info mr-1 text-emerald-600"></i>
              Demonstration notice: exact meeting address coordinates will be agreed upon with the first owner upon confirmation.
            </p>
          </div>

        </div>

        <!-- Similar Products Section -->
        ${similar.length > 0 ? `
          <div class="mt-12">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-xl font-black text-slate-900 tracking-tight">Similar Pre-Owned Products</h3>
                <p class="text-xs text-slate-500">Other options in ${category.name}</p>
              </div>
              <button onclick="state.setFilters({ category: '${category.id}' }); state.navigate('products')" class="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                View All ${category.name}
              </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              ${similar.map(p => renderProductCard(p)).join('')}
            </div>
          </div>
        ` : ''}

      </div>
    </div>
  `;
}

function changeDetailImage(imgUrl, thumbBtn) {
  const main = document.getElementById('detail-main-image');
  if (main) main.src = imgUrl;

  document.querySelectorAll('.detail-thumb').forEach(btn => {
    btn.className = 'detail-thumb w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 border-slate-200 opacity-70 hover:opacity-100';
  });

  if (thumbBtn) {
    thumbBtn.className = 'detail-thumb w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 border-emerald-500 ring-2 ring-emerald-500/20';
  }
}

function initProductDetailPageMap(productId) {
  const product = state.getProductById(productId);
  if (!product) return;

  setTimeout(() => {
    // Pass the full product so the dummy map can show its price & area
    renderProductDetailMap('product-detail-map', product);
  }, 100);
}

/* =========================================================================
   4. FIRST OWNER DIRECTORY PAGE RENDERER
   ========================================================================= */
function renderFirstOwnersPage() {
  const owners = FIRST_OWNERS;
  const currentCityFilter = state.filters.city;

  const filteredOwners = currentCityFilter === 'all' 
    ? owners 
    : owners.filter(o => o.city.toLowerCase() === currentCityFilter.toLowerCase());

  return `
    <div class="bg-slate-50 min-h-screen py-10 sm:py-14 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-2xl mx-auto mb-10">
          <div class="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
            <i class="fa-solid fa-user-check"></i>
            <span>Verified First Owners</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Direct First Owner Directory</h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-2">
            Every product on ReUse Market is sold by its actual original owner—never by intermediary dealers or warehouse administrators.
          </p>
        </div>

        <!-- City Filter Pills -->
        <div class="flex items-center justify-center flex-wrap gap-2 mb-10">
          <button onclick="state.setFilters({ city: 'all' }); handleRoute();" 
            class="px-4 py-2 rounded-xl text-xs font-bold transition ${
              currentCityFilter === 'all' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }">
            All Locations
          </button>
          ${CITIES.map(c => `
            <button onclick="state.setFilters({ city: '${c.name}' }); handleRoute();" 
              class="px-4 py-2 rounded-xl text-xs font-bold transition ${
                currentCityFilter.toLowerCase() === c.name.toLowerCase() ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }">
              ${c.name}
            </button>
          `).join('')}
        </div>

        <!-- Owner Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${filteredOwners.map(owner => {
            const activeCount = state.products.filter(p => p.ownerId === owner.id).length;
            return renderOwnerCard(owner, activeCount);
          }).join('')}
        </div>

      </div>
    </div>
  `;
}

/* =========================================================================
   5. SINGLE FIRST OWNER PROFILE DETAIL PAGE
   ========================================================================= */
function renderOwnerDetailPage(ownerId) {
  const owner = getOwnerById(ownerId);
  const products = state.products.filter(p => p.ownerId === ownerId);

  return `
    <div class="bg-slate-50 min-h-screen py-10 sm:py-14 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <a href="#home" onclick="state.navigate('home'); return false;" class="hover:text-emerald-600">Home</a>
          <i class="fa-solid fa-chevron-right text-[9px]"></i>
          <a href="#first-owners" onclick="state.navigate('first-owners'); return false;" class="hover:text-emerald-600">First Owners</a>
          <i class="fa-solid fa-chevron-right text-[9px]"></i>
          <span class="text-slate-800 font-semibold">${owner.name}</span>
        </nav>

        <!-- Profile Header Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div class="flex items-start sm:items-center gap-5">
              <img src="${owner.avatar}" alt="${owner.name}" class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-emerald-400 shadow-md">
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">${owner.name}</h1>
                  <span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <i class="fa-solid fa-shield-check"></i> Verified First Owner
                  </span>
                </div>
                <p class="text-xs sm:text-sm text-slate-500 mt-1">
                  <i class="fa-solid fa-location-dot text-orange-500 mr-1"></i>
                  ${owner.area}, ${owner.city}
                </p>
                <div class="flex items-center gap-4 mt-2 text-xs text-slate-600 flex-wrap">
                  <span class="text-amber-600 font-bold"><i class="fa-solid fa-star"></i> ${owner.rating} (${owner.reviewsCount} reviews)</span>
                  <span>•</span>
                  <span>Member since ${owner.memberSince}</span>
                  <span>•</span>
                  <span class="text-emerald-600 font-bold">${owner.productsSold} products re-homed</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <button onclick="state.openModal('owner-inquiry', { owner })"
                class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow transition">
                <i class="fa-solid fa-message"></i>
                <span>Message Seller</span>
              </button>
            </div>

          </div>

          <div class="mt-6 pt-6 border-t border-slate-100">
            <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">Seller Ownership Philosophy</h4>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
              "${owner.bio}"
            </p>
          </div>
        </div>

        <!-- Listed Products by this owner -->
        <div>
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-black text-slate-900 tracking-tight">Active Listings by ${owner.name.split(' ')[0]} (${products.length})</h2>
            <span class="text-xs text-slate-400">Inspected & direct from owner</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            ${products.length === 0 ? `
              <div class="col-span-full bg-white rounded-3xl p-10 text-center border border-slate-200">
                <p class="text-slate-500 text-xs">No active items listed currently by this owner.</p>
              </div>
            ` : products.map(p => renderProductCard(p)).join('')}
          </div>
        </div>

      </div>
    </div>
  `;
}

/* =========================================================================
   6. SELL YOUR PRODUCT PAGE RENDERER & LOGIC
   ========================================================================= */
function renderSellPage() {
  const user = state.currentUser;

  return `
    <div class="bg-slate-50 min-h-screen py-10 sm:py-14 border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-xl mx-auto mb-10">
          <div class="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
            <i class="fa-solid fa-circle-plus"></i>
            <span>List in 2 Minutes</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Sell Your Pre-Owned Product</h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-2">
            Pass your device, furniture, vehicle, or gear to a caring buyer in your city. 100% free with zero commission.
          </p>
        </div>

        <!-- Form Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          
          <form onsubmit="handleSellSubmit(event)" class="space-y-8" id="sell-product-form">
            
            <!-- SECTION 1: Product Information -->
            <div>
              <div class="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">1</div>
                <h3 class="font-bold text-slate-900 text-sm">Product Information</h3>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Product Title / Name *</label>
                  <input type="text" id="sell-name" required placeholder="e.g. Apple MacBook Air M1 (8GB / 256GB SSD) - Gold"
                    class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Product Category *</label>
                    <select id="sell-category" required class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white">
                      ${CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                    </select>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Product Condition *</label>
                    <select id="sell-condition" required class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white">
                      <option value="Like New">Like New (Barely used, pristine condition)</option>
                      <option value="Good" selected>Good (Minor normal usage, fully functional)</option>
                      <option value="Average">Average (Visible wear/tear, works fine)</option>
                      <option value="Used">Used (Heavily used, low price)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Product Description *</label>
                  <textarea id="sell-description" rows="3" required placeholder="Describe how you used the item, its features, reasons for selling, and what accessories are included..."
                    class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"></textarea>
                </div>
              </div>
            </div>

            <!-- SECTION 2: Pricing & Condition -->
            <div>
              <div class="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">2</div>
                <h3 class="font-bold text-slate-900 text-sm">Pricing & Condition Details</h3>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Original Purchase Price (₹) *</label>
                  <input type="number" id="sell-original-price" required placeholder="e.g. 92000" min="100"
                    oninput="calculateSellSavings()"
                    class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Expected Selling Price (₹) *</label>
                  <input type="number" id="sell-selling-price" required placeholder="e.g. 48000" min="50"
                    oninput="calculateSellSavings()"
                    class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
                </div>
              </div>

              <div id="sell-savings-indicator" class="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs hidden">
                <i class="fa-solid fa-tag mr-1 text-emerald-600"></i>
                <span id="sell-savings-text"></span>
              </div>
            </div>

            <!-- SECTION 3: Product Images -->
            <div>
              <div class="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">3</div>
                <h3 class="font-bold text-slate-900 text-sm">Product Images</h3>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Upload Product Photos or Pick Presets</label>
                <div class="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-2xl p-6 text-center cursor-pointer transition"
                  onclick="document.getElementById('sell-file-input').click()">
                  <i class="fa-solid fa-cloud-arrow-up text-3xl text-emerald-600 mb-2"></i>
                  <p class="text-xs font-bold text-slate-800">Click to upload from device</p>
                  <p class="text-[11px] text-slate-400 mt-0.5">JPG, PNG or WebP</p>
                  <input type="file" id="sell-file-input" class="hidden" accept="image/*" multiple onchange="handleSellFileUpload(event)">
                </div>

                <!-- Instant Sample Image Presets (Convenient for fast demo testing) -->
                <div class="mt-3">
                  <span class="text-[11px] font-bold text-slate-500 block mb-2">Or select a quick high-res demo photo:</span>
                  <div class="flex flex-wrap gap-2">
                    <button type="button" onclick="selectSampleImage('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800')" class="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-100 hover:bg-emerald-100 text-slate-700 transition">Laptop / MacBook</button>
                    <button type="button" onclick="selectSampleImage('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800')" class="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-100 hover:bg-emerald-100 text-slate-700 transition">Smartphone</button>
                    <button type="button" onclick="selectSampleImage('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800')" class="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-100 hover:bg-emerald-100 text-slate-700 transition">Sofa / Furniture</button>
                    <button type="button" onclick="selectSampleImage('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800')" class="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-100 hover:bg-emerald-100 text-slate-700 transition">Motorcycle / Bike</button>
                    <button type="button" onclick="selectSampleImage('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800')" class="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-100 hover:bg-emerald-100 text-slate-700 transition">Audio / Headphones</button>
                  </div>
                </div>

                <!-- Uploaded Preview Grid -->
                <div id="sell-image-previews" class="flex flex-wrap gap-3 mt-4"></div>
              </div>
            </div>

            <!-- SECTION 4: First Owner & Location Details -->
            <div>
              <div class="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">4</div>
                <h3 class="font-bold text-slate-900 text-sm">First Owner & Pickup Location</h3>
              </div>

              <div class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">First Owner's Name *</label>
                    <input type="text" id="sell-owner-name" required value="${user ? user.name : 'Vikas Narayanan'}" placeholder="e.g. Vikas Narayanan"
                      class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Contact Phone Number *</label>
                    <input type="tel" id="sell-owner-phone" required value="+91 98409 54321" placeholder="+91 98xxx xxxxx"
                      class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input type="email" id="sell-owner-email" required value="${user ? user.email : 'vikas.demo@reusemarket.in'}" placeholder="vikas@example.com"
                      class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">City Location *</label>
                    <select id="sell-owner-city" required class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white">
                      ${CITIES.map(c => `<option value="${c.name}">${c.name} (${c.state})</option>`).join('')}
                    </select>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Area / Neighborhood *</label>
                    <input type="text" id="sell-owner-area" required value="Adyar / Besant Nagar" placeholder="e.g. East Tambaram, HSR Layout, Bandra West"
                      class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Ownership Note / Reason for Selling</label>
                  <textarea id="sell-owner-story" rows="2" placeholder="e.g. Upgrading to a new model. Always stored in a smoke-free home and comes with original packaging..."
                    class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">Purchased brand-new and lightly used. In pristine working order with all standard cables included.</textarea>
                </div>
              </div>
            </div>

            <!-- Submit CTA Button -->
            <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p class="text-[11px] text-slate-400">
                <i class="fa-solid fa-shield-check text-emerald-600 mr-1"></i>
                By submitting, your listing will immediately be published into the ReUse Market marketplace!
              </p>
              <button type="submit" 
                class="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 transition">
                Publish Product Listing Now
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  `;
}

function initSellForm() {
  uploadedImageUrls = [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'
  ];
  renderSellImagePreviews();
}

function selectSampleImage(url) {
  if (!uploadedImageUrls.includes(url)) {
    uploadedImageUrls.push(url);
    renderSellImagePreviews();
  }
}

function handleSellFileUpload(e) {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = (event) => {
      uploadedImageUrls.push(event.target.result);
      renderSellImagePreviews();
    };
    reader.readAsDataURL(file);
  }
}

function removeSellImage(idx) {
  uploadedImageUrls.splice(idx, 1);
  renderSellImagePreviews();
}

function renderSellImagePreviews() {
  const container = document.getElementById('sell-image-previews');
  if (!container) return;

  if (uploadedImageUrls.length === 0) {
    container.innerHTML = '<span class="text-xs text-slate-400 italic">No images added yet. Click upload or select a preset above.</span>';
    return;
  }

  container.innerHTML = uploadedImageUrls.map((url, i) => `
    <div class="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 group">
      <img src="${url}" class="w-full h-full object-cover">
      <button type="button" onclick="removeSellImage(${i})" 
        class="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center shadow opacity-90 hover:opacity-100">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `).join('');
}

function calculateSellSavings() {
  const orig = Number(document.getElementById('sell-original-price')?.value) || 0;
  const sell = Number(document.getElementById('sell-selling-price')?.value) || 0;
  const ind = document.getElementById('sell-savings-indicator');
  const txt = document.getElementById('sell-savings-text');

  if (orig > 0 && sell > 0 && orig > sell) {
    const savings = orig - sell;
    const pct = Math.round((savings / orig) * 100);
    ind.classList.remove('hidden');
    txt.innerHTML = `Great value! Buyer will save <strong>${formatCurrency(savings)} (${pct}% OFF)</strong>`;
  } else {
    ind.classList.add('hidden');
  }
}

function handleSellSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('sell-name').value;
  const category = document.getElementById('sell-category').value;
  const condition = document.getElementById('sell-condition').value;
  const description = document.getElementById('sell-description').value;
  const originalPrice = Number(document.getElementById('sell-original-price').value);
  const sellingPrice = Number(document.getElementById('sell-selling-price').value);
  const ownerName = document.getElementById('sell-owner-name').value;
  const ownerPhone = document.getElementById('sell-owner-phone').value;
  const ownerEmail = document.getElementById('sell-owner-email').value;
  const city = document.getElementById('sell-owner-city').value;
  const area = document.getElementById('sell-owner-area').value;
  const story = document.getElementById('sell-owner-story').value;

  if (uploadedImageUrls.length === 0) {
    showToast('Add at least 1 image', 'Please select or upload a product photo.', 'warning');
    return;
  }

  // Find or create city coordinates
  const cityObj = CITIES.find(c => c.name.toLowerCase() === city.toLowerCase()) || CITIES[0];
  const jitterLat = (Math.random() - 0.5) * 0.04;
  const jitterLng = (Math.random() - 0.5) * 0.04;

  // Create temporary owner or link
  const ownerId = 'owner-custom-' + Date.now();
  FIRST_OWNERS.unshift({
    id: ownerId,
    name: ownerName,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    city: city,
    area: area,
    phone: ownerPhone,
    email: ownerEmail,
    memberSince: 'Just joined',
    productsSold: 0,
    rating: 5.0,
    reviewsCount: 1,
    verified: true,
    bio: story
  });

  const newProduct = state.addProduct({
    name,
    category,
    condition,
    description,
    originalPrice,
    sellingPrice,
    ownerId,
    city,
    area: area + ', ' + city,
    ownershipStory: story,
    images: [...uploadedImageUrls],
    coordinates: {
      lat: cityObj.lat + jitterLat,
      lng: cityObj.lng + jitterLng
    },
    specifications: {
      'Condition': condition,
      'Listed City': city,
      'Area': area,
      'Warranty / Bills': 'Verified with First Owner on pickup'
    }
  });

  showToast('Product Published Successfully! 🎉', 'Your item is now live in the ReUse marketplace.', 'success');
  
  // Navigate directly to the new product page
  state.navigate('product-detail', newProduct.id);
}

/* =========================================================================
   7. ABOUT US PAGE RENDERER
   ========================================================================= */
function renderAboutPage() {
  return `
    <div class="bg-slate-50 min-h-screen py-12 sm:py-16 border-b border-slate-200">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <!-- Hero Header -->
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-3">
            <i class="fa-solid fa-leaf"></i>
            <span>Our Purpose & Vision</span>
          </div>
          <h1 class="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Building India's Most Trusted Second-Hand Economy
          </h1>
          <p class="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
            At <strong>ReUse Market</strong>, we believe every well-engineered device, durable chair, and beloved bicycle deserves a second chapter. Our mission: "Give Products a Second Life."
          </p>
        </div>

        <!-- Story, Mission & Vision Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl mb-4">
              <i class="fa-solid fa-book-sparkles"></i>
            </div>
            <h3 class="font-extrabold text-slate-900 text-base mb-2">Our Story</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Founded to eliminate predatory middlemen and shady refurbishers, ReUse Market reconnects real consumers directly with original first owners who lovingly maintained their possessions.
            </p>
          </div>

          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div class="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl mb-4">
              <i class="fa-solid fa-bullseye"></i>
            </div>
            <h3 class="font-extrabold text-slate-900 text-base mb-2">Our Mission</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              To make second-hand purchases the first, smartest, and proudest choice for every household in India, ensuring safety, local transparency, and zero hidden markups.
            </p>
          </div>

          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div class="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-xl mb-4">
              <i class="fa-solid fa-eye"></i>
            </div>
            <h3 class="font-extrabold text-slate-900 text-base mb-2">Our Vision</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              A 100% circular urban ecosystem where quality goods pass smoothly between owners across generations, keeping toxic electronics out of nature and soil.
            </p>
          </div>
        </div>

        <!-- Why Choose ReUse Market -->
        <div class="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 mb-6 tracking-tight text-center">
            Why Choose ReUse Market?
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg flex-shrink-0">
                <i class="fa-solid fa-user-check"></i>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-sm mb-1">Strictly First Owners</h4>
                <p class="text-xs text-slate-500 leading-relaxed">No refurbished retail lots or mystery third-party middlemen. You meet the actual person who purchased the item brand new.</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg flex-shrink-0">
                <i class="fa-solid fa-handshake"></i>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-sm mb-1">In-Person Test Before You Pay</h4>
                <p class="text-xs text-slate-500 leading-relaxed">Never pay blind online. Meet locally in your neighborhood, inspect cameras, screens, and motors, and pay with peace of mind.</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-lg flex-shrink-0">
                <i class="fa-solid fa-percent"></i>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-sm mb-1">Zero Seller Commission</h4>
                <p class="text-xs text-slate-500 leading-relaxed">Keep 100% of your listed selling price. We do not shave off exorbitant listing fees or broker charges.</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-lg flex-shrink-0">
                <i class="fa-solid fa-tree"></i>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-sm mb-1">Measurable Eco Contribution</h4>
                <p class="text-xs text-slate-500 leading-relaxed">Every transaction tracks your carbon offset and keeps lithium-ion batteries and plastics away from dumping yards.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Environmental Sustainability & E-Waste Guide -->
        <div class="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-navy-800 shadow-2xl">
          <div class="max-w-2xl mb-8">
            <span class="text-emerald-400 text-xs font-bold uppercase tracking-wider block mb-2">Environmental Responsibility</span>
            <h3 class="text-2xl sm:text-3xl font-black tracking-tight mb-3">Reducing Electronic & Material Waste</h3>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              India generates over 3.2 million metric tons of e-waste annually. Over 90% of working components in discarded electronics still have years of dependable life left.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-navy-800">
            <div>
              <span class="text-3xl font-black text-emerald-400 block mb-1">80%</span>
              <p class="text-xs text-slate-300">Of a device's total lifetime carbon footprint occurs during initial mining and manufacturing.</p>
            </div>
            <div>
              <span class="text-3xl font-black text-teal-300 block mb-1">2+ Years</span>
              <p class="text-xs text-slate-300">Extending a product’s lifecycle by just 2 years halves its net climate impact.</p>
            </div>
            <div>
              <span class="text-3xl font-black text-orange-400 block mb-1">100%</span>
              <p class="text-xs text-slate-300">Community commitment towards honest grading and circular stewardship.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

/* =========================================================================
   8. CONTACT PAGE RENDERER
   ========================================================================= */
function renderContactPage() {
  const faqs = [
    {
      q: 'How does ReUse Market ensure buyers are meeting real first owners?',
      a: 'We require sellers to provide original purchase details, device histories, and verify phone numbers. We never list wholesale dealers or refurbished enterprise inventory.'
    },
    {
      q: 'How should I pay the seller for an item?',
      a: 'Always inspect the product in-person before transferring any funds. We strongly recommend meeting in a public, well-lit location (e.g. coffee shop or metro concourse) and paying via UPI or cash upon satisfaction.'
    },
    {
      q: 'Does ReUse Market charge fees or commissions?',
      a: 'No! Listing and buying on ReUse Market is 100% free for individual users. There are no surprise commissions taken from your sale.'
    },
    {
      q: 'Can I sell my product if I do not have the original box?',
      a: 'Yes, absolutely! Having the original box and invoice is helpful for verification, but you can sell any clean, functional item by describing its condition honestly.'
    },
    {
      q: 'What if an item is not working as described when I meet the seller?',
      a: 'You are under no obligation to complete the purchase. Since payments happen in-person after inspection, you can politely decline if the condition does not match expectations.'
    }
  ];

  return `
    <div class="bg-slate-50 min-h-screen py-12 sm:py-16 border-b border-slate-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <!-- Header -->
        <div class="text-center max-w-2xl mx-auto">
          <div class="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-3">
            <i class="fa-solid fa-headset"></i>
            <span>We are here to help</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Contact ReUse Market Support</h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-2">
            Have questions about listing an item, safety guidelines, or need project help? Send our team a message.
          </p>
        </div>

        <!-- Contact Grid: Form + Info Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- Contact Form -->
          <div class="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 class="text-lg font-black text-slate-900 mb-1">Send Us a Message</h3>
            <p class="text-xs text-slate-500 mb-6">Our community support team responds within 24 hours.</p>

            <form onsubmit="handleContactSubmit(event)" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input type="text" id="contact-name" required placeholder="Aravind Balaji"
                    class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input type="email" id="contact-email" required placeholder="aravind@example.com"
                    class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
                <input type="text" id="contact-subject" required placeholder="Question about listing verification / safety"
                  class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Message Details *</label>
                <textarea id="contact-message" rows="4" required placeholder="Write your questions or feedback..."
                  class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"></textarea>
              </div>

              <button type="submit" 
                class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition">
                Send Inquiries
              </button>
            </form>
          </div>

          <!-- Contact Information & Office Details -->
          <div class="lg:col-span-5 space-y-4">
            
            <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h4 class="font-extrabold text-slate-900 text-sm">Demo Office & Support</h4>
              
              <div class="flex items-start gap-3 text-xs">
                <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i class="fa-solid fa-building"></i>
                </div>
                <div>
                  <p class="font-bold text-slate-800">Headquarters</p>
                  <p class="text-slate-500 text-[11px] leading-relaxed">
                    ReUse Market Foundation, 4th Floor, Green Horizon Eco-Park, Inner Ring Road, Guindy, Chennai, Tamil Nadu 600032.
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-3 text-xs">
                <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <i class="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <p class="font-bold text-slate-800">Email Address</p>
                  <p class="text-slate-500 text-[11px]">support@reusemarket.demo</p>
                </div>
              </div>

              <div class="flex items-center gap-3 text-xs">
                <div class="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <i class="fa-solid fa-phone"></i>
                </div>
                <div>
                  <p class="font-bold text-slate-800">Support Helpline</p>
                  <p class="text-slate-500 text-[11px]">+91 44 2828 9000 (Mon - Sat, 9am - 7pm IST)</p>
                </div>
              </div>

            </div>

            <!-- Social Media Box -->
            <div class="bg-navy-950 text-white rounded-3xl p-6 border border-navy-800 shadow-xl space-y-3">
              <h4 class="font-extrabold text-white text-sm">Connect on Socials</h4>
              <p class="text-xs text-slate-400">Join our growing movement of sustainable circular shoppers.</p>
              <div class="flex items-center gap-2 pt-1">
                <a href="#" class="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-emerald-600 text-xs font-semibold text-slate-200 transition">Twitter / X</a>
                <a href="#" class="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-emerald-600 text-xs font-semibold text-slate-200 transition">Instagram</a>
                <a href="#" class="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-emerald-600 text-xs font-semibold text-slate-200 transition">LinkedIn</a>
              </div>
            </div>

          </div>

        </div>

        <!-- FAQ Accordion Section -->
        <div class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <h3 class="text-2xl font-black text-slate-900 tracking-tight text-center mb-8">
            Frequently Asked Questions
          </h3>

          <div class="space-y-3 max-w-3xl mx-auto">
            ${faqs.map((faq, i) => `
              <div class="rounded-2xl border border-slate-200 overflow-hidden">
                <button onclick="toggleFaq(${i})" 
                  class="w-full text-left p-4 sm:p-5 text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-between bg-white hover:bg-slate-50 transition">
                  <span>${faq.q}</span>
                  <i class="fa-solid fa-chevron-down text-slate-400 text-xs transition-transform duration-200" id="faq-chevron-${i}"></i>
                </button>
                <div id="faq-answer-${i}" class="hidden p-4 sm:p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  ${faq.a}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
  `;
}

function toggleFaq(idx) {
  const ans = document.getElementById(`faq-answer-${idx}`);
  const chev = document.getElementById(`faq-chevron-${idx}`);
  if (!ans) return;

  const isHidden = ans.classList.contains('hidden');
  if (isHidden) {
    ans.classList.remove('hidden');
    chev.classList.add('rotate-180');
  } else {
    ans.classList.add('hidden');
    chev.classList.remove('rotate-180');
  }
}

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value;
  showToast('Inquiry Received! ✉️', `Thank you, ${name}. Our demo team has recorded your message.`, 'success');
  e.target.reset();
}

/* =========================================================================
   9. FULLSCREEN MAP PAGE RENDERER
   ========================================================================= */
function renderMapPage() {
  const currentCity = state.filters.city;
  const filteredCount = state.getFilteredProducts().length;

  return `
    <div class="bg-navy-950 text-white min-h-[calc(100vh-80px)] flex flex-col">
      
      <!-- Top Control Header -->
      <div class="bg-navy-900 border-b border-navy-800 py-3 px-4 sm:px-8">
        <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base sm:text-lg font-black tracking-tight text-white">Interactive Product Map</h1>
              <span class="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                ${filteredCount} Pins Plotted
              </span>
            </div>
            <p class="text-[11px] text-slate-400">Click any price pin on the map to inspect the product, first owner, and open details.</p>
          </div>

          <!-- City Filters Bar -->
          <div class="flex items-center gap-1.5 flex-wrap">
            <button onclick="handleMapCitySelect('all')" 
              class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                currentCity === 'all' ? 'bg-emerald-600 text-white' : 'bg-navy-800 text-slate-300 hover:text-white'
              }">
              All Hubs
            </button>
            ${CITIES.map(c => `
              <button onclick="handleMapCitySelect('${c.name}')" 
                class="px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  currentCity.toLowerCase() === c.name.toLowerCase() ? 'bg-emerald-600 text-white font-bold' : 'bg-navy-800 text-slate-300 hover:text-white'
                }">
                ${c.name}
              </button>
            `).join('')}
          </div>

        </div>
      </div>

      <!-- Map Viewport -->
      <div class="flex-1 relative w-full h-[75vh]">
        <div id="fullscreen-map" class="w-full h-full bg-navy-950"></div>

        <!-- Floating Legend & Disclaimer -->
        <div class="absolute bottom-5 left-5 z-10 bg-navy-900/90 backdrop-blur-md p-3 rounded-2xl border border-navy-700 shadow-2xl text-[11px] max-w-xs hidden sm:block">
          <p class="font-bold text-white mb-1.5 flex items-center gap-1.5">
            <i class="fa-solid fa-map-pin text-emerald-400"></i> Click a city pin to filter
          </p>
          <div class="grid grid-cols-2 gap-1.5 text-[10px]">
            <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Chennai</span>
            <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Tambaram</span>
            <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Chengalpattu</span>
            <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Coimbatore</span>
            <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Madurai</span>
          </div>
          <p class="text-[9px] text-slate-400 mt-2 border-t border-navy-800 pt-1.5">
            Demo data — approximate pickup zone coordinates.
          </p>
        </div>

      </div>

    </div>
  `;
}

function handleMapCitySelect(city) {
  state.setFilters({ city });
  initMarketplaceMap('fullscreen-map', city);
}

