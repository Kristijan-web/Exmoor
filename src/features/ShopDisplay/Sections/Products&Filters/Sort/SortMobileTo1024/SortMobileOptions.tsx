import ReactDOM from "react-dom";

type Props = {
  setShowSortOptions: (value: boolean) => void;
};

export default function SortMobileOptions({ setShowSortOptions }: Props) {
  function handleCloseSortOptions() {
    console.log("ola");
    setShowSortOptions(false);
    document.body.style.overflow = "";
  }
  return ReactDOM.createPortal(
    <div className="text-main-color-shade fixed inset-0">
      <div className="fixed top-0 right-0 bottom-[50%] left-0 bg-black/45"></div>
      <div className="fixed top-[50%] right-0 bottom-0 left-0 bg-white">
        <div className="flex h-full w-full flex-col gap-5 p-7">
          <div className="flex items-center justify-between border-b-1 border-black/10 pb-2">
            <h3 className="text-3xl">Sortiraj cenu:</h3>
            <p onClick={handleCloseSortOptions}> &#10006;</p>
          </div>
          <div className="flex items-center justify-between border-b-1 border-black/10 pb-2">
            <p>Preporuceno</p>
            <input name="price" type="radio" />
          </div>
          <div
            onClick={handleCloseSortOptions}
            className="flex items-center justify-between border-b-1 border-black/10 pb-2"
          >
            <p>Od najnize do najvise</p>
            <input name="price" type="radio" />
          </div>
          <div
            onClick={handleCloseSortOptions}
            className="flex items-center justify-between border-b-1 border-black/10 pb-2"
          >
            <p>Od najvise do najnize</p>
            <input name="price" type="radio" />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
