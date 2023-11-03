import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ApolloWrapper } from "./graphql/apolloWrapper";
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todolist',
  description: 'Todolist for Apolearn',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  )
}
