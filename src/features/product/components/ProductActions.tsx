import { Product } from "@/types";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";

const ProductActions = ({ product }: { product: Product }) => (
  <div className="buttons mx-auto w-full flex lg:flex-row flex-col gap-4 mt-8">
    <BuyNowButton product={product} />
    <AddToCartButton product={product} />
  </div>
);

export default ProductActions;
