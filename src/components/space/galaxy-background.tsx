"use client"

import { useEffect, useState } from 'react';
import { useSpaceTheme } from '@/hooks/use-space-theme';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
}

export function GalaxyBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [mounted, setMounted] = useState(false);
  const { isDarkGalaxy, mounted: themeMount } = useSpaceTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !themeMount) return;
    
    // Generate random stars
    const generateStars = () => {
      const starCount = isDarkGalaxy ? 150 : 80;
      const newStars: Star[] = [];

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          animationDelay: Math.random() * 4,
        });
      }

      setStars(newStars);
    };

    generateStars();
  }, [isDarkGalaxy, mounted, themeMount]);

  // Prevent hydration mismatch
  if (!mounted || !themeMount) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
      </div>
    );
  }

  if (!isDarkGalaxy) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Light mode - subtle space background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent" />
        
        {/* Light mode stars */}
        {stars.slice(0, 30).map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-cosmic/30 star-animation"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity * 0.5,
              animationDelay: `${star.animationDelay}s`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dark space background with gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-void-black via-space-gray to-void-black" />
      
      {/* Cosmic nebula effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cosmic/20 rounded-full blur-3xl animate-pulse-slow" />
      <div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-nebula-purple/20 rounded-full blur-3xl animate-pulse-slow" 
        style={{ animationDelay: '2s' }} 
      />
      <div 
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-star-gold/15 rounded-full blur-3xl animate-pulse-slow" 
        style={{ animationDelay: '4s' }} 
      />
      
      {/* Animated stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white star-animation"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.animationDelay}s`,
            boxShadow: star.size > 2 ? '0 0 6px rgba(255, 255, 255, 0.8)' : 'none',
          }}
        />
      ))}
      
      {/* Shooting stars */}
      <div className="shooting-star" />
      <div className="shooting-star" style={{ animationDelay: '3s', top: '20%' }} />
      <div className="shooting-star" style={{ animationDelay: '6s', top: '60%' }} />
    </div>
  );
}