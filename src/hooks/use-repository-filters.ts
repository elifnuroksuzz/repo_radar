import { useCallback, useMemo } from 'react';
import { useRadarStore } from '@/stores/radar-store';
import { debounce } from '@/lib/utils';
import type { CosmicRepository, RepositoryFilters } from '@/types';

interface UseRepositoryFiltersReturn {
  filters: RepositoryFilters;
  filteredRepositories: CosmicRepository[];
  totalRepositories: number;
  availableLanguages: string[];
  updateFilter: (key: keyof RepositoryFilters, value: any) => void;
  resetFilters: () => void;
  debouncedSearch: (search: string) => void;
}

export function useRepositoryFilters(): UseRepositoryFiltersReturn {
  const {
    spaceRepositories,
    repositoryFilters,
    setRepositoryFilters,
    getFilteredRepositories,
  } = useRadarStore();

  // Get available languages from repositories
  const availableLanguages = useMemo(() => {
    const languages = new Set<string>();
    spaceRepositories.forEach(repo => {
      if (repo.language) {
        languages.add(repo.language);
      }
    });
    return Array.from(languages).sort();
  }, [spaceRepositories]);

  // Get filtered repositories
  const filteredRepositories = useMemo(() => {
    return getFilteredRepositories();
  }, [getFilteredRepositories, repositoryFilters, spaceRepositories]);

  // Update a specific filter
  const updateFilter = useCallback((key: keyof RepositoryFilters, value: any) => {
    setRepositoryFilters({ [key]: value });
  }, [setRepositoryFilters]);

  // Reset all filters to default
  const resetFilters = useCallback(() => {
    setRepositoryFilters({
      sortBy: 'updated',
      direction: 'desc',
      type: 'all',
      language: undefined,
      search: undefined,
    });
  }, [setRepositoryFilters]);

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((search: string) => {
      updateFilter('search', search || undefined);
    }, 300),
    [updateFilter]
  );

  return {
    filters: repositoryFilters,
    filteredRepositories,
    totalRepositories: spaceRepositories.length,
    availableLanguages,
    updateFilter,
    resetFilters,
    debouncedSearch,
  };
}