import { NavLink } from "react-router-dom";

type Props = {
  handleHideOutlet: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AdminHeader({ handleHideOutlet }: Props) {
  return (
    <div className="bg-green-500 p-10">
      <div className="flex h-full items-center justify-between">
        <div>
          <p onClick={() => handleHideOutlet((bool) => !bool)}>
            <NavLink to="proizvodi">Back</NavLink>
          </p>
        </div>
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
