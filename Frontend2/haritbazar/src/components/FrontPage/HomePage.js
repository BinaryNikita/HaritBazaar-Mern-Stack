import Header from "./Header";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import CarouselSection from "./CarouselSection";
import NewArrival from "./NewArrival";
import MostWantedProducts from "./MostWantedProducts";

const HomePage = () => {
    return(
        <>
        <Header />
        <HeroSection />
        <CarouselSection />
        <MostWantedProducts/>
        <NewArrival/>
        <Footer /></>
    );
}

export default HomePage;