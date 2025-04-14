import { useMutation } from "@tanstack/react-query";

export default function useDeleteProducts() {
  const { error, isLoading } = useMutation({
    mutationFn: () => deleteProduct(),
    onSuccess: () => console.log("yey"),
    onError: (err) => console.log(err),
  });
  return { error, isLoading };
}
