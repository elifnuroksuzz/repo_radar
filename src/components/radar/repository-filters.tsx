"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  GitFork,
  Star,
  Clock,
  Calendar,
  FileText,
  X,
  RefreshCw
} from 'lucide-react';
import { useRepositoryFilters } from '@/hooks/use-repository-filters';
import { cn } from '@/lib/utils';
import type { RepositorySortBy, RepositoryDirection, RepositoryType } from '@/types';

export function RepositoryFilters() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const {
    filters,
    filteredRepositories,
    totalRepositories,
    availableLanguages,
    updateFilter,
    resetFilters,
    debouncedSearch,
  } = useRepositoryFilters();

  const sortOptions: Array<{ value: RepositorySortBy; label: string; icon: any }> = [
    { value: 'updated', label: 'Last Updated', icon: Clock },
    { value: 'created', label: 'Created Date', icon: Calendar },
    { value: 'pushed', label: 'Last Push', icon: ArrowUpDown },
    { value: 'full_name', label: 'Name', icon: FileText },
  ];

  const typeOptions: Array<{ value: RepositoryType; label: string; description: string }> = [
    { value: 'all', label: 'All Repos', description: 'Show all repositories' },
    { value: 'owner', label: 'Original', description: 'Only original repositories' },
    { value: 'member', label: 'Forks', description: 'Only forked repositories' },
  ];

  return (
    <Card className="space-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Filter className="w-5 h-5 text-cosmic" />
            Repository Filters
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="cosmic" className="text-sm">
              {filteredRepositories.length} / {totalRepositories}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search repositories..."
            className="pl-10 pr-10"
            onChange={(e) => debouncedSearch(e.target.value)}
            defaultValue={filters.search || ''}
          />
          {filters.search && (
            <button
              onClick={() => updateFilter('search', undefined)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filters */}
        <div className="space-y-4">
          {/* Repository Type */}
          <div>
            <label className="text-sm font-medium mb-2 block">Repository Type</label>
            <div className="flex flex-wrap gap-2">
              {typeOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filters.type === option.value ? "cosmic" : "outline"}
                  size="sm"
                  onClick={() => updateFilter('type', option.value)}
                  className="text-xs"
                >
                  {option.value === 'owner' && <Star className="w-3 h-3 mr-1" />}
                  {option.value === 'member' && <GitFork className="w-3 h-3 mr-1" />}
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <label className="text-sm font-medium mb-2 block">Sort By</label>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filters.sortBy === option.value ? "cosmic" : "outline"}
                  size="sm"
                  onClick={() => updateFilter('sortBy', option.value)}
                  className="text-xs"
                >
                  <option.icon className="w-3 h-3 mr-1" />
                  {option.label}
                </Button>
              ))}
              
              {/* Direction Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateFilter('direction', filters.direction === 'asc' ? 'desc' : 'asc')}
                className="text-xs"
              >
                {filters.direction === 'asc' ? (
                  <ArrowUp className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDown className="w-3 h-3 mr-1" />
                )}
                {filters.direction === 'asc' ? 'Ascending' : 'Descending'}
              </Button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            {/* Language Filter */}
            {availableLanguages.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-2 block">Programming Language</label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  <Button
                    variant={!filters.language ? "cosmic" : "outline"}
                    size="sm"
                    onClick={() => updateFilter('language', undefined)}
                    className="text-xs"
                  >
                    All Languages
                  </Button>
                  {availableLanguages.map((language) => (
                    <Button
                      key={language}
                      variant={filters.language === language ? "cosmic" : "outline"}
                      size="sm"
                      onClick={() => updateFilter('language', language)}
                      className="text-xs"
                    >
                      {language}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Active Filters Summary */}
        {(filters.search || filters.language || filters.type !== 'all' || filters.sortBy !== 'updated') && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Active Filters</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Reset All
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <Badge variant="space" className="text-xs">
                  Search: "{filters.search}"
                  <button
                    onClick={() => updateFilter('search', undefined)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              
              {filters.language && (
                <Badge variant="space" className="text-xs">
                  Language: {filters.language}
                  <button
                    onClick={() => updateFilter('language', undefined)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              
              {filters.type !== 'all' && (
                <Badge variant="space" className="text-xs">
                  Type: {typeOptions.find(t => t.value === filters.type)?.label}
                  <button
                    onClick={() => updateFilter('type', 'all')}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              
              {filters.sortBy !== 'updated' && (
                <Badge variant="space" className="text-xs">
                  Sort: {sortOptions.find(s => s.value === filters.sortBy)?.label}
                  <button
                    onClick={() => updateFilter('sortBy', 'updated')}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}