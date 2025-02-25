import { FaRegUser } from "react-icons/fa";
import { LuTicketPercent } from "react-icons/lu";
import { PiMoneyLight } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
export default function Perks() {
  return (
    <section className="">
      <div className="max-w-7x mx-auto flex flex-col items-center justify-center bg-[#f3f3f3] px-6 py-4 lg:h-80">
        <h1 className="mb-10 text-center text-3xl">E-kupovina beneficije</h1>
        <div className="grid w-full grid-cols-1 items-center justify-items-center gap-15 gap-y-10 sm:grid-cols-2 sm:gap-x-2 lg:grid-cols-4">
          {/* Radi mobile-first */}
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-4xl">
              <TbTruckDelivery />
            </span>
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl">Ocekivana dostava</p>
              <p className="text-main-color-shade/70">
                Dostava u roku od 4 do 7 dana
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-4xl">
              <PiMoneyLight />
            </span>
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl">Nacin placanja</p>
              <p className="text-main-color-shade/70">
                Pouzecem kuriske sluzbe
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-4xl">
              <LuTicketPercent />
            </span>
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl">Osvojite kupone</p>
              <p className="text-main-color-shade/70">
                Osvojite kupon pri registraciji naloga
              </p>
            </div>
          </div>
          <div className="mb-10 flex flex-col items-center justify-center gap-2 lg:mb-0">
            <span className="text-3xl lg:text-4xl">
              <FaRegUser />
            </span>
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl">Dobijajte novosti</p>
              <p className="text-main-color-shade/70">
                registrujte nalog i budite u toku
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
