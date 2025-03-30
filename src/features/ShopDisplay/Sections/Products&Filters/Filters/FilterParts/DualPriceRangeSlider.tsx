import { useState } from "react";

const DualRangeSlider = () => {
  const [minValue, setMinValue] = useState(20);
  const [maxValue, setMaxValue] = useState(80);
  const minAllowed = 0;
  const maxAllowed = 100;

  // Upravlja promenom minimalnog slajdera
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinVal = parseInt(e.target.value);
    if (newMinVal < maxValue) {
      setMinValue(newMinVal);
    }
  };

  // Upravlja promenom maksimalnog slajdera
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxVal = parseInt(e.target.value);
    if (newMaxVal > minValue) {
      setMaxValue(newMaxVal);
    }
  };

  // Izračunava poziciju za popunjeni deo trake
  const leftPosition = (minValue / maxAllowed) * 100;
  const rightPosition = 100 - (maxValue / maxAllowed) * 100;

  return (
    <div className="mx-auto w-full max-w-md rounded-lg bg-white px-2">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-bold text-gray-800">Izaberite cenu</h2>
        <p className="mt-2 text-lg text-gray-600">
          Izabrani raspon:{" "}
          <span className="text-main-color-shade font-semibold">
            {minValue} - {maxValue}
          </span>
        </p>
      </div>

      <div className="relative pt-6 pb-6">
        {/* Glavni kontejner za slider */}
        <div className="relative h-2 w-full rounded-full bg-gray-200">
          {/* Popunjena linija između dva indikatora */}
          <div
            className="bg-main-color-shade absolute h-full rounded-full"
            style={{
              left: `${leftPosition}%`,
              right: `${rightPosition}%`,
            }}
          ></div>
        </div>

        {/* Kontrole za min i max vrednosti */}
        <div className="relative">
          {/* Min indikator */}
          <input
            type="range"
            min={minAllowed}
            max={maxAllowed}
            value={minValue}
            onChange={handleMinChange}
            className="pointer-events-none absolute top-0 left-0 -mt-6 w-full appearance-none bg-transparent"
            style={{ zIndex: 3, height: "20px" }}
          />

          {/* Max indikator */}
          <input
            type="range"
            min={minAllowed}
            max={maxAllowed}
            value={maxValue}
            onChange={handleMaxChange}
            className="pointer-events-none absolute top-0 left-0 -mt-6 w-full appearance-none bg-transparent"
            style={{ zIndex: 4, height: "20px" }}
          />
        </div>
      </div>
      <div className="mt-2 flex justify-between">
        <div className="text-sm font-medium text-gray-500">{minAllowed}</div>
        <div className="text-sm font-medium text-gray-500">{maxAllowed}</div>
      </div>
    </div>
  );
};

export default DualRangeSlider;
