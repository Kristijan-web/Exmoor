import toast from "react-hot-toast";
import { API_URL } from "../../utills/constants";
import { Product } from "../../types/products/productsType";

async function getProducts(): Promise<Product[] | null> {
  try {
    const fetchData = await fetch(`${API_URL}/api/v1/products`);

    if (!fetchData.ok) {
      toast.error("Dohvatanje proizvoda nije uspelo, osvezite stranicu");
      return null;
    }

    const response = await fetchData.json();

    return response.data;
  } catch (err) {
    toast.error("Greska u sistemu...");
    return null;
  }
}

export default getProducts;
