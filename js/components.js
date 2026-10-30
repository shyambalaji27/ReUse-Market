/**
 * ReUse Market - Reusable UI Components
 * "Give Products a Second Life."
 */

// Helper to format currency
function formatCurrency(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

// Calculate discount percentage
function calculateDiscount(original, selling) {
  if (!original || original <= selling) return 0;
  return Math.round(((original - selling) / original) * 100);
}

// Condition badge styling
function getConditionBadge(condition) {
  let bg = 'bg-slate-100 text-slate-800 border-slate-200';
  let icon = 'fa-check';

  if (condition === 'Like New') {
    bg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    icon = 'fa-sparkles';
  } else if (condition === 'Good') {
    bg = 'bg-blue-50 text-blue-700 border-blue-200';
    icon = 'fa-circle-check';
  } else if (condition === 'Average') {
    bg = 'bg-amber-50 text-amber-700 border-amber-200';
    icon = 'fa-clock';
  } else if (condition === 'Used') {
    bg = 'bg-slate-100 text-slate-700 border-slate-200';
    icon = 'fa-recycle';
  }

  return `
    <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${bg}">
      <i class="fa-solid ${icon} text-[10px]"></i>
      ${condition}
    </span>
  `;
}

/**
 * Navigation Bar Component
 */
function renderNavbar() {
  const currentView = state.currentRoute.view;
  const wishlistCount = state.wishlist.size;
  const user = state.currentUser;

  const links = [
    { id: 'home', label: 'Home', icon: 'fa-house' },
    { id: 'products', label: 'Products', icon: 'fa-bag-shopping' },
    { id: 'first-owners', label: 'First Owner', icon: 'fa-user-check' },
    { id: 'about', label: 'About Us', icon: 'fa-circle-info' },
    { id: 'contact', label: 'Contact', icon: 'fa-envelope' }
  ];

  return `
    <header class="sticky top-0 z-40 bg-navy-950/95 backdrop-blur-md text-white border-b border-navy-800 shadow-md">
      <!-- Top Micro Announcement / Demo Banner -->
      <div class="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border-b border-navy-700/50 py-1 px-4 text-xs text-slate-300">
        <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-emerald-500/30">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Peer-to-Peer
            </span>
            <span>Sustainable Pre-Owned Commerce across 8 Hub Cities in India</span>
          </div>
          <div class="hidden md:flex items-center gap-4 text-[11px] text-slate-300">
            <span><i class="fa-solid fa-shield-halved text-emerald-400 mr-1"></i>100% Direct First Owners</span>
            <span><i class="fa-solid fa-leaf text-emerald-400 mr-1"></i>Save Money & Save The Planet</span>
            <span class="text-orange-400 font-medium"><i class="fa-solid fa-circle-exclamation mr-1"></i>Demo Data Notice</span>
          </div>
        </div>
      </div>

      <!-- Main Header Container -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Brand Logo -->
          <a href="#home" onclick="state.navigate('home'); return false;" class="flex items-center gap-3 group">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <i class="fa-solid fa-recycle text-xl"></i>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">ReUse</span>
                <span class="text-xl sm:text-2xl font-light tracking-tight text-emerald-400">Market</span>
              </div>
              <p class="text-[10px] sm:text-xs text-slate-300 font-medium tracking-wider">Give Products a Second Life.</p>
            </div>
          </a>

          <!-- Desktop Navigation Links -->
          <nav class="hidden lg:flex items-center gap-1">
            ${links.map(l => `
              <a href="#${l.id}" onclick="state.navigate('${l.id}'); return false;"
                class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === l.id 
                    ? 'text-emerald-400 bg-navy-800/80 font-semibold' 
                    : 'text-slate-200 hover:text-white hover:bg-navy-800/50'
                }">
                <i class="fa-solid ${l.icon} mr-1.5 text-xs opacity-70"></i>
                ${l.label}
              </a>
            `).join('')}
          </nav>

          <!-- Action Buttons / Auth / Wishlist / CTA -->
          <div class="flex items-center gap-2 sm:gap-3">
            
            <!-- Quick Map Toggle -->
            <button onclick="state.navigate('map')" title="Interactive Product Map"
              class="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-navy-800 text-slate-200 hover:text-white hover:bg-navy-700 transition border border-navy-700">
              <i class="fa-solid fa-map-location-dot text-emerald-400"></i>
              <span>City Map</span>
            </button>

            <!-- Wishlist Button with Badge -->
            <button onclick="state.openModal('wishlist')" title="Wishlist"
              class="relative p-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-navy-800 transition">
              <i class="fa-solid fa-heart text-base ${wishlistCount > 0 ? 'text-red-500' : ''}"></i>
              ${wishlistCount > 0 ? `
                <span class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  ${wishlistCount}
                </span>
              ` : ''}
            </button>

            <!-- User Auth Profile or Login / Sign Up -->
            ${user ? `
              <div class="relative group">
                <button class="flex items-center gap-2 p-1.5 rounded-lg bg-navy-800/80 border border-navy-700 hover:border-emerald-500/50 transition">
                  <img src="${user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}" class="w-8 h-8 rounded-full object-cover">
                  <span class="hidden md:inline text-xs font-semibold text-slate-200">${user.name.split(' ')[0]}</span>
                  <i class="fa-solid fa-chevron-down text-[10px] text-slate-400 mr-1"></i>
                </button>
                <div class="absolute right-0 mt-2 w-48 bg-navy-900 border border-navy-700 rounded-xl shadow-2xl py-2 hidden group-hover:block z-50">
                  <div class="px-4 py-2 border-b border-navy-800">
                    <p class="text-xs font-bold text-white">${user.name}</p>
                    <p class="text-[10px] text-slate-400 truncate">${user.email}</p>
                  </div>
                  <a href="#sell" onclick="state.navigate('sell'); return false;" class="block px-4 py-2 text-xs text-slate-200 hover:bg-navy-800 hover:text-emerald-400">
                    <i class="fa-solid fa-plus mr-2"></i>My Listed Items
                  </a>
                  <button onclick="state.logout()" class="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-navy-800">
                    <i class="fa-solid fa-right-from-bracket mr-2"></i>Sign Out
                  </button>
                </div>
              </div>
            ` : `
              <button onclick="state.openModal('auth')" 
                class="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-200 hover:text-white hover:bg-navy-800 border border-navy-700 transition">
                <i class="fa-solid fa-user mr-1.5 text-xs text-emerald-400"></i>
                <span class="hidden sm:inline">Login / Sign Up</span>
                <span class="sm:hidden">Login</span>
              </button>
            `}

            <!-- Sell Your Product (Prominent CTA) -->
            <button onclick="state.navigate('sell')"
              class="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 text-xs sm:text-sm transition-all transform hover:-translate-y-0.5">
              <i class="fa-solid fa-circle-plus text-sm"></i>
              <span>Sell Product</span>
            </button>

            <!-- Mobile Hamburger Toggle -->
            <button id="mobile-menu-toggle" onclick="toggleMobileMenu()" class="lg:hidden p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 transition">
              <i class="fa-solid fa-bars text-lg"></i>
            </button>

          </div>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div id="mobile-menu" class="hidden lg:hidden bg-navy-900 border-b border-navy-800 px-4 pt-2 pb-6 space-y-2">
        <div class="grid grid-cols-2 gap-2 pt-2 pb-3 border-b border-navy-800">
          <button onclick="state.navigate('sell'); toggleMobileMenu(false);" class="w-full py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow">
            <i class="fa-solid fa-plus"></i>Sell Product
          </button>
          <button onclick="state.navigate('map'); toggleMobileMenu(false);" class="w-full py-2.5 bg-navy-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border border-navy-700">
            <i class="fa-solid fa-map-location-dot text-emerald-400"></i>City Map
          </button>
        </div>
        ${links.map(l => `
          <a href="#${l.id}" onclick="state.navigate('${l.id}'); toggleMobileMenu(false); return false;"
            class="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              currentView === l.id 
                ? 'text-emerald-400 bg-navy-800 font-bold' 
                : 'text-slate-300 hover:bg-navy-800/60 hover:text-white'
            }">
            <i class="fa-solid ${l.icon} w-5 text-center text-slate-400"></i>
            ${l.label}
          </a>
        `).join('')}
        ${!user ? `
          <button onclick="state.openModal('auth'); toggleMobileMenu(false);" class="w-full text-left flex items-center gap-3 px-3.5 py-2.5 text-sm text-slate-300 hover:bg-navy-800 rounded-lg">
            <i class="fa-solid fa-user w-5 text-center text-emerald-400"></i>
            Login / Sign Up
          </button>
        ` : `
          <button onclick="state.logout(); toggleMobileMenu(false);" class="w-full text-left flex items-center gap-3 px-3.5 py-2.5 text-sm text-red-400 hover:bg-navy-800 rounded-lg">
            <i class="fa-solid fa-right-from-bracket w-5 text-center"></i>
            Sign Out (${user.name})
          </button>
        `}
      </div>
    </header>
  `;
}

