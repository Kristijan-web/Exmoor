import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import deleteProduct from "../../services/Products/deleteProduct";

export default function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      toast.success("Proizvod izbrisan");
      // mora da se invalidira cache
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Greska u brisanju proizvoda");
    },
  });

  return { mutate, isPending };
}
