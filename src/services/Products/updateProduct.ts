import supabase from "../Supabase";

export default async function updateProduct() {
  const { data, error } = await supabase
    .from("Products")
    .update({ other_column: "otherValue" })
    .eq("some_column", "someValue")
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
