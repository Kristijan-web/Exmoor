import ProductItem from "./ProductItem";

export default function Products() {
  return (
    <div className="col-span-full mt-20 grid grid-cols-1 gap-5 justify-self-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
