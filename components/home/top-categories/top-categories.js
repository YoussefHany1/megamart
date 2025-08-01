import Link from "next/link";
import Image from "next/image";
import styles from "./top-categories.module.css";
function TopCategories() {
  return (
    <>
      <section className="topCat mb-0 mb-lg-5 pb-0 pb-lg-3">
        <div className="header text-secondary d-flex justify-content-between fw-bold">
          <div className="line fs-4 pb-3">
            Shop From <p className="text-primary d-inline">Top Categories</p>
          </div>
          <Link
            href="#"
            className="text-decoration-none d-flex align-items-center"
          >
            <small className="fw-normal">
              View All{" "}
              <svg viewBox="0 0 60 60">
                <path
                  stroke="#008ECC"
                  strokeWidth="3"
                  d="M15.563 40.836a.997.997 0 0 0 1.414 0l15-15a1 1 0 0 0 0-1.414l-15-15a.999.999 0 1 0-1.414 1.414l14.293 14.293-14.293 14.293a1 1 0 0 0 0 1.414"
                />
              </svg>
            </small>
          </Link>
        </div>
        <div
          className={`categories row justify-content-evenly flex-wrap text-center mt-5 ${styles.categories}`}
        >
          <div
            className={`cat mb-5 col-6 col-md-4 col-lg-3 mb-lg-0 ${styles.cat}`}
          >
            <div
              className={`photo rounded-circle align-content-center ${styles.photo}`}
            >
              <Image
                width={70}
                height={150}
                className="img-fluid p-2"
                src="./top-categories/mobile.webp"
                alt="Mobiles"
              />
            </div>
            <div className="text mt-3">
              <Link
                href="/phones"
                className="text-black text-decoration-none fw-medium w-100 p-2"
              >
                Mobiles
              </Link>
            </div>
          </div>
          <div
            className={`cat mb-5 col-6 col-md-4 col-lg-3 mb-lg-0 ${styles.cat}`}
          >
            <div
              className={`photo rounded-circle align-content-center ${styles.photo}`}
            >
              <Image
                width={100}
                height={100}
                className="img-fluid p-2"
                src="./top-categories/watches.webp"
                alt="Wearables"
              />
            </div>
            <div className="text mt-3">
              <Link
                href="/wearables"
                className="text-black text-decoration-none fw-medium"
              >
                Wearables
              </Link>
            </div>
          </div>
          <div
            className={`cat mb-5 col-6 col-md-4 col-lg-3 mb-lg-0 ${styles.cat}`}
          >
            <div
              className={`photo rounded-circle align-content-center ${styles.photo}`}
            >
              <Image
                width={100}
                height={100}
                src="./top-categories/tv.webp"
                alt="Accessories"
                className="w-100 p-2 img-fluid"
              />
            </div>
            <div className="text mt-3">
              <Link
                href="/television"
                className="text-black text-decoration-none fw-medium"
              >
                Televisions
              </Link>
            </div>
          </div>
          <div
            className={`cat mb-5 col-6 col-md-4 col-lg-3 mb-lg-0 ${styles.cat}`}
          >
            <div
              className={`photo rounded-circle align-content-center ${styles.photo}`}
            >
              <Image
                width={100}
                height={100}
                src="./top-categories/pc.webp"
                alt="Accessories"
                className="w-100 p-3 img-fluid"
              />
            </div>
            <div className="text mt-3">
              <Link
                href="/computers"
                className="text-black text-decoration-none fw-medium"
              >
                Computers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TopCategories;
