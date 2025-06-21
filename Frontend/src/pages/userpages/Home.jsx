import Navbar from '../../components/Navbar.jsx';
import Hero from '../../components/Hero.jsx';
import DiamondShape from '../../components/DiamondShape.jsx';
import FeaturedDiamonds from '../../components/FeaturedDiamonds.jsx';
import WhyChooseUs from '../../components/WhyChooseUs.jsx';
import Footer from '../../components/Footer.jsx';

function Home() {
  return (
    <div>
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
    </div>
  )
}

export default Home
