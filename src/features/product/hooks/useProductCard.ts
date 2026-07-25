import { useMemo } from "react";
import { useWishlistStore } from "@/stores/wishlistStore";
import { extractNumber } from "../utils";
import { Product } from "@/types";

const MAX_NAME_LENGTH = 30;

export function useProductCard(product: Product, category?: string) {
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
    return extractNumber(product.discount || "");
  }, [product.discount]);

  const oldPriceValue = useMemo(() => {
    return extractNumber(product.old_price || "");
  }, [product.old_price]);

  const handleWishlistClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({ ...product, category: currentCategory });
  };

  return {
    currentCategory,
    isLiked,
    truncatedName,
    discountPercentage,
    oldPriceValue,
    handleWishlistClick,
  };
}
