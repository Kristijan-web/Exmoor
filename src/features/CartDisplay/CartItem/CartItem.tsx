export default function CartItem() {
  return (
    <div className="flex justify-between gap-2">
      {/* Dodaj alt tag ovde */}
      <img
        className="w-20 rounded-xs"
        src="/Images/ShopPage/Products/shop-item-1.jpg"
      />
      <div className="flex flex-col justify-between gap-5">
        <p className="text-xl">Zara perfume</p>
        <span className="font-semibold">5.999,00 RSD</span>
        <div className="flex items-center justify-start gap-2">
          <span className="text-main-color-shade/90">Količina:</span>
          <input
            type="number"
            className="no-spinner w-10 rounded-xs border-1 border-black text-center"
          />
        </div>
      </div>
      <div className="flex flex-col items-end justify-end">
        <span className="flex cursor-pointer items-end justify-end">
          {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
          <ion-icon name="trash-outline"></ion-icon>
        </span>
      </div>
    </div>
  );
}
