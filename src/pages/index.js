import { useRef, useState, useEffect, useCallback } from "react";
import Header from "@/components/header";
import Hero from "@/sections/hero";
import About from "@/sections/about";
import { ToastContainer } from "react-toastify";
import Whychoose from "@/sections/whychoose";
import Location from "@/sections/location";
import Services from "@/sections/services";
import Highlight from "@/sections/highlight";
import Packages from "@/sections/packages";
import Contact from "@/sections/contact";
import Footer from "@/sections/footer";
import { ReactLenis } from 'lenis/react';

export default function Home() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const packagesRef = useRef(null);
  const contactRef = useRef(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobile, setIsMobile] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);  
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

const scrollToSection = useCallback((ref, sectionName) => {
  if (lenisRef.current?.lenis) {
    const target = ref.current;
    
    if (target) {
      lenisRef.current.lenis.scrollTo(target, {
        offset: 0,
        duration: 2.5, // Control the button click scroll speed here
        easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
        lock: true
      });
    }
  } else {
    ref.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
  setActiveSection(sectionName);
}, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.dataset.section);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = [
      heroRef.current,
      aboutRef.current,
      servicesRef.current,
      packagesRef.current,
      contactRef.current,
    ];

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  
  return (
    <div className="App">
       <ReactLenis 
    root 
    ref={lenisRef}
    options={{
      lerp: 0.05, 
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 0.8,
    }}
  />
      <Header
        mobile={isMobile}
        scrollToSection={scrollToSection}
        activeSection={activeSection}
        refs={{
          heroRef,
          aboutRef,
          servicesRef,
          packagesRef,
          contactRef,
        }} 
      />
      <ToastContainer />
      
      <section ref={heroRef} data-section="hero">
        <Hero />
      </section>
      
      <section ref={aboutRef} data-section="about">
        <About />
      </section>
      <Whychoose isMobile={isMobile} />
      
      <section ref={servicesRef} data-section="service">
        <Services isMobile={isMobile} />
      </section>
      
      <Highlight />
      
      <section ref={packagesRef} data-section="package">
        <Packages />
      </section>
      
      <section ref={contactRef} data-section="contact">
        <Contact isMobile={isMobile} />
      </section>
      
      <Location />
      <Footer />
    </div>
  );
}