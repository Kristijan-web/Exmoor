export default function Gadgets() {
  return (
    <section className="mb-20">
      <div className="mx-auto grid max-w-3xl grid-cols-12 gap-6 px-7">
        <div className="col-span-full flex flex-col items-center justify-center gap-1 lg:col-start-1 lg:col-end-7">
          <span className="text-3xl">
            {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
            <ion-icon name="mail-outline"></ion-icon>
          </span>
          <p className="text-xl">exmoorperfumes23@gmail.com</p>
        </div>

        <div className="col-span-full flex flex-col items-center justify-center gap-1 lg:col-start-7 lg:col-end-13">
          <span className="text-3xl">
            {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
            <ion-icon name="location-outline"></ion-icon>
          </span>
          <p className="text-center text-xl">
            Zdravka Celara 1, Novi grad, Beograd
          </p>
        </div>
      </div>
    </section>
  );
}
