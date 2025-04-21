'use client';
import './electronics-brands.css'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
function ElectronicsBrands() {
    return (
        <>
            <section className="elec my-5 py-3">
                <div className="header text-secondary d-flex justify-content-between fw-bold">
                    <div className="line fs-4 pb-3">Top  <p className="text-primary d-inline">Electronics Brands</p></div>
                    <a href="#" className="text-decoration-none d-flex align-items-center"><small className="fw-normal">View All <svg viewBox="0 0 60 60"><path stroke="#008ECC" strokeWidth="3" d="M15.563 40.836a.997.997 0 0 0 1.414 0l15-15a1 1 0 0 0 0-1.414l-15-15a.999.999 0 1 0-1.414 1.414l14.293 14.293-14.293 14.293a1 1 0 0 0 0 1.414"/></svg></small></a>
                </div>
                <div className="brands mt-5 py-4">
                    <Splide options={ {type: 'loop', gap: '1rem', drag: 'free', arrows: false, pagination: false, perPage: 4, autoScroll: {speed: 2, pauseOnHover: false,},}}
                        extensions={{ AutoScroll }}>
                        <SplideSlide><a href="#" className="image rounded-4"><img src="electronics-brands/apple.png" alt="Apple" className="rounded-4 img-fluid" /></a></SplideSlide>
                        <SplideSlide><a href="#" className="image rounded-4"><img src="electronics-brands/realme.png" alt="Realme" className="rounded-4 img-fluid" /></a></SplideSlide>
                        <SplideSlide><a href="#" className="image rounded-4"><img src="electronics-brands/mi.png" alt="Xiaomi" className="rounded-4 img-fluid" /></a></SplideSlide>
                        <SplideSlide><a href="#" className="image rounded-4"><img src="electronics-brands/samsung.png" alt="Samsung" className="rounded-4 img-fluid" /></a></SplideSlide>
                        <SplideSlide><a href="#" className="image rounded-4"><img src="electronics-brands/oppo.png" alt="Oppo" className="rounded-4 img-fluid" /></a></SplideSlide>
                        <SplideSlide><a href="#" className="image rounded-4"><img src="electronics-brands/huawei.png" alt="Huawei" className="rounded-4 img-fluid" /></a></SplideSlide>
                        <SplideSlide><a href="#" className="image rounded-4"><img src="electronics-brands/infinix.png" alt="Infinix" className="rounded-4 img-fluid" /></a></SplideSlide>
                        <SplideSlide><a href="#" className="image rounded-4"><img src="electronics-brands/honor.png" alt="Honor" className="rounded-4 img-fluid" /></a></SplideSlide>
                        <SplideSlide><a href="#" className="image rounded-4"><img src="electronics-brands/oneplus.png" alt="One Plus" className="rounded-4 img-fluid" /></a></SplideSlide>
                    </Splide>
                </div>
            </section>
        </>
    )
}

export default ElectronicsBrands
