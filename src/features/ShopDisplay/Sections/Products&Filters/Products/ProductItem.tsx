export default function ProductItem() {
  return (
    <div className="shadow-my-shadow relative flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-sm p-10">
      <img
        className="mb-5 w-[60%] rounded-sm"
        src="/Images/ShopPage/Products/shop-item-1.jpg"
        alt="zara perfume"
      />
      <p className="text-xl">Zara Light Touch</p>
      <span className="text-main-color-shade/70">Muški</span>
      <p>3.999 RSD </p>
      <span className="text-main-color-tint absolute top-[10px] right-[15px] text-xl">
        {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
        <ion-icon name="heart"></ion-icon>
      </span>
    </div>
  );
}
