import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import { Providers } from '@/app/providers'
import { Header } from '@/components/header'
import './globals.css'

const nunito = Nunito({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'Video feed',
  description: 'Continuous Video Feed',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${nunito.variable} antialiased`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
