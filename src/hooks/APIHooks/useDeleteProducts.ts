import { useMutation } from "@tanstack/react-query";

export default function useDeleteProducts() {
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteProduct(),
    onSuccess: () => console.log("yey"),
    onError: (err) => console.log(err),
  });
  return { mutate, isPending };
}
