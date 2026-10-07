import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import ContactForm from "../../components/contact/ContactForm";
import ContactHero from "../../components/contact/ContactHero";
import ContactInfo from "../../components/contact/ContactInfo";

const ContactPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <main className="w-full overflow-x-hidden min-h-screen" data-aos="fade-up">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
    </main>
  );
};

export default ContactPage;
