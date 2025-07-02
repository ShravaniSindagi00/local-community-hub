"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "kn"

interface Translations {
  nav: {
    home: string
    about: string
    explore: string
    signIn: string
    signUp: string
  }
  explore: {
    title: string
    searchPlaceholder: string
    filters: {
      all: string
      temples: string
      hotels: string
      events: string
    }
  }
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      explore: "Explore Now",
      signIn: "Sign In",
      signUp: "Sign Up",
    },
    explore: {
      title: "Explore Hubballi-Dharwad",
      searchPlaceholder: "Search by name or area...",
      filters: {
        all: "All",
        temples: "Temples",
        hotels: "Hotels",
        events: "Events",
      },
    },
  },
  kn: {
    nav: {
      home: "ಮುಖ್ಯ",
      about: "ನಮ್ಮ ಬಗ್ಗೆ",
      explore: "ಅನ್ವೇಷಿಸಿ",
      signIn: "ಸೈನ್ ಇನ್",
      signUp: "ಸೈನ್ ಅಪ್",
    },
    explore: {
      title: "ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ ಅನ್ವೇಷಿಸಿ",
      searchPlaceholder: "ಹೆಸರು ಅಥವಾ ಪ್ರದೇಶದಿಂದ ಹುಡುಕಿ...",
      filters: {
        all: "ಎಲ್ಲಾ",
        temples: "ದೇವಸ್ಥಾನಗಳು",
        hotels: "ಹೋಟೆಲ್‌ಗಳು",
        events: "ಕಾರ್ಯಕ್ರಮಗಳು",
      },
    },
  },
}

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  translations: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "kn" : "en"))
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        translations: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
