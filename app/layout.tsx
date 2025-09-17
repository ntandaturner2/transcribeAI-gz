import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "TranscribeAI - Premium Audio Transcription",
  description:
    "Transform your audio into accurate text with our AI-powered transcription service. Fast, secure, and professional-grade results.",
  generator: "v0.app",
  keywords: ["audio transcription", "AI transcription", "speech to text", "voice to text", "transcription service"],
  authors: [{ name: "TranscribeAI Team" }],
  openGraph: {
    title: "TranscribeAI - Premium Audio Transcription",
    description: "Transform your audio into accurate text with our AI-powered transcription service",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
