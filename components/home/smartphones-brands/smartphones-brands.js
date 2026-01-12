"use client";

import Link from "next/link";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/css";

const SPLIDE_OPTIONS = {
  type: "loop",
  gap: "2rem",
  drag: "free",
  arrows: false,
  pagination: false,
  perPage: 6,
  autoScroll: {
    speed: 1.5,
    pauseOnHover: true,
    pauseOnFocus: true,
  },
  breakpoints: {
    1400: { perPage: 6 },
    1200: { perPage: 3 },
    992: { perPage: 3 },
    768: { perPage: 2 },
    576: { perPage: 2 },
  },
};

// Brands data
const PHONE_BRANDS = [
  {
    id: "apple",
    name: "Apple",
    slug: "apple",
    imageSrc: "/phone-brands/apple.webp",
  },
  {
    id: "realme",
    name: "Realme",
    slug: "realme",
    imageSrc: "/phone-brands/realme.webp",
  },
  {
    id: "xiaomi",
    name: "Xiaomi",
    slug: "xiaomi",
    imageSrc: "/phone-brands/mi.webp",
  },
  {
    id: "samsung",
    name: "Samsung",
    slug: "samsung",
    imageSrc: "/phone-brands/samsung.webp",
  },
  {
    id: "oppo",
    name: "Oppo",
    slug: "oppo",
    imageSrc: "/phone-brands/oppo.webp",
  },
  {
    id: "huawei",
    name: "Huawei",
    slug: "huawei",
    imageSrc: "/phone-brands/huawei.webp",
  },
  {
    id: "infinix",
    name: "Infinix",
    slug: "infinix",
    imageSrc: "/phone-brands/infinix.webp",
  },
  {
    id: "honor",
    name: "Honor",
    slug: "honor",
    imageSrc: "/phone-brands/honor.webp",
  },
  {
    id: "oneplus",
    name: "OnePlus",
    slug: "oneplus",
    imageSrc: "/phone-brands/oneplus.webp",
  },
];

// Arrow Icon
const ArrowIcon = () => (
  <svg viewBox="0 0 60 60" aria-hidden="true" className="ml-1">
    <path
      stroke="#008ECC"
      strokeWidth="3"
      d="M15.563 40.836a.997.997 0 0 0 1.414 0l15-15a1 1 0 0 0 0-1.414l-15-15a.999.999 0 1 0-1.414 1.414l14.293 14.293-14.293 14.293a1 1 0 0 0 0 1.414"
    />
  </svg>
);

// Brand Card
const BrandCard = ({ brand }) => {
  const { id, name, slug, imageSrc } = brand;

  return (
    <SplideSlide key={id}>
      <Link
        href={`/phones?brand=${slug}`}
        className="image w-fit"
        aria-label={`View ${name} smartphones`}
      >
        <Image
          width={300}
          height={160}
          src={imageSrc}
          alt={`${name} brand logo`}
          className="rounded-xl"
          loading="lazy"
          quality={85}
          sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, (max-width: 992px) 33vw, (max-width: 1200px) 25vw, 20vw"
        />
      </Link>
    </SplideSlide>
  );
};

// Section Header
const SectionHeader = () => (
  <header className="header text-(--secondary) flex justify-between font-bold items-center border-b border-(--border) w-[80%] justify-self-center">
    <h2 className="line text-2xl pb-3 mb-0 border-b-3 border-(--primary)">
      Top <span className="text-(--primary)">SmartPhone Brands</span>
    </h2>
    <Link
      href="/phones"
      className="flex items-center flex-nowrap"
      aria-label="View all smartphone brands"
    >
      <small className="font-normal text-sm text-(--heading) flex items-center text-nowrap">
        View All
        <ArrowIcon />
      </small>
    </Link>
  </header>
);

// Main Component
function ElectronicsBrands() {
  return (
    <section
      className="phone-brands mb-24 mx-[-9.5%]"
      aria-labelledby="phone-brands-heading"
    >
      <SectionHeader />

      <div className={`brands mt-14 min-w-52`}>
        <Splide
          options={SPLIDE_OPTIONS}
          extensions={{ AutoScroll }}
          aria-label="Popular smartphone brands carousel"
        >
          {PHONE_BRANDS.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </Splide>
      </div>
    </section>
  );
}

export default ElectronicsBrands;
