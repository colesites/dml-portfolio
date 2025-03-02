import About from "@/components/about/page";
import Contact from "@/components/contact/page";
import Hero from "@/components/Hero";
import Projects from "@/components/projects/page";

const page = () => {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </>
  );
};

export default page;
