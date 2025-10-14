import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
type Props = {
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AdminHeader({ setToggleSidebar }: Props) {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return (
    <div className="border-main-color-tint col-start-1 col-end-3 border-t-2 border-b-2 p-4 lg:col-start-2 lg:col-end-3 lg:p-10">
      <div className="grid h-full grid-cols-2 grid-rows-2 items-center justify-center gap-10 pb-2 lg:gap-0">
        {!isDesktop && (
          <div className="col-start-1 col-end-2">
            <p onClick={() => setToggleSidebar((bool) => !bool)}>
              <NavLink to="proizvodi" className={"no-underline"}>
                Back
              </NavLink>
            </p>
          </div>
        )}
        <div className="col-start-2 col-end-3 justify-items-end lg:col-start-1 lg:col-end-2 lg:justify-items-start">
          <p className="text-3xl">Proizvodi</p>
        </div>
        <div className="col-start-1 col-end-3 row-start-2 row-end-3 flex items-center justify-end lg:col-start-2 lg:col-end-3 lg:justify-end">
          <div className="relative flex w-full items-center justify-center lg:w-auto">
            <input
              name="search"
              type="text"
              placeholder="Pretrazi..."
              className="w-full rounded-sm bg-gray-100 p-1.5 pl-4 lg:w-auto"
            />
            <span className="absolute right-3">
              <FaSearch />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
