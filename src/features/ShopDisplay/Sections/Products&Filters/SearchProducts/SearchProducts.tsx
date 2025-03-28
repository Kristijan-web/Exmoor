export default function SearchProducts() {
  return (
    <div className="relative col-span-full row-start-1 row-end-2 h-11 self-start overflow-visible lg:col-start-4 lg:col-end-10 lg:w-full lg:overflow-hidden xl:w-[108%] 2xl:col-end-9">
      {/* <span className="z-10 inline-block h-10 w-10"></span> */}
      <input
        type="text"
        placeholder="Pretrazite..."
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}
