import toast from "react-hot-toast";

const useCatchAsync = function <T>(
  fn: (signal: AbortSignal, e?: React.SyntheticEvent) => Promise<T>,
  setLoading?: (val: boolean) => void,
) {
  return (e?: React.SyntheticEvent) => {
    const controller = new AbortController();
    const { signal } = controller;
    const tid = setTimeout(() => controller.abort(), 5000);
    if (setLoading) {
      setLoading(true);
    }
    fn(signal, e)
      .catch((err) => {
        console.log("Error u useCatchAsync", err);
        if (err.name === "AbortError") {
          return toast.error(
            "Zahtev je prekinut(timeout). Molimo proverite vasu konekciju.",
          );
        }
        if (err.isOperational) {
          return toast.error(err.message);
        } else {
          return toast.error("Greska u sistemu...");
        }
      })
      .finally(() => {
        clearTimeout(tid);
        if (setLoading) {
          setLoading(false);
        }
      });
  };
};

export default useCatchAsync;
