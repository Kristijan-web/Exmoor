export default function Sort() {
  return (
    <div className="lg:text-main-color-shade cursor-poiner bg-main-color-shade text-secondary-color col-start-7 col-end-13 rounded-sm py-4 lg:col-start-4 lg:col-end-13 lg:border-1 lg:border-black lg:bg-white">
      <div className="flex items-center justify-between px-4 lg:hidden">
        <span>Sort</span>
        <span>
          <ion-icon name="chevron-down-outline"></ion-icon>
        </span>
      </div>
      <div className="hidden px-5 lg:flex lg:items-center lg:justify-end lg:gap-3">
        <p className="text-end text-xl">Sortiraj prema:</p>
        <select className="border-none bg-stone-300 px-2 py-4">
          <option>Najvisoj ceni</option>
          <option>Najnizoj ceni</option>
        </select>
      </div>
    </div>
  );
}
