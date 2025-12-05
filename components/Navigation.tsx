
'use client';

import { useState } from 'react';
import Link from 'next/link';
import BurgerMenu from './BurgerMenu';
import styles from './Navigation.module.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navigation}>
      <div className={styles.desktopLinks}>
        <Link href="/subscription">Monthly subscription</Link>
        <Link href="/category">Category</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <div className={styles.mobileLinks}>
          <Link href="/subscription">Monthly subscription</Link>
          <Link href="/category">Category</Link>
          <Link href="/contact">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
