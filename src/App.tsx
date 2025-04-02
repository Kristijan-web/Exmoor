import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 3000 },
          style: { fontSize: "16px" },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}
