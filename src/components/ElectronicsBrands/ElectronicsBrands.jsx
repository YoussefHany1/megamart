import './electronicsBrands.css'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/splide/css';
import apple from '../../assets/electronicsBrands/apple.png'
import realme from '../../assets/electronicsBrands/realme.png'
import mi from '../../assets/electronicsBrands/mi.png'
import samsung from '../../assets/electronicsBrands/samsung.png'
import oppo from '../../assets/electronicsBrands/oppo.png'
import huawei from '../../assets/electronicsBrands/huawei.png'
import infinix from '../../assets/electronicsBrands/infinix.png'
import honor from '../../assets/electronicsBrands/honor.png'
import oneplus from '../../assets/electronicsBrands/oneplus.png'
import Arrow from '../../assets/Arrow.jsx';
function ElectronicsBrands() {
    return (
        <>
            <section className="elec my-5 py-3">
                <div className="header d-flex justify-content-between fw-bold">
                    <div className="line fs-4 pb-3">Top  <p className="color d-inline">Electronics Brands</p></div>
                    <a href="#" className="text-decoration-none d-flex align-items-center"><small className="fw-normal">View All <Arrow /></small></a>
                </div>
                <div className="brands mt-5 py-4">
                    <Splide options={ {type: 'loop', gap: '1rem', drag: 'free', arrows: false, pagination: false, perPage: 3, autoScroll: {speed: 2, pauseOnHover: false,},}}
                        extensions={{ AutoScroll }}>
                        <SplideSlide><a href="#" className="image rounded-4"><img src={apple} alt="Apple" className="rounded-4 img-fluid" /></a></SplideSlide>
                        <SplideSlide><a href="#" className="image rounded-4"><img src={realme} alt="Realme" className="rounded-4 img-fluid" /></a></SplideSlide>
                        <SplideSlide><a href="#" className="image rounded-4"><img src={mi} alt="MI" className="rounded-4 img-fluid" /></a></SplideSlide>
                        <SplideSlide><a href="#" className="image rounded-4"><img src={samsung} alt="Samsung" className="rounded-4 img-fluid" /></a></SplideSlide>
                        <SplideSlide><a href="#" className="image rounded-4"><img src={oppo} alt="Oppo" className="rounded-4 img-fluid" /></a></SplideSlide>
                        <SplideSlide><a href="#" className="image rounded-4"><img src={huawei} alt="Huawei" className="rounded-4 img-fluid" /></a></SplideSlide>
                        <SplideSlide><a href="#" className="image rounded-4"><img src={infinix} alt="Infinix" className="rounded-4 img-fluid" /></a></SplideSlide>
                        <SplideSlide><a href="#" className="image rounded-4"><img src={honor} alt="Honor" className="rounded-4 img-fluid" /></a></SplideSlide>
                        <SplideSlide><a href="#" className="image rounded-4"><img src={oneplus} alt="One Plus" className="rounded-4 img-fluid" /></a></SplideSlide>
                    </Splide>
                </div>
            </section>
        </>
    )
}

export default ElectronicsBrands
