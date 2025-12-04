import React from 'react';
import styles from './Header.module.css';
import Navigation from './Navigation';
import Logo from './Logo'; // Import the Logo component

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo /> 
      <Navigation />
    </header>
  );
};

export default Header;
