import Filters from "./Filters/Filters";
import Products from "./Products/Products";
import SearchProducts from "./SearchProducts/SearchProducts";
import Sort from "./Sort/Sort";

export default function MainDisplay() {
  return (
    <section className="mb-24">
      <div className="grid-rows-auto grid grid-cols-12 items-start gap-4 px-4">
        <SearchProducts />
        <Filters />
        <Sort />
        <Products />
      </div>
    </section>
  );
}
