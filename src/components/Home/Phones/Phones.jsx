import  { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import '@splidejs/react-splide/css';
import './phones.css';
import Arrow from '../../../assets/Arrow.jsx';
import { Link } from "react-router-dom";
import axios from 'axios';

function Phone () {
    const [phones, setPhones] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
      const fetchPhones = async () => {
        try {
          const response = await axios.get(`https://gist.githubusercontent.com/YoussefHany1/33ca89b7508ef3794d5c27d913803a47/raw/849f5a1e88215fe97d9c4382a8a9b7235b7c670c/phoneData.json`);
          console.log(response.data); 
          setPhones(response.data.products);
        } catch (error) {
          setError(error.message);
          console.error(error);
        }
      };
    
      fetchPhones();
    }, []);
    // console.log("phones", phones);
    
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
                        <Link to={`/product/${index}`} state={{ product }} className="image d-flex justify-content-center bg-white position-relative m-auto rounded-top-4">
                            <img src={product.pic} className="card-img-top p-2" alt={product.name} />
                        </Link>
                        <div className="text card-body lh-1 m-auto">
                            <div className="h">
                                <Link to={`/product/${index}`} state={{ product }} className="text-decoration-none fw-semibold"> {product.name.substring(0, 30)}..</Link>
                            </div>
                            <br />
                            <p className="m-0">
                              <b className="me-3">{product.price ? product.price.replace(/[.]/, "") : "N/A"} LE</b>
                              <del>{product.old_price ? Number(product.old_price.replace(/[^0-9.]/g, "")) : ""} LE</del>
                            </p>
                            <hr className="my-2" />
                            <div className="save fw-semibold text-success">
                                <b>{product.rating}</b> out of 5 stars
                            </div>
                            <div>
                                <div className="off text-center align-content-center text-white fw-bold py-2 position-absolute"> {Number(product.discount.replace(/[^0-9.]/g, ""))}% <br />OFF</div>
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
