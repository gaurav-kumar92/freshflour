import React from 'react';
import styles from './Testimonials.module.css';

export interface Testimonial {
  quote: string;
  name: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <div className={styles.testimonialsContainer}>
      <h2 className={styles.title}>What our customers are saying</h2>
      <div className={styles.testimonialsGrid}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={styles.testimonialCard}>
            <p className={styles.quote}>"{testimonial.quote}"</p>
            <div className={styles.customerInfo}>
              <span className={styles.customerName}>{testimonial.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
