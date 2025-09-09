import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 600_000, // 10 minuta
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
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
      </QueryClientProvider>
    </>
  );
}
