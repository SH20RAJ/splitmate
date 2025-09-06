'use client';
import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

export type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
};

function AnimatedGroup({
  children,
  className,
  variants,
}: AnimatedGroupProps) {
  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={variants?.container}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { AnimatedGroup };