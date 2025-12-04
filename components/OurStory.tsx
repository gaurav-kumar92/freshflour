import React from 'react';
import styles from './OurStory.module.css';
import Image from 'next/image';

const OurStory = () => {
  return (
    <div className={styles.ourStoryContainer}>
      <h2 className={styles.title}>Our Story</h2>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <p>
            It all started with a simple idea: to bring back the tradition of fresh, locally sourced flour. In a world of mass-produced foods, we wanted to reconnect with the wholesome goodness of our grandparents' kitchens. Our journey began in a small family barn, where we milled our first batch of organic wheat. The aroma of freshly ground flour filled the air, and we knew we were onto something special.
          </p>
          <p>
            Today, we've grown, but our commitment to quality and tradition remains the same. We partner with local farmers who share our passion for sustainable agriculture, and we grind our flour in small batches to ensure you always get the freshest product. From our family to yours, we invite you to taste the difference.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <Image src="/our-story-image.jpg" alt="Our Story" width={500} height={350} className={styles.storyImage} />
        </div>
      </div>
    </div>
  );
};

export default OurStory;
