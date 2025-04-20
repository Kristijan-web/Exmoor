import supabase from "../Supabase";

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category_id: number;
  gender: string;
};

export default async function getProducts(): Promise<Product[]> {
  const { data: products, error } = await supabase.from("products").select(`
    *,
    Gender (
      *
    )
  `);

  if (error) {
    throw new Error(`Failed to get products ${error.message}`);
  }
  return products as Product[];
}