function toggleMobileMenu(force) {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;
  if (typeof force === 'boolean') {
    if (force) menu.classList.remove('hidden');
    else menu.classList.add('hidden');
  } else {
    menu.classList.toggle('hidden');
  }
}

/**
 * Product Card Component
 */
function renderProductCard(product, options = {}) {
  const owner = getOwnerById(product.ownerId);
  const category = getCategoryById(product.category);
  const discount = calculateDiscount(product.originalPrice, product.sellingPrice);
  const isSaved = state.isWishlisted(product.id);

  return `
    <div class="product-card group bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative" data-product-id="${product.id}">
      
      <!-- Top Image Area -->
      <div class="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer" onclick="state.navigate('product-detail', '${product.id}')">
        <img src="${product.images[0]}" alt="${product.name}" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy">
        
        <!-- Floating Condition & Discount Badges -->
        <div class="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          ${getConditionBadge(product.condition)}
          ${discount > 0 ? `
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-orange-600 text-white shadow-sm">
              ${discount}% OFF
            </span>
          ` : ''}
        </div>

        <!-- Wishlist Button -->
        <button onclick="event.stopPropagation(); state.toggleWishlist('${product.id}')"
          title="Save to wishlist"
          class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-slate-600 hover:text-red-500 shadow-md flex items-center justify-center transition transform active:scale-90">
          <i class="fa-${isSaved ? 'solid text-red-500' : 'regular'} fa-heart text-sm"></i>
        </button>

        <!-- Category Pill on bottom of image -->
        <div class="absolute bottom-2.5 left-3">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-navy-950/80 backdrop-blur-md text-slate-200">
            <i class="${category.icon} text-emerald-400"></i>
            ${category.name}
          </span>
        </div>
      </div>

      <!-- Card Body -->
      <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          <!-- Title -->
          <h3 onclick="state.navigate('product-detail', '${product.id}')"
            class="font-bold text-slate-900 text-sm sm:text-base line-clamp-2 hover:text-emerald-600 transition cursor-pointer mb-2 leading-snug"
            title="${product.name}">
            ${product.name}
          </h3>

          <!-- Pricing Block -->
          <div class="flex items-baseline gap-2 mb-3">
            <span class="text-xl sm:text-2xl font-black text-emerald-600">
              ${formatCurrency(product.sellingPrice)}
            </span>
            <span class="text-xs sm:text-sm text-slate-400 line-through">
              ${formatCurrency(product.originalPrice)}
            </span>
            <span class="text-[11px] text-slate-500 font-medium ml-auto">
              Save ${formatCurrency(product.originalPrice - product.sellingPrice)}
            </span>
          </div>

          <!-- First Owner Snippet -->
          <div class="flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100 mb-3">
            <div class="flex items-center gap-2.5 cursor-pointer" onclick="state.navigate('first-owner', '${owner.id}')">
              <div class="relative">
                <img src="${owner.avatar}" alt="${owner.name}" class="w-8 h-8 rounded-full object-cover border border-emerald-400">
                <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full text-white flex items-center justify-center text-[7px]" title="Verified First Owner">
                  <i class="fa-solid fa-check"></i>
                </span>
              </div>
              <div>
                <p class="text-xs font-bold text-slate-900 hover:text-emerald-700 transition leading-tight flex items-center gap-1">
                  ${owner.name}
                </p>
                <p class="text-[10px] text-slate-500 font-medium">1st Owner • ★ ${owner.rating}</p>
              </div>
            </div>
            <button onclick="state.openModal('contact', { product, owner })" 
              title="Quick Contact Owner"
              class="w-7 h-7 rounded-lg bg-emerald-100/70 hover:bg-emerald-200 text-emerald-800 flex items-center justify-center text-xs transition">
              <i class="fa-solid fa-message"></i>
            </button>
          </div>

          <!-- Location & Posted Date -->
          <div class="flex items-center justify-between text-[11px] text-slate-500 mb-4">
            <span class="flex items-center gap-1 truncate" title="${product.area}">
              <i class="fa-solid fa-location-dot text-orange-500"></i>
              <span class="truncate">${product.city}</span>
            </span>
            <span class="text-slate-400 flex items-center gap-1 whitespace-nowrap">
              <i class="fa-regular fa-clock"></i>
              ${product.postedDate}
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <button onclick="state.navigate('product-detail', '${product.id}')"
            class="w-full py-2 px-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold transition flex items-center justify-center gap-1 shadow-sm">
            <span>View Details</span>
            <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
          <button onclick="state.openModal('contact', { product, owner })"
            class="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition flex items-center justify-center gap-1.5">
            <i class="fa-solid fa-phone text-[10px]"></i>
            <span>Contact Owner</span>
          </button>
        </div>

      </div>
    </div>
  `;
}

