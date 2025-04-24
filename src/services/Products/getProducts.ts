import supabase from "../Supabase";

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
  Bran: Brand;
};

export default async function getProducts(): Promise<Product[]> {
  const { data: products, error } = await supabase.from("Products").select(`
    *,
    Gender (
      *
    ),
    Brand(
    *
    )
  `);
  console.log(products);
  if (error) {
    throw new Error(`Failed to get products ${error.message}`);
  }
  return products as Product[];
}
