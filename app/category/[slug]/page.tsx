'use server';

import React from 'react';
import { getSheetData } from '../../../lib/google-sheets.ts'; // Corrected Relative Path
import ProductCard from '@/components/ProductCard';
import styles from './CategoryPage.module.css';
import { Metadata } from 'next';
import type { Product } from '@/components/ProductCard';

// Revalidate the data every hour
export const revalidate = 3600;

// Helper function to get a display-friendly category name from a slug
function getCategoryNameFromSlug(slug: string): string {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Generate metadata for the page (for SEO and browser tabs)
type Props = {
    params: { slug: string };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryName = getCategoryNameFromSlug(params.slug);
  return {
    title: `${categoryName} - Fresh Flour Co.`,
    description: `Browse our selection of ${categoryName}.`
  };
}

// The main page component
export default async function CategoryPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const categoryName = getCategoryNameFromSlug(slug);

    let products: Product[] = [];
    let error = null;

    try {
        const data = await getSheetData();
        // The filtering logic assumes the 'Category' column in your sheet
        // matches the slugified category name.
        products = data.products.filter(p => 
            p.Category.toLowerCase().replace(/\s+/g, '-') === slug
        );
    } catch (e) {
        console.error("Failed to fetch sheet data:", e);
        error = "Could not load product data. Please try again later.";
    }

    if (error) {
        return <div className={styles.loading}>{error}</div>;
    }

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.categoryTitle}>{categoryName}</h1>
            {products.length > 0 ? (
                <div className={styles.productGrid}>
                    {products.map(product => (
                        <ProductCard key={product.SKU} product={product} />
                    ))}
                </div>
            ) : (
                <p className={styles.loading}>No products found in this category.</p>
            )}
        </div>
    );
}

// Generate static paths for all categories to improve build times and performance
export async function generateStaticParams() {
    try {
        const data = await getSheetData();
        const categories = [...new Set(data.products.map(p => p.Category))];
        
        return categories.map(category => ({
            slug: category.toLowerCase().replace(/\s+/g, '-'),
        }));
    } catch (error) {
        console.error("Could not generate static params:", error);
        // Return an empty array if fetching fails, so the build doesn't break
        return [];
    }
}
