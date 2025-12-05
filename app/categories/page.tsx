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

// Use the hardcoded SPREADSHEET_ID, as the environment variable is not set.
const SPREADSHEET_ID = '1dXQWUBw02vD5x57m-c6rGEibuN_28qK-x7Qm84Y3034';

export default async function CategoriesPage() {
    let categories: string[] = [];
    let error: string | null = null;

    try {
        categories = await getStoreCategories(SPREADSHEET_ID);
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
