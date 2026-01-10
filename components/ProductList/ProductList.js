"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import useFetchProducts from "../../hooks/useFetchProducts";

const PRODUCTS_PER_PAGE = 25;
const MAX_NAME_LENGTH = 50;

// Product Card Component
const ProductCard = ({ product, category }) => {
  const truncatedName = useMemo(() => {
    if (product.name.length > MAX_NAME_LENGTH) {
      return `${product.name.substring(0, MAX_NAME_LENGTH)}...`;
    }
    return product.name;
  }, [product.name]);

  const hasDiscount = product.discount;
  const discountValue = hasDiscount
    ? Number(product.discount.replace(/[^0-9.]/g, ""))
    : 0;

  const formatPrice = (price) => {
    return price ? price.replace(/[.]/, "LE") : "N/A";
  };

  const formatOldPrice = (oldPrice) => {
    return `${Number(oldPrice.replace(/[^0-9.]/g, ""))}LE`;
  };

  const renderRating = (rating) => {
    const numericRating = Number(rating);
    if (isNaN(numericRating)) {
      return <span>N/A</span>;
    }
    return (
      <span>
        <b>{rating}</b> out of 5 stars
      </span>
    );
  };

  return (
    <div className="product border-0 rounded-xl shrink m-5 max-w-70 pb-3 bg-(--background1) outline-2 outline-(--background1) hover:outline-(--primary) duration-300">
      <Link
        href={`/product-page/${category}/${product.id}`}
        className="image w-full flex h-52 justify-center bg-white relative mx-auto rounded-t-xl"
        aria-label={`View details for ${product.name}`}
      >
        <Image
          src={product.pic}
          width={200}
          height={200}
          className="p-3 object-contain"
          alt={product.name}
          loading="lazy"
          quality={85}
        />
        {/* Discount Badge */}
        {hasDiscount && (
          <div
            className="text-center text-white font-bold py-2 absolute text-sm w-12 bg-(--primary) top-0 right-0 rounded-bl-xl rounded-tr-xl leading-tight"
            aria-label={`${discountValue}% discount`}
          >
            {discountValue}%
            <br />
            OFF
          </div>
        )}
      </Link>

      <div className="text leading-tight p-5 pb-0">
        {/* Product Name */}
        <div>
          <Link
            href={`/product-page/${category}/${product.id}`}
            className="font-semibold text-(--heading)"
            title={product.name}
          >
            {truncatedName}
          </Link>
        </div>
        {/* Price Section */}
        <div className="mt-3">
          <p>
            <span className="mr-3 font-bold text-lg">
              {formatPrice(product.price)}
            </span>
            {product.old_price && (
              <del className="text-gray-500">
                {formatOldPrice(product.old_price)} LE
              </del>
            )}
          </p>
        </div>
        <hr className="my-2" />
        {/* Rating */}
        {product.rating && (
          <div className="rate font-semibold text-green-600">
            {renderRating(product.rating)}
          </div>
        )}
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onNext, onPrev }) => {
  return (
    <div className="pagination flex justify-center mb-5">
      <button
        className="px-4 py-2 border rounded-md text-(--primary) border-(--primary) hover:bg-(--primary) hover:text-white transition mr-2"
        onClick={onPrev}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        Previous
      </button>
      <span className="self-center px-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="px-4 py-2 border rounded-md text-(--primary) border-(--primary) hover:bg-(--primary) hover:text-white transition ml-2"
        onClick={onNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};

// Error Message Component
const ErrorMessage = ({ message }) => (
  <p className="text-red-600 text-4xl font-bold text-center" role="alert">
    {message}
  </p>
);

// Main ProductList Component
function ProductList({
  apiUrl,
  category,
  productsPerPage = PRODUCTS_PER_PAGE,
}) {
  const { items: products, error } = useFetchProducts(apiUrl, category);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter valid products
  const validProducts = useMemo(
    () => products.filter((product) => product.name && product.pic),
    [products]
  );

  // Calculate pagination
  const totalPages = Math.ceil(validProducts.length / productsPerPage);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return validProducts.slice(startIndex, startIndex + productsPerPage);
  }, [validProducts, currentPage, productsPerPage]);

  // Navigation handlers
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Error state
  if (error) {
    return (
      <ErrorMessage message="There was an error. Please try again later." />
    );
  }

  // Empty state
  if (validProducts.length === 0) {
    return (
      <p className="text-center text-xl mt-5">
        No products available at the moment.
      </p>
    );
  }

  return (
    <>
      <div
        className="products flex flex-wrap items-center justify-center mt-5 pb-5"
        id="phones"
      >
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} category={category} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </>
  );
}

export default ProductList;
