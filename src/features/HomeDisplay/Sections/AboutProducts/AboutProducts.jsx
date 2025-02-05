export default function AboutProducts() {
  return (
    <section className="h-[110vh] w-full">
      <div className="grid h-[110vh] grid-cols-12 grid-rows-2 gap-[1px]">
        <div className="col-start-1 col-end-7 row-span-full bg-[url(/Images/AboutProducts/teest2.jpg)] bg-cover bg-no-repeat"></div>
        <div className="col-start-7 col-end-13 bg-[url(/Images/AboutProducts/teest.jpg)] bg-cover bg-no-repeat"></div>
        <div className="col-start-7 col-end-13 row-span-2 bg-[url(/Images/AboutProducts/peti_1.webp)] bg-cover bg-center bg-no-repeat"></div>
      </div>
    </section>
  );
}
// grid-template-columsn; repeapt(3,1fr);
// grid-template-rows: 1/2
