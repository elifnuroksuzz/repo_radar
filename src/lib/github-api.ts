import axios, { AxiosResponse } from 'axios';
import type {
  SpaceUser,
  CosmicRepository,
  CosmicEvent,
  NebulaLanguageStats,
  OrbitStats,
  RadarProfile,
  GalaxyContribution,
  RadarError
} from '@/types';
import { calculateNebulaLanguages, getRadarErrorMessage } from './utils';

// GitHub API base configuration
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

// Axios instance with default config
const radarApi = axios.create({
  baseURL: GITHUB_API_BASE,
  timeout: 10000,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'RepoRadar/1.0',
    ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
  }
});

// Response interceptor for error handling
radarApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Radar API Error:', error);
    throw error;
  }
);

// Rate limit info
interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  used: number;
}

export async function getRadarRateLimit(): Promise<RateLimitInfo> {
  try {
    const response = await radarApi.get('/rate_limit');
    return response.data.rate;
  } catch (error) {
    throw new Error(getRadarErrorMessage(error));
  }
}

// Get space pilot (GitHub user) information
export async function scanSpacePilot(username: string): Promise<SpaceUser> {
  try {
    const response: AxiosResponse<SpaceUser> = await radarApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error(getRadarErrorMessage(error));
  }
}

// Get cosmic repositories for a space pilot
export async function scanCosmicRepositories(
  username: string,
  options: {
    type?: 'all' | 'owner' | 'member';
    sort?: 'created' | 'updated' | 'pushed' | 'full_name';
    direction?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
  } = {}
): Promise<CosmicRepository[]> {
  try {
    const params = new URLSearchParams({
      type: options.type || 'owner',
      sort: options.sort || 'updated',
      direction: options.direction || 'desc',
      per_page: (options.per_page || 100).toString(),
      page: (options.page || 1).toString(),
    });

    const response: AxiosResponse<CosmicRepository[]> = await radarApi.get(
      `/users/${username}/repos?${params}`
    );

    return response.data;
  } catch (error) {
    throw new Error(getRadarErrorMessage(error));
  }
}

// Get all repositories for a user (handles pagination)
export async function scanAllCosmicRepositories(username: string): Promise<CosmicRepository[]> {
  const allRepos: CosmicRepository[] = [];
  let page = 1;
  const perPage = 100;

  try {
    while (true) {
      const repos = await scanCosmicRepositories(username, {
        type: 'owner',
        sort: 'updated',
        direction: 'desc',
        per_page: perPage,
        page: page
      });

      if (repos.length === 0) break;
      
      allRepos.push(...repos);
      
      if (repos.length < perPage) break;
      page++;
    }

    return allRepos;
  } catch (error) {
    throw new Error(getRadarErrorMessage(error));
  }
}

// Get recent transmissions (GitHub events) for a space pilot
export async function scanRecentTransmissions(
  username: string,
  options: {
    per_page?: number;
    page?: number;
  } = {}
): Promise<CosmicEvent[]> {
  try {
    const params = new URLSearchParams({
      per_page: (options.per_page || 30).toString(),
      page: (options.page || 1).toString(),
    });

    const response: AxiosResponse<CosmicEvent[]> = await radarApi.get(
      `/users/${username}/events/public?${params}`
    );

    return response.data;
  } catch (error) {
    throw new Error(getRadarErrorMessage(error));
  }
}

// Get language statistics for repositories
export async function analyzeNebulaLanguages(repositories: CosmicRepository[]): Promise<NebulaLanguageStats> {
  const languageStats: NebulaLanguageStats = {};
  
  try {
    // GitHub API has a limit, so we'll batch the requests
    const languagePromises = repositories
      .filter(repo => !repo.fork && repo.size > 0) // Skip forks and empty repos
      .slice(0, 50) // Limit to first 50 repos to avoid rate limiting
      .map(async (repo) => {
        try {
          const response = await radarApi.get(`/repos/${repo.full_name}/languages`);
          return { repo: repo.name, languages: response.data };
        } catch (error) {
          console.warn(`Failed to get languages for ${repo.name}:`, error);
          return { repo: repo.name, languages: {} };
        }
      });

    const results = await Promise.allSettled(languagePromises);
    
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        const { languages } = result.value;
        Object.entries(languages).forEach(([language, bytes]) => {
          languageStats[language] = (languageStats[language] || 0) + (bytes as number);
        });
      }
    });

    return languageStats;
  } catch (error) {
    console.warn('Failed to analyze nebula languages:', error);
    // Fallback to basic language detection from repo.language
    return calculateNebulaLanguages(repositories);
  }
}

// Calculate orbit statistics for a space pilot
export async function calculateOrbitStats(
  pilot: SpaceUser,
  repositories: CosmicRepository[],
  languageStats: NebulaLanguageStats
): Promise<OrbitStats> {
  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repositories.reduce((sum, repo) => sum + repo.forks, 0);
  const totalRepos = repositories.filter(repo => !repo.fork).length;
  
  // Estimate total commits (this is an approximation since GitHub doesn't provide this directly)
  const estimatedCommits = repositories.length * 10 + totalStars * 2; // Rough estimation
  
  let contributionLevel: 'rookie' | 'explorer' | 'voyager' | 'commander' | 'legend' = 'rookie';
  
  if (estimatedCommits >= 1000) contributionLevel = 'legend';
  else if (estimatedCommits >= 500) contributionLevel = 'commander';
  else if (estimatedCommits >= 200) contributionLevel = 'voyager';
  else if (estimatedCommits >= 50) contributionLevel = 'explorer';

  return {
    totalStars,
    totalForks,
    totalRepos,
    totalCommits: estimatedCommits,
    languageStats,
    contributionLevel
  };
}

