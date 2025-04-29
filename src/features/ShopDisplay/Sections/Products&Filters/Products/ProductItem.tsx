type Sale = {
  id: number;
  sale_price: number;
  valid_from: string;
  valid_to: string;
};

type ProductType = {
  id: number;
  type: string;
};

type Brand = {
  id: number;
  name: string;
};

type Gender = {
  gender: string;
  id: number;
};
type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  category_id: number;
  Gender: Gender;
  Brand: Brand;
  Product_type: ProductType;
  Sale?: Sale | null;
};
type Props = {
  product: Product;
};

export default function ProductItem({ product }: Props) {
  const sale_price = product.Sale?.sale_price ?? null;
  const {
    title,
    image,
    price,
    Gender: { gender },
    Brand: { name },
    Product_type: { type },
  } = product;
  return (
    <div className="shadow-my-shadow relative flex w-full cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-sm p-10">
      {sale_price && (
        <div className="text-secondary-color absolute top-5 -right-7 w-[120px] rotate-45 bg-black text-center">
          {sale_price}%
        </div>
      )}
      <img className="mb-5 w-[60%] rounded-sm" src={image} alt="zara perfume" />
      <p className="text-xl">
        {name} {title}
      </p>
      <span className="text-main-color-shade/70">{gender}</span>
      <span className="text-main-color-shade/70">{type}</span>
      <p>{price} RSD</p>
      <span className="text-main-color-tint absolute top-[10px] right-[15px] text-xl">
        {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
        <ion-icon name="heart"></ion-icon>
      </span>
    </div>
  );
}
