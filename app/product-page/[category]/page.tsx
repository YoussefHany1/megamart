import ProductCard from "@/features/product/components/ProductCard";
import PaginationControls from "@/features/product/components/PaginationControls";
import { getCategoryProducts } from "@/features/product/services/productService";

const PRODUCTS_PER_PAGE = 25;

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
};

async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const { page } = await searchParams;

  const currentPage = Math.max(1, parseInt(page || "1", 10));

  const products = await getCategoryProducts(category);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  return (
    <main>
      <h2 className="text-center my-12 uppercase text-4xl text-primary font-bold">
        {category}
      </h2>

      {products.length === 0 && (
        <p className="text-center text-xl mt-5">
          No products available right now.
        </p>
      )}

      <div className="products flex flex-wrap items-center justify-center mt-5 pb-5">
        {currentProducts.map((product) => (
          <span key={product.id} className="m-5">
            <ProductCard product={product} category={category} />
          </span>
        ))}
      </div>

      <PaginationControls totalPages={totalPages} currentPage={currentPage} />
    </main>
  );
}

export default CategoryPage;
