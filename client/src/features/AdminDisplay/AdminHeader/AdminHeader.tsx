import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";

type Props = {
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AdminHeader({ setToggleSidebar }: Props) {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return (
    <div className="bg-green-500 p-10">
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
        <div>
          <p>Yo</p>
        </div>
      </div>
    </div>
  );
}
