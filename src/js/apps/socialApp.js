// Social Activity & Live Feeds App (GitHub & LinkedIn)
import { githubService } from '../services/githubService.js';
import { resumeData } from '../data/resumeData.js';

export class SocialApp {
  constructor() {
    this.activeTab = 'all';
    this.repos = [];
    this.events = [];
    this.customPosts = this.loadCustomPosts();
    this.isRefreshing = false;
  }

  loadCustomPosts() {
    try {
      const stored = localStorage.getItem('abhishek_portfolio_custom_posts');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [];
  }

  saveCustomPosts(posts) {
    try {
      localStorage.setItem('abhishek_portfolio_custom_posts', JSON.stringify(posts));
    } catch (e) {}
  }

  render() {
    return `
      <div class="social-app-container">
        <!-- Top Navigation Header -->
        <header class="social-header">
          <div class="social-profile-summary">
            <img src="https://avatars.githubusercontent.com/u/153946376?v=4" alt="Abhishek Kumar" class="social-avatar" />
            <div class="social-profile-text">
              <div class="profile-name-row">
                <h3>${resumeData.personal.name}</h3>
                <span class="verified-pill">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  Verified Profile
                </span>
              </div>
              <p class="profile-bio">${resumeData.personal.tagline}</p>
                <a href="${resumeData.personal.portfolio}" target="_blank" rel="noreferrer" class="social-tag portfolio" style="background: rgba(0, 112, 243, 0.15); border-color: rgba(0, 112, 243, 0.35); color: #60a5fa;">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  <span>abhishek947kumar.github.io/portfolio</span>
                </a>
                <a href="${resumeData.personal.github}" target="_blank" rel="noreferrer" class="social-tag github">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  <span>github.com/abhishek947kumar</span>
                </a>
                <a href="${resumeData.personal.linkedin}" target="_blank" rel="noreferrer" class="social-tag linkedin">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  <span>linkedin.com/in/abhishek947kumar</span>
                </a>
              </div>
            </div>
          </div>

          <div class="social-header-controls">
            <button class="btn-refresh-social" id="btn-refresh-social" title="Refresh Live Data from GitHub API">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-target"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
              <span>Refresh Feeds</span>
            </button>
            <button class="btn-new-post" id="btn-open-post-modal">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
              <span>Broadcast Post</span>
            </button>
          </div>
        </header>

        <!-- Segmented Tab Bar -->
        <div class="social-tabs-bar">
          <button class="soc-tab active" data-tab="all">All Activity Feed</button>
          <button class="soc-tab" data-tab="github">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub Projects & Commits
          </button>
          <button class="soc-tab" data-tab="linkedin">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            LinkedIn Posts & Research
          </button>
          <span class="live-sync-indicator">
            <span class="pulse-dot"></span> Live Sync
          </span>
        </div>

        <!-- Main Feed Scroll Area -->
        <div class="social-content-area" id="social-feed-content">
          <!-- Dynamically Loaded Feed -->
          <div class="feed-loading">Loading live updates from GitHub & LinkedIn...</div>
        </div>

        <!-- Post Creation Modal (Allows Abhishek or user to broadcast new posts that immediately update the portfolio) -->
        <div class="broadcast-modal-backdrop" id="broadcast-modal" style="display: none;">
          <div class="broadcast-dialog">
            <div class="dialog-header">
              <h4>Create & Broadcast Post</h4>
              <button class="btn-dialog-close" id="btn-close-broadcast">&times;</button>
            </div>
            <form id="broadcast-post-form">
              <div class="form-group">
                <label>Platform</label>
                <select id="post-platform-select">
                  <option value="LinkedIn">LinkedIn Post</option>
                  <option value="GitHub">GitHub Project Update</option>
                </select>
              </div>
              <div class="form-group">
                <label>Post Title</label>
                <input type="text" id="post-title-input" placeholder="e.g. Published new optimization module for YOLOv2" required />
              </div>
              <div class="form-group">
                <label>Post Content</label>
                <textarea id="post-content-input" rows="4" placeholder="Write your announcement, engineering achievement, or milestone..." required></textarea>
              </div>
              <div class="form-group">
                <label>Tags (comma-separated)</label>
                <input type="text" id="post-tags-input" placeholder="#VLSI, #Embedded, #Python" />
              </div>
              <div class="form-group">
                <label>URL / Link (optional)</label>
                <input type="url" id="post-url-input" placeholder="https://linkedin.com/... or https://github.com/..." />
              </div>
              <div class="dialog-actions">
                <button type="submit" class="btn-submit-post">Publish to Portfolio</button>
                <button type="button" class="btn-cancel-post" id="btn-cancel-broadcast">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  async loadFeeds(container, forceRefresh = false) {
    const contentEl = container.querySelector('#social-feed-content');
    if (!contentEl) return;

    if (forceRefresh) {
      const refreshBtn = container.querySelector('#btn-refresh-social');
      refreshBtn?.classList.add('is-refreshing');
    }

    try {
      const [repos, events] = await Promise.all([
        githubService.fetchRepositories(forceRefresh),
        githubService.fetchEvents(forceRefresh)
      ]);
      this.repos = repos;
      this.events = events;
    } catch (e) {
      console.warn("Using fallback feeds:", e);
      this.repos = githubService.getFallbackRepos();
      this.events = githubService.getFallbackEvents();
    } finally {
      const refreshBtn = container.querySelector('#btn-refresh-social');
      refreshBtn?.classList.remove('is-refreshing');
      this.renderFeedItems(container);
    }
  }

  renderFeedItems(container) {
    const contentEl = container.querySelector('#social-feed-content');
    if (!contentEl) return;

    const allFeedItems = [];

    // 1. Add Custom Local Posts
    this.customPosts.forEach(post => {
      allFeedItems.push({
        type: 'post',
        platform: post.platform,
        title: post.title,
        content: post.content,
        date: post.date,
        url: post.url || (post.platform === 'LinkedIn' ? resumeData.personal.linkedin : resumeData.personal.github),
        tags: post.tags,
        isCustom: true
      });
    });

    // 2. Add Built-in Curated Social Posts
    resumeData.socialFeed.forEach(post => {
      allFeedItems.push({
        type: 'post',
        platform: post.platform,
        title: post.title,
        content: post.content,
        date: post.date,
        url: post.url,
        tags: post.tags,
        isCustom: false
      });
    });

    // 3. Add GitHub Recent Commits/Events
    this.events.forEach(evt => {
      allFeedItems.push({
        type: 'github-event',
        platform: 'GitHub',
        title: `${evt.repo}: ${evt.description}`,
        content: `Direct repository update pushed to branch main. Repository: ${evt.repo}`,
        date: evt.date,
        url: evt.repoUrl,
        tags: ['#GitHubActivity', '#LiveCommit'],
        isEvent: true
      });
    });

    // 4. Filter by tab
    let filtered = allFeedItems;
    if (this.activeTab === 'github') {
      filtered = allFeedItems.filter(item => item.platform === 'GitHub');
    } else if (this.activeTab === 'linkedin') {
      filtered = allFeedItems.filter(item => item.platform === 'LinkedIn');
    }

    // Repos created/updated in the last 6 months spotlight banner (if viewing All or GitHub)
    const recentRepos = this.repos.filter(r => r.isLast6Months);

    contentEl.innerHTML = `
      ${(this.activeTab === 'all' || this.activeTab === 'github') ? `
        <div class="recent-repos-spotlight">
          <div class="spotlight-title-row">
            <span class="spotlight-badge">DYNAMIC GITHUB SYNC</span>
            <h4>Projects Updated in the Last 6 Months</h4>
          </div>
          <div class="spotlight-grid">
            ${recentRepos.map(repo => `
              <div class="spotlight-card">
                <div class="spotlight-card-top">
                  <span class="repo-name-text">${repo.name}</span>
                  <span class="repo-lang-pill">${repo.language}</span>
                </div>
                <p class="repo-desc-text">${repo.description}</p>
                <div class="spotlight-card-bottom">
                  <span class="repo-time-text">Updated ${repo.updatedFormatted}</span>
                  <a href="${repo.url}" target="_blank" rel="noreferrer" class="repo-visit-link">
                    <span>View Repo</span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="feed-posts-stream">
        ${filtered.map(item => `
          <article class="feed-card platform-${item.platform.toLowerCase()}">
            <div class="feed-card-header">
              <div class="feed-badge-group">
                <span class="platform-icon-pill ${item.platform.toLowerCase()}">
                  ${item.platform === 'LinkedIn' ? 'LinkedIn' : 'GitHub'}
                </span>
                ${item.isCustom ? `<span class="badge-custom-broadcast">New Broadcast</span>` : ''}
              </div>
              <span class="feed-date">${item.date}</span>
            </div>

            <h4 class="feed-title">${item.title}</h4>
            <p class="feed-content">${item.content}</p>

            ${item.tags && item.tags.length > 0 ? `
              <div class="feed-tags-row">
                ${item.tags.map(t => `<span class="feed-tag">${t}</span>`).join('')}
              </div>
            ` : ''}

            <div class="feed-card-actions">
              <a href="${item.url}" target="_blank" rel="noreferrer" class="feed-action-link">
                <span>View on ${item.platform}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  }

  initListeners(container) {
    const tabs = container.querySelectorAll('.soc-tab');
    const refreshBtn = container.querySelector('#btn-refresh-social');
    const openPostModal = container.querySelector('#btn-open-post-modal');
    const broadcastModal = container.querySelector('#broadcast-modal');
    const closeBroadcast = container.querySelector('#btn-close-broadcast');
    const cancelBroadcast = container.querySelector('#btn-cancel-broadcast');
    const broadcastForm = container.querySelector('#broadcast-post-form');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeTab = tab.getAttribute('data-tab');
        this.renderFeedItems(container);
      });
    });

    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.loadFeeds(container, true);
      });
    }

    if (openPostModal) {
      openPostModal.addEventListener('click', () => {
        broadcastModal.style.display = 'flex';
      });
    }

    const hideModal = () => {
      broadcastModal.style.display = 'none';
    };

    if (closeBroadcast) closeBroadcast.addEventListener('click', hideModal);
    if (cancelBroadcast) cancelBroadcast.addEventListener('click', hideModal);

    if (broadcastForm) {
      broadcastForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const platform = container.querySelector('#post-platform-select').value;
        const title = container.querySelector('#post-title-input').value.trim();
        const content = container.querySelector('#post-content-input').value.trim();
        const tagsRaw = container.querySelector('#post-tags-input').value.trim();
        const url = container.querySelector('#post-url-input').value.trim();

        const tags = tagsRaw ? tagsRaw.split(',').map(s => s.trim().startsWith('#') ? s.trim() : `#${s.trim()}`) : [];

        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        const newPost = {
          id: 'custom-' + Date.now(),
          platform,
          title,
          content,
          date: dateStr,
          tags,
          url
        };

        this.customPosts.unshift(newPost);
        this.saveCustomPosts(this.customPosts);
        broadcastForm.reset();
        hideModal();
        this.renderFeedItems(container);
      });
    }

    // Initial load
    this.loadFeeds(container);
  }
}
