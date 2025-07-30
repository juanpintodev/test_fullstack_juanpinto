import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Task List App',
  description: 'Task List Application with Authentication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
