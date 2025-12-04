import React from 'react';
import styles from './BestSellers.module.css';
import Image from 'next/image';

const bestSellers = [
  {
    name: 'Organic All-Purpose Flour',
    image: '/flour1.jpg',
    price: '$5.99',
  },
  {
    name: 'Whole Wheat Flour',
    image: '/flour2.jpg',
    price: '$4.99',
  },
  {
    name: 'Gluten-Free Flour Blend',
    image: '/flour3.jpg',
    price: '$7.99',
  },
  {
    name: 'Artisan Bread Flour',
    image: '/flour4.jpg',
    price: '$6.49',
  },
  {
    name: 'Organic Coconut Flour',
    image: '/flour5.jpg',
    price: '$8.99',
  },
];

const BestSellers = () => {
  return (
    <div className={styles.bestSellersContainer}>
      <h2 className={styles.title}>Our best sellers</h2>
      <div className={styles.carousel}>
        {bestSellers.map((product, index) => (
          <div key={index} className={styles.productCard}>
            <Image src={product.image} alt={product.name} width={200} height={200} className={styles.productImage} />
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
