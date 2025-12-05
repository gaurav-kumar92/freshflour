import React from 'react';
import styles from './OurStory.module.css';
import Image from 'next/image';

interface OurStoryProps {
  story: string;
}

const OurStory: React.FC<OurStoryProps> = ({ story }) => {
  return (
    <div className={styles.ourStoryContainer}>
      <h2 className={styles.title}>Our Story</h2>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          {story.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className={styles.imageContainer}>
          <Image src="https://placehold.co/500x350/F7F4F2/333333?text=Our%20Story" alt="Our Story" width={500} height={350} className={styles.storyImage} />
        </div>
      </div>
    </div>
  );
};

export default OurStory;
