import Swiper from "../components/home/swiper/swiper";
import Phones from "../components/home/smartphones/phones";
import TopCategories from "../components/home/top-categories/top-categories";
import ElectronicsBrands from "../components/home/electronics-brands/electronics-brands";
import Essentials from "../components/home/essentials/essentials";
import './home.css'
function Home() {
    return (
        <>
        <Swiper />
        <Phones />
        <TopCategories />
        <ElectronicsBrands />
        <Essentials />
        </>
    );
}
export default Home