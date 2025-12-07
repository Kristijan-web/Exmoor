import { API_URL } from "../../utills/constants";

export default async function createProduct(product: FormData) {
  const fetchData = await fetch(`${API_URL}/api/v1/products`, {
    method: "POST",
    credentials: "include",
    body: product,
  });

  // U slucaju da se desi greska na serveru, bez obzira da li je operational ili programmatic server ce vratiti objekat.
  const response = await fetchData.json();

  if (!fetchData.ok || fetchData.status !== 200) {
    throw response;
  }

  return response.data;
}
