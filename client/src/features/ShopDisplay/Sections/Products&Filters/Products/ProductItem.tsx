import { Product } from "../../../../../types/products/productsType";
// import { API_URL } from "../../../../../utills/constants";

type Props = {
  product: Product;
};

export default function ProductItem({ product }: Props) {
  const { title, image, price, gender, brand, water: type } = product;

  const sale_discount = product.sale?.discount ?? null;
  const discountedPrice = sale_discount
    ? price - Math.round((price * sale_discount) / 100)
    : null;
  if (sale_discount) {
    console.log(discountedPrice);
  }
  return (
    <div className="shadow-my-shadow relative flex w-full flex-col items-center justify-between gap-3 overflow-hidden rounded-sm p-10">
      {sale_discount && (
        <div className="text-secondary-color absolute top-5 -right-7 w-[120px] rotate-45 bg-black text-center">
          {sale_discount}%
        </div>
      )}
      <img
        className="440pixels:w-[50%] mb-5 w-[100%] rounded-sm sm:w-[100%]"
        src={`${image}`}
        alt="zara perfume"
      />
      <p className="text-xl">
        {brand} {title}
      </p>
      <span className="text-main-color-shade/70">{gender}</span>
      <span className="text-main-color-shade/70">{type}</span>
      {sale_discount ? (
        <s className="text-main-color-shade/70">{price} RSD</s>
      ) : (
        <p>{price} RSD</p>
      )}
      {sale_discount && <p>{discountedPrice?.toFixed(2)} RSD</p>}
      <span className="text-main-color-tint absolute top-[10px] right-[15px] text-xl">
        {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
        <ion-icon name="heart"></ion-icon>
      </span>
    </div>
  );
}
