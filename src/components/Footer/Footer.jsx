import './footer.css'
import apple from '../../assets/footer/apple.png'
import google from '../../assets/footer/google.png'
import logo from '../../assets/footer/logo.png'
function App() {
    return (
    <>
        <footer className="footer text-white position-relative overflow-hidden pt-5 ">
            <div className="text d-flex pb-5">
                <div className="first-column d-flex flex-column justify-content-between pe-5 me-5">
                    <div className="logo pb-2"><img src={logo} className="" alt="website logo" /></div>
                    <div className="size fw-medium fs-4 pb-2"><b>Contact US</b></div>
                    <div className="whatsapp">
                        <div className="text fw-medium fs-5"><svg fill="#fff"> <path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1c-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5s.2-.3.4-.4c.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4S9.7 8.5 9.5 8c-.1-.7-.3-.7-.5-.7h-.5c-.2 0-.5.2-.6.3Q7 8.5 7 9.7c.1.9.4 1.8 1 2.6 1.1 1.6 2.5 2.9 4.2 3.7.5.2.9.4 1.4.5.5.2 1 .2 1.6.1.7-.1 1.3-.6 1.7-1.2.2-.4.2-.8.1-1.2zm2.5-9.1C15.2 1 8.9 1 5 4.9c-3.2 3.2-3.8 8.1-1.6 12L2 22l5.3-1.4c1.5.8 3.1 1.2 4.7 1.2 5.5 0 9.9-4.4 9.9-9.9.1-2.6-1-5.1-2.8-7m-2.7 14c-1.3.8-2.8 1.3-4.4 1.3-1.5 0-2.9-.4-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3c-2.4-4-1.2-9 2.7-11.5S16.6 3.7 19 7.5c2.4 3.9 1.3 9-2.6 11.4" /></svg>
                        Whats App</div>
                        <div className="num fw-semibold ps-5">+20 102-345-6789</div>
                    </div>
                    <div className="callus py-3">
                        <div className="text fw-medium fs-5"><svg><path d="M21 15v3.93a2 2 0 0 1-2.29 2A18 18 0 0 1 3.14 5.29 2 2 0 0 1 5.13 3H9a1 1 0 0 1 1 .89 10.7 10.7 0 0 0 1 3.78 1 1 0 0 1-.42 1.26l-.86.49a1 1 0 0 0-.33 1.46 14.1 14.1 0 0 0 3.69 3.69 1 1 0 0 0 1.46-.33l.49-.86a1 1 0 0 1 1.3-.38 10.7 10.7 0 0 0 3.78 1 1 1 0 0 1 .89 1" style={{fill: "none", stroke: "#fff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.6,}}/></svg>
                        Call US</div>
                        <div className="num fw-semibold ps-5">+20 102-345-6789</div>
                    </div>
                    <div className="app">
                        <div className="text pb-2 fw-medium fs-5"><b>Download App</b></div>
                        <div className="photos d-flex justify-content-between">
                            <a href="#" className='me-2'><img src={apple} alt="APP Store" className="apple img-fluid" /></a>
                            <a href="#"><img src={google} alt="Google Play" className="google img-fluid" /></a>
                        </div>
                    </div>
                </div>
                <div className="second-column d-flex flex-column justify-content-between px-5">
                    <div className="header fw-semibold fs-5">Most Popular Categories</div>
                    <ul className="list d-flex flex-column justify-content-between fw-medium ms-1 mt-4 h-100">
                        <li><a href="#" className="text-decoration-none">Staples</a></li>
                        <li><a href="#" className="text-decoration-none">Beverages</a></li>
                        <li><a href="#" className="text-decoration-none">Personal Care</a></li>
                        <li><a href="#" className="text-decoration-none">Home Care</a></li>
                        <li><a href="#" className="text-decoration-none">Baby Care</a></li>
                        <li><a href="#" className="text-decoration-none">Vegetables & Fruits</a></li>
                        <li><a href="#" className="text-decoration-none">Snacks & Foods</a></li>
                        <li><a href="#" className="text-decoration-none">Dairy & Bakery</a></li>
                    </ul>
                </div>
                <div className="third-column d-flex flex-column justify-content-between ps-3">
                    <div className="header fw-semibold fs-5">Customer Services</div>
                    <ul className="list d-flex flex-column justify-content-between fw-medium ms-1 mt-4 h-100">
                        <li><a href="#" className="text-decoration-none">About Us</a></li>
                        <li><a href="#" className="text-decoration-none">Terms & Conditions</a></li>
                        <li><a href="#" className="text-decoration-none">FAQ</a></li>
                        <li><a href="#" className="text-decoration-none">Privacy Policy</a></li>
                        <li><a href="#" className="text-decoration-none">E-waste Policy</a></li>
                        <li><a href="#" className="text-decoration-none">Cancellation & Return Policy</a></li>
                    </ul>
                    </div>
            </div>
            <div className="down d-flex justify-content-center text-white py-4">
                © 2025 All rights reserved. Reliance Retail Ltd.
            </div>
        </footer>
    </>
    )
}

export default App
