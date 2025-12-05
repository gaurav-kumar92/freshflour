import React from 'react';
import styles from './BestSellers.module.css';
import ProductCard from './ProductCard'; // Import the new reusable component
import type { Product } from './ProductCard'; // Import the Product type

interface BestSellersProps {
  products: Product[];
}

const BestSellers: React.FC<BestSellersProps> = ({ products }) => {
  // If there are no products, don't render the component
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className={styles.bestSellersContainer}>
      <h2 className={styles.title}>Our best sellers</h2>
      <div className={styles.carousel}>
        {products.map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
