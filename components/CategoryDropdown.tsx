'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './CategoryDropdown.module.css';
import { FaChevronDown } from 'react-icons/fa';

const slugify = (text: string) => {
    if (!text) return '';
    return text.toLowerCase().replace(/\s+/g, '-');
};

// Using a hardcoded list as a placeholder
const categories = [
    "All-Purpose Flour",
    "Whole Wheat Flour",
    "Bread Flour",
    "Cake Flour",
    "Gluten-Free Flour"
];

export default function CategoryDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    // Correctly handle mouse enter and leave to toggle the dropdown
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
                    {categories.map(category => (
                        <Link 
                            key={category} 
                            href={`/category/${slugify(category)}`}
                            className={styles.dropdownItem}
                        >
                            {category}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
