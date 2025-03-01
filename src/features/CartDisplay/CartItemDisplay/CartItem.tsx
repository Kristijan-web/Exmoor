export default function CartItem() {
  return (
    <div className="flex justify-between gap-2">
      {/* Dodaj alt tag ovde */}
      <img className="w-20" src="/Images/ShopPage/Products/shop-item-1.jpg" />
      <div className="flex flex-col justify-between gap-5">
        <p>Zara perfume</p>
        <span>5.999,00 RSD</span>
        <div className="flex items-center justify-start gap-2">
          <span>Kolicina:</span>
          <input
            type="number"
            value="1"
            className="w-10 border-1 border-black"
          />
        </div>
      </div>
      <div className="flex flex-col items-end justify-end">x</div>
    </div>
  );
}
