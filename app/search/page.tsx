import ProductCard from "@/features/product/components/ProductCard";
import { getAllProducts } from "@/features/product/services/productService";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: Props) {
  const { q } = await searchParams;
  return {
    title: q ? `Search: "${q}" | MegaMart` : "Search | MegaMart",
    description: q
      ? `Search results for "${q}" on MegaMart.`
      : "Search for products on MegaMart.",
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q: query } = await searchParams;

  const allProducts = await getAllProducts();

  const filteredProducts = query
    ? allProducts.filter(
        (product) =>
          product.name &&
          product.name.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  return (
    <main className="min-h-screen py-10 px-[5%]">
      <h1 className="text-2xl font-bold mb-5 text-center">
        Search Results for:{" "}
        <span className="text-primary">&ldquo;{query}&rdquo;</span>
      </h1>

      {filteredProducts.length > 0 ? (
        <div className="flex flex-wrap justify-center">
          {filteredProducts.map((product, index) => (
            <span key={`${product.id}-${index}`} className="m-5">
              <ProductCard product={product} category={product.category} />
            </span>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">
          No products found matching your search.
        </p>
      )}
    </main>
  );
}
