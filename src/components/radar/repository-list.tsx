"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  GitFork, 
  ExternalLink, 
  Eye,
  Lock,
  Unlock,
  Calendar,
  Activity,
  BookOpen,
  Archive,
  AlertTriangle
} from 'lucide-react';
import { useRepositoryFilters } from '@/hooks/use-repository-filters';
import { useStaggeredAnimation } from '@/hooks/use-cosmic-animation';
import { formatRelativeTime, formatStarCount, getLanguageColor } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { CosmicRepository } from '@/types';

interface RepositoryCardProps {
  repository: CosmicRepository;
  index: number;
  isVisible: boolean;
}

function RepositoryCard({ repository, index, isVisible }: RepositoryCardProps) {
  const languageColor = repository.language ? getLanguageColor(repository.language) : undefined;

  return (
    <Card 
      className={cn(
        "space-card group hover:cosmic-glow transition-all duration-500 cursor-pointer",
        isVisible ? "animate-slide-up" : "opacity-0 translate-y-4"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg mb-1 group-hover:text-cosmic transition-colors">
              <a 
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                {repository.private ? (
                  <Lock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                ) : (
                  <Unlock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
                <span className="truncate">{repository.name}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </a>
            </CardTitle>
            
            {repository.description && (
              <CardDescription className="line-clamp-2 text-sm">
                {repository.description}
              </CardDescription>
            )}
          </div>
          
          {repository.fork && (
            <Badge variant="outline" className="ml-3 flex-shrink-0">
              <GitFork className="w-3 h-3 mr-1" />
              Fork
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Repository Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {repository.language && (
            <div className="flex items-center gap-1">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: languageColor }}
              />
              <span>{repository.language}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            <span>{formatStarCount(repository.stargazers_count)}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <GitFork className="w-3 h-3" />
            <span>{formatStarCount(repository.forks)}</span>
          </div>
          
          {repository.open_issues_count > 0 && (
            <div className="flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              <span>{repository.open_issues_count}</span>
            </div>
          )}
        </div>

        {/* Topics */}
        {repository.topics && repository.topics.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {repository.topics.slice(0, 5).map((topic) => (
              <Badge 
                key={topic} 
                variant="space" 
                className="text-xs px-2 py-0.5"
              >
                {topic}
              </Badge>
            ))}
            {repository.topics.length > 5 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                +{repository.topics.length - 5} more
              </Badge>
            )}
          </div>
        )}

        {/* Repository Metadata */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3" />
              <span>Updated {formatRelativeTime(repository.updated_at)}</span>
            </div>
            
            {repository.license && (
              <div className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                <span>{repository.license.name}</span>
              </div>
            )}
          </div>

          {/* Status Indicators */}
          <div className="flex items-center gap-1">
            {repository.archived && (
              <Badge variant="outline" className="text-xs">
                <Archive className="w-3 h-3 mr-1" />
                Archived
              </Badge>
            )}
            
            {repository.disabled && (
              <Badge variant="destructive" className="text-xs">
                Disabled
              </Badge>
            )}
            
            {repository.is_template && (
              <Badge variant="star" className="text-xs">
                Template
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function RepositoryList() {
  const { filteredRepositories } = useRepositoryFilters();
  const { visibleItems } = useStaggeredAnimation(filteredRepositories.length, 0.05);

  if (filteredRepositories.length === 0) {
    return (
      <Card className="space-card text-center py-12">
        <CardContent>
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <CardTitle className="mb-2">No repositories found</CardTitle>
          <CardDescription>
            Try adjusting your filters or search criteria to find repositories.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Repository Count */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Cosmic Repositories 
          <Badge variant="cosmic" className="ml-2">
            {filteredRepositories.length}
          </Badge>
        </h3>
      </div>

      {/* Repository Grid */}
      <div className="grid gap-4">
        {filteredRepositories.map((repository, index) => (
          <RepositoryCard
            key={repository.id}
            repository={repository}
            index={index}
            isVisible={visibleItems.includes(index)}
          />
        ))}
      </div>

      {/* Load More (if needed) */}
      {filteredRepositories.length > 20 && (
        <div className="text-center pt-8">
          <Button variant="outline" className="cosmic-glow">
            <Eye className="w-4 h-4 mr-2" />
            View All Repositories
          </Button>
        </div>
      )}
    </div>
  );
}