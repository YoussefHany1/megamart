import { Product } from "@/types";
import Image from "next/image";
import { formatPrice, extractNumber, capitalizeFirstLetter } from "../utils";
import ProductActions from "./ProductActions";

const ProductImage = ({ product }: { product: Product }) => (
  <div className="image lg:pr-5 lg:mr-5 mx-auto">
    <Image
      width={400}
      height={400}
      src={product.pic}
      className="product-image max-w-full h-auto p-5 lg:p-0 min-w-42"
      alt={product.name}
      priority
      quality={90}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
    />
  </div>
);

// product name + brand name
const ProductHeader = ({ product }: { product: Product }) => {
  const brandName = product.specifications?.[0]?.pecifications
    ? capitalizeFirstLetter(product.specifications[0].pecifications)
    : "Unknown";

  return (
    <header className="header border-b border-border">
      <h1 className="font-extrabold text-black text-2xl md:text-3xl">
        {product.name}
      </h1>
      <div className="brand mb-3">
        Brand: <span className="text-primary">{brandName}</span>
      </div>
    </header>
  );
};

// rating
const ProductRating = ({ rating }: { rating?: number }) => {
  if (!rating) return null;
  return (
    <div className="save my-2 font-semibold text-green-600">
      <strong>{rating}</strong> out of 5 stars
    </div>
  );
};

// price
const ProductPrice = ({ product }: { product: Product }) => {
  const currentPrice = formatPrice(product.price || 0);
  const oldPrice = extractNumber(product.old_price || 0);

  return (
    <div className="price-section my-3">
      {product.discount && (
        <span className="mr-3 px-2 py-1 text-sm bg-red-600 text-white rounded">
          {product.discount}
        </span>
      )}
      <span className="mr-3 text-2xl font-bold">{currentPrice}</span>
      {oldPrice ? <del className="text-gray-500 text-lg">{oldPrice}</del> : null}
    </div>
  );
};

// about this item
const ProductAbout = ({ about }: { about?: string[] }) => {
  if (!about || about.length === 0) return null;
  return (
    <div className="about py-3">
      <h2 className="font-bold text-xl">About this item:</h2>
      <ul>
        {about.map((item: string, index: number) => (
          <li className="about py-1" key={index}>
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

//main component
const ProductOverview = ({ product }: { product: Product }) => {
  return (
    <article className="product flex lg:flex-row flex-col justify-around pb-5">
      {/* image */}
      <ProductImage product={product} />

      {/* info and buttons */}
      <div className="text pt-4 lg:mx-5 lg:pb-3 flex flex-col">
        <ProductHeader product={product} />
        <ProductRating rating={product.rating} />
        <ProductPrice product={product} />
        <ProductAbout about={product.about} />

        <ProductActions product={product} />
      </div>
    </article>
  );
};

export default ProductOverview;
