import './sideNav.css'
function SideNav() {

    return (
    <>
<div className="sideNav navbar align-items-start offcanvas offcanvas-start overflow-auto flex-row h-100" id="offcanvasNavbar" tabIndex="-1" aria-labelledby="offcanvasNavbarLabel">
    <div className="con offcanvas-body p-0 d-flex flex-column fw-semibold text-nowrap fs-4">
        <button type="button" className="btn-close ms-auto me-4" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        <ul className='list-unstyled navbar-nav flex-grow-1' aria-labelledby="offcanvasNavbar">
            <li className='nav-item ps-3'><a href="#" className="text-decoration-none nav-link text-white">Your Account</a></li>
            <hr />
            <li className='nav-item ps-3'><a href="#" className="text-decoration-none nav-link text-white">Your Cart</a></li>
            {/* <hr /> */}
            <li className="nav-item dropdown ps-3 d-block d-lg-none">
            <hr />
                <a href="#" className="text-decoration-none nav-link dropdown-toggle text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categories</a>
                <ul className="dropdown-menu me-3">
                    {/* <li><a className="dropdown-item" href="#">Groceries</a></li> */}
                    <li className="dropdown">
                        <a className="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown">Electronics & Mobiles</a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item px-4" href="#">Mobiles & Accessories</a></li>
                            <li><a className="dropdown-item px-4" href="#">Computers & Accessories</a></li>
                            <li><a className="dropdown-item px-4" href="#">Wearables</a></li>
                            <li><a className="dropdown-item px-4" href="#">Video Games</a></li>
                            <li><a className="dropdown-item px-4" href="#">Television & Video</a></li>
                            <li><a className="dropdown-item px-4" href="#">Camera & Photo</a></li>
                            <li><a className="dropdown-item px-4" href="#">Tablets & Accessories</a></li>
                            {/* <li className="dropdown">
                                <a className="dropdown-item px-4" href="#" data-bs-toggle="dropdown">Home & Kitchen</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item px-5" href="#">Action</a></li>
                                    <li><a className="dropdown-item px-5" href="#">Another action</a></li>
                                    <li><a className="dropdown-item px-5" href="#">Something else here</a></li>
                                </ul>
                            </li> */}
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a className="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown">Home & Kitchen</a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item px-4" href="#">Kitchen & Dining</a></li>
                            <li><a className="dropdown-item px-4" href="#">Home Decor</a></li>
                            <li><a className="dropdown-item px-4" href="#">Home Appliances</a></li>
                            <li><a className="dropdown-item px-4" href="#">Storage & Organisation</a></li>
                            <li><a className="dropdown-item px-4" href="#">Bath</a></li>
                            <li><a className="dropdown-item px-4" href="#">Furniture</a></li>
                            <li><a className="dropdown-item px-4" href="#">Bedding</a></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a className="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown">Fashion</a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item px-4" href="#">Women</a></li>
                            <li><a className="dropdown-item px-4" href="#">Men</a></li>
                            <li><a className="dropdown-item px-4" href="#">Girls</a></li>
                            <li><a className="dropdown-item px-4" href="#">Boys</a></li>
                            <li><a className="dropdown-item px-4" href="#">Bags & Luggage</a></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a className="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown">Beauty & Fragrance</a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item px-4" href="#">Makeup</a></li>
                            <li><a className="dropdown-item px-4" href="#">Hair Care</a></li>
                            <li><a className="dropdown-item px-4" href="#">Personal Care</a></li>
                            <li><a className="dropdown-item px-4" href="#">Skin Care</a></li>
                            <li><a className="dropdown-item px-4" href="#">Fragrance</a></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a className="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown">Home Improvement</a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item px-4" href="#">Lighting & Ceiling Fans</a></li>
                            <li><a className="dropdown-item px-4" href="#">Power & Hand Tools</a></li>
                            <li><a className="dropdown-item px-4" href="#">Kitchen & Bath Fixtures</a></li>
                            <li><a className="dropdown-item px-4" href="#">Electrical</a></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a className="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown">Grocery</a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item px-4" href="#">Home Care & Cleaning</a></li>
                            <li><a className="dropdown-item px-4" href="#">Baby Care & Food</a></li>
                            <li><a className="dropdown-item px-4" href="#">Food</a></li>
                            <li><a className="dropdown-item px-4" href="#">Breads & Bakery</a></li>
                            <li><a className="dropdown-item px-4" href="#">Dairy, Cheese & Eggs</a></li>
                            <li><a className="dropdown-item px-4" href="#">Fruits & Vegetables</a></li>
                            <li><a className="dropdown-item px-4" href="#">Beverages</a></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a className="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown">Pet Supplies</a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item px-4" href="#">Cats</a></li>
                            <li><a className="dropdown-item px-4" href="#">Dogs</a></li>
                            <li><a className="dropdown-item px-4" href="#">Housing & Bedding</a></li>
                            <li><a className="dropdown-item px-4" href="#">Fish & Aquatic Pets</a></li>
                            <li><a className="dropdown-item px-4" href="#">Reptiles & Amphibians</a></li>
                            <li><a className="dropdown-item px-4" href="#">Control Aids & Accessories</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <hr />
            <li className='nav-item ps-3'><a href="#" className="text-decoration-none nav-link text-white">Wishlist</a></li>
            <hr />
            <li className='nav-item ps-3'><a href="#" className="text-decoration-none nav-link text-white">Orders</a></li>
            <hr />
            <li className='nav-item ps-3'><a href="#" className="text-decoration-none nav-link text-white">Payments</a></li>
            <hr />
            <li className='nav-item ps-3'><a href="#" className="text-decoration-none nav-link text-white">Help</a></li>
            <hr />
            <li className='nav-item ps-3'><a href="#" className="text-decoration-none nav-link text-white">Contact Us</a></li>
        </ul>
    </div>
</div>

    </>
    )
}

export default SideNav
