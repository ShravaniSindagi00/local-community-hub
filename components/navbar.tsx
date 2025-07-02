"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, Globe, Heart, User, LogOut } from "lucide-react"
import { useLanguage } from "./language-provider"
import { useAuth } from "./auth-provider"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, toggleLanguage, translations } = useLanguage()
  const { user, logout } = useAuth()

  const pathname = usePathname()
  if (pathname.startsWith("/admin")) {
    return null // don't render navbar on any admin pages
  }

  const navItems = [
    { href: "/", label: translations.nav.home },
    { href: "/about", label: translations.nav.about },
    { href: "/explore", label: translations.nav.explore },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">HD</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">Hubballi-Dharwad Explore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="flex items-center space-x-1">
              <Globe className="h-4 w-4" />
              <span>{language === "en" ? "🇬🇧" : "🇮🇳"}</span>
              <span className="text-xs">{language === "en" ? "EN" : "ಕನ್ನಡ"}</span>
            </Button>

            <Link href="/history">
              <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span className="hidden lg:inline">Saved</span>
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{user.name.split(" ")[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/history" className="flex items-center">
                      <Heart className="mr-2 h-4 w-4" />
                      My Saved Places
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">
                    {translations.nav.signIn}
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">{translations.nav.signUp}</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <Link href="/history">
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="flex items-center space-x-1">
              <Globe className="h-4 w-4" />
              <span>{language === "en" ? "🇬🇧" : "🇮🇳"}</span>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/history"
                    className="text-lg font-medium transition-colors hover:text-primary flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    My Saved Places
                  </Link>
                  <div className="pt-4 border-t space-y-2">
                    {user ? (
                      <>
                        <div className="text-sm text-muted-foreground mb-2">Signed in as {user.name}</div>
                        {user.role === "admin" && (
                          <Link href="/admin" onClick={() => setIsOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start">
                              Admin Dashboard
                            </Button>
                          </Link>
                        )}
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-red-600"
                          onClick={() => {
                            logout()
                            setIsOpen(false)
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start">
                            {translations.nav.signIn}
                          </Button>
                        </Link>
                        <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                          <Button className="w-full">{translations.nav.signUp}</Button>
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
