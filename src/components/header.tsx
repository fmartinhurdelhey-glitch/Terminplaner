'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Download, User, Apple, Monitor, Laptop } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import React from 'react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/logo'

const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Preise', href: '/pricing' },
    { name: 'FAQ', href: '/faq' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [downloadOpen, setDownloadOpen] = React.useState(false)
    const { user, loading } = useAuth()
    const router = useRouter()
    
    // Client-side only rendering
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => {
        setMounted(true)
    }, [])

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    const handleDownload = (e: React.MouseEvent) => {
        e.preventDefault()
        router.push('/download')
    }

    return (
        <header>
            <nav
                data-state={menuState ? 'active' : 'inactive'}
                className="fixed z-20 w-full px-2">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link href="/" aria-label="home" className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full items-center justify-end gap-4">
                                {user ? (
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="gap-2"
                                                onClick={() => setDownloadOpen(!downloadOpen)}
                                            >
                                                <Download className="h-4 w-4" />
                                                Download
                                            </Button>
                                            {downloadOpen && (
                                                <>
                                                    <div 
                                                        className="fixed inset-0 z-30" 
                                                        onClick={() => setDownloadOpen(false)}
                                                    />
                                                    <div className="absolute right-0 top-full mt-2 w-[280px] bg-popover text-popover-foreground rounded-md border shadow-md p-1 z-40">
                                                        <a 
                                                            href="https://github.com/fmartinhurdelhey-glitch/Terminplaner/releases/download/v1.0.0/Email.Terminplaner-1.0.0-arm64.dmg"
                                                            className="flex items-center gap-3 px-2 py-2 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                                                            onClick={() => setDownloadOpen(false)}
                                                        >
                                                            <Apple className="h-4 w-4" />
                                                            <span className="text-sm">macOS (M1/M2/M3) - 113 MB</span>
                                                        </a>
                                                        <a 
                                                            href="https://github.com/fmartinhurdelhey-glitch/Terminplaner/releases/download/v1.0.0/Email.Terminplaner-1.0.0.dmg"
                                                            className="flex items-center gap-3 px-2 py-2 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                                                            onClick={() => setDownloadOpen(false)}
                                                        >
                                                            <Apple className="h-4 w-4" />
                                                            <span className="text-sm">macOS (Intel) - 118 MB</span>
                                                        </a>
                                                        <a 
                                                            href="https://github.com/fmartinhurdelhey-glitch/Terminplaner/releases/download/v1.0.0/Email.Terminplaner.Setup.1.0.0.exe"
                                                            className="flex items-center gap-3 px-2 py-2 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                                                            onClick={() => setDownloadOpen(false)}
                                                        >
                                                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                                                <line x1="3" y1="12" x2="21" y2="12" />
                                                                <line x1="12" y1="3" x2="12" y2="21" />
                                                            </svg>
                                                            <span className="text-sm">Windows - 178 MB</span>
                                                        </a>
                                                        <a 
                                                            href="https://github.com/fmartinhurdelhey-glitch/Terminplaner/releases/download/v1.0.0/Email.Terminplaner-1.0.0.AppImage"
                                                            className="flex items-center gap-3 px-2 py-2 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                                                            onClick={() => setDownloadOpen(false)}
                                                        >
                                                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                                                                <path d="M12 7v10" />
                                                                <path d="M8 12h8" />
                                                            </svg>
                                                            <span className="text-sm">Linux - 118 MB</span>
                                                        </a>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <Button asChild variant="ghost" size="icon" className="rounded-full">
                                            <Link href="/profile">
                                                <User className="h-5 w-5" />
                                                <span className="sr-only">Profil öffnen</span>
                                            </Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href="/login">Login</Link>
                                        </Button>
                                        <Button asChild size="sm">
                                            <Link href="/signup">Registrieren</Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}