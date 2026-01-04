import { useMutation, useQueryClient } from "@tanstack/react-query";
import createProduct from "../../services/Products/createProduct";
import toast from "react-hot-toast";

export default function useCreateProduct() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (product: FormData) => createProduct(product),
    onSuccess: () => {
      // mora da se invadira query key
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => {
      if ("isOperational" in err && err.isOperational) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong...EEEE");
      }
    },
  });

  return { mutate, isPending };
}
