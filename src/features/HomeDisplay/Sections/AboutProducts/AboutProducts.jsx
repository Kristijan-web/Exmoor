export default function AboutProducts() {
  return (
    <section className="h-[80vh] w-full">
      <div className="grid grid-cols-12 grid-rows-2">
        <div className="col-start-1 col-end-6 row-span-full">Test</div>
        <div className="col-start-6 col-end-12">Test</div>
        <div className="col-start-6 col-end-12 row-span-2">Test</div>
      </div>
    </section>
  );
}
// grid-template-columsn; repeapt(3,1fr);
// grid-template-rows: 1/2
