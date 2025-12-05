import useGetProducts from "../../../../hooks/Products/useGetProducts";
import Loader from "../../../../ui/Loader";
import ProductItem from "./ProductItem";

export type Sale = {
  discount: number;
  sale_start: Date;
  sale_end: Date;
  sold: number;
};

export type Product = {
  id: string;
  title: string;
  brand: string;
  gender: string;
  water: string;
  price: number;
  quantity: number;
  image: string;
  sale?: Sale | null;
};

export default function DisplayProducts() {
  const { data: products, isLoading } = useGetProducts();
  if (isLoading) return <Loader />;
  return (
    <div className="col-start-1 col-end-3 mx-auto w-full max-w-6xl p-4 md:p-6 lg:col-start-2 lg:col-end-3">
      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600">
              <th className="px-4 py-3">Proizvod</th>
              <th className="px-4 py-3">Pol</th>
              <th className="px-4 py-3">Tip vode</th>
              <th className="px-4 py-3">Cena</th>
              <th className="px-4 py-3">Stanje</th>
              <th className="px-4 py-3">Akcija</th>
              <th className="px-4 py-3">Akcija period</th>
              <th className="px-4 py-3">Izmeni</th>
              <th className="px-4 py-3">Obrisi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products?.map((p) => <ProductItem p={p} key={p.title} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
