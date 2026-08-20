import db from './database.js';

console.log('🌱 Starting UNICOM FAB B2B Database Seeding...');

// Clear existing tables
db.exec(`
  DELETE FROM order_items;
  DELETE FROM orders;
  DELETE FROM product_colours;
  DELETE FROM product_sizes;
  DELETE FROM product_images;
  DELETE FROM products;
  DELETE FROM enquiries;
  DELETE FROM users;
  DELETE FROM admin_settings;
`);

const productsData = [
  {
    id: 'prod-001',
    name: 'Monolith Oversized Egyptian Cotton Heavyweight Tee',
    slug: 'monolith-oversized-egyptian-cotton-heavyweight-tee',
    description: 'Constructed from 280 GSM combed long-staple Egyptian cotton. Features reinforced double-stitched collar, dropped shoulders, and pre-shrunk reactive dyeing for commercial garment washing.',
    category: 'Heavyweight Tees',
    wholesale_price: 450,
    suggested_msrp: 1499,
    batch_number: 'BATCH-2026-08-TEE1',
    stock_quantity: 1200,
    min_order_quantity: 30,
    quantity_step: 5,
    is_trending: 1,
    is_new_arrival: 1,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Midnight Black', 'Ivory White', 'Slate Grey', 'Raw Sand'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'prod-002',
    name: 'Aethel French Terry 450 GSM Heavy Hoodie',
    slug: 'aethel-french-terry-450-gsm-heavy-hoodie',
    description: 'Commercial wholesale grade 450 GSM loopback French terry hoodie with double-layer hood, hidden phone pouch, and heavy 2x2 rib side gussets. Designed for premium street labels and boutique retailers.',
    category: 'Outerwear & Hoodies',
    wholesale_price: 1150,
    suggested_msrp: 3499,
    batch_number: 'BATCH-2026-08-HOOD1',
    stock_quantity: 850,
    min_order_quantity: 30,
    quantity_step: 5,
    is_trending: 1,
    is_new_arrival: 0,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Obsidian Black', 'Heather Charcoal', 'Forest Moss', 'Espresso Brown'],
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: 'prod-003',
    name: 'Vanguard Tailored Italian Linen Resort Shirt',
    slug: 'vanguard-tailored-italian-linen-resort-shirt',
    description: 'Pure 100% European flax resort shirt featuring Cuban camp collar, genuine mother-of-pearl buttons, and lightweight 160 GSM open weave. Soft-washed for breathable wholesale fashion lineups.',
    category: 'Resort Shirts',
    wholesale_price: 680,
    suggested_msrp: 2299,
    batch_number: 'BATCH-2026-08-SHIRT1',
    stock_quantity: 940,
    min_order_quantity: 30,
    quantity_step: 10,
    is_trending: 1,
    is_new_arrival: 1,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1622445268465-843857407a6a?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Natural Cream', 'Terracotta Red', 'Sage Green', 'Sky Blue'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'prod-004',
    name: 'Kuro Selvedge Denim Modular Chore Jacket',
    slug: 'kuro-selvedge-denim-modular-chore-jacket',
    description: '14.5 oz Japanese selvedge denim utility chore jacket. Triple-needle chain stitching, custom tarnished brass rivets, and multi-functional chest utility pocket configuration.',
    category: 'Jackets & Denim',
    wholesale_price: 1850,
    suggested_msrp: 4999,
    batch_number: 'BATCH-2026-08-JAC1',
    stock_quantity: 450,
    min_order_quantity: 25,
    quantity_step: 5,
    is_trending: 0,
    is_new_arrival: 1,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Raw Indigo', 'Washed Jet Black', 'Vintage Olive'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'prod-005',
    name: 'Solace Mercerized Pima Cotton Polo',
    slug: 'solace-mercerized-pima-cotton-polo',
    description: '220 GSM 100% Supima mercerized cotton polo. High-lustre finish with anti-pilling structure, structured rib knit collar, and seamless ultrasonic shoulder joinery.',
    category: 'Polos & Knits',
    wholesale_price: 520,
    suggested_msrp: 1799,
    batch_number: 'BATCH-2026-08-POL1',
    stock_quantity: 1500,
    min_order_quantity: 30,
    quantity_step: 10,
    is_trending: 1,
    is_new_arrival: 0,
    images: [
      'https://images.unsplash.com/photo-1625910513413-5632d4b9b9a6?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Deep Navy', 'Pure White', 'Burgundy', 'Emerald Green'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'prod-006',
    name: 'Apex Relaxed Heavy Cargo Trousers',
    slug: 'apex-relaxed-heavy-cargo-trousers',
    description: '320 GSM ripstop cotton tactical pants with expandable bellowed cargo pockets, articulated knee paneling, and adjustable cinch hem drawstrings. Built for urban outdoor brands.',
    category: 'Trousers & Bottoms',
    wholesale_price: 890,
    suggested_msrp: 2799,
    batch_number: 'BATCH-2026-08-CARG1',
    stock_quantity: 620,
    min_order_quantity: 30,
    quantity_step: 5,
    is_trending: 1,
    is_new_arrival: 1,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Khaki Tan', 'Stealth Black', 'Tactical Olive'],
    sizes: ['30', '32', '34', '36']
  },
  {
    id: 'prod-007',
    name: 'Atelier Double-Breasted Wool Blend Blazer',
    slug: 'atelier-double-breasted-wool-blend-blazer',
    description: 'Structured 400 GSM wool-viscose blend tailored double-breasted blazer. Half-canvas internal construction, hand-pick stitching details, and horn button closures.',
    category: 'Suits & Tailoring',
    wholesale_price: 2400,
    suggested_msrp: 6999,
    batch_number: 'BATCH-2026-08-BLAZ1',
    stock_quantity: 310,
    min_order_quantity: 20,
    quantity_step: 5,
    is_trending: 0,
    is_new_arrival: 1,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Charcoal Pinstripe', 'Midnight Navy', 'Camel Beige'],
    sizes: ['38R', '40R', '42R', '44R']
  },
  {
    id: 'prod-008',
    name: 'Nomad Heavy Loopback Sweatpants',
    slug: 'nomad-heavy-loopback-sweatpants',
    description: '400 GSM heavy fleece sweatpants featuring deep welt zipped pockets, dense elastic waistband with metal tips, and relaxed tapered ankle cuffs.',
    category: 'Activewear & Loungewear',
    wholesale_price: 750,
    suggested_msrp: 2399,
    batch_number: 'BATCH-2026-08-SWEAT1',
    stock_quantity: 1100,
    min_order_quantity: 40,
    quantity_step: 10,
    is_trending: 1,
    is_new_arrival: 0,
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Heather Grey', 'Washed Black', 'Oatmeal Milk'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'prod-009',
    name: 'Elysian Mulberry Silk Knit Button Cardigan',
    slug: 'elysian-mulberry-silk-knit-button-cardigan',
    description: 'Luxury 12-gauge Mulberry silk and merino wool blend knit cardigan. Horn buttons, ribbed cuffs, and soft tactile handfeel for high-end boutique collections.',
    category: 'Knitwear',
    wholesale_price: 1350,
    suggested_msrp: 3999,
    batch_number: 'BATCH-2026-08-KNIT1',
    stock_quantity: 380,
    min_order_quantity: 20,
    quantity_step: 5,
    is_trending: 0,
    is_new_arrival: 1,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1608234807905-4466023792f5?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Ivory Butter', 'Midnight Blue', 'Taupe Brown'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'prod-010',
    name: 'Sovereign Oxford Cotton Button-Down Shirt',
    slug: 'sovereign-oxford-cotton-button-down-shirt',
    description: 'Classic 180 GSM pin-point Oxford cloth shirt with button-down collar, chest pocket, and side gusset tab reinforcement. Tailored for corporate apparel & upscale retail.',
    category: 'Formal Shirts',
    wholesale_price: 580,
    suggested_msrp: 1899,
    batch_number: 'BATCH-2026-08-OXF1',
    stock_quantity: 1800,
    min_order_quantity: 50,
    quantity_step: 10,
    is_trending: 1,
    is_new_arrival: 0,
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Classic White', 'Light Blue', 'Pink Oxford', 'Navy Blue'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'prod-011',
    name: 'Kensho Washed Canvas Workwear Overshirt',
    slug: 'kensho-washed-canvas-workwear-overshirt',
    description: '350 GSM enzyme-washed cotton duck canvas overshirt with brass snap fastenings and dual chest patch flap pockets. Heavyweight layer for streetwear catalogues.',
    category: 'Jackets & Denim',
    wholesale_price: 820,
    suggested_msrp: 2599,
    batch_number: 'BATCH-2026-08-CANV1',
    stock_quantity: 720,
    min_order_quantity: 30,
    quantity_step: 5,
    is_trending: 0,
    is_new_arrival: 1,
    images: [
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Washed Tobacco', 'Slate Black', 'Faded Olive'],
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: 'prod-012',
    name: 'Zephyr Seamless Microfiber Active Tank',
    slug: 'zephyr-seamless-microfiber-active-tank',
    description: 'Performance 140 GSM seamless technical stretch tank featuring moisture-wicking capillary yarn knit and reflective rear hem print. Ideal for gym and wellness brands.',
    category: 'Activewear & Loungewear',
    wholesale_price: 320,
    suggested_msrp: 1099,
    batch_number: 'BATCH-2026-08-TANK1',
    stock_quantity: 2100,
    min_order_quantity: 50,
    quantity_step: 10,
    is_trending: 1,
    is_new_arrival: 0,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Graphite Grey', 'Neon Coral', 'Pure Obsidian'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'prod-013',
    name: 'Veritas Heavy Ribbed Wool Beanie',
    slug: 'veritas-heavy-ribbed-wool-beanie',
    description: '100% Merino wool 7-gauge heavy ribbed beanie cuff cap. Warm thermal insulation, non-itch finish, custom branding ready.',
    category: 'Accessories & Headwear',
    wholesale_price: 240,
    suggested_msrp: 899,
    batch_number: 'BATCH-2026-08-ACC1',
    stock_quantity: 3500,
    min_order_quantity: 50,
    quantity_step: 10,
    is_trending: 0,
    is_new_arrival: 0,
    images: [
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1608234807905-4466023792f5?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Charcoal Grey', 'Mustard Yellow', 'Deep Olive', 'Jet Black'],
    sizes: ['One Size']
  },
  {
    id: 'prod-014',
    name: 'Imperial Double-Faced Cashmere Scarf',
    slug: 'imperial-double-faced-cashmere-scarf',
    description: '100% Inner Mongolian Grade-A Cashmere scarf with hand-twisted fringing. Extremely soft 200g weight for winter luxury resale.',
    category: 'Accessories & Headwear',
    wholesale_price: 950,
    suggested_msrp: 2999,
    batch_number: 'BATCH-2026-08-SCARF1',
    stock_quantity: 600,
    min_order_quantity: 20,
    quantity_step: 5,
    is_trending: 1,
    is_new_arrival: 1,
    images: [
      'https://images.unsplash.com/photo-1608234807905-4466023792f5?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Camel & Cream', 'Grey & Black', 'Navy & Wine'],
    sizes: ['Standard 180x30cm']
  },
  {
    id: 'prod-015',
    name: 'Chronos Heavy Fleece Quarter-Zip Pullover',
    slug: 'chronos-heavy-fleece-quarter-zip-pullover',
    description: '380 GSM polar fleece quarter-zip sweater with custom metallic zipper pull, elasticated cuffs, and side seam hidden pockets.',
    category: 'Outerwear & Hoodies',
    wholesale_price: 780,
    suggested_msrp: 2499,
    batch_number: 'BATCH-2026-08-QZIP1',
    stock_quantity: 800,
    min_order_quantity: 30,
    quantity_step: 5,
    is_trending: 0,
    is_new_arrival: 1,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Forest Green', 'Off-White Cream', 'Midnight Navy'],
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: 'prod-016',
    name: 'Nautilus Mercerized Cotton Pique Golf Polo',
    slug: 'nautilus-mercerized-cotton-pique-golf-polo',
    description: '240 GSM heavy cotton pique polo shirt with side hem vents, anti-curl collar technology, and mother of pearl contrast buttons.',
    category: 'Polos & Knits',
    wholesale_price: 490,
    suggested_msrp: 1699,
    batch_number: 'BATCH-2026-08-POLO2',
    stock_quantity: 1400,
    min_order_quantity: 40,
    quantity_step: 10,
    is_trending: 1,
    is_new_arrival: 0,
    images: [
      'https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1625910513413-5632d4b9b9a6?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Ocean Blue', 'Snow White', 'Slate Grey'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'prod-017',
    name: 'Vesper Pleated Tapered Linen Trousers',
    slug: 'vesper-pleated-tapered-linen-trousers',
    description: 'High-waisted double-pleated linen trousers with adjustable side waist tabs and tailored tapered leg hem.',
    category: 'Trousers & Bottoms',
    wholesale_price: 920,
    suggested_msrp: 2899,
    batch_number: 'BATCH-2026-08-TROUS1',
    stock_quantity: 530,
    min_order_quantity: 25,
    quantity_step: 5,
    is_trending: 0,
    is_new_arrival: 1,
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Ecru Sand', 'Midnight Black', 'Olive Drab'],
    sizes: ['30', '32', '34', '36']
  },
  {
    id: 'prod-018',
    name: 'Heritage Waxed Cotton Field Jacket',
    slug: 'heritage-waxed-cotton-field-jacket',
    description: 'Heavy 10 oz water-repellent paraffin-waxed cotton canvas field coat with corduroy lining collar, brass zip hardware, and tartan cotton lining.',
    category: 'Jackets & Denim',
    wholesale_price: 2100,
    suggested_msrp: 5999,
    batch_number: 'BATCH-2026-08-COAT1',
    stock_quantity: 290,
    min_order_quantity: 20,
    quantity_step: 5,
    is_trending: 1,
    is_new_arrival: 0,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Rustic Olive', 'Dark Brown', 'Black'],
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: 'prod-019',
    name: 'Aura Organic Bamboo Cotton Lounge Set',
    slug: 'aura-organic-bamboo-cotton-lounge-set',
    description: 'Ultra-soft 210 GSM 70% organic bamboo / 30% organic cotton two-piece loungewear set. Anti-bacterial properties, hypoallergenic weave, ideal for boutique spa and nightwear stores.',
    category: 'Activewear & Loungewear',
    wholesale_price: 880,
    suggested_msrp: 2699,
    batch_number: 'BATCH-2026-08-LOUNGE1',
    stock_quantity: 970,
    min_order_quantity: 30,
    quantity_step: 5,
    is_trending: 0,
    is_new_arrival: 1,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Cloud White', 'Sage Mist', 'Warm Beige'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'prod-020',
    name: 'Titan Heavyweight Boxy Blank Hooded Sweatshirt',
    slug: 'titan-heavyweight-boxy-blank-hooded-sweatshirt',
    description: 'Pure streetwear essential blank 500 GSM custom fleece hoodie. Ultra-dense cotton build, no exterior branding tags, built explicitly for streetwear brand embellishments.',
    category: 'Heavyweight Tees',
    wholesale_price: 1250,
    suggested_msrp: 3799,
    batch_number: 'BATCH-2026-08-BLANK1',
    stock_quantity: 1600,
    min_order_quantity: 50,
    quantity_step: 10,
    is_trending: 1,
    is_new_arrival: 1,
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=1000'
    ],
    colours: ['Pitch Black', 'Raw Canvas', 'Concrete Grey'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  }
];

// Insert products
const insertProduct = db.prepare(`
  INSERT INTO products (
    id, name, slug, description, category, wholesale_price, suggested_msrp,
    batch_number, stock_quantity, min_order_quantity, quantity_step, is_trending, is_new_arrival
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertImage = db.prepare(`
  INSERT INTO product_images (product_id, image_url, display_order) VALUES (?, ?, ?)
`);

const insertColour = db.prepare(`
  INSERT INTO product_colours (product_id, colour_name) VALUES (?, ?)
`);

const insertSize = db.prepare(`
  INSERT INTO product_sizes (product_id, size_name) VALUES (?, ?)
`);

db.transaction(() => {
  for (const p of productsData) {
    insertProduct.run(
      p.id, p.name, p.slug, p.description, p.category, p.wholesale_price,
      p.suggested_msrp, p.batch_number, p.stock_quantity, p.min_order_quantity,
      p.quantity_step, p.is_trending, p.is_new_arrival
    );

    p.images.slice(0, 4).forEach((imgUrl, index) => {
      insertImage.run(p.id, imgUrl, index);
    });

    p.colours.forEach(col => {
      insertColour.run(p.id, col);
    });

    p.sizes.forEach(sz => {
      insertSize.run(p.id, sz);
    });
  }

  // Insert seed admin settings
  const insertSetting = db.prepare(`INSERT INTO admin_settings (key, value) VALUES (?, ?)`);
  insertSetting.run('announcement_text', 'WHOLESALE ORDERS • MINIMUM 30 PCS • PAN-INDIA & GLOBAL DELIVERY');
  insertSetting.run('brand_marquee', 'WHOLESALE READY • BULK ORDERS • QUALITY APPAREL • FAST FULFILMENT • TRUSTED B2B SUPPLY');
})();

console.log('✅ Seeding complete! Inserted 20 products with images, colours, sizes, and settings.');
