import Swiper from "../components/home/swiper/swiper";
import Phones from "../components/home/smartphones/phones";
import TopCategories from "../components/home/top-categories/top-categories";
import PhoneBrands from "../components/home/phone-brands/phone-brands";
// import Essentials from "../components/home/essentials/essentials";
import "@splidejs/splide/css";
import "./home.css";
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
