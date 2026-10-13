import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Toast from "@/components/common/Toast";
import LocationModal from "@/components/common/LocationModal";
import { useToastMessage } from "@/context/ToastContext";

export default function Layout() {
  const toast = useToastMessage();
  return (
    <div id="top">
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <Toast message={toast} />
      <LocationModal />
      <ScrollRestoration />
    </div>
  );
}
