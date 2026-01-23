"use client";
import Link from "next/link";
import { useState, useCallback, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useCartStore } from "../../app/store/cartStore";
import { useAuth } from "../../context/AuthContext";

// Lazy load heavy components
const SideNav = dynamic(() => import("./sideNav/sideNav"), { ssr: false });
const SignIn = dynamic(() => import("../signIn/sign"), { ssr: false });

// Constants
const NAV_ITEMS = [
  { href: "/product-page/phones", label: "Mobiles & Accessories" },
  { href: "/product-page/computers", label: "Computers & Accessories" },
  { href: "/product-page/wearables", label: "Wearables" },
  { href: "/product-page/video-games", label: "Video Games" },
  { href: "/product-page/television", label: "Television & Video" },
  { href: "/product-page/camera", label: "Camera & Photo" },
  { href: "/product-page/tablets", label: "Tablets & Accessories" },
];

// ============================================
// Icon Components - Memoized for performance
// ============================================
const MenuIcon = () => (
  <svg fill="currentColor" aria-hidden="true">
    <path d="M3 8h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2m18 8H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2m0-5H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path
      fill="currentColor"
      d="m15.7 14.3-4.2-4.2c-.2-.2-.5-.3-.8-.3.8-1 1.3-2.4 1.3-3.8 0-3.3-2.7-6-6-6S0 2.7 0 6s2.7 6 6 6c1.4 0 2.8-.5 3.8-1.4 0 .3 0 .6.3.8l4.2 4.2c.2.2.5.3.7.3s.5-.1.7-.3c.4-.3.4-.9 0-1.3M6 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5"
    />
  </svg>
);

const UserIcon = () => (
  <svg aria-hidden="true" fill="#008ECC" viewBox="0 0 22 22">
    <path d="M15.71 12.71a6 6 0 1 0-7.42 0 10 10 0 0 0-6.22 8.18 1 1 0 0 0 2 .22 8 8 0 0 1 15.9 0 1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1 10 10 0 0 0-6.25-8.19M12 12a4 4 0 1 1 4-4 4 4 0 0 1-4 4" />
  </svg>
);

const CartIcon = () => (
  <svg fill="none" aria-hidden="true" viewBox="0 0 22 22">
    <path
      d="M5 7h13.79a2 2 0 0 1 1.99 2.199l-.6 6A2 2 0 0 1 18.19 17H8.64a2 2 0 0 1-1.962-1.608z"
      stroke="#008ECC"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <path
      d="m5 7-.81-3.243A1 1 0 0 0 3.22 3H2m6 18h2m6 0h2"
      stroke="#008ECC"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const LocationIcon = () => (
  <svg className="mx-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2c-4.4 0-8 3.6-8 8 0 5.4 7 11.5 7.3 11.8.2.1.5.2.7.2s.5-.1.7-.2C13 21.5 20 15.4 20 10c0-4.4-3.6-8-8-8m0 17.7c-2.1-2-6-6.3-6-9.7 0-3.3 2.7-6 6-6s6 2.7 6 6-3.9 7.7-6 9.7M12 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4m0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2"
      fill="#008ECC"
    />
  </svg>
);
const TruckIcon = () => (
  <svg className="mx-1" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <path d="M0 0h48v48H0z" />
    <path d="M48 0H0v48h48z" />
    <path
      d="M12 39a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm23 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      stroke="#008ECC"
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <path
      d="M8 35H2V11h29v24H16m15 0V18h8.571L46 26.5V35h-6.189"
      stroke="#008ECC"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const OfferIcon = () => (
  <svg className="mx-1" viewBox="0 0 16 16" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="m6.448.436-1.13 1.129a.5.5 0 0 1-.344.143H3.196c-.822 0-1.488.666-1.488 1.488v1.778a.5.5 0 0 1-.143.345L.435 6.448a1.49 1.49 0 0 0 0 2.104l1.13 1.13a.5.5 0 0 1 .143.344v1.778c0 .822.666 1.488 1.488 1.488h1.778a.5.5 0 0 1 .345.143l1.129 1.13a1.49 1.49 0 0 0 2.104 0l1.13-1.13a.5.5 0 0 1 .344-.143h1.778c.822 0 1.488-.666 1.488-1.488v-1.778a.5.5 0 0 1 .143-.345l1.13-1.129a1.49 1.49 0 0 0 0-2.104l-1.13-1.13a.5.5 0 0 1-.143-.344V3.196c0-.822-.666-1.488-1.488-1.488h-1.778a.5.5 0 0 1-.345-.143L8.552.435a1.49 1.49 0 0 0-2.104 0m-1.802 9.21 5-5 .708.708-5 5zM5 5v1h1V5zm4 5h1V9H9z"
      fill="#008ECC"
    />
  </svg>
);
// ============================================
// Search Component - Extracted for clarity
// ============================================
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (query.trim()) {
        onSearch(query);
      }
    },
    [query, onSearch],
  );

  return (
    <form
      className="search bg-(--background1) min-w-2/6 rounded-md flex w-full flex-nowrap mx-0 lg:mx-auto"
      role="search"
      onSubmit={handleSubmit}
    >
      <button
        className="border-0 lg:ml-4 ml-3 bg-transparent text-xs lg:text-[1rem]"
        aria-label="Search"
        type="submit"
      >
        <SearchIcon />
      </button>
      <input
        type="search"
        className="border-0 rounded-md py-3 lg:ml-4 ml-2 w-3/4 bg-(--background1) min-w-2/6 text-sm lg:text-[1rem] text-(--text) outline-0"
        placeholder="What are you looking for?"
        aria-label="Search products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

// User Section Component
const UserSection = ({ user, onSignInClick, cartCount }) => (
  <div className="sign items-center flex ml-5">
    {user ? (
      <div className="md:flex flex-col items-end lg:flex-row lg:items-center gap-1 lg:gap-3 lg:pr-3 hidden">
        <Link
          href="/account"
          className="flex items-center gap-2 text-(--heading) font-bold text-nowrap"
        >
          <UserIcon />
          <span>{user.displayName}</span>
        </Link>
      </div>
    ) : (
      <Link
        href="#"
        className="flex font-bold lg:pr-3 w-max text-(--heading)"
        onClick={onSignInClick}
        aria-label="Sign in or sign up"
      >
        <UserIcon />
        <span className="hidden lg:block ml-2">Sign In/Sign Up</span>
      </Link>
    )}

    <Link
      className="relative flex font-bold lg:pl-3 pl-5 w-max text-(--heading)"
      href="/cart"
      aria-label="View shopping cart"
    >
      <CartIcon />
      <span className="hidden lg:block ml-2">Cart</span>
      {cartCount > 0 && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 448"
          className="dot relative right-1.5 lg:right-12.5 bottom-1.25 text-sm w-3.5! h-3.5!"
          aria-label="Notification indicator"
        >
          <circle
            style={{ fill: "#FF0000" }}
            cx={224}
            cy={828.362}
            r={192}
            transform="translate(0 -604.362)"
          />
        </svg>
      )}
    </Link>
  </div>
);

