import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import ValueProps from "@/components/home/ValueProps";
import Promos from "@/components/home/Promos";
import Testimonials from "@/components/home/Testimonials";
import BrandNumbers from "@/components/home/BrandNumbers";
import FranchiseStrip from "@/components/home/FranchiseStrip";
import CallToAction from "@/components/home/CallToAction";
import useDocumentTitle from "@/hooks/useDocumentTitle";


// Order follows priority: hero, signature products, brand story, offers and proof, franchise, find a store.
export default function Home() {
  useDocumentTitle("");
  return (
    <>
      <Hero />
      <Categories />
      <ValueProps />
      <Promos />
      <Testimonials />
      <BrandNumbers />
      <FranchiseStrip />
      <CallToAction />
    </>
  );
}
