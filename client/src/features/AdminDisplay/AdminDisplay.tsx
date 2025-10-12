import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import AdminHeader from "./AdminHeader/AdminHeader";
import { useState } from "react";

// Da li bi bilo bolje da sam korstio contex API?

// Sta znaci bolje?
// - Citljivije

// Da li je sa propo-vima citljiv ovaj kod?
// =

export default function AdminDisplay() {
  const [showOutlet, setShowOutlet] = useState<boolean>(false);
  return (
    <>
      <section className="grid h-[calc(100vh-84px)] grid-cols-[300px_1fr] grid-rows-[100px_1fr]">
        {!showOutlet && <AdminSidebar handleShowOutlet={setShowOutlet} />}
        {showOutlet && (
          <>
            <AdminHeader handleHideOutlet={setShowOutlet} />
            <Outlet />
          </>
        )}
      </section>
    </>
  );
}
