"use client";
import { Product } from "@/types";
import { useCartStore } from "@/stores/cartStore";
import Button from "@mui/material/Button";

export default function ButtonComponent({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Button
      fullWidth
      type="button"
      variant="outlined"
      size="large"
      onClick={() => addItem(product)}
      disabled={!product.price}
    >
      Add to Cart
    </Button>
  );
}