// Generate fake contribution data (GitHub's contribution graph is not public API)
export function generateGalaxyContributions(): GalaxyContribution[] {
  const contributions: GalaxyContribution[] = [];
  const now = new Date();
  const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
  
  for (let d = new Date(oneYearAgo); d <= now; d.setDate(d.getDate() + 1)) {
    const count = Math.floor(Math.random() * 8); // 0-7 contributions per day
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    
    if (count > 6) level = 4;
    else if (count > 4) level = 3;
    else if (count > 2) level = 2;
    else if (count > 0) level = 1;
    
    contributions.push({
      date: d.toISOString().split('T')[0],
      count,
      level
    });
  }
  
  return contributions;
}

// Get complete radar profile for a space pilot
export async function scanCompleteRadarProfile(username: string): Promise<RadarProfile> {
  try {
    console.log(`🛸 Initiating radar scan for space pilot: ${username}`);
    
    // Step 1: Scan the space pilot
    console.log('📡 Scanning space pilot profile...');
    const pilot = await scanSpacePilot(username);
    
    // Step 2: Scan cosmic repositories
    console.log('🌌 Scanning cosmic repositories...');
    const repositories = await scanAllCosmicRepositories(username);
    
    // Step 3: Analyze nebula languages
    console.log('🌠 Analyzing nebula languages...');
    const languageStats = await analyzeNebulaLanguages(repositories);
    
    // Step 4: Calculate orbit statistics
    console.log('⭐ Calculating orbit statistics...');
    const stats = await calculateOrbitStats(pilot, repositories, languageStats);
    
    // Step 5: Scan recent transmissions
    console.log('📻 Scanning recent transmissions...');
    const recentActivity = await scanRecentTransmissions(username);
    
    // Step 6: Generate galaxy contributions
    console.log('🌟 Generating galaxy contributions...');
    const contributions = generateGalaxyContributions();
    
    // Step 7: Determine achievements
    const achievements = determineAchievements(pilot, repositories, stats);
    
    console.log('✅ Radar scan complete!');
    
    return {
      user: pilot,
      repositories,
      stats,
      recentActivity,
      contributions,
      achievements
    };
    
  } catch (error) {
    console.error('❌ Radar scan failed:', error);
    throw error;
  }
}

// Determine achievements based on profile data
function determineAchievements(
  pilot: SpaceUser,
  repositories: CosmicRepository[],
  stats: OrbitStats
): string[] {
  const achievements: string[] = [];
  
  // Account age achievements
  const accountAge = Date.now() - new Date(pilot.created_at).getTime();
  const yearsOld = accountAge / (365 * 24 * 60 * 60 * 1000);
  
  if (yearsOld >= 5) achievements.push('Veteran Space Pilot');
  if (yearsOld >= 3) achievements.push('Experienced Navigator');
  if (yearsOld >= 1) achievements.push('Seasoned Explorer');
  
  // Repository achievements
  if (stats.totalRepos >= 50) achievements.push('Repository Collector');
  if (stats.totalRepos >= 20) achievements.push('Active Creator');
  if (stats.totalRepos >= 10) achievements.push('Repository Builder');
  
  // Star achievements
  if (stats.totalStars >= 1000) achievements.push('Star Commander');
  if (stats.totalStars >= 500) achievements.push('Rising Star');
  if (stats.totalStars >= 100) achievements.push('Popular Creator');
  if (stats.totalStars >= 50) achievements.push('Community Favorite');
  
  // Language achievements
  const languageCount = Object.keys(stats.languageStats).length;
  if (languageCount >= 10) achievements.push('Polyglot Programmer');
  if (languageCount >= 5) achievements.push('Multi-Language Master');
  
  // Follower achievements
  if (pilot.followers >= 1000) achievements.push('Influential Leader');
  if (pilot.followers >= 500) achievements.push('Community Builder');
  if (pilot.followers >= 100) achievements.push('Network Connector');
  
  // Special achievements
  if (pilot.bio?.toLowerCase().includes('open source')) {
    achievements.push('Open Source Advocate');
  }
  
  if (repositories.some(repo => repo.stargazers_count >= 100)) {
    achievements.push('Project Maintainer');
  }
  
  return achievements;
}

// Search space pilots
export async function searchSpacePilots(query: string, options: {
  sort?: 'followers' | 'repositories' | 'joined';
  order?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
} = {}): Promise<{ items: SpaceUser[]; total_count: number }> {
  try {
    const params = new URLSearchParams({
      q: `${query} type:user`,
      sort: options.sort || 'followers',
      order: options.order || 'desc',
      per_page: (options.per_page || 30).toString(),
      page: (options.page || 1).toString(),
    });

    const response = await radarApi.get(`/search/users?${params}`);
    return response.data;
  } catch (error) {
    throw new Error(getRadarErrorMessage(error));
  }
}