import Thumbnail from "../ShopDisplay/Sections/Thumbnail/Thumbnail";
import Perks from "./Sections/Perks/Perks";
import MainDisplay from "./Sections/Products&Filters/MainDisplay";

export default function ShopDisplay() {
  return (
    <>
      <Thumbnail />
      <MainDisplay />
      <Perks />
    </>
  );
}
