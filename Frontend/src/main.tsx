import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import ThemeProvider from "./context/ThemeProvider";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastContainer } from "react-toastify";

//  Import QueryClient and QueryClientProvider
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </WishlistProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
