import AddToCartButton from "./addToCartButton";
import BuyNowButton from "./BuyNowButton";

const ProductActions = ({ product }) => (
  <div className="buttons mx-auto w-full flex lg:flex-row flex-col gap-4 mt-8">
    <BuyNowButton product={product} />
    <AddToCartButton product={product} />
  </div>
);

export default ProductActions;
