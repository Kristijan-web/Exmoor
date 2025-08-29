import { IoChevronDown, IoClose } from "react-icons/io5";

type Props = {
  setShowFilters: (value: boolean) => void;
  showFilters: boolean;
};

export default function FilterButton({ setShowFilters, showFilters }: Props) {
  // mora prvo da mu skinem hidden pa onda neka ide absolute sa top-0 left-0

  function toggleFiltersDisplay() {
    if (!showFilters) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      setShowFilters(true);
    }
    if (showFilters) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      setShowFilters(false);
    }
  }

  return (
    <div
      onClick={toggleFiltersDisplay}
      className="flex items-center justify-between px-4 lg:hidden"
    >
      <span>Filteri</span>
      <span
        className={`flex items-center justify-center ${showFilters ? "text-2xl" : ""}`}
      >
        {showFilters ? <IoClose /> : <IoChevronDown />}
      </span>
    </div>
  );
}
