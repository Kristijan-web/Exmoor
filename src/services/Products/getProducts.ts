import supabase from "../Supabase";

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
};

export default async function getProducts(): Promise<Product[]> {
  const { data: products, error } = await supabase.from("Products").select(`
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
