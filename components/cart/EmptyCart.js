import Link from "next/link";

const EmptyCart = () => (
  <div className="empty-cart text-center py-5 my-5">
    <div className="inline-block rounded p-6 justify-items-center" role="alert">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#008ecc"
        width={152}
        height={152}
        viewBox="0 0 59 59"
        className="w-38! h-38! mb-5"
        xmlSpace="preserve"
      >
        <path d="M59 41V15h-9a1 1 0 1 0 0 2h7v22H11V17h7a1 1 0 1 0 0-2h-7V7a1 1 0 0 0-1-1H7.858C7.411 4.28 5.859 3 4 3 1.794 3 0 4.794 0 7s1.794 4 4 4c1.859 0 3.411-1.28 3.858-3H9v39a1 1 0 0 0 1 1h7.031C15.806 48.912 15 50.359 15 52c0 2.757 2.243 5 5 5s5-2.243 5-5c0-1.641-.806-3.088-2.031-4h18.062C39.806 48.912 39 50.359 39 52c0 2.757 2.243 5 5 5s5-2.243 5-5c0-1.641-.806-3.088-2.031-4H53a1 1 0 1 0 0-2H11v-5zM4 9c-1.103 0-2-.897-2-2s.897-2 2-2c.737 0 1.375.405 1.722 1H5a1 1 0 1 0 0 2h.722C5.375 8.595 4.737 9 4 9m16 46c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3m24 0c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3" />
        <path d="M34 30c7.72 0 14-6.28 14-14S41.72 2 34 2 20 8.28 20 16s6.28 14 14 14m0-26c6.617 0 12 5.383 12 12s-5.383 12-12 12-12-5.383-12-12S27.383 4 34 4" />
        <path d="M27.636 22.364a.997.997 0 0 0 1.414 0l4.95-4.95 4.95 4.95a.997.997 0 0 0 1.414 0 1 1 0 0 0 0-1.414L35.414 16l4.95-4.95a.999.999 0 1 0-1.414-1.414L34 14.586l-4.95-4.95a.999.999 0 1 0-1.414 1.414l4.95 4.95-4.95 4.95a1 1 0 0 0 0 1.414" />
      </svg>
      <h2 className="text-4xl font-bold text-red-600 mb-3">
        Your Cart is Empty
      </h2>
      <p className="text-xl text-black mb-12">
        Your Shopping Cart lives to serve. Give it purpose!
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-md bg-(--primary) text-white hover:bg-[#0279ac] transition text-nowrap"
      >
        Continue Shopping
      </Link>
    </div>
  </div>
);

export default EmptyCart;
