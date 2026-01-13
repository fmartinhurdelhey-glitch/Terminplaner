import FooterSection from '@/components/footer';
import { HeroHeader } from '@/components/header';

export default function DatenschutzPage() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen pt-48 pb-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-12">Datenschutzerklärung</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <p className="text-muted-foreground leading-relaxed text-lg">
              Der Schutz deiner persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten deine Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TMG).
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Verantwortlicher</h2>
              <p className="text-muted-foreground leading-relaxed">
                Fabian Martin Hurdelhey<br />
                Mailkalender<br />
                Brunhildenstraße 13<br />
                45307 Essen<br />
                Deutschland<br />
                <br />
                E-Mail: info@mailkalender.de
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Allgemeine Hinweise zur Datenverarbeitung</h2>
              <p className="text-muted-foreground leading-relaxed">
                Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung erfolgt insbesondere zur Vertragserfüllung, zur Bereitstellung der App-Funktionalität sowie zur Sicherheit und Optimierung unseres Angebots.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Erhebung und Speicherung personenbezogener Daten</h2>
              <h3 className="text-xl font-semibold mb-3 mt-6">a) Beim Besuch der Website</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Beim Aufrufen unserer Website werden automatisch folgende Daten erfasst:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>IP-Adresse (anonymisiert)</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Browsertyp und Betriebssystem</li>
                <li>Referrer-URL</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Diese Daten dienen der technischen Sicherheit und Stabilität der Website.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Nutzerkonten und Registrierung</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Für die Nutzung von Mailkalender ist ein Nutzerkonto erforderlich. Dabei verarbeiten wir:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>E-Mail-Adresse</li>
                <li>Passwort (verschlüsselt gespeichert)</li>
                <li>optionale Profildaten</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Die Verarbeitung erfolgt zur Bereitstellung der App und zur Vertragserfüllung gemäß Art. 6 Abs. 1 lit. b DSGVO.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Anmeldung über Google (Google Login)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Alternativ zur Registrierung per E-Mail kannst du dich über den Google Login anmelden. Dabei erhalten wir von Google:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>E-Mail-Adresse</li>
                <li>Name (falls von dir freigegeben)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Die Authentifizierung erfolgt über die Systeme von Google. Es gelten zusätzlich die Datenschutzbestimmungen von Google.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. E-Mail-Verarbeitung (Gmail, Outlook, IMAP)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Mailkalender verarbeitet E-Mails, um Termine automatisiert zu erkennen und Kalendereinträge zu erstellen.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Dabei werden:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>E-Mail-Inhalte analysiert</li>
                <li>Terminrelevante Informationen extrahiert</li>
                <li>keine E-Mails dauerhaft gespeichert, sofern nicht zur Vertragserfüllung erforderlich</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Die Verarbeitung erfolgt ausschließlich zweckgebunden und nur nach deiner ausdrücklichen Zustimmung.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Einsatz von Künstlicher Intelligenz (OpenAI)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Zur automatisierten Erkennung und Verarbeitung von Termininformationen nutzen wir KI-Modelle von OpenAI.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Dabei können Inhalte aus E-Mails temporär verarbeitet werden, um:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>Datum</li>
                <li>Uhrzeit</li>
                <li>Ort</li>
                <li>Termininhalt</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                zu erkennen.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. b DSGVO zur Vertragserfüllung. Inhalte werden nicht zu Trainingszwecken verwendet.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Zahlungsabwicklung (Stripe & PayPal)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Für kostenpflichtige Leistungen nutzen wir externe Zahlungsdienstleister:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>Stripe</li>
                <li>PayPal</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Dabei werden Zahlungs- und Rechnungsdaten direkt an den jeweiligen Zahlungsanbieter übermittelt. Wir selbst speichern keine vollständigen Zahlungsdaten.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Die Verarbeitung erfolgt zur Vertragserfüllung und aufgrund gesetzlicher Aufbewahrungspflichten.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Analyse-Tool Plausible Analytics</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Wir nutzen Plausible Analytics zur anonymen Auswertung der Website-Nutzung.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Dabei werden:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>keine Cookies gesetzt</li>
                <li>keine personenbezogenen Daten gespeichert</li>
                <li>keine Nutzerprofile erstellt</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Die IP-Adresse wird nicht gespeichert oder vollständig anonymisiert verarbeitet.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Optimierung unseres Angebots).
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Unsere Website verwendet keine Cookies zu Analyse- oder Marketingzwecken. Technisch notwendige Cookies können zur Sicherstellung grundlegender Funktionen eingesetzt werden.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Speicherdauer</h2>
              <p className="text-muted-foreground leading-relaxed">
                Personenbezogene Daten werden nur so lange gespeichert, wie dies zur Erfüllung der jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Deine Rechte</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Du hast jederzeit das Recht auf:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>Auskunft über deine gespeicherten Daten</li>
                <li>Berichtigung unrichtiger Daten</li>
                <li>Löschung deiner Daten</li>
                <li>Einschränkung der Verarbeitung</li>
                <li>Datenübertragbarkeit</li>
                <li>Widerruf einer erteilten Einwilligung</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Anfragen kannst du jederzeit an die oben genannte E-Mail-Adresse richten.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Beschwerderecht</h2>
              <p className="text-muted-foreground leading-relaxed">
                Du hast das Recht, dich bei einer Datenschutzaufsichtsbehörde zu beschweren, insbesondere in dem Mitgliedstaat deines gewöhnlichen Aufenthaltsortes.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Änderung dieser Datenschutzerklärung</h2>
              <p className="text-muted-foreground leading-relaxed">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an neue rechtliche Anforderungen oder Änderungen unserer Leistungen anzupassen.
              </p>
            </section>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
