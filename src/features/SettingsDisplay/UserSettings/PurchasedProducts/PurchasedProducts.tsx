import Product from "./PurchasedProduct/Product";

export default function PurchasedProducts() {
  return (
    <div className="mx-auto flex h-full flex-col p-7">
      <div className="flex items-center justify-center p-12">
        <h3 className="mb-10">Kupljeni proizvodi</h3>
      </div>
      <div>
        <section className="flex h-120 flex-col gap-5 overflow-auto">
          <Product />
          <Product />
          <Product />
          <Product />
        </section>
      </div>
    </div>
  );
}
