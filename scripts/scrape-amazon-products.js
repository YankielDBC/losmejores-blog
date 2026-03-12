// Script para obtener productos reales de Amazon Best Sellers
// y actualizar realProducts.json

const categories = [
  { name: 'electronics', url: 'https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics' },
  { name: 'cell-phones', url: 'https://www.amazon.com/Best-Sellers-Cell-Phones-Accessories/zgbs/wireless/2811119011' },
  { name: 'computers', url: 'https://www.amazon.com/Best-Sellers-Computers-Accessories/zgbs/computers/541966' },
  { name: 'headphones', url: 'https://www.amazon.com/Best-Sellers-Electronics-Headphones-Earbuds/zgbs/electronics/172541' },
  { name: 'smartwatches', url: 'https://www.amazon.com/Best-Sellers-Wearable-Technology/zgbs/electronics/10048700011' },
  { name: 'video-games', url: 'https://www.amazon.com/Best-Sellers-Video-Game-Consoles-Accessories/zgbs/videogames/7926841011' },
  { name: 'tvs', url: 'https://www.amazon.com/Best-Sellers-Televisions-Video/zgbs/electronics/1266092011' },
  { name: 'cameras', url: 'https://www.amazon.com/Best-Sellers-Camera-Photo-Products/zgbs/electronics/502394' },
  { name: 'home-audio', url: 'https://www.amazon.com/Best-Sellers-Home-Audio-Theater-Products/zgbs/electronics/667846011' },
  { name: 'office', url: 'https://www.amazon.com/Best-Sellers-Office-Electronics/zgbs/electronics/172574' },
];

// ASINs extraídos manualmente de Best Sellers (primeros 30 de Electronics)
const bestsellerProducts = [
  { asin: 'B0DGHMNQ5Z', category: 'audio', title: 'Apple AirPods 4 Wireless Earbuds', price: 99.00, rating: 4.5, reviews: 43525 },
  { asin: 'B0D7FVQ1ZB', category: 'audio', title: 'Apple EarPods Headphones with Lightning Connector', price: 15.96, rating: 4.6, reviews: 27626 },
  { asin: 'B0GJTFXNRX', category: 'electronics', title: 'Apple AirTag (2nd Generation)', price: 29.00, rating: 4.6, reviews: 779 },
  { asin: 'B0FQFB8FMG', category: 'audio', title: 'Apple AirPods Pro 3 Wireless Earbuds', price: 224.00, rating: 4.4, reviews: 6698 },
  { asin: 'B0DZ75TN5F', category: 'electronics', title: 'Apple iPad 11-inch', price: 329.00, rating: 4.7, reviews: 20064 },
  { asin: 'B09PDLBFKY', category: 'electronics', title: 'Surge Protector Power Strip 6 Ft', price: 9.99, rating: 4.6, reviews: 46329 },
  { asin: 'B0D54JZTHY', category: 'electronics', title: 'Apple AirTag (1st Generation) - 4 Pack', price: 64.00, rating: 4.8, reviews: 42556 },
  { asin: 'B0C6W3D4RM', category: 'electronics', title: 'Amazon Fire TV Stick 4K Select', price: 39.99, rating: 4.0, reviews: 5702 },
  { asin: 'B092J8LPWR', category: 'electronics', title: 'Surge Protector Power Strip HANYCONY', price: 11.99, rating: 4.8, reviews: 54986 },
  { asin: 'B0FQF9ZX7P', category: 'smartwatches', title: 'Apple Watch Series 11 GPS 42mm', price: 299.00, rating: 4.8, reviews: 3665 },
  { asin: 'B0F7Z4QZTT', category: 'electronics', title: 'Amazon Fire TV Stick 4K Plus', price: 49.99, rating: 4.7, reviews: 105093 },
  { asin: 'B0CFPJYX7P', category: 'electronics', title: 'Amazon Kindle Paperwhite 16GB', price: 159.99, rating: 4.7, reviews: 17578 },
  { asin: 'B0DXXYS4BJ', category: 'electronics', title: 'Roku Streaming Stick HD', price: 28.30, rating: 4.7, reviews: 15384 },
  { asin: 'B0BQPNMXQV', category: 'audio', title: 'JBL Vibe Beam True Wireless Earbuds', price: 29.95, rating: 4.3, reviews: 35662 },
  { asin: 'B0CQMRKRV5', category: 'electronics', title: 'Amazon Fire TV Stick HD', price: 34.99, rating: 4.7, reviews: 60858 },
  { asin: 'B08R6S1M1K', category: 'electronics', title: 'Wall Charger Surge Protector QINLIANF', price: 9.98, rating: 4.7, reviews: 110134 },
  { asin: 'B00EB4ADQW', category: 'electronics', title: 'FUJIFILM Instax Mini Instant Film Twin Pack', price: 16.98, rating: 4.8, reviews: 110436 },
  { asin: 'B09B8V1LZ3', category: 'electronics', title: 'Amazon Echo Dot', price: 49.99, rating: 4.7, reviews: 185515 },
  { asin: 'B09DT48V16', category: 'audio', title: 'TAGRY Bluetooth Headphones True Wireless Earbuds', price: 25.99, rating: 4.5, reviews: 35000 },
  { asin: 'B0C8PR4W22', category: 'audio', title: 'Beats Studio Pro', price: 169.95, rating: 4.5, reviews: 26190 },
  { asin: 'B0DGQVYW2K', category: 'electronics', title: 'Blink Video Doorbell', price: 59.99, rating: 4.2, reviews: 19942 },
  { asin: 'B0BP9SNVH9', category: 'electronics', title: 'Amazon Fire TV Stick 4K Max', price: 59.99, rating: 4.6, reviews: 74401 },
  { asin: 'B07FW3GTXB', category: 'electronics', title: 'Alex Tech Cord Protector Wire Loom', price: 8.99, rating: 4.7, reviews: 81531 },
  { asin: 'B0FHWKYT89', category: 'audio', title: 'Wireless Earbuds Bluetooth 5.4', price: 19.83, rating: 4.5, reviews: 53826 },
  { asin: 'B0CNV9F72P', category: 'electronics', title: 'Amazon Kindle 16GB', price: 109.99, rating: 4.6, reviews: 15037 },
  { asin: 'B0BLTYNJCK', category: 'electronics', title: 'TESSAN Surge Protector Power Strip', price: 18.97, rating: 4.8, reviews: 13121 },
  { asin: 'B0CZPGX972', category: 'audio', title: 'Beats Solo 4', price: 129.95, rating: 4.6, reviews: 24295 },
  { asin: 'B08JHCVHTY', category: 'electronics', title: 'Blink Plus Plan', price: 11.99, rating: 4.4, reviews: 272775 },
  { asin: 'B0C3HCD34R', category: 'audio', title: 'Soundcore Q20i Hybrid Active Noise Cancelling', price: 39.99, rating: 4.6, reviews: 56324 },
];

