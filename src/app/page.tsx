import Hero from "@/components/home/Hero";
import ProductsShowcase from "@/components/home/ProductsShowcase";
import Philosophy from "@/components/home/Philosophy";
import Bestseller from "@/components/home/Bestseller";
import ScentQuiz from "@/components/home/ScentQuiz";
import Testimonials from "@/components/home/Testimonials";
import FinalCta from "@/components/home/FinalCta";
import Footer from "@/components/Footer";
import NotesMarquee from "@/components/home/NotesMarquee";

export default function HomePage() {
  return (
    <>
      <Hero />
      <NotesMarquee />
      <ProductsShowcase />
      <Philosophy />
      <Bestseller />
      <ScentQuiz />
      <Testimonials />
      <FinalCta />
      <Footer />
    </>
  );
}
