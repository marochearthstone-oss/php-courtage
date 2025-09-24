"use client"

import { useState, useEffect } from "react"

interface LexiqueTooltipProps {
  children: React.ReactNode
  definition: string
}

export default function LexiqueTooltip({ children, definition }: LexiqueTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPosition({
      top: rect.top - 10, // Position au-dessus du terme
      left: rect.left + rect.width / 2
    })
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    setShowTooltip(false)
  }

  return (
    <span
      className="lexique-term relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div
          className="absolute z-50 w-64 bg-gray-900 text-white text-sm rounded-lg p-3 shadow-lg tooltip-animated"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: 'translateX(-50%) translateY(-100%)'
          }}
        >
          <div className="relative">
            {definition}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </span>
  )
}