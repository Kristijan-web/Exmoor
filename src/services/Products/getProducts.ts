import supabase from "../Supabase";

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category_id: number;
};

export default async function getProducts(): Promise<Product[]> {
  const { data: products, error } = await supabase.from("Products").select("*");

  if (error) {
    throw new Error(`Failed to get products ${error.message}`);
  }
  return products as Product[];
}
