/**
 * ReUse Market - Realistic Mock Data
 * "Give Products a Second Life."
 * 
 * Note: All seller information, contact details, coordinates, and prices are sample demo data.
 */

const CATEGORIES = [
  {
    id: 'mobiles-electronics',
    name: 'Mobiles & Electronics',
    icon: 'fa-solid fa-mobile-screen-button',
    description: 'Smartphones, audio, smartwatches & accessories',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'laptops-computers',
    name: 'Laptops & Computers',
    icon: 'fa-solid fa-laptop',
    description: 'MacBooks, gaming laptops, monitors & PC builds',
    badge: 'High Demand',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'furniture',
    name: 'Furniture',
    icon: 'fa-solid fa-couch',
    description: 'Ergonomic chairs, wooden tables, sofas & storage',
    badge: 'Eco Pick',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'home-appliances',
    name: 'Home Appliances',
    icon: 'fa-solid fa-blender',
    description: 'Refrigerators, washing machines, microwaves & vacuums',
    badge: 'Great Deals',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: 'fa-solid fa-motorcycle',
    description: 'Motorbikes, scooters, geared bicycles & EV bikes',
    badge: 'Verified',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'books-education',
    name: 'Books & Education',
    icon: 'fa-solid fa-book-open-reader',
    description: 'UPSC/GATE materials, engineering books & novels',
    badge: 'Zero Waste',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'fashion-accessories',
    name: 'Fashion & Accessories',
    icon: 'fa-solid fa-shirt',
    description: 'Watches, leather bags, sunglasses & premium jackets',
    badge: 'Vintage',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'sports-equipment',
    name: 'Sports Equipment',
    icon: 'fa-solid fa-dumbbell',
    description: 'Home gyms, badminton rackets, bicycles & sports gear',
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'gaming-accessories',
    name: 'Gaming Accessories',
    icon: 'fa-solid fa-gamepad',
    description: 'Consoles, controllers, VR headsets & racing wheels',
    badge: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80'
  }
];

const CITIES = [
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, areas: ['T. Nagar', 'Adyar', 'Velachery', 'Anna Nagar', 'OMR'] },
  { id: 'chengalpattu', name: 'Chengalpattu', state: 'Tamil Nadu', lat: 12.6939, lng: 79.9757, areas: ['GST Road', 'New Town', 'Mahindra World City', 'Venbakkam'] },
  { id: 'tambaram', name: 'Tambaram', state: 'Tamil Nadu', lat: 12.9249, lng: 80.1000, areas: ['East Tambaram', 'West Tambaram', 'Sanatorium', 'Camp Road'] },
  { id: 'coimbatore', name: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lng: 76.9558, areas: ['RS Puram', 'Gandhipuram', 'Peelamedu', 'Saibaba Colony'] },
  { id: 'madurai', name: 'Madurai', state: 'Tamil Nadu', lat: 9.9252, lng: 78.1198, areas: ['KK Nagar', 'Anna Nagar', 'Tallakulam', 'SS Colony'] },
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946, areas: ['Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield', 'Jayanagar'] },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867, areas: ['Hitec City', 'Gachibowli', 'Banjara Hills', 'Jubilee Hills', 'Madhapur'] },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777, areas: ['Bandra West', 'Andheri East', 'Powai', 'Juhu', 'Worli'] }
];

