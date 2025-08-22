import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { 
  RadarProfile, 
  SpaceUser, 
  CosmicRepository, 
  NebulaLanguageStats,
  CosmicEvent,
  GalaxyContribution,
  OrbitStats,
  LoadingStates,
  RadarError,
  RepositoryFilters 
} from '@/types';

interface RadarState {
  // Core Data
  currentPilot: SpaceUser | null;
  spaceRepositories: CosmicRepository[];
  orbitStats: OrbitStats | null;
  recentTransmissions: CosmicEvent[];
  galaxyContributions: GalaxyContribution[];
  nebulaLanguages: NebulaLanguageStats;
  
  // UI State
  loadingStates: LoadingStates;
  lastScannedPilot: string | null;
  repositoryFilters: RepositoryFilters;
  selectedRepository: CosmicRepository | null;
  
  // Search History
  recentScans: string[];
  
  // Actions - Core
  setCurrentPilot: (pilot: SpaceUser | null) => void;
  setSpaceRepositories: (repos: CosmicRepository[]) => void;
  setOrbitStats: (stats: OrbitStats | null) => void;
  setRecentTransmissions: (events: CosmicEvent[]) => void;
  setGalaxyContributions: (contributions: GalaxyContribution[]) => void;
  setNebulaLanguages: (languages: NebulaLanguageStats) => void;
  
  // Actions - Loading States
  setScanning: (scanning: boolean) => void;
  setFetchingRepos: (fetching: boolean) => void;
  setFetchingStats: (fetching: boolean) => void;
  setFetchingActivity: (fetching: boolean) => void;
  setRadarError: (error: string | null) => void;
  
  // Actions - UI
  setLastScannedPilot: (username: string) => void;
  setRepositoryFilters: (filters: Partial<RepositoryFilters>) => void;
  setSelectedRepository: (repo: CosmicRepository | null) => void;
  
  // Actions - History
  addRecentScan: (username: string) => void;
  clearRecentScans: () => void;
  
  // Actions - Complex
  initiateScan: (username: string) => void;
  resetRadar: () => void;
  updateRadarProfile: (profile: Partial<RadarProfile>) => void;
  
  // Computed
  getFilteredRepositories: () => CosmicRepository[];
  getTotalStars: () => number;
  getTotalForks: () => number;
  getTopLanguages: (limit?: number) => Array<{ name: string; value: number; percentage: number }>;
  getContributionLevel: () => 'rookie' | 'explorer' | 'voyager' | 'commander' | 'legend';
}

const initialLoadingStates: LoadingStates = {
  isScanning: false,
  isFetchingRepos: false,
  isFetchingStats: false,
  isFetchingActivity: false,
  error: null,
};

const initialRepositoryFilters: RepositoryFilters = {
  sortBy: 'updated',
  direction: 'desc',
  type: 'all',
  language: undefined,
  search: undefined,
};

