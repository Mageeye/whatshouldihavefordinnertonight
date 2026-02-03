'use client'

import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { Button } from '@/components/ui/button'
import { WheelPicker } from '@/components/WheelPicker'

export default function WheelPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              ← Back
            </Button>
          </Link>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Spin the Wheel
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Type your go-to dinner spots and we&apos;ll pick one—no overthinking.
          </p>
        </div>
        <WheelPicker />
      </main>
    </div>
  )
}
