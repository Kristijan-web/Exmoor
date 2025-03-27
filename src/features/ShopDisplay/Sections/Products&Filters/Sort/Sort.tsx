export default function Sort() {
  return (
    <div className="lg:text-main-color-shade cursor-poiner bg-main-color-shade text-secondary-color col-start-7 col-end-13 rounded-sm py-4 lg:col-start-7 lg:col-end-13 lg:bg-white lg:py-0 xl:col-start-9">
      {/* Sort button on small screens START */}
      <div className="flex items-center justify-between px-4 lg:hidden">
        <span>Sort</span>
        <span>
          {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
          <ion-icon name="chevron-down-outline"></ion-icon>
        </span>
      </div>
      {/* Sort button on small scerens END */}
      <div className="hidden h-11 w-full lg:flex lg:items-center lg:justify-end lg:gap-3">
        <p className="text-xl whitespace-nowrap">Sortiraj cenu:</p>

        <div className="flex items-center gap-3">
          <button className="btn px-9 py-2">Prvo najmanja</button>
          <button className="btn px-9 py-2">Prvo najveca</button>
          {/* <button className="btn px-3 py-2">Prvo najmanje</button>
          <button className="btn px-3 py-2">Prvo najvece</button> */}
        </div>
      </div>
    </div>
  );
}
