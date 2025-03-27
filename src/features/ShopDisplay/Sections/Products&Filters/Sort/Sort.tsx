export default function Sort() {
  return (
    <div className="lg:text-main-color-shade cursor-poiner bg-main-color-shade text-secondary-color col-start-7 col-end-13 rounded-sm py-4 lg:col-start-9 lg:col-end-13 lg:bg-white lg:py-0">
      {/* Sort button on small screens START */}
      <div className="flex items-center justify-between px-4 lg:hidden">
        <span>Sort</span>
        <span>
          {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
          <ion-icon name="chevron-down-outline"></ion-icon>
        </span>
      </div>
      {/* Sort button on small scerens END */}
      <div className="hidden lg:flex lg:items-center lg:justify-end lg:gap-3">
        <p className="text-end text-xl">Sortiraj prema:</p>
        <select className="border-none bg-stone-300 px-2 py-4">
          <option>Najvišoj ceni</option>
          <option>Najnizoj ceni</option>
        </select>
      </div>
    </div>
  );
}
