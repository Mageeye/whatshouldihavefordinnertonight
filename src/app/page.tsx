import Link from 'next/link'
import Image from 'next/image'
import { SiteHeader } from '@/components/SiteHeader'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src="/logo/logo.png"
              alt="Dinner Decision Maker logo"
              width={160}
              height={160}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Dinner Decision Maker
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Can&apos;t decide what to have for dinner? We&apos;ll help you choose between
            cooking something delicious or ordering out. Get personalized recipe
            suggestions based on what you have, or find the perfect restaurant
            near you.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/start">Get Started</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
