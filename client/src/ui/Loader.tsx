import { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  animation: "spin 1s linear infinite",
};

type Props = {
  size?: number;
  position?: string;
};

export default function Loader({ size }: Props) {
  return (
    <ClipLoader
      cssOverride={override}
      size={size ? size : 50}
      speedMultiplier={2}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
