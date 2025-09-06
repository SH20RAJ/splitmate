'use client'
import { motion } from 'framer-motion'
import { ReactNode, ElementType } from 'react'

interface TextEffectProps {
  children: ReactNode
  className?: string
  preset?: string
  speedSegment?: number
  as?: ElementType
  per?: string
  delay?: number
}

export const TextEffect = ({ 
  children, 
  className, 
  preset, 
  speedSegment, 
  as: Component = 'div',
  per,
  delay = 0
}: TextEffectProps) => {
  const MotionComponent = motion(Component)
  
  return (
    <MotionComponent
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ 
        duration: speedSegment || 0.6, 
        ease: 'easeOut',
        delay
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  )
}