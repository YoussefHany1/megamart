import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

// Utility functions for Stripe

/**
 * Format amount for Stripe (convert to cents)
 * @param {number} amount - Amount in EGP
 * @returns {number} Amount in piasters (قروش)
 */
export const formatAmountForStripe = (amount) => {
  return Math.round(amount * 100);
};

/**
 * Format amount for display (convert from cents)
 * @param {number} amount - Amount in piasters
 * @returns {number} Amount in EGP
 */
export const formatAmountForDisplay = (amount) => {
  return (amount / 100).toFixed(2);
};

/**
 * Get card brand icon
 * @param {string} brand - Card brand (visa, mastercard, etc.)
 * @returns {string} Brand display name
 */
export const getCardBrandName = (brand) => {
  const brands = {
    visa: "Visa",
    mastercard: "Mastercard",
    amex: "American Express",
    discover: "Discover",
    diners: "Diners Club",
    jcb: "JCB",
    unionpay: "UnionPay",
  };

  return brands[brand] || brand.charAt(0).toUpperCase() + brand.slice(1);
};
