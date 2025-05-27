import { useMutation } from "@tanstack/react-query";
import deleteProduct from "../../services/Products/deleteProduct";

export default function useDeleteProducts() {
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteProduct(),
    onSuccess: () => console.log("yey"),
    onError: (err) => console.log(err),
  });
  return { mutate, isPending };
}
