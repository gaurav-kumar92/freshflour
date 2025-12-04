import React from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; 2024 Fresh Flour. All rights reserved.</p>
        <div className={styles.socialLinks}>
          <Link href="#"><FaFacebook /></Link>
          <Link href="#"><FaInstagram /></Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