const FIRST_OWNERS = [
  {
    id: 'owner-1',
    name: 'Karthik Subramanian',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    city: 'Chennai',
    area: 'Adyar',
    phone: '+91 98401 23456',
    email: 'karthik.subramanian@demomarket.in',
    memberSince: 'March 2023',
    productsSold: 8,
    rating: 4.9,
    reviewsCount: 23,
    verified: true,
    bio: 'Software engineer & tech enthusiast. I upgrade my personal gadgets every 18 months and keep all original boxes, bills, and accessories with pristine care.'
  },
  {
    id: 'owner-2',
    name: 'Ananya Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    city: 'Bengaluru',
    area: 'Indiranagar',
    phone: '+91 98802 87654',
    email: 'ananya.deshmukh@demomarket.in',
    memberSince: 'June 2022',
    productsSold: 14,
    rating: 4.8,
    reviewsCount: 31,
    verified: true,
    bio: 'UX Architect working remotely. Passionate about sustainable minimalism, zero-waste living, and circular economy. Everything I list has been carefully used indoors.'
  },
  {
    id: 'owner-3',
    name: 'Venkatesh Raman',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    city: 'Tambaram',
    area: 'East Tambaram',
    phone: '+91 94441 55678',
    email: 'venkatesh.raman@demomarket.in',
    memberSince: 'January 2023',
    productsSold: 6,
    rating: 4.7,
    reviewsCount: 15,
    verified: true,
    bio: 'Automobile researcher and avid cyclist. I personally service and inspect all my equipment before offering them for re-homing.'
  },
  {
    id: 'owner-4',
    name: 'Dr. Meera Nambiar',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    city: 'Coimbatore',
    area: 'RS Puram',
    phone: '+91 94220 98765',
    email: 'meera.nambiar@demomarket.in',
    memberSince: 'November 2022',
    productsSold: 11,
    rating: 4.95,
    reviewsCount: 29,
    verified: true,
    bio: 'Professor & bibliophile. Relocating to a compact apartment, passing on curated library volumes and well-preserved home appliances to genuine buyers.'
  },
  {
    id: 'owner-5',
    name: 'Rohan Mehra',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    city: 'Mumbai',
    area: 'Bandra West',
    phone: '+91 98200 11223',
    email: 'rohan.mehra@demomarket.in',
    memberSince: 'August 2023',
    productsSold: 9,
    rating: 4.85,
    reviewsCount: 19,
    verified: true,
    bio: 'Creative director & gamer. Only sell authentic electronics and accessories with transparent condition reports and test-on-pickup encouragement.'
  },
  {
    id: 'owner-6',
    name: 'Pooja Reddy',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    city: 'Hyderabad',
    area: 'Gachibowli',
    phone: '+91 99890 33445',
    email: 'pooja.reddy@demomarket.in',
    memberSince: 'May 2023',
    productsSold: 7,
    rating: 4.9,
    reviewsCount: 16,
    verified: true,
    bio: 'FinTech product manager & fitness enthusiast. All items listed were purchased brand-new by me with verifiable original purchase invoices.'
  },
  {
    id: 'owner-7',
    name: 'Senthil Kumar',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    city: 'Madurai',
    area: 'KK Nagar',
    phone: '+91 94432 77889',
    email: 'senthil.kumar@demomarket.in',
    memberSince: 'April 2023',
    productsSold: 5,
    rating: 4.65,
    reviewsCount: 12,
    verified: true,
    bio: 'College faculty and educational counselor. Selling academic materials, study desks, and standard tech gear to assist hardworking students.'
  },
  {
    id: 'owner-8',
    name: 'Divya Sundaram',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    city: 'Chengalpattu',
    area: 'Mahindra World City',
    phone: '+91 97909 44332',
    email: 'divya.sundaram@demomarket.in',
    memberSince: 'September 2023',
    productsSold: 4,
    rating: 4.8,
    reviewsCount: 10,
    verified: true,
    bio: 'Manufacturing engineer. I take pride in selling appliances and household items in immaculate, clean, ready-to-plug-in condition.'
  }
];

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Apple iPhone 14 Pro 128GB - Deep Purple',
    category: 'mobiles-electronics',
    sellingPrice: 58900,
    originalPrice: 129900,
    condition: 'Like New',
    conditionDetails: 'Battery health 91%. Zero scratches on screen or cameras. Applied Spigen tempered glass since Day 1.',
    postedDate: '2 days ago',
    featured: true,
    popularDeal: true,
    views: 412,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Selling my single-handed Apple iPhone 14 Pro 128GB in iconic Deep Purple. Bought directly from Apple Store Chennai. Comes with original braided USB-C to Lightning cable, box, Apple bill, and two complimentary MagSafe cases. Never serviced or opened.',
    specifications: {
      'Brand': 'Apple',
      'Model': 'iPhone 14 Pro (A2890)',
      'Storage': '128 GB',
      'Color': 'Deep Purple',
      'Battery Health': '91%',
      'Age of Device': '14 months',
      'Invoice / Bill': 'Original Apple GST Invoice Available',
      'Warranty': 'Out of 1-yr standard warranty, 100% functional'
    },
    ownerId: 'owner-1',
    city: 'Chennai',
    area: 'Adyar, Chennai',
    coordinates: { lat: 13.0012, lng: 80.2565 },
    ownershipStory: 'I used this phone primarily for productivity and client calls. Always carried in a silicone case. Upgrading to a corporate-issued handset, so looking for a responsible buyer who will appreciate this flagship camera device.'
  },
  {
    id: 'prod-2',
    name: 'Apple MacBook Air M2 2023 (16GB RAM / 512GB SSD) - Space Grey',
    category: 'laptops-computers',
    sellingPrice: 78500,
    originalPrice: 139900,
    condition: 'Like New',
    conditionDetails: 'Battery cycle count only 64 cycles. Keyboard and trackpad flawless. Kept in a padded tomtoc sleeve.',
    postedDate: 'Yesterday',
    featured: true,
    popularDeal: true,
    views: 580,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Custom configured 16GB unified memory MacBook Air M2. Incredible 18-hour battery endurance and silent fanless performance. Ideal for developers, UI designers, and creators who need multitasking power.',
    specifications: {
      'Processor': 'Apple M2 Chip (8-Core CPU / 10-Core GPU)',
      'Memory': '16 GB Unified RAM',
      'Storage': '512 GB High-Speed NVMe SSD',
      'Display': '13.6-inch Liquid Retina with True Tone',
      'Battery Cycles': '64 Cycles (98% capacity)',
      'Charger': 'Original 35W Dual USB-C Compact Power Adapter'
    },
    ownerId: 'owner-2',
    city: 'Bengaluru',
    area: 'Indiranagar, Bengaluru',
    coordinates: { lat: 12.9784, lng: 77.6408 },
    ownershipStory: 'Purchased for freelancing design projects. I was recently issued an employer MacBook Pro M3 Max, hence selling this pristine M2 Air. Test it thoroughly at a local coffee shop in Indiranagar before payment.'
  },
  {
    id: 'prod-3',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones - Silver',
    category: 'mobiles-electronics',
    sellingPrice: 16500,
    originalPrice: 34990,
    condition: 'Like New',
    conditionDetails: 'Used exclusively indoors for Zoom meetings. Cushions are sanitized and in mint condition.',
    postedDate: '3 days ago',
    featured: false,
    popularDeal: true,
    views: 290,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Industry-leading noise cancelling with Auto NC Optimizer and 8 microphones. Crisp hands-free calling and multipoint Bluetooth connection (switches between laptop and phone seamlessly). Includes original hard carrying case and audio cable.',
    specifications: {
      'Brand': 'Sony',
      'Model': 'WH-1000XM5',
      'Battery Life': '30 Hours with ANC On',
      'Microphones': '8 Mics with AI Beamforming',
      'Accessories': 'Collapsible Hard Case, 3.5mm Aux Cable, USB-C Cable'
    },
    ownerId: 'owner-6',
    city: 'Hyderabad',
    area: 'Gachibowli, Hyderabad',
    coordinates: { lat: 17.4401, lng: 78.3489 },
    ownershipStory: 'I bought these for long-haul travel, but rarely travel anymore. Outstanding soundstage and silent background for work. Bill and warranty card included.'
  },
  {
    id: 'prod-4',
    name: 'Ergonomic Herman Miller Aeron Mesh Task Chair (Size B)',
    category: 'furniture',
    sellingPrice: 42000,
    originalPrice: 115000,
    condition: 'Good',
    conditionDetails: 'Pellicle mesh is taut without tears. Forward tilt and PostureFit SL lumbar mechanisms work smoothly.',
    postedDate: '4 days ago',
    featured: true,
    popularDeal: false,
    views: 630,
    images: [
      'https://images.unsplash.com/photo-1580481077195-c3a8a37f714c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'The world standard in ergonomic desk chairs. Classic Mineral / Graphite finish with adjustable vinyl arms and fully loaded kinematic tilt limiter. Relieves lower back pressure for all-day computer sessions.',
    specifications: {
      'Brand': 'Herman Miller',
      'Model': 'Aeron Remastered Size B (Medium)',
      'Support': 'PostureFit SL Dual Lumbar Support',
      'Casters': 'Hard Floor / Carpet Hybrid Casters',
      'Armrests': '3D Fully Adjustable (Height, Depth & Pivot)'
    },
    ownerId: 'owner-2',
    city: 'Bengaluru',
    area: 'Koramangala 4th Block, Bengaluru',
    coordinates: { lat: 12.9352, lng: 77.6245 },
    ownershipStory: 'Purchased for my home studio in 2022. It saved my posture during intense design sprints. Downsizing to a stand-only desk setup. Happy to let you try it out in person.'
  },
  {
    id: 'prod-5',
    name: 'Lenovo Legion 5 Pro Gaming Laptop (Ryzen 7 5800H / RTX 3070 140W)',
    category: 'laptops-computers',
    sellingPrice: 64999,
    originalPrice: 142000,
    condition: 'Good',
    conditionDetails: 'Minor scuff on bottom corner. Screen is 100% clean, no dead pixels. Thermal paste repasted 3 months ago.',
    postedDate: '1 day ago',
    featured: true,
    popularDeal: true,
    views: 480,
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Powerhouse gaming and 3D rendering machine with 16-inch 165Hz QHD (2560x1600) 500 nits IPS screen. Full power 140W TGP NVIDIA RTX 3070 8GB GDDR6 GPU. Runs Cyberpunk and GTA V on Ultra with 90+ FPS.',
    specifications: {
      'Processor': 'AMD Ryzen 7 5800H (8 Cores / 16 Threads)',
      'GPU': 'NVIDIA GeForce RTX 3070 (8GB VRAM, 140W TGP)',
      'RAM': '32 GB DDR4 3200MHz (Upgraded from 16GB)',
      'Storage': '1 TB Samsung M.2 NVMe SSD',
      'Display': '16.0" WQXGA 165Hz 100% sRGB HDR400',
      'Power Brick': 'Original 300W Lenovo Rapid Charger'
    },
    ownerId: 'owner-3',
    city: 'Tambaram',
    area: 'Sanatorium, Tambaram',
    coordinates: { lat: 12.9412, lng: 80.1190 },
    ownershipStory: 'Built simulation models and played titles on weekends. Upgraded RAM to 32GB for heavy workloads. Comes with the massive original 300W brick.'
  },
  {
    id: 'prod-6',
    name: 'Solid Teak Wood 6-Seater Dining Table with Cushioned Chairs',
    category: 'furniture',
    sellingPrice: 19500,
    originalPrice: 48000,
    condition: 'Good',
    conditionDetails: 'Natural wood grain with slight polish wear on table edge. All 6 joints rock-solid without any wobble.',
    postedDate: '5 days ago',
    featured: false,
    popularDeal: false,
    views: 310,
    images: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Authentic seasoned Nilambur Teak wood dining suite with 6 sturdy matching chairs. Upholstered in stain-resistant beige fabric. Heavy solid construction that will easily last another 20+ years.',
    specifications: {
      'Wood Type': 'Genuine Nilambur Solid Teak Wood',
      'Seating Capacity': '6 Adults',
      'Table Dimensions': '5.5 ft length x 3.2 ft width x 2.6 ft height',
      'Chair Cushioning': 'High-density 40-density foam with washable covers',
      'Assembly': 'Detachable table legs for easy transport'
    },
    ownerId: 'owner-1',
    city: 'Chennai',
    area: 'T. Nagar, Chennai',
    coordinates: { lat: 13.0418, lng: 80.2341 },
    ownershipStory: 'Custom made by our family carpenter in 2021. Selling due to house renovation and switching to a circular dining layout. Buyer arranges pickup or small mini-truck from T. Nagar.'
  },
  {
    id: 'prod-7',
    name: 'Bosch 7kg Front Load Fully Automatic Washing Machine (Serie 4)',
    category: 'home-appliances',
    sellingPrice: 15900,
    originalPrice: 38500,
    condition: 'Good',
    conditionDetails: 'Regularly descaled every 45 days. EcoSilence Drive motor runs whisper quiet. Drum in spotless condition.',
    postedDate: '3 days ago',
    featured: false,
    popularDeal: true,
    views: 365,
    images: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Bosch Serie 4 Inverter Front-Loader with 1200 RPM spin speed, AntiTangle feature, and ActiveWater Plus smart water management. Highly energy and water efficient.',
    specifications: {
      'Brand': 'Bosch Home Appliances',
      'Capacity': '7.0 Kg Capacity',
      'Energy Rating': '5 Star BEE Certified',
      'Spin Speed': '1200 RPM Variable',
      'Dimensions': '848 x 598 x 590 mm',
      'Accessories': 'Original water inlet hose, drain pipe, transit bolts'
    },
    ownerId: 'owner-4',
    city: 'Coimbatore',
    area: 'Gandhipuram, Coimbatore',
    coordinates: { lat: 11.0185, lng: 76.9682 },
    ownershipStory: 'Purchased for a guest house that was only occupied for 6 months. Minimal wash cycles run on this machine. Ready for immediate pickup with all pipes intact.'
  },
  {
    id: 'prod-8',
    name: 'Sony PlayStation 5 Disc Edition + 2 DualSense Controllers & God of War Ragnarok',
    category: 'gaming-accessories',
    sellingPrice: 37500,
    originalPrice: 59990,
    condition: 'Like New',
    conditionDetails: 'Original box, base stand, HDMI 2.1 cable. Controllers have zero joystick drift (tested).',
    postedDate: 'Yesterday',
    featured: true,
    popularDeal: true,
    views: 740,
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'PlayStation 5 Disc Console (CFI-1208A revision) with an extra Cosmic Red DualSense controller and God of War Ragnarök physical game disc. Super quiet cooling fan, lightning-fast 825GB custom SSD.',
    specifications: {
      'Edition': 'PS5 Ultra HD Blu-ray Disc Edition',
      'Storage': '825 GB Custom High-Speed PCIe 4.0 SSD',
      'Resolution Support': 'Up to 4K 120Hz & 8K HDR output',
      'Included Accessories': '2x DualSense Wireless Controllers, Vertical Stand, HDMI 2.1 Cable',
      'Games Included': 'God of War Ragnarok (Physical Disc)'
    },
    ownerId: 'owner-5',
    city: 'Mumbai',
    area: 'Powai, Mumbai',
    coordinates: { lat: 19.1176, lng: 72.9060 },
    ownershipStory: 'I completed Spider-Man 2 and Ragnarok and don’t find enough gaming time with my current job hours. Kept in a well-ventilated media shelf. You are welcome to test games at my home before taking it.'
  },
  {
    id: 'prod-9',
    name: 'Royal Enfield Classic 350 - Stealth Black Dual Channel ABS (2022 Model)',
    category: 'vehicles',
    sellingPrice: 148000,
    originalPrice: 228000,
    condition: 'Good',
    conditionDetails: 'Single owner, 12,400 km driven on city roads. All 3 company services completed on time at authorized Royal Enfield service center.',
    postedDate: '3 days ago',
    featured: true,
    popularDeal: false,
    views: 890,
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80'
    ],
    description: '2022 Royal Enfield Classic 350 J-series engine in handsome Stealth Black matte finish with alloy wheels and tubeless tyres. Features dual-channel ABS, USB charger on handlebar, and touring engine crash guard.',
    specifications: {
      'Registration Year': 'April 2022',
      'Kilometers Driven': '12,400 KM',
      'Engine': '349cc Single Cylinder J-Platform Air-Oil Cooled',
      'Braking': 'Dual Channel ABS with ByBre Discs',
      'Insurance': 'Comprehensive Insurance valid till March 2027',
      'RC & Paperwork': 'Clear TN-07 RC, no hypothecation/loans'
    },
    ownerId: 'owner-1',
    city: 'Chennai',
    area: 'Velachery, Chennai',
    coordinates: { lat: 12.9815, lng: 80.2180 },
    ownershipStory: 'I used this bike primarily for weekend rides along ECR and my tech park commute. Very smooth engine with zero vibration compared to older UCE engines. Clean transfer paperwork guaranteed.'
  },
  {
    id: 'prod-10',
    name: 'Trek Marlin 7 Hardtail Mountain Bicycle (29er / RockShox Suspension)',
    category: 'vehicles',
    sellingPrice: 27500,
    originalPrice: 56900,
    condition: 'Like New',
    conditionDetails: 'Ridden less than 450 km. Tires still have tread molding hair. Shimano Deore 1x10 drivetrain shifts crisply.',
    postedDate: '4 days ago',
    featured: false,
    popularDeal: true,
    views: 340,
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Race-worthy mountain bike built around an Alpha Silver Aluminum frame with internal routing. Features RockShox Judy lockout air suspension fork and Shimano MT200 hydraulic disc brakes.',
    specifications: {
      'Frame Size': 'Medium (M) - Fits 5\'6" to 5\'10" riders',
      'Wheel Size': 'Bontrager Connection 29-inch wheels',
      'Suspension': 'RockShox Judy 100mm travel with lockout',
      'Drivetrain': 'Shimano Deore M4100 1x10 speed',
      'Brakes': 'Shimano MT200 Hydraulic Disc'
    },
    ownerId: 'owner-3',
    city: 'Tambaram',
    area: 'West Tambaram, Tambaram',
    coordinates: { lat: 12.9210, lng: 80.0950 },
    ownershipStory: 'Bought with enthusiastic fitness goals during lockdown, but shifted to swimming. Always stored indoors away from rain and sun. Includes Bontrager water bottle cage and kickstand.'
  },
  {
    id: 'prod-11',
    name: 'Dyson V11 Absolute Cordless Vacuum Cleaner with 7 Attachments',
    category: 'home-appliances',
    sellingPrice: 24500,
    originalPrice: 58900,
    condition: 'Like New',
    conditionDetails: 'Fluffy cleaner head and High Torque cleaner head both in great shape. LCD screen reports battery run time accurately.',
    postedDate: '2 days ago',
    featured: false,
    popularDeal: true,
    views: 420,
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Intelligent cord-free cleaning with Dyson Hyperdymium motor spinning at 125,000 RPM. Dynamic Load Sensor (DLS) auto-adjusts suction between hard floors and carpets. Full filtration captures 99.97% of fine dust.',
    specifications: {
      'Brand': 'Dyson',
      'Model': 'V11 Absolute Pro',
      'Suction Power': '185 AW in Boost Mode',
      'Run Time': 'Up to 60 Minutes Eco Mode',
      'Attachments': 'High Torque head, Soft roller head, Mini motorized tool, Crevice tool, Combination tool'
    },
    ownerId: 'owner-5',
    city: 'Mumbai',
    area: 'Bandra West, Mumbai',
    coordinates: { lat: 19.0596, lng: 72.8295 },
    ownershipStory: 'Moving to an apartment with integrated central suction. Cleaned and washed washable filters regularly. Original dock and charging adapter included.'
  },
  {
    id: 'prod-12',
    name: 'Complete UPSC Civil Services Exam Preparation Set (28 Standard Reference Books)',
    category: 'books-education',
    sellingPrice: 4200,
    originalPrice: 14800,
    condition: 'Good',
    conditionDetails: 'Clean pages, no torn sheets. Light pencil highlights on selective chapters of Laxmikanth and Spectrum.',
    postedDate: '5 days ago',
    featured: false,
    popularDeal: true,
    views: 510,
    images: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Must-have foundational master library for UPSC CSE Prelims & Mains. Includes M. Laxmikanth Indian Polity (7th Ed), Spectrum Modern India, Ramesh Singh Indian Economy, Nitin Singhania Art & Culture, GC Leong Geography, Shankar IAS Environment, and NCERT Class 6-12 compilations.',
    specifications: {
      'Total Volumes': '28 Standard Reference Books + 3 Maps Compilations',
      'Target Exam': 'UPSC CSE / State Public Service Commissions',
      'Editions': 'Latest 2022-2023 Printed Editions',
      'Bonus Materials': 'Includes 2 bound Mains model answer writing registers'
    },
    ownerId: 'owner-7',
    city: 'Madurai',
    area: 'KK Nagar, Madurai',
    coordinates: { lat: 9.9325, lng: 78.1450 },
    ownershipStory: 'Cleared my state civil services examination and I am delighted to pass this complete structured reference set on to an ambitious, dedicated aspirant. All important core subjects covered.'
  },
  {
    id: 'prod-13',
    name: 'Tissot PRX Powermatic 80 Automatic Watch (Blue Sunray Dial)',
    category: 'fashion-accessories',
    sellingPrice: 34500,
    originalPrice: 65000,
    condition: 'Like New',
    conditionDetails: 'Sapphire crystal pristine. Clasp has faint hairline desk swirls, invisible unless inspected under bright spotlight.',
    postedDate: '1 day ago',
    featured: true,
    popularDeal: false,
    views: 390,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Iconic 1978 retro integrated sports watch reimagined with modern Swiss horology. Features a waffle texture deep blue dial, 80-hour power reserve Nivachron hairspring balance, and transparent exhibition caseback.',
    specifications: {
      'Brand': 'Tissot Swiss Watches',
      'Movement': 'Powermatic 80.111 Automatic (80-Hour Power Reserve)',
      'Case Diameter': '40 mm Stainless Steel 316L',
      'Crystal': 'Scratch-Resistant Sapphire with Anti-Reflective Coating',
      'Water Resistance': '100 meters (10 bar)',
      'Box & Papers': 'Full presentation box, manual, international warranty card'
    },
    ownerId: 'owner-5',
    city: 'Mumbai',
    area: 'Andheri East, Mumbai',
    coordinates: { lat: 19.1136, lng: 72.8697 },
    ownershipStory: 'Purchased from Ethos Watch Boutiques in early 2023. Kept in a dual watch winder. Selling to fund a vintage Omega Speedmaster project. 100% authentic Swiss piece.'
  },
  {
    id: 'prod-14',
    name: 'Decathlon Domyos Home Gym Weight Training Set (50kg Cast Iron Plates + Barbell + Dumbbells)',
    category: 'sports-equipment',
    sellingPrice: 6800,
    originalPrice: 14999,
    condition: 'Good',
    conditionDetails: 'Solid cast iron plates with zero rust. Kept indoors on rubber gym flooring.',
    postedDate: '4 days ago',
    featured: false,
    popularDeal: true,
    views: 450,
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Comprehensive 50kg modular home strength kit. Includes 1x 1.55m steel threaded bar, 2x dumbbell threaded bars, 6x spinlock collars, and cast iron plates (4x 5kg, 8x 2.5kg, 4x 1kg, 4x 0.5kg) in an impact-resistant rolling transport case.',
    specifications: {
      'Total Weight': '50 Kilograms Cast Iron',
      'Plate Configuration': '4x 5kg, 8x 2.5kg, 4x 1kg, 4x 0.5kg',
      'Bars Included': '1x Standard Barbell (155cm) + 2x Dumbbell Bars (35cm)',
      'Locking Mechanism': 'Precision Threaded Spinlock Collars'
    },
    ownerId: 'owner-2',
    city: 'Bengaluru',
    area: 'HSR Layout Sector 2, Bengaluru',
    coordinates: { lat: 12.9121, lng: 77.6446 },
    ownershipStory: 'Helped me stay disciplined and fit during remote work months. Joined a CrossFit gym near my office, so passing this compact set to someone building their own workout corner.'
  },
  {
    id: 'prod-15',
    name: 'LG 340 Litres Smart Inverter Double Door Frost Free Refrigerator',
    category: 'home-appliances',
    sellingPrice: 18200,
    originalPrice: 42990,
    condition: 'Good',
    conditionDetails: 'Door gaskets clean and pliable. Toughened glass shelves are unchipped. Cooling performance tested and superb.',
    postedDate: '3 days ago',
    featured: false,
    popularDeal: false,
    views: 320,
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Spacious 340-liter 3-Star Double Door Refrigerator with Door Cooling+ multi air flow vents, moist balance crisper, and smart diagnosis. Linear cooling maintains temperature within 0.5°C.',
    specifications: {
      'Brand': 'LG Electronics',
      'Capacity': '340 Litres (Fresh Food 265L / Freezer 75L)',
      'Compressor': 'Smart Inverter Compressor with 10-Yr Warranty',
      'Energy Rating': '3 Star BEE Certified',
      'Special Features': 'Door Cooling+, Auto Smart Connect (Runs on Inverter)'
    },
    ownerId: 'owner-8',
    city: 'Chengalpattu',
    area: 'Mahindra World City, Chengalpattu',
    coordinates: { lat: 12.7214, lng: 80.0102 },
    ownershipStory: 'Selling because we upgraded to a french-door refrigerator for our joint family. Perfectly maintained in an air-conditioned apartment. Ready for immediate pickup.'
  },
  {
    id: 'prod-16',
    name: 'Logitech G29 Driving Force Racing Wheel with 3 Stainless Pedals',
    category: 'gaming-accessories',
    sellingPrice: 17500,
    originalPrice: 32995,
    condition: 'Like New',
    conditionDetails: 'Hand-stitched leather rim feels like a real sports car. Force feedback dual-motor gears operate smoothly.',
    postedDate: '2 days ago',
    featured: false,
    popularDeal: true,
    views: 430,
    images: [
      'https://images.unsplash.com/photo-1612287233261-758f62c0eb3f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Sim-racing steering wheel compatible with PS5, PS4, and PC. 900-degree lock-to-lock rotation (2.5 turns), dual-motor force feedback, helical gearing with anti-backlash, and stainless steel throttle, brake, and clutch pedals.',
    specifications: {
      'Compatibility': 'PlayStation 5, PlayStation 4, PC Windows 11/10',
      'Rotation': '900 Degrees Lock-to-Lock',
      'Feedback': 'Dual-Motor Realistic Force Feedback',
      'Pedals Unit': 'Nonlinear Brake, Gas, Clutch with Carpet Gripper',
      'Mounting': 'Built-in Desk Clamps and Bolt Mount Points'
    },
    ownerId: 'owner-3',
    city: 'Tambaram',
    area: 'Camp Road, East Tambaram',
    coordinates: { lat: 12.9150, lng: 80.1240 },
    ownershipStory: 'Used exclusively for playing Gran Turismo 7 and F1 23 on weekends. Mounted to an Omega wheel stand so it was never dropped or misused. Original power supply and cables intact.'
  },
  {
    id: 'prod-17',
    name: 'Yonex Astrox 99 Pro Badminton Racket (4UG5, Strung with BG66 Ultimax)',
    category: 'sports-equipment',
    sellingPrice: 8500,
    originalPrice: 18990,
    condition: 'Like New',
    conditionDetails: 'Zero frame chips or cracks. Freshly strung at 26 lbs with Yonex BG66 Ultimax strings and Yonex Super Grap overgrip.',
    postedDate: 'Yesterday',
    featured: false,
    popularDeal: true,
    views: 310,
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Official made-in-Japan top-tier offensive racket co-developed with Kento Momota. Rotational Generator System and Namd graphite throughout the shaft and frame deliver explosive smash power and steep angles.',
    specifications: {
      'Origin': 'Made in Japan (Sunrise Hologram Verified)',
      'Weight & Grip': '4U (Avg. 83g) G5',
      'Flex': 'Stiff with Head-Heavy Balance',
      'String Tension': '26 lbs BG66 Ultimax (Strung 2 weeks ago)',
      'Cover': 'Full thermal Astrox cushion cover included'
    },
    ownerId: 'owner-6',
    city: 'Hyderabad',
    area: 'Banjara Hills, Hyderabad',
    coordinates: { lat: 17.4156, lng: 78.4350 },
    ownershipStory: 'Purchased for state level training, but I found the head-heavy balance too demanding for my shoulder and switched to an Arcsaber 11 Pro. Verified authentic serial code on shaft.'
  },
  {
    id: 'prod-18',
    name: 'Dell XPS 15 9520 (Intel Core i7 12th Gen / 32GB RAM / 1TB SSD / RTX 3050Ti)',
    category: 'laptops-computers',
    sellingPrice: 89000,
    originalPrice: 215000,
    condition: 'Like New',
    conditionDetails: 'Carbon fiber palm rest pristine with no shine. 3.5K OLED touchscreen display with vibrant 100% DCI-P3 color.',
    postedDate: '3 days ago',
    featured: true,
    popularDeal: false,
    views: 520,
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Precision CNC machined aluminum chassis with carbon fiber interior. Jaw-dropping 15.6-inch 3.5K OLED InfinityEdge touch screen. Equipped with 14-core Intel Core i7-12700H and dedicated NVIDIA GeForce RTX 3050Ti graphics.',
    specifications: {
      'CPU': 'Intel Core i7-12700H (14 Cores / 20 Threads, up to 4.7GHz)',
      'Display': '15.6" 3.5K (3456 x 2160) OLED Touch InfinityEdge, 400-nit',
      'RAM': '32 GB DDR5 4800MHz Dual Channel',
      'Storage': '1 TB M.2 PCIe Gen 4 NVMe Solid State Drive',
      'GPU': 'NVIDIA GeForce RTX 3050 Ti (4GB GDDR6)',
      'Weight': '1.92 kg with CNC Aluminum Unibody'
    },
    ownerId: 'owner-5',
    city: 'Mumbai',
    area: 'Bandra West, Mumbai',
    coordinates: { lat: 19.0620, lng: 72.8350 },
    ownershipStory: 'Used for freelance 4K video editing. Handled DaVinci Resolve timelines effortlessly. Battery condition is 89%. Includes Dell 130W Type-C adapter and USB-C to HDMI/USB dongle.'
  },
  {
    id: 'prod-19',
    name: 'Honda Activa 6G - 2021 Model (Low Mileage, 9,200 km)',
    category: 'vehicles',
    sellingPrice: 53500,
    originalPrice: 87000,
    condition: 'Good',
    conditionDetails: 'Single lady owner, used for grocery runs and school drop-offs. Minor hairline scratch on side panel. Starts in first touch.',
    postedDate: '2 days ago',
    featured: false,
    popularDeal: true,
    views: 680,
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Reliable Honda Activa 6G 110cc BS6 with silent ACG starter motor, telescopic front suspension, external fuel lid, and Combi-Brake System (CBS). Gives 50+ kmpl real-world mileage in city traffic.',
    specifications: {
      'Year of Registration': 'October 2021',
      'Odometer Reading': '9,250 KM',
      'Color': 'Pearl Precious White',
      'Mileage': '52 km/l city tested',
      'Battery': 'Brand new Amaron maintenance-free battery installed 4 months ago',
      'Documents': 'Original RC, Pollution Under Control certificate, 2 original keys'
    },
    ownerId: 'owner-3',
    city: 'Tambaram',
    area: 'East Tambaram, Tambaram',
    coordinates: { lat: 12.9280, lng: 80.1120 },
    ownershipStory: 'Selling because we recently moved to an electric scooter. Always parked in covered apartment parking. Test drive welcome in East Tambaram.'
  },
  {
    id: 'prod-20',
    name: 'Ray-Ban Classic Aviator Polarized Sunglasses (Gold Frame / Green Classic G-15 Lens)',
    category: 'fashion-accessories',
    sellingPrice: 4900,
    originalPrice: 11590,
    condition: 'Like New',
    conditionDetails: 'Authentic RB3025 model. Zero scratches on polarized mineral glass lenses. Original leather case and microfiber cloth.',
    postedDate: 'Yesterday',
    featured: false,
    popularDeal: true,
    views: 280,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Timeless Ray-Ban Aviator RB3025 001/58 58mm with iconic Arista gold metal frame and Crystal Green Polarized G-15 lenses. 100% UV400 protection and cuts 99% of reflected surface glare.',
    specifications: {
      'Model Code': 'RB3025 001/58 58-14',
      'Frame Material': 'Polished Metal in Arista Gold',
      'Lenses': 'Polarized Green Classic G-15 (Etched RB logo on left lens)',
      'Eye Size': '58 mm (Standard Medium Fit)',
      'Accessories': 'Original Ray-Ban Tan Leather Case, Cleaning Cloth'
    },
    ownerId: 'owner-1',
    city: 'Chennai',
    area: 'Anna Nagar West, Chennai',
    coordinates: { lat: 13.0850, lng: 80.2100 },
    ownershipStory: 'Received as a gift from my brother returning from Dubai. I wear prescription glasses so I couldn’t use these outdoors. Pristine condition with serial etched glass.'
  },
  {
    id: 'prod-21',
    name: 'Samsung Galaxy S23 Ultra 5G (12GB RAM / 256GB - Phantom Black)',
    category: 'mobiles-electronics',
    sellingPrice: 62500,
    originalPrice: 124999,
    condition: 'Good',
    conditionDetails: 'Screen in pristine condition. Minor paint rub near S-Pen silo. 200MP camera produces breathtaking portraits and 100x zoom.',
    postedDate: '1 day ago',
    featured: true,
    popularDeal: true,
    views: 610,
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Flagship Samsung Galaxy S23 Ultra powered by Snapdragon 8 Gen 2 for Galaxy. Features integrated S-Pen with air gestures, 5000mAh battery with 45W fast charging, and 6.8-inch Dynamic AMOLED 2X 120Hz display.',
    specifications: {
      'Processor': 'Qualcomm Snapdragon 8 Gen 2 for Galaxy (4nm)',
      'Camera': '200MP Main + 12MP Ultra-wide + 10MP 3x + 10MP 10x Periscope',
      'RAM & Storage': '12GB LPDDR5X RAM / 256GB UFS 4.0 Storage',
      'Battery Health': '94% capacity, easily 1.5 days on full charge',
      'Inclusions': 'Original box, braided USB Type-C cable, Spigen Tough Armor case'
    },
    ownerId: 'owner-2',
    city: 'Bengaluru',
    area: 'Whitefield, Bengaluru',
    coordinates: { lat: 12.9698, lng: 77.7500 },
    ownershipStory: 'Upgraded to a foldable phone for multi-window spreadsheet reading. Has always been used with a screen protector and case. Original Samsung retail bill included.'
  },
  {
    id: 'prod-22',
    name: 'Contemporary 3-Seater L-Shape Fabric Sectional Sofa (Grey Washable Covers)',
    category: 'furniture',
    sellingPrice: 14500,
    originalPrice: 38000,
    condition: 'Good',
    conditionDetails: 'Cushions are firm and resilient. Removable zip covers freshly dry-cleaned. No pet odors, smoke-free home.',
    postedDate: '4 days ago',
    featured: false,
    popularDeal: false,
    views: 290,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Modern minimalist L-shaped sectional sofa with reversible chaise lounge. Sturdy solid pine wood inner frame with high-density foam cushioning. Fits comfortably in urban living rooms.',
    specifications: {
      'Configuration': '3-Seater with Reversible Left/Right Chaise',
      'Upholstery': 'Breathable textured woven polyester fabric',
      'Dimensions': '7.2 ft overall width x 4.8 ft chaise depth',
      'Legs': 'Solid tapered natural oak finish legs'
    },
    ownerId: 'owner-7',
    city: 'Madurai',
    area: 'Anna Nagar, Madurai',
    coordinates: { lat: 9.9190, lng: 78.1320 },
    ownershipStory: 'Selling due to relocating to a new rental home with existing built-in furniture. Easy to separate into 2 pieces for loading into an auto or pickup truck.'
  },
  {
    id: 'prod-23',
    name: 'Nintendo Switch OLED Model with Mario Kart 8 Deluxe & Zelda Breath of the Wild',
    category: 'gaming-accessories',
    sellingPrice: 22000,
    originalPrice: 38990,
    condition: 'Like New',
    conditionDetails: 'OLED screen has zero scratches. Glass protector applied in the box before first power on. Joy-Cons responsive.',
    postedDate: 'Yesterday',
    featured: true,
    popularDeal: true,
    views: 520,
    images: [
      'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Nintendo Switch OLED with vibrant 7-inch OLED screen, wide adjustable tabletop stand, dock with wired LAN port, and 64GB internal storage. Includes 2 bestselling physical game cartridges and carrying pouch.',
    specifications: {
      'Display': '7.0-inch 720p Multi-Touch OLED Panel',
      'Battery Life': 'Approx. 4.5 to 9 hours depending on title',
      'Storage': '64 GB Internal + 128 GB SanDisk MicroSD Card included',
      'Games Included': 'The Legend of Zelda: Breath of the Wild & Mario Kart 8 Deluxe (Physical Cartridges)'
    },
    ownerId: 'owner-5',
    city: 'Mumbai',
    area: 'Juhu, Mumbai',
    coordinates: { lat: 19.1020, lng: 72.8270 },
    ownershipStory: 'Played during a 3-week vacation in Europe. Hardly played since coming back to work. Packed cleanly into its original box with all docks, cables, and Joy-Con straps.'
  },
  {
    id: 'prod-24',
    name: 'Harry Potter Deluxe Collector’s Hardcover 7-Book Box Set (Special Bloomsbury Edition)',
    category: 'books-education',
    sellingPrice: 3600,
    originalPrice: 9999,
    condition: 'Like New',
    conditionDetails: 'Spines are unbroken. Pages crisp and bright. Slipcase has beautiful embossed gold foil artwork.',
    postedDate: '3 days ago',
    featured: false,
    popularDeal: true,
    views: 340,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Complete 7-volume J.K. Rowling Harry Potter fantasy masterwork in Bloomsbury deluxe hardcover presentation slipcase. Rich typography, durable book cloth bindings, and ribbon page markers.',
    specifications: {
      'Publisher': 'Bloomsbury Publishing UK',
      'Format': 'Deluxe Cloth Hardcover with Foil Lettering',
      'Volumes': 'All 7 Complete Books (Philosopher\'s Stone through Deathly Hallows)',
      'Language': 'English Unabridged'
    },
    ownerId: 'owner-4',
    city: 'Coimbatore',
    area: 'RS Puram, Coimbatore',
    coordinates: { lat: 11.0080, lng: 76.9480 },
    ownershipStory: 'Kept on an enclosed glass bookshelf as a collector item. Read only once with gentle care. Ideal gift for fantasy fans, young adults, or collectors.'
  },
  {
    id: 'prod-25',
    name: 'Cosco Pro Olympic Size Foldable Table Tennis TT Table with Net & 4 Stiga Rackets',
    category: 'sports-equipment',
    sellingPrice: 12500,
    originalPrice: 28500,
    condition: 'Good',
    conditionDetails: '18mm thick playing surface with even bounce. Independent halves with 75mm lockable casters for solo playback practice.',
    postedDate: '5 days ago',
    featured: false,
    popularDeal: false,
    views: 260,
    images: [
      'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Tournament quality indoor table tennis table featuring an 18mm high-density engineered wood top coated with non-glare blue polyurethane. Includes tournament clamp-on net set and 4 Stiga table tennis bats.',
    specifications: {
      'Board Thickness': '18 mm Pre-Laminated Particle Board',
      'Frame & Legs': '25 x 38mm Heavy Gauge Steel Powder-Coated Tubing',
      'Mobility': '8 x 75mm Rubber Swivel Wheels with Safety Brakes',
      'Foldability': 'Dual safety locking playback mode for solo training'
    },
    ownerId: 'owner-1',
    city: 'Chennai',
    area: 'OMR, Sholinganallur, Chennai',
    coordinates: { lat: 12.9010, lng: 80.2270 },
    ownershipStory: 'Used for team fun in our startup office space. We transitioned to a hybrid work model, so the table is now available. Folds compactly in 2 minutes.'
  },
  {
    id: 'prod-26',
    name: 'Genuine Woodland Rugged Waterproof Leather Trekking Boots (Men UK 9 / EU 43)',
    category: 'fashion-accessories',
    sellingPrice: 2400,
    originalPrice: 6995,
    condition: 'Good',
    conditionDetails: 'Worn on two weekend hill station treks. Nubuck leather treated with waterproofing wax. Deep rubber lug soles with 90% life.',
    postedDate: '2 days ago',
    featured: false,
    popularDeal: true,
    views: 195,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Iconic Woodland camel brown outdoor ankle-high boots crafted from genuine top-grain oiled nubuck leather. Heavy-duty rust-proof brass hardware, padded collar, and slip-resistant rubber lug outsole.',
    specifications: {
      'Brand': 'Woodland Outdoor Gear',
      'Size': 'UK / India 9 (EU 43)',
      'Upper': 'Genuine Oiled Nubuck Leather',
      'Sole': 'Anti-Torsion Vulcanized Rubber Lug Sole',
      'Color': 'Camel Khaki'
    },
    ownerId: 'owner-8',
    city: 'Chengalpattu',
    area: 'GST Road, Chengalpattu',
    coordinates: { lat: 12.6850, lng: 79.9820 },
    ownershipStory: 'Bought for a Kodaikanal trail and Himachal trek. Very comfortable ankle support. Cleaned, dried, and conditioned with leather balm.'
  }
];

// Helper to initialize and retrieve products with localStorage persistence
const STORAGE_KEY_PRODUCTS = 'reuse_market_products_v1';
const STORAGE_KEY_WISHLIST = 'reuse_market_wishlist_v1';
const STORAGE_KEY_AUTH = 'reuse_market_auth_user_v1';

function getStoredProducts() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read products from localStorage:', e);
  }
  // If not stored yet, seed default products
  saveStoredProducts(INITIAL_PRODUCTS);
  return INITIAL_PRODUCTS;
}

function saveStoredProducts(products) {
  try {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error('Failed to save products in localStorage:', e);
  }
}

function getStoredWishlist() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_WISHLIST);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveStoredWishlist(wishlist) {
  try {
    localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(wishlist));
  } catch (e) {}
}

function getStoredUser() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_AUTH);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

function saveStoredUser(user) {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    }
  } catch (e) {}
}

function getOwnerById(ownerId) {
  return FIRST_OWNERS.find(o => o.id === ownerId) || {
    id: ownerId || 'owner-unknown',
    name: 'Verified First Owner',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    city: 'Chennai',
    area: 'Central',
    phone: '+91 98400 00000',
    email: 'firstowner@demomarket.in',
    memberSince: 'Recently',
    productsSold: 1,
    rating: 4.8,
    reviewsCount: 3,
    verified: true,
    bio: 'Individual pre-owned seller on ReUse Market.'
  };
}

function getCategoryById(categoryId) {
  return CATEGORIES.find(c => c.id === categoryId) || {
    id: categoryId,
    name: 'General',
    icon: 'fa-solid fa-box-open',
    description: 'Pre-owned items'
  };
}

