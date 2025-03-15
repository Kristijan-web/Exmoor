export default function SettingsMenu() {
  return (
    <aside className="shadow-my-shadow bg-secondary-new col-span-full lg:col-start-1 lg:col-end-5 xl:col-end-4 2xl:col-end-3">
      <div className="flex flex-col items-center justify-center gap-10 p-7">
        <h2 className="mb-10 text-4xl">Dobrodošli Petar</h2>
        <div className="flex flex-col gap-10 px-5 lg:px-2">
          <div className="flex cursor-pointer items-center justify-start gap-3">
            <span className="flex items-center justify-start text-xl">
              {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
              <ion-icon name="person-outline"></ion-icon>
            </span>
            <p className="text-2xl lg:text-xl">Opšte postavke</p>
          </div>
          <div className="flex items-center justify-start gap-3">
            <span className="flex items-center justify-start text-xl">
              {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
              <ion-icon name="lock-closed-outline"></ion-icon>
            </span>
            <p className="cursor-pointer text-2xl lg:text-xl">Promena šifre</p>
          </div>
          <div className="flex items-center justify-start gap-3">
            <span className="flex items-center justify-start text-xl">
              {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
              <ion-icon name="heart-outline"></ion-icon>
            </span>
            <p className="cursor-pointer text-2xl lg:text-xl">
              Omiljeni proizvodi
            </p>
          </div>
          <div className="flex items-center justify-start gap-3">
            <span className="flex items-center justify-start text-xl">
              {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
              <ion-icon name="bag-outline"></ion-icon>
            </span>
            <p className="cursor-pointer text-2xl lg:text-xl">
              Kupljeni proizvodi
            </p>
          </div>
          <div className="flex items-center justify-start gap-3">
            <span className="flex items-center justify-start text-xl">
              {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
              <ion-icon name="log-in-outline"></ion-icon>
            </span>
            <p className="cursor-pointer text-2xl lg:text-xl">Odjavi se</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
