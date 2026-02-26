# Robots.txt - LosMejores.blog
# https://losmejores.blog

User-agent: *
Allow: /
Allow: /category/
Allow: /reviews/

# Sitemap
Sitemap: https://losmejores.blog/sitemap.xml

# Disallow admin/private
Disallow: /api/
Disallow: /_next/
Disallow: /*.json$
Disallow: /*.js$

# Crawl-delay (gentle)
Crawl-delay: 1

# Googlebot specific
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Other bots
User-agent: Bingbot
Allow: /
Crawl-delay: 1
