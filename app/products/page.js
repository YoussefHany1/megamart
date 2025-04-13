"use client";
import axios from 'axios';
import  { useEffect, useState } from "react";
import Link from 'next/link';
import "./page.css"
function Home() {
    const [phones, setPhones] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPhones = async () => {
            try {
            const response = await axios.get(`https://gist.githubusercontent.com/YoussefHany1/33ca89b7508ef3794d5c27d913803a47/raw/72b0b370f8e0bc13c7c043e26b0449f9ee3f08c0/phoneData.json`);
            // console.log(response.data);
            setPhones(response.data.products);
            localStorage.setItem('phones', JSON.stringify(response.data.products));
            } catch (error) {
            setError(error.message);
            console.error(error);
            }
        };
        fetchPhones();
    }, []);
    // console.log("phones", phones);
    return (
        <>
            {error && (<p className="text-danger fs-1 fw-bold text-center ">there was an error, pls try again later</p>)}

            {!error && (
            <div className="products d-flex flex-wrap align-items-center justify-content-center mt-5 pb-5" id="phones">
                {phones.map((product) => (
                    <div key={product.id} className="product card border-0 m-3 rounded-4 flex-shrink-1">
                    <Link href={`/product-page/${product.id}`} className="image d-flex justify-content-center bg-white position-relative m-auto rounded-top-4">
                        <img src={product.pic} className="card-img-top p-2" alt={product.name} />
                    </Link>
                    <div className="text card-body lh-1 m-auto">
                        <div className="h">
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
                            {product.discount && <div className="off text-center align-content-center text-white fw-bold py-2 position-absolute"> {Number(product.discount.replace(/[^0-9.]/g, ""))}% <br />OFF</div>}
                        </div>
                    </div>
                </div>
        ))}
        </div>
        )}
        </>
    );
}

export default Home