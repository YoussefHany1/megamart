"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import Link from "next/link";
import { useMemo } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProductCard from "../../product/ProductCard";

const SPLIDE_OPTIONS = {
  rewind: true,
  type: "slide",
  perMove: 1,
  pagination: false,
  gap: 0,
  perPage: 5,
  breakpoints: {
    1200: { perPage: 4 },
    1050: { perPage: 3 },
    768: { perPage: 2 },
    576: { perPage: 1 },
  },
  arrows: true,
};
// Section Header Component
const SectionHeader = () => (
  <header className="header text-secondary flex justify-between font-bold items-center border-b border-border w-full justify-self-center">
    <h2 className="line text-2xl pb-3 mb-0 border-b-3 border-primary">
      Grab the best deal on <span className="text-primary">Smartphones</span>
    </h2>
    <Link
      href="/product-page/phones"
      className="flex items-center flex-nowrap"
      aria-label="View all smartphone brands"
    >
      <small className="font-normal text-sm text-heading flex items-center text-nowrap">
        View All
        <ChevronRightIcon color="primary" />
      </small>
    </Link>
  </header>
);

// Main Component
function Phone({ products = [] }) {
  // Filter products with discount
  const discountedPhones = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => product.discount);
  }, [products]);

  return (
    <section className="smartPhones mb-24" aria-labelledby="phones-heading">
      <SectionHeader />

      {/* Products Slider */}
      {discountedPhones.length > 0 ? (
        <Splide
          options={SPLIDE_OPTIONS}
          className="phones flex items-center justify-center mt-14 px-[10%]"
          id="phones"
          aria-label="Smartphones on discount"
        >
          {discountedPhones.map((product) => (
            <SplideSlide
              key={product.id}
              className="px-3! py-0.5 justify-items-center"
            >
              <ProductCard category="phones" product={product} />
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        /* Empty State */
        <div className="text-center my-5 text-gray-500">
          <p className="text-lg">
            No discounted phones available at the moment
          </p>
        </div>
      )}
    </section>
  );
}

export default Phone;
