import { useState } from 'react';
import Link from 'next/link';
import styles from './BurgerMenu.module.css';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.burgerMenu}>
      <button className={`${styles.burgerIcon} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
        <div className={styles.bar1}></div>
        <div className={styles.bar2}></div>
        <div className={styles.bar3}></div>
      </button>
      <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <ul className={styles.list}>
          <li className={styles.item}><Link href="/subscription">Monthly subscription</Link></li>
          <li className={styles.item}><Link href="/category">Category</Link></li>
          <li className={styles.item}><Link href="/contact">Contact</Link></li>
          <li className={styles.item}><Link href="/cart">Cart</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
