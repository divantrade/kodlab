import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SafariFallback from "@/components/SafariFallback";

// Use static generation with ISR for optimal Safari performance
// Static pages load faster on Safari mobile; cache headers in proxy.ts handle revalidation
export const revalidate = 3600; // Revalidate every hour

export default function Home() {
  return (
    <main className="grid-bg min-h-screen w-full">
      <SafariFallback />
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
