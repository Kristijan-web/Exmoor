import { API_URL } from "../../utills/constants";

export default async function updateProduct(product: FormData) {
  console.log("EVO ID-a", product.get("id"));
  const fetchData = await fetch(
    `${API_URL}/api/v1/products/${product.get("id")}`,
    {
      method: "PATCH",
      credentials: "include",
      // moci ce i slika da se update-uje
      body: product,
    },
  );

  const response = await fetchData.json();

  if (!fetchData.ok || fetchData.status !== 200) {
    throw response;
  }

  return response.data;
}
