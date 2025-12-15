import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateProduct from "../../services/Products/updatePorduct";
import toast from "react-hot-toast";

export default function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (product: FormData) => updateProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product je uspesno azuriran");
    },
    onError: (err) => {
      if ("isOperational" in err && err.isOperational) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong....");
      }
    },
  });
  return { mutate, isPending };
}
