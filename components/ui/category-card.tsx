"use client"

import { GradientCard } from "@/components/ui/gradient-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type React from "react"

interface CategoryCardProps {
  title: string
  description: string
  href: string
  icon?: React.ReactNode
  count?: string
  gradient?: string
}

export const CategoryCard = ({
  title,
  description,
  href,
  icon,
  count,
  gradient = "from-purple-900 via-blue-900 to-indigo-900",
}: CategoryCardProps) => {
  return (
    <Link href={href} className="block group cursor-pointer">
      <GradientCard className={`bg-gradient-to-br ${gradient}`}>
        <div className="flex flex-col h-full justify-between text-white p-6">
          {/* Icon and count */}
          <div className="flex items-start justify-between">
            {icon && (
              <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-colors">
                {icon}
              </div>
            )}
            {count && (
              <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium">
                {count}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-end">
            <h2 className="text-2xl font-bold mb-3 group-hover:text-purple-200 transition-colors">{title}</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">{description}</p>

            {/* CTA Button */}
            <Button
              variant="ghost"
              className="w-fit p-0 h-auto text-blue-400 hover:text-blue-300 hover:bg-transparent group/btn"
            >
              <span className="mr-2">Explore</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </div>
      </GradientCard>
    </Link>
  )
}
