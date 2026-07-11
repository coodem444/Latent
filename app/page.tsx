import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Method from "@/components/sections/Method";
import Services from "@/components/sections/Services";
import Benchmark from "@/components/sections/Benchmark";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <Header />
      <main>
        <Hero />
        <Problem />
        <Method />
        <Services />
        <Benchmark />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
