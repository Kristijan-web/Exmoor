import ProductItem from "../../../ShopDisplay/Sections/Products&Filters/Products/ProductItem";

export default function FavoriteProducts() {
  return (
    <div className="mx-auto flex h-full flex-col p-7">
      <div className="p-12">
        <h3 className="mb-10 text-center">Omiljeni proizvodi</h3>
      </div>
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 gap-5 sm:mx-auto sm:w-[70%] md:w-full md:grid-cols-3 lg:grid-cols-3">
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </div>
        <div className="flex items-center justify-center gap-5">
          <span className="flex items-center justify-center text-2xl">
            {/* @ts-expect-error  Typescript doesn't recognize icon as valid element*/}
            <ion-icon name="arrow-back-outline"></ion-icon>
          </span>
          <div className="flex items-start justify-center text-xl">
            <span className="flex items-start justify-center">
              {/* @ts-expect-error  Typescript doesn't recognize icon as valid element*/}
              <ion-icon name="ellipse-outline"></ion-icon>
            </span>
            <span className="flex items-start justify-center">
              {/* @ts-expect-error  Typescript doesn't recognize icon as valid element*/}
              <ion-icon name="ellipse-outline"></ion-icon>
            </span>
            <span className="flex items-start justify-center">
              {/* @ts-expect-error  Typescript doesn't recognize icon as valid element*/}
              <ion-icon name="ellipse-outline"></ion-icon>
            </span>
          </div>
          <span className="flex items-center justify-center text-2xl">
            {/* @ts-expect-error  Typescript doesn't recognize icon as valid element*/}
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </span>
        </div>
      </div>
    </div>
  );
}
