export const CATEGORIES = [
  {
    id: 'textiles',
    slug: 'textiles',
    name: 'Home Textiles',
    hindi: 'वस्त्र',
    tagline: 'Hand-blocked kalamkari curtains, cushions & bedsheets',
    description:
      'Weave the warmth of handcrafted Indian textiles into every room. Breathable, vegetable-dyed and printed by hand.',
    accent: '#2F5D58',
    accentSoft: '#3E7B74',
    imageSeed: 'kalamkari',
    styles: ['Kalamkari', 'Bagh Print', 'Ajrakh', 'Chikankari', 'Jamdani'],
    materials: ['Cotton', 'Linen', 'Silk Blend', 'Mulmul', 'Rayon Velvet'],
    transition: 'curtains',
  },
  {
    id: 'books',
    slug: 'books',
    name: 'Books',
    hindi: 'पुस्तकें',
    tagline: 'Stories that keep a home alive',
    description:
      'A curated shelf of beloved classics and most-read titles, wrapped in your home.',
    accent: '#5A241F',
    accentSoft: '#8A4539',
    imageSeed: 'shelf',
    styles: ['Hardcover', 'Paperback', 'Deluxe Edition', 'Signed Copy'],
    materials: ['Cloth Bound', 'Paper', 'Leather', 'Illustrated'],
    transition: 'book',
  },
  {
    id: 'artwork',
    slug: 'artwork',
    name: 'Artwork',
    hindi: 'कला',
    tagline: 'Prints, paintings & frames for quiet walls',
    description:
      'Madhubani, Warli, Tanjore and modern prints — framed and ready to hang.',
    accent: '#C89B3C',
    accentSoft: '#E3C580',
    imageSeed: 'canvas',
    styles: ['Madhubani', 'Warli', 'Tanjore', 'Minimal Modern', 'Abstract'],
    materials: ['Canvas', 'Paper', 'Wood Frame', 'Brass Frame', 'Glass Frame'],
    transition: 'gallery',
  },
  {
    id: 'lifestyle',
    slug: 'lifestyle',
    name: 'Lifestyle & Decor',
    hindi: 'सजावट',
    tagline: 'Vases, lamps & ornaments that settle in softly',
    description:
      'Objects with presence — handcrafted decor that finds its own spot on your shelf.',
    accent: '#8A6B3C',
    accentSoft: '#A9844E',
    imageSeed: 'terrace',
    styles: ['Ceramic', 'Vintage', 'Terracotta', 'Brass', 'Woven'],
    materials: ['Clay', 'Brass', 'Wood', 'Glass', 'Rattan'],
    transition: 'shelf',
  },
  {
    id: 'electronics',
    slug: 'electronics',
    name: 'Home Electronics',
    hindi: 'इलेक्ट्रॉनिक्स',
    tagline: 'Modern calm — smart lighting, sound & scent',
    description:
      'Clean, quiet technology that complements the handcrafted home.',
    accent: '#3E7B74',
    accentSoft: '#59A79E',
    imageSeed: 'lamp',
    styles: ['Smart Lighting', 'Audio', 'Ambient', 'Compact'],
    materials: ['Matte Metal', 'Fabric', 'Glass', 'Recycled Plastic'],
    transition: 'wipe',
  },
];

