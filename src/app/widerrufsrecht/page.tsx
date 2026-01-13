import FooterSection from '@/components/footer';
import { HeroHeader } from '@/components/header';
import Link from 'next/link';

export default function WiderrufsrechtPage() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen pt-48 pb-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-12">Widerrufsrecht</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Widerrufsbelehrung</h2>
              <p className="text-muted-foreground leading-relaxed">
                Verbraucher haben das Recht, einen Vertrag innerhalb von vierzehn Tagen ohne Angabe von Gründen zu widerrufen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Widerrufsfrist</h2>
              <p className="text-muted-foreground leading-relaxed">
                Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Widerruf ausüben</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Um dein Widerrufsrecht auszuüben, musst du uns
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                <strong>Fabian Martin Hurdelhey, Mailkalender, Brunhildenstraße 13, 45307 Essen, Deutschland,<br />
                E-Mail: <Link href="mailto:info@mailkalender.de" className="text-primary hover:underline">info@mailkalender.de</Link></strong>
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                mittels einer eindeutigen Erklärung (z. B. per E-Mail) über deinen Entschluss informieren, diesen Vertrag zu widerrufen.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Zur Wahrung der Widerrufsfrist reicht es aus, dass du die Mitteilung vor Ablauf der Widerrufsfrist absendest.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Folgen des Widerrufs</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Wenn du diesen Vertrag widerrufst, erstatten wir dir alle Zahlungen, die wir von dir erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag, an dem die Mitteilung über deinen Widerruf bei uns eingegangen ist.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das du bei der ursprünglichen Transaktion eingesetzt hast.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Besonderer Hinweis zum Erlöschen des Widerrufsrechts</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Das Widerrufsrecht erlischt vorzeitig, wenn wir mit der Ausführung der Dienstleistung begonnen haben, nachdem du:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li>ausdrücklich zugestimmt hast, dass wir vor Ablauf der Widerrufsfrist mit der Ausführung der Dienstleistung beginnen, und</li>
                <li>bestätigt hast, dass du mit Beginn der Ausführung der Dienstleistung dein Widerrufsrecht verlierst.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Dies gilt insbesondere für digitale Dienstleistungen wie die Nutzung von Mailkalender, bei denen die Leistung unmittelbar nach Registrierung oder Buchung erbracht wird.
              </p>
            </section>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
