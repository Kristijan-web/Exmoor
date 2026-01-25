import { useQuery } from "@tanstack/react-query";
import getProducts from "../../services/Products/getProducts";
import { Product } from "../../types/productsType";
import { useSearchParams } from "react-router-dom";

type ProductsResult = {
  data: Product[] | null | undefined;
  isLoading: boolean;
};
export default function useGetProducts(): ProductsResult {
  const [searchParams] = useSearchParams();
  const paramsString = searchParams.toString();
  const { data, isLoading } = useQuery({
    queryKey: ["products", paramsString],
    queryFn: () => {
      return getProducts(searchParams); // fetch all
    },
  });

  return { data, isLoading };
}
