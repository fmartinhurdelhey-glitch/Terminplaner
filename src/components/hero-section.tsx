import React from 'react'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { HeroHeader } from './header'
import { LogoCloud } from './logo-cloud'
import Image from 'next/image'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export default function HeroSection() {
    return (
        <>
            <HeroHeader />

            <main className="relative z-10 overflow-visible [--color-primary-foreground:var(--color-white)] [--color-primary:var(--color-green-600)]">
                <section>
                    <div className="relative mx-auto max-w-6xl px-6 pb-8 pt-32 lg:pt-40">
                        <div className="relative z-10 mx-auto max-w-4xl text-center">
                            <TextEffect
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                as="h1"
                                className="text-balance text-5xl font-medium md:text-6xl">
                                Nie wieder Termine manuell eintragen
                            </TextEffect>
                            <TextEffect
                                per="line"
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                delay={0.5}
                                as="p"
                                className="mx-auto mt-6 max-w-2xl text-pretty text-lg">
                                Keiro verwandelt Termin-E-Mails in Kalendereinträge – vollautomatisch, sicher und zuverlässig. Weniger Aufwand, mehr Fokus auf das Wesentliche.
                            </TextEffect>

                            <div className="mt-12">
                                <div className="relative mx-auto -mb-10 w-full max-w-7xl px-6">
                                    <div className="relative w-[180%] -left-[40%] transform scale-110">
                                        <AppComponent />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
            </main>
        </>
    )
}

const AppComponent = () => {
    return (
        <div className="relative w-full h-auto">
            <Image
                src="/terminplaner-preview.png"
                alt="Terminplaner Vorschau"
                width={2400}
                height={1800}
                className="w-full h-auto"
                priority
                quality={100}
            />
        </div>
    )
}
