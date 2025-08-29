import AboutProducts from "./Sections/AboutProducts/AboutProducts";
import AboutUs from "./Sections/AboutUs/AboutUs";
import Gadgets from "./Sections/Gadgets/Gadgets";
import Reviews from "./Sections/Reviews/Reviews";
import Thumbnail from "./Sections/Thumbnail/Thumbnail";

export default function HomeDisplay() {
  return (
    <>
      <Thumbnail />
      <Gadgets />
      <AboutUs />
      <AboutProducts />
      <Reviews />
    </>
  );
}
