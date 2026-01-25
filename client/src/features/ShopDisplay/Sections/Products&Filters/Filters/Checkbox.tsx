import { useState } from "react";

type CheckboxProps = {
  checkBoxObject: { id: string; name: string };
  setURLFilter: (param: string, value: string) => void;
};
export default function Checkbox({
  checkBoxObject,
  setURLFilter,
}: CheckboxProps) {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setURLFilter("brand", "Zara");
          setChecked((checked) => !checked);
        }}
        className={`flex cursor-pointer items-center gap-4 before:h-[18px] before:w-[18px] before:rounded-xs before:border-1 ${checked ? `before:bg-main-color-shade before:flex before:place-items-center before:items-center before:justify-center before:text-white before:content-['✓']` : `before:content-['']`}`}
      >
        <span>{checkBoxObject.name}</span>
      </div>
      <span className="text-main-color-shade/70">15</span>
    </>
  );
}
