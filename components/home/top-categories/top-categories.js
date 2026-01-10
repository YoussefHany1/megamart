import Link from "next/link";
import Image from "next/image";

// Constants
const CATEGORIES = [
  {
    id: "mobiles",
    name: "Mobiles",
    href: "/phones",
    imageSrc: "/top-categories/mobile.webp",
    imageAlt: "Mobiles category",
    imageWidth: 70,
    imageHeight: 150,
  },
  {
    id: "wearables",
    name: "Wearables",
    href: "/wearables",
    imageSrc: "/top-categories/watches.webp",
    imageAlt: "Wearables category",
    imageWidth: 100,
    imageHeight: 100,
  },
  {
    id: "televisions",
    name: "Televisions",
    href: "/television",
    imageSrc: "/top-categories/tv.webp",
    imageAlt: "Televisions category",
    imageWidth: 100,
    imageHeight: 100,
  },
  {
    id: "computers",
    name: "Computers",
    href: "/computers",
    imageSrc: "/top-categories/pc.webp",
    imageAlt: "Computers category",
    imageWidth: 100,
    imageHeight: 100,
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

// Category Card Component

const CategoryCard = ({ category }) => {
  const { id, name, href, imageSrc, imageAlt, imageWidth, imageHeight } =
    category;

  return (
    <div
      className={`cat mb-6 w-1/2 md:w-1/3 lg:w-1/4 lg:mb-0 text-center`}
      key={id}
    >
      <Link
        href={href}
        className="block justify-self-center"
        aria-label={`Browse ${name} category`}
      >
        <div
          className={`photo rounded-full grid place-items-center w-32 h-32 bg-(--background1) hover:shadow-lg hover:scale-105 duration-300`}
        >
          <Image
            width={imageWidth}
            height={imageHeight}
            src={imageSrc}
            alt={imageAlt}
            className="max-w-full h-auto p-2"
            loading="lazy"
            quality={85}
          />
        </div>
        <div className="text mt-3">
          <span className="text-black font-medium">{name}</span>
        </div>
      </Link>
    </div>
  );
};

// Main Component
function TopCategories() {
  return (
    <section className="topCat mb-24" aria-labelledby="top-categories-heading">
      {/* Section Header */}
      <header className="header text-(--secondary) flex justify-between font-bold items-center border-b border-(--border) w-full justify-self-center">
        <h2 className="line text-2xl pb-3 border-b-3 border-(--primary)">
          Shop From <span className="text-(--primary)">Top Categories</span>
        </h2>
        <Link
          href="/categories"
          className="flex items-center flex-nowrap"
          aria-label="View all categories"
        >
          <small className="font-normal text-sm text-(--heading) flex items-center text-nowrap">
            View All
            <ArrowIcon />
          </small>
        </Link>
      </header>

      {/* Categories Grid */}
      <div
        className={`categories flex justify-evenly flex-wrap text-center mt-14 min-w-52`}
        role="list"
      >
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

export default TopCategories;
