import AboutUs from "./Sections/AboutUs/AboutUs";
import Gadgets from "./Sections/Gadgets/Gadgets";
import Thumbnail from "./Sections/Thumbnail/Thumbnail";

export default function HomeDisplay() {
  return (
    <>
      <Thumbnail />
      <Gadgets />
      <AboutUs />
    </>
  );
}
