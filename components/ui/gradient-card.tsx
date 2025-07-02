"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type React from "react"

interface GradientCardProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

export const GradientCard = ({ children, className, containerClassName }: GradientCardProps) => {
  return (
    <div className={cn("group relative", containerClassName)}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative h-96 w-full overflow-hidden rounded-xl bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-[1px]",
          className,
        )}
      >
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-75 blur-sm transition-opacity duration-300 group-hover:opacity-100" />

        {/* Inner card */}
        <div className="relative h-full w-full rounded-xl bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6">
          {/* Animated background elements */}
          <div className="absolute inset-0 rounded-xl">
            <div className="absolute top-0 left-0 h-32 w-32 rounded-full bg-purple-500/20 blur-xl transition-transform duration-700 group-hover:scale-150" />
            <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-blue-500/20 blur-xl transition-transform duration-700 group-hover:scale-125" />
            <div className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-xl transition-transform duration-700 group-hover:scale-200" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full">{children}</div>
        </div>
      </motion.div>
    </div>
  )
}
