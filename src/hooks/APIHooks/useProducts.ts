import { useQuery } from "@tanstack/react-query";
import getProducts from "../../services/Products/getProducts";

export default function useProducts() {
  const {} = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  return { products, isLoading, error };
}
