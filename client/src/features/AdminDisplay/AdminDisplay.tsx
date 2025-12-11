import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import AdminHeader from "./AdminHeader/AdminHeader";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function AdminDisplay() {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(true);
  return (
    <>
      <section className="grid grid-cols-[300px_1fr] grid-rows-[100px_1fr]">
        {(toggleSidebar || isDesktop) && (
          <AdminSidebar setToggleSidebar={setToggleSidebar} />
        )}
        {(!toggleSidebar || isDesktop) && (
          <>
            <AdminHeader setToggleSidebar={setToggleSidebar} />
            <Outlet />
          </>
        )}
      </section>
    </>
  );
}
