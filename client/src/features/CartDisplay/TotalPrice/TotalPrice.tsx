export default function TotalPrice() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col gap-1">
        <p>KORPA:</p>
        <span className="font-semibold">5.999,00</span>
      </div>
      <div>
        <button className="btn">Nastavi ka plaćanju</button>
      </div>
    </div>
  );
}
