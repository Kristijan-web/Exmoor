import { useQuery } from "@tanstack/react-query";
import getProducts from "../../services/Products/getProducts";

export default function useProducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  return { data, isLoading, error };
}
