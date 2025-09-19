export default function AdminSidebar() {
  return (
    <div className="col-start-1 col-end-3 row-start-1 row-end-3 bg-red-500 p-8 lg:col-start-1 lg:col-end-2">
      {/* // ovde ide sidebar */}
      <div className="h-full">
        <ul className="flex h-full flex-col items-center justify-center gap-5 lg:gap-8">
          <li className="text-2xl">Products</li>
          <li className="text-2xl">Users</li>
          <li className="text-2xl">Stats</li>
          <li className="text-2xl">Graph</li>
        </ul>
      </div>
    </div>
  );
}
