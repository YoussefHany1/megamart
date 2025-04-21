"use client";
import axios from 'axios';
import { useEffect, useState } from "react";
import Link from 'next/link';
import "./page.css"

function Page() {
    const [phones, setPhones] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 25;

    useEffect(() => {
        const fetchPhones = async () => {
            try {
                const response = await axios.get(`https://gist.githubusercontent.com/YoussefHany1/33ca89b7508ef3794d5c27d913803a47/raw/72b0b370f8e0bc13c7c043e26b0449f9ee3f08c0/phoneData.json`);
                setPhones(response.data.products);
                localStorage.setItem('phones', JSON.stringify(response.data.products));
            } catch (error) {
                setError(error.message);
                console.error(error);
            }
        };
        fetchPhones();
    }, []);

    // calculate numbers of products to show per page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = phones.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(phones.length / productsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
    <>
        {error && (<p className="text-danger fs-1 fw-bold text-center">there was an error, pls try again later</p>)}
        {!error && (
            <>
            <div className="products d-flex flex-wrap align-items-center justify-content-center mt-5 pb-5" id="phones">
                {currentProducts.map((product) => (
                    <div key={product.id} className="product card border-0 m-3 rounded-4 flex-shrink-1">
                        <Link href={`/product-page/${product.id}`} className="image w-100 d-flex justify-content-center bg-white position-relative m-auto rounded-top-4">
                            <img src={product.pic} className="card-img-top p-2" alt={product.name} />
                        </Link>
                        <div className="text card-body lh-1 m-auto">
                            <div className="h">
                                <Link href={`/product-page/${product.id}`} className="text-decoration-none text-heading fw-semibold">
                                    {product.name.substring(0, 30)}..
                                </Link>
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
                                {product.discount && (
                                <div className="off text-center align-content-center text-white fw-bold py-2 position-absolute">
                                    {Number(product.discount.replace(/[^0-9.]/g, ""))}% <br />OFF
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                    ))}
                    </div>
                    {/* Pagination */}
                    <div className="pagination d-flex justify-content-center mb-5">
                        <button className="btn btn-outline-primary me-2" onClick={handlePrev} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span className="align-self-center px-2">Page {currentPage} of {totalPages}</span>
                        <button className="btn btn-outline-primary ms-2" onClick={handleNext} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </>
            )}
        </>
    );
}

export default Page;
