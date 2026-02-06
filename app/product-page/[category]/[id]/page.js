import axios from "axios";
import dynamic from "next/dynamic";
import categories from "../../../../stores/data.json";
import ProductOverview from "../../../../components/product/ProductOverview";
const ProductDetails = dynamic(
  () => import("../../../../components/product/ProductDetails"),
);
const ProductNotFound = dynamic(
  () => import("../../../../components/product/ProductNotFound"),
);

// Fetch product data
async function getProduct(category, id) {
  const url = categories[category];

  if (!url) {
    return null;
  }

  try {
    const res = await axios.get(url);
    const products = res.data.products;
    return products.find((p) => p.id == id);
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

// Main Component
async function ProductPage({ params }) {
  const { id, category } = await params;
  const fetchedProduct = await getProduct(category, id);

  if (!product) {
    return <ProductNotFound />;
  }

  const product = { ...fetchedProduct, category: category };

  return (
    <main className={`${category} pt-5 mb-24`} id={category}>
      {/* image + info + buttons */}
      <ProductOverview product={product} />

      {/* technical details + description */}
      <ProductDetails product={product} />
    </main>
  );
}

export default ProductPage;
