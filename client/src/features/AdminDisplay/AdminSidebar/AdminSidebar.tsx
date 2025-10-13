import { NavLink } from "react-router-dom";
import ProductsSidebar from "./ProductsSidebar/ProductsSidebar";
import { useMediaQuery } from "react-responsive";

type Props = {
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AdminSidebar({ setToggleSidebar }: Props) {
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return (
    <div className="col-start-1 col-end-3 row-start-1 row-end-3 bg-red-500 p-8 lg:col-start-1 lg:col-end-2">
      <div className="flex h-full items-center justify-center">
        <div className="h-50">
          <ul
            className="flex flex-col items-center justify-center gap-5 lg:gap-8"
            onClick={(e: React.MouseEvent<HTMLUListElement>) => {
              const target = e.target as HTMLElement;
              if (
                target.tagName === "A" &&
                target.textContent === "Svi proizvodi" &&
                !isDesktop
              ) {
                setToggleSidebar((bool) => !bool);
              }
            }}
          >
            <ProductsSidebar />
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
