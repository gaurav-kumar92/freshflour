'use client';

import React from 'react';
import styles from './Header.module.css';
import Navigation from './Navigation';
import Logo from './Logo';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../lib/CartContext';

const Header = () => {
  const { itemCount } = useCart();

  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles.navWrapper}>
        <Navigation />
        <Link href="/cart" className={styles.cartLink}>
          <FaShoppingCart />
          {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
