import { useMutation } from "@tanstack/react-query";
import { Product } from "../../types/products/productsType";
import createProduct from "../../services/Products/createProduct";
import toast from "react-hot-toast";

export default function useCreateProduct() {
  const { mutate, isPending } = useMutation({
    mutationFn: (product: FormData) => createProduct(product),

    onError: (err) => {
      if ("isOperational" in err && err.isOperational) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong...");
      }
    },
    onSuccess: () => {
      toast.success("Product created successfully");
    },
  });

  return { mutate, isPending };
}
