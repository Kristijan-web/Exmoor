// sirina section-a je 1152px

import {
  IoLeafOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
  IoWalletOutline,
} from "react-icons/io5";

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
            <span className="mb-2 flex items-center justify-center text-5xl">
              <IoShieldCheckmarkOutline />
            </span>
            <p className="text-xl font-semibold">Kvalitet</p>
            <p className="text-main-color-shade">
              Tražite neuporediv kvalitet? Mi isporučujemo izvrsnost bez
              kompromisa.
            </p>
          </div>
          <div>
            <span className="mb-2 flex items-center justify-center text-5xl">
              <IoTimeOutline />
            </span>
            <p className="text-xl font-semibold">Trajno</p>
            <p>
              Želite miris koji traje? Uživajte u dugotrajnim notama koje
              očaravaju ceo dan.
            </p>
          </div>
          <div>
            <span className="mb-2 flex items-center justify-center text-5xl">
              <IoWalletOutline />
            </span>
            <p className="text-xl font-semibold">Cena</p>
            <p>
              Cena je bitna, ali i kvalitet. Dobijte najbolje bez prevelikih
              troškova ili kompromisa.
            </p>
          </div>
          <div>
            <p className="mb-2 flex items-center justify-center text-5xl">
              <IoLeafOutline />
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
