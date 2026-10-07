import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import AboutHero from "../../components/about/AboutHero/AboutHero";
import BrandStory from "../../components/about/BrandStory/BrandStory";
import OurMission from "../../components/about/OurMission/OurMission";
import OurValues from "../../components/about/OurValues/OurValues";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className="overflow-x-hidden w-full min-h-screen" data-aos="fade-up">
      <AboutHero />
      <BrandStory />
      <OurMission />
      <OurValues />
    </div>
  );
};

export default About;
