'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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

// Colors for wheel segments
const SEGMENT_COLORS = [
  '#F59E0B', // Amber
  '#82AB94', // Sage
  '#FBBF24', // Yellow
  '#6B9080', // Dark sage
  '#F97316', // Orange
  '#A7C4BC', // Light sage
  '#FB923C', // Light orange
  '#9DB5A8', // Muted sage
  '#FCD34D', // Gold
  '#7BA392', // Medium sage
]

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1
  return [
    'M', cx, cy,
    'L', start.x, start.y,
    'A', r, r, 0, largeArcFlag, 0, end.x, end.y,
    'Z',
  ].join(' ')
}

export function WheelPicker() {
  const [count, setCount] = useState<CountOption>(4)
  const [places, setPlaces] = useState<string[]>(Array(4).fill(''))
  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const [showWheel, setShowWheel] = useState(false)
  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
    setShowWheel(false)
    setRotation(0)
  }, [count])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current)
      }
    }
  }, [])

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
    setWinner(null)
    setIsSpinning(true)

    // Pick winner index
    const winnerIndex = Math.floor(Math.random() * validPlaces.length)
    const segmentAngle = 360 / validPlaces.length
    
    // Calculate rotation to land on winner
    // The pointer is at the top (0 degrees / 360 degrees)
    // Segment i's center is at: i * segmentAngle + segmentAngle/2
    // After rotation R, segment center appears at: (segmentCenter + R) mod 360
    // We want: (segmentCenter + R) mod 360 = 0 (top)
    // So R should end at: 360 - segmentCenter (or any multiple of 360 minus segmentCenter)
    
    const winnerSegmentCenter = winnerIndex * segmentAngle + segmentAngle / 2
    
    // Calculate where we currently are (mod 360)
    const currentAngle = rotation % 360
    
    // Target angle for the winner to be at top
    const targetAngle = 360 - winnerSegmentCenter
    
    // How much more we need to rotate to hit target (accounting for current position)
    let additionalRotation = targetAngle - currentAngle
    if (additionalRotation < 0) {
      additionalRotation += 360
    }
    
    // Add 5-8 full spins for dramatic effect
    const fullSpins = (5 + Math.floor(Math.random() * 4)) * 360
    const newRotation = rotation + fullSpins + additionalRotation

    // If wheel isn't showing yet, show it first then spin after a brief delay
    if (!showWheel) {
      setShowWheel(true)
      // Wait for wheel to render, then trigger spin
      setTimeout(() => {
        setRotation(newRotation)
      }, 50)
    } else {
      setRotation(newRotation)
    }

    // After spin completes, show winner
    spinTimeoutRef.current = setTimeout(() => {
      setIsSpinning(false)
      setWinner(validPlaces[winnerIndex])
    }, 4050) // Slightly longer to account for the delay
  }

  const canSpin = getValidPlaces().length >= 2
  const validPlaces = getValidPlaces()
  
  // Wheel dimensions
  const size = 280
  const cx = size / 2
  const cy = size / 2
  const radius = size / 2 - 10

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
              disabled={isSpinning}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 ${
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
              disabled={isSpinning}
              placeholder={PLACEHOLDER_EXAMPLES[index] || `Place ${index + 1}`}
              className="block w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
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

      {/* Wheel Display */}
      {showWheel && validPlaces.length >= 2 && (
        <div className="mt-8 rounded-xl bg-card p-6 shadow-sm border border-border">
          <div className="relative flex justify-center">
            {/* Pointer */}
            <div 
              className="absolute z-10"
              style={{ top: -8, left: '50%', transform: 'translateX(-50%)' }}
            >
              <div 
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '14px solid transparent',
                  borderRight: '14px solid transparent',
                  borderTop: '24px solid hsl(var(--primary))',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                }}
              />
            </div>
            
            {/* SVG Wheel */}
            <svg
              width={size}
              height={size}
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning 
                  ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' 
                  : 'none',
              }}
            >
              {/* Wheel border */}
              <circle
                cx={cx}
                cy={cy}
                r={radius + 5}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="4"
              />
              
              {/* Segments */}
              {validPlaces.map((place, index) => {
                const segmentAngle = 360 / validPlaces.length
                const startAngle = index * segmentAngle
                const endAngle = startAngle + segmentAngle
                const midAngle = startAngle + segmentAngle / 2
                
                // Calculate text position
                const textRadius = radius * 0.65
                const textPos = polarToCartesian(cx, cy, textRadius, midAngle)
                
                return (
                  <g key={index}>
                    {/* Segment */}
                    <path
                      d={describeArc(cx, cy, radius, startAngle, endAngle)}
                      fill={SEGMENT_COLORS[index % SEGMENT_COLORS.length]}
                      stroke="white"
                      strokeWidth="2"
                    />
                    {/* Text */}
                    <text
                      x={textPos.x}
                      y={textPos.y}
                      fill="white"
                      fontSize="11"
                      fontWeight="600"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{
                        textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                      }}
                      transform={`rotate(${midAngle}, ${textPos.x}, ${textPos.y})`}
                    >
                      {place.length > 10 ? place.slice(0, 10) + '…' : place}
                    </text>
                  </g>
                )
              })}
              
              {/* Center circle */}
              <circle
                cx={cx}
                cy={cy}
                r={25}
                fill="hsl(var(--card))"
                stroke="hsl(var(--border))"
                strokeWidth="3"
              />
              <text
                x={cx}
                y={cy}
                fontSize="20"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                🎯
              </text>
            </svg>
          </div>
        </div>
      )}

      {/* Winner Display */}
      {winner && !isSpinning && (
        <div className="mt-6 rounded-xl bg-primary/10 p-8 shadow-sm border border-primary/30 text-center animate-in fade-in zoom-in-95 duration-300">
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
