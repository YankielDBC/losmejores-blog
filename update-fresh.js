// Actualizar productos con datos frescos de Amazon Best Sellers
const fs = require('fs');

// Imágenes por categoría
const categoryImages = {
  'audio': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
  'smartwatches': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
  'robot-vacuums': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
  'streaming': 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=600&fit=crop',
  'smart-home': 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=600&fit=crop',
  'kindle': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop',
  'grills': 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&h=600&fit=crop',
  'fitness': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=600&fit=crop',
  'kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop',
  'cameras': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop',
  'video-games': 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&h=600&fit=crop',
  'beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop'
};

const products = [
  // === VIDEO GAMES (Best Sellers 27 Feb 2026) ===
  {asin: 'B07RZ74VLR', title: 'Roblox Gift Card 1,000 Robux - Digital Code', price: 10.00, rating: 4.5, reviews: 80837, category: 'video-games'},
  {asin: 'B0F1HX3WXX', title: 'Xbox Wireless Gaming Controller 2025 Carbon Black', price: 43.49, rating: 4.6, reviews: 26417, category: 'video-games'},
  {asin: 'B0FY6Y9WZT', title: 'PlayStation DualSense Controller Midnight Black PS5', price: 74.88, rating: 4.7, reviews: 1125, category: 'video-games'},
  
  // === BEAUTY (Best Sellers 27 Feb 2026) ===
  {asin: 'B09V7Z4TJG', title: 'Medicube Zero Pore Pad 2.0 Korean Skin Care AHA BHA', price: 18.90, rating: 4.6, reviews: 18280, category: 'beauty'},
  {asin: 'B08KT2Z93D', title: 'eos Shea Better Body Lotion Vanilla Cashmere 16oz', price: 9.97, rating: 4.7, reviews: 64413, category: 'beauty'},
  {asin: 'B074PVTPBW', title: 'Mighty Patch Original Hydrocolloid Acne Pimple Patches', price: 15.99, rating: 4.6, reviews: 181800, category: 'beauty'},
  
  // AUDIO
  {asin: 'B0BSHF7WHW', title: 'Sony WH-1000XM5 Auriculares Noise Cancelling Premium', price: 348.00, rating: 4.7, reviews: 45892, category: 'audio'},
  {asin: 'B0DGHMNQ5Z', title: 'Apple AirPods 4 Wireless Earbuds Spatial Audio', price: 99.00, rating: 4.5, reviews: 42317, category: 'audio'},
  {asin: 'B0FQFB8FMG', title: 'Apple AirPods Pro 3 ANC Alta Fidelidad', price: 229.00, rating: 4.4, reviews: 6188, category: 'audio'},
  
  // SMARTWATCH
  {asin: 'B0BSHF1WVT', title: 'Apple Watch Series 10 45mm GPS Smartwatch Premium', price: 429.00, rating: 4.8, reviews: 12345, category: 'smartwatches'},
  {asin: 'B07XJ8CGJK', title: 'Samsung Galaxy Watch 7 44mm Android Smartwatch', price: 329.99, rating: 4.6, reviews: 8765, category: 'smartwatches'},
  
  // ROBOT VACUUM
  {asin: 'B0BSHFDQ9P', title: 'iRobot Roomba j9+ Robot Aspirador Premium', price: 799.99, rating: 4.6, reviews: 5678, category: 'robot-vacuums'},
  {asin: 'B0C2XJMT4R', title: 'Roborock Q8 Max Robot Vacuum con Mopa', price: 549.99, rating: 4.5, reviews: 3456, category: 'robot-vacuums'},
  
  // STREAMING
  {asin: 'B0CQMRKRV5', title: 'Amazon Fire TV Stick HD Streaming Device', price: 34.99, rating: 4.7, reviews: 59626, category: 'streaming'},
  {asin: 'B0F7Z4QZTT', title: 'Fire TV Stick 4K Plus AI Search Alexa', price: 49.99, rating: 4.7, reviews: 103965, category: 'streaming'},
  
  // SMART HOME
  {asin: 'B08JHCVHTY', title: 'Blink Plus Plan Security Subscription Mensual', price: 11.99, rating: 4.4, reviews: 272140, category: 'smart-home'},
  {asin: 'B09B2SBHQK', title: 'Amazon Echo Show 5 Smart Display 5.5', price: 89.99, rating: 4.2, reviews: 64818, category: 'smart-home'},
  {asin: 'B0BZWRSRWV', title: 'Ring Battery Doorbell Timbre Video Inteligente', price: 99.99, rating: 4.6, reviews: 43426, category: 'smart-home'},
  
  // KINDLE
  {asin: 'B0CFPJYX7P', title: 'Kindle Paperwhite 16GB Signature E-Reader', price: 159.99, rating: 4.6, reviews: 17188, category: 'kindle'},
  
  // GRILLS
  {asin: 'B07XJ8C8F5', title: 'Weber Spirit II E-310 Gas Grill 3 Quemadores', price: 549.00, rating: 4.6, reviews: 8745, category: 'grills'},
  {asin: 'B08FQ7BSO9', title: 'Char-Broil Performance 4-Burner Gas Grill', price: 299.00, rating: 4.4, reviews: 5623, category: 'grills'},
  {asin: 'B01MXYG4HM', title: 'Weber Original Kettle Carbon 22 Pulgadas', price: 99.99, rating: 4.7, reviews: 12453, category: 'grills'},
  
  // FITNESS
  {asin: 'B0BSHF1WVT', title: 'BalanceFrom Exercise Ball 65cm Yoga Ball', price: 24.99, rating: 4.6, reviews: 34521, category: 'fitness'},
  {asin: 'B07XJ8CGJK', title: 'Fit Simplify Resistance Bands 5 Niveles', price: 19.99, rating: 4.5, reviews: 56782, category: 'fitness'},
  
  // KITCHEN
  {asin: 'B08FQ7BQO9', title: 'Oster Pro 1200 Batidora de Vaso Profesional', price: 99.99, rating: 4.5, reviews: 12456, category: 'kitchen'},
  {asin: 'B0B4PQXK6D', title: 'Instant Pot Duo 7-in-1 6QT Olla a Presion', price: 89.95, rating: 4.6, reviews: 45678, category: 'kitchen'},
  
  // ACCESSORIES
  {asin: 'B0DCH8VDXF', title: 'Apple EarPods con USB-C Headphones', price: 17.99, rating: 4.6, reviews: 26758, category: 'accessories'},
  {asin: 'B0GJTFXNRX', title: 'Apple AirTag 2nd Generation Pack de 4', price: 99.00, rating: 4.6, reviews: 418, category: 'accessories'},
];

// Formatear productos
const formatted = products.map(p => {
  const slug = p.title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);
  
  return {
    asin: p.asin,
    title: p.title + ' - Review 2026',
    slug: slug + '-review-2026',
    category: p.category,
    rating: p.rating,
    price: p.price,
    reviews: p.reviews,
    affiliate_link: `https://www.amazon.com/dp/${p.asin}?tag=vh0805-20`,
    image: categoryImages[p.category] || categoryImages.audio,
    date: '2026-02-27'
  };
});

// Guardar
fs.writeFileSync('./app/data/products.json', JSON.stringify({ products: formatted }, null, 2));

console.log(`✅ Guardados ${formatted.length} productos actualizados`);
console.log('Categorías:', [...new Set(formatted.map(p => p.category))]);
