'use client';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import styles from './phones.module.css';
import Link from 'next/link';
import useFetchProducts from "../../../hooks/useFetchProducts";

function Phone () {
    const apiUrl = "https://gist.githubusercontent.com/YoussefHany1/33ca89b7508ef3794d5c27d913803a47/raw/72b0b370f8e0bc13c7c043e26b0449f9ee3f08c0/phoneData.json";
    const { items: phones, error } = useFetchProducts(apiUrl);

  return (
    <section className="smartPhones my-5 pt-3">
        <div className="header text-secondary d-flex justify-content-between fw-bold">
            <div className="line fs-4 pb-3">Grab the best deal on <p className="text-primary d-inline">Smartphones</p></div>
                <Link href="/phones" className="text-decoration-none d-flex align-items-center flex-nowrap"><small className="fw-normal">View All <svg viewBox="0 0 60 60"><path stroke="#008ECC" strokeWidth="3" d="M15.563 40.836a.997.997 0 0 0 1.414 0l15-15a1 1 0 0 0 0-1.414l-15-15a.999.999 0 1 0-1.414 1.414l14.293 14.293-14.293 14.293a1 1 0 0 0 0 1.414"/></svg></small></Link>
        </div>
        {error && (<p className="text-danger fs-1 fw-bold text-center ">there was an error, pls try again later</p>)}
        {!error && (
            <Splide options={ {rewind: true, type:'slide', perMove: 1, pagination: false} } className={`phones d-flex align-items-center justify-content-center mt-5 pb-5" ${styles.splide}`} id="phones">
                {phones.map((product) => (
                product.discount && (
                    <SplideSlide key={product.id} className={`product card m-3 border-0 rounded-4 flex-shrink-1 ${styles.product}`}>
                        <Link href={`/product-page/${product.id}`} className="image w-100 d-flex justify-content-center bg-white position-relative m-auto rounded-top-4">
                            <img src={product.pic} className="card-img-top p-2" alt={product.name} />
                        </Link>
                        <div className="text card-body lh-1 m-auto">
                            <div className={`h ${styles.h}`}>
                                <Link href={`/product-page/${product.id}`} className="text-decoration-none fw-semibold"> {product.name.substring(0, 30)}..</Link>
                            </div>
                            <br />
                            <p className="m-0">
                            {product.price ? <b className="me-3">{product.price.replace(/[.]/, "LE")}</b> : <b>N/A</b>}
                            {product.old_price && <del>{Number(product.old_price.replace(/[^0-9.]/g, ""))}LE</del>}
                            </p>
                            <hr className="my-2" />
                            <div className="save fw-semibold text-success">
                                <b>{product.rating}</b> out of 5 stars
                            </div>
                            <div>
                                <div className={`off text-center text-white fw-bold py-2 position-absolute ${styles.off}`}> {Number(product.discount.replace(/[^0-9.]/g, ""))}% <br />OFF</div>
                            </div>
                        </div>
                    </SplideSlide>
                )
        ))}
        </Splide>
        )}
    </section>
  );
};

export default Phone;
