"use client";
import Link from "next/link";
import { useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useCartStore } from "../../app/store/cartStore";
import { useAuth } from "../../context/AuthContext";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DiscountIcon from "@mui/icons-material/Discount";
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

// Icon Components
const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
  }
`;

// Search Component
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
      className="search bg-background1 min-w-2/6 rounded-md flex w-full flex-nowrap mx-0 lg:mx-auto"
      role="search"
      onSubmit={handleSubmit}
    >
      <button
        className="border-0 lg:ml-4 ml-3 bg-transparent text-xs lg:text-[1rem]"
        aria-label="Search"
        type="submit"
      >
        <SearchIcon sx={{ color: "var(--color-primary)" }} />
      </button>
      <input
        type="search"
        className="border-0 rounded-md py-3 lg:ml-4 ml-2 w-3/4 bg-background1 min-w-2/6 text-sm lg:text-[1rem] text-text outline-0"
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
          className="flex items-center gap-2 text-heading font-bold text-nowrap"
        >
          <PersonIcon sx={{ color: "var(--color-primary)" }} />
          <span>{user.displayName}</span>
        </Link>
      </div>
    ) : (
      <Link
        href="#"
        className="flex font-bold lg:pr-3 w-max text-heading"
        onClick={onSignInClick}
        aria-label="Sign in or sign up"
      >
        <PersonIcon sx={{ color: "var(--color-primary)" }} />
        <span className="hidden lg:block ml-2">Sign In/Sign Up</span>
      </Link>
    )}

    <Link
      className="relative flex items-center font-bold lg:pl-3 pl-5 w-max text-heading"
      href="/cart"
      aria-label="View shopping cart"
    >
      <IconButton>
        <ShoppingCartIcon
          fontSize="inherit"
          sx={{ color: "var(--color-primary)" }}
        />
        {cartCount > 0 && (
          <CartBadge
            badgeContent={cartCount}
            color="primary"
            overlap="circular"
          />
        )}
      </IconButton>
      <span className="hidden lg:block">Cart</span>
    </Link>
  </div>
);

// Main Component
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
      <div className="welcome hidden text-text text-sm md:flex justify-between items-center py-2 px-[10%] mx-[-9.5%] bg-background1">
        <div>Welcome to worldwide Megamart!</div>
        <div className="flex">
          <Link
            href="#"
            className="mx-2 flex items-center"
            aria-label="Delivery location"
          >
            <LocationPinIcon
              fontSize="small"
              sx={{ color: "var(--color-primary)" }}
              className="mr-1"
            />
            Deliver to 423651
          </Link>
          <Link
            href="#"
            className="line px-2 flex items-center border-x border-line"
            aria-label="Track order"
          >
            <LocalShippingIcon
              fontSize="small"
              sx={{ color: "var(--color-primary)" }}
              className="mr-1"
            />
            Track
          </Link>
          <Link
            href="#"
            className="mx-2 flex items-center"
            aria-label="View all offers"
          >
            <DiscountIcon
              fontSize="small"
              sx={{ color: "var(--color-primary)" }}
              className="mr-1"
            />
            All Offers
          </Link>
        </div>
      </div>
      {/* Mobile Logo */}
      <Link
        href="/"
        className="logo lg:text-left text-center text-primary mt-2 text-4xl font-bold sm:hidden block"
        aria-label="MegaMart home"
      >
        MegaMart
      </Link>

      {/* Main Navigation Bar */}
      <div className="nav py-3 flex justify-between flex-nowrap items-center lg:px-28 text-primary">
        <div className="menu flex">
          <IconButton
            type="button"
            onClick={handleToggleSideNav}
            aria-label="Toggle navigation menu"
            aria-expanded={showSideNav}
            color="primary"
            sx={{ backgroundColor: "var(--color-background1)" }}
          >
            <MenuIcon />
          </IconButton>
          <SideNav show={showSideNav} handleClose={handleCloseSideNav} />
        </div>

        <Link
          href="/"
          className="logo lg:text-left text-center text-3xl pl-3 pr-5 no-underline font-bold hidden sm:block text-primary"
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
                      ? "bg-primary text-white px-5"
                      : "px-3 text-heading bg-background3 hover:bg-primary hover:text-white hover:px-5"
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
