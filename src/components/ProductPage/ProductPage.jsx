// import './App.css'
import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function App() {
        const [phones, setPhones] = useState([]);
        const [error, setError] = useState(null);
        const { key } = useParams();
        useEffect(() => {
          const fetchPhones = async () => {
            try {
              const response = await fetch(`https://gist.githubusercontent.com/YoussefHany1/33ca89b7508ef3794d5c27d913803a47/raw/cc698e1b13e72e7256574dde118dce4dfd8a299b/phoneData.json/${key}`);
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
    return (
        <>
            {error && <p className="text-danger">{error}</p>}
            <div className="phones d-flex align-items-center justify-content-center mt-5 pb-5" id="phones">
                {phones.map((product, index) => (
                product.discount && (
                    <div key={index} className="product card border-0 rounded-4 flex-shrink-1">
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
                    </div>

            )
        ))}
        </div>
        </>
    )
}

export default App
