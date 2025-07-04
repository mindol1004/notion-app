import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/providers/providers'

export const metadata: Metadata = {
  title: 'Minimal - Notion',
  description: 'Your personal workspace for notes and documents',
  generator: 'mindol',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
