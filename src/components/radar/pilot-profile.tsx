"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Building, 
  Link as LinkIcon, 
  Mail, 
  Calendar,
  Users,
  GitFork,
  Star,
  BookOpen,
  Trophy,
  Zap,
  ExternalLink
} from 'lucide-react';
import { useRadarStore } from '@/stores/radar-store';
import { useCosmicAnimation } from '@/hooks/use-cosmic-animation';
import { formatCosmicDate, formatRelativeTime, getContributionLevel } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { SpaceUser } from '@/types';

export function PilotProfile() {
  const { currentPilot, orbitStats } = useRadarStore();
  const { ref, isVisible } = useCosmicAnimation<HTMLDivElement>();

  if (!currentPilot) return null;

  const contributionInfo = orbitStats ? getContributionLevel(orbitStats.totalCommits) : null;

  return (
    <div 
      ref={ref}
      className={cn(
        "transition-all duration-700",
        isVisible ? "animate-fade-in" : "opacity-0 translate-y-10"
      )}
    >
      <Card className="space-card cosmic-glow">
        <CardHeader className="pb-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-cosmic/30 ring-offset-4 ring-offset-background">
                <img 
                  src={currentPilot.avatar_url} 
                  alt={currentPilot.login}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLDivElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div 
                  className="absolute inset-0 bg-cosmic-gradient text-white text-2xl font-bold hidden items-center justify-center"
                >
                  {currentPilot.login.slice(0, 2).toUpperCase()}
                </div>
              </div>
              
              {contributionInfo && (
                <Badge 
                  variant="cosmic" 
                  className="mt-3 px-3 py-1"
                  style={{ backgroundColor: contributionInfo.color }}
                >
                  <Trophy className="w-3 h-3 mr-1" />
                  {contributionInfo.title}
                </Badge>
              )}
            </div>

            {/* Main Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-4">
                <CardTitle className="text-3xl mb-2">
                  {currentPilot.name || currentPilot.login}
                </CardTitle>
                <CardDescription className="text-lg">
                  @{currentPilot.login}
                </CardDescription>
                {currentPilot.bio && (
                  <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                    {currentPilot.bio}
                  </p>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 rounded-lg bg-card/50 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-cosmic">
                    {currentPilot.public_repos}
                  </div>
                  <div className="text-sm text-muted-foreground">Repositories</div>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-card/50 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-nebula-purple">
                    {currentPilot.followers}
                  </div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-card/50 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-star-gold">
                    {currentPilot.following}
                  </div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-card/50 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-galaxy-pink">
                    {orbitStats?.totalStars || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Stars</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button variant="cosmic" asChild>
                  <a 
                    href={currentPilot.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on GitHub
                  </a>
                </Button>
                
                {currentPilot.blog && (
                  <Button variant="outline" asChild>
                    <a 
                      href={currentPilot.blog.startsWith('http') ? currentPilot.blog : `https://${currentPilot.blog}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Details */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-cosmic" />
                Pilot Details
              </h4>
              
              <div className="space-y-3">
                {currentPilot.company && (
                  <div className="flex items-center gap-3 text-sm">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span>{currentPilot.company}</span>
                  </div>
                )}
                
                {currentPilot.location && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{currentPilot.location}</span>
                  </div>
                )}
                
                {currentPilot.email && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{currentPilot.email}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>
                    Joined {formatCosmicDate(currentPilot.created_at)}
                    <span className="text-muted-foreground ml-1">
                      ({formatRelativeTime(currentPilot.created_at)})
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Orbit Statistics */}
            {orbitStats && (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-star-gold" />
                  Orbit Statistics
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Total Repositories</span>
                    </div>
                    <Badge variant="space">{orbitStats.totalRepos}</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Total Stars</span>
                    </div>
                    <Badge variant="star">{orbitStats.totalStars}</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <GitFork className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Total Forks</span>
                    </div>
                    <Badge variant="nebula">{orbitStats.totalForks}</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Estimated Commits</span>
                    </div>
                    <Badge variant="cosmic">{orbitStats.totalCommits}</Badge>
                  </div>

                  {contributionInfo?.nextLevel && (
                    <div className="mt-4 p-3 rounded-lg bg-cosmic/10 border border-cosmic/20">
                      <div className="text-sm text-muted-foreground mb-1">
                        Next Level: {contributionInfo.nextLevel.level}
                      </div>
                      <div className="text-xs text-cosmic">
                        {contributionInfo.nextLevel.required} more contributions needed
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Account Type & Verification */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap gap-2">
              <Badge variant={currentPilot.type === 'User' ? 'cosmic' : 'star'}>
                {currentPilot.type}
              </Badge>
              
              {currentPilot.site_admin && (
                <Badge variant="destructive">
                  Site Admin
                </Badge>
              )}
              
              {currentPilot.hireable && (
                <Badge variant="nebula">
                  Available for Hire
                </Badge>
              )}

              {orbitStats && (
                <Badge 
                  variant="space"
                  style={{ backgroundColor: contributionInfo?.color }}
                >
                  {contributionInfo?.level.toUpperCase()} Level
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}