import  { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import '@splidejs/react-splide/css';
import './phones.css';
import Arrow from '../../assets/Arrow.jsx';

function Phone () {
//     const [phones, setPhones] = useState([]);
// useEffect(() => {
// fetch("https://api.myjson.online/v1/records/006829b3-4ab6-47ad-984d-6011091d7020")
// .then((response) => response.json())
// .then((data) => {
// setPhones(data.data.phones);
// })
// .catch((error) => console.error("Error fetching data:", error));
// }, []);
    const [phones, setPhones] = useState([]);

    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchPhones = async () => {
        try {
          const response = await fetch("https://gist.githubusercontent.com/YoussefHany1/33ca89b7508ef3794d5c27d913803a47/raw/cc698e1b13e72e7256574dde118dce4dfd8a299b/phoneData.json");
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setPhones(data.phones);
          setError(null);
        } catch (err) {
          setError(`Error fetching data: ${err instanceof Error ? err.message : String(err)}`);
          console.error("Error fetching data:", err);
        }
      };
      // fetchPhones();
      addEventListener("DOMContentLoaded", fetchPhones());
    }, []);
  
//   addEventListener("DOMContentLoaded", useEffect());
  return (
    <section className="smartPhones my-5 pt-3">
        <div className="header d-flex justify-content-between fw-bold">
            <div className="line fs-4 pb-3">Grab the best deal on <p className="color d-inline">Smartphones</p></div>
                <a href="#" className="text-decoration-none d-flex align-items-center flex-nowrap"><small className="fw-normal">View All <Arrow /></small></a>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <Splide options={ {rewind: true, type:'slide', perMove: 1, gap: '1.5rem', pagination: false} } className="phones d-flex align-items-center justify-content-center mt-5 pb-5" id="phones">
                {phones.map((product, index) => (
                product.discount && (
                    <SplideSlide key={index} className="product card border-0 rounded-4 flex-shrink-1">
                        <a href={product.url} className="image d-flex justify-content-center bg-white position-relative m-auto rounded-top-4">
                            <img src={product.image} className="card-img-top" alt={product.name} />
                        </a>
                        <div className="text card-body lh-1 m-auto">
                            <div className="h">
                                <a href={product.url} className="text-decoration-none fw-semibold"> {product.name} {product.h2 ? product.h2.substring(0, 10) : ""}..</a>
                            </div>
                            <br />
                            <p className="m-0">
                                <b className="me-3">{product.price ? product.price : "not available"}
                                </b>
                                <del>{product.oldPrice ? product.oldPrice : ""}</del>
                            </p>
                            <hr className="my-2" />
                            <div className="save fw-semibold text-success">
                                <b>{product.rating}</b> out of 5 stars
                            </div>
                            <div>
                                <div className="off text-center align-content-center text-white fw-bold py-2 position-absolute"> {product.discount} <br />OFF</div>
                            </div>
                        </div>
                    </SplideSlide>

            )
        ))}
        </Splide>
    </section>
  );
};

export default Phone;
