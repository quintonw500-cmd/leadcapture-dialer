import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import TrustSection from "../components/TrustSection";
import AgentSection from "../components/AgentSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import { useScrollTracking } from "../hooks/useScrollTracking";

const Index = () => {
  // Enable scroll depth tracking
  useScrollTracking();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <TrustSection />
        <AgentSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;