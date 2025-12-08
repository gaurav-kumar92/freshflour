'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './CategoryDropdown.module.css';
import { FaChevronDown } from 'react-icons/fa';

const slugify = (text: string) => {
    if (!text) return '';
    return text.toLowerCase().replace(/\s+/g, '-');
};

export default function CategoryDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                setError(err.message);
                console.error(err);
            }
        };

        fetchCategories();
    }, []);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div 
            className={styles.dropdown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className={styles.dropdownToggle}>
                Categories <FaChevronDown size="0.8em" />
            </button>
            {isOpen && (
                <div className={styles.dropdownMenu}>
                    {error && <p className={styles.error}>{error}</p>}
                    {categories.length > 0 ? (
                        categories.map(category => (
                            <Link 
                                key={category} 
                                href={`/category/${slugify(category)}`}
                                className={styles.dropdownItem}
                            >
                                {category}
                            </Link>
                        ))
                    ) : (
                        !error && <p className={styles.dropdownItem}>Loading...</p>
                    )}
                </div>
            )}
        </div>
    );
}
