import { IoChevronDown } from "react-icons/io5";

export default function Sort() {
  return (
    <div className="lg:text-main-color-shade cursor-poiner bg-main-color-shade text-secondary-color col-start-7 col-end-13 rounded-sm py-4 lg:col-start-10 lg:col-end-13 lg:bg-white lg:py-0 2xl:col-start-9">
      {/* Sort button on small screens 0-1024 START  */}
      <div className="flex items-center justify-between px-4 lg:hidden">
        <span>Sort</span>
        <span className="flex items-center justify-center">
          <IoChevronDown />
        </span>
      </div>
      {/* Sort button on small scerens END */}

      <div className="hidden h-11 w-full lg:flex lg:items-center lg:justify-end lg:gap-3">
        <p className="whitesgitpace-nowrap text-xl">Sortiraj cenu:</p>

        {/* Dropdown showing on 1024 to 1536 START */}
        <div className="hidden items-center gap-3 lg:flex 2xl:hidden">
          <select>
            <option>Prvo najmanja</option>
            <option>Prvo najveca</option>
          </select>
        </div>
        {/* Dropdown showing on 1024 to 1536 END */}

        <div className="flex items-center gap-3 lg:hidden 2xl:flex">
          <button className="btn px-9 py-2">Prvo najmanja</button>
          <button className="btn px-9 py-2">Prvo najveca</button>
          {/* <button className="btn px-3 py-2">Prvo najmanje</button>
          <button className="btn px-3 py-2">Prvo najvece</button> */}
        </div>
      </div>
    </div>
  );
}
