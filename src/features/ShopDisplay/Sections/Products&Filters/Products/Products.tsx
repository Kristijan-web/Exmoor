import toast from "react-hot-toast";
import useProducts from "../../../../../hooks/APIHooks/useProducts";
import ProductItem from "./ProductItem";

export default function Products() {
  const { products, isLoading, error } = useProducts();
  if (isLoading) return <p>Loading...</p>;
  if (error) {
    toast.error("Error! Please reload the page");
  }
  return (
    <div className="col-span-full mt-8 grid grid-cols-1 gap-5 justify-self-center sm:grid-cols-2 md:grid-cols-3 lg:col-start-4 lg:col-end-13 lg:mt-0 lg:grid-cols-3 2xl:grid-cols-4">
      {products?.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
      {/* <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem /> */}
    </div>
  );
}
