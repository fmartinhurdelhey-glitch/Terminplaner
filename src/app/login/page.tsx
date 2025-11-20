import { HeroHeader } from '@/components/header'
import FooterSection from '@/components/footer'
import Login from '@/components/login'

export default function LoginPage() {
    return (
        <>
            <HeroHeader />
            <main className="min-h-screen">
                <Login />
            </main>
            <FooterSection />
        </>
    )
}
