export default function SearchProducts() {
  return (
    <div className="relative col-start-1 col-end-13">
      {/* <span className="z-10 inline-block h-10 w-10"></span> */}
      <input
        type="text"
        placeholder="Pretrazite..."
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}
