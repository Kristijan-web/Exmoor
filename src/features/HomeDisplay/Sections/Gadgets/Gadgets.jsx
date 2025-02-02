// sirina section-a je 1152px

export default function Gadgets() {
  // na samom vrhu div ce imati sirinu i margin-x auto, a div unutar njega ce imati paddng sa leve i desne strane
  return (
    <>
      <section className="mx-auto max-w-6xl text-center">
        <div className="mx-auto mb-24">
          <h2>Be Your Own Inspiration</h2>
        </div>
        <div className="grid items-center justify-items-center gap-12 px-8 lg:grid-cols-4">
          <div>
            <span className="text-5xl">
              <ion-icon name="shield-checkmark-outline"></ion-icon>
            </span>
            <p className="text-xl font-semibold">Quality</p>
            <p className="text-main-color-shade">
              Is quality imporant to you? Do you want only the best, well we
              only make the best
            </p>
          </div>
          <div>
            <icon></icon>
            <span className="text-5xl">
              <ion-icon name="color-wand-outline"></ion-icon>
            </span>
            <p className="text-xl font-semibold">Design</p>
            <p>
              Is quality imporant to you? Do you want only the best, well we
              only make the best
            </p>
          </div>
          <div>
            <span className="text-5xl">
              <ion-icon name="wallet-outline"></ion-icon>
            </span>
            <p className="text-xl font-semibold">Cost</p>
            <p>
              Is quality imporant to you? Do you want only the best, well we
              only make the best
            </p>
          </div>
          <div>
            <icon></icon>
            <p className="text-5xl">
              <ion-icon name="leaf-outline"></ion-icon>
            </p>
            <p className="text-xl font-semibold">Recycble</p>
            <p>
              Is quality imporant to you? Do you want only the best, well we
              only make the best
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
