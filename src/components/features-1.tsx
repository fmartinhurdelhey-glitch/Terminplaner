import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Settings2, Sparkles, Zap } from 'lucide-react'
import { ReactNode } from 'react'

export default function Features() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Gebaut um deine Termine zu vereinheitlichen</h2>
                    <p className="mt-4">Mailkalender ist ein intelligenter Terminplaner, der automatisch Termine aus E-Mails extrahiert und in Kalendern verwalten kann.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto mt-8 max-w-5xl text-center md:mt-16">
                    <Card className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Zap className="size-6" aria-hidden />
                            </CardDecorator>
                            <h3 className="mt-6 font-medium">Intelligente Bestätigung</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">Behalte die Kontrolle über deine Termine.
Du entscheidest, ob neue Termine automatisch übernommen oder manuell bestätigt werden – einfach, transparent und flexibel.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Settings2 className="size-6" aria-hidden />
                            </CardDecorator>
                            <h3 className="mt-6 font-medium">Anpassbare Oberfläche</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">Gestalte Mailkalender so, wie es zu dir passt.
Farben, Layouts und Funktionen lassen sich individuell an deinen Stil oder dein Unternehmen anpassen.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Sparkles className="size-6" aria-hidden />
                            </CardDecorator>
                            <h3 className="mt-6 font-medium">KI-gestützt</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">Deine KI denkt mit.
Sie erkennt Termine in E-Mails, versteht Inhalte und erstellt automatisch passende Kalendereinträge – schnell, zuverlässig und zeitsparend.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <section id="features"></section>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
        />

        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)
