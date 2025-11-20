'use client'
import React, { useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

export interface InfiniteSliderProps {
  children: React.ReactNode
  speed?: number
  speedOnHover?: number
  gap?: number
  direction?: 'left' | 'right'
  className?: string
}

export const InfiniteSlider = ({
  children,
  speed = 50,
  speedOnHover = 20,
  gap = 0,
  direction = 'left',
  className = '',
}: InfiniteSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()
  const isHovered = useRef(false)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const content = slider.children[0] as HTMLElement
    if (!content) return

    const contentWidth = content.scrollWidth

    const totalDistance = contentWidth + gap
    const duration = totalDistance / (speed / 100)

    const animate = () => {
      if (isHovered.current) {
        controls.stop()
        return
      }

      controls.start({
        x: direction === 'left' ? -totalDistance : totalDistance,
        transition: {
          duration,
          ease: 'linear',
          repeat: Infinity,
        },
      })
    }

    animate()

    const handleMouseEnter = () => {
      isHovered.current = true
      controls.stop()
    }

    const handleMouseLeave = () => {
      isHovered.current = false
      animate()
    }

    slider.addEventListener('mouseenter', handleMouseEnter)
    slider.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      slider.removeEventListener('mouseenter', handleMouseEnter)
      slider.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [speed, speedOnHover, gap, direction, controls])

  return (
    <div ref={sliderRef} className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex"
        style={{ gap: `${gap}px` }}
        animate={controls}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}
