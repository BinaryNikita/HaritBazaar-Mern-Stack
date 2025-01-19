import Header from "./Header";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import CarouselSection from "./CarouselSection";
import MostWantedProducts from "./MostWanted";
import LessCarbonFootPrintProduct from "./CarbonFootprint";

const HomePage = () => {
    return(
        <>
        <Header />
        <HeroSection />
        <CarouselSection />
        <MostWantedProducts/>
        <LessCarbonFootPrintProduct/>
        <Footer /></>
    );
}

export default HomePage;