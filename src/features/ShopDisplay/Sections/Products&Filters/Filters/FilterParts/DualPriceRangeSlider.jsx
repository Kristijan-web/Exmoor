import { useState } from "react";
import PropTypes from "prop-types";
("use client");
DualPriceRangeSlider.propTypes = {
  min: PropTypes.number, // Obavezan string
  max: PropTypes.number,
  step: PropTypes.number,
  defaultMinValue: PropTypes.number,
  defaultMaxValue: PropTypes.number, // Opcioni broj
  onChange: PropTypes.func, // Opcioni boolean
};

export default function DualPriceRangeSlider({ min, max }) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    setMinVal(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(value);
  };

  return (
    <div className="relative mx-auto max-w-xl border-b-2 border-black">
      <h1>Price</h1>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={handleMinChange}
        className="pointer-events-none absolute -top-1 z-10 h-1 w-full appearance-none bg-transparent"
        style={{ zIndex: minVal > max - 100 ? 10 : 5 }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={handleMaxChange}
        className="pointer-events-none absolute -top-1 z-10 h-1 w-full appearance-none bg-transparent"
        style={{ zIndex: 5 }}
      />

      <div className="relative h-1 rounded-full bg-gray-300">
        <div
          className="absolute h-1 rounded-full bg-blue-500"
          style={{
            left: `${((minVal - min) / (max - min)) * 100}%`,
            right: `${100 - ((maxVal - min) / (max - min)) * 100}%`,
          }}
        ></div>
      </div>

      <div className="mt-2 flex justify-between text-sm text-gray-600">
        <span>{minVal}</span>
        <span>{maxVal}</span>
      </div>
    </div>
  );
}
