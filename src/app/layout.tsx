import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpaceThemeProvider } from "@/components/providers/theme-provider";
import { GalaxyBackground } from "@/components/space/galaxy-background";
import { SpaceHeader } from "@/components/space/space-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RepoRadar - GitHub Explorer",
  description: "Explore GitHub profiles and repositories with cosmic style. Analyze coding statistics, contributions, and discover amazing projects in the digital galaxy.",
  keywords: ["GitHub", "Repository", "Profile", "Explorer", "Developer", "Open Source"],
  authors: [{ name: "RepoRadar Team" }],
  creator: "RepoRadar",
  publisher: "RepoRadar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://repo-radar.app",
    title: "RepoRadar - GitHub Explorer",
    description: "Explore GitHub profiles and repositories with cosmic style.",
    siteName: "RepoRadar",
  },
  twitter: {
    card: "summary_large_image",
    title: "RepoRadar - GitHub Explorer",
    description: "Explore GitHub profiles and repositories with cosmic style.",
    creator: "@reporadar",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SpaceThemeProvider>
          <div className="relative min-h-screen">
            {/* Galaxy Background */}
            <GalaxyBackground />
            
            {/* Header */}
            <SpaceHeader />
            
            {/* Main Content */}
            <main className="relative z-10">
              {children}
            </main>
            
            {/* Footer */}
            <footer className="relative z-10 border-t border-gray-200 dark:border-gray-800 bg-background/80 backdrop-blur-sm mt-auto">
              <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="text-center md:text-left">
                    <p className="text-sm text-muted-foreground">
                      Made with ❤️ for the developer community
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Exploring the digital galaxy, one repository at a time
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-cosmic transition-colors"
                    >
                      GitHub
                    </a>
                    <span className="text-muted-foreground">•</span>
                    <a 
                      href="#privacy" 
                      className="text-xs text-muted-foreground hover:text-cosmic transition-colors"
                    >
                      Privacy
                    </a>
                    <span className="text-muted-foreground">•</span>
                    <a 
                      href="#terms" 
                      className="text-xs text-muted-foreground hover:text-cosmic transition-colors"
                    >
                      Terms
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </SpaceThemeProvider>
      </body>
    </html>
  );
}