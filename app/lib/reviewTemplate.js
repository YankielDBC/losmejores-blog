/**
 * Amazon Affiliate Review Template
 * Generated automatically by Kahel Agent System
 */

export const reviewTemplate = {
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: '{{title}}',
    image: '{{images}}',
    description: '{{description}}',
    offers: {
      '@type': 'Offer',
      price: '{{price}}',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '{{rating}}',
      reviewCount: '{{reviewCount}}'
    }
  },
  
  sections: [
    {
      id: 'hero',
      title: '{{title}}',
      subtitle: 'Review Completa {{year}}',
      image: '{{mainImage}}',
      cta: {
        text: 'Ver Precio en Amazon',
        url: '{{affiliateLink}}',
        style: 'primary'
      }
    },
    {
      id: 'specs',
      title: 'Especificaciones Técnicas',
      type: 'table',
      data: '{{specs}}'
    },
    {
      id: 'features',
      title: 'Características Principales',
      type: 'bullet-list',
      items: '{{features}}'
    },
    {
      id: 'pros-cons',
      title: 'Pros y Contras',
      type: 'split',
      pros: '{{pros}}',
      cons: '{{cons}}'
    },
    {
      id: 'comparison',
      title: 'Comparación con Competidores',
      type: 'table',
      competitors: '{{comparison}}'
    },
    {
      id: 'faq',
      title: 'Preguntas Frecuentes (FAQ)',
      type: 'accordion',
      questions: '{{faq}}'
    },
    {
      id: 'verdict',
      title: 'Veredicto Final',
      type: 'callout',
      score: '{{score}}',
      conclusion: '{{conclusion}}'
    }
  ],
  
  affiliateDisclosure: 'Como Asociado de Amazon, gano de compras calificadas.',
  
  // Generar enlace affiliate
  generateAffiliateLink: (asin, tag = 'vh0805-20') => {
    return `https://www.amazon.com/dp/${asin}?tag=${tag}`;
  },
  
  // Generar slug desde titulo
  generateSlug: (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 60);
  }
};

export default reviewTemplate;