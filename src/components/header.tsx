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
                                                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[280px] bg-white dark:bg-gray-900 rounded-md border shadow-md p-1 z-40">
                                                        <a 
                                                            href="https://github.com/fmartinhurdelhey-glitch/Terminplaner/releases/download/v1.0.0/Email.Terminplaner-1.0.0-arm64.dmg"
                                                            className="flex items-center gap-3 px-2 py-2 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                                                            onClick={() => setDownloadOpen(false)}
                                                        >
                                                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                                                            </svg>
                                                            <span className="text-sm">macOS (M1/M2/M3) - 113 MB</span>
                                                        </a>
                                                        <a 
                                                            href="https://github.com/fmartinhurdelhey-glitch/Terminplaner/releases/download/v1.0.0/Email.Terminplaner-1.0.0.dmg"
                                                            className="flex items-center gap-3 px-2 py-2 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                                                            onClick={() => setDownloadOpen(false)}
                                                        >
                                                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                                                            </svg>
                                                            <span className="text-sm">macOS (Intel) - 118 MB</span>
                                                        </a>
                                                        <a 
                                                            href="https://github.com/fmartinhurdelhey-glitch/Terminplaner/releases/download/v1.0.0/Email.Terminplaner.Setup.1.0.0.exe"
                                                            className="flex items-center gap-3 px-2 py-2 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                                                            onClick={() => setDownloadOpen(false)}
                                                        >
                                                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M3 5.5L11 3v8H3V5.5zM11 12v8l-8-2.5V12h8zm1 8l8-2.5V12h-8v8zm8-9.5V5.5L12 3v8h8z"/>
                                                            </svg>
                                                            <span className="text-sm">Windows - 178 MB</span>
                                                        </a>
                                                        <a 
                                                            href="https://github.com/fmartinhurdelhey-glitch/Terminplaner/releases/download/v1.0.0/Email.Terminplaner-1.0.0.AppImage"
                                                            className="flex items-center gap-3 px-2 py-2 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                                                            onClick={() => setDownloadOpen(false)}
                                                        >
                                                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.84-.41 1.6-.348 2.557.145 2.235 1.163 4.25 2.717 5.5 1.502 1.209 3.42 1.983 5.547 1.983 2.125 0 4.043-.774 5.546-1.983 1.554-1.25 2.572-3.265 2.717-5.5.062-.957-.07-1.717-.348-2.557-.589-1.771-1.831-3.47-2.715-4.521-.75-1.067-.975-1.928-1.051-3.02-.065-1.491 1.056-5.965-3.17-6.298-.165-.013-.325-.021-.48-.021zm-.005 2.5c-.362 0-.656.294-.656.656v1.688h1.312V3.156c0-.362-.294-.656-.656-.656zm0 3.5c-.906 0-1.64.734-1.64 1.64s.734 1.64 1.64 1.64 1.64-.734 1.64-1.64-.734-1.64-1.64-1.64z"/>
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