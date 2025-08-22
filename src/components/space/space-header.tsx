"use client"

import { Button } from '@/components/ui/button';
import { useSpaceTheme } from '@/hooks/use-space-theme';
import { Moon, Sun, Radar, Github } from 'lucide-react';

export function SpaceHeader() {
  const { isDarkGalaxy, toggleGalaxyMode, mounted } = useSpaceTheme();

  if (!mounted) {
    return (
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            <div className="w-24 h-6 bg-muted rounded animate-pulse" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-muted animate-pulse" />
            <div className="w-8 h-8 rounded bg-muted animate-pulse" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Radar className="w-8 h-8 text-cosmic animate-spin-slow" />
            <div className="absolute inset-0 w-8 h-8 rounded-full bg-cosmic/20 blur-sm animate-pulse" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold bg-cosmic-gradient bg-clip-text text-transparent">
              RepoRadar
            </h1>
            <span className="text-xs text-muted-foreground -mt-1">
              GitHub Explorer
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-cosmic transition-colors"
          >
            Explore
          </a>
          <a 
            href="#features" 
            className="text-sm text-muted-foreground hover:text-cosmic transition-colors"
          >
            Features
          </a>
          <a 
            href="#about" 
            className="text-sm text-muted-foreground hover:text-cosmic transition-colors"
          >
            About
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* GitHub Link */}
          <Button variant="ghost" size="icon" asChild>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleGalaxyMode}
            aria-label={isDarkGalaxy ? "Switch to light galaxy" : "Switch to dark galaxy"}
          >
            {isDarkGalaxy ? (
              <Sun className="w-4 h-4 text-star-gold" />
            ) : (
              <Moon className="w-4 h-4 text-cosmic" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}