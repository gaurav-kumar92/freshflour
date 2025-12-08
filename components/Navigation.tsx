'use client';

import { useState } from 'react';
import Link from 'next/link';
import BurgerMenu from './BurgerMenu';
import CategoryDropdown from './CategoryDropdown'; // Import the new component
import styles from './Navigation.module.css';

const Navigation = () => { // Removed children prop as it's not used
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navigation}>
      {/* Desktop Links */}
      <div className={styles.desktopLinks}>
        <Link href="/subscription">Monthly subscription</Link>
        <CategoryDropdown /> {/* Replace the static link */}
        <Link href="/contact">Contact</Link>
      </div>

      {/* Mobile Menu */}
      <div className={styles.mobileMenuContainer}>
        <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        {isOpen && (
          <div className={styles.mobileLinks}>
            <Link href="/subscription">Monthly subscription</Link>
            <CategoryDropdown /> {/* Replace the static link */}
            <Link href="/contact">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
