import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Pipeline from './components/Pipeline';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded focus:bg-lime focus:px-3 focus:py-2 focus:text-black">Skip to content</a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Pipeline />
        <Projects />
        <Skills />
        <Resume />
        <Contact />
      </main>
    </>
  );
}
