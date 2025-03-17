import { NavLink } from "react-router-dom";

export default function SettingsMenuSidebar() {
  return (
    <aside className="lg:h-180 lg:border-1 lg:border-black">
      <div className="flex h-full flex-col items-center justify-start gap-4 p-7 lg:gap-10">
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-white lg:h-25 lg:w-25">
            <span className="text-4xl">P</span>
          </div>
          <h2 className="mb-10 text-4xl">Dobrodošli Petar</h2>
        </div>
        <ul className="flex flex-col gap-10 px-5 lg:px-2">
          <li className="flex cursor-pointer items-center justify-start gap-3">
            <span className="flex items-center justify-start text-xl">
              {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
              <ion-icon name="person-outline"></ion-icon>
            </span>
            <NavLink to="postavke" className="text-2xl lg:text-xl">
              Opšte postavke
            </NavLink>
          </li>
          <li className="flex items-center justify-start gap-3">
            <span className="flex items-center justify-start text-xl">
              {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
              <ion-icon name="lock-closed-outline"></ion-icon>
            </span>
            <NavLink
              to="promena-sifre"
              className="cursor-pointer text-2xl lg:text-xl"
            >
              Promena šifre
            </NavLink>
          </li>
          <li className="flex items-center justify-start gap-3">
            <span className="flex items-center justify-start text-xl">
              {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
              <ion-icon name="heart-outline"></ion-icon>
            </span>
            <NavLink
              to="omiljeni-proizvodi"
              className="cursor-pointer text-2xl lg:text-xl"
            >
              Omiljeni proizvodi
            </NavLink>
          </li>
          <li className="flex items-center justify-start gap-3">
            <span className="flex items-center justify-start text-xl">
              {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
              <ion-icon name="bag-outline"></ion-icon>
            </span>
            <NavLink
              to="kupljeni-proizvodi"
              className="cursor-pointer text-2xl lg:text-xl"
            >
              Kupljeni proizvodi
            </NavLink>
          </li>
          <li className="flex items-center justify-start gap-3">
            <span className="flex items-center justify-start text-xl">
              {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
              <ion-icon name="log-in-outline"></ion-icon>
            </span>
            <span className="cursor-pointer text-2xl lg:text-xl">
              Odjavi se
            </span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
