export type Product = {
  id: string | number;
  name: string;
  price: string;
  discount?: string;
  old_price?: string;
  category?: string;
  image?: string;
  rating?: number;
  reviews?: number;
  about?: string[];
  specifications?: any[];
  details?: any[];
  [key: string]: any;
}

export type CartItem = Product & {
  quantity: number;
}

export type Order = {
  id: string;
  status: 'pending' | 'completed' | 'cancelled';
  items: CartItem[];
  [key: string]: any;
}

export type User = {
  uid: string;
  email: string;
  displayName: string;
  [key: string]: any;
}

export type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  [key: string]: any;
}

export type Category = {
  id: string;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}
