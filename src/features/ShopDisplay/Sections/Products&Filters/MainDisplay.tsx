import Filters from "./Filters/Filters";
import Products from "./Products/Products";
import SearchProducts from "./SearchProducts/SearchProducts";
import Sort from "./Sort/Sort";

export default function MainDisplay() {
  return (
    <section className="mb-24">
      <div className="grid-rows-auto mx-auto grid max-w-[1600px] grid-cols-12 items-start gap-4 px-4">
        <Filters />
        <SearchProducts />
        <Sort />
        <Products />
      </div>
    </section>
  );
}
