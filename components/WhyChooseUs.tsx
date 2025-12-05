import React from 'react';
import styles from './WhyChooseUs.module.css';
import Icon, { IconName } from './Icon';

export interface Feature {
  icon: IconName;
  title: string;
  description: string;
}

interface WhyChooseUsProps {
  features: Feature[];
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ features }) => {
  return (
    <div className={styles.whyChooseUsContainer}>
      <h2 className={styles.title}>Why choose us?</h2>
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Icon name={feature.icon} />
            </div>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
