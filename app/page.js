import Swiper from "../components/home/swiper";
import Phones from "../components/home/phones";
import TopCategories from "../components/home/top-categories";
import ElectronicsBrands from "../components/home/electronics-brands";
import Essentials from "../components/home/essentials";
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