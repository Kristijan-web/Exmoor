export type Sale = {
  discount: number;
  sale_start: Date;
  sale_end: Date;
  sold: number;
};

export type Product = {
  id: string;
  title: string;
  brand: string;
  gender: string;
  water: string;
  price: number;
  quantity: number;
  image: string;
  mainImage: string;
  sale?: Sale | null;
};
