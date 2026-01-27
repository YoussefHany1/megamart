"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import ProductCard from "../../../components/product/ProductCard";
import useFetchProducts from "../../../hooks/useFetchProducts";
import categories from "../../../stores/data.json";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ProductCardSkeleton from "../../../components/product/ProductCardSkeleton";

const PRODUCTS_PER_PAGE = 25;

function CategoryPage() {
  const params = useParams();
  const category = params.category;
  const apiUrl = categories[category] || null;

  const {
    items: products,
    error,
    loading,
  } = useFetchProducts(apiUrl, category);

  const [currentPage, setCurrentPage] = useState(1);

  const validProducts = useMemo(
    () => products.filter((product) => product.name && product.pic),
    [products],
  );

  const totalPages = Math.ceil(validProducts.length / PRODUCTS_PER_PAGE);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return validProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [validProducts, currentPage]);

  // pagination handler
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <p className="text-red-600 text-4xl font-bold text-center mt-10">
        There was an error. Please try again later.
      </p>
    );
  }

  return (
    <main>
      <h2 className="text-center my-12 uppercase text-4xl text-primary font-bold">
        {category}
      </h2>

      {loading && (
        <div className="flex flex-wrap items-center justify-center mt-5 pb-5">
          {Array.from(new Array(12)).map((_, index) => (
            <div key={index} className="flex justify-center m-5">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      )}

      {!loading && !error && validProducts.length === 0 && (
        <p className="text-center text-xl mt-5">
          No products available right now.
        </p>
      )}

      {!loading && (
        <div className="products flex flex-wrap items-center justify-center mt-5 pb-5">
          {currentProducts.map((product) => (
            <span key={product.id} className="m-5">
              <ProductCard product={product} category={category} />
            </span>
          ))}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="flex justify-center mb-10">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              variant="text"
              size="large"
            />
          </Stack>
        </div>
      )}
    </main>
  );
}

export default CategoryPage;
