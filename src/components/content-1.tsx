import Image from 'next/image'

export default function ContentSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="space-y-12">
                    <div className="text-center">
                        <h2 className="text-4xl font-medium lg:text-5xl whitespace-nowrap">So einfach funktioniert Mailkalender.</h2>
                    </div>
                    <div className="relative w-full max-w-5xl mx-auto">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <Image 
                                src="/Kalender.jpg" 
                                className="w-full h-auto rounded-xl" 
                                alt="Kalender mit Terminen" 
                                width={1600} 
                                height={1067}
                                priority
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    
                    <div className="max-w-3xl mx-auto space-y-4">
                        <p className="text-muted-foreground">
                            Mailkalender liest deine E-Mails intelligent aus, erkennt automatisch Termine und trägt sie direkt in deinen Kalender ein - sicher, schnell und zuverlässig.
                        </p>
                        <p className="text-muted-foreground">
                            <span className="text-accent-foreground font-bold">1.</span> E-Mails analysieren: Mailkalender erkennt relevante Nachrichten und extrahiert automatisch Datum, Uhrzeit und Ort.
                        </p>
                        <p className="text-muted-foreground">
                            <span className="text-accent-foreground font-bold">2.</span> Kalender-Eintrag erzeugen: Die App erstellt passende Termineinträge – ganz ohne manuelles Kopieren.
                        </p>
                        <p className="text-muted-foreground">
                            <span className="text-accent-foreground font-bold">3.</span> Immer aktuell: Änderungen oder neue Termine werden automatisch synchronisiert.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
