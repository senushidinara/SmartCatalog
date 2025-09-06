import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import AIRecommendations from "@/components/ai-recommendations";
import ProductCatalog from "@/components/product-catalog";
import DynamicOffers from "@/components/dynamic-offers";
import LoyaltyProgram from "@/components/loyalty-program";
import InteractiveCheckout from "@/components/interactive-checkout";
import Footer from "@/components/footer";
import NeuralAnimations from "@/components/neural-animations";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NeuralAnimations />
      <Header cartItemCount={3} />
      <main>
        <HeroSection />
        <AIRecommendations />
        <ProductCatalog />
        <DynamicOffers />
        <LoyaltyProgram />
        <InteractiveCheckout />
      </main>
      <Footer />
    </div>
  );
}
