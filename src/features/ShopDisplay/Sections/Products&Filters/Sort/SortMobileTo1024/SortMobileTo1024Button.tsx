import { IoChevronDown } from "react-icons/io5";
import SortMobileOptions from "./SortMobileOptions";
import { useState } from "react";

export default function SortMobileTo1024Button() {
  const [showSortOptions, setShowSortOptions] = useState(false);
  function handleShowSortOptions(e: React.MouseEvent) {
    e.stopPropagation();
    setShowSortOptions(true);
    document.body.style.overflow = "hidden";
  }

  return (
    <>
      <div
      data-testid = 'sortButton'
        onClick={handleShowSortOptions}
        className="flex items-center justify-between px-4 lg:hidden"
      >
        <span>Sort</span>
        <span className="flex items-center justify-center">
          <IoChevronDown />
        </span>
      </div>
      {showSortOptions && (
        <SortMobileOptions setShowSortOptions={setShowSortOptions} />
      )}
    </>
  );
}
