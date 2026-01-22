import HeroSection from "../../components/homeSection/HeroSection";
import ServicesSection from "../../components/homeSection/ServicesSection";
// import ProcessSection from "../components/homeSection/ProcessSection";

const Home = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ServicesSection />
      {/* <ProcessSection /> */}
     
    </div>
  );
};

export default Home;