'use client';

import React from 'react';
import { useCart, CartItem } from '@/lib/CartContext';
import styles from './AddToCartButton.module.css';

// The component expects a product object that matches the shape required by addToCart
// Omit<CartItem, 'quantity'> ensures we get sku, name, price, and image.
type ProductProps = Omit<CartItem, 'quantity'>;

const AddToCartButton = ({ product }: { product: ProductProps }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    // Optional: Add some user feedback, e.g., a toast notification
    alert(`'${product.name}' has been added to your cart!`);
  };

  return (
    <button onClick={handleAddToCart} className={styles.addToCartButton}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
