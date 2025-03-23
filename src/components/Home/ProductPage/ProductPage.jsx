import './productPage.css';
import { useLocation } from "react-router-dom";

function ProductPage() {
    const location = useLocation();
    const product = location.state?.product; // Get product from state

    if (!product) {
        return <p className='text-danger'>Product not found</p>;
    }

    return (
        <>
            <div className="phones py-5" id="phones">
                <div className="product d-flex flex-lg-row flex-column justify-content-around">
                    <div className="image pe-lg-5 me-lg-5 m-auto">
                        <img src={product.pic} className="img-fluid ps-lg-5" alt={product.name} />
                    </div>
                    <div className="text pt-4 mx-lg-5 pb-lg-3 d-flex flex-column ">
                        <div className="header border-bottom">
                            <h2 className='fw-bolder text-black'>{product.name}</h2>
                            <div className="brand mb-3">Brand: <span className='text-primary'>{product.specifications[0].pecifications.charAt(0).toUpperCase() + product.specifications[0].pecifications.slice(1).toLowerCase()}</span></div>

                        </div>
                        <div className="save my-2 fw-semibold text-success">
                            <b>{product.rating}</b> out of 5 stars
                        </div>
                        <p>
                            <span className="me-3 p-2 fs-5 text-bg-danger badge ">{product.discount}</span>
                            <span className="me-3 fs-3 fw-bold">{product.price ? product.price.replace(/[.]/, "") : "N/A"} LE</span>
                            <del className='text-muted fs-5'>{product.old_price ? Number(product.old_price.replace(/[^0-9.]/g, "")) : ""} LE</del>
                        </p>
                        {/* <p className="px-5">
                            <button className="sub border-0 w-100 bg-transparent fs-4 fw-semibold d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"><svg viewBox="0 0 16 16" className='me-3' aria-hidden="true" focusable="false" role="presentation"><path fill="currentColor" d="M15.64 6.92L9.5 5.12V4a.5.5 0 00-.5-.5H1a.5.5 0 00-.5.5v8.5c0 .28.22.5.5.5h1.27a2.1 2.1 0 004.06 0h3.94a2.1 2.1 0 004.06 0h1.17a.5.5 0 00.5-.5V7.4a.5.5 0 00-.36-.48zM4.3 13.6a1.1 1.1 0 110-2.2 1.1 1.1 0 010 2.2zM6.33 12a2.1 2.1 0 00-4.06 0H1.5V4.5h7V12H6.33zm5.97 1.6a1.1 1.1 0 110-2.2 1.1 1.1 0 010 2.2zM15 12h-.67a2.1 2.1 0 00-4.06 0H9.5V6.17l5.5 1.6V12z"></path></svg>
                                <span className='me-auto'>Delivery and Shipping</span>
                                <svg viewBox="0 0 50 50" transform="rotate(90)"><path stroke="currentColor" strokeWidth="2" d="M15.563 40.836a.997.997 0 0 0 1.414 0l15-15a1 1 0 0 0 0-1.414l-15-15a.999.999 0 1 0-1.414 1.414l14.293 14.293-14.293 14.293a1 1 0 0 0 0 1.414" /></svg>
                            </button>
                        </p>
                        <div className="collapse d-none mb-3 px-5 mx-3" id="collapseExample">
                            <div className="card-body">
                                Fast shipping to your doorstep! Get your order delivered within 1-5 days based on location.
                            </div>
                        </div> */}
                        <div className="about py-3">
                            <h4 className='fw-bold'>About this item:</h4>
                            {product.about && product.about.map((item, index) => (
                                <li className="about py-1" key={index}>
                                    {item.item}
                                </li>
                            ))}
                        </div>
                        <div className="buttons mx-auto w-100 d-flex flex-lg-row flex-column">
                            <button type="button" className="btn btn-primary btn-lg w-100 mx-lg-3 mb-lg-0 mb-3">Buy Now</button>
                            <button type="button" className="btn btn-outline-primary btn-lg w-100 mx-lg-3">Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className="header pt-4"><span className='fw-bold fs-4 text-black'>Technical Details</span>
                        <table className='d-flex justify-content-center w-100 p-3'>
                            <tbody className=''>
                        {product.specifications && product.specifications.map((item, index) => (
                            <tr key={index}>
                                <th className="w-100 py-1 px-4 fw-semibold text-black">{item.name}</th>
                                <td className='w-100 py-1 px-5'>{item.pecifications}</td>
                            </tr>
                            ))}
                            {product.details && product.details.map((item, index) => (
                            <tr key={index}>
                                <th className="w-100 py-1 px-4 fw-semibold text-black">{item.th}</th>
                                <td className='w-100 py-1 px-5'>{item.td}</td>
                            </tr>
                            ))}
                            </tbody>
                        </table>
                        {/* <div className="desc">
                            <h4 className='fw-bold'>Description:</h4>
                            <p>{product.desc}</p>
                        </div> */}
                </div>
            </div>
        </>
    );
}

export default ProductPage;
