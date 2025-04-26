import supabase from "../Supabase";
type Sale = {
  id: number;
  sale_price: number;
  valid_from: string;
  valid_to: string;
};
type ProductType = {
  id: number;
  type: string;
};

type Brand = {
  id: number;
  name: string;
};
type Gender = {
  gender: "string";
  id: number;
};
type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category_id: number;
  Gender: Gender;
  Brand: Brand;
  Product_type: ProductType;
  Sale: Sale;
};

export default async function getProducts(): Promise<Product[]> {
  const { data: products, error } = await supabase.from("Products").select(`
    *,
    Gender (
      *
    ),
    Brand(
    *
    ),
    Product_type (
    *
    ),
    Sale (
      *
    )
  `);
  console.log(products);
  if (error) {
    throw new Error(`Failed to get products ${error.message}`);
  }
  return products as Product[];
}
