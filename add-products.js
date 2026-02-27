const fs = require('fs');
const products = require('./app/data/products.json');

const newProducts = [
  {asin: 'B08JHCVHTY', title: 'Blink Plus Plan - Security Subscription', price: 11.99, rating: 4.4, reviews: 272077, category: 'smart-home'},
  {asin: 'B0CQMRKRV5', title: 'Amazon Fire TV Stick HD - Streaming Device', price: 34.99, rating: 4.7, reviews: 59626, category: 'streaming'},
  {asin: 'B0BZWRSRWV', title: 'Ring Battery Doorbell - Smart Security', price: 99.99, rating: 4.6, reviews: 43426, category: 'smart-home'},
  {asin: 'B0CFPJYX7P', title: 'Kindle Paperwhite 16GB - E-Reader Premium', price: 159.99, rating: 4.6, reviews: 17188, category: 'kindle'},
  {asin: 'B0F7Z4QZTT', title: 'Fire TV Stick 4K Plus - AI Search', price: 49.99, rating: 4.7, reviews: 103965, category: 'streaming'},
  {asin: 'B0C6W3D4RM', title: 'Fire TV Stick 4K Select - 4K Streaming', price: 39.99, rating: 4.0, reviews: 5056, category: 'streaming'},
  {asin: 'B0DGQVYW2K', title: 'Blink Video Doorbell - Add-On', price: 59.99, rating: 4.2, reviews: 19150, category: 'smart-home'},
  {asin: 'B0CNV9F72P', title: 'Amazon Kindle 16GB - Compact E-Reader', price: 109.99, rating: 4.6, reviews: 14626, category: 'kindle'},
  {asin: 'B0BP9SNVH9', title: 'Fire TV Stick 4K Max - WiFi 6E', price: 59.99, rating: 4.6, reviews: 73692, category: 'streaming'},
  {asin: 'B0DHLSZXQD', title: 'Blink Outdoor 4 - Wireless Camera', price: 79.99, rating: 4.2, reviews: 23443, category: 'smart-home'},
  {asin: 'B09B2SBHQK', title: 'Echo Show 5 - Smart Display', price: 89.99, rating: 4.2, reviews: 64818, category: 'smart-home'},
  {asin: 'B0B6GLQJMV', title: 'Ring Indoor Cam - 1080p Security', price: 49.99, rating: 4.7, reviews: 39404, category: 'smart-home'},
  {asin: 'B0F1BXQNR5', title: 'INSIGNIA 55 inch 4K UHD Fire TV', price: 199.99, rating: 4.3, reviews: 7055, category: 'tv'},
  {asin: 'B09WNK39JN', title: 'Echo Pop - Compact Smart Speaker', price: 39.99, rating: 4.5, reviews: 52000, category: 'smart-home'}
];

const formatted = newProducts.map(p => ({
  asin: p.asin,
  title: p.title + ' - Review 2026',
  slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-') + '-review-2026',
  category: p.category,
  rating: p.rating,
  price: p.price,
  reviews: p.reviews,
  affiliate_link: 'https://www.amazon.com/dp/' + p.asin + '?tag=vh0805-20',
  date: '2026-02-26'
}));

products.products = [...products.products, ...formatted];
fs.writeFileSync('./app/data/products.json', JSON.stringify(products, null, 2));
console.log('Added', formatted.length, 'products. Total:', products.products.length);
