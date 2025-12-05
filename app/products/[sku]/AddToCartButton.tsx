'use client';

import React from 'react';
import styles from './ProductPage.module.css';
import { useCart, CartItem } from '../../../lib/CartContext';

// We only need a subset of the product details for the cart
interface AddToCartProps {
    product: Omit<CartItem, 'quantity'>;
    inStock: boolean;
}

const AddToCartButton: React.FC<AddToCartProps> = ({ product, inStock }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (inStock) {
            addToCart(product);
            // Optional: Add some user feedback, e.g., a toast notification
            console.log(`${product.name} added to cart!`);
        }
    };

    return (
        <button 
            onClick={handleAddToCart} 
            className={inStock ? styles.addToCartButton : styles.outOfStockButton} 
            disabled={!inStock}
        >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
    );
};

export default AddToCartButton;
