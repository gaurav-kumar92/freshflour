import { getProductBySku, getAllProductSkus } from '@/lib/googlesheets';
import styles from './ProductPage.module.css';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';

// Generate static paths for SSG
export async function generateStaticParams() {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!sheetId) {
    console.error("[build error] GOOGLE_SHEET_ID is not defined.");
    return [];
  }

  try {
    const skus = await getAllProductSkus(sheetId);

    // Filter out empty or invalid SKUs to avoid runtime errors
    return skus
      .filter((item) => item && item.sku && item.sku.trim() !== "")
      .map(({ sku }) => ({ slug: sku }));
  } catch (error) {
    console.error("[build error] Failed to fetch product SKUs:", error);
    return [];
  }
}

// Main Product Page Component
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!sheetId) {
    throw new Error("SERVER ERROR: GOOGLE_SHEET_ID is not configured.");
  }

  const { slug: sku } = await params;


  if (!sku || sku === "undefined") {
    console.error("Invalid slug:", sku);
    notFound();
  }
  

  const product = await getProductBySku(sheetId, sku);

  if (!product) {
    console.warn("No product found for SKU:", sku);
    notFound();
  }

  // Product image fallback
  const productImage = product.image || "/flour3.jpg";

  // Map description safely (if your Sheet column has a different name, update here)
  const descriptionText =
    product.description ||
    product.Description ||
    "Description not available.";

  const productForCart = {
      sku: product.sku,
      name: product.name,
      price: product.price,
      image: productImage
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={productImage}
          alt={product.name || "Product Image"}
          width={500}
          height={500}
          className={styles.image}
        />
      </div>

      <div className={styles.detailsContainer}>
        <h1 className={styles.name}>{product.name || "Product Name Not Available"}</h1>

        <p className={styles.price}>
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(Number(product.price) || 0)}
        </p>

        <p className={styles.description}>{descriptionText}</p>

        <AddToCartButton product={productForCart} />
      </div>
    </div>
  );
}
