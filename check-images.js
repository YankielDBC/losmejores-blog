const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./app/data/realProducts.json', 'utf8'));
data.products.slice(0,5).forEach(p => {
  console.log(p.title.substring(0,40) + ' -> ' + p.image.substring(0,60));
});
