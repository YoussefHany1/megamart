import styles from './top-categories.module.css';
function TopCategories() {
    return (
        <>
            <section className="topCat mb-0 mb-lg-5 pb-0 pb-lg-3">
                <div className="header text-secondary d-flex justify-content-between fw-bold">
                    <div className="line fs-4 pb-3">Shop From <p className="text-primary d-inline">Top Categories</p></div>
                    <a href="#" className="text-decoration-none d-flex align-items-center"><small className="fw-normal">View All <svg viewBox="0 0 60 60"><path stroke="#008ECC" strokeWidth="3" d="M15.563 40.836a.997.997 0 0 0 1.414 0l15-15a1 1 0 0 0 0-1.414l-15-15a.999.999 0 1 0-1.414 1.414l14.293 14.293-14.293 14.293a1 1 0 0 0 0 1.414"/></svg></small></a>
                </div>
                <div className={`categories d-flex justify-content-evenly flex-wrap text-center mt-5 ${styles.categories}`}>
                    <div className={`cat mb-5 mb-lg-0 ${styles.cat}`}>
                        <div className={`photo rounded-circle align-content-center ${styles.photo}`}><img src="./top-categories/mobile.png" alt="Mobiles" /></div>
                        <div className="text mt-3"><a href="/phones" className="text-black text-decoration-none fw-medium">Mobiles</a></div>
                    </div>
                    <div className={`cat mb-5 mb-lg-0 ${styles.cat}`}>
                        <div className={`photo rounded-circle align-content-center ${styles.photo}`}><img src="./top-categories/watches.png" alt="Wearables" /></div>
                        <div className="text mt-3"><a href="/wearables" className="text-black text-decoration-none fw-medium">Wearables</a></div>
                    </div>
                    <div className={`cat mb-5 mb-lg-0 ${styles.cat}`}>
                        <div className={`photo rounded-circle align-content-center ${styles.photo}`}><img src="./top-categories/tv.png" alt="Accessories"  className="w-100 p-2" /></div>
                        <div className="text mt-3"><a href="/television" className="text-black text-decoration-none fw-medium">Televisions</a></div>
                    </div>
                    <div className={`cat mb-5 mb-lg-0 ${styles.cat}`}>
                        <div className={`photo rounded-circle align-content-center ${styles.photo}`}><img src="./top-categories/pc.png" alt="Accessories"  className="w-100 p-3" /></div>
                        <div className="text mt-3"><a href="/computers" className="text-black text-decoration-none fw-medium">Computers</a></div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TopCategories
