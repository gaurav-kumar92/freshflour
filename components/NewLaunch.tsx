
import React from 'react';
import styles from './NewLaunch.module.css';
import Image from 'next/image';
import Link from 'next/link';

const NewLaunch = () => {
  return (
    <div className={styles.newLaunchContainer}>
      <h2 className={styles.title}>Our new launch</h2>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <Image src="https://placehold.co/400x400/F7F4F2/333333?text=Ancient%20Grain%20Spelt%20Flour" alt="New Flour Launch" width={400} height={400} className={styles.productImage} />
        </div>
        <div className={styles.textContainer}>
          <h3 className={styles.productName}>Ancient Grain Spelt Flour</h3>
          <p className={styles.productDescription}>
            Rediscover the nutty, slightly sweet flavor of spelt, an ancient grain packed with nutrients. Our freshly milled spelt flour is perfect for rustic breads, pancakes, and more. 
          </p>
          <Link href="#" className={styles.ctaButton}>
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewLaunch;
