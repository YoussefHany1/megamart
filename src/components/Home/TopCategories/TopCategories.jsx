import './topCategories.css'
import mobile from '../../../assets/topCategories/mobile.png'
import cosmetics from '../../../assets/topCategories/cosmetics.png'
import electronics from '../../../assets/topCategories/electronics.png'
import furniture from '../../../assets/topCategories/furniture.png'
import watches from '../../../assets/topCategories/watches.png'
import decor from '../../../assets/topCategories/decor.png'
import accessories from '../../../assets/topCategories/accessories.png'
import Arrow from '../../../assets/Arrow.jsx';
function TopCategories() {
    return (
        <>
            <section className="topCat mb-0 mb-lg-5 pb-0 pb-lg-3">
                <div className="header d-flex justify-content-between fw-bold">
                    <div className="line fs-4 pb-3">Shop From <p className="color d-inline">Top Categories</p></div>
                    <a href="#" className="text-decoration-none d-flex align-items-center"><small className="fw-normal">View All <Arrow /></small></a>
                </div>
                <div className="categories d-flex justify-content-center text-center row mt-5">
                    <div className="cat col mb-5 mb-lg-0">
                        <div className="photo rounded-circle align-content-center"><img src={mobile} alt="Mobiles" /></div>
                        <div className="text mt-3"><a href="#" className="text-black text-decoration-none fw-medium">Mobiles</a></div>
                    </div>
                    <div className="cat col mb-5 mb-lg-0">
                        <div className="photo rounded-circle align-content-center"><img src={cosmetics} alt="Beauty" /></div>
                        <div className="text mt-3"><a href="#" className="text-black text-decoration-none fw-medium">Beauty</a></div>
                    </div>
                    <div className="cat col mb-5 mb-lg-0">
                        <div className="photo rounded-circle align-content-center"><img src={electronics} alt="Electronics" /></div>
                        <div className="text mt-3"><a href="#" className="text-black text-decoration-none fw-medium">Electronics</a></div>
                    </div>
                    <div className="cat col mb-5 mb-lg-0">
                        <div className="photo rounded-circle align-content-center"><img src={furniture} alt="Home Appliances" /></div>
                        <div className="text mt-3"><a href="#" className="text-black text-decoration-none fw-medium">Home Appliances</a></div>
                    </div>
                    <div className="cat col mb-5 mb-lg-0">
                        <div className="photo rounded-circle align-content-center"><img src={watches} alt="Wearables" /></div>
                        <div className="text mt-3"><a href="#" className="text-black text-decoration-none fw-medium">Wearables</a></div>
                    </div>
                    <div className="cat col mb-5 mb-lg-0">
                        <div className="photo rounded-circle align-content-center"><img src={decor} alt="Home Decor" /></div>
                        <div className="text mt-3"><a href="#" className="text-black text-decoration-none fw-medium">Home Decor</a></div>
                    </div>
                    <div className="cat col mb-5 mb-lg-0">
                        <div className="photo rounded-circle align-content-center"><img src={accessories} alt="Accessories" /></div>
                        <div className="text mt-3"><a href="#" className="text-black text-decoration-none fw-medium">Accessories</a></div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TopCategories
