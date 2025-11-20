import FAQsTwo from '@/components/faqs-2';
import { FAQContactForm } from '@/components/faq-contact-form';
import FooterSection from '@/components/footer';
import { HeroHeader } from '@/components/header';

export default function FAQPage() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <FAQsTwo />
          <FAQContactForm />
        </div>
      </main>
      <FooterSection />
    </>
  );
}
