import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { About } from "@/components/sections/About";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ImpactStory } from "@/components/sections/ImpactStory";
import { Product } from "@/components/sections/Product";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { WhySenda } from "@/components/sections/WhySenda";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <HowItWorks />
        <Product />
        <ImpactStory />
        <WhySenda />
        <WhoItsFor />
        <WhoWeAre />
        <BrandStatement />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
