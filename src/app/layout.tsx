import './globals.css'
import type { Metadata } from 'next'
import { Hanken_Grotesk } from 'next/font/google'

const font = Hanken_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FocusAI',
  description:
    'Chatbot AI to help you focus, increase your productivity and achieve more in your everyday life.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
