import '../styles/essentials.css'

function Essentials() {
    return (
    <>
        <section className="daily my-5 py-3">
            <div className="header d-flex justify-content-between fw-bold">
                <div className="line fs-4 pb-3">Daily <p className="color d-inline">Essentials</p></div>
                <a href="#" className="text-decoration-none d-flex align-items-center"><small className="fw-normal">View All <svg viewBox="0 0 60 60"><path stroke="#008ECC" strokeWidth="3" d="M15.563 40.836a.997.997 0 0 0 1.414 0l15-15a1 1 0 0 0 0-1.414l-15-15a.999.999 0 1 0-1.414 1.414l14.293 14.293-14.293 14.293a1 1 0 0 0 0 1.414"/></svg></small></a>
            </div>
            <div className="essentials d-flex justify-content-center align-items-center p-lg-5 p-0 mt-4 row">
                <div className="item col-lg-2 col-md-3 col-6 mb-5">
                    <div className="photo align-content-center text-center rounded-4"><a href="#"><img src="./essentials/daily-essentials.png" className="img-fluid" alt="Dairy, Cheese & Eggs" /></a></div>
                        <div className="text text-center mt-3"><a href="#" className="text-decoration-none">Dairy, Cheese & Eggs<br /><b className="fs-5">UP to 50% OFF</b></a></div>
                    </div>
                <div className="item col-lg-2 col-md-3 col-6 mb-5">
                    <div className="photo align-content-center text-center rounded-4"><a href="#"><img src="./essentials/fruits.png" className="img-fluid" alt="Fruits and Vegetables" /></a></div>
                    <div className="text text-center mt-3"><a href="#" className="text-decoration-none">Fruits & Vegetables<br /><b className="fs-5">UP to 50% OFF</b></a></div>
                </div>
                <div className="item col-lg-2 col-md-3 col-6 mb-5">
                    <div className="photo align-content-center text-center rounded-4"><a href="#"><img src="./essentials/bread.webp" className="img-fluid" alt="Beard" /></a></div>
                    <div className="text text-center mt-3"><a href="#" className="text-decoration-none">Breads & Bakery<br /><b className="fs-5">UP to 50% OFF</b></a></div>
                </div>
                <div className="item col-lg-2 col-md-3 col-6 mb-5">
                    <div className="photo align-content-center text-center rounded-4"><a href="#"><img src="./essentials/home-care.webp" className="img-fluid" alt="Home Care & Cleaning" /></a></div>
                    <div className="text text-center mt-3"><a href="#" className="text-decoration-none">Home Care & Cleaning<br /><b className="fs-5">UP to 50% OFF</b></a></div>
                </div>
                <div className="item col-lg-2 col-md-3 col-6 mb-5">
                    <div className="photo align-content-center text-center rounded-4"><a href="#"><img src="./essentials/beverages.webp" className="img-fluid" alt="Beverages" /></a></div>
                    <div className="text text-center mt-3"><a href="#" className="text-decoration-none">Beverages<br /><b className="fs-5">UP to 50% OFF</b></a></div>
                </div>
                <div className="item col-lg-2 col-md-3 col-6 mb-5">
                    <div className="photo align-content-center text-center rounded-4"><a href="#"><img src="./essentials/food.webp" className="img-fluid" alt="Food" /></a></div>
                    <div className="text text-center mt-3"><a href="#" className="text-decoration-none">Food<br /><b className="fs-5">UP to 50% OFF</b></a></div>
                </div>
            </div>
        </section>
    </>
    )
}

export default Essentials
