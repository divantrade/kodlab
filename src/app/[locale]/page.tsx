import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="grid-bg min-h-screen w-full">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <TechStack />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
