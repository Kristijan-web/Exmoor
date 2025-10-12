type Product = {
  id: string;
  title: string;
  brand: string;
  water: string;
  price: number;
  quantity: number;
  gender: string;
  image: string;
  sale?: {
    discount: number;
    sale_start: Date;
    sale_end: Date;
    sold: number;
  };
};

export type { Product };
