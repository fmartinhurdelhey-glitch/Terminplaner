'use client'
import React from 'react'
import { motion } from 'framer-motion'

export interface ProgressiveBlurProps {
  className?: string
  direction?: 'left' | 'right' | 'top' | 'bottom'
  blurIntensity?: number
}

export const ProgressiveBlur = ({
  className = '',
  direction = 'left',
  blurIntensity = 1,
}: ProgressiveBlurProps) => {
  const getGradientDirection = () => {
    switch (direction) {
      case 'left':
        return 'to right'
      case 'right':
        return 'to left'
      case 'top':
        return 'to bottom'
      case 'bottom':
        return 'to top'
      default:
        return 'to right'
    }
  }

  const getGradientColors = () => {
    return `rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.8) 80%, rgba(255, 255, 255, 1) 100%`
  }

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      style={{
        background: `linear-gradient(${getGradientDirection()}, ${getGradientColors()})`,
        backdropFilter: `blur(${blurIntensity}px)`,
        WebkitBackdropFilter: `blur(${blurIntensity}px)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  )
}
