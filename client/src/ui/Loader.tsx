import { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  animation: "spin 1s linear infinite",
};

export default function Loader() {
  return (
    <ClipLoader
      cssOverride={override}
      size={50}
      speedMultiplier={1}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
