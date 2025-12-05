'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '../../lib/CartContext';
import styles from './CheckoutPage.module.css';
import Script from 'next/script';

const CheckoutPage = () => {
  const { itemCount, subtotal, clearCart } = useCart();
  const [loadingMessage, setLoadingMessage] = useState('Preparing your order...');

  const makePayment = async () => {
    // Ensure this runs only in the browser
    if (typeof window === 'undefined') return;

    if (itemCount === 0) {
      setLoadingMessage("Your cart is empty. Redirecting...");
      window.location.href = '/cart';
      return;
    }

    try {
      setLoadingMessage('Creating secure payment order...');
      const res = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: subtotal }),
      });

      if (!res.ok) {
        const errorDetails = await res.text();
        throw new Error(`Failed to create order: ${errorDetails}`);
      }

      const order = await res.json();
      setLoadingMessage('Redirecting to payment gateway...');

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        name: "Fresh Flour Co.",
        currency: order.currency,
        amount: order.amount,
        order_id: order.id,
        description: "Thank you for your purchase",
        handler: function (response: any) {
          setLoadingMessage(`Payment successful! Redirecting...`);
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          clearCart();
          window.location.href = '/';
        },
        modal: {
            ondismiss: function() {
                setLoadingMessage("Payment cancelled. Redirecting back to cart...");
                window.location.href = '/cart';
            }
        },
        prefill: {
          name: "Your Name",
          email: "your.email@example.com",
        },
        theme: {
            color: "#38a169"
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Payment error:", error);
      setLoadingMessage(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
    }
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={makePayment}
      />

      <div className={styles.container}>
        <h1 className={styles.title}>Processing Payment</h1>
        <div className={styles.summary}>
            <p>{loadingMessage}</p>
            {/* You can add a spinner component here for better UX */}
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
