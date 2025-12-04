import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>The Finest Flours, Delivered Fresh</h1>
        <p className={styles.subtitle}>Your secret ingredient for perfect taste</p><br></br><br></br><br></br><br></br>
        <button className={styles.ctaButton}>Shop Now</button>
      </div>
    </div>
  );
};

export default Hero;
