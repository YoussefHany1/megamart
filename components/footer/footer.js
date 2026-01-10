import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";

function Footer() {
  return (
    <>
      <footer
        className={`footer bg-(--primary) text-white relative overflow-hidden pt-5 px-[10%] mx-[-12.5%] ${styles.footer}`}
      >
        {/* Contact Section */}
        <div className="text relative sm:flex block p-10">
          <div className="contactUs flex flex-col justify-between md:pr-5 md:mr-5 items-center sm:items-start text-nowrap">
            <Link href="/" className="pb-2 text-white font-bold text-4xl">
              MegaMart
            </Link>
            <div className="font-medium text-2xl pb-2">
              <b>Contact US</b>
            </div>
            <div className="whatsapp">
              <div className="text font-medium text-lg flex items-center">
                <svg fill="#fff">
                  <path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1c-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5s.2-.3.4-.4c.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4S9.7 8.5 9.5 8c-.1-.7-.3-.7-.5-.7h-.5c-.2 0-.5.2-.6.3Q7 8.5 7 9.7c.1.9.4 1.8 1 2.6 1.1 1.6 2.5 2.9 4.2 3.7.5.2.9.4 1.4.5.5.2 1 .2 1.6.1.7-.1 1.3-.6 1.7-1.2.2-.4.2-.8.1-1.2zm2.5-9.1C15.2 1 8.9 1 5 4.9c-3.2 3.2-3.8 8.1-1.6 12L2 22l5.3-1.4c1.5.8 3.1 1.2 4.7 1.2 5.5 0 9.9-4.4 9.9-9.9.1-2.6-1-5.1-2.8-7m-2.7 14c-1.3.8-2.8 1.3-4.4 1.3-1.5 0-2.9-.4-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3c-2.4-4-1.2-9 2.7-11.5S16.6 3.7 19 7.5c2.4 3.9 1.3 9-2.6 11.4" />
                </svg>
                Whats App
              </div>
              <div className="num font-semibold pl-5">+20 102-345-6789</div>
            </div>
            <div className="callUs py-3">
              <div className="text font-medium text-lg flex justify-center sm:justify-start items-center">
                <svg>
                  <path
                    d="M21 15v3.93a2 2 0 0 1-2.29 2A18 18 0 0 1 3.14 5.29 2 2 0 0 1 5.13 3H9a1 1 0 0 1 1 .89 10.7 10.7 0 0 0 1 3.78 1 1 0 0 1-.42 1.26l-.86.49a1 1 0 0 0-.33 1.46 14.1 14.1 0 0 0 3.69 3.69 1 1 0 0 0 1.46-.33l.49-.86a1 1 0 0 1 1.3-.38 10.7 10.7 0 0 0 3.78 1 1 1 0 0 1 .89 1"
                    style={{
                      fill: "none",
                      stroke: "#fff",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 1.6,
                    }}
                  />
                </svg>
                Call US
              </div>
              <div className="num font-semibold pl-5">+20 102-345-6789</div>
            </div>
            <div className="app">
              <div className="text pb-2 font-medium text-lg">
                <b>Download App</b>
              </div>
              <div className="photos flex justify-between">
                <Link href="/" className="mr-1">
                  <Image
                    width={160}
                    height={55}
                    src="/footer/apple.webp"
                    alt="Download on the APP Store"
                    className="apple max-w-full h-auto"
                  />
                </Link>
                <Link href="/" className="ml-1">
                  <Image
                    width={180}
                    height={55}
                    src="/footer/google.webp"
                    alt="Get it on Google Play"
                    className="google max-w-full h-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
          {/* Popular Categories Section */}
          <div className="popular hidden sm:flex flex-col justify-between px-5 lg:ml-52">
            <div
              className={`headerColumn text-white font-semibold text-lg w-fit border-b-2 border-(--border) whitespace-nowrap lg:mr-18`}
            >
              Most Popular Categories
            </div>
            <ul
              className={`list-disc flex flex-col justify-between font-medium ml-1 mt-4 h-full`}
            >
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-(--heading) duration-300"
                >
                  Staples
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-(--heading) duration-300"
                >
                  Beverages
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-(--heading) duration-300"
                >
                  Personal Care
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-(--heading) duration-300"
                >
                  Home Care
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-(--heading) duration-300"
                >
                  Baby Care
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-(--heading) duration-300"
                >
                  Vegetables & Fruits
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-(--heading) duration-300"
                >
                  Snacks & Foods
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-(--heading) duration-300"
                >
                  Dairy & Bakery
                </Link>
              </li>
            </ul>
          </div>
          {/* Customer Services Section */}
          <div className="services hidden lg:flex flex-col justify-between pl-3">
            <div
              className={`headerColumn text-white font-semibold text-lg w-fit border-b-2 border-(--border) whitespace-nowrap`}
            >
              Customer Services
            </div>
            <ul
              className={`list-disc flex flex-col justify-between font-medium ml-1 mt-4 h-full`}
            >
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-(--heading) duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-(--heading) duration-300"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-(--heading) duration-300"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-(--heading) duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-(--heading) duration-300"
                >
                  E-waste Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-(--heading) duration-300"
                >
                  Cancellation & Return Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="down flex justify-center text-gray-300 py-4 border-t-2 text-center">
          &copy; 2025 All rights reserved. Reliance Retail Ltd.
        </div>
      </footer>
    </>
  );
}

export default Footer;
