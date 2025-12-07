import { API_URL } from "../../utills/constants";

export default async function updateProduct(product: FormData) {
  const fetchData = await fetch(`${API_URL}/api/v1/products`, {
    method: "PATCH",
    credentials: "include",
    // moci ce i slika da se update-uje
    body: JSON.stringify(product),
  });

  const response = await fetchData.json();

  if (!fetchData.ok || fetchData.status !== 200) {
    throw response;
  }

  return response.data;
}
