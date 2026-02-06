"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";

// Data
const CATEGORIES = [
  { name: "Mobiles & Accessories", href: "/product-page/phones" },
  { name: "Computers & Accessories", href: "/product-page/computers" },
  { name: "Wearables", href: "/product-page/wearables" },
  { name: "Video Games", href: "/product-page/video-games" },
  { name: "Television & Video", href: "/product-page/television" },
  { name: "Camera & Photo", href: "/product-page/camera" },
  { name: "Tablets & Accessories", href: "/product-page/tablets" },
];

const SERVICE_LINKS = [
  { name: "About Us", href: "/customer-services/about" },
  { name: "Terms & Conditions", href: "/customer-services/terms-conditions" },
  { name: "FAQ", href: "/customer-services/faq" },
  { name: "Privacy Policy", href: "/customer-services/privacy-policy" },
  { name: "E-waste Policy", href: "/customer-services/e-waste-policy" },
  {
    name: "Cancellation & Return Policy",
    href: "/customer-services/cancellation-policy",
  },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`footer bg-primary text-white relative overflow-hidden pt-5 px-[10%] mx-[-9.5%] ${styles.footer}`}
    >
      <div className="text relative sm:flex block p-10">
        {/* Contact Section */}
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
          <div className="headerColumn text-white font-semibold text-lg w-fit border-b-2 border-border text-nowrap lg:mr-18">
            All Categories
          </div>
          <ul className="list-disc flex flex-col justify-between font-medium ml-1 mt-4 h-full text-nowrap">
            {CATEGORIES.map((cat, index) => (
              <li key={index}>
                <Link
                  href={cat.href}
                  className="text-white hover:text-heading duration-300"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Services Section */}
        <div className="services hidden lg:flex flex-col justify-between pl-3">
          <div className="headerColumn text-white font-semibold text-lg w-fit border-b-2 border-border whitespace-nowrap">
            Customer Services
          </div>
          <ul className="list-disc flex flex-col justify-between font-medium ml-1 mt-4 h-full">
            {SERVICE_LINKS.map((service, index) => (
              <li key={index}>
                <Link
                  href={service.href}
                  className="text-white hover:text-heading duration-300"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="down flex justify-center text-gray-300 py-4 border-t-2 text-center">
        &copy; {currentYear} All rights reserved. Reliance Retail Ltd.
      </div>
    </footer>
  );
}

export default Footer;
