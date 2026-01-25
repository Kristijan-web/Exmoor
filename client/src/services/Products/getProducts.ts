import toast from "react-hot-toast";
import { API_URL } from "../../utills/constants";
import { Product } from "../../types/productsType";
// tip je objekat iz url-a
async function getProducts(queryParams: object): Promise<Product[] | null> {
  console.log("evo ga queryParam", queryParams);
  try {
    const fetchData = await fetch(`${API_URL}/api/v1/products?${queryParams}`);

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
