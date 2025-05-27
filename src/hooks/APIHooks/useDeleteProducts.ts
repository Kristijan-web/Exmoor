import { useMutation } from "@tanstack/react-query";
import deleteProduct from "../../services/Products/deleteProduct";

export default function useDeleteProducts() {
  const { mutate, isPending } = useMutation({});
  return { mutate, isPending };
}
