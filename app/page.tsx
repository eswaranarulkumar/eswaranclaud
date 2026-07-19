import { IntroProvider } from "@/components/IntroContext";
import BootOverlay from "@/components/BootOverlay";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Broadcast from "@/components/Broadcast";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <IntroProvider>
      <BootOverlay />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Broadcast />
        <Projects />
        <Contact />
      </main>
    </IntroProvider>
  );
}
