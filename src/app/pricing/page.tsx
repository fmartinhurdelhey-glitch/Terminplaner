import Pricing from '@/components/pricing';
import FooterSection from '@/components/footer';
import { HeroHeader } from '@/components/header';

export default function PricingPage() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen">
        <Pricing />
        <FooterSection />
      </main>
    </>
  );
}
