// sirina section-a je 1152px

export default function Gadgets() {
  // na samom vrhu div ce imati sirinu i margin-x auto, a div unutar njega ce imati paddng sa leve i desne strane
  return (
    <>
      <section className="mx-auto mb-24 max-w-6xl text-center">
        <div className="mx-auto mb-24">
          <h2>Budite Svoja Inspiracija</h2>
        </div>
        <div className="grid items-center justify-items-center gap-12 px-7 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-5xl">
              {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
              <ion-icon name="shield-checkmark-outline"></ion-icon>
            </span>
            <p className="text-xl font-semibold">Kvalitet</p>
            <p className="text-main-color-shade">
              Tražite neuporediv kvalitet? Mi isporučujemo izvrsnost bez
              kompromisa.
            </p>
          </div>
          <div>
            <span className="text-5xl">
              {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
              <ion-icon name="time-outline"></ion-icon>
            </span>
            <p className="text-xl font-semibold">Trajno</p>
            <p>
              Želite miris koji traje? Uživajte u dugotrajnim notama koje
              očaravaju ceo dan.
            </p>
          </div>
          <div>
            <span className="text-5xl">
              {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
              <ion-icon name="wallet-outline"></ion-icon>
            </span>
            <p className="text-xl font-semibold">Cena</p>
            <p>
              Cena je bitna, ali i kvalitet. Dobijte najbolje bez prevelikih
              troškova ili kompromisa.
            </p>
          </div>
          <div>
            <p className="text-5xl">
              {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
              <ion-icon name="leaf-outline"></ion-icon>
            </p>
            <p className="text-xl font-semibold">Reciklirano</p>
            <p>
              Brinete o prirodi? Izaberite reciklabilne proizvode koji prave
              razliku.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
