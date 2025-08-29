import supabase from "../Supabase";

export default async function deleteProduct() {
  const { error } = await supabase
    .from("Products")
    .delete()
    .eq("some_column", "someValue");
  if (error) {
    throw new Error(error.message);
  }
}
