import { HeroHeader } from '@/components/header'
import FooterSection from '@/components/footer'
import Login from '@/components/login'

export default function SignupPage() {
    return (
        <>
            <HeroHeader />
            <main className="min-h-screen">
                <Login isSignup={true} />
            </main>
            <FooterSection />
        </>
    )
}
