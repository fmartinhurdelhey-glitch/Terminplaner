'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQsTwo() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'Wie funktioniert Mailkalender genau?',
            answer: 'Mailkalender analysiert automatisch eingehende E-Mails, erkennt darin Termine, Meetings oder Events und schlägt dir vor, sie direkt in deinen Kalender einzutragen – mit nur einem Klick zur Bestätigung.',
        },
        {
            id: 'item-2',
            question: 'Kann ich selbst entscheiden, welche Termine eingetragen werden?',
            answer: 'Ja. Du erhältst für jeden erkannten Termin eine kurze Vorschau und kannst entscheiden, ob du ihn bestätigen, ablehnen oder anpassen möchtest.',
        },
        {
            id: 'item-3',
            question: 'Liest Mailkalender wirklich alle meine E-Mails?',
            answer: 'Nein. Die KI scannt nur die Metadaten und Inhalte relevanter Nachrichten, um Termine oder Zeitangaben zu erkennen. Private Nachrichten werden nicht gespeichert oder weitergegeben.',
        },
        {
            id: 'item-4',
            question: 'Mit welchen Kalendern funktioniert Mailkalender?',
            answer: "Mailkalender lässt sich mit gängigen Kalendern wie Google Calendar, Outlook und Apple Calendar verbinden – weitere Integrationen sind in Planung. Zudem gibt es einen App internen Kalender.",
        },
        {
            id: 'item-5',
            question: 'Sind meine Daten sicher?',
            answer: 'Ja. Alle Daten werden verschlüsselt übertragen und niemals an Dritte weitergegeben. Du behältst jederzeit volle Kontrolle über deine E-Mails und Kalenderdaten.',
        },
    ]

    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">Häufig gestellte Fragen</h2>
                    <p className="text-muted-foreground mt-4 text-balance">Finde schnell Antworten auf einige der am häufigsten gestellten Fragen.</p>
                </div>

                <div className="mx-auto mt-12 max-w-xl">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-dashed">
                                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">{item.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-base">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    
                </div>
            </div>
        </section>
    )
}
