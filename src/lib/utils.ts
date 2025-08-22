import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { NebulaLanguageStats, PROGRAMMING_LANGUAGE_COLORS } from "@/types";

// Tailwind className merger
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// GitHub Username/URL Validator ve Parser
export function parseSpacePilotInput(input: string): string | null {
  if (!input || typeof input !== 'string') return null;
  
  const trimmed = input.trim();
  if (!trimmed) return null;

  // GitHub URL pattern'leri
  const githubUrlPatterns = [
    /^https?:\/\/github\.com\/([a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38})(?:\/.*)?$/,
    /^github\.com\/([a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38})(?:\/.*)?$/,
  ];

  // URL'den username çıkar
  for (const pattern of githubUrlPatterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  // Direkt username check
  const usernamePattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
  if (usernamePattern.test(trimmed)) {
    return trimmed;
  }

  return null;
}

// Date formatting utilities
export function formatCosmicDate(date: string | Date): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const target = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
}

// Number formatting utilities
export function formatStarCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

export function formatByteSize(bytes: number): string {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

// Language statistics utilities
export function calculateNebulaLanguages(repositories: any[]): NebulaLanguageStats {
  const languageStats: NebulaLanguageStats = {};
  
  repositories.forEach(repo => {
    if (repo.language && repo.size > 0) {
      languageStats[repo.language] = (languageStats[repo.language] || 0) + repo.size;
    }
  });

  return languageStats;
}

export function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    'C#': '#239120',
    Go: '#00ADD8',
    Rust: '#dea584',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Swift: '#fa7343',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Vue: '#4FC08D',
    React: '#61DAFB',
    HTML: '#e34c26',
    CSS: '#1572B6',
    SCSS: '#c6538c',
    Shell: '#89e051',
    Dockerfile: '#384d54',
    'Jupyter Notebook': '#DA5B0B',
  };

  return colors[language] || 'hsl(var(--cosmic-purple))';
}

// Contribution level utilities
export function getContributionLevel(totalContributions: number): {
  level: 'rookie' | 'explorer' | 'voyager' | 'commander' | 'legend';
  title: string;
  description: string;
  color: string;
  nextLevel?: { level: string; required: number };
} {
  if (totalContributions >= 1000) {
    return {
      level: 'legend',
      title: 'Cosmic Legend',
      description: 'Master of the digital universe',
      color: 'hsl(var(--star-gold))',
    };
  }
  
  if (totalContributions >= 500) {
    return {
      level: 'commander',
      title: 'Space Commander',
      description: 'Leading expeditions across the codebase',
      color: 'hsl(var(--galaxy-pink))',
      nextLevel: { level: 'Legend', required: 1000 - totalContributions },
    };
  }
  
  if (totalContributions >= 200) {
    return {
      level: 'voyager',
      title: 'Code Voyager',
      description: 'Exploring distant repositories',
      color: 'hsl(var(--nebula-purple))',
      nextLevel: { level: 'Commander', required: 500 - totalContributions },
    };
  }
  
  if (totalContributions >= 50) {
    return {
      level: 'explorer',
      title: 'Digital Explorer',
      description: 'Discovering new coding territories',
      color: 'hsl(var(--cosmic-blue))',
      nextLevel: { level: 'Voyager', required: 200 - totalContributions },
    };
  }
  
  return {
    level: 'rookie',
    title: 'Space Rookie',
    description: 'Beginning the coding journey',
    color: 'hsl(var(--muted-foreground))',
    nextLevel: { level: 'Explorer', required: 50 - totalContributions },
  };
}

// Repository sorting and filtering utilities
export function sortRepositories(
  repositories: any[],
  sortBy: 'updated' | 'created' | 'pushed' | 'full_name' | 'stars',
  direction: 'asc' | 'desc' = 'desc'
) {
  return [...repositories].sort((a, b) => {
    let aValue: any, bValue: any;

    switch (sortBy) {
      case 'updated':
        aValue = new Date(a.updated_at);
        bValue = new Date(b.updated_at);
        break;
      case 'created':
        aValue = new Date(a.created_at);
        bValue = new Date(b.created_at);
        break;
      case 'pushed':
        aValue = new Date(a.pushed_at);
        bValue = new Date(b.pushed_at);
        break;
      case 'stars':
        aValue = a.stargazers_count;
        bValue = b.stargazers_count;
        break;
      case 'full_name':
        aValue = a.full_name.toLowerCase();
        bValue = b.full_name.toLowerCase();
        break;
      default:
        return 0;
    }

    if (direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
}

// URL utilities
export function isValidGitHubUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname === 'github.com';
  } catch {
    return false;
  }
}

export function createGitHubUrl(username: string, path: string = ''): string {
  return `https://github.com/${username}${path}`;
}

// Error utilities
export function getRadarErrorMessage(error: any): string {
  if (error?.response?.status === 404) {
    return 'Space pilot not found in the GitHub galaxy! 🚀';
  }
  if (error?.response?.status === 403) {
    return 'GitHub API rate limit exceeded. Please try again later. ⏰';
  }
  if (error?.response?.status >= 500) {
    return 'GitHub servers are experiencing issues. Please try again. 🛸';
  }
  if (error?.message?.includes('Network Error')) {
    return 'Network connection lost. Check your internet connection. 📡';
  }
  
  return error?.message || 'An unknown error occurred during radar scan. 🌌';
}

// Animation utilities
export function getRandomFloatDelay(): number {
  return Math.random() * 2; // 0-2 seconds random delay
}

export function getRandomTwinkleDelay(): number {
  return Math.random() * 4; // 0-4 seconds random delay
}

// Local storage utilities
export function saveToRadarStorage(key: string, data: any): void {
  try {
    localStorage.setItem(`repo-radar-${key}`, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save to radar storage:', error);
  }
}

export function loadFromRadarStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(`repo-radar-${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn('Failed to load from radar storage:', error);
    return defaultValue;
  }
}

export function removeFromRadarStorage(key: string): void {
  try {
    localStorage.removeItem(`repo-radar-${key}`);
  } catch (error) {
    console.warn('Failed to remove from radar storage:', error);
  }
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}