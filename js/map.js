/**
 * ReUse Market — Dummy Tamil Nadu Map (Offline SVG)
 * "Give Products a Second Life."
 *
 * Renders a self-contained SVG map of Tamil Nadu with product location pins.
 * Works 100% offline — no tile server or internet required.
 */

/* ─────────────────────────────────────────────────────────
   CITY PIN POSITIONS on the 520 × 680 SVG viewport
   (tuned to match the TN path below)
───────────────────────────────────────────────────────── */
const CITY_PIN_COORDS = {
  'Chennai':      { x: 466, y: 155, anchor: 'left'  },
  'Tambaram':     { x: 448, y: 196, anchor: 'left'  },
  'Chengalpattu': { x: 432, y: 222, anchor: 'left'  },
  'Madurai':      { x: 248, y: 412, anchor: 'right' },
  'Coimbatore':   { x:  78, y: 282, anchor: 'right' },
};

/* ─────────────────────────────────────────────────────────
   PRICE BUBBLE DEFINITIONS
   (one eye-catching product per city)
───────────────────────────────────────────────────────── */
const CITY_BUBBLES = [
  { city: 'Chennai',      label: 'iPhone 14 Pro',      price: '₹58,900',  cond: 'Like New', color: '#059669', cx: 466, cy: 155 },
  { city: 'Tambaram',     label: 'Lenovo Legion 5 Pro', price: '₹64,999', cond: 'Good',     color: '#2563eb', cx: 448, cy: 196 },
  { city: 'Chengalpattu', label: 'LG Refrigerator',    price: '₹18,200',  cond: 'Good',     color: '#2563eb', cx: 432, cy: 222 },
  { city: 'Madurai',      label: 'UPSC Book Set',       price: '₹4,200',   cond: 'Good',     color: '#2563eb', cx: 248, cy: 412 },
  { city: 'Coimbatore',   label: 'Bosch Washer',        price: '₹15,900',  cond: 'Good',     color: '#2563eb', cx:  78, cy: 282 },
];

/* ─────────────────────────────────────────────────────────
   EXTRA LOCATION BADGES (small floating tags)
───────────────────────────────────────────────────────── */
const EXTRA_BADGES = [
  { label: 'Royal Enfield',   price: '₹1,48,000', cx: 455, cy: 175, color: '#d97706' },
  { label: 'Honda Activa',    price: '₹53,500',   cx: 438, cy: 210, color: '#7c3aed' },
  { label: 'Harry Potter Set',price: '₹3,600',    cx:  65, cy: 302, color: '#059669' },
  { label: 'L-Shape Sofa',    price: '₹14,500',   cx: 235, cy: 435, color: '#d97706' },
  { label: 'Woodland Boots',  price: '₹2,400',    cx: 418, cy: 242, color: '#7c3aed' },
];

