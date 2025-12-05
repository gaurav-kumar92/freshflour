
import React from 'react';
import styles from './BestSellers.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../lib/products';

const BestSellers = () => {
  const products = getProducts();

  return (
    <div className={styles.bestSellersContainer}>
      <h2 className={styles.title}>Our best sellers</h2>
      <div className={styles.carousel}>
        {products.map((product) => (
          <Link key={product.slug} href={`/products/${product.slug}`} className={styles.productCard}>
            <Image src={product.image} alt={product.name} width={200} height={200} className={styles.productImage} />
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
