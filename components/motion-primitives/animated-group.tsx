'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedGroupProps {
  children: ReactNode
  className?: string
  variants?: any
}

export const AnimatedGroup = ({ children, className, variants }: AnimatedGroupProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}