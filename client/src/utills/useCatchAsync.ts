import toast from "react-hot-toast";

const useCatchAsync = function <T>(
  fn: (signal: AbortSignal, e?: React.SyntheticEvent) => Promise<T>,
  setLoading: (val: boolean) => void,
) {
  return (e?: React.SyntheticEvent) => {
    const controller = new AbortController();
    const { signal } = controller;
    const tid = setTimeout(() => controller.abort(), 5000);
    setLoading(true);
    fn(signal, e)
      .catch((err) => {
        if (err.name === "AbortError") {
          return toast.error(
            "Request was aborted (timeout). Please check your connection.",
          );
        }
        if (err.isOperational) {
          return toast.error(err.message);
        } else {
          toast.error("Something went wrong, please contact developer");
        }
      })
      .finally(() => {
        clearTimeout(tid);
        setLoading(false);
      });
  };
};

export default useCatchAsync;
