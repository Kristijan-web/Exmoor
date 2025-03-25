export default function Product() {
  return (
    <div className="bg-secondary-new flex flex-col items-center justify-between gap-5 border-1 border-black p-4 sm:flex-row">
      <div className="flex flex-col items-center gap-5 sm:flex-row">
        <div className="w-[git 0%] sm:w-[15%]">
          <img
            className="w-full"
            src="/public/Images/ShopPage/Products/shop-item-1.jpg"
          />
        </div>
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <p>Zara Light Touch</p>
          <span>Muski</span>
          <span>3.999 RSD</span>
        </div>
      </div>
      <div className="whitespace-nowrap">
        <p>Kolicina: 1</p>
      </div>
    </div>
  );
}
