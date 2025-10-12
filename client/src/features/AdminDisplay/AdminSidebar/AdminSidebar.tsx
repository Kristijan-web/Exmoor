import { NavLink } from "react-router-dom";
import ProductsSidebar from "./ProductsSidebar/ProductsSidebar";

type Props = {
  handleShowOutlet: React.Dispatch<React.SetStateAction<boolean>>;
};

// TODO
// - Napravi pod opcije za proizvode

// IDEJA
// - Kada se klikne na element, elementi ispod kliknut su gurnuti dole da bi se prikazali novi elementi
// Koje alate da koristim?
// - ili transform ili margin
// Koja je razlika izmedju margin i padding?

export default function AdminSidebar({ handleShowOutlet }: Props) {
  return (
    <div className="col-start-1 col-end-3 row-start-1 row-end-3 bg-red-500 p-8 lg:col-start-1 lg:col-end-2">
      <div className="flex h-full items-center justify-center">
        <div className="h-50">
          <ul className="flex flex-col items-center justify-center gap-5 lg:gap-8">
            <ProductsSidebar handleShowOutlet={handleShowOutlet} />
            <li className="text-2xl">
              <NavLink to="korisnici">Korisnici</NavLink>
            </li>
            <li className="text-2xl">
              <NavLink to="stats">Stats</NavLink>
            </li>

            <li className="text-2xl">
              <NavLink to="graf">Graf</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
