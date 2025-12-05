import products from '../../../../data/products.json';
import styles from './ProductPage.module.css';
import Image from 'next/image';

export async function generateStaticParams() {
  return products.map(product => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={product.image} alt={product.name} width={500} height={500} className={styles.image} />
      </div>
      <div className={styles.detailsContainer}>
        <h1 className={styles.name}>{product.name}</h1>
        <p className={styles.price}>{product.price}</p>
        <p className={styles.description}>
          This is a great quality product. It is organic and made with the finest ingredients. 
          Perfect for all your baking needs. We are sure you will love it.
        </p>
        <button className={styles.addToCartButton}>Add to Cart</button>
      </div>
    </div>
  );
}
