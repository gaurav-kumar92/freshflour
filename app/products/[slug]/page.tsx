
import { getProductBySlug } from '../../../lib/products';
import Image from 'next/image';
import styles from './ProductPage.module.css';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.productPageContainer}>
      <div className={styles.productImageContainer}>
        <Image src={product.image} alt={product.name} width={600} height={600} className={styles.productImage} />
      </div>
      <div className={styles.productDetailsContainer}>
        <h1 className={styles.productName}>{product.name}</h1>
        <p className={styles.productPrice}>{product.price}</p>
        <p className={styles.productDescription}>{product.description}</p>
        <button className={styles.addToCartButton}>Add to Cart</button>
      </div>
    </div>
  );
}
