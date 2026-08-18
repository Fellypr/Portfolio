import { AboutSection } from "@/features/about";
import { HeroSection } from "@/features/hero";
import { StacksSection } from "@/features/stacks";
import { Header } from "@/components";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <StacksSection />
    </main>
  );
}