// Patrón de URL de imagen de Amazon
function getAmazonImageUrl(asin) {
  return `https://images-na.ssl-images-amazon.com/images/I/${asin}._AC_SL1000_.jpg`;
}

// Generar slug desde título
function generateSlug(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
}

// Convertir productos al formato del archivo
function convertToProductsFormat(products) {
  const today = new Date().toISOString().split('T')[0];
  
  return products.map((p, index) => ({
    asin: p.asin,
    title: p.title,
    slug: `${generateSlug(p.title)}-${index}`,
    category: p.category,
    rating: p.rating,
    price: p.price,
    reviews: p.reviews,
    affiliate_link: `https://www.amazon.com/dp/${p.asin}?tag=vh0805-20`,
    image: getAmazonImageUrl(p.asin),
    date: today
  }));
}

// Verificar si imagen existe en Amazon
function checkImageExists(asin) {
  return new Promise((resolve) => {
    const https = require('https');
    const url = `https://images-na.ssl-images-amazon.com/images/I/${asin}._AC_SL1000_.jpg`;
    
    https.get(url, (res) => {
      resolve({ asin, exists: res.statusCode === 200, statusCode: res.statusCode });
    }).on('error', () => {
      resolve({ asin, exists: false, statusCode: 0 });
    });
  });
}

// Main - verificar imágenes
async function main() {
  console.log('🔍 Verificando imágenes de productos...\n');
  
  const results = await Promise.all(
    bestsellerProducts.map(p => checkImageExists(p.asin))
  );
  
  const existing = results.filter(r => r.exists);
  const missing = results.filter(r => !r.exists);
  
  console.log(`✅ Imágenes encontradas: ${existing.length}`);
  console.log(`❌ Imágenes faltantes: ${missing.length}`);
  
  if (missing.length > 0) {
    console.log('\nASINs sin imagen:');
    missing.forEach(m => console.log(`  ${m.asin}`));
  }
  
  // Generar archivo de productos
  const products = convertToProductsFormat(bestsellerProducts);
  
  console.log('\n📦 Productos convertidos:');
  products.slice(0, 5).forEach(p => {
    console.log(`  - ${p.title}`);
    console.log(`    ASIN: ${p.asin}, Categoría: ${p.category}`);
    console.log(`    Imagen: ${p.image}`);
  });
  
  return products;
}

main().catch(console.error);