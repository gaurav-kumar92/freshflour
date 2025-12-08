import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.css';

export interface Product {
  sku: string;
  name: string;
  price: string;
  image: string;
  Category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  if (!product) return null;

  const { sku, name, price, image: imageUrl } = product;

  // SAFETY CHECK – avoids "undefined" SKU links
  if (!sku) {
    console.error("Product missing SKU:", product);
    return null;
  }

  const productUrl = `/product/${sku}`;

  return (
    <Link href={productUrl} className={styles.productCard}>
      <div className={styles.imageContainer}>
        <Image 
          src={imageUrl} 
          alt={name} 
          width={300} 
          height={300} 
          className={styles.productImage} 
        />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.productName}>{name}</h3>
        <p className={styles.productPrice}>₹{price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
