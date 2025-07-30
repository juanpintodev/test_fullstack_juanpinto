export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Task List App</title>
        <meta name="description" content="Task List Application with Authentication" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
