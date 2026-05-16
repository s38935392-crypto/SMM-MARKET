export interface Variant {
  id: string;
  name: string;
  price: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: 'O\'yinlar' | 'Telegram' | 'Nakrutka';
  isTop?: boolean;
  variants?: Variant[];
}

export interface CartItem {
  cartId: string;
  product: Product;
  variant: Variant;
}

export type Category = 'Hammasi' | 'O\'yinlar' | 'Telegram' | 'Nakrutka';
