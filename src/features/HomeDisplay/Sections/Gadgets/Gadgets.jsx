// sirina section-a je 1152px

export default function Gadgets() {
  // na samom vrhu div ce imati sirinu i margin-x auto, a div unutar njega ce imati paddng sa leve i desne strane
  return (
    <>
      <section className="mx-auto mb-24 max-w-6xl text-center">
        <div className="mx-auto mb-24">
          <h2>Be Your Own Inspiration</h2>
        </div>
        <div className="grid items-center justify-items-center gap-12 px-7 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-5xl">
              <ion-icon name="shield-checkmark-outline"></ion-icon>
            </span>
            <p className="text-xl font-semibold">Quality</p>
            <p className="text-main-color-shade">
              Looking for unmatched quality? We deliver excellence without
              compromise.
            </p>
          </div>
          <div>
            <span className="text-5xl">
              <ion-icon name="time-outline"></ion-icon>
            </span>
            <p className="text-xl font-semibold">Timeless</p>
            <p>
              Want a fragrance that lasts? Enjoy long-lasting scents that
              captivate all day.
            </p>
          </div>
          <div>
            <span className="text-5xl">
              <ion-icon name="wallet-outline"></ion-icon>
            </span>
            <p className="text-xl font-semibold">Cost</p>
            <p>
              Cost matters, but so does quality, get the best without
              overspending or settling.
            </p>
          </div>
          <div>
            <p className="text-5xl">
              <ion-icon name="leaf-outline"></ion-icon>
            </p>
            <p className="text-xl font-semibold">Recycble</p>
            <p>
              Care about sustainability? Choose recyclable products that make a
              difference.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