/**
 * First Owner Showcase Card Component
 */
function renderOwnerCard(owner, activeProductsCount = 0) {
  return `
    <div class="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      <div>
        <div class="flex items-start gap-4 mb-4">
          <div class="relative">
            <img src="${owner.avatar}" alt="${owner.name}" class="w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-emerald-400">
            <span class="absolute -bottom-1.5 -right-1.5 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow">
              <i class="fa-solid fa-shield-check text-[9px]"></i> Verified
            </span>
          </div>
          <div class="flex-1">
            <h3 class="font-extrabold text-slate-900 text-base hover:text-emerald-600 cursor-pointer transition"
              onclick="state.navigate('first-owner', '${owner.id}')">
              ${owner.name}
            </h3>
            <p class="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <i class="fa-solid fa-location-dot text-orange-500"></i>
              ${owner.area}, ${owner.city}
            </p>
            <div class="flex items-center gap-3 mt-2 text-xs">
              <span class="inline-flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                <i class="fa-solid fa-star text-[10px]"></i> ${owner.rating}
              </span>
              <span class="text-slate-400">(${owner.reviewsCount} verified reviews)</span>
            </div>
          </div>
        </div>

        <!-- Bio / Story -->
        <p class="text-xs text-slate-600 line-clamp-3 mb-4 italic leading-relaxed">
          "${owner.bio}"
        </p>

        <!-- Stats Chips -->
        <div class="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs mb-4">
          <div>
            <span class="text-[10px] text-slate-400 block font-medium">Member Since</span>
            <span class="font-bold text-slate-800">${owner.memberSince}</span>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 block font-medium">ReUse Track Record</span>
            <span class="font-bold text-emerald-600">${owner.productsSold} items passed on</span>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 pt-2 border-t border-slate-100">
        <button onclick="state.navigate('first-owner', '${owner.id}')"
          class="flex-1 py-2 px-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold transition flex items-center justify-center gap-1.5">
          <span>View Listings (${activeProductsCount})</span>
        </button>
        <button onclick="state.openModal('owner-inquiry', { owner })"
          class="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
          title="Direct Message">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  `;
}

