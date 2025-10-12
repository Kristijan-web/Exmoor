import { useQuery } from "@tanstack/react-query";
import getProducts from "../../services/Products/getProducts";
import { Product } from "../../types/products/productsType";

type ProductsResult = {
  data: Product[] | null | undefined;
  isLoading: boolean;
};
export default function useGetProducts(): ProductsResult {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { data, isLoading };
}
