import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mahakal Tandav ? Ultra-realistic 8K Video Prompt Builder',
  description:
    'Generate a cinematic, production-ready prompt for Lord Shiva in Mahakal form performing the divine Tandav. Copy, tweak, and export to popular video models.',
  metadataBase: new URL('https://agentic-40663436.vercel.app'),
  openGraph: {
    title: 'Mahakal Tandav ? 8K Prompt Builder',
    description:
      'Cinematic, spiritually electrifying prompt for Mahakal?s Tandav amid cosmic forces.',
    type: 'website',
    url: 'https://agentic-40663436.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahakal Tandav ? 8K Prompt Builder',
    description:
      'Compose an ultra-realistic cinematic video prompt for Lord Shiva (Mahakal).',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-100 antialiased">
        <div className="mx-auto max-w-5xl px-4 py-10">
          {children}
        </div>
      </body>
    </html>
  )
}
