"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

const MAX_NAME_LENGTH = 30;

// Utility functions specific to the card
const formatPrice = (price) => {
  if (!price) return "N/A";
  return price.replace(/[.]/, " LE");
};

const extractNumber = (str) => {
  if (!str) return null;
  return Number(str.replace(/[^0-9.]/g, ""));
};

const ProductCard = ({ product, category }) => {
  const currentCategory = category || "phones";
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
    <div className="product border-0 max-w-56 pb-3 rounded-xl shrink bg-(--background1) outline-2 outline-(--background1) hover:outline-(--primary) duration-300">
      <Link
        href={`/product-page/${currentCategory}/${product.id}`}
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
            href={`/product-page/${currentCategory}/${product.id}`}
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
    </div>
  );
};

export default ProductCard;
