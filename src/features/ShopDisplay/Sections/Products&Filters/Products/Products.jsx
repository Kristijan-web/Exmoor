import ProductItem from "./ProductItem";

export default function Products() {
  return (
    <div className="col-span-full mt-20 grid grid-cols-1 gap-5 justify-self-center sm:grid-cols-2 md:grid-cols-3 lg:col-start-4 lg:col-end-13 lg:mt-0 lg:grid-cols-3 2xl:grid-cols-4">
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
    </div>
  );
}
