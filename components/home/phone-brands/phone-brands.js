'use client';
import Link from 'next/link';
import styles from './phone-brands.css'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
function ElectronicsBrands() {
    return (
        <>
            <section className="phone-brands my-5 py-3">
                <div className="header text-secondary d-flex justify-content-between fw-bold">
                    <div className="line fs-4 pb-3">Top  <p className="text-primary d-inline">SmartPhone Brands</p></div>
                    <Link href="/phones" className="text-decoration-none d-flex align-items-center"><small className="fw-normal">View All <svg viewBox="0 0 60 60"><path stroke="#008ECC" strokeWidth="3" d="M15.563 40.836a.997.997 0 0 0 1.414 0l15-15a1 1 0 0 0 0-1.414l-15-15a.999.999 0 1 0-1.414 1.414l14.293 14.293-14.293 14.293a1 1 0 0 0 0 1.414"/></svg></small></Link>
                </div>
                <div className={`brands mt-5 py-4 ${styles.brands}`}>
                    <Splide options={ {type: 'loop', gap: '1rem', drag: 'free', arrows: false, pagination: false, perPage: 4, autoScroll: {speed: 2, pauseOnHover: true},}} extensions={{ AutoScroll }}>
                        <SplideSlide><Link href="/phones" className="image"><img src="phone-brands/apple.webp" alt="Apple" className={`rounded-4 img-fluid ${styles.brands}`} /></Link></SplideSlide>
                        <SplideSlide><Link href="/phones" className="image"><img src="phone-brands/realme.webp" alt="Realme" className="rounded-4 img-fluid" /></Link></SplideSlide>
                        <SplideSlide><Link href="/phones" className="image"><img src="phone-brands/mi.webp" alt="Xiaomi" className="rounded-4 img-fluid" /></Link></SplideSlide>
                        <SplideSlide><Link href="/phones" className="image"><img src="phone-brands/samsung.webp" alt="Samsung" className="rounded-4 img-fluid" /></Link></SplideSlide>
                        <SplideSlide><Link href="/phones" className="image"><img src="phone-brands/oppo.webp" alt="Oppo" className="rounded-4 img-fluid" /></Link></SplideSlide>
                        <SplideSlide><Link href="/phones" className="image"><img src="phone-brands/huawei.webp" alt="Huawei" className="rounded-4 img-fluid" /></Link></SplideSlide>
                        <SplideSlide><Link href="/phones" className="image"><img src="phone-brands/infinix.webp" alt="Infinix" className="rounded-4 img-fluid" /></Link></SplideSlide>
                        <SplideSlide><Link href="/phones" className="image"><img src="phone-brands/honor.webp" alt="Honor" className="rounded-4 img-fluid" /></Link></SplideSlide>
                        <SplideSlide><Link href="/phones" className="image"><img src="phone-brands/oneplus.webp" alt="One Plus" className="rounded-4 img-fluid" /></Link></SplideSlide>
                    </Splide>
                </div>
            </section>
        </>
    )
}

export default ElectronicsBrands
