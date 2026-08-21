import { AboutSection } from "@/features/about";
import { ContactSection } from "@/features/contact";
import { HeroSection } from "@/features/hero";
import { ProjectsSection } from "@/features/projects";
import { StacksSection } from "@/features/stacks";
import { Header } from "@/components";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <StacksSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
