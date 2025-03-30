import { IoArrowBackOutline } from "react-icons/io5";

type Props = {
  setShowSidebar: (value: boolean) => void;
};
export default function BackButton({ setShowSidebar }: Props) {
  function handleBackToSettings() {
    setShowSidebar(true);
  }

  return (
    <div className="absolute top-5 left-7 lg:hidden">
      <span onClick={handleBackToSettings} className="text-2xl">
        <IoArrowBackOutline />
      </span>
    </div>
  );
}
