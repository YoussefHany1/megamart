"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import useFetchProducts from "../../../hooks/useFetchProducts";

// Constants
const API_URL =
  "https://gist.githubusercontent.com/YoussefHany1/33ca89b7508ef3794d5c27d913803a47/raw/72b0b370f8e0bc13c7c043e26b0449f9ee3f08c0/phoneData.json";

const SPLIDE_OPTIONS = {
  rewind: true,
  type: "slide",
  perMove: 1,
  pagination: false,
  gap: 30,
  perPage: 4,
  breakpoints: {
    1200: { perPage: 3 },
    768: { perPage: 2 },
    576: { perPage: 1 },
  },
  arrows: true,
};

const MAX_NAME_LENGTH = 30;

// Utility functions
const formatPrice = (price) => {
  if (!price) return "N/A";
  return price.replace(/[.]/, " LE");
};

const extractNumber = (str) => {
  if (!str) return null;
  return Number(str.replace(/[^0-9.]/g, ""));
};

// Arrow Icon Component
const ArrowIcon = () => (
  <svg viewBox="0 0 60 60" aria-hidden="true" className="ml-1">
    <path
      stroke="#008ECC"
      strokeWidth="3"
      d="M15.563 40.836a.997.997 0 0 0 1.414 0l15-15a1 1 0 0 0 0-1.414l-15-15a.999.999 0 1 0-1.414 1.414l14.293 14.293-14.293 14.293a1 1 0 0 0 0 1.414"
    />
  </svg>
);

// Product Card Component
const ProductCard = ({ product }) => {
  const truncatedName = useMemo(() => {
    if (product.name.length > MAX_NAME_LENGTH) {
      return `${product.name.substring(0, MAX_NAME_LENGTH)}...`;
    }
    return product.name;
  }, [product.name]);

  const discountPercentage = useMemo(() => {
    return extractNumber(product.discount);
  }, [product.discount]);

  const oldPriceValue = useMemo(() => {
    return extractNumber(product.old_price);
  }, [product.old_price]);

  return (
    <SplideSlide
      className={`product border-0 max-w-56 pb-3 rounded-xl shrink bg-(--background1) outline-2 outline-(--background1) hover:outline-(--primary) duration-300`}
    >
      <Link
        href={`/product-page/phones/${product.id}`}
        className="image w-full flex justify-center bg-white relative mx-auto rounded-t-xl h-50"
        aria-label={`View details for ${product.name}`}
      >
        <Image
          width={200}
          height={200}
          src={product.pic}
          className="p-3 object-contain"
          alt={product.name}
          loading="lazy"
          quality={85}
        />

        {/* Discount Badge */}
        {discountPercentage && (
          <div
            className="text-center text-white font-bold py-2 absolute text-sm w-12 bg-(--primary) top-0 right-0 rounded-bl-xl rounded-tr-xl leading-tight"
            aria-label={`${discountPercentage}% discount`}
          >
            {discountPercentage}%
            <br />
            OFF
          </div>
        )}
      </Link>

      <div className="text leading-tight p-5 pb-0">
        {/* Product Name */}
        <div>
          <Link
            href={`/product-page/phones/${product.id}`}
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
            {oldPriceValue && (
              <del className="text-gray-500">{oldPriceValue} LE</del>
            )}
          </p>
        </div>

        <hr className="my-2" />

        {/* Rating */}
        {product.rating && (
          <div className="rate font-semibold text-green-600">
            <b>{product.rating}</b> out of 5 stars
          </div>
        )}
      </div>
    </SplideSlide>
  );
};

// Error Message Component
const ErrorMessage = () => (
  <div
    className="text-center my-5 bg-red-100 text-red-700 border border-red-300 rounded p-4"
    role="alert"
    aria-live="polite"
  >
    <p className="text-xl font-bold mb-2">Unable to load products</p>
    <p className="mb-0">Please try again later</p>
  </div>
);

// Loading State Component
const LoadingState = () => (
  <div className="text-center my-5" role="status" aria-live="polite">
    <div
      className="inline-block h-8 w-8 border-4 border-(--primary) border-t-transparent rounded-full animate-spin"
      aria-hidden="true"
    />
    <p className="mt-3 text-gray-500">Loading smartphones...</p>
  </div>
);

// Section Header Component
const SectionHeader = () => (
  <header className="header text-(--secondary) flex justify-between font-bold items-center border-b border-(--border) w-full justify-self-center">
    <h2 className="line text-2xl pb-3 mb-0 border-b-3 border-(--primary)">
      Grab the best deal on{" "}
      <span className="text-(--primary)">Smartphones</span>
    </h2>
    <Link
      href="/product-page/phones"
      className="flex items-center flex-nowrap"
      aria-label="View all smartphone brands"
    >
      <small className="font-normal text-sm text-(--heading) flex items-center text-nowrap">
        View All
        <ArrowIcon />
      </small>
    </Link>
  </header>
);

// Main Component
function Phone() {
  const { items: phones, error, loading } = useFetchProducts(API_URL);

  // Filter products with discount
  const discountedPhones = useMemo(() => {
    if (!phones) return [];
    return phones.filter((product) => product.discount);
  }, [phones]);

  return (
    <section className="smartPhones mb-24" aria-labelledby="phones-heading">
      <SectionHeader />

      {/* Error State */}
      {error && <ErrorMessage />}

      {/* Loading State */}
      {loading && !error && <LoadingState />}

      {/* Products Slider */}
      {!error && !loading && discountedPhones.length > 0 && (
        <Splide
          options={SPLIDE_OPTIONS}
          className={`phones flex items-center justify-center mt-14`}
          id="phones"
          aria-label="Smartphones on discount"
        >
          {discountedPhones.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Splide>
      )}

      {/* Empty State */}
      {!error && !loading && discountedPhones.length === 0 && (
        <div className="text-center my-5 text-gray-500">
          <p className="text-lg">
            No discounted phones available at the moment
          </p>
        </div>
      )}
    </section>
  );
}

export default Phone;
