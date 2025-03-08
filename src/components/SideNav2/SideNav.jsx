import './sideNav.css'
function SideNav() {

    return (
    <>
        <div className="sideNav navbar align-items-start offcanvas offcanvas-start overflow-hidden flex-row h-100" id="offcanvasNavbar" tabIndex="-1" aria-labelledby="offcanvasNavbarLabel">
            <div className="con offcanvas-body p-0 d-flex flex-column fw-semibold text-nowrap fs-4">
                <button type="button" className="btn-close ms-auto me-4 mb-4" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                <ul className='list-unstyled navbar-nav flex-grow-1'>
                    <li className='nav-item ps-3'><a href="#" className="text-decoration-none nav-link text-white">Your Account</a></li>
                    <hr />
                    <li className='nav-item ps-3'><a href="#" className="text-decoration-none nav-link text-white">Your Cart</a></li>
                    <hr />
                    <li className="nav-item dropdown ps-3"><a href="#" className="text-decoration-none nav-link dropdown-toggle text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categories</a>
                        <ul className="dropdown-menu me-3">
                            <li><a className="dropdown-item text-white" href="#">Action</a></li>
                            <li><a className="dropdown-item text-white" href="#">Another action</a></li>

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
