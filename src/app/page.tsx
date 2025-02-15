import ContactSection from "@/components/ui/ContactUsSection";
import FAQSection from "@/components/ui/FAQSection";
import FeaturesSection from "@/components/ui/FeaturesSection";
import HeroSection from "@/components/ui/HeroSection";
import HowItWorksSection from "@/components/ui/HowItWorksSection";
import PricingSection from "@/components/ui/PricingSection";
import TestimonialsSection from "@/components/ui/TestimonialsSection";

export default function Home() {
	return (
		<>
			<HeroSection />
			<FeaturesSection />
			<HowItWorksSection />
			<TestimonialsSection />
			<PricingSection />
			<FAQSection />
			<ContactSection />
		</>
	);
}
