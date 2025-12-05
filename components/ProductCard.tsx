import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.css';

// Defining the Product interface here so the component is self-contained
export interface Product {
  sku: string;
  name: string;
  price: string;
  image: string;
  Category: string;
  Description: string;
  // Add any other relevant product properties here
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Handle cases where product might be null or undefined
  if (!product) {
    return null;
  }

  const { sku, name, price, image: imageUrl } = product;

  // A more robust way to link to a product details page
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
