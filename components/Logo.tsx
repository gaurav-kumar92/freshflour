import React from 'react';
import styles from './Logo.module.css';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>
      Fresh Flour
    </Link>
  );
};

export default Logo;
