import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"
import PrivyProviders from "@/components/privy-provider"
import { JotaiProvider } from "@/components/jotai-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "H2 Marketplace",
  description: "A modern marketplace for hydrogen trading and transportation",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrivyProviders>
          <JotaiProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </ThemeProvider>
          </JotaiProvider>
        </PrivyProviders>
      </body>
    </html>
  )
}
