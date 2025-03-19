import DiamondShape from "../components/DiamondShape";
import FeaturedDiamonds from "../components/FeaturedDiamonds";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import WhyChooseUs from "../components/WhyChooseUs";


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