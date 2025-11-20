import { Cpu, Lock, Sparkles, Zap } from 'lucide-react'
import Image from 'next/image'

export default function FeaturesSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-7xl space-y-16 px-2">
                <div className="relative z-10 grid items-center gap-6 md:grid-cols-2 md:gap-12">
                    <h2 className="text-4xl font-semibold">Verbinde deine E-mails mit unserer KI</h2>
                    <p className="max-w-md sm:ml-auto">Die KI ließt im Hintergrund alle Termine aus deinen E-Mails aus und erstellt automatisch Kalendereinträge, welche du akzeptieren oder ablehnen kannst.</p>
                </div>
                <div className="px-0 relative">
                    <div className="relative rounded-xl overflow-hidden">
                        <Image
                            src="/verbinden.jpg"
                            alt="Terminplaner Dashboard"
                            width={1600}
                            height={1067}
                            className="w-full h-auto relative z-0"
                            priority
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white to-transparent dark:from-gray-900 z-10"></div>
                    </div>
                </div>
                <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4" />
                            <h3 className="text-sm font-medium">Schnell</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Termine werden schnell aus deinen E-Mails extrahiert und in deinen Kalender importiert</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Cpu className="size-4" />
                            <h3 className="text-sm font-medium">Powerful</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Starke Server und schnelle Rechenleistung</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Lock className="size-4" />
                            <h3 className="text-sm font-medium">Sicher</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Daten werden sicher gespeichert und verarbeitet</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4" />

                            <h3 className="text-sm font-medium">KI unterstützt</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">KI unterstützt die Extraktion von Termine aus E-Mails</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
