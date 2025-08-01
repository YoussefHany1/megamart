import styles from "./essentials.module.css";
import Link from "next/link";

function Essentials() {
  return (
    <>
      <section className="daily my-5 py-3">
        <div className="header text-secondary d-flex justify-content-between fw-bold">
          <div className="line fs-4 pb-3">
            Daily <p className="text-primary d-inline">Essentials</p>
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
        <div className="essentials d-flex justify-content-center align-items-center p-lg-5 p-0 mt-4 row">
          <div className="item col-lg-2 col-md-3 col-6 mb-5">
            <div
              className={`photo align-content-center text-center rounded-4 overflow-hidden ${styles.photo}`}
            >
              <Link href="#">
                <img
                  src="./essentials/daily-essentials.png"
                  className="img-fluid"
                  alt="Dairy, Cheese & Eggs"
                />
              </Link>
            </div>
            <div className="text text-center mt-3">
              <Link
                href="#"
                className="text-decoration-none text-secondary text-nowrap"
              >
                Dairy, Cheese & Eggs
                <br />
                <b className="fs-5 text-heading">UP to 50% OFF</b>
              </Link>
            </div>
          </div>
          <div className="item col-lg-2 col-md-3 col-6 mb-5">
            <div
              className={`photo align-content-center text-center rounded-4 overflow-hidden ${styles.photo}`}
            >
              <Link href="#">
                <img
                  src="./essentials/fruits.png"
                  className="img-fluid"
                  alt="Fruits and Vegetables"
                />
              </Link>
            </div>
            <div className="text text-center mt-3">
              <Link
                href="#"
                className="text-decoration-none text-secondary text-nowrap"
              >
                Fruits & Vegetables
                <br />
                <b className="fs-5 text-heading">UP to 50% OFF</b>
              </Link>
            </div>
          </div>
          <div className="item col-lg-2 col-md-3 col-6 mb-5">
            <div
              className={`photo align-content-center text-center rounded-4 overflow-hidden ${styles.photo}`}
            >
              <Link href="#">
                <img
                  src="./essentials/bread.webp"
                  className="img-fluid"
                  alt="Beard"
                />
              </Link>
            </div>
            <div className="text text-secondary text-center mt-3">
              <Link
                href="#"
                className="text-decoration-none text-secondary text-nowrap"
              >
                Breads & Bakery
                <br />
                <b className="fs-5 text-heading">UP to 50% OFF</b>
              </Link>
            </div>
          </div>
          <div className="item col-lg-2 col-md-3 col-6 mb-5">
            <div
              className={`photo align-content-center text-center rounded-4 overflow-hidden ${styles.photo}`}
            >
              <Link href="#">
                <img
                  src="./essentials/home-care.webp"
                  className="img-fluid"
                  alt="Home Care & Cleaning"
                />
              </Link>
            </div>
            <div className="text text-center mt-3">
              <Link
                href="#"
                className="text-decoration-none text-secondary text-nowrap"
              >
                Home Care & Cleaning
                <br />
                <b className="fs-5 text-heading">UP to 50% OFF</b>
              </Link>
            </div>
          </div>
          <div className="item col-lg-2 col-md-3 col-6 mb-5">
            <div
              className={`photo align-content-center text-center rounded-4 overflow-hidden ${styles.photo}`}
            >
              <Link href="#">
                <img
                  src="./essentials/beverages.webp"
                  className="img-fluid"
                  alt="Beverages"
                />
              </Link>
            </div>
            <div className="text text-center mt-3">
              <Link
                href="#"
                className="text-decoration-none text-secondary text-nowrap"
              >
                Beverages
                <br />
                <b className="fs-5 text-heading">UP to 50% OFF</b>
              </Link>
            </div>
          </div>
          <div className="item col-lg-2 col-md-3 col-6 mb-5">
            <div
              className={`photo align-content-center text-center rounded-4 overflow-hidden ${styles.photo}`}
            >
              <Link href="#">
                <img
                  src="./essentials/food.webp"
                  className="img-fluid"
                  alt="Food"
                />
              </Link>
            </div>
            <div className="text text-center mt-3">
              <Link
                href="#"
                className="text-decoration-none text-secondary text-nowrap"
              >
                Food
                <br />
                <b className="fs-5 text-heading">UP to 50% OFF</b>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Essentials;