export const PRODUCTS = [
  // ---------- Home Textiles ----------
  { id: 'tx-1', category: 'textiles', name: 'Kalamkari Curtain Pair', hindi: 'कलमकारी पर्दे', price: 6499, originalPrice: 8799, rating: 4.8, reviews: 312, style: 'Kalamkari', material: 'Cotton', badge: 'Hot Deal', featured: true, width: '3m × 2.4m per panel', color: 'Indigo & rust', description: 'Hand-block printed kalamkari cotton curtains in deep indigo and rust. Vegetable dyes, hand-stitched seams.', imageSeed: 'curtain1', hoverSeed: 'curtain1b', hi: 'Hand-blocked on handloom cotton' },
  { id: 'tx-2', category: 'textiles', name: 'Bagh Print Bedsheet Set', hindi: 'बाग़ प्रिंट चादर', price: 3799, originalPrice: 4999, rating: 4.7, reviews: 208, style: 'Bagh Print', material: 'Cotton', badge: null, featured: false, width: 'King size, 4-piece', color: 'Crimson & beige', description: 'Traditional Bagh resist-printed bedsheet set, crown-panel design, stone-washed for softness.', imageSeed: 'bedsheet1', hoverSeed: 'bedsheet1b', hi: 'Acid-free natural dyes' },
  { id: 'tx-3', category: 'textiles', name: 'Ajrakh Cushion Covers', hindi: 'अजरख़ तकिये', price: 1499, originalPrice: null, rating: 4.6, reviews: 156, style: 'Ajrakh', material: 'Cotton', badge: 'Bestseller', featured: true, width: 'Set of 2, 45×45 cm', color: 'Indigo & maroon', description: 'Ajrakh block-printed cushion covers, double-sided, concealed zip.', imageSeed: 'cushion1', hoverSeed: 'cushion1b', hi: 'Block-printed by artisans in Gujarat' },
  { id: 'tx-4', category: 'textiles', name: 'Chikankari Runner', hindi: 'चिकनकारी मेज़पोश', price: 2199, originalPrice: 2799, rating: 4.5, reviews: 98, style: 'Chikankari', material: 'Mulmul', badge: 'Hot Deal', featured: false, width: '2m × 40 cm', color: 'White & ecru', description: 'Fine shadow-work chikankari table runner in soft mulmul.', imageSeed: 'runner1', hoverSeed: 'runner1b', hi: 'Mindful hand-embroidery' },
  { id: 'tx-5', category: 'textiles', name: 'Jamdani Drape', hindi: 'जामदानी पर्दा', price: 5299, originalPrice: null, rating: 4.9, reviews: 74, style: 'Jamdani', material: 'Cotton Blend', badge: 'Bestseller', featured: true, width: '2.5m × 2.4m', color: 'Ivory & bronze', description: 'Sheer jamdani drape with a subtle stem border, soft-filtering daylight.', imageSeed: 'drape1', hoverSeed: 'drape1b', hi: 'Woven on pit looms' },
  { id: 'tx-6', category: 'textiles', name: 'Kalamkari Bed Valance', hindi: 'कलमकारी चद्दर', price: 2899, originalPrice: 3499, rating: 4.4, reviews: 61, style: 'Kalamkari', material: 'Cotton', badge: null, featured: false, width: '180 × 240 cm', color: 'Teal & ochre', description: 'Statement kalamkari valance with the tree-of-life motif.', imageSeed: 'valance1', hoverSeed: 'valance1b', hi: 'Tree-of-life hand motif' },
  { id: 'tx-7', category: 'textiles', name: 'Ajrakh Table Linen Set', hindi: 'अजरख़ मेज़पोश', price: 3299, originalPrice: null, rating: 4.7, reviews: 133, style: 'Ajrakh', material: 'Cotton', badge: null, featured: false, width: '4-piece set', color: 'Indigo grid', description: 'Coordinated ajrakh table linen set with coasters and napkins.', imageSeed: 'linen1', hoverSeed: 'linen1b', hi: 'Mirrored grid print' },
  { id: 'tx-8', category: 'textiles', name: 'Wool Dhurrie', hindi: 'ऊनी दरी', price: 8999, originalPrice: 10999, rating: 4.8, reviews: 47, style: 'Kalamkari', material: 'Cotton', badge: 'Hot Deal', featured: false, width: '5×7 ft', color: 'Rust & cream', description: 'Flat-woven wool-cotton dhurrie in a kalamkari-inspired field pattern.', imageSeed: 'dhurrie1', hoverSeed: 'dhurrie1b', hi: 'Hand-loomed in Panipat' },

  // ---------- Books ----------
  { id: 'bk-1', category: 'books', name: 'The God of Small Things', hindi: 'गॉड ऑफ़ स्मॉल थिंग्स', price: 449, originalPrice: 599, rating: 4.7, reviews: 1284, style: 'Hardcover', material: 'Cloth Bound', badge: 'Bestseller', featured: true, width: 'Winner, Booker Prize', color: 'Arundhati Roy', description: 'The Booker Prize-winning classic of love and loss in Kerala — cloth-bound collector edition.', imageSeed: 'book1', hoverSeed: 'book1b', hi: 'First Indian Booker winner' },
  { id: 'bk-2', category: 'books', name: 'A Suitable Boy', hindi: 'एक सुयोग्य लड़का', price: 649, originalPrice: null, rating: 4.6, reviews: 872, style: 'Hardcover', material: 'Cloth Bound', badge: null, featured: false, width: '20th anniv. edition', color: 'Vikram Seth', description: 'The great Indian novel — a sweeping saga of family, love and ambition across post-independence India.', imageSeed: 'book2', hoverSeed: 'book2b', hi: '1,349 pages of India' },
  { id: 'bk-3', category: 'books', name: 'The Namesake', hindi: 'द नेमसेक', price: 399, originalPrice: 499, rating: 4.5, reviews: 641, style: 'Paperback', material: 'Paper', badge: 'Hot Deal', featured: false, width: 'Movie tie-in', color: 'Jhumpa Lahiri', description: 'Jhumpa Lahiri\'s luminous story of identity across two continents.', imageSeed: 'book3', hoverSeed: 'book3b', hi: 'Pulitzer-winning author' },
  { id: 'bk-4', category: 'books', name: 'Midnight\'s Children', hindi: 'मिडनाइट्स चिल्ड्रन', price: 549, originalPrice: null, rating: 4.8, reviews: 1023, style: 'Hardcover', material: 'Cloth Bound', badge: 'Bestseller', featured: true, width: 'Booker of Bookers 1993', color: 'Salman Rushdie', description: 'The Booker of Bookers — a magical-realist masterpiece of a nation born at midnight.', imageSeed: 'book4', hoverSeed: 'book4b', hi: '“Book of the bookers”' },
  { id: 'bk-5', category: 'books', name: 'Interpreter of Maladies', hindi: 'इंटरप्रेटर ऑफ़ मैलाडीज़', price: 349, originalPrice: 449, rating: 4.6, reviews: 509, style: 'Paperback', material: 'Paper', badge: null, featured: false, width: 'Pulitzer Prize, 2000', color: 'Jhumpa Lahiri', description: 'Nine stories of kinship and conflict across cultures — Pulitzer Prize winner.', imageSeed: 'book5', hoverSeed: 'book5b', hi: 'Nine quietly fierce stories' },
  { id: 'bk-6', category: 'books', name: 'The Palace of Illusions', hindi: 'पैलेस ऑफ़ इल्युज़न्स', price: 429, originalPrice: 549, rating: 4.4, reviews: 912, style: 'Deluxe Edition', material: 'Illustrated', badge: null, featured: false, width: 'Illustrated edition', color: 'Chitra Divakaruni', description: 'The Mahabharata reimagined from Panchaali\'s voice, in a gilded illustrated edition.', imageSeed: 'book6', hoverSeed: 'book6b', hi: 'A tale retold by a woman' },
  { id: 'bk-7', category: 'books', name: 'Train to Pakistan', hindi: 'ट्रेन टू पाकिस्तान', price: 379, originalPrice: null, rating: 4.7, reviews: 448, style: 'Hardcover', material: 'Cloth Bound', badge: null, featured: false, width: 'Classic reprint', color: 'Khushwant Singh', description: 'A prophetic classic of partition told with clarity and compassion.', imageSeed: 'book7', hoverSeed: 'book7b', hi: 'A partition masterpiece' },
  { id: 'bk-8', category: 'books', name: 'The White Tiger', hindi: 'द व्हाइट टाइगर', price: 449, originalPrice: 599, rating: 4.5, reviews: 733, style: 'Paperback', material: 'Paper', badge: 'Hot Deal', featured: false, width: 'Booker Prize, 2008', color: 'Aravind Adiga', description: 'A darkly comic novel of ambition and survival in modern India.', imageSeed: 'book8', hoverSeed: 'book8b', hi: 'Man Booker 2008' },
  { id: 'bk-9', category: 'books', name: 'Malgudi Days', hindi: 'मालगुड़ी डेज़', price: 329, originalPrice: 419, rating: 4.8, reviews: 1567, style: 'Paperback', material: 'Illustrated', badge: 'Bestseller', featured: true, width: 'Fourteen stories', color: 'R.K. Narayan', description: 'Simple, warm tales of Swami and the town of Malgudi, with the iconic illustrations.', imageSeed: 'book9', hoverSeed: 'book9b', hi: 'The India we all grew up in' },

  // ---------- Artwork ----------
  { id: 'ar-1', category: 'artwork', name: 'Madhubani Tree of Life', hindi: 'मधुबनी वृक्ष', price: 4599, originalPrice: 5999, rating: 4.9, reviews: 218, style: 'Madhubani', material: 'Canvas', badge: 'Bestseller', featured: true, width: '42 × 42 in', color: 'Natural pigments', description: 'Original Madhubani painting in natural pigments on handmade paper, museum framed.', imageSeed: 'art1', hoverSeed: 'art1b', hi: 'Made in Mithila, Bihar' },
  { id: 'ar-2', category: 'artwork', name: 'Warli Village Scene', hindi: 'वारली गाँव', price: 3899, originalPrice: 4799, rating: 4.7, reviews: 149, style: 'Warli', material: 'Paper', badge: 'Hot Deal', featured: false, width: '36 × 36 in', color: 'Red ochre & white', description: 'Warli folk scene of a village gathering, framed in natural wood.', imageSeed: 'art2', hoverSeed: 'art2b', hi: 'Painted by Warli tribe artist' },
  { id: 'ar-3', category: 'artwork', name: 'Tanjore Ganesha', hindi: 'तंजौर गणेश', price: 12499, originalPrice: null, rating: 4.9, reviews: 84, style: 'Tanjore', material: 'Brass Frame', badge: null, featured: true, width: '18 × 24 in', color: 'Gold & lacquer', description: 'Gilded Tanjore-style Ganesha with gold foil and semi-precious stones, brass frame.', imageSeed: 'art3', hoverSeed: 'art3b', hi: 'Gold foil & gem stones' },
  { id: 'ar-4', category: 'artwork', name: 'Monsoon Mist Print', hindi: 'मानसून प्रिंट', price: 2299, originalPrice: 2899, rating: 4.6, reviews: 197, style: 'Minimal Modern', material: 'Paper', badge: null, featured: false, width: '24 × 36 in', color: 'Deckled edge', description: 'Giclée print of monsoon mist over a ghat, hand-deckled, in a slim frame.', imageSeed: 'art4', hoverSeed: 'art4b', hi: 'Archival giclée print' },
  { id: 'ar-5', category: 'artwork', name: 'Pichwai Lotus Garden', hindi: 'पिछवाई कमल', price: 8999, originalPrice: 10999, rating: 4.8, reviews: 56, style: 'Tanjore', material: 'Canvas', badge: 'Hot Deal', featured: false, width: '30 × 40 in', color: 'Teal & gold leaf', description: 'Contemporary pichwai-inspired lotus garden on canvas with gold leaf accents.', imageSeed: 'art5', hoverSeed: 'art5b', hi: 'Hand-painted in Udaipur' },
  { id: 'ar-6', category: 'artwork', name: 'Warli Folk Set of 3', hindi: 'वारली सेट', price: 5499, originalPrice: 6499, rating: 4.7, reviews: 122, style: 'Warli', material: 'Paper', badge: null, featured: false, width: '3 panels, 24 × 24 in', color: 'Triptych', description: 'A triptych of Warli scenes that continues across three frames.', imageSeed: 'art6', hoverSeed: 'art6b', hi: 'A story across three frames' },
  { id: 'ar-7', category: 'artwork', name: 'Krishna on the Swing', hindi: 'झूले पर कृष्ण', price: 6999, originalPrice: null, rating: 4.9, reviews: 78, style: 'Madhubani', material: 'Canvas', badge: 'Bestseller', featured: true, width: '28 × 40 in', color: 'Verdant greens', description: 'A lush Madhubani of Krishna on a swing, birds and blooms in every spare inch.', imageSeed: 'art7', hoverSeed: 'art7b', hi: 'Fine-line Mithila craft' },
  { id: 'ar-8', category: 'artwork', name: 'Line Study — Vase', hindi: 'रेखा अध्ययन', price: 1899, originalPrice: 2399, rating: 4.4, reviews: 203, style: 'Minimal Modern', material: 'Wood Frame', badge: null, featured: false, width: '18 × 24 in', color: 'Charcoal line', description: 'A single confident line drawing of a vase, museum board, light oak frame.', imageSeed: 'art8', hoverSeed: 'art8b', hi: 'One continuous line' },

  // ---------- Lifestyle & Decor ----------
  { id: 'ls-1', category: 'lifestyle', name: 'Terracotta Planter Trio', hindi: 'टेराकोटा प्लांटर', price: 2799, originalPrice: 3499, rating: 4.6, reviews: 277, style: 'Terracotta', material: 'Clay', badge: 'Bestseller', featured: true, width: '3 sizes', color: 'Unfired clay', description: 'Three terracotta planters in graduated sizes, unglazed, drain holes included.', imageSeed: 'vase1', hoverSeed: 'vase1b', hi: 'Hand-thrown' },
  { id: 'ls-2', category: 'lifestyle', name: 'Brass Diya Cluster', hindi: 'पीतल दीये', price: 1899, originalPrice: 2299, rating: 4.8, reviews: 341, style: 'Brass', material: 'Brass', badge: 'Hot Deal', featured: false, width: 'Set of 5', color: 'Unpolished brass', description: 'A cluster of five hand-beaten brass diyas that catch any light.', imageSeed: 'lamp1', hoverSeed: 'lamp1b', hi: 'Hand-beaten in Moradabad' },
  { id: 'ls-3', category: 'lifestyle', name: 'Rattan Pendant Light', hindi: 'रतन लालटेन', price: 5499, originalPrice: 6899, rating: 4.7, reviews: 164, style: 'Woven', material: 'Rattan', badge: null, featured: true, width: 'Ø 45 cm', color: 'Natural cane', description: 'Hand-woven rattan pendant that pools warm light downwards.', imageSeed: 'lamp2', hoverSeed: 'lamp2b', hi: 'Woven in Kerala' },
  { id: 'ls-4', category: 'lifestyle', name: 'Handblown Glass Vase', hindi: 'हस्तनिर्मित फूलदान', price: 3299, originalPrice: null, rating: 4.5, reviews: 119, style: 'Glass', material: 'Glass', badge: null, featured: false, width: 'H 32 cm', color: 'Smoke grey', description: 'A single handblown vase with a rolling, imperfect rim.', imageSeed: 'vase2', hoverSeed: 'vase2b', hi: 'Blown in Firozabad' },
  { id: 'ls-5', category: 'lifestyle', name: 'Charcoal Incense Burner', hindi: 'अगरबत्ती स्टैंड', price: 1299, originalPrice: 1599, rating: 4.6, reviews: 288, style: 'Ceramic', material: 'Clay', badge: 'Hot Deal', featured: false, width: 'H 18 cm', color: 'Matte charcoal', description: 'A sculptural matte-charcoal incense burner, cool to the touch.', imageSeed: 'ornament1', hoverSeed: 'ornament1b', hi: 'Hand-glazed' },
  { id: 'ls-6', category: 'lifestyle', name: 'Teak Wall Shelf', hindi: 'सागवान शेल्फ़', price: 4299, originalPrice: 5199, rating: 4.7, reviews: 141, style: 'Vintage', material: 'Wood', badge: null, featured: true, width: '90 × 22 cm', color: 'Reclaimed teak', description: 'Reclaimed teak shelf with live edge and hidden fixings.', imageSeed: 'shelf1', hoverSeed: 'shelf1b', hi: 'Reclaimed timber' },
  { id: 'ls-7', category: 'lifestyle', name: 'Siri Table Clock', hindi: 'टेबल क्लॉक', price: 2499, originalPrice: null, rating: 4.4, reviews: 96, style: 'Brass', material: 'Brass', badge: null, featured: false, width: 'H 15 cm', color: 'Brushed brass', description: 'A quiet brushed-brass clock with an inverted Roman face.', imageSeed: 'clock1', hoverSeed: 'clock1b', hi: 'Sweep-quartz movement' },
  { id: 'ls-8', category: 'lifestyle', name: 'Woven Hanging Planter', hindi: 'लटकता प्लांटर', price: 1599, originalPrice: 1999, rating: 4.5, reviews: 176, style: 'Woven', material: 'Rattan', badge: null, featured: false, width: '4-strand macramé', color: 'Natural & teal', description: 'Hand-woven hanging planter with macramé cradle in natural and teal cotton.', imageSeed: 'planter1', hoverSeed: 'planter1b', hi: 'Macramé in Bengal' },

  // ---------- Home Electronics ----------
  { id: 'el-1', category: 'electronics', name: 'WarmGlow Smart Lamp', hindi: 'स्मार्ट लैम्प', price: 7999, originalPrice: 9999, rating: 4.8, reviews: 452, style: 'Smart Lighting', material: 'Matte Metal', badge: 'Bestseller', featured: true, width: 'H 40 cm', color: 'Dusk brass', description: 'Candlelight-warm smart lamp with touch dimming and a circadian routine.', imageSeed: 'elec1', hoverSeed: 'elec1b', hi: 'Wi-Fi + voice assistant' },
  { id: 'el-2', category: 'electronics', name: 'Ultrasonic Aroma Diffuser', hindi: 'अरोमा डिफ्यूज़र', price: 3499, originalPrice: 4299, rating: 4.6, reviews: 601, style: 'Ambient', material: 'Fabric', badge: 'Hot Deal', featured: false, width: '300 ml tank', color: 'Sand stone', description: 'Whisper-quiet ultrasonic diffuser with warm amber light and auto shut-off.', imageSeed: 'elec2', hoverSeed: 'elec2b', hi: '7-hour runtime' },
  { id: 'el-3', category: 'electronics', name: 'Reed Smart Speaker', hindi: 'स्मार्ट स्पीकर', price: 12499, originalPrice: 14999, rating: 4.7, reviews: 233, style: 'Audio', material: 'Fabric', badge: null, featured: true, width: 'Ø 18 cm', color: 'Oat & brass', description: 'A fabric-wrapped smart speaker tuned warm, with brass mesh top.', imageSeed: 'elec3', hoverSeed: 'elec3b', hi: 'Room-correcting EQ' },
  { id: 'el-4', category: 'electronics', name: 'Sunrise Wake Lamp', hindi: 'सनराइज़ लैम्प', price: 5999, originalPrice: 7299, rating: 4.5, reviews: 187, style: 'Smart Lighting', material: 'Glass', badge: null, featured: false, width: 'H 28 cm', color: 'Opaque glass', description: 'Simulated dawn to ease you awake, sunset to settle you down.', imageSeed: 'elec4', hoverSeed: 'elec4b', hi: '30-minute fade cycle' },
  { id: 'el-5', category: 'electronics', name: 'Orb Ceiling Pendant', hindi: 'ऑर्ब पेंडेंट', price: 9499, originalPrice: 11499, rating: 4.6, reviews: 134, style: 'Smart Lighting', material: 'Recycled Plastic', badge: 'Hot Deal', featured: false, width: 'Ø 36 cm', color: 'Moon white', description: 'Dimmable smart pendant with a soft frosted orb and recycled housing.', imageSeed: 'elec5', hoverSeed: 'elec5b', hi: 'Frosted, glare-free' },
  { id: 'el-6', category: 'electronics', name: 'Flow Tower Fan', hindi: 'टॉवर फ़ैन', price: 7999, originalPrice: 9499, rating: 4.4, reviews: 392, style: 'Compact', material: 'Matte Metal', badge: null, featured: false, width: 'H 105 cm', color: 'Night black', description: 'A near-silent tower fan with a breeze that feels like open air.', imageSeed: 'elec6', hoverSeed: 'elec6b', hi: '27 dB at low' },
  { id: 'el-7', category: 'electronics', name: 'Tabletop Pixel Clock', hindi: 'पिक्सेल घड़ी', price: 4499, originalPrice: 5499, rating: 4.7, reviews: 158, style: 'Ambient', material: 'Glass', badge: null, featured: false, width: '230 × 60 mm', color: 'Amber pixels', description: 'A warm amber pixel clock that also tells weather and time softly.', imageSeed: 'elec7', hoverSeed: 'elec7b', hi: 'A evening-friendly glow' },
  { id: 'el-8', category: 'electronics', name: 'Halide Shower Speaker', hindi: 'शॉवर स्पीकर', price: 2999, originalPrice: 3699, rating: 4.3, reviews: 249, style: 'Audio', material: 'Recycled Plastic', badge: null, featured: false, width: 'IPX7 waterproof', color: 'Steam grey', description: 'Waterproof cylindrical speaker for the steamy moments.', imageSeed: 'elec8', hoverSeed: 'elec8b', hi: '8-hour playtime' },
];

export const HOT_DEALS = PRODUCTS.filter((p) => p.badge === 'Hot Deal');

export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug);

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);

export const getProductsByCategory = (slug) =>
  PRODUCTS.filter((p) => p.category === slug);

export const getRelated = (product, n = 4) =>
  PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, n);

export const BANNER_COPY = {
  heroLine1: 'A home that holds you',
  heroLine2: 'Folk art, textiles & light — crafted for your Aashray.',
  welcomeHindi: 'आश्रय',
};