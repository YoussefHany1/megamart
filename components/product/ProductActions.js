import AddToCartButton from "./addToCartButton";
import BuyNowButton from "./BuyNowButton";

const ProductActions = ({ product }) => (
  <div className="buttons mx-auto w-full flex lg:flex-row flex-col">
    <BuyNowButton product={product} />
    <AddToCartButton product={product} />
  </div>
);

export default ProductActions;
