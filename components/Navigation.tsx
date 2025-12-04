
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
        <Link href="/cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        </Link>
      </div>
      <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <div className={styles.mobileLinks}>
          <Link href="/subscription">Monthly subscription</Link>
          <Link href="/category">Category</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
