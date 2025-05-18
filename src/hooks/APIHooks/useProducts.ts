import { useQuery } from "@tanstack/react-query";

export default function useProducts() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  return { products, isLoading, error };
}
