'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from './Button'

const COUNT_OPTIONS = [4, 6, 8, 10] as const
type CountOption = typeof COUNT_OPTIONS[number]

const PLACEHOLDER_EXAMPLES = [
  'e.g., Chipotle',
  'e.g., Thai House',
  "e.g., Freddy's",
  'e.g., Pizza Hut',
  'e.g., Panda Express',
  'e.g., Olive Garden',
  'e.g., Five Guys',
  'e.g., Taco Bell',
  'e.g., Subway',
  'e.g., Chick-fil-A',
]

export function WheelPicker() {
  const [count, setCount] = useState<CountOption>(4)
  const [places, setPlaces] = useState<string[]>(Array(4).fill(''))
  const [isSpinning, setIsSpinning] = useState(false)
  const [display, setDisplay] = useState<string | null>(null)
  const [winner, setWinner] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Later: if user is signed in, load saved places into state
  // useEffect(() => {
  //   if (session?.user) {
  //     fetchSavedPlaces().then(setPlaces)
  //   }
  // }, [session])

  // Update places array when count changes
  useEffect(() => {
    setPlaces((prev) => {
      if (prev.length < count) {
        return [...prev, ...Array(count - prev.length).fill('')]
      }
      return prev.slice(0, count)
    })
    setWinner(null)
    setError(null)
  }, [count])

  const updatePlace = (index: number, value: string) => {
    setPlaces((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
    setError(null)
  }

  const getValidPlaces = useCallback(() => {
    return places.filter((p) => p.trim().length > 0)
  }, [places])

  const handleSpin = () => {
    const validPlaces = getValidPlaces()
    
    if (validPlaces.length < 2) {
      setError('Add at least 2 places to spin.')
      return
    }

    setError(null)
    setIsSpinning(true)
    setWinner(null)

    // Spin animation: rapidly change display for ~1.5 seconds
    const spinDuration = 1500
    const intervalTime = 100
    let elapsed = 0

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * validPlaces.length)
      setDisplay(validPlaces[randomIndex])
      elapsed += intervalTime

      if (elapsed >= spinDuration) {
        clearInterval(interval)
        // Pick final winner
        const winnerIndex = Math.floor(Math.random() * validPlaces.length)
        const finalWinner = validPlaces[winnerIndex]
        setDisplay(null)
        setWinner(finalWinner)
        setIsSpinning(false)
      }
    }, intervalTime)
  }

  const canSpin = getValidPlaces().length >= 2

  return (
    <div className="mx-auto max-w-xl">
      {/* Count Selector */}
      <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
        <label className="block text-sm font-medium text-foreground">
          How many places tonight?
        </label>
        <div className="mt-3 flex gap-2">
          {COUNT_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => setCount(option)}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                count === option
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Place Inputs */}
      <div className="mt-6 rounded-xl bg-card p-6 shadow-sm border border-border">
        <label className="block text-sm font-medium text-foreground">
          Your places
        </label>
        <div className="mt-3 space-y-3">
          {places.map((place, index) => (
            <input
              key={index}
              type="text"
              value={place}
              onChange={(e) => updatePlace(index, e.target.value)}
              placeholder={PLACEHOLDER_EXAMPLES[index] || `Place ${index + 1}`}
              className="block w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          For now, you&apos;ll type these each time. Later you&apos;ll be able to save favorites when you&apos;re signed in.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Spin Button */}
      <div className="mt-6">
        <Button
          onClick={handleSpin}
          disabled={isSpinning || !canSpin}
          size="lg"
          className="w-full h-12 text-base shadow-sm"
        >
          {isSpinning ? 'Spinning…' : 'Spin'}
        </Button>
      </div>

      {/* Spinning Display */}
      {isSpinning && display && (
        <div className="mt-8 rounded-xl bg-card p-8 shadow-sm border border-border text-center">
          <p className="text-sm text-muted-foreground mb-2">Choosing...</p>
          <p className="text-2xl font-semibold text-foreground animate-pulse">
            {display}
          </p>
        </div>
      )}

      {/* Winner Display */}
      {winner && !isSpinning && (
        <div className="mt-8 rounded-xl bg-primary/10 p-8 shadow-sm border border-primary/30 text-center animate-in fade-in zoom-in-95 duration-300">
          <p className="text-sm text-muted-foreground mb-2">Tonight&apos;s pick</p>
          <p className="text-3xl font-bold text-primary">
            {winner}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            🎉 Enjoy your meal!
          </p>
        </div>
      )}
    </div>
  )
}
