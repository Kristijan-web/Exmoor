import toast from "react-hot-toast";

const useCatchAsync = function <T>(
  fn: (e?: React.SyntheticEvent) => Promise<T>,
) {
  return (e?: React.SyntheticEvent) => {
    fn(e).catch((err) => {
      if (err.isOperational) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong, please contact developer");
      }
    });
  };
};

export default useCatchAsync;
