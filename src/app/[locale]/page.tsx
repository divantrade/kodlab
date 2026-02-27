import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import StatsCounter from "@/components/StatsCounter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

// Use static generation with ISR for optimal Safari performance
// Static pages load faster on Safari mobile; cache headers in proxy.ts handle revalidation
export const revalidate = 3600; // Revalidate every hour

export default function Home() {
  return (
    <main className="locale-fade-in grid-bg min-h-screen w-full">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <TechStack />
      <About />
      <StatsCounter />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
