import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../context/AuthContext";

// Navigation items configuration
const NAV_ITEMS = [
  { id: "account", label: "Your Account", href: "/account" },
  { id: "cart", label: "Your Cart", href: "/cart" },
  { id: "wishlist", label: "Wishlist", href: "/wishlist" },
  { id: "orders", label: "Orders", href: "/orders" },
  { id: "payments", label: "Payments", href: "/payments" },
  { id: "help", label: "Help", href: "/help" },
  { id: "contact", label: "Contact Us", href: "/contact" },
];

// Categories configuration
const CATEGORIES = [
  { id: "phones", label: "Mobiles & Accessories", href: "/phones" },
  { id: "computers", label: "Computers & Accessories", href: "/computers" },
  { id: "wearables", label: "Wearables", href: "/wearables" },
  { id: "video-games", label: "Video Games", href: "/video-games" },
  { id: "television", label: "Television & Video", href: "/television" },
  { id: "camera", label: "Camera & Photo", href: "/camera" },
  { id: "tablets", label: "Tablets & Accessories", href: "/tablets" },
];

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const ChevronIcon = ({ isOpen }) => (
  <svg
    className={`h-5 w-5 transition-transform duration-200 ${
      isOpen ? "rotate-180" : ""
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

/**
 * NavItem Component
 */
const NavItem = ({ label, href, onClick }) => (
  <li>
    <Link
      href={href}
      onClick={onClick}
      className="block py-2 text-white transition-colors duration-200 hover:text-gray-200"
    >
      {label}
    </Link>
  </li>
);

//CategoryDropdown Component
const CategoryDropdown = ({ isOpen, onToggle, onCategoryClick }) => (
  <li className="block md:hidden">
    <hr className="mb-2 border-white/30" />
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between py-2 text-white transition-colors duration-300 hover:text-gray-200"
      aria-expanded={isOpen}
      aria-controls="categories-dropdown"
    >
      <span>Categories</span>
      <ChevronIcon isOpen={isOpen} />
    </button>

    <div
      id="categories-dropdown"
      className={`ml-4 flex flex-col space-y-2 border-l-2 border-white/20 pl-4 text-lg transition-all duration-300 ${
        isOpen
          ? "mt-2 max-h-96 opacity-100"
          : "max-h-0 overflow-hidden opacity-0"
      }`}
      role="region"
      aria-label="Product categories"
    >
      {CATEGORIES.map((category) => (
        <Link
          key={category.id}
          href={category.href}
          onClick={onCategoryClick}
          className="block py-1 text-white/90 transition-colors duration-200 hover:text-white"
        >
          {category.label}
        </Link>
      ))}
    </div>
  </li>
);

//SideNav Component
const SideNav = ({ show, handleClose }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      handleClose(); // إغلاق القائمة بعد الخروج
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };
  // Close dropdown when sidenav closes
  useEffect(() => {
    if (!show) {
      setIsDropdownOpen(false);
    }
  }, [show]);

  // Handle ESC key press to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && show) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [show, handleClose]);

  // Prevent body scroll when sidenav is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleNavClick = useCallback(() => {
    handleClose();
  }, [handleClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          show ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Side Navigation */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-80 bg-[var(--primary)] text-white shadow-xl transition-transform duration-300 ease-in-out ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Side navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-4xl font-bold">
            <Link href="/" onClick={handleNavClick} className="text-white">
              MegaMart
            </Link>
          </h2>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="text-white cursor-pointer  transition-colors duration-200 hover:text-gray-200 "
            aria-label="Close navigation"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation Body */}
        <nav className="h-[calc(100vh-80px)] overflow-y-auto px-6 py-2">
          <ul className="flex flex-col space-y-2 text-xl font-semibold">
            {/* Account */}
            <NavItem
              label={NAV_ITEMS[0].label}
              href={NAV_ITEMS[0].href}
              onClick={handleNavClick}
            />
            <hr className="border-white/30" />

            {/* Cart */}
            <NavItem
              label={NAV_ITEMS[1].label}
              href={NAV_ITEMS[1].href}
              onClick={handleNavClick}
            />

            {/* Categories Dropdown (Mobile Only) */}
            <CategoryDropdown
              isOpen={isDropdownOpen}
              onToggle={toggleDropdown}
              onCategoryClick={handleNavClick}
            />

            <hr className="border-white/30" />

            {/* Remaining Nav Items */}
            {NAV_ITEMS.slice(2).map((item) => (
              <div key={item.id}>
                <NavItem
                  label={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                />
                <hr className="border-white/30" />
              </div>
            ))}
            {/* logout button */}
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full py-2 text-left text-white transition-colors duration-200 hover:text-gray-200"
                >
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SideNav;
