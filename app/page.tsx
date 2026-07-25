import dynamic from "next/dynamic";
import Swiper from "@/features/home/components/Slideshow";
import Phones from "@/features/home/components/Smartphones";
const TopCategories = dynamic(
  () => import("@/features/home/components/Top-categories"),
);
const PhoneBrands = dynamic(
  () => import("@/features/home/components/Smartphones-brands"),
);

// fetch data to Phones component
async function getPhones() {
  const API_URL =
    "https://gist.githubusercontent.com/YoussefHany1/33ca89b7508ef3794d5c27d913803a47/raw/72b0b370f8e0bc13c7c043e26b0449f9ee3f08c0/phoneData.json";

  try {
    const res = await fetch(API_URL, { cache: "force-cache" });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data.products || data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const products = await getPhones();

  return (
    <>
      <Swiper />
      <Phones products={products} />
      <TopCategories />
      <PhoneBrands />
    </>
  );
}
