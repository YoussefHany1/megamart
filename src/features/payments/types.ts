export type PaymentMethodCard = {
  id?: string;
  stripePaymentMethodId: string;
  brand: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
  userId: string;
  createdAt?: any;
}
