import { useMutation } from "@tanstack/react-query";
import deleteProduct from "../../services/Products/deleteProduct";

export default function useDeleteProducts() {
  return { mutate, isPending };
}
