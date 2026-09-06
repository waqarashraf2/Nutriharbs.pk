import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/products-data';
import ProductClientDetails from './ProductClientDetails';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Dynamic SEO Metadata Generator for every individual Product URL
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | Nutriherbs Pakistan',
      description: 'The requested herbal nutraceutical formula could not be found.',
    };
  }

  const title = product.metaTitle || `${product.title} - Pakistan | Nutriherbs`;
  const description = product.metaDescription || product.description;
  const keywords = product.keywords || ['herbal supplements Pakistan', product.title, 'DRAP certified'];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nutriharbs.versenext.com';

  const imageUrl = product.image.startsWith('http')
    ? product.image
    : `${siteUrl}${product.image}`;

  const canonicalUrl = `${siteUrl}/product/${product.slug}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Nutriherbs Pakistan',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: `${product.title} - Nutriherbs Pakistan`,
          type: 'image/webp',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related Cross-sell products
  const crossSell = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nutriharbs.versenext.com';

  // Full Rich JSON-LD Structured Data Schema for Google Search
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${siteUrl}/product/${product.slug}#product`,
        name: product.title,
        image: [`${siteUrl}${product.image}`],
        description: product.description,
        sku: product.id,
        mpn: product.drapRegNo,
        brand: {
          '@type': 'Brand',
          name: 'Nutriherbs',
        },
        offers: {
          '@type': 'Offer',
          url: `${siteUrl}/product/${product.slug}`,
          priceCurrency: 'PKR',
          price: product.price,
          priceValidUntil: '2028-12-31',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: 'Nutriherbs Pakistan',
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviewsCount,
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${siteUrl}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: product.healthGoal,
            item: `${siteUrl}/#products`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.title,
            item: `${siteUrl}/product/${product.slug}`,
          },
        ],
      },
      ...(product.faqs && product.faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: product.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClientDetails product={product} crossSell={crossSell} />
    </>
  );
}
