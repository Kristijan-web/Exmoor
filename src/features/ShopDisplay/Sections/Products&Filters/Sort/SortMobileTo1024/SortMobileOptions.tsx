import { useEffect } from "react";
import ReactDOM from "react-dom";

type Props = {
  setShowSortOptions: (value: boolean) => void;
};

export default function SortMobileOptions({ setShowSortOptions }: Props) {
  useEffect(
    function CloseSortWhenClickedOutsideModal() {
      function closeSort(e: MouseEvent) {
        const clickedElement = e.target as HTMLElement;
        if (!clickedElement.closest("#sortModal")) {
          setShowSortOptions(false);
          document.body.style.overflow = "";
        }
      }
      document.addEventListener("click", closeSort);
      return () => document.removeEventListener("click", closeSort);
    },
    [setShowSortOptions],
  );

  function handleCloseSortOptions() {
    setShowSortOptions(false);
    document.body.style.overflow = "";
  }
  return ReactDOM.createPortal(
    <div className="text-main-color-shade fixed inset-0 lg:hidden">
      <div className="fixed top-0 right-0 bottom-[50%] left-0 bg-black/45"></div>
      <div
        id="sortModal"
        className="fixed top-[50%] right-0 bottom-0 left-0 bg-white"
      >
        <div className="flex h-full w-full flex-col gap-5 p-7">
          <div className="flex items-center justify-between border-b-1 border-black/10 pb-2">
            <h3 className="text-3xl">Sortiraj cenu:</h3>
            <p onClick={handleCloseSortOptions}> &#10006;</p>
          </div>
          <div className="flex items-center justify-between border-b-1 border-black/10 pb-2">
            <label htmlFor="recommended">Preporuceno</label>
            <input id="recommended" name="price" type="radio" />
          </div>
          <div className="flex items-center justify-between border-b-1 border-black/10 pb-2">
            <label htmlFor="lowest-highest">Od najnize do najvise</label>
            <input id="lowest-highest" name="price" type="radio" />
          </div>
          <div className="flex items-center justify-between border-b-1 border-black/10 pb-2">
            <label htmlFor="highest-lowest">Od najvise do najnize</label>
            <input id="highest-lowest" name="price" type="radio" />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
