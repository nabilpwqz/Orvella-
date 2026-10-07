import BrandStory from "../../components/home/BrandStory/BrandStory";
import FeaturedPerfumes from "../../components/home/FeaturedPerfumes/FeaturedPerfumes";
import HeroCarousel from "../../components/home/Hero/HeroCarousel";
import Newsletter from "../../components/home/Newsletter/Newsletter";
import ShopCollections from "../../components/home/ShopCollections/ShopCollections";
import Testimonials from "../../components/home/Testimonials/Testimonials";
import WhyChooseUs from "../../components/home/WhyChooseUs/WhyChooseUs";

const HomePage = () => {
  return (
    <>
      <HeroCarousel />
      <ShopCollections />
      <FeaturedPerfumes />
      <WhyChooseUs />
      <BrandStory />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default HomePage;
