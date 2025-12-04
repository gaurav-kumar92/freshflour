import React from 'react';
import styles from './Testimonials.module.css';
import Image from 'next/image';

const testimonials = [
  {
    quote: 'The quality of this flour is unmatched. My bread has never tasted better!',
    name: 'Jane Doe',
    image: '/profile1.jpg',
  },
  {
    quote: 'Fast delivery and incredibly fresh flour. I am a customer for life.',
    name: 'John Smith',
    image: '/profile2.jpg',
  },
  {
    quote: 'I love the variety of flours available. The spelt flour is my new favorite!',
    name: 'Emily Johnson',
    image: '/profile3.jpg',
  },
];

const Testimonials = () => {
  return (
    <div className={styles.testimonialsContainer}>
      <h2 className={styles.title}>What our customers are saying</h2>
      <div className={styles.testimonialsGrid}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={styles.testimonialCard}>
            <p className={styles.quote}>"{testimonial.quote}"</p>
            <div className={styles.customerInfo}>
              <Image src={testimonial.image} alt={testimonial.name} width={50} height={50} className={styles.customerImage} />
              <span className={styles.customerName}>{testimonial.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
