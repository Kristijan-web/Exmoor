import { API_URL } from "../../utills/constants";

async function deleteProduct(id: string) {
  const fetchData = await fetch(`${API_URL}/api/v1/products/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!fetchData.ok || fetchData.status !== 204) {
    console.log("GRESKA U DELETE PRODUCT FETCH-U");
    throw new Error();
  }
}

export default deleteProduct;
