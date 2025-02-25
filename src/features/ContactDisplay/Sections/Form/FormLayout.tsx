import FormItem from "./FormItem.tsx";

export default function FormLayout() {
  // mobile-first radi
  return (
    <section className="mt-20 mb-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-8 px-7">
        <FormItem />
        {/* u divu ispod bice iconice  */}
        <div className="grid grid-cols-12 gap-6">
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
      </div>
    </section>
  );
}
