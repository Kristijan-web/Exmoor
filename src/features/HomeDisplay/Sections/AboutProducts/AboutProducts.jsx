export default function AboutProducts() {
  return (
    <section className="h-[110vh] w-full">
      <div className="grid h-[110vh] grid-cols-12 grid-rows-2 gap-[1px]">
        <div className="gradient_image_man col-start-1 col-end-7 row-span-full flex items-end justify-center bg-cover bg-no-repeat p-7">
          <span className="text-secondary-color text-4xl">Man fragrances</span>
        </div>

        <div className="gradient_image_woman col-start-7 col-end-13 flex items-end justify-center bg-cover bg-no-repeat p-7">
          <span className="text-secondary-color text-4xl">
            Woman fragrances
          </span>
        </div>
        <div className="gradient_image_home col-start-7 col-end-13 row-span-2 flex items-end justify-center bg-cover bg-center bg-no-repeat p-7">
          <span className="text-secondary-color text-4xl">
            Woman fragrances
          </span>
        </div>
      </div>
    </section>
  );
}
// grid-template-columsn; repeapt(3,1fr);
// grid-template-rows: 1/2
// rgba(0,0,0,0.6),rgba(0,0,0,0.6), url(/Images/AboutProducts/teest2.jpg)
