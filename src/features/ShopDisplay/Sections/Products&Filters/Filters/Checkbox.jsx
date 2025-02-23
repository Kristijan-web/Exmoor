import PropTypes from "prop-types";
import { useState } from "react";

Checkbox.propTypes = {
  children: PropTypes.node,
};

export default function Checkbox({ children }) {
  const [checked, setChecked] = useState(false);
  return (
    <div
      onClick={() => setChecked((checked) => !checked)}
      className={`flex cursor-pointer items-center gap-4 before:h-[18px] before:w-[18px] before:rounded-xs before:border-1 ${checked ? `before:bg-main-color-shade before:flex before:place-items-center before:items-center before:justify-center before:text-white before:content-['✓']` : `before:content-['']`}`}
    >
      {children}
    </div>
  );
}
