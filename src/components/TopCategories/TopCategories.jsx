import './topCategories.css'
import mobile from '../../assets/topCategories/mobile.png'
import cosmetics from '../../assets/topCategories/cosmetics.png'
import electronics from '../../assets/topCategories/electronics.png'
import furniture from '../../assets/topCategories/furniture.png'
import watches from '../../assets/topCategories/watches.png'
import decor from '../../assets/topCategories/decor.png'
import accessories from '../../assets/topCategories/accessories.png'
import Arrow from '../../assets/Arrow.jsx';
function App() {
    return (
        <>
            <section className="topCat mb-5 pb-3">
                <div className="header d-flex justify-content-between fw-bold">
                    <div className="line fs-4 pb-3">Shop From <p className="color d-inline">Top Categories</p></div>
                    <a href="#" className="text-decoration-none d-flex align-items-center"><small className="fw-normal">View All <Arrow /></small></a>
                </div>
                <div className="categories d-flex justify-content-center text-center row mt-5">
                    <div className="cat col">
                        <div className="photo rounded-circle align-content-center"><img src={mobile} className="" alt="Mobile" /></div>
                        <div className="text mt-3"><a href="#" className="text-black text-decoration-none fw-medium">Mobile</a></div>
                    </div>
                    <div className="cat col">
                        <div className="photo rounded-circle align-content-center"><img src={cosmetics} className="" alt="Cosmetics" /></div>
                        <div className="text mt-3"><a href="#" className="text-black text-decoration-none fw-medium">Cosmetics</a></div>
                    </div>
                    <div className="cat col">
                        <div className="photo rounded-circle align-content-center"><img src={electronics} className="" alt="Electronics" /></div>
                        <div className="text mt-3"><a href="#" className="text-black text-decoration-none fw-medium">Electronics</a></div>
                    </div>
                    <div className="cat col">
                        <div className="photo rounded-circle align-content-center"><img src={furniture} className="" alt="Furniture" /></div>
                        <div className="text mt-3"><a href="#" className="text-black text-decoration-none fw-medium">Furniture</a></div>
                    </div>
                    <div className="cat col">
                        <div className="photo rounded-circle align-content-center"><img src={watches} className="" alt="Watches" /></div>
                        <div className="text mt-3"><a href="#" className="text-black text-decoration-none fw-medium">Watches</a></div>
                    </div>
                    <div className="cat col">
                        <div className="photo rounded-circle align-content-center"><img src={decor} className="" alt="Decor" /></div>
                        <div className="text mt-3"><a href="#" className="text-black text-decoration-none fw-medium">Decor</a></div>
                    </div>
                    <div className="cat col">
                        <div className="photo rounded-circle align-content-center"><img src={accessories} className="" alt="Accessories" /></div>
                        <div className="text mt-3"><a href="#" className="text-black text-decoration-none fw-medium">Accessories</a></div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default App
