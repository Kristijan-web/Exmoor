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
  gender: "string";
  id: number;
};
type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category_id: number;
  Gender: Gender;
  Brand: Brand;
  Product_type: ProductType;
  Sale: Sale;
};
type Props = {
  product: Product;
};

export default function ProductItem({ product }: Props) {
  return (
    <div className="shadow-my-shadow relative flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-sm p-10">
      <img
        className="mb-5 w-[60%] rounded-sm"
        src={product.image}
        alt="zara perfume"
      />
      <p className="text-xl">
        {product.Brand.name} {product.title}
      </p>
      <span className="text-main-color-shade/70">{product.Gender.gender}</span>
      <span className="text-main-color-shade/70">
        {product.Product_type.type}
      </span>
      <p>{product.price} RSD</p>
      <span className="text-main-color-tint absolute top-[10px] right-[15px] text-xl">
        {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
        <ion-icon name="heart"></ion-icon>
      </span>
    </div>
  );
}
