import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import DualPriceRangeSlider from "./FilterParts/DualPriceRangeSlider";
import FilterButton from "./FilterParts/FilterButton";
import { useLocation, useSearchParams } from "react-router-dom";
import { API_URL } from "../../../../../utills/constants";
import { brandDB } from "../../../../../types/brandsType";
import { WaterTypesTypeDB } from "../../../../../types/waterTypesType";

export default function Filters() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [brands, setBrands] = useState<brandDB[]>([]);
  const [waterTypes, setWaterTypes] = useState<WaterTypesTypeDB[]>([]);

  // prodji kroz watertypes i pretvori ga u name umesto type

  const waterTypesFrontend = waterTypes.map((waterType) => {
    return { ...waterType, name: waterType.type };
  });

  // Filtriranje:

  // Svaki klik na filter treba da promeni URL
  // - Kako cu to da uradim?
  // - Mogu da na svaki element da dodam funkciju koja ce se pozvati i upisati element u URL
  // getProducts treba da se izvrsi svaki put kada dodje do promene u URL-U i tjt

  const setURLFilter = function (param: string, value: string) {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.has(param)) {
      queryParams.delete(param);
      setSearchParams(queryParams);
    } else {
      setSearchParams({ [param]: value });
    }
  };

  useEffect(() => {
    async function getBrands() {
      console.log("UPAO OVDE");
      // mora da se doda useCatchAsync
      const fetchData = await fetch(`${API_URL}/api/v1/brands`);
      const response = await fetchData.json();
      if (!fetchData.ok || fetchData.status !== 200) {
        throw response;
      }
      setBrands(response.data);
    }
    getBrands();

    async function getWaterTypes() {
      const fetchData = await fetch(`${API_URL}/api/v1/waterTypes`);
      const response = await fetchData.json();
      if (!fetchData.ok || fetchData.status !== 200) {
        throw response;
      }

      setWaterTypes(response.data);
    }
    getWaterTypes();
  }, []);
  return (
    <div
      className={`${showFilters ? "text-main-color-shade fixed top-0 right-0 left-0 z-20 col-span-full h-full overflow-auto bg-white" : "bg-main-color-shade col-start-1 col-end-7 text-white"} cursor-poiner lg:text-main-color-shade lg:shadow-my-shadow row-start-2 row-end-3 rounded-sm py-4 lg:col-start-1 lg:col-end-4 lg:row-start-1 lg:row-end-3 lg:h-full lg:bg-white lg:p-5 lg:py-4`}
    >
      {/* Filter button on small screens below 1024px START */}
      <FilterButton setShowFilters={setShowFilters} showFilters={showFilters} />
      {/* Filter button on small screens END */}
      <div
        className={` ${showFilters ? "mx-auto max-w-[640px] px-6" : "hidden"} flex flex-col gap-9 lg:flex`}
      >
        <h3 className="mb-6 text-center text-xl">Filtriraj parfeme</h3>
        <div>
          <p className="mb-4 text-xl">Proizvođač</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              {brands?.map((brandDB) => (
                <Checkbox
                  key={brandDB.id}
                  checkBoxObject={brandDB}
                  setURLFilter={setURLFilter}
                />
              ))}
            </div>
            {/* 
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
            </div> */}
          </div>
        </div>
        <div>
          <DualPriceRangeSlider />
        </div>
        <div>
          <p className="mb-4 text-xl">Pol</p>
          <div className="flex flex-col gap-3">
            {/* <div className="flex items-center justify-between">
              <Checkbox>
                <span>Muški</span>
              </Checkbox>
              <span className="text-main-color-shade/70">15</span>
            </div> */}
            <div className="flex items-center justify-between">
              {/* <Checkbox>
                <span>Ženski</span>
              </Checkbox> */}
              <span className="text-main-color-shade/70">3</span>
            </div>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xl">Kategorija parfema</p>
          <div className="flex flex-col gap-3">
            {waterTypesFrontend.map((waterTypesDB) => (
              <div className="flex items-center justify-between">
                <Checkbox checkBoxObject={waterTypesDB} />
              </div>
            ))}
            {/* <div className="flex items-center justify-between">
              <Checkbox>
                <span>Toaletna voda</span>
              </Checkbox>

              <span className="text-main-color-shade/70">18</span>
            </div> */}
            {/* <div className="flex items-center justify-between">
              <Checkbox>
                <span>Parfemska voda</span>
              </Checkbox>
              <span className="text-main-color-shade/70">9</span>
            </div> */}
          </div>
        </div>

        <div>
          <p className="mb-4 text-xl">Na popustu</p>
          <div>
            {/* <Checkbox>
              <span>Da</span>
            </Checkbox> */}
          </div>
        </div>
        <div className="mt-5 text-center lg:hidden">
          <button className="btn">Primeni</button>
        </div>
      </div>
    </div>
  );
}
