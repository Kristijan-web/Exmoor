import { useMutation } from "@tanstack/react-query";
import updateProduct from "../../services/Products/updateProduct";

export default function useDeleteProducts() {
  const { mutate, isPending, data } = useMutation({
    mutationFn: () => updateProduct(),
    onSuccess: () => console.log("yey"),
    onError: (err) => console.log(err),
  });
}
