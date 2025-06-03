"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import useFetchProducts from "../../hooks/useFetchProducts";
import "./productList.css";

function ProductList({ apiUrl, category, productsPerPage = 25 }) {
  const { items: products, error } = useFetchProducts(apiUrl, category);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const start = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(start, start + productsPerPage);

  const next = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prev = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // useEffect(() => {
  //   if (products) {
  //     // store the products in the local storage under the category name 
  //     localStorage.setItem(category, JSON.stringify(products));
  //   }
  // }, [products, category]);

  if (error) {
    return (
      <p className="text-danger fs-1 fw-bold text-center">
        there was an error, try again later
      </p>
    );
  }
  return (
    <>
      <div className="products d-flex flex-wrap align-items-center justify-content-center mt-5 pb-5" id="phones">
        {currentProducts.map((product) => (
          product.name && product.pic && (
          <div key={product.id} className="product card border-0 m-3 rounded-4 flex-shrink-1">
            <Link href={`/product-page/${category}/${product.id}`} className="image w-100 d-flex justify-content-center bg-white position-relative m-auto rounded-top-4">
              <img src={product.pic} className="card-img-top p-2" alt={product.name} />
            </Link>
            <div className="text card-body lh-1 m-auto">
              <div className="h">
                <Link href={`/product-page/${category}/${product.id}`} className="name text-decoration-none text-heading fw-semibold">
                  {product.name.substring(0, 30)}..
                </Link>
              </div>
              <br />
              <p className="price m-0"> {product.price ? ( <b className="me-3">{product.price.replace(/[.]/, "LE")}</b>) : (<b>N/A</b>)}
                {product.old_price && (
                  <del className="oldPrice">{Number(product.old_price.replace(/[^0-9.]/g, ""))}LE</del>
                )}
              </p>
              <hr className="my-2" />
              {/* {product.rating && (<div className="rate fw-semibold text-success"><b>{Number(product.rating)}</b> out of 5 stars</div>)} */}
              {product.rating && (<div className="rate fw-semibold text-success">{Number(product.rating) !== NaN ? <span><b>{product.rating}</b> out of 5 stars</span> : (<span>N/A</span>)}</div>)}
              <div>
                {product.discount && (
                  <div className="discount text-center align-content-center text-white fw-bold py-2 position-absolute">
                    {Number(product.discount.replace(/[^0-9.]/g, ""))}% <br />OFF
                  </div>
                )}
              </div>
            </div>
          </div>
        )))}
      </div>

      <div className="pagination d-flex justify-content-center mb-5">
        <button className="btn btn-outline-primary me-2" onClick={prev} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="align-self-center px-2">page {currentPage} from {totalPages}</span>
        <button className="btn btn-outline-primary ms-2" onClick={next} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}
export default ProductList;
