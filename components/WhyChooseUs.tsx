import React from 'react';
import styles from './WhyChooseUs.module.css';
import { FaLeaf, FaTruck, FaAward } from 'react-icons/fa';

const features = [
  {
    icon: <FaLeaf />,
    title: '100% Organic & Natural',
    description: 'Our flour is sourced from the finest organic farms, ensuring you get the purest product possible.',
  },
  {
    icon: <FaTruck />,
    title: 'Fast & Fresh Delivery',
    description: 'We grind our flour fresh and deliver it to your door, so you can enjoy the best taste and nutrition.',
  },
  {
    icon: <FaAward />,
    title: 'Award-Winning Quality',
    description: 'Our commitment to quality has been recognized by industry experts and loved by bakers everywhere.',
  },
];

const WhyChooseUs = () => {
  return (
    <div className={styles.whyChooseUsContainer}>
      <h2 className={styles.title}>Why choose us?</h2>
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <div className={styles.featureIcon}>{feature.icon}</div>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
