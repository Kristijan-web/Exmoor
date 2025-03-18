import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <div className="absolute -top-5 left-8">
      <span
        onClick={() => navigate("/podesavanja/postavke")}
        className="text-2xl"
      >
        {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
        <ion-icon name="arrow-back-outline"></ion-icon>
      </span>
    </div>
  );
}
