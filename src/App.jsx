import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import ErrorPage from "@/components/common/ErrorPage";

// Home, Our Story and 404 ship in the main bundle. The other routes load on demand, so the first visit
// downloads less JavaScript and CSS (the franchise page alone carries about 17 KB of CSS).
const load = (importer) => async () => ({ Component: (await importer()).default });
const products = () => import("@/pages/Products");
const franchise = () => import("@/pages/Franchise");

const router = createBrowserRouter([
  {
    element: <Layout />,
    // a pathless wrapper, so an error in any page renders inside the layout (header and footer stay)
    children: [{
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/products", lazy: load(products) },
        { path: "/cart", lazy: load(() => import("@/pages/Cart")) },
        { path: "/about", element: <About /> },
        { path: "/contact", lazy: load(() => import("@/pages/Contact")) },
        { path: "/franchise", lazy: load(franchise) },
        { path: "/investment-calculator", lazy: load(() => import("@/pages/InvestmentCalculator")) },
        { path: "/login", lazy: load(() => import("@/pages/Login")) },
        { path: "/track", lazy: load(() => import("@/pages/Track")) },
        { path: "*", element: <NotFound /> },
      ],
    }],
  },
]);

// Once the browser is idle, fetch the two pages people most often go to next so navigating to them feels instant.
if (typeof window !== "undefined") {
  const prefetch = () => { products(); franchise(); };
  if ("requestIdleCallback" in window) window.requestIdleCallback(prefetch, { timeout: 4000 });
  else setTimeout(prefetch, 2500);
}

export default function App() {
  return <RouterProvider router={router} fallbackElement={<div className="route-loading" role="status">Loading…</div>} />;
}
