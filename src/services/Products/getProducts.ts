import supabase from "../Supabase";

export default async function getProducts() {
  const { data: products, error } = await supabase.from("Products").select("*");
  if (error) {
    throw new Error(`Failed to get products ${error.message}`);
  }
  return products;
}
