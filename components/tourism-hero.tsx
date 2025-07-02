"use client"

import { motion } from "framer-motion"
import { MapPin, ArrowRight } from "lucide-react"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { BackgroundCircles } from "@/components/ui/background-circles"

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export function TourismHero() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      {/* Background Circles Component */}
      <BackgroundCircles
        title="Discover Local Heritage"
        description="Explore ancient temples, traditional hotels, and vibrant local events in the twin cities of Hubballi-Dharwad"
        variant="primary"
        className="h-screen"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <MapPin className="h-8 w-8 text-emerald-500 mr-2" />
              <span className="text-lg font-medium text-slate-700 dark:text-slate-300">Hubballi-Dharwad</span>
            </div>

            <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                  Discover Local
                </span>
                <br />
                <span
                  className={cn(
                    "bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-white/90 to-blue-300",
                  )}
                >
                  Heritage
                </span>
              </h1>
            </motion.div>

            <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
              <p className="text-base sm:text-lg md:text-xl text-white/40 mb-12 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
                Explore ancient temples, traditional hotels, and vibrant local events in the twin cities of
                Hubballi-Dharwad. Your gateway to Karnataka's rich cultural heritage.
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link href="/explore">
                <RainbowButton className="text-lg px-8 py-6 h-auto">
                  Explore Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </RainbowButton>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 h-auto bg-white/10 backdrop-blur-sm border-white/20 text-slate-900 dark:text-white hover:bg-white/20"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            <motion.div
              custom={4}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl font-bold text-emerald-500 mb-2">50+</div>
                <div className="text-slate-700 dark:text-slate-300">Ancient Temples</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl font-bold text-emerald-500 mb-2">100+</div>
                <div className="text-slate-700 dark:text-slate-300">Traditional Hotels</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl font-bold text-emerald-500 mb-2">25+</div>
                <div className="text-slate-700 dark:text-slate-300">Monthly Events</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  )
}