export const useRadarStore = create<RadarState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        currentPilot: null,
        spaceRepositories: [],
        orbitStats: null,
        recentTransmissions: [],
        galaxyContributions: [],
        nebulaLanguages: {},
        loadingStates: initialLoadingStates,
        lastScannedPilot: null,
        repositoryFilters: initialRepositoryFilters,
        selectedRepository: null,
        recentScans: [],

        // Core Actions
        setCurrentPilot: (pilot) => set({ currentPilot: pilot }),
        
        setSpaceRepositories: (repos) => set({ spaceRepositories: repos }),
        
        setOrbitStats: (stats) => set({ orbitStats: stats }),
        
        setRecentTransmissions: (events) => set({ recentTransmissions: events }),
        
        setGalaxyContributions: (contributions) => set({ galaxyContributions: contributions }),
        
        setNebulaLanguages: (languages) => set({ nebulaLanguages: languages }),

        // Loading State Actions
        setScanning: (scanning) => 
          set((state) => ({
            loadingStates: { ...state.loadingStates, isScanning: scanning }
          })),
        
        setFetchingRepos: (fetching) =>
          set((state) => ({
            loadingStates: { ...state.loadingStates, isFetchingRepos: fetching }
          })),
        
        setFetchingStats: (fetching) =>
          set((state) => ({
            loadingStates: { ...state.loadingStates, isFetchingStats: fetching }
          })),
        
        setFetchingActivity: (fetching) =>
          set((state) => ({
            loadingStates: { ...state.loadingStates, isFetchingActivity: fetching }
          })),
        
        setRadarError: (error) =>
          set((state) => ({
            loadingStates: { ...state.loadingStates, error }
          })),

        // UI Actions
        setLastScannedPilot: (username) => set({ lastScannedPilot: username }),
        
        setRepositoryFilters: (filters) =>
          set((state) => ({
            repositoryFilters: { ...state.repositoryFilters, ...filters }
          })),
        
        setSelectedRepository: (repo) => set({ selectedRepository: repo }),

        // History Actions
        addRecentScan: (username) =>
          set((state) => {
            const filtered = state.recentScans.filter(scan => scan !== username);
            return {
              recentScans: [username, ...filtered].slice(0, 10) // Son 10 arama
            };
          }),
        
        clearRecentScans: () => set({ recentScans: [] }),

        // Complex Actions
        initiateScan: (username) => {
          const { setScanning, addRecentScan, setLastScannedPilot, setRadarError } = get();
          
          setScanning(true);
          setRadarError(null);
          setLastScannedPilot(username);
          addRecentScan(username);
        },
        
        resetRadar: () => set({
          currentPilot: null,
          spaceRepositories: [],
          orbitStats: null,
          recentTransmissions: [],
          galaxyContributions: [],
          nebulaLanguages: {},
          loadingStates: initialLoadingStates,
          selectedRepository: null,
        }),
        
        updateRadarProfile: (profile) => {
          if (profile.user) get().setCurrentPilot(profile.user);
          if (profile.repositories) get().setSpaceRepositories(profile.repositories);
          if (profile.stats) get().setOrbitStats(profile.stats);
          if (profile.recentActivity) get().setRecentTransmissions(profile.recentActivity);
          if (profile.contributions) get().setGalaxyContributions(profile.contributions);
        },

        // Computed Values
        getFilteredRepositories: () => {
          const { spaceRepositories, repositoryFilters } = get();
          let filtered = [...spaceRepositories];

          // Search filter
          if (repositoryFilters.search) {
            const search = repositoryFilters.search.toLowerCase();
            filtered = filtered.filter(repo => 
              repo.name.toLowerCase().includes(search) ||
              repo.description?.toLowerCase().includes(search)
            );
          }

          // Language filter
          if (repositoryFilters.language && repositoryFilters.language !== 'all') {
            filtered = filtered.filter(repo => repo.language === repositoryFilters.language);
          }

          // Type filter
          if (repositoryFilters.type !== 'all') {
            filtered = filtered.filter(repo => {
              if (repositoryFilters.type === 'owner') return !repo.fork;
              if (repositoryFilters.type === 'member') return repo.fork;
              return true;
            });
          }

          // Sort
          filtered.sort((a, b) => {
            const { sortBy, direction } = repositoryFilters;
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

          return filtered;
        },

        getTotalStars: () => {
          const { spaceRepositories } = get();
          return spaceRepositories.reduce((total, repo) => total + repo.stargazers_count, 0);
        },

        getTotalForks: () => {
          const { spaceRepositories } = get();
          return spaceRepositories.reduce((total, repo) => total + repo.forks, 0);
        },

        getTopLanguages: (limit = 5) => {
          const { nebulaLanguages } = get();
          const total = Object.values(nebulaLanguages).reduce((sum, count) => sum + count, 0);
          
          return Object.entries(nebulaLanguages)
            .map(([name, value]) => ({
              name,
              value,
              percentage: total > 0 ? (value / total) * 100 : 0
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, limit);
        },

        getContributionLevel: () => {
          const { orbitStats } = get();
          if (!orbitStats) return 'rookie';

          const totalContributions = orbitStats.totalCommits;
          
          if (totalContributions >= 1000) return 'legend';
          if (totalContributions >= 500) return 'commander';
          if (totalContributions >= 200) return 'voyager';
          if (totalContributions >= 50) return 'explorer';
          return 'rookie';
        },
      }),
      {
        name: 'repo-radar-store',
        partialize: (state) => ({
          recentScans: state.recentScans,
          repositoryFilters: state.repositoryFilters,
          lastScannedPilot: state.lastScannedPilot,
        }),
      }
    ),
    { name: 'RepoRadar' }
  )
);