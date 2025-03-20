import DiamondShape from "../components/client/DiamondShape";
import FeaturedDiamonds from "../components/client/FeaturedDiamonds";
import Footer from "../components/client/Footer";
import Hero from "../components/client/Hero";
import Navbar from "../components/client/Navbar";
import WhyChooseUs from "../components/client/WhyChooseUs";


export default function Home() {    
    return (
        <div className="bg-white min-h-screen">
            <Navbar/>
            <main>
                <Hero /> 
                <DiamondShape/>
                <FeaturedDiamonds/>
                <WhyChooseUs/>
            </main>
            <Footer/>
        </div>
    )
}