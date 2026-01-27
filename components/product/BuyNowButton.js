"use client";
import { useCartStore } from "../../app/store/cartStore";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

export default function BuyNowButton({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const handleBuyNow = () => {
    addItem(product);
    router.push("/cart");
  };

  return (
    <Button
      fullWidth
      type="button"
      onClick={handleBuyNow}
      disabled={!product.price}
      variant="contained"
      size="large"
      sx={{
        backgroundColor: "var(--color-primary)",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#0279ac",
        },
      }}
    >
      {!product.price ? "product not available" : "Buy Now"}
    </Button>
  );
}
