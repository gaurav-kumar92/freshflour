'use client';

import React from 'react';
import { useCart } from '../../lib/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CartPage.module.css';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, itemCount, clearCart } = useCart();

  // Ensure price is a number for all calculations
  const getSafePrice = (price: string | number) => {
      if (typeof price === 'number') return price;
      // Remove the dollar sign and convert to a float
      return parseFloat(price.replace(/[^0-9.-]+/g,""));
  }

  const subtotal = items.reduce((total, item) => total + getSafePrice(item.price) * item.quantity, 0);

  if (itemCount === 0) {
    return (
      <div className={styles.emptyCartContainer}>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link href="/" className={styles.continueShoppingButton}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>Your Shopping Cart</h1>
      <div className={styles.cartLayout}>
        <div className={styles.cartItems}>
          {items.map(item => {
            const safePrice = getSafePrice(item.price);
            return (
              <div key={item.sku} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <Image src={item.image} alt={item.name} width={100} height={100} />
                </div>
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemSku}>SKU: {item.sku}</p>
                  <p className={styles.itemPrice}>₹{safePrice.toFixed(2)}</p>
                </div>
                <div className={styles.itemActions}>
                   <div className={styles.quantityControl}>
                      <button onClick={() => updateQuantity(item.sku, item.quantity - 1)}><FaMinus /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.sku, item.quantity + 1)}><FaPlus /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.sku)} className={styles.removeButton}><FaTrash /></button>
                </div>
                <div className={styles.itemTotal}>
                  <p>{(safePrice * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.cartSummary}>
            <h2>Order Summary</h2>
            <div className={styles.summaryLine}>
                <span>Subtotal ({itemCount} items)</span>
                <span>{subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryLine}>
                <span>Shipping</span>
                <span>Free</span>
            </div>
            <div className={`${styles.summaryLine} ${styles.summaryTotal}`}>
                <span>Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutButton}>Proceed to Checkout</button>
            <button onClick={clearCart} className={styles.clearCartButton}>Clear Cart</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
