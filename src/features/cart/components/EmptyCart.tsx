import Link from "next/link";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

const EmptyCart = () => (
  <div className="empty-cart text-center py-5 my-5">
    <div className="inline-block rounded p-6 justify-items-center" role="alert">
      <ProductionQuantityLimitsIcon
        sx={{ fontSize: "10rem", color: "var(--color-primary)" }}
      />
      <h2 className="text-4xl font-bold text-red-600 mb-3">
        Your Cart is Empty
      </h2>
      <p className="text-xl text-black mb-12">
        Your Shopping Cart lives to serve. Give it purpose!
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-md bg-primary text-white hover:bg-[#0279ac] transition text-nowrap"
      >
        Continue Shopping
      </Link>
    </div>
  </div>
);

export default EmptyCart;
