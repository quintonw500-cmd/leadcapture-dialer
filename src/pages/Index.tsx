import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import TrustSection from "../components/TrustSection";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;