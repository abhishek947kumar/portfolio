// GitHub Service for real-time portfolio integration
import { resumeData } from '../data/resumeData.js';

const GITHUB_USERNAME = 'abhishek947kumar';
const CACHE_KEY_REPOS = 'agy_portfolio_repos_cache';
const CACHE_KEY_EVENTS = 'agy_portfolio_events_cache';
const CACHE_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes

export class GitHubService {
  constructor() {
    this.username = GITHUB_USERNAME;
    this.listeners = [];
  }

  onUpdate(callback) {
    this.listeners.push(callback);
  }

  notifyListeners(data) {
    this.listeners.forEach(fn => fn(data));
  }

  async fetchUserData() {
    try {
      const res = await fetch(`https://api.github.com/users/${this.username}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Could not fetch GitHub user profile:', e);
    }
    return {
      login: this.username,
      name: resumeData.personal.name,
      avatar_url: "https://avatars.githubusercontent.com/u/153946376?v=4",
      html_url: `https://github.com/${this.username}`,
      public_repos: 8,
      followers: 1,
      following: 3,
      bio: resumeData.personal.tagline
    };
  }

  async fetchRepositories(forceRefresh = false) {
    if (!forceRefresh) {
      const cached = this.getCached(CACHE_KEY_REPOS);
      if (cached) return cached;
    }

    try {
      const res = await fetch(`https://api.github.com/users/${this.username}/repos?sort=updated&per_page=100`);
      if (res.ok) {
        const repos = await res.json();
        const processed = this.processRepos(repos);
        this.setCached(CACHE_KEY_REPOS, processed);
        this.notifyListeners({ type: 'repos', data: processed });
        return processed;
      }
    } catch (e) {
      console.warn('Error fetching live GitHub repositories, using fallback:', e);
    }

    return this.getFallbackRepos();
  }

  async fetchEvents(forceRefresh = false) {
    if (!forceRefresh) {
      const cached = this.getCached(CACHE_KEY_EVENTS);
      if (cached) return cached;
    }

    try {
      const res = await fetch(`https://api.github.com/users/${this.username}/events?per_page=30`);
      if (res.ok) {
        const events = await res.json();
        const processed = this.processEvents(events);
        this.setCached(CACHE_KEY_EVENTS, processed);
        this.notifyListeners({ type: 'events', data: processed });
        return processed;
      }
    } catch (e) {
      console.warn('Error fetching live GitHub events, using fallback:', e);
    }

    return this.getFallbackEvents();
  }

  processRepos(rawRepos) {
    // Determine 6-month threshold based on current date (Sep 2026)
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());

    return rawRepos.map(repo => {
      const updatedAt = new Date(repo.updated_at);
      const isLast6Months = updatedAt >= sixMonthsAgo;

      return {
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || 'No description provided.',
        url: repo.html_url,
        language: repo.language || 'Code',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        updatedAt: repo.updated_at,
        updatedFormatted: updatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        isLast6Months,
        topics: repo.topics || []
      };
    });
  }

  processEvents(rawEvents) {
    return rawEvents.slice(0, 15).map(event => {
      const d = new Date(event.created_at);
      const dateFormatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      const repoName = event.repo ? event.repo.name.replace(`${this.username}/`, '') : 'Repository';

      let description = 'Activity on repository';
      let icon = 'git-commit';

      if (event.type === 'PushEvent') {
        const commitCount = event.payload?.commits?.length || 1;
        const msg = event.payload?.commits?.[0]?.message || 'Code update';
        description = `Pushed ${commitCount} commit(s): "${msg.length > 50 ? msg.substring(0, 50) + '...' : msg}"`;
        icon = 'git-push';
      } else if (event.type === 'CreateEvent') {
        description = `Created ${event.payload?.ref_type || 'resource'} ${event.payload?.ref || repoName}`;
        icon = 'plus-circle';
      } else if (event.type === 'WatchEvent') {
        description = `Starred repository ${repoName}`;
        icon = 'star';
      }

      return {
        id: event.id,
        type: event.type,
        repo: repoName,
        repoUrl: `https://github.com/${event.repo?.name || this.username}`,
        date: dateFormatted,
        rawDate: event.created_at,
        description,
        icon
      };
    });
  }

