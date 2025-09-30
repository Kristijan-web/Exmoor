import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function AdminProducts() {
  const [showProductOptions, setShowProductOptions] = useState<boolean>(false);
  return (
    <li
      className={`flex flex-col items-center justify-center gap-3 text-2xl ${showProductOptions ? "" : ""}`}
    >
      <NavLink
        onClick={() => setShowProductOptions((value) => !value)}
        to="proizvodi"
      >
        Proizvodi
      </NavLink>
      {showProductOptions && (
        <ul className="flex flex-col items-center justify-center gap-3">
          <li>
            <NavLink to="prikaz-proizvoda">Svi proizvodi</NavLink>
          </li>
          <li>
            <NavLink to="dodaj-proizvod">Dodaj proizvod</NavLink>
          </li>
          <li>
            <NavLink to="izmeni-proizvod">Izmeni proizvod</NavLink>
          </li>
        </ul>
      )}
    </li>
  );
}
