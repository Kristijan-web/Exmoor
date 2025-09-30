import { NavLink } from "react-router-dom";
import AdminProducts from "./Products/AdminProducts";

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
      <div className="my-auto h-full">
        <ul
          className="my-auto flex flex-col items-center justify-start gap-5 lg:gap-8"
          onClick={(e: React.MouseEvent<HTMLUListElement>) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "LI") {
              handleShowOutlet((bool) => !bool);
            }
          }}
        >
          <AdminProducts />
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
  );
}
