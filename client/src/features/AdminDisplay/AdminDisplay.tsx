export default function AdminDisplay() {
  // koristi 3x grid,za header admin page, za sidebar sa leve strane i prikaz proizvoda
  return (
    <section className="grid h-[calc(100vh-84px)] grid-cols-[300px_1fr] grid-rows-[100px_1fr]">
      <div className="row-start-1 row-end-3 bg-red-500"></div>
      <div className="bg-green-500"></div>
      <div className="bg-blue-500"></div>
    </section>
  );
}
