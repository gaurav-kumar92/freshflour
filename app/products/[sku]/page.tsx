import React from 'react';
import styles from './ProductPage.module.css';
import Image from 'next/image';
import { getProductBySku, getAllProductSkus } from '../../../lib/googlesheets';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import AddToCartButton from './AddToCartButton'; // Import the new client component

const SPREADSHEET_ID = '1dXQWUBw02vD5x57m-c6rGEibuN_28qK-x7Qm84Y3034';

function isValidSku(item: any): item is { sku: string } {
  return item && typeof item.sku === 'string' && item.sku.length > 0;
}

export async function generateStaticParams() {
  const skus = await getAllProductSkus(SPREADSHEET_ID);
  return skus.filter(isValidSku).map(({ sku }) => ({ sku }));
}

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={styles.starRating}>
      {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
      {halfStar && <FaStarHalfAlt key="half" />}
      {[...Array(emptyStars)].map((_, i) => <FaStar key={`empty-${i}`} color="#e4e5e9" />)}
    </div>
  );
};

const ProductPage = async (props: { params: { sku: string } }) => {
  const { sku } = await props.params;
  const product = await getProductBySku(SPREADSHEET_ID, sku);

  if (!product) {
    return <p>Product not found.</p>;
  }

  const productForCart = {
    sku: product.sku,
    name: product.name,
    price: product.price,
    image: product.image,
  };

  return (
    <div className={styles.productContainer}>
      <div className={styles.imageColumn}>
        <Image src={product.image} alt={product.name} width={500} height={500} className={styles.productImage} />
      </div>
      <div className={styles.detailsColumn}>
        <h1 className={styles.productTitle}>{product.name}</h1>
        <div className={styles.ratingContainer}>
          {renderStars(product.rating)}
          <span className={styles.reviewCount}>({product.review} reviews)</span>
        </div>
        <p className={styles.productPrice}> ₹{product.price}</p>
        <div className={styles.productDescription}>
          <p>{product.description}</p>
          <p><strong>Weight:</strong> {product.weight}</p>
        </div>
        {/* Replace the old button with our new interactive component */}
        <AddToCartButton product={productForCart} inStock={product.inStock} />
      </div>
    </div>
  );
};

export default ProductPage;
