import './sideNav.css'
function App() {

    // close
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
    return (
    <>
        <div className="Sidenav overflow-hidden z-2 h-100 position-fixed" id="mySidenav">
                        <div className="con d-flex flex-column mt-4 ms-3 fw-semibold gap-3 text-nowrap fs-4">
                            <a href="javascript:void(0)" className="close text-black text-decoration-none mb-4" onClick={closeNav}>&times;</a>
                            <a href="#" className="text-decoration-none text-white">Your Account</a>
                            <hr />
                            <a href="#" className="text-decoration-none text-white">Your Cart</a>
                            <hr />
                            <a href="#" className="text-decoration-none text-white">Wishlist</a>
                            <hr />
                            <a href="#" className="text-decoration-none text-white">Orders</a>
                            <hr />
                            <a href="#" className="text-decoration-none text-white">Payments</a>
                            <hr />
                            <a href="#" className="text-decoration-none text-white">Help</a>
                            <hr />
                            <a href="#" className="text-decoration-none text-white">Contact Us</a>
                        </div>
                    </div>
    </>
    )
}

export default App
