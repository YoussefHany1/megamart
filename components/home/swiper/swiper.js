'use client'
import './swiper.css'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import Link from 'next/link';
function Swiper() {
    return (
    <>
        <header className="slideshow d-flex justify-content-center align-items-center my-5 rounded-4 overflow-hidden px-md-0 mx-3">
            <Splide options={ {rewind: true, perPage : 1, autoplay: true, type:'slide'} } className='mx-'>
                <SplideSlide><Link href="/phones" className="rounded-4"><img src="swiper/Untitled-2.png" className="rounded-4 img-fluid" alt="SmartPhones" /></Link></SplideSlide>
                <SplideSlide><Link href="/wearables" className="rounded-4"><img src="swiper/Untitled-1.png" className="rounded-4 img-fluid" alt="SmartWatch" /></Link></SplideSlide>
                <SplideSlide><Link href="#!" className="rounded-4"><img src="swiper/Untitled-3.png" className="rounded-4 img-fluid" alt="Cosmetics" /></Link></SplideSlide>
                <SplideSlide><Link href="#!" className="rounded-4"><img src="swiper/Untitled-4.png" className="rounded-4 img-fluid" alt="Electronics" /></Link></SplideSlide>
            </Splide>
        </header>
    </>
    )
}
export default Swiper
