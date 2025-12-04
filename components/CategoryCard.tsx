import React from 'react';
import Image from 'next/image';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ category }) => {
  return (
    <div className={styles.card}>
      <Image src={category.imageUrl} alt={category.name} width={150} height={150} className={styles.image} />
      <h3 className={styles.name}>{category.name}</h3>
    </div>
  );
};

export default CategoryCard;
