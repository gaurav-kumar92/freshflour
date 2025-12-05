import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import the Link component
import styles from './CategoryCard.module.css';

// Helper function to convert category name to a URL-friendly slug
const slugify = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

const CategoryCard = ({ category }) => {
  const href = `/category/${slugify(category.name)}`;

  return (
    <Link href={href} className={styles.cardLink}>
      <div className={styles.card}>
        <Image src={category.imageUrl} alt={category.name} width={150} height={150} className={styles.image} />
        <h3 className={styles.name}>{category.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
