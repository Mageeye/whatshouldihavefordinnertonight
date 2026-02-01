'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import { RecipeBuilder } from '@/components/RecipeBuilder'

export default function PantryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/cook">
            <Button variant="outline" size="sm">
              ← Back
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Recipe Builder - Use What You Have
        </h1>
        <p className="mt-2 text-gray-600">
          Tell us what ingredients you have, and we'll suggest recipes you can
          make right now.
        </p>
        <RecipeBuilder type="pantry" />
      </main>
    </div>
  )
}
