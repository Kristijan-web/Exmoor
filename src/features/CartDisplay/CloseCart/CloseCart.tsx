export default function CloseCart() {
  //kada se klikne na x treba da se ukloni clasa show

  function handleCloseCart() {
    const cartSection = document.querySelector(".cart");
    if (!cartSection) {
      console.error("Cart sekcija ne postoji");
    }
    const hideCart = [
      "translate-x-[100%]",
      "transition-all",
      "duration-[0.3s]",
    ];

    cartSection?.classList.add(...hideCart);
  }

  return (
    <div
      onClick={handleCloseCart}
      className="absolute top-5 right-4 cursor-pointer"
    >
      &#10006;
    </div>
  );
}
