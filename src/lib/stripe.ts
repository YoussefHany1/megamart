import { loadStripe, Stripe } from "@stripe/stripe-js";

export const stripePromise: Promise<Stripe | null> = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100);
};

export const formatAmountForDisplay = (amount: number): string => {
  return (amount / 100).toFixed(2);
};

export const getCardBrandName = (brand: string): string => {
  const brands: Record<string, string> = {
    visa: "Visa",
    mastercard: "Mastercard",
    amex: "American Express",
    discover: "Discover",
    diners: "Diners Club",
    jcb: "JCB",
    unionpay: "UnionPay",
  };

  return (
    brands[brand.toLowerCase()] ||
    brand.charAt(0).toUpperCase() + brand.slice(1)
  );
};
