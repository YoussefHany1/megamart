import Link from "next/link";
import Image from "next/image";
import styles from "./essentials.module.css";

const DISCOUNT_TEXT = "UP to 50% OFF";

// data
const ESSENTIALS = [
  {
    id: "dairy",
    name: "Dairy, Cheese & Eggs",
    href: "/categories/dairy-cheese-eggs",
    imageSrc: "/essentials/daily-essentials.png",
    imageAlt: "Dairy, Cheese & Eggs category",
    discount: DISCOUNT_TEXT,
  },
  {
    id: "fruits",
    name: "Fruits & Vegetables",
    href: "/categories/fruits-vegetables",
    imageSrc: "/essentials/fruits.png",
    imageAlt: "Fresh Fruits and Vegetables category",
    discount: DISCOUNT_TEXT,
  },
  {
    id: "bread",
    name: "Breads & Bakery",
    href: "/categories/breads-bakery",
    imageSrc: "/essentials/bread.webp",
    imageAlt: "Breads & Bakery category",
    discount: DISCOUNT_TEXT,
  },
  {
    id: "homecare",
    name: "Home Care & Cleaning",
    href: "/categories/home-care-cleaning",
    imageSrc: "/essentials/home-care.webp",
    imageAlt: "Home Care & Cleaning products category",
    discount: DISCOUNT_TEXT,
  },
  {
    id: "beverages",
    name: "Beverages",
    href: "/categories/beverages",
    imageSrc: "/essentials/beverages.webp",
    imageAlt: "Beverages category",
    discount: DISCOUNT_TEXT,
  },
  {
    id: "food",
    name: "Food",
    href: "/categories/food",
    imageSrc: "/essentials/food.webp",
    imageAlt: "Food category",
    discount: DISCOUNT_TEXT,
  },
];

// Arrow Icon Component
const ArrowIcon = () => (
  <svg viewBox="0 0 60 60" aria-hidden="true" className="ml-1">
    <path
      stroke="#008ECC"
      strokeWidth="3"
      d="M15.563 40.836a.997.997 0 0 0 1.414 0l15-15a1 1 0 0 0 0-1.414l-15-15a.999.999 0 1 0-1.414 1.414l14.293 14.293-14.293 14.293a1 1 0 0 0 0 1.414"
    />
  </svg>
);

// Essential Card Component
const EssentialCard = ({ item }) => {
  const { id, name, href, imageSrc, imageAlt, discount } = item;

  return (
    <div className="item lg:w-1/6 md:w-1/4 w-1/2 mb-5" key={id}>
      <Link
        href={href}
        className="no-underline block"
        aria-label={`Shop ${name} - ${discount}`}
      >
        <div
          className={`photo grid place-content-center text-center rounded-xl overflow-hidden ${styles.photo}`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={200}
            height={200}
            className="max-w-full h-auto"
            loading="lazy"
            quality={85}
            sizes="(max-width: 576px) 50vw, (max-width: 768px) 33vw, (max-width: 992px) 25vw, 16vw"
          />
        </div>
        <div className="text text-center mt-3">
          <span className="text-[var(--secondary)] text-nowrap block">
            {name}
          </span>
          <strong className="text-lg text-heading">{discount}</strong>
        </div>
      </Link>
    </div>
  );
};

// Section Header Component
const SectionHeader = () => (
  <header className="header text-[var(--secondary)] flex justify-between font-bold items-center">
    <h2 className="line text-xl pb-3 mb-0">
      Daily <span className="text-[var(--primary)]">Essentials</span>
    </h2>
    <Link
      href="/categories/daily-essentials"
      className="no-underline flex items-center flex-nowrap"
      aria-label="View all daily essentials"
    >
      <small className="font-normal">
        View All
        <ArrowIcon />
      </small>
    </Link>
  </header>
);

// Main Component
function Essentials() {
  return (
    <section className="daily my-5 py-3" aria-labelledby="essentials-heading">
      <SectionHeader />

      <div
        className="essentials flex justify-center items-center lg:p-5 p-0 mt-4 flex-wrap"
        role="list"
      >
        {ESSENTIALS.map((item) => (
          <EssentialCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default Essentials;
