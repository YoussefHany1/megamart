'use client'
import './swiper.css'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
// import watch from '../../../assets/slide/Untitled-1.png'
// import phone from '../../../assets/slide/Untitled-2.png'
// import cosmetics from '../../../assets/slide/Untitled-3.png'
// import elec from '../../../assets/slide/Untitled-4.png'
// import furniture from '../../../assets/slide/Untitled-5.png'
function App() {
    return (
    <>
        <header className="slideshow d-flex justify-content-center align-items-center my-5 rounded-4 overflow-hidden">
            <Splide options={ {rewind: true, perPage : 1, autoplay: true, type:'slide'} }>
                <SplideSlide><a href="#" className="rounded-4"><img src="swiper/Untitled-2.png" className="rounded-4 img-fluid" alt="SmartPhones" /></a></SplideSlide>
                <SplideSlide><a href="#" className="rounded-4"><img src="swiper/Untitled-1.png" className="rounded-4 img-fluid" alt="SmartWatch" /></a></SplideSlide>
                <SplideSlide><a href="#" className="rounded-4"><img src="swiper/Untitled-3.png" className="rounded-4 img-fluid" alt="Cosmetics" /></a></SplideSlide>
                <SplideSlide><a href="#" className="rounded-4"><img src="swiper/Untitled-4.png" className="rounded-4 img-fluid" alt="Electronics" /></a></SplideSlide>
                <SplideSlide><a href="#" className="rounded-4"><img src="swiper/Untitled-5.png" className="rounded-4 img-fluid" alt="Furniture" /></a></SplideSlide>
            </Splide>
        </header>
    </>
    )
}
export default App
