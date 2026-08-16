import HeroSection from "@/components/home/HeroSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import AboutSection from "@/components/home/AboutSection";
import TechStackSection from "@/components/home/TechStackSection";
import ResumeSection from "@/components/home/ResumeSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <TechStackSection />
      <ResumeSection />
      <ContactSection />
    </>
  );
}
