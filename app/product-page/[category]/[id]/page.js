import axios from "axios";
import Image from "next/image";
// import { notFound } from "next/navigation";
import categories from "../../../../stores/data.json";
import AddToCartButton from "../../../../components/addToCartButton/addToCartButton";

// Utility Functions
const formatPrice = (price) => {
  if (!price) return "N/A";
  return price.replace(/[.]/, "");
};

const extractNumber = (str) => {
  if (!str) return "";
  return Number(str.replace(/[^0-9.]/g, ""));
};

const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Fetch product data
async function getProduct(category, id) {
  const url = categories[category];

  if (!url) {
    return null;
  }

  try {
    const res = await axios.get(url);
    const products = res.data.products;
    return products.find((p) => p.id == id);
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

// Product Image Component
const ProductImage = ({ product }) => (
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

// Product Header Component
const ProductHeader = ({ product }) => {
  const brandName = product.specifications?.[0]?.pecifications
    ? capitalizeFirstLetter(product.specifications[0].pecifications)
    : "Unknown";

  return (
    <header className="header border-b border-(--border)">
      <h1 className="font-extrabold text-black text-2xl md:text-3xl">
        {product.name}
      </h1>
      <div className="brand mb-3">
        Brand: <span className="text-(--primary)">{brandName}</span>
      </div>
    </header>
  );
};

// Product Rating Component
const ProductRating = ({ rating }) => {
  if (!rating) return null;

  return (
    <div className="save my-2 font-semibold text-green-600">
      <strong>{rating}</strong> out of 5 stars
    </div>
  );
};

// Product Price Component
const ProductPrice = ({ product }) => {
  const currentPrice = formatPrice(product.price);
  const oldPrice = extractNumber(product.old_price);

  return (
    <div className="price-section my-3">
      {product.discount && (
        <span className="mr-3 px-2 py-1 text-sm bg-red-600 text-white rounded">
          {product.discount}
        </span>
      )}
      <span className="mr-3 text-2xl font-bold">{currentPrice} LE</span>
      {oldPrice && <del className="text-gray-500 text-lg">{oldPrice} LE</del>}
    </div>
  );
};

// Product About Component
const ProductAbout = ({ about }) => {
  if (!about || about.length === 0) return null;

  return (
    <div className="about py-3">
      <h2 className="font-bold text-xl">About this item:</h2>
      <ul>
        {about.map((item, index) => (
          <li className="about py-1" key={index}>
            • {item.item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Product Actions Component
const ProductActions = ({ product }) => (
  <div className="buttons mx-auto w-full flex lg:flex-row flex-col">
    <button
      type="button"
      className="w-full lg:mx-3 lg:mb-0 mb-3 whitespace-nowrap px-6 py-3 rounded-md bg-[var(--primary)] text-white hover:bg-[#0279ac] transition"
      aria-label={`Buy ${product.name} now`}
    >
      Buy Now
    </button>
    <AddToCartButton product={product} />
  </div>
);

// Technical Details Component
const TechnicalDetails = ({ specifications, details }) => {
  const hasData =
    (specifications && specifications.length > 0) ||
    (details && details.length > 0);

  if (!hasData) return null;

  return (
    <div className="technical-details">
      <h2 id="technical-details" className="font-bold text-xl text-black mb-4">
        Technical Details:
      </h2>
      <table className="w-full">
        <tbody>
          {specifications?.map((item, index) => (
            <tr
              key={`spec-${index}`}
              className={index % 2 === 1 ? "bg-gray-100" : ""}
            >
              <th
                className="py-2 px-3 font-semibold text-black text-start lg:text-nowrap"
                scope="row"
              >
                {item.name}
              </th>
              <td className="py-2 px-3 text-(--text) lg:text-nowrap">
                {item.pecifications}
              </td>
            </tr>
          ))}
          {details?.map((item, index) => (
            <tr
              key={`detail-${index}`}
              className={index % 2 === 1 ? "bg-gray-100" : ""}
            >
              <th
                className="py-2 px-3 font-semibold text-black text-start lg:text-nowrap"
                scope="row"
              >
                {item.th}
              </th>
              <td className="py-2 px-3 text-(--text) lg:text-nowrap">
                {item.td}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Product Description Component
const ProductDescription = ({ desc }) => {
  if (!desc) return null;

  return (
    <div className="desc lg:ml-12">
      <h3 className="font-bold text-black text-xl mb-4">Description:</h3>
      <p className="text-gray-500">{desc}</p>
    </div>
  );
};

// Error State Component
const ProductNotFound = () => (
  <div className="container my-5 text-center">
    <div
      className="bg-red-100 text-red-700 border border-red-300 rounded p-4"
      role="alert"
    >
      <h2 className="text-2xl font-bold">Product Not Found</h2>
      <p className="mb-0">
        The product you're looking for doesn't exist or has been removed.
      </p>
    </div>
  </div>
);

// Main Product Page Component
async function ProductPage({ params }) {
  const { id, category } = await params;
  const product = await getProduct(category, id);

  // Handle product not found
  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <main className={`${category} py-5`} id={category}>
      {/* Product Overview Section */}
      <article className="product flex lg:flex-row flex-col justify-around pb-5">
        <ProductImage product={product} />

        <div className="text pt-4 lg:mx-5 lg:pb-3 flex flex-col">
          <ProductHeader product={product} />
          <ProductRating rating={product.rating} />
          <ProductPrice product={product} />
          <ProductAbout about={product.about} />
          <ProductActions product={product} />
        </div>
      </article>

      {/* Technical Details Section */}
      <section className="header pt-5" aria-labelledby="technical-details">
        <div className="details lg:flex block">
          <TechnicalDetails
            specifications={product.specifications}
            details={product.details}
          />
          <ProductDescription desc={product.desc} />
        </div>
      </section>
    </main>
  );
}

export default ProductPage;
