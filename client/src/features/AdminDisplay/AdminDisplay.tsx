import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar/AdminSidebar";

// Razmisli o tome kako ce izgledati state menagment, i prop drilling
// Mozda je bolje 2 grid diva ne budu u <Outlet/> vec da se header izvadi i stavi ovde, jer bi on samo prikazivao naslov content-a

export default function AdminDisplay() {
  // koristi 3x grid,za header admin page, za sidebar sa leve strane i prikaz proizvoda
  return (
    <>
      <section className="grid h-[calc(100vh-84px)] grid-cols-[300px_1fr] grid-rows-[100px_1fr]">
        <AdminSidebar />
        <Outlet />
      </section>
    </>
  );
}
