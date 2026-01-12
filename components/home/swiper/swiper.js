"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import Link from "next/link";
import Image from "next/image";
import "@splidejs/react-splide/css";
import "@splidejs/splide/css";

// Slider configuration
const SPLIDE_OPTIONS = {
  type: "loop",
  rewind: true,
  perPage: 1,
  autoplay: true,
  type: "slide",
  interval: 3000,
  pauseOnHover: true,
  pauseOnFocus: true,
  arrows: true,
  pagination: true,
  speed: 800,
  gap: "1rem",
};

// Slides data
const SLIDES = [
  {
    id: "smartphones",
    href: "/product-page/phones",
    imageSrc: "/swiper/Untitled-2.webp",
    imageAlt: "Latest SmartPhones Collection - Discover amazing deals",
    title: "SmartPhones",
  },
  {
    id: "smartwatch",
    href: "/product-page/wearables",
    imageSrc: "/swiper/Untitled-1.webp",
    imageAlt: "Premium SmartWatch Collection - Shop now",
    title: "SmartWatch",
  },
  {
    id: "games",
    href: "/product-page/video-games",
    imageSrc: "/swiper/Untitled-3.webp",
    imageAlt: "Video Games Products - Explore our range",
    title: "Games",
  },
  {
    id: "tablets",
    href: "/product-page/tablets",
    imageSrc: "/swiper/Untitled-4.webp",
    imageAlt: "Tablets & Accessories - Browse latest tech",
    title: "Tablets",
  },
];

// Slide Component
const SlideItem = ({ slide }) => {
  const { id, href, imageSrc, imageAlt, title } = slide;

  return (
    <SplideSlide key={id}>
      <Link
        href={href}
        className="rounded-xl block"
        aria-label={`View ${title} collection`}
      >
        <Image
          width={1201}
          height={316}
          src={imageSrc}
          alt={imageAlt}
          className="rounded-xl w-fit h-auto justify-self-center"
          priority={id === "smartphones"} // First slide loads with priority
          loading={id === "smartphones" ? "eager" : "lazy"}
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
        />
      </Link>
    </SplideSlide>
  );
};

// Main Swiper Component
function Swiper() {
  return (
    <section
      className="slideshow flex justify-center mb-24 rounded-xl mt-8 mx-[-12.5%] md:mx-0"
      aria-label="Featured products carousel"
    >
      <Splide
        options={SPLIDE_OPTIONS}
        aria-label="Product promotions slider"
        className="w-fit min-w-2xs"
      >
        {SLIDES.map((slide) => (
          <SlideItem key={slide.id} slide={slide} />
        ))}
      </Splide>
    </section>
  );
}

export default Swiper;