/**
 * Filter Sidebar Component for Products Page
 */
function renderFilterSidebar() {
  const f = state.filters;
  const categories = CATEGORIES;
  const cities = CITIES;
  const conditions = ['Like New', 'Good', 'Average', 'Used'];

  return `
    <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6">
      
      <!-- Header & Clear -->
      <div class="flex items-center justify-between pb-4 border-b border-slate-100">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-sliders text-emerald-600"></i>
          <h3 class="font-bold text-slate-900 text-sm">Filter Products</h3>
        </div>
        <button onclick="state.resetFilters()" class="text-xs text-emerald-600 hover:text-emerald-700 font-semibold">
          Reset All
        </button>
      </div>

      <!-- Search Keyword -->
      <div>
        <label class="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Search</label>
        <div class="relative">
          <input type="text" id="filter-search-input" value="${f.search || ''}" 
            placeholder="Product, brand, keyword..."
            oninput="handleSearchFilter(this.value)"
            class="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
          <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
          ${f.search ? `
            <button onclick="clearSearchFilter()" class="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs">
              <i class="fa-solid fa-xmark"></i>
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Categories Filter -->
      <div>
        <label class="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">Category</label>
        <div class="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          <button onclick="handleCategoryFilter('all')"
            class="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
              f.category === 'all' ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }">
            <span>All Categories</span>
            <span class="text-[10px] text-slate-400">${state.products.length}</span>
          </button>
          ${categories.map(c => {
            const count = state.products.filter(p => p.category === c.id).length;
            const isSelected = f.category === c.id;
            return `
              <button onclick="handleCategoryFilter('${c.id}')"
                class="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  isSelected ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-slate-600 hover:bg-slate-50'
                }">
                <span class="truncate flex items-center gap-2">
                  <i class="${c.icon} w-3 text-slate-400 text-[10px]"></i>
                  ${c.name}
                </span>
                <span class="text-[10px] ${isSelected ? 'text-emerald-700' : 'text-slate-400'}">${count}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Location / City Filter -->
      <div>
        <label class="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">City Location</label>
        <select onchange="handleCityFilter(this.value)" 
          class="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white">
          <option value="all" ${f.city === 'all' ? 'selected' : ''}>All Locations (8 Hubs)</option>
          ${cities.map(c => `
            <option value="${c.name}" ${f.city.toLowerCase() === c.name.toLowerCase() ? 'selected' : ''}>
              ${c.name} (${c.state})
            </option>
          `).join('')}
        </select>
        <p class="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1">
          <i class="fa-solid fa-map-pin text-orange-500"></i> Direct local owner pickups
        </p>
      </div>

      <!-- Condition Checkboxes -->
      <div>
        <label class="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Condition</label>
        <div class="space-y-2">
          ${conditions.map(cond => {
            const isChecked = f.conditions.includes(cond);
            return `
              <label class="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input type="checkbox" value="${cond}" ${isChecked ? 'checked' : ''}
                  onchange="handleConditionToggle('${cond}', this.checked)"
                  class="rounded text-emerald-600 focus:ring-emerald-500 border-slate-300">
                <span>${cond}</span>
              </label>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Price Range Filter -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-xs font-bold text-slate-800 uppercase tracking-wider">Max Price</label>
          <span class="text-xs font-bold text-emerald-600" id="price-range-display">
            ${formatCurrency(f.maxPrice)}
          </span>
        </div>
        <input type="range" min="1000" max="200000" step="1000" value="${f.maxPrice}"
          oninput="handlePriceRange(this.value)"
          class="w-full accent-emerald-600 cursor-pointer">
        <div class="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-medium">
          <span>₹1,000</span>
          <span>₹2,00,000+</span>
        </div>
      </div>

    </div>
  `;
}

/**
 * Filter handlers
 */
function handleSearchFilter(query) {
  state.setFilters({ search: query });
}
function clearSearchFilter() {
  const input = document.getElementById('filter-search-input');
  if (input) input.value = '';
  state.setFilters({ search: '' });
}
function handleCategoryFilter(categoryId) {
  state.setFilters({ category: categoryId });
}
function handleCityFilter(city) {
  state.setFilters({ city: city });
}
function handleConditionToggle(condition, isChecked) {
  let curr = [...state.filters.conditions];
  if (isChecked) {
    if (!curr.includes(condition)) curr.push(condition);
  } else {
    curr = curr.filter(c => c !== condition);
  }
  state.setFilters({ conditions: curr });
}
function handlePriceRange(maxVal) {
  const display = document.getElementById('price-range-display');
  if (display) display.innerText = formatCurrency(maxVal);
  state.setFilters({ maxPrice: Number(maxVal) });
}
function handleSortChange(sortVal) {
  state.setFilters({ sort: sortVal });
}

/**
 * Toast Notification System
 */
function showToast(title, message = '', type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `pointer-events-auto transform translate-y-4 opacity-0 transition-all duration-300 bg-navy-950 text-white rounded-2xl p-4 shadow-2xl border flex items-start gap-3 ${
    type === 'success' ? 'border-emerald-500/50' : 
    type === 'info' ? 'border-blue-500/50' : 'border-orange-500/50'
  }`;

  const iconClass = type === 'success' ? 'fa-circle-check text-emerald-400' : 
                    type === 'info' ? 'fa-circle-info text-blue-400' : 'fa-triangle-exclamation text-orange-400';

  toast.innerHTML = `
    <i class="fa-solid ${iconClass} text-lg mt-0.5"></i>
    <div class="flex-1 pr-2">
      <h5 class="text-xs font-bold text-white">${title}</h5>
      ${message ? `<p class="text-[11px] text-slate-300 mt-0.5 leading-snug">${message}</p>` : ''}
    </div>
    <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white text-xs">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);

  // Trigger animation in
  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 10);

  // Auto dismiss
  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * Auth Modal Component (Login / Sign Up)
 */
function renderAuthModal() {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 animate-scale-up">
        
        <button onclick="state.closeModal()" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>

        <!-- Brand Icon -->
        <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl mb-4 shadow-inner">
          <i class="fa-solid fa-recycle"></i>
        </div>

        <h3 class="text-xl font-black text-slate-900 tracking-tight">Welcome to ReUse Market</h3>
        <p class="text-xs text-slate-500 mb-6">Sign in to buy, sell, message first owners, and track your wishlist.</p>

        <!-- Tabs -->
        <div class="flex rounded-xl bg-slate-100 p-1 mb-6 text-xs font-bold">
          <button id="auth-tab-login" onclick="switchAuthTab('login')" class="flex-1 py-2 rounded-lg bg-white text-slate-900 shadow-sm transition">
            Sign In
          </button>
          <button id="auth-tab-register" onclick="switchAuthTab('register')" class="flex-1 py-2 rounded-lg text-slate-500 hover:text-slate-900 transition">
            Create Account
          </button>
        </div>

        <!-- Form -->
        <form onsubmit="handleAuthSubmit(event)" class="space-y-4 text-left">
          <div id="auth-name-group" class="hidden">
            <label class="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
            <input type="text" id="auth-name" placeholder="Priya Sharma" 
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <input type="email" id="auth-email" required placeholder="priya.sharma@example.com" value="priya.demo@reusemarket.in"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <input type="password" id="auth-password" required placeholder="••••••••" value="demo12345"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
          </div>

          <button type="submit" id="auth-submit-btn"
            class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition">
            Sign In to ReUse Market
          </button>
        </form>

        <!-- Demo Quick Sign-in Button -->
        <div class="mt-4 pt-4 border-t border-slate-100">
          <button onclick="handleQuickDemoLogin()"
            class="w-full py-2.5 px-4 rounded-xl bg-navy-50 hover:bg-navy-100 text-navy-900 text-xs font-semibold flex items-center justify-center gap-2 border border-navy-200 transition">
            <i class="fa-solid fa-bolt text-emerald-600"></i>
            <span>One-Click Demo Login as "Priya Sharma"</span>
          </button>
        </div>

        <p class="text-[10px] text-slate-400 text-center mt-4">
          By signing in, you agree to our Sustainable Trading Guidelines and Safe Meetup policies.
        </p>

      </div>
    </div>
  `;
}

function switchAuthTab(tab) {
  const loginTab = document.getElementById('auth-tab-login');
  const regTab = document.getElementById('auth-tab-register');
  const nameGroup = document.getElementById('auth-name-group');
  const submitBtn = document.getElementById('auth-submit-btn');

  if (tab === 'register') {
    loginTab.className = 'flex-1 py-2 rounded-lg text-slate-500 hover:text-slate-900 transition';
    regTab.className = 'flex-1 py-2 rounded-lg bg-white text-slate-900 shadow-sm transition';
    nameGroup.classList.remove('hidden');
    submitBtn.innerText = 'Create Free Account';
  } else {
    loginTab.className = 'flex-1 py-2 rounded-lg bg-white text-slate-900 shadow-sm transition';
    regTab.className = 'flex-1 py-2 rounded-lg text-slate-500 hover:text-slate-900 transition';
    nameGroup.classList.add('hidden');
    submitBtn.innerText = 'Sign In to ReUse Market';
  }
}

function handleAuthSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('auth-email').value;
  const nameInput = document.getElementById('auth-name');
  const name = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : email.split('@')[0];

  state.login({
    name: name,
    email: email,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    joined: 'October 2026'
  });
  state.closeModal();
}

function handleQuickDemoLogin() {
  state.login({
    name: 'Priya Sharma',
    email: 'priya.sharma@demo-reuse.in',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    joined: 'March 2024'
  });
  state.closeModal();
}

/**
 * Contact Modal Component (Direct chat, Phone reveal, WhatsApp inquiry)
 */
function renderContactModal(payload) {
  const product = payload.product || null;
  const owner = payload.owner || (product ? getOwnerById(product.ownerId) : null);

  if (!owner) return '';

  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in">
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
        
        <button onclick="state.closeModal()" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>

        <!-- Header Owner Summary -->
        <div class="flex items-center gap-3.5 pb-4 border-b border-slate-100">
          <div class="relative">
            <img src="${owner.avatar}" class="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-400">
            <span class="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[8px] font-bold px-1 py-0.5 rounded-full">
              <i class="fa-solid fa-check"></i>
            </span>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 text-base leading-tight">${owner.name}</h4>
            <p class="text-xs text-slate-500">${owner.area}, ${owner.city}</p>
            <div class="flex items-center gap-2 mt-1 text-[11px]">
              <span class="text-amber-600 font-bold"><i class="fa-solid fa-star"></i> ${owner.rating}</span>
              <span class="text-slate-400">•</span>
              <span class="text-slate-600">${owner.productsSold} products sold</span>
              <span class="text-slate-400">•</span>
              <span class="text-emerald-700 font-medium">Verified 1st Owner</span>
            </div>
          </div>
        </div>

        ${product ? `
          <!-- Product Context Box -->
          <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 my-4">
            <img src="${product.images[0]}" class="w-12 h-12 rounded-lg object-cover">
            <div class="flex-1 min-w-0">
              <p class="text-xs font-bold text-slate-900 truncate">${product.name}</p>
              <p class="text-xs font-extrabold text-emerald-600">${formatCurrency(product.sellingPrice)}</p>
            </div>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              ${product.condition}
            </span>
          </div>
        ` : ''}

        <!-- Interactive Contact Options Tabs -->
        <div class="space-y-4">
          
          <!-- Option 1: Instant In-App Inquiry / Simulated Chat -->
          <div class="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <h5 class="text-xs font-bold text-emerald-950 flex items-center gap-1.5 mb-2">
              <i class="fa-solid fa-comments text-emerald-600"></i>
              Send Instant Message to ${owner.name.split(' ')[0]}
            </h5>
            
            <!-- Quick Chips -->
            <div class="flex flex-wrap gap-1.5 mb-3">
              <button onclick="fillContactMessage('Hi, is this still available for local pickup in ${owner.city}?')" 
                class="text-[10px] bg-white text-slate-700 border border-slate-200 hover:border-emerald-500 rounded-full px-2.5 py-1 transition">
                "Is this still available?"
              </button>
              <button onclick="fillContactMessage('Hi! Can we meet tomorrow to test and inspect the item?')" 
                class="text-[10px] bg-white text-slate-700 border border-slate-200 hover:border-emerald-500 rounded-full px-2.5 py-1 transition">
                "Can we meet to inspect?"
              </button>
              <button onclick="fillContactMessage('Would you consider ₹${product ? Math.round(product.sellingPrice * 0.9) : 'discount'} for quick local cash pickup?')" 
                class="text-[10px] bg-white text-slate-700 border border-slate-200 hover:border-emerald-500 rounded-full px-2.5 py-1 transition">
                "Best offer for pickup?"
              </button>
            </div>

            <textarea id="contact-inquiry-text" rows="3" 
              placeholder="Write your question or request to the first owner..."
              class="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none mb-2">Hi ${owner.name.split(' ')[0]}, I am interested in ${product ? product.name : 'your listed item'}. Is it still available for direct inspection in ${owner.city}?</textarea>
            
            <button onclick="handleSendInquiry('${owner.name}')" 
              class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition">
              <i class="fa-solid fa-paper-plane text-[11px]"></i>
              <span>Send Message</span>
            </button>
          </div>

          <!-- Option 2: Phone Call Reveal -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <p class="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <i class="fa-solid fa-phone text-blue-600"></i>
                Call Direct First Owner
              </p>
              <p class="text-[11px] text-slate-500" id="phone-display-text">${owner.phone.substring(0, 8)}•••••</p>
            </div>
            <button id="reveal-phone-btn" onclick="revealOwnerPhone('${owner.phone}')"
              class="py-1.5 px-3 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition">
              Reveal Number
            </button>
          </div>

          <!-- Option 3: WhatsApp Inquiry Button -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <p class="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <i class="fa-brands fa-whatsapp text-emerald-600 text-sm"></i>
                WhatsApp Chat
              </p>
              <p class="text-[11px] text-slate-500">Fast replies via WhatsApp</p>
            </div>
            <button onclick="handleWhatsAppClick('${owner.name}', '${product ? product.name : 'the item'}', '${owner.phone}')"
              class="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition">
              <span>Open WhatsApp</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </button>
          </div>

          <!-- Safe Meetup Reminder -->
          <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
            <i class="fa-solid fa-shield-halved text-amber-600 mt-0.5"></i>
            <div>
              <span class="font-bold">ReUse Safe Trading Tip:</span> Always meet the first owner in a public place (e.g. coffee shop, metro station or tech park lobby), inspect and test the item thoroughly, then pay directly.
            </div>
          </div>

        </div>

      </div>
    </div>
  `;
}

function fillContactMessage(text) {
  const input = document.getElementById('contact-inquiry-text');
  if (input) {
    input.value = text;
    input.focus();
  }
}

function handleSendInquiry(ownerName) {
  const text = document.getElementById('contact-inquiry-text')?.value || '';
  if (!text.trim()) {
    showToast('Please type a message', 'Write a brief message to the owner.', 'warning');
    return;
  }
  
  showToast('Message Sent to ' + ownerName, 'The first owner has been notified and usually responds within 1 hour.', 'success');
  state.closeModal();
}

function revealOwnerPhone(fullPhone) {
  const display = document.getElementById('phone-display-text');
  const btn = document.getElementById('reveal-phone-btn');
  if (display && btn) {
    display.innerHTML = `<a href="tel:${fullPhone}" class="text-emerald-700 font-bold hover:underline">${fullPhone}</a>`;
    btn.innerText = 'Call Now';
    btn.onclick = () => window.open('tel:' + fullPhone);
    showToast('Phone Number Revealed', 'Demo contact number: ' + fullPhone, 'info');
  }
}

function handleWhatsAppClick(ownerName, itemName, phone) {
  const msg = encodeURIComponent(`Hi ${ownerName}, I found your listing for "${itemName}" on ReUse Market. Is it available for inspection?`);
  window.open(`https://api.whatsapp.com/send?phone=${phone.replace(/[^0-9]/g, '')}&text=${msg}`, '_blank');
  showToast('WhatsApp Opened', 'Connected to demo WhatsApp inquiry format.', 'success');
}

/**
 * Wishlist Drawer Component
 */
function renderWishlistDrawer() {
  const items = state.getWishlistProducts();

  return `
    <div class="fixed inset-0 z-50 flex justify-end bg-navy-950/70 backdrop-blur-sm animate-fade-in" onclick="state.closeModal()">
      <div class="bg-white w-full max-w-md h-full shadow-2xl flex flex-col p-6 animate-slide-left" onclick="event.stopPropagation()">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
              <i class="fa-solid fa-heart text-sm"></i>
            </div>
            <div>
              <h3 class="font-extrabold text-slate-900 text-base">Your Saved Wishlist</h3>
              <p class="text-xs text-slate-500">${items.length} pre-owned item${items.length === 1 ? '' : 's'}</p>
            </div>
          </div>
          <button onclick="state.closeModal()" class="text-slate-400 hover:text-slate-600 transition">
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <!-- Wishlist List -->
        <div class="flex-1 overflow-y-auto py-4 space-y-3">
          ${items.length === 0 ? `
            <div class="text-center py-16 text-slate-400">
              <div class="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center mb-4 text-2xl text-slate-300">
                <i class="fa-regular fa-heart"></i>
              </div>
              <h4 class="font-bold text-slate-700 text-sm">Your wishlist is empty</h4>
              <p class="text-xs text-slate-400 max-w-xs mx-auto mt-1 mb-6">Tap the heart on any second-hand product card to track it here.</p>
              <button onclick="state.closeModal(); state.navigate('products')" class="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow transition">
                Browse Products
              </button>
            </div>
          ` : items.map(product => {
            const owner = getOwnerById(product.ownerId);
            return `
              <div class="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 hover:border-emerald-200 bg-slate-50/50 transition">
                <img src="${product.images[0]}" class="w-16 h-16 rounded-xl object-cover">
                <div class="flex-1 min-w-0">
                  <h4 class="font-bold text-xs text-slate-900 truncate hover:text-emerald-600 cursor-pointer"
                    onclick="state.closeModal(); state.navigate('product-detail', '${product.id}')">
                    ${product.name}
                  </h4>
                  <div class="flex items-baseline gap-2 mt-0.5">
                    <span class="text-sm font-black text-emerald-600">${formatCurrency(product.sellingPrice)}</span>
                    <span class="text-[10px] text-slate-400 line-through">${formatCurrency(product.originalPrice)}</span>
                  </div>
                  <div class="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                    <span>${product.condition}</span>
                    <span>•</span>
                    <span class="truncate"><i class="fa-solid fa-location-dot text-orange-500 mr-0.5"></i>${product.city}</span>
                  </div>
                </div>
                <div class="flex flex-col gap-1.5">
                  <button onclick="state.closeModal(); state.navigate('product-detail', '${product.id}')"
                    class="p-2 rounded-lg bg-navy-900 text-white hover:bg-navy-800 text-xs transition" title="View Details">
                    <i class="fa-solid fa-arrow-right"></i>
                  </button>
                  <button onclick="state.toggleWishlist('${product.id}')"
                    class="p-2 rounded-lg bg-white border border-slate-200 text-red-500 hover:bg-red-50 text-xs transition" title="Remove">
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Footer -->
        ${items.length > 0 ? `
          <div class="pt-4 border-t border-slate-100 space-y-2">
            <button onclick="state.closeModal(); state.navigate('products')"
              class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition">
              Explore More Pre-Owned Products
            </button>
          </div>
        ` : ''}

      </div>
    </div>
  `;
}

/**
 * Footer Component
 */
function renderFooter() {
  return `
    <footer class="bg-navy-950 text-slate-400 border-t border-navy-800 pt-16 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800">
          
          <!-- Column 1: Brand Info -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <i class="fa-solid fa-recycle text-lg"></i>
              </div>
              <div>
                <span class="text-2xl font-black text-white">ReUse</span>
                <span class="text-2xl font-light text-emerald-400">Market</span>
                <p class="text-[11px] text-slate-400 font-medium">Give Products a Second Life.</p>
              </div>
            </div>

            <p class="text-xs text-slate-300 leading-relaxed max-w-sm">
              India's transparent peer-to-peer second-hand marketplace. Connect directly with original first owners, inspect quality in-person, save up to 70%, and keep reusable products out of landfills.
            </p>

            <!-- Social Links -->
            <div class="flex items-center gap-2 pt-2">
              <a href="https://twitter.com" target="_blank" class="w-9 h-9 rounded-xl bg-navy-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition border border-navy-800">
                <i class="fa-brands fa-x-twitter text-sm"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" class="w-9 h-9 rounded-xl bg-navy-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition border border-navy-800">
                <i class="fa-brands fa-linkedin-in text-sm"></i>
              </a>
              <a href="https://instagram.com" target="_blank" class="w-9 h-9 rounded-xl bg-navy-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition border border-navy-800">
                <i class="fa-brands fa-instagram text-sm"></i>
              </a>
              <a href="https://github.com" target="_blank" class="w-9 h-9 rounded-xl bg-navy-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition border border-navy-800">
                <i class="fa-brands fa-github text-sm"></i>
              </a>
            </div>
          </div>

          <!-- Column 2: Quick Navigation -->
          <div>
            <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Marketplace</h4>
            <ul class="space-y-2.5 text-xs">
              <li><a href="#home" onclick="state.navigate('home'); return false;" class="hover:text-emerald-400 transition">Home Page</a></li>
              <li><a href="#products" onclick="state.navigate('products'); return false;" class="hover:text-emerald-400 transition">Browse Products</a></li>
              <li><a href="#first-owners" onclick="state.navigate('first-owners'); return false;" class="hover:text-emerald-400 transition">First Owner Directory</a></li>
              <li><a href="#sell" onclick="state.navigate('sell'); return false;" class="hover:text-emerald-400 transition">Sell Your Product</a></li>
              <li><a href="#map" onclick="state.navigate('map'); return false;" class="hover:text-emerald-400 transition">Interactive City Map</a></li>
              <li><a href="#about" onclick="state.navigate('about'); return false;" class="hover:text-emerald-400 transition">About Our Mission</a></li>
              <li><a href="#contact" onclick="state.navigate('contact'); return false;" class="hover:text-emerald-400 transition">Help & FAQs</a></li>
            </ul>
          </div>

          <!-- Column 3: Popular Categories -->
          <div>
            <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Top Categories</h4>
            <ul class="space-y-2.5 text-xs">
              <li><a href="#products" onclick="state.setFilters({ category: 'mobiles-electronics' }); state.navigate('products'); return false;" class="hover:text-emerald-400 transition">Mobiles & Electronics</a></li>
              <li><a href="#products" onclick="state.setFilters({ category: 'laptops-computers' }); state.navigate('products'); return false;" class="hover:text-emerald-400 transition">Laptops & Computers</a></li>
              <li><a href="#products" onclick="state.setFilters({ category: 'furniture' }); state.navigate('products'); return false;" class="hover:text-emerald-400 transition">Furniture & Decor</a></li>
              <li><a href="#products" onclick="state.setFilters({ category: 'home-appliances' }); state.navigate('products'); return false;" class="hover:text-emerald-400 transition">Home Appliances</a></li>
              <li><a href="#products" onclick="state.setFilters({ category: 'vehicles' }); state.navigate('products'); return false;" class="hover:text-emerald-400 transition">Bikes & Vehicles</a></li>
              <li><a href="#products" onclick="state.setFilters({ category: 'gaming-accessories' }); state.navigate('products'); return false;" class="hover:text-emerald-400 transition">Gaming Accessories</a></li>
            </ul>
          </div>

          <!-- Column 4: Supported Hub Cities -->
          <div>
            <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Hub Cities</h4>
            <ul class="space-y-2.5 text-xs">
              ${CITIES.map(c => `
                <li>
                  <a href="#products" onclick="state.setFilters({ city: '${c.name}' }); state.navigate('products'); return false;" 
                    class="hover:text-emerald-400 transition flex items-center justify-between">
                    <span>${c.name}</span>
                    <span class="text-[10px] text-slate-400">${c.state}</span>
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>

        </div>

        <!-- Prominent Demo Data Disclaimer Box -->
        <div class="mt-8 p-4 rounded-2xl bg-navy-900/90 border border-navy-700/80 text-xs text-slate-300">
          <div class="flex items-start gap-3">
            <i class="fa-solid fa-circle-info text-emerald-400 text-base mt-0.5"></i>
            <div>
              <p class="font-bold text-white mb-0.5">Academic Project & Demonstration Notice</p>
              <p class="text-slate-300 text-[11px] leading-relaxed">
                <strong>ReUse Market</strong> is a fully-featured prototype project designed to demonstrate a modern, sustainable second-hand marketplace. 
                All seller profiles, product listings, phone numbers (+91 98xxx xxxxx), email addresses, and geographical coordinates are 
                <strong>realistic sample demo data</strong> created for showcase purposes.
              </p>
            </div>
          </div>
        </div>

        <!-- Copyright & Credits -->
        <div class="mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 ReUse Market. All rights reserved. "Give Products a Second Life."</p>
          <div class="flex items-center gap-6">
            <span class="text-emerald-400 font-semibold"><i class="fa-solid fa-leaf mr-1"></i>Eco-friendly circular economy</span>
            <a href="#about" onclick="state.navigate('about'); return false;" class="hover:text-white transition">Privacy Policy</a>
            <a href="#contact" onclick="state.navigate('contact'); return false;" class="hover:text-white transition">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  `;
}

