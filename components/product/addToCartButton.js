"use client";
import { useCartStore } from "../../app/store/cartStore";
import Button from "@mui/material/Button";

export default function ButtonComponent({ product }) {
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
