import Link from 'next/link'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            What Should I Have For Dinner Tonight?
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Can&apos;t decide what to have for dinner? We&apos;ll help you choose between
            cooking something delicious or ordering out. Get personalized recipe
            suggestions based on what you have, or find the perfect restaurant
            near you.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/start">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
