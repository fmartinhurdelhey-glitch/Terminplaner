import FooterSection from '@/components/footer';
import { HeroHeader } from '@/components/header';
import Link from 'next/link';

export default function AGBsPage() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen pt-48 pb-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-12">Allgemeine Geschäftsbedingungen (AGB)</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Geltungsbereich</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der Webanwendung Mailkalender, betrieben von<br />
                Fabian Martin Hurdelhey, Mailkalender, Brunhildenstraße 13, 45307 Essen, Deutschland.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Abweichende Bedingungen des Nutzers finden keine Anwendung, sofern ihnen nicht ausdrücklich zugestimmt wurde.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Vertragsgegenstand</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Mailkalender ist eine webbasierte Software (SaaS), die E-Mails analysiert und daraus automatisch Kalendereinträge erstellt.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Die Nutzung erfolgt über einen Benutzeraccount. Ein Anspruch auf eine bestimmte Verfügbarkeit oder Fehlerfreiheit besteht nicht.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Registrierung und Nutzerkonto</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Die Nutzung von Mailkalender setzt die Registrierung eines Nutzerkontos voraus.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Der Nutzer ist verpflichtet:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li>bei der Registrierung wahrheitsgemäße Angaben zu machen</li>
                <li>seine Zugangsdaten geheim zu halten</li>
                <li>keinen unbefugten Zugriff zu ermöglichen</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Der Anbieter behält sich vor, Nutzerkonten bei Verstößen gegen diese AGB zu sperren oder zu löschen.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Leistungen und Verfügbarkeit</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Mailkalender wird „wie verfügbar" bereitgestellt. Wartungsarbeiten, Weiterentwicklungen oder technische Störungen können zu temporären Einschränkungen führen.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Ein Anspruch auf permanente Verfügbarkeit besteht nicht.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Nutzung von Künstlicher Intelligenz</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Zur Erbringung der Leistung setzt Mailkalender KI-gestützte Systeme ein, insbesondere zur Analyse von E-Mail-Inhalten.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Die Ergebnisse der KI dienen der Unterstützung und stellen keine Garantie für Vollständigkeit oder Richtigkeit dar. Der Nutzer ist verpflichtet, Termine vor endgültiger Übernahme zu prüfen.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Pflichten des Nutzers</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Der Nutzer verpflichtet sich:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 mb-3">
                <li>Mailkalender nur im Rahmen der geltenden Gesetze zu nutzen</li>
                <li>keine missbräuchliche oder rechtswidrige Nutzung vorzunehmen</li>
                <li>keine Schadsoftware oder automatisierte Zugriffe einzusetzen</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Ein Verstoß kann zur sofortigen Sperrung des Nutzerkontos führen.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Preise und Zahlungsbedingungen</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Einige Funktionen von Mailkalender sind kostenpflichtig.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Die Abrechnung erfolgt über die angebotenen Zahlungsanbieter <strong>Stripe</strong> und <strong>PayPal</strong>. Die jeweils gültigen Preise sind auf der Website einsehbar.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Abonnements verlängern sich automatisch, sofern sie nicht rechtzeitig gekündigt werden.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Widerrufsrecht</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Verbrauchern steht grundsätzlich ein gesetzliches Widerrufsrecht zu.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Das Widerrufsrecht erlischt vorzeitig, wenn der Nutzer ausdrücklich zustimmt, dass mit der Ausführung der Dienstleistung vor Ablauf der Widerrufsfrist begonnen wird und er dadurch sein Widerrufsrecht verliert.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Details sind im <strong>Widerrufsrecht</strong> auf der Website geregelt.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Haftung</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Der Anbieter haftet nur für Vorsatz und grobe Fahrlässigkeit.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten und begrenzt auf den vorhersehbaren Schaden.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Eine Haftung für Datenverluste oder fehlerhafte KI-Auswertungen ist ausgeschlossen, sofern kein Vorsatz oder grobe Fahrlässigkeit vorliegt.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Datenschutz</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Die Verarbeitung personenbezogener Daten erfolgt gemäß der Datenschutzerklärung von Mailkalender.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Diese ist jederzeit unter <Link href="/datenschutz" className="text-primary hover:underline">/datenschutz</Link> abrufbar.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Vertragslaufzeit und Kündigung</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Kostenpflichtige Abonnements können jederzeit zum Ende der jeweiligen Laufzeit gekündigt werden.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Die Kündigung kann über das Nutzerkonto oder per E-Mail erfolgen.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Änderungen der AGB</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Der Anbieter behält sich vor, diese AGB zu ändern, sofern dies aus rechtlichen oder technischen Gründen erforderlich ist.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nutzer werden über wesentliche Änderungen rechtzeitig informiert.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Schlussbestimmungen</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Es gilt das Recht der Bundesrepublik Deutschland.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Regelungen unberührt.
              </p>
            </section>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
