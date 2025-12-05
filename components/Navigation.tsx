'use client';

import { useState } from 'react';
import Link from 'next/link';
import BurgerMenu from './BurgerMenu';
import styles from './Navigation.module.css';

const Navigation = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navigation}>
      {/* Desktop Links - includes the server component passed as a child */}
      <div className={styles.desktopLinks}>
        <Link href="/subscription">Monthly subscription</Link>
        <Link href="/categories">Categories</Link>
        <Link href="/contact">Contact</Link>
      </div>

      {/* Mobile Menu */}
      <div className={styles.mobileMenuContainer}>
        <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        {isOpen && (
          <div className={styles.mobileLinks}>
            <Link href="/subscription">Monthly subscription</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/contact">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
