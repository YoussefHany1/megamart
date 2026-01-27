import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";

function Footer() {
  return (
    <>
      <footer
        className={`footer bg-primary text-white relative overflow-hidden pt-5 px-[10%] mx-[-9.5%] ${styles.footer}`}
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
                <WhatsAppIcon sx={{ color: "white" }} className="mr-1" />
                Whats App
              </div>
              <div className="num font-semibold pl-5">+20 102-345-6789</div>
            </div>
            <div className="callUs py-3">
              <div className="text font-medium text-lg flex justify-center sm:justify-start items-center">
                <CallIcon sx={{ color: "white" }} className="mr-1" />
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
          <div className="popular hidden sm:flex flex-col justify-between px-5 lg:ml-52 sm:ml-22 mr-16">
            <div
              className={`headerColumn text-white font-semibold text-lg w-fit border-b-2 border-border text-nowrap lg:mr-18`}
            >
              All Categories
            </div>
            <ul className="list-disc flex flex-col justify-between font-medium ml-1 mt-4 h-full text-nowrap">
              <li>
                <Link
                  href="/product-page/phones"
                  className="text-white hover:text-heading duration-300"
                >
                  Mobiles & Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/product-page/computers"
                  className="text-white hover:text-heading duration-300"
                >
                  Computers & Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/product-page/wearables"
                  className="text-white hover:text-heading duration-300"
                >
                  Wearables
                </Link>
              </li>
              <li>
                <Link
                  href="/product-page/video-games"
                  className="text-white hover:text-heading duration-300"
                >
                  Video Games
                </Link>
              </li>
              <li>
                <Link
                  href="/product-page/television"
                  className="text-white hover:text-heading duration-300"
                >
                  Television & Video
                </Link>
              </li>
              <li>
                <Link
                  href="/product-page/camera"
                  className="text-white hover:text-heading duration-300"
                >
                  Camera & Photo
                </Link>
              </li>
              <li>
                <Link
                  href="/product-page/tablets"
                  className="text-white hover:text-heading duration-300"
                >
                  Tablets & Accessories
                </Link>
              </li>
            </ul>
          </div>
          {/* Customer Services Section */}
          <div className="services hidden lg:flex flex-col justify-between pl-3">
            <div
              className={`headerColumn text-white font-semibold text-lg w-fit border-b-2 border-border whitespace-nowrap`}
            >
              Customer Services
            </div>
            <ul
              className={`list-disc flex flex-col justify-between font-medium ml-1 mt-4 h-full`}
            >
              <li>
                <Link
                  href="/customer-services/about"
                  className="text-white hover:text-heading duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/customer-services/terms-conditions"
                  className="text-white hover:text-heading duration-300"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/customer-services/faq"
                  className="text-white hover:text-heading duration-300"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/customer-services/privacy-policy"
                  className="text-white hover:text-heading duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/customer-services/e-waste-policy"
                  className="text-white hover:text-heading duration-300"
                >
                  E-waste Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/customer-services/cancellation-policy"
                  className="text-white hover:text-heading duration-300"
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
