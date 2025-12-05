import useDeleteProduct from "../../../../hooks/Products/useDeteleProduct";
import type { Product } from "../../../../types/products/productsType";
import { Sale } from "./DisplayProducts";

type Props = {
  p: Product;
};

const rsd = new Intl.NumberFormat("sr-RS", {
  style: "currency",
  currency: "RSD",
  maximumFractionDigits: 2,
});
function formatDate(d?: string) {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleDateString("sr-RS", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function isOnSale(sale?: Sale | null) {
  if (!sale) return false;
  const now = Date.now();
  return (
    new Date(sale.sale_start).getTime() <= now &&
    now <= new Date(sale.sale_end).getTime()
  );
}

function priceWithDiscount(price: number, sale?: Sale | null) {
  if (!sale) return price;
  const match = /([0-9]+(?:\.[0-9]+)?)/.exec(String(sale.discount));
  const pct = match ? parseFloat(match[1]) : 0;
  return price * (1 - pct / 100);
}

// Verovatno cu koristi mutate iz react query-a da obrisem proizvod (jer vec koristim react query da dohvatim proizvode)

export default function ProductItem({ p }: Props) {
  const { isPending, mutate: deleteProduct } = useDeleteProduct();
  const discounted = priceWithDiscount(p.price, p.sale);
  const onSale = isOnSale(p.sale);

  console.log(p);

  return (
    <tr key={p.id} className="hover:bg-gray-50">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={`${p.image}`}
            alt={p.title}
            className="h-12 w-12 rounded-xl object-cover ring-1 ring-gray-200"
          />
          <div>
            <div className="font-medium text-gray-900">{p.title}</div>
            <div className="text-xs text-gray-500">{p.brand}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">{p.gender}</td>
      <td className="px-4 py-3">{p.water}</td>
      <td className="px-4 py-3">
        {onSale ? (
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-gray-900">
              {rsd.format(discounted)}
            </span>
            <span className="text-xs text-gray-400 line-through">
              {rsd.format(p.price)}
            </span>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
              -{p.sale!.discount}%
            </span>
          </div>
        ) : (
          <span className="font-semibold text-gray-900">
            {rsd.format(p.price)}
          </span>
        )}
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
            p.quantity > 10
              ? "bg-indigo-50 text-indigo-700"
              : p.quantity > 0
                ? "bg-amber-50 text-amber-700"
                : "bg-rose-50 text-rose-700"
          }`}
        >
          {p.quantity > 0 ? `${p.quantity} kom` : "Nema na stanju"}
        </span>
      </td>
      <td className="px-4 py-3">
        {p.sale ? (
          <div className="flex flex-col">
            <span
              className={`text-xs font-medium ${onSale ? "text-green-700" : "text-gray-500"}`}
            >
              {onSale ? "U toku" : "Van akcije"}
            </span>
            <span className="text-[11px] text-gray-500">
              prodato: {p.sale.sold}
            </span>
          </div>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        )}
      </td>
      <td className="px-4 py-3 text-xs text-gray-600">
        {p.sale
          ? `${formatDate(String(p.sale.sale_start))} → ${formatDate(String(p.sale.sale_end))}`
          : "—"}
      </td>
      <td>
        <button
          onClick={() => deleteProduct(p.id)}
          disabled={isPending}
          className="cursor-pointer rounded-sm bg-red-600 p-3 text-white"
        >
          Obrisi
        </button>
      </td>
    </tr>
  );
}
