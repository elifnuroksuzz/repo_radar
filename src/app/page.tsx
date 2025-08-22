"use client"

import { useState } from 'react';
import { PilotSearchForm } from '@/components/radar/pilot-search-form';
import { PilotProfile } from '@/components/radar/pilot-profile';
import { RepositoryFilters } from '@/components/radar/repository-filters';
import { RepositoryList } from '@/components/radar/repository-list';
import { LanguageChart } from '@/components/radar/language-chart';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRadarStore } from '@/stores/radar-store';
import { 
  Telescope, 
  GitBranch, 
  Star, 
  Users, 
  Activity,
  Zap,
  Shield,
  Sparkles
} from 'lucide-react';
import { useCosmicAnimation, useStaggeredAnimation } from '@/hooks/use-cosmic-animation';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const { currentPilot } = useRadarStore();
  const { ref: heroRef, isVisible: heroVisible } = useCosmicAnimation<HTMLDivElement>();
  const { ref: featuresRef, isVisible: featuresVisible } = useCosmicAnimation<HTMLDivElement>();
  const { visibleItems } = useStaggeredAnimation(6, 0.1);

  const features = [
    {
      icon: Telescope,
      title: "Deep Space Analysis",
      description: "Comprehensive GitHub profile scanning with advanced repository analytics",
      color: "cosmic"
    },
    {
      icon: GitBranch,
      title: "Repository Explorer",
      description: "Navigate through cosmic repositories with intelligent filtering and sorting",
      color: "nebula"
    },
    {
      icon: Star,
      title: "Star Tracker",
      description: "Monitor repository stars, forks, and community engagement metrics",
      color: "star"
    },
    {
      icon: Users,
      title: "Developer Network",
      description: "Explore connections between developers and their collaborative projects",
      color: "cosmic"
    },
    {
      icon: Activity,
      title: "Activity Radar",
      description: "Real-time tracking of commits, issues, and development activity",
      color: "nebula"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with intelligent caching and data processing",
      color: "star"
    }
  ];

  const stats = [
    { label: "Galaxies Scanned", value: "1M+", icon: Telescope },
    { label: "Repositories Mapped", value: "50M+", icon: GitBranch },
    { label: "Stars Tracked", value: "100M+", icon: Star },
    { label: "Developers Connected", value: "2M+", icon: Users },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div 
          ref={heroRef}
          className={cn(
            "container mx-auto text-center space-y-8 transition-all duration-1000",
            heroVisible ? "animate-fade-in" : "opacity-0 translate-y-10"
          )}
        >
          {/* Hero Content */}
          <div className="space-y-6 mb-12">
            <div className="flex justify-center mb-6">
              <Badge variant="cosmic" className="px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Explore the Digital Galaxy
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-cosmic-gradient bg-clip-text text-transparent">
                Repo
              </span>
              <span className="bg-nebula-gradient bg-clip-text text-transparent">
                Radar
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Navigate the infinite expanse of GitHub repositories. 
              Discover stellar projects, analyze cosmic code patterns, 
              and explore the developer universe like never before.
            </p>
          </div>

          {/* Search Form */}
          <PilotSearchForm />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {stats.map((stat, index) => (
              <Card 
                key={stat.label}
                className={cn(
                  "space-card text-center transition-all duration-500",
                  visibleItems.includes(index) ? "animate-slide-up" : "opacity-0 translate-y-4"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-cosmic" />
                  <div className="text-2xl font-bold bg-cosmic-gradient bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Results Section */}
      {currentPilot && (
        <section className="py-12 px-4">
          <div className="container mx-auto space-y-8">
            {/* Pilot Profile */}
            <PilotProfile />
            
            {/* Dashboard Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Repository Filters & List */}
              <div className="lg:col-span-2 space-y-6">
                <RepositoryFilters />
                <RepositoryList />
              </div>
              
              {/* Right Column - Charts & Stats */}
              <div className="space-y-6">
                <LanguageChart />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className={cn(
        "py-20 px-4 bg-gradient-to-b from-transparent to-background/50",
        currentPilot && "hidden"
      )}>
        <div 
          ref={featuresRef}
          className={cn(
            "container mx-auto transition-all duration-1000",
            featuresVisible ? "animate-fade-in" : "opacity-0 translate-y-10"
          )}
        >
          <div className="text-center mb-16">
            <Badge variant="space" className="mb-4">
              <Shield className="w-4 h-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Advanced GitHub{" "}
              <span className="bg-cosmic-gradient bg-clip-text text-transparent">
                Intelligence
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Harness the power of advanced analytics to understand 
              developer activity, project insights, and code universe patterns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className={cn(
                  "space-card group hover:cosmic-glow transition-all duration-500 cursor-pointer",
                  visibleItems.includes(index) ? "animate-slide-up" : "opacity-0 translate-y-4"
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={cn(
                      "p-3 rounded-lg mr-4 transition-all duration-300 group-hover:scale-110",
                      feature.color === "cosmic" && "bg-cosmic/20 text-cosmic",
                      feature.color === "nebula" && "bg-nebula-purple/20 text-nebula-purple",
                      feature.color === "star" && "bg-star-gold/20 text-star-gold"
                    )}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-cosmic transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={cn(
        "py-20 px-4",
        currentPilot && "hidden"
      )}>
        <div className="container mx-auto text-center">
          <Card className="space-card cosmic-glow max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to explore the{" "}
                <span className="bg-star-gradient bg-clip-text text-transparent">
                  Code Galaxy
                </span>
                ?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of developers who use RepoRadar to discover, 
                analyze, and connect with amazing projects across the GitHub universe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge variant="cosmic" className="px-6 py-3 text-base">
                  <Telescope className="w-5 h-5 mr-2" />
                  Start Exploring
                </Badge>
                <Badge variant="space" className="px-6 py-3 text-base">
                  <GitBranch className="w-5 h-5 mr-2" />
                  Learn More
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}