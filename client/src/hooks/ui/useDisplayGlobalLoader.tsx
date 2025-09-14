import { useEffect } from "react";
import toast from "react-hot-toast";

export default function useDisplayGlobalLoader(
  message: string,
  loading: boolean,
) {
  // Bolje je da imam ovde centralno mesto za prikaz poruke, onda je kod vise ortogonalan
  useEffect(
    function displayPendingMessage() {
      const toastId = "boolean-toast";

      if (loading) {
        toast.loading(`${message}`, { id: toastId });
      } else {
        toast.dismiss(toastId);
      }
    },
    [loading],
  );
}
