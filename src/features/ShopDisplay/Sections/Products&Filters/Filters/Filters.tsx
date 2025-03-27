import Checkbox from "./Checkbox";
import DualPriceRangeSlider from "./FilterParts/DualPriceRangeSlider";

export default function Filters() {
  // da li je bolje da svakome elementu definisem kome redu pripada
  return (
    <div className="cursor-poiner bg-main-color-shade text-secondary-color lg:text-main-color-shade k lg:shadow-my-shadow col-start-1 col-end-7 row-start-2 row-end-3 rounded-sm py-4 lg:col-start-1 lg:col-end-4 lg:row-start-1 lg:row-end-3 lg:h-full lg:bg-white lg:p-5 lg:py-4">
      {/* Filter button on small screens START */}
      <div className="flex items-center justify-between px-4 lg:hidden">
        <span>Filters</span>
        <span className="flex items-center justify-center">
          {/* @ts-expect-error  Typescript doesn't recognize icon as valid jsx element*/}
          <ion-icon name="chevron-down-outline"></ion-icon>
        </span>
      </div>
      {/* Filter button on small screens END */}
      <div className="hidden lg:flex lg:flex-col lg:gap-9">
        <h3 className="mb-6 text-center text-xl">Filtriraj parfeme</h3>
        <div>
          <p className="mb-4 text-xl">Proizvođač</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Checkbox>
                <span>Zara</span>
              </Checkbox>
              <span className="text-main-color-shade/70">15</span>
            </div>
            <div className="flex items-center justify-between">
              <Checkbox>
                <span>Calvin Klein</span>
              </Checkbox>
              <span className="text-main-color-shade/70">5</span>
            </div>
            <div className="flex items-center justify-between">
              <Checkbox>
                <span>Dior</span>
              </Checkbox>
              <span className="text-main-color-shade/70">7</span>
            </div>
          </div>
        </div>
        <div>
          <DualPriceRangeSlider />
        </div>
        <div>
          <p className="mb-4 text-xl">Pol</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Checkbox>
                <span>Muški</span>
              </Checkbox>
              <span className="text-main-color-shade/70">15</span>
            </div>
            <div className="flex items-center justify-between">
              <Checkbox>
                <span>Ženski</span>
              </Checkbox>
              <span className="text-main-color-shade/70">3</span>
            </div>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xl">Kategorija parfema</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Checkbox>
                <span>Toaletna voda</span>
              </Checkbox>

              <span className="text-main-color-shade/70">18</span>
            </div>
            <div className="flex items-center justify-between">
              <Checkbox>
                <span>Parfemska voda</span>
              </Checkbox>
              <span>9</span>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xl">Na popustu</p>
          <div>
            <Checkbox>
              <span>Da</span>
            </Checkbox>
          </div>
        </div>
      </div>
    </div>
  );
}