/* ─────────────────────────────────────────────────────────
   MAIN RENDER FUNCTION — call for any map container
───────────────────────────────────────────────────────── */
function renderTNDummyMap(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const {
    height     = '100%',
    showLegend = true,
    title      = 'Tamil Nadu — Pre-Owned Product Locations',
    subtitle   = 'Tap any pin to explore nearby listings'
  } = options;

  /* ── Tamil Nadu state boundary path (SVG 520×680 viewport) ── */
  const tnPath = `
    M 385,52
    C 400,54 428,68 455,92
    L 472,122 480,158 488,200
    L 486,245 478,288
    L 468,330 455,370
    L 438,408 415,442
    L 385,468 352,492
    L 318,516 284,540
    L 252,564 224,590
    L 208,614 196,624
    L 184,612 162,586
    L 136,558 108,526
    L 82,492 62,458
    L 50,422 46,384
    L 44,344 46,302
    L 48,260 44,218
    L 48,178 62,148
    L 82,128 108,112
    L 140,98  175,86
    L 214,72  256,62
    L 300,56  342,52 Z
  `;

  /* ── Sea / decorative wave lines ── */
  const waveLines = [485, 498, 509].map(x =>
    `<line x1="${x}" y1="80" x2="${x}" y2="560" stroke="#a8c8e8" stroke-width="1" stroke-dasharray="6,8" opacity="0.5"/>`
  ).join('');

  /* ── City pin SVGs ── */
  const cityPins = Object.entries(CITY_PIN_COORDS).map(([city, pos]) => {
    const labelX = pos.anchor === 'left' ? pos.x + 14 : pos.x - 14;
    const textAnchor = pos.anchor === 'left' ? 'start' : 'end';
    return `
      <g class="city-pin" onclick="handleMapCityClick('${city}')" style="cursor:pointer">
        <!-- Pulse ring -->
        <circle cx="${pos.x}" cy="${pos.y}" r="12" fill="#059669" opacity="0.18">
          <animate attributeName="r" values="10;16;10" dur="2.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.22;0.04;0.22" dur="2.5s" repeatCount="indefinite"/>
        </circle>
        <!-- Pin body -->
        <circle cx="${pos.x}" cy="${pos.y}" r="7" fill="#059669" stroke="white" stroke-width="2" filter="url(#pinShadow)"/>
        <!-- Pin dot -->
        <circle cx="${pos.x}" cy="${pos.y}" r="2.5" fill="white"/>
        <!-- City label -->
        <text x="${labelX}" y="${pos.y + 4}" font-family="Plus Jakarta Sans, sans-serif"
          font-size="9.5" font-weight="700" fill="#0f172a" text-anchor="${textAnchor}"
          paint-order="stroke" stroke="white" stroke-width="3">${city}</text>
      </g>
    `;
  }).join('');

  /* ── Product price bubbles (primary, one per city) ── */
  const bubbles = CITY_BUBBLES.map((b, i) => {
    const bx = b.cx + (b.city === 'Coimbatore' || b.city === 'Madurai' ? -92 : 18);
    const by = b.cy - 28 - (i % 2) * 8;
    const w  = 98;
    const h  = 38;
    return `
      <g onclick="handleMapBubbleClick('${b.city}')" style="cursor:pointer" opacity="0.96">
        <!-- Bubble rectangle -->
        <rect x="${bx}" y="${by}" width="${w}" height="${h}" rx="8" ry="8"
          fill="${b.color}" filter="url(#pinShadow)"/>
        <!-- Connector dot -->
        <line x1="${b.cx}" y1="${b.cy}" x2="${bx + (b.city === 'Coimbatore' || b.city === 'Madurai' ? w : 0)}" y2="${by + h/2}"
          stroke="${b.color}" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.7"/>
        <!-- Price text -->
        <text x="${bx + w/2}" y="${by + 13}" text-anchor="middle"
          font-family="Plus Jakarta Sans, sans-serif" font-size="9" font-weight="800" fill="white">${b.price}</text>
        <!-- Product label text -->
        <text x="${bx + w/2}" y="${by + 26}" text-anchor="middle"
          font-family="Plus Jakarta Sans, sans-serif" font-size="7.5" font-weight="500" fill="rgba(255,255,255,0.88)">${b.label.length > 15 ? b.label.slice(0,14)+'…' : b.label}</text>
        <!-- Condition pill -->
        <rect x="${bx + w/2 - 20}" y="${by + 30}" width="40" height="9" rx="4" fill="rgba(0,0,0,0.2)"/>
        <text x="${bx + w/2}" y="${by + 37.5}" text-anchor="middle"
          font-family="Plus Jakarta Sans, sans-serif" font-size="6" font-weight="700" fill="white">${b.cond}</text>
      </g>
    `;
  }).join('');

  /* ── Extra small badge tags ── */
  const extraBadges = EXTRA_BADGES.map(b => {
    const bx = b.cx + 8;
    const by = b.cy - 14;
    const w  = 72;
    return `
      <g opacity="0.88" style="cursor:pointer">
        <rect x="${bx}" y="${by}" width="${w}" height="18" rx="5" fill="${b.color}" filter="url(#pinShadow)"/>
        <text x="${bx + w/2}" y="${by + 7}" text-anchor="middle"
          font-family="Plus Jakarta Sans, sans-serif" font-size="6.5" font-weight="700" fill="white">
          ${b.price}
        </text>
        <text x="${bx + w/2}" y="${by + 15}" text-anchor="middle"
          font-family="Plus Jakarta Sans, sans-serif" font-size="5.5" font-weight="500" fill="rgba(255,255,255,0.85)">
          ${b.label.length > 14 ? b.label.slice(0,13)+'…' : b.label}
        </text>
      </g>
    `;
  }).join('');

  /* ── Assemble the full SVG ── */
  const svgContent = `
    <svg viewBox="0 0 520 680" xmlns="http://www.w3.org/2000/svg" width="100%" height="${height}"
      style="display:block; font-family:'Plus Jakarta Sans',sans-serif; background:#1e3a5f;">

      <defs>
        <!-- Sea gradient background -->
        <linearGradient id="seaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1e3a5f"/>
          <stop offset="100%" stop-color="#2c5282"/>
        </linearGradient>
        <!-- Land gradient (TN) -->
        <linearGradient id="landGrad" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%"   stop-color="#d1fae5"/>
          <stop offset="50%"  stop-color="#a7f3d0"/>
          <stop offset="100%" stop-color="#6ee7b7"/>
        </linearGradient>
        <!-- Pin drop shadow filter -->
        <filter id="pinShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.35)"/>
        </filter>
        <!-- Glow filter for TN border -->
        <filter id="borderGlow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <!-- ── Sea background ── -->
      <rect width="520" height="680" fill="url(#seaGrad)"/>

      <!-- ── Decorative wave / longitude lines ── -->
      ${waveLines}

      <!-- ── "Bay of Bengal" label on sea ── -->
      <text x="500" y="320" font-size="9" font-weight="600" fill="rgba(168,200,232,0.6)"
        text-anchor="middle" transform="rotate(90,500,320)" letter-spacing="2">BAY OF BENGAL</text>

      <!-- ── "Arabian Sea" label (left side) ── -->
      <text x="22" y="400" font-size="7.5" font-weight="500" fill="rgba(168,200,232,0.45)"
        text-anchor="middle" transform="rotate(-90,22,400)" letter-spacing="1.5">ARABIAN SEA</text>

      <!-- ── Kanyakumari tip label ── -->
      <text x="196" y="646" font-size="7" font-weight="600" fill="rgba(168,200,232,0.55)"
        text-anchor="middle">Kanyakumari</text>

      <!-- ── Western Ghats subtle mountains ── -->
      <text x="42" y="230" font-size="7" font-weight="500" fill="rgba(120,180,140,0.5)"
        text-anchor="middle" transform="rotate(-90,42,230)" letter-spacing="1">WESTERN GHATS</text>

      <!-- ── Tamil Nadu State Fill ── -->
      <path d="${tnPath}" fill="url(#landGrad)" stroke="#34d399" stroke-width="1.8"
        filter="url(#borderGlow)" opacity="0.97"/>

      <!-- ── State name label ── -->
      <text x="220" y="315" font-size="13" font-weight="900" fill="#065f46"
        text-anchor="middle" opacity="0.45" letter-spacing="2">TAMIL NADU</text>
      <text x="220" y="330" font-size="8" font-weight="600" fill="#047857"
        text-anchor="middle" opacity="0.4" letter-spacing="1">INDIA</text>

      <!-- ── Interior district boundary hints (subtle) ── -->
      <line x1="248" y1="340" x2="248" y2="420" stroke="#86efac" stroke-width="0.5" stroke-dasharray="4,6" opacity="0.4"/>
      <line x1="160" y1="200" x2="350" y2="200" stroke="#86efac" stroke-width="0.5" stroke-dasharray="4,6" opacity="0.3"/>
      <line x1="140" y1="300" x2="440" y2="300" stroke="#86efac" stroke-width="0.5" stroke-dasharray="4,6" opacity="0.3"/>
      <line x1="160" y1="400" x2="400" y2="400" stroke="#86efac" stroke-width="0.5" stroke-dasharray="4,6" opacity="0.3"/>

      <!-- ── Extra price badge tags ── -->
      ${extraBadges}

      <!-- ── Primary price bubbles ── -->
      ${bubbles}

      <!-- ── City pin markers (on top) ── -->
      ${cityPins}

      <!-- ── Total listings count badge ── -->
      <rect x="6" y="6" width="110" height="30" rx="8" fill="rgba(5,150,105,0.92)" filter="url(#pinShadow)"/>
      <text x="61" y="17.5" text-anchor="middle" font-size="8" font-weight="700" fill="rgba(255,255,255,0.8)">REUSE MARKET</text>
      <text x="61" y="29" text-anchor="middle" font-size="9" font-weight="800" fill="white">${state.products.length} Products Listed</text>

      <!-- ── Demo notice badge (bottom) ── -->
      <rect x="130" y="652" width="260" height="20" rx="6" fill="rgba(0,0,0,0.45)"/>
      <text x="260" y="665.5" text-anchor="middle" font-size="7.5" font-weight="600" fill="rgba(255,255,255,0.7)">
        ⚠ Demo data — Approximate pickup zones shown
      </text>

    </svg>
  `;

  container.innerHTML = svgContent;
}

