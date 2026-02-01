'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              What Should I Have For Dinner Tonight?
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/blog"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Blog
            </Link>
            <Link
              href="/recipes"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Recipes
            </Link>
            {session ? (
              <>
                <Link
                  href="/app"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
