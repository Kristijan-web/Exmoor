import toast from "react-hot-toast";
import ProductItem from "./ProductItem";
// grid grid-cols-1 justify-self-center sm:grid-cols-2 md:grid-cols-3 lg:col-start-4 lg:col-end-14 lg:mt-0
export default function Products() {
  if (true)
    return (
      <div className="col-span-full text-center lg:col-start-4 lg:col-end-13">
        <span className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-black border-b-transparent lg:h-16 lg:w-16"></span>
      </div>
    );
  else {
    return null;
  }
  // if (error) {
  //   toast.error("Error! Please reload the page");
  // }
  // return (
  //   <div className="col-span-full mt-8 grid grid-cols-1 gap-5 justify-self-center sm:grid-cols-2 md:grid-cols-3 lg:col-start-4 lg:col-end-13 lg:mt-0 lg:grid-cols-3 2xl:grid-cols-4">
  //     {products?.map((product) => (
  //       <ProductItem key={product.id} product={product} />
  //     ))}
  //   </div>
  // );
}
