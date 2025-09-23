import { useQuery } from "@tanstack/react-query";
import getProducts from "../../services/Products/getProducts";

export default function useGetProducts() {
  // ovde se koristi od react query-a select

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { data, isLoading };
}