/* ─────────────────────────────────────────────────────────
   PRODUCT DETAIL PAGE — City-level dummy map
   Shows a zoomed-in city view with a single location pin
───────────────────────────────────────────────────────── */
function renderProductDetailMap(containerId, product) {
  const container = document.getElementById(containerId);
  if (!container || !product) return;

  const city    = product.city || 'Chennai';
  const area    = product.area || city;
  const pin     = CITY_PIN_COORDS[city] || { x: 260, y: 280 };

  /* Scale / zoom: pick a sub-rectangle of the TN SVG centred on the city pin */
  const cx = pin.x, cy = pin.y;
  const zoomW = 180, zoomH = 200;
  const vbX = Math.max(0, cx - zoomW / 2);
  const vbY = Math.max(0, cy - zoomH / 2);
  const tnPath = `
    M 385,52 C 400,54 428,68 455,92
    L 472,122 480,158 488,200
    L 486,245 478,288
    L 468,330 455,370
    L 438,408 415,442
    L 385,468 352,492
    L 318,516 284,540
    L 252,564 224,590
    L 208,614 196,624
    L 184,612 162,586
    L 136,558 108,526
    L 82,492 62,458
    L 50,422 46,384
    L 44,344 46,302
    L 48,260 44,218
    L 48,178 62,148
    L 82,128 108,112
    L 140,98  175,86
    L 214,72  256,62
    L 300,56  342,52 Z
  `;

  container.innerHTML = `
    <svg viewBox="${vbX} ${vbY} ${zoomW} ${zoomH}" xmlns="http://www.w3.org/2000/svg"
      width="100%" height="100%" style="display:block; background:#1e3a5f; border-radius:inherit;">
      <defs>
        <linearGradient id="seaGrad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1e3a5f"/>
          <stop offset="100%" stop-color="#2c5282"/>
        </linearGradient>
        <linearGradient id="landGrad2" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%"   stop-color="#d1fae5"/>
          <stop offset="100%" stop-color="#6ee7b7"/>
        </linearGradient>
        <filter id="ps2" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="rgba(0,0,0,0.4)"/>
        </filter>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <!-- Sea -->
      <rect x="${vbX}" y="${vbY}" width="${zoomW}" height="${zoomH}" fill="url(#seaGrad2)"/>

      <!-- TN land -->
      <path d="${tnPath}" fill="url(#landGrad2)" stroke="#34d399" stroke-width="1.5" filter="url(#glow2)"/>

      <!-- Neighbourhood radius circle -->
      <circle cx="${cx}" cy="${cy}" r="22" fill="#10b981" opacity="0.15"/>
      <circle cx="${cx}" cy="${cy}" r="22" fill="none" stroke="#10b981" stroke-width="1.2" stroke-dasharray="4,4" opacity="0.6"/>

      <!-- Location pin -->
      <circle cx="${cx}" cy="${cy}" r="14" fill="#059669" opacity="0.2">
        <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.25;0.05;0.25" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="${cx}" cy="${cy}" r="8" fill="#059669" stroke="white" stroke-width="2.5" filter="url(#ps2)"/>
      <circle cx="${cx}" cy="${cy}" r="3" fill="white"/>

      <!-- Popup card -->
      <rect x="${cx - 52}" y="${cy - 58}" width="104" height="46" rx="8" fill="white" filter="url(#ps2)"/>
      <text x="${cx}" y="${cy - 42}" text-anchor="middle" font-family="Plus Jakarta Sans,sans-serif"
        font-size="7.5" font-weight="800" fill="#0f172a">${area.length > 22 ? area.slice(0,21)+'…' : area}</text>
      <text x="${cx}" y="${cy - 30}" text-anchor="middle" font-family="Plus Jakarta Sans,sans-serif"
        font-size="7" font-weight="600" fill="#059669">
        <tspan>₹${product.sellingPrice.toLocaleString('en-IN')}</tspan>
      </text>
      <rect x="${cx - 32}" y="${cy - 25}" width="64" height="12" rx="4" fill="#ecfdf5"/>
      <text x="${cx}" y="${cy - 16}" text-anchor="middle" font-family="Plus Jakarta Sans,sans-serif"
        font-size="6.5" font-weight="700" fill="#065f46">📍 Direct First-Owner Pickup</text>

      <!-- City name label -->
      <text x="${cx}" y="${cy + 26}" text-anchor="middle" font-family="Plus Jakarta Sans,sans-serif"
        font-size="8" font-weight="700" fill="#0f172a"
        paint-order="stroke" stroke="white" stroke-width="3">${city}</text>

      <!-- Demo notice -->
      <rect x="${vbX + 2}" y="${vbY + zoomH - 14}" width="${zoomW - 4}" height="12" rx="4" fill="rgba(0,0,0,0.4)"/>
      <text x="${vbX + zoomW / 2}" y="${vbY + zoomH - 5}" text-anchor="middle"
        font-family="Plus Jakarta Sans,sans-serif" font-size="5.5" font-weight="500"
        fill="rgba(255,255,255,0.65)">Demo: approximate neighbourhood zone</text>
    </svg>
  `;
}

/* ─────────────────────────────────────────────────────────
   CLICK HANDLERS
───────────────────────────────────────────────────────── */
function handleMapCityClick(city) {
  state.setFilters({ city });
  state.navigate('products');
  showToast('Filtered: ' + city, 'Showing all products listed in ' + city, 'info');
}

function handleMapBubbleClick(city) {
  state.setFilters({ city });
  state.navigate('products');
}

/* ─────────────────────────────────────────────────────────
   PUBLIC API — used by app.js
───────────────────────────────────────────────────────── */

/** Called for the home page map preview & fullscreen map page */
function initMarketplaceMap(containerId, filterCity = 'all') {
  renderTNDummyMap(containerId, {
    height: '100%',
    showLegend: true
  });
}

/** Called for the product detail mini-map */
function initProductDetailMap(containerId, coordinates, city, area, productName) {
  const product = state.products.find(p => p.city === city && p.area && p.area.includes(area.split(',')[0])) ||
                  state.products.find(p => p.city === city) ||
                  { city, area, sellingPrice: 0, name: productName };
  renderProductDetailMap(containerId, product);
}
