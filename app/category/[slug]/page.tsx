
import React from 'react';
import { getSheetData } from '@/lib/googlesheets';
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
        const sheetId = process.env.GOOGLE_SHEET_ID;
        if (!sheetId) {
            throw new Error("Google Sheet ID is not configured.");
        }
        const data = await getSheetData(sheetId, "Products");
        if (data) {
            const header = data.shift() || [];
            const productsData = data.map(row => {
                let product: any = {};
                header.forEach((key, index) => {
                    product[key.toLowerCase()] = row[index];
                });
                return product as Product;
            });

            products = productsData.filter((p: Product) => 
                p.Category && p.Category.toLowerCase().replace(/\s+/g, '-') === slug
            );
        }
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
                        <ProductCard key={product.sku} product={product} />
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
        const sheetId = process.env.GOOGLE_SHEET_ID;
        if (!sheetId) {
            throw new Error("Google Sheet ID is not configured.");
        }
        const data = await getSheetData(sheetId, "Categories!A:A");
        if (data) {
            const categories = data.flat().map(String);
        
            return categories.map(category => ({
                slug: category.toLowerCase().replace(/\s+/g, '-'),
            }));
        } 
        return [];
    } catch (error) {
        console.error("Could not generate static params:", error);
        // Return an empty array if fetching fails, so the build doesn't break
        return [];
    }
}
