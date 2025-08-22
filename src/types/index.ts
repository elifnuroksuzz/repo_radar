// GitHub API Response Types - RepoRadar versiyonu

export interface SpaceUser {
  id: number;
  login: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface CosmicRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: SpaceUser;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_downloads: boolean;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
  } | null;
  allow_forking: boolean;
  is_template: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

export interface NebulaLanguageStats {
  [language: string]: number;
}

export interface StarActivity {
  date: string;
  count: number;
}

export interface GalaxyContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface CosmicEvent {
  id: string;
  type: string;
  actor: SpaceUser;
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: any;
  public: boolean;
  created_at: string;
}

export interface OrbitStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  totalCommits: number;
  languageStats: NebulaLanguageStats;
  contributionLevel: 'rookie' | 'explorer' | 'voyager' | 'commander' | 'legend';
}

export interface RadarProfile {
  user: SpaceUser;
  repositories: CosmicRepository[];
  stats: OrbitStats;
  recentActivity: CosmicEvent[];
  contributions: GalaxyContribution[];
  achievements: string[];
}

// Form ve UI Types
export interface RadarSearchForm {
  spacePilot: string; // GitHub username veya URL
}

export interface ThemeMode {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export interface LoadingStates {
  isScanning: boolean;
  isFetchingRepos: boolean;
  isFetchingStats: boolean;
  isFetchingActivity: boolean;
  error: string | null;
}

// Utility Types
export type RepositorySortBy = 'updated' | 'created' | 'pushed' | 'full_name';
export type RepositoryDirection = 'asc' | 'desc';
export type RepositoryType = 'all' | 'owner' | 'member';

export interface RepositoryFilters {
  sortBy: RepositorySortBy;
  direction: RepositoryDirection;
  type: RepositoryType;
  language?: string;
  search?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total_count: number;
  incomplete_results: boolean;
}

// Chart ve Visualization Types
export interface LanguageChartData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export interface ContributionChartData {
  date: string;
  count: number;
  level: number;
  weekday: number;
  week: number;
}

export interface ActivityTimelineData {
  date: string;
  events: CosmicEvent[];
  count: number;
}

// Error Types
export interface RadarError {
  code: 'USER_NOT_FOUND' | 'API_LIMIT_EXCEEDED' | 'NETWORK_ERROR' | 'UNKNOWN_ERROR';
  message: string;
  details?: string;
}

// Constants
export const PROGRAMMING_LANGUAGE_COLORS: Record<string, string> = {
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
  Other: '#8B5CF6'
};

export const CONTRIBUTION_LEVELS = {
  0: { color: 'hsl(var(--muted))', intensity: 'No contributions' },
  1: { color: 'hsl(var(--cosmic-blue) / 0.3)', intensity: '1-3 contributions' },
  2: { color: 'hsl(var(--cosmic-blue) / 0.6)', intensity: '4-6 contributions' },
  3: { color: 'hsl(var(--cosmic-blue) / 0.8)', intensity: '7-9 contributions' },
  4: { color: 'hsl(var(--cosmic-blue))', intensity: '10+ contributions' }
} as const;