// ============================================
// Main Navbar Component
// ============================================
function Navbar() {
  const cartCount = useCartStore((state) => state.items.length);
  const [showSideNav, setShowSideNav] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Memoized handlers
  const handleSearch = useCallback(
    (query) => {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    },
    [router],
  );

  const handleToggleSideNav = useCallback(() => {
    setShowSideNav((prev) => !prev);
  }, []);

  const handleCloseSideNav = useCallback(() => {
    setShowSideNav(false);
  }, []);

  const handleOpenSignIn = useCallback((e) => {
    e.preventDefault();
    setShowSignInModal(true);
  }, []);

  const handleCloseSignIn = useCallback(() => {
    setShowSignInModal(false);
  }, []);

  return (
    <nav aria-label="Main navigation">
      {/* Top Welcome Bar */}
      <div className="welcome hidden text-(--text) text-sm md:flex justify-between items-center py-2 px-[10%] mx-[-9.5%] bg-(--background1)">
        <div>Welcome to worldwide Megamart!</div>
        <div className="flex">
          <Link
            href="#"
            className="mx-2 flex items-center"
            aria-label="Delivery location"
          >
            <LocationIcon />
            Deliver to 423651
          </Link>
          <Link
            href="#"
            className="line px-2 flex items-center border-x border-(--line)"
            aria-label="Track order"
          >
            <TruckIcon />
            Track
          </Link>
          <Link
            href="#"
            className="mx-2 flex items-center"
            aria-label="View all offers"
          >
            <OfferIcon />
            All Offers
          </Link>
        </div>
      </div>
      {/* Mobile Logo */}
      <Link
        href="/"
        className="logo lg:text-left text-center text-(--primary) mt-2 text-4xl font-bold sm:hidden block"
        aria-label="MegaMart home"
      >
        MegaMart
      </Link>

      {/* Main Navigation Bar */}
      <div className="nav py-3 flex justify-between flex-nowrap items-center lg:px-28 text-(--primary)">
        <div className="menu flex">
          <button
            type="button"
            className="rounded-md cursor-pointer p-2 mr-3 border border-(--border) bg-(--background1) duration-300 hover:bg-(--primary) hover:text-white"
            onClick={handleToggleSideNav}
            aria-label="Toggle navigation menu"
            aria-expanded={showSideNav}
          >
            <MenuIcon />
          </button>
          <SideNav show={showSideNav} handleClose={handleCloseSideNav} />
        </div>

        <Link
          href="/"
          className="logo lg:text-left text-center text-3xl pl-3 pr-5 no-underline font-bold hidden sm:block text-(--primary)"
          aria-label="MegaMart home"
        >
          MegaMart
        </Link>

        <SearchBar onSearch={handleSearch} />

        <UserSection
          user={user}
          onSignInClick={handleOpenSignIn}
          cartCount={cartCount}
        />
        <SignIn show={showSignInModal} handleClose={handleCloseSignIn} />
      </div>

      {/* Category Navigation */}
      <div className="hidden lg:flex px-[12%] mt-5 justify-center">
        <ul className="px-3 flex flex-wrap justify-between w-full">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <li key={item.href} className="mb-5">
                <Link
                  href={item.href}
                  className={`rounded-full py-2 mb-3 duration-300 ${
                    isActive
                      ? "bg-(--primary) text-white px-5"
                      : "px-3 text-(--heading) bg-(--background3) hover:bg-(--primary) hover:text-white hover:px-5"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
