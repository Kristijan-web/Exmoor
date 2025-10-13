import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
type Props = {
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AdminHeader({ setToggleSidebar }: Props) {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return (
    <div className="border-main-color-tint col-start-1 col-end-3 border-t-2 border-b-2 p-10 lg:col-start-2 lg:col-end-3">
      <div className="flex h-full items-center justify-between">
        {!isDesktop && (
          <div>
            <p onClick={() => setToggleSidebar((bool) => !bool)}>
              <NavLink to="proizvodi">Back</NavLink>
            </p>
          </div>
        )}
        <div>
          <p className="text-3xl">Products</p>
        </div>
        <div className="relative flex items-center justify-center">
          <input
            type="text"
            placeholder="search"
            className="rounded-sm bg-gray-100 p-1.5"
          />
          <span className="absolute right-2">
            <FaSearch />
          </span>
        </div>
      </div>
    </div>
  );
}
