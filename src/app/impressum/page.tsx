import FooterSection from '@/components/footer';
import { HeroHeader } from '@/components/header';

export default function ImpressumPage() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen pt-48 pb-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-12">Impressum</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
              <p className="text-muted-foreground leading-relaxed">
                Fabian Martin Hurdelhey<br />
                Mailkalender<br />
                Brunhildenstraße 13<br />
                45307 Essen<br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Kontakt</h2>
              <p className="text-muted-foreground leading-relaxed">
                E-Mail: info@mailkalender.de
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Rechtsform</h2>
              <p className="text-muted-foreground leading-relaxed">
                Einzelunternehmen<br />
                Inhaber: Fabian Martin Hurdelhey
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Umsatzsteuer-ID</h2>
              <p className="text-muted-foreground leading-relaxed">
                Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                DE458790384
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <p className="text-muted-foreground leading-relaxed">
                Fabian Martin Hurdelhey<br />
                Brunhildenstraße 13<br />
                45307 Essen<br />
                Deutschland
              </p>
            </section>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
