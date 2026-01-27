import dynamic from "next/dynamic";
import Swiper from "../components/home/swiper/swiper";
import Phones from "../components/home/smartphones/smartphones";
const TopCategories = dynamic(
  () => import("../components/home/top-categories/top-categories"),
);
const PhoneBrands = dynamic(
  () => import("../components/home/smartphones-brands/smartphones-brands"),
);
// import Essentials from "../components/home/essentials/essentials";

function Home() {
  return (
    <>
      <Swiper />
      <Phones />
      <TopCategories />
      <PhoneBrands />
      {/* <Essentials /> */}
    </>
  );
}
export default Home;