  getCached(key) {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      const parsed = JSON.parse(item);
      if (Date.now() - parsed.timestamp < CACHE_EXPIRY_MS) {
        return parsed.data;
      }
    } catch (e) {
      // Ignore localStorage error
    }
    return null;
  }

  setCached(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify({
        timestamp: Date.now(),
        data
      }));
    } catch (e) {
      // Ignore quota error
    }
  }

  getFallbackRepos() {
    return [
      {
        id: 1,
        name: "Embedded-Night-Vision-System",
        fullName: "abhishek947kumar/Embedded-Night-Vision-System",
        description: "Embedded Night-Vision System for Pedestrian Detection using Active IR and Thermal Sensors with HAAR+AdaBoost and YOLOv2",
        url: "https://github.com/abhishek947kumar/Embedded-Night-Vision-System",
        language: "Python",
        stars: 1,
        forks: 0,
        updatedFormatted: "Sep 19, 2026",
        isLast6Months: true,
        topics: ["embedded", "night-vision", "yolov2", "infrared", "deep-learning"]
      },
      {
        id: 2,
        name: "Logistics-Management-System",
        fullName: "abhishek947kumar/Logistics-Management-System",
        description: "Enterprise-Grade Commercial Multi-Dealer & Consumer Logistics Management System in Python & Django.",
        url: "https://github.com/abhishek947kumar/Logistics-Management-System",
        language: "Python",
        stars: 1,
        forks: 0,
        updatedFormatted: "Sep 18, 2026",
        isLast6Months: true,
        topics: ["django", "logistics", "supply-chain", "enterprise"]
      },
      {
        id: 3,
        name: "YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",
        fullName: "abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",
        description: "Modern financial control center with category budgets, savings milestones, and Google Gemini AI spending analytics.",
        url: "https://github.com/abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",
        language: "JavaScript",
        stars: 1,
        forks: 0,
        updatedFormatted: "Jul 19, 2026",
        isLast6Months: true,
        topics: ["finance", "gemini-ai", "budgeting", "expense-tracker"]
      },
      {
        id: 4,
        name: "Evershop",
        fullName: "abhishek947kumar/Evershop",
        description: "Modern, TypeScript-first eCommerce platform built with GraphQL and React with modular, customizable architecture.",
        url: "https://github.com/abhishek947kumar/Evershop",
        language: "TypeScript",
        stars: 0,
        forks: 0,
        updatedFormatted: "Aug 5, 2026",
        isLast6Months: true,
        topics: ["typescript", "react", "graphql", "ecommerce"]
      },
      {
        id: 5,
        name: "PRODIGY_CS_02",
        fullName: "abhishek947kumar/PRODIGY_CS_02",
        description: "Image encryption tool using pixel manipulation: pixel value swapping and mathematical reversible transformations.",
        url: "https://github.com/abhishek947kumar/PRODIGY_CS_02",
        language: "Python",
        stars: 1,
        forks: 0,
        updatedFormatted: "May 20, 2024",
        isLast6Months: false,
        topics: ["cryptography", "image-encryption", "security"]
      },
      {
        id: 6,
        name: "PRODIGY_CS_01",
        fullName: "abhishek947kumar/PRODIGY_CS_01",
        description: "Caesar Cipher program to encrypt and decrypt messages by character shifts.",
        url: "https://github.com/abhishek947kumar/PRODIGY_CS_01",
        language: "Python",
        stars: 1,
        forks: 0,
        updatedFormatted: "May 12, 2025",
        isLast6Months: false,
        topics: ["cryptography", "caesar-cipher"]
      }
    ];
  }

  getFallbackEvents() {
    return [
      {
        id: "evt-1",
        type: "PushEvent",
        repo: "Embedded-Night-Vision-System",
        repoUrl: "https://github.com/abhishek947kumar/Embedded-Night-Vision-System",
        date: "Sep 19, 2026",
        description: "Pushed 2 commits: 'Optimized YOLOv2 inference pipeline on embedded edge unit'",
        icon: "git-push"
      },
      {
        id: "evt-2",
        type: "PushEvent",
        repo: "Logistics-Management-System",
        repoUrl: "https://github.com/abhishek947kumar/Logistics-Management-System",
        date: "Sep 18, 2026",
        description: "Pushed 3 commits: 'Enterprise dealer dispatch scheduling & consignment tracking'",
        icon: "git-push"
      },
      {
        id: "evt-3",
        type: "CreateEvent",
        repo: "Logistics-Management-System",
        repoUrl: "https://github.com/abhishek947kumar/Logistics-Management-System",
        date: "Sep 18, 2026",
        description: "Created branch 'main' with multi-dealer logistics architecture",
        icon: "plus-circle"
      },
      {
        id: "evt-4",
        type: "PushEvent",
        repo: "YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",
        repoUrl: "https://github.com/abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",
        date: "Jul 19, 2026",
        description: "Pushed 4 commits: 'Integrated Google Gemini AI for smart wealth recommendations'",
        icon: "git-push"
      }
    ];
  }
}

export const githubService = new GitHubService();
