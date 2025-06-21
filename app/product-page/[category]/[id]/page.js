import './product-page.css';
import axios from 'axios';
import categories from "../../../../stores/data.json";

async function ProductPage({ params }) {
  const { id, category } = params;
  const url = categories[category];
  let product;
  try {
      const res = await axios.get(url);
      const products = res.data.products;
      product = products.find((p) => p.id == id);
  } catch (error) {
      console.error("Error fetching product data:", error);
  }

  if (!product) {
    return <p className="text-danger text-center my-5 fs-3">Product not found</p>;
  }

  return (
    <div className={`${category} py-5`} id={category}>
      <div className="product d-flex flex-lg-row flex-column justify-content-around pb-5">
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
          <div className="about py-3">
            <h4 className='fw-bold'>About this item:</h4>
            {product.about && product.about.map((item, index) => (
              <li className="about py-1" key={index}>
                {item.item}
              </li>
            ))}
          </div>
          <div className="buttons mx-auto w-100 d-flex flex-lg-row flex-column">
            <button type="button" className="btn btn-primary btn-lg w-100 mx-lg-3 mb-lg-0 mb-3 text-nowrap">Buy Now</button>
            <button type="button" className="btn btn-outline-primary btn-lg w-100 mx-lg-3 text-nowrap">Add to Cart</button>
          </div>
        </div>
      </div>
      <div className="header pt-5"><span className='fw-bold fs-4 text-black'>Technical Details:</span>
        <div className='details d-xxl-flex d-block'>
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
          {product.desc && (
            <div className="desc ms-xxl-5">
              <h4 className='fw-bold text-black'>Description:</h4>
              <p>{product.desc}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
