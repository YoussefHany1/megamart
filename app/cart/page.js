"use client";
import { useCartStore } from "../store/cartStore";
import Image from "next/image";
import Link from "next/link";
import "./cart.css";

function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  console.log(items);
  return (
    <section className="cart-page">
      {items.length === 0 && (
        <>
          <p className="py-5 text-center fs-1 text-danger fw-bold my-5">
            Your Cart is empty
            <br />
            <span className="text-center text-dark fs-4 mb-5">
              Your Shopping Cart lives to serve.
              <Link
                href="/"
                className="text-decorationnone text-primary underline"
              >
                Continue shopping
              </Link>
            </span>
          </p>
        </>
      )}
      {items.map((item) => (
        <div key={item.id} className="py-5 border-bottom border-1 border-gray">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <Link
                href={`/product-page/phones/${item.id}`}
                className="product-title fw-bold me-4 text-decoration-none text-dark fs-3"
              >
                {item.name.substring(0, 100)}..
              </Link>
              <p className="fw-medium fs-4 m-0">{item.price}LE</p>
              <p className="fw-medium fs-5 mb-0 mt-1">
                Quantity: {item.quantity}
              </p>
              <div className="btn-group btn-group-sm" role="group">
                <button
                  type="button"
                  className="btn btn-danger px-2 py-1 fs-5"
                  onClick={() => decreaseQty(item.id)}
                >
                  -
                </button>
                <button
                  type="button"
                  className="btn btn-primary px-2 py-1 fs-5"
                  onClick={() => increaseQty(item.id)}
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn px-2 py-1 fs-6 fw-bold text-danger border-2 border-danger border-start-0"
                  onClick={() => removeItem(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <Image
              src={item.pic}
              alt={item.name}
              width={200}
              height={200}
              className="product-image p-2 rounded-3 p-3 px-4 img-fluid ms-3"
            />
          </div>
        </div>
      ))}
      {items.length > 0 && (
        <button
          type="button"
          className="btn btn-danger px-3 fs-5 m-auto d-block my-5"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      )}
    </section>
  );
}
export default Cart;
