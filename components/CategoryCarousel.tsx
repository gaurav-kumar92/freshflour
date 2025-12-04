import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import styles from './CategoryCarousel.module.css';
import CategoryCard from './CategoryCard';

// Define the type for a category
interface Category {
  name: string;
  imageUrl: string;
}

const CategoryCarousel = async () => {
  // Path to the JSON file
  const dataFilePath = path.join(process.cwd(), 'data', 'categories.json');
  
  // Read the JSON file
  const jsonData = await fs.readFile(dataFilePath, 'utf8');
  
  // Parse the JSON data
  const categories: Category[] = JSON.parse(jsonData);

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.title}>Shop by Category</h2>
      <div className={styles.carousel}>
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
