export default function AboutProducts() {
  return (
    <section className="mb-24 h-[110vh] w-full">
      <div className="grid h-[110vh] cursor-pointer grid-cols-12 grid-rows-3 gap-[1px] sm:grid-rows-2">
        <div className="gradient_image_man col-start-1 col-end-13 flex items-end justify-center bg-cover bg-center bg-no-repeat pb-7 sm:col-start-1 sm:col-end-7 sm:row-span-full sm:bg-left">
          <span className="text-secondary-color text-center text-4xl">
            Muški parfemi
          </span>
        </div>

        <div className="gradient_image_woman col-start-1 col-end-13 flex cursor-pointer items-end justify-center bg-cover bg-no-repeat pb-7 sm:col-start-7 sm:col-end-13">
          <span className="text-secondary-color text-center text-4xl">
            Ženski parfemi
          </span>
        </div>
        <div className="gradient_image_home col-start-1 col-end-13 flex cursor-pointer items-end justify-center bg-cover bg-center bg-no-repeat pb-7 sm:col-start-7 sm:col-end-13 sm:row-span-2">
          <span className="text-secondary-color text-center text-4xl">
            Kućni parfemi
          </span>
        </div>
      </div>
    </section>
  );
}
// grid-template-columsn; repeapt(3,1fr);
// grid-template-rows: 1/2
// rgba(0,0,0,0.6),rgba(0,0,0,0.6), url(/Images/AboutProducts/teest2.jpg)
