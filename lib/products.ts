
export interface Product {
  slug: string;
  name: string;
  description: string;
  image: string;
  price: string;
}

const products: Product[] = [
  {
    slug: 'ancient-grain-spelt-flour',
    name: 'Ancient Grain Spelt Flour',
    description: 'Rediscover the nutty, slightly sweet flavor of spelt, an ancient grain packed with nutrients. Our freshly milled spelt flour is perfect for rustic breads, pancakes, and more.',
    image: 'https://placehold.co/600x600/F7F4F2/333333?text=Spelt+Flour',
    price: '$12.99',
  },
  {
    slug: 'organic-rye-flour',
    name: 'Organic Rye Flour',
    description: 'Perfect for traditional rye breads, our organic rye flour has a deep, hearty flavor that will elevate your baking.',
    image: 'https://placehold.co/600x600/F7F4F2/333333?text=Rye+Flour',
    price: '$10.99',
  },
  {
    slug: 'stone-ground-whole-wheat-flour',
    name: 'Stone-Ground Whole Wheat Flour',
    description: 'Our whole wheat flour is stone-ground to preserve the natural nutrients and flavor of the grain. It\'s ideal for a wide range of recipes, from bread to muffins.',
    image: 'https://placehold.co/600x600/F7F4F2/333333?text=Whole+Wheat',
    price: '$8.99',
  },
  {
    slug: 'gluten-free-all-purpose-flour',
    name: 'Gluten-Free All-Purpose Flour',
    description: 'Our special blend of gluten-free flours is perfect for all your baking needs, providing excellent texture and taste without any of the gluten.',
    image: 'https://placehold.co/600x600/F7F4F2/333333?text=Gluten-Free',
    price: '$14.99',
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
