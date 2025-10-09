import { API_URL } from "../../utills/constants";

type Product = {
  title: string;
  brand: string;
  water: string;
  price: number;
  quantity: number;
};

async function getProducts(): Promise<Product[]> {
  const fetchData = await fetch(`${API_URL}/api/v1/products`);
  const response = await fetchData.json();
  return response;
}

export default getProducts;
