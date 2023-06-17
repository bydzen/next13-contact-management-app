import "@/styles/globals.css"
import { Metadata } from "next"

import { ComponentWithChildren } from "@/types/props"
import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { TailwindIndicator } from "@/components/tailwind-indicator"

import Providers from "./providers"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({ children }: ComponentWithChildren) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen w-full bg-zinc-100 font-sans antialiased py-10",
            fontSans.variable
          )}
        >
          <Providers>
            <Header />
            <div className="container">{children}</div>
            <TailwindIndicator />
          </Providers>
        </body>
      </html>
    </>
  )
}
