import DualPriceRangeSlider from "./FilterParts/DualPriceRangeSlider";

export default function Filters() {
  return (
    <div className="cursor-poiner bg-main-color-shade text-secondary-color lg:text-main-color-shade col-start-1 col-end-7 rounded-sm py-4 lg:col-start-1 lg:col-end-4 lg:row-start-1 lg:row-end-3 lg:h-full lg:border-1 lg:border-black lg:bg-white lg:p-5 lg:py-4">
      <div className="flex items-center justify-between px-4 lg:hidden">
        <span>Filters</span>
        <span>
          <ion-icon name="chevron-down-outline"></ion-icon>
        </span>
      </div>
      <div className="hidden lg:flex lg:flex-col lg:gap-9">
        <h3 className="mb-6 text-center text-xl">Filtriraj parfeme</h3>
        <div className="border-b-1 border-black">
          <p className="mb-3">Proizvodjac</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <input type="checkbox" />
                <span>Zara</span>
              </div>
              <span>15</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <input type="checkbox" />
                <span>Calvin Klein</span>
              </div>
              <span>5</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <input type="checkbox" />
                <span>Dior</span>
              </div>
              <span>7</span>
            </div>
          </div>
        </div>
        <div>
          <DualPriceRangeSlider min={0} max={100} step={1} />
        </div>
        <div>
          <p className="mb-3">Pol</p>
          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <input type="checkbox" />
              <span>Muski</span>
            </div>
            <div className="flex gap-4">
              <input type="checkbox" />
              <span>Zenski</span>
            </div>
          </div>
        </div>
        <div>
          <p className="mb-3">Kategorija parfema</p>
          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <input type="checkbox" />
              <span>Toaletna voda</span>
            </div>
            <div className="flex gap-4">
              <input type="checkbox" />
              <span>Parfemska voda</span>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3">Na popustu</p>
          <div>
            <div className="flex gap-4">
              <input type="checkbox" />
              <p>Da</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
