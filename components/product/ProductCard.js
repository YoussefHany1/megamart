"use client";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useWishlistStore } from "../../app/store/wishlistStore";
import { Card, CardContent, CardMedia, Divider, Rating } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { formatPrice, extractNumber } from "./utils";

const MAX_NAME_LENGTH = 30;

const ProductCard = ({ product, category }) => {
  const currentCategory = category || "phones";
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isLiked = isInWishlist(product.id, currentCategory);

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
  // Wishlist click handler
  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({ ...product, category: currentCategory });
  };

  return (
    <Card
      sx={{
        position: "relative",
        padding: 0,
        borderRadius: 3,
        maxWidth: 224,
        height: 362,
        backgroundColor: "var(--color-background1)",
        border: "2px solid var(--color-background1)",
        transition: "all 0.2s",
        "&:hover": { borderColor: "var(--color-primary)" },
      }}
    >
      <IconButton
        variant="outlined"
        size="large"
        onClick={handleWishlistClick}
        disabled={!product.price}
        sx={{
          backgroundColor: "#0000001f",
          position: "absolute",
          top: 8,
          left: 8,
          zIndex: 10,
          padding: 1,
        }}
      >
        <FavoriteIcon
          sx={{ color: isLiked ? "var(--color-primary)" : "#686868" }}
        />
      </IconButton>
      <Link
        href={`/product-page/${currentCategory}/${product.id}`}
        className="image w-full flex justify-center bg-white relative mx-auto rounded-t-xl h-50"
        aria-label={`View details for ${product.name}`}
      >
        <CardMedia
          sx={{
            display: "flex",
          }}
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
        </CardMedia>

        {/* Discount Badge */}
        {discountPercentage && (
          <div
            className="text-center text-white font-bold py-2 absolute text-sm w-12 bg-primary top-0 right-0 rounded-bl-xl rounded-tr-xl leading-tight"
            aria-label={`${discountPercentage}% discount`}
          >
            {discountPercentage}%
            <br />
            OFF
          </div>
        )}
      </Link>

      <CardContent>
        {/* Product Name */}
        <div>
          <Link
            href={`/product-page/${currentCategory}/${product.id}`}
            className="font-semibold text-heading"
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

        {/* Rating */}
        <Divider sx={{ my: 1 }} />
        <div className="rate font-semibold text-primary pb-3">
          {Number(product.rating) ? (
            <Rating
              name="half-rating-read"
              size="small"
              defaultValue={product.rating}
              precision={0.5}
              readOnly
              sx={{ color: "var(--color-primary)" }}
            />
          ) : (
            <p>N/A Rate</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
