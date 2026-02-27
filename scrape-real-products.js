// Real Amazon Scraper - Extrae datos reales de productos
//用法: node scrape-real-products.js

const fs = require('fs');

// Lista de categorías a scrapeear
const categories = [
  { name: 'camaras', url: 'https://www.amazon.com/Best-Sellers-Photo-Camera/zgbs/photography/281407' },
  { name: 'auriculares', url: 'https://www.amazon.com/Best-Sellers-Wireless-Headphones/zgbs/electronics/12097479011' },
  { name: 'smartwatches', url: 'https://www.amazon.com/Best-Sellers-Smart-Watches/zgbs/electronics/5611865011' },
  { name: 'speakers', url: 'https://www.amazon.com/Best-Sellers-Portable-Speakers/zgbs/electronics/12097493011' },
  { name: 'laptops', url: 'https://www.amazon.com/Best-Sellers-Laptop-Computers/zgbs/computers/13887615011' },
  { name: 'tablets', url: 'https://www.amazon.com/Best-Sellers-Tablets/zgbs/computers/13897241011' },
  { name: 'gaming', url: 'https://www.amazon.com/Best-Sellers-Video-Games/zgbs/videogames/468642' },
  { name: 'fitness', url: 'https://www.amazon.com/Best-Sellers-Exercise-Fitness-Equipment/zgbs/sports/6649785011' },
  { name: 'kitchen', url: 'https://www.amazon.com/Best-Sellers-Small-Kitchen-Appliances/zgbs/homegarden/289735' },
  { name: 'grills', url: 'https://www.amazon.com/Best-Sellers-Garden-Outdoor-Grills/zgbs/homegarden/3499782011' },
];

// Simular scraping (en producción usaría puppeteer o web_fetch)
function parseAmazonHTML(html) {
  const products = [];
  
  // Buscar productos en formato: #1/ASIN/title...
  const regex = /#(\d+)\/([A-Z0-9]{10})\/[^[]*\[([^\]]+)\].*?(\d+\.\d+)\s*out of.*?(\d+(?:,\d+)*)\s*stars.*?\$(\d+(?:\.\d+)?)/g;
  
  let match;
  while ((match = regex.exec(html)) !== null && products.length < 15) {
    products.push({
      rank: parseInt(match[1]),
      asin: match[2],
      title: match[3].substring(0, 100),
      rating: parseFloat(match[4]),
      reviews: parseInt(match[5].replace(/,/g, '')),
      price: parseFloat(match[6])
    });
  }
  
  return products;
}

// Generar producto formateado para la web
function formatProduct(amazonProduct, category) {
  return {
    asin: amazonProduct.asin,
    title: amazonProduct.title + ' - Review ' + new Date().getFullYear(),
    slug: amazonProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 50) + '-review-' + new Date().getFullYear(),
    category: category.name,
    rating: amazonProduct.rating,
    price: amazonProduct.price,
    reviews: amazonProduct.reviews,
    affiliate_link: `https://www.amazon.com/dp/${amazonProduct.asin}?tag=vh0805-20`,
    image: `https://images.amazon.com/images/I/${amazonProduct.asin}.jpg`, // Placeholder - en realidad scrapeado
    date: new Date().toISOString().split('T')[0]
  };
}

// Obtener categorías scraping
async function scrapeAllCategories() {
  const allProducts = [];
  
  for (const cat of categories) {
    console.log(`Scraping ${cat.name}...`);
    try {
      const response = await fetch(cat.url);
      const html = await response.text();
      const products = parseAmazonHTML(html);
      
      const formatted = products.map(p => formatProduct(p, cat));
      allProducts.push(...formatted);
      
      console.log(`  -> ${products.length} productos`);
    } catch (e) {
      console.log(`  -> Error: ${e.message}`);
    }
  }
  
  return allProducts;
}

// Si se ejecuta directamente
if (require.main === module) {
  scrapeAllCategories().then(products => {
    console.log(`\nTotal: ${products.length} productos`);
    fs.writeFileSync('./real-products.json', JSON.stringify(products, null, 2));
  });
}

module.exports = { scrapeAllCategories, parseAmazonHTML, formatProduct };
