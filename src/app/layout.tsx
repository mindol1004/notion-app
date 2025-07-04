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
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          id="theme-setter"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme-storage');
                  const parsedTheme = theme ? JSON.parse(theme).state.theme : 'system';
                  
                  let isDark = false;
                  if (parsedTheme === 'dark') {
                    isDark = true;
                  } else if (parsedTheme === 'light') {
                    isDark = false;
                  } else { // system
                    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  }

                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error("Failed to set theme:", e);
                }
              })();
            `,
          }}
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
