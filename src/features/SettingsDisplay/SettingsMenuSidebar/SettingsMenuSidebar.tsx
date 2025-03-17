import { NavLink } from "react-router-dom";

export default function SettingsMenu() {
  return (
    <aside className="shadow-my-shadow bg-secondary-new col-span-full h-140 lg:col-start-1 lg:col-end-5 lg:h-180 xl:col-end-4 2xl:col-end-3">
      <div className="flex flex-col items-center justify-center gap-10 p-7">
        <h2 className="mb-10 text-4xl">Dobrodošli Petar</h2>
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
