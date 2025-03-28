import './essentials.css'
import essentials from '../../../assets/essentials/daily-essentials.png'
import homeCare from '../../../assets/essentials/home-care.webp'
import fruits from '../../../assets/essentials/fruits.png'
import beard from '../../../assets/essentials/bread.webp'
import beverages from '../../../assets/essentials/beverages.webp'
import food from '../../../assets/essentials/food.webp'
import Arrow from '../../../assets/Arrow.jsx';

function App() {
    return (
    <>
        <section className="daily my-5 py-3">
            <div className="header d-flex justify-content-between fw-bold">
                <div className="line fs-4 pb-3">Daily <p className="color d-inline">Essentials</p></div>
                <a href="#" className="text-decoration-none d-flex align-items-center"><small className="fw-normal">View All <Arrow /></small></a>
            </div>
            <div className="essentials d-flex justify-content-center align-items-center p-lg-5 p-0 mt-4 row">
                <div className="item col-lg-2 col-md-3 col-6 mb-5">
                    <div className="photo align-content-center text-center rounded-4"><a href="#"><img src={essentials} className="img-fluid" alt="Dairy, Cheese & Eggs" /></a></div>
                        <div className="text text-center mt-3"><a href="#" className="text-decoration-none">Dairy, Cheese & Eggs<br /><b className="fs-5">UP to 50% OFF</b></a></div>
                    </div>
                <div className="item col-lg-2 col-md-3 col-6 mb-5">
                    <div className="photo align-content-center text-center rounded-4"><a href="#"><img src={fruits} className="img-fluid" alt="Fruits and Vegetables" /></a></div>
                    <div className="text text-center mt-3"><a href="#" className="text-decoration-none">Fruits & Vegetables<br /><b className="fs-5">UP to 50% OFF</b></a></div>
                </div>
                <div className="item col-lg-2 col-md-3 col-6 mb-5">
                    <div className="photo align-content-center text-center rounded-4"><a href="#"><img src={beard} className="img-fluid" alt="Beard" /></a></div>
                    <div className="text text-center mt-3"><a href="#" className="text-decoration-none">Breads & Bakery<br /><b className="fs-5">UP to 50% OFF</b></a></div>
                </div>
                <div className="item col-lg-2 col-md-3 col-6 mb-5">
                    <div className="photo align-content-center text-center rounded-4"><a href="#"><img src={homeCare} className="img-fluid" alt="Home Care & Cleaning" /></a></div>
                    <div className="text text-center mt-3"><a href="#" className="text-decoration-none">Home Care & Cleaning<br /><b className="fs-5">UP to 50% OFF</b></a></div>
                </div>
                <div className="item col-lg-2 col-md-3 col-6 mb-5">
                    <div className="photo align-content-center text-center rounded-4"><a href="#"><img src={beverages} className="img-fluid" alt="Beverages" /></a></div>
                    <div className="text text-center mt-3"><a href="#" className="text-decoration-none">Beverages<br /><b className="fs-5">UP to 50% OFF</b></a></div>
                </div>
                <div className="item col-lg-2 col-md-3 col-6 mb-5">
                    <div className="photo align-content-center text-center rounded-4"><a href="#"><img src={food} className="img-fluid" alt="Food" /></a></div>
                    <div className="text text-center mt-3"><a href="#" className="text-decoration-none">Food<br /><b className="fs-5">UP to 50% OFF</b></a></div>
                </div>
            </div>
        </section>
    </>
    )
}

export default App
