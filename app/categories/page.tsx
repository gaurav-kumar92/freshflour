import React from 'react';
import Link from 'next/link';
import { getStoreCategories } from '../../lib/googlesheets';
import styles from './CategoriesPage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Categories - Fresh Flour Co.',
    description: 'Browse all product categories at Fresh Flour Co.',
};

const slugify = (text: string) => {
    if (!text) return '';
    return text.toLowerCase().replace(/\s+/g, '-');
};

export default async function CategoriesPage() {
    let categories: string[] = [];
    let error: string | null = null;

    try {
        const sheetId = process.env.GOOGLE_SHEET_ID;
        if (!sheetId) {
            throw new Error("Google Sheet ID is not configured.");
        }
        categories = await getStoreCategories(sheetId);
    } catch (e) {
        console.error("Failed to fetch categories:", e);
        error = "Could not load categories. Please try again later.";
    }

    if (error) {
        return <div className={styles.loading}>{error}</div>;
    }

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>All Categories</h1>
            {categories.length > 0 ? (
                <div className={styles.categoryGrid}>
                    {categories.map(category => (
                        <Link key={category} href={`/category/${slugify(category)}`} className={styles.categoryCard}>
                            <h2 className={styles.categoryName}>{category}</h2>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className={styles.loading}>No categories found.</p>
            )}
        </div>
    );
}
