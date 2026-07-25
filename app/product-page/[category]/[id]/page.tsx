import { Metadata } from "next";
import dynamic from "next/dynamic";
import ProductOverview from "@/features/product/components/ProductOverview";
import { getProduct } from "@/features/product/services/productService";

const ProductDetails = dynamic(
  () => import("@/features/product/components/ProductDetails"),
);
const ProductNotFound = dynamic(
  () => import("@/features/product/components/ProductNotFound"),
);

// Generate Dynamic SEO Metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const { id, category } = await params;
  const product = await getProduct(category, id);

  if (!product) {
    return {
      title: "Product Not Found | MegaMart",
    };
  }

  return {
    title: `${product.name} | MegaMart`,
    description: product.description || `Buy ${product.name} on MegaMart with the best prices.`,
    openGraph: {
      title: `${product.name} | MegaMart`,
      description: product.description || `Buy ${product.name} on MegaMart with the best prices.`,
      images: [product.pic],
    },
  };
}

// Main Component
async function ProductPage({ params }) {
  const { id, category } = await params;
  const fetchedProduct = await getProduct(category, id);

  if (!fetchedProduct) {
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
