// Siri & Gemini AI Search Assistant App with 3D Apple Intelligence Sphere
import { aiService } from '../services/aiService.js';
import { resumeData } from '../data/resumeData.js';
import { Tilt3D } from '../services/tilt3d.js';

export class AIApp {
  constructor() {
    this.history = [
      {
        role: 'assistant',
        text: `Hello! I am **Siri for Abhishek**, an AI assistant pre-trained on Abhishek Kumar's complete engineering resume, research publications, and GitHub activity.\n\nRecruiters and visitors can search anything directly about his **8.73 CGPA**, **VLSI internship at Jadavpur**, **SAIL automation training**, **IEEE paper**, or **projects built in the last 6 months**! Try asking below or click a suggestion chip.`
      }
    ];
    this.isThinking = false;
  }

  render() {
    return `
      <div class="ai-app-container">
        <!-- AI Header with 3D Apple Intelligence Gyroscopic Orb -->
        <header class="ai-app-header">
          <div class="ai-orb-wrapper">
            <div class="ai-orb-3d-scene">
              <div class="orb-3d-rings">
                <div class="orb-ring ring-x"></div>
                <div class="orb-ring ring-y"></div>
                <div class="orb-ring ring-z"></div>
                <div class="orb-core-3d"></div>
              </div>
            </div>
            <div class="ai-title-meta">
              <div class="ai-title-row">
                <span class="ai-title">Apple Intelligence & Gemini AI</span>
                <span class="ai-status-badge" id="ai-active-mode-badge">Resume Intelligence Ready</span>
              </div>
              <span class="ai-subtitle">Direct semantic resume search for recruiters & hiring managers</span>
            </div>
          </div>

          <div class="ai-header-actions">
            <button class="ai-action-btn" id="btn-ai-key-settings" title="Configure Live Google Gemini API Key">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              <span>API Key</span>
            </button>
            <button class="ai-action-btn" id="btn-clear-ai-chat" title="Clear Chat History">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <span>Clear</span>
            </button>
          </div>
        </header>

        <!-- Chat Conversation Body -->
        <div class="ai-chat-body" id="ai-chat-messages">
          ${this.renderMessages()}
        </div>

        <!-- Suggestion Chips Bar with 3D hover pills -->
        <div class="ai-suggestions-tray">
          <span class="suggestion-tray-title">Quick Recruiter Prompts:</span>
          <div class="suggestion-chips-carousel">
            <button class="chip-btn 3d-chip" data-query="What is Abhishek's CGPA and academic background?">🎓 CGPA & College</button>
            <button class="chip-btn 3d-chip" data-query="Tell me about his VLSI internship at Jadavpur University">⚡ VLSI Internship</button>
            <button class="chip-btn 3d-chip" data-query="What projects has he created in the last 6 months on GitHub?">🚀 Last 6-Month Projects</button>
            <button class="chip-btn 3d-chip" data-query="Explain his published IEEE research paper">📄 IEEE Publication</button>
            <button class="chip-btn 3d-chip" data-query="Why should our company hire Abhishek for an engineering role?">⭐ Why Hire Abhishek?</button>
            <button class="chip-btn 3d-chip" data-query="What are his core technical skills and programming languages?">💻 Core Tech Skills</button>
            <button class="chip-btn 3d-chip" data-query="How can I contact Abhishek for an interview?">✉️ Contact & Email</button>
          </div>
        </div>

        <!-- Input Bar -->
        <footer class="ai-input-footer">
          <form class="ai-input-form" id="ai-chat-form">
            <div class="input-glow-box">
              <input type="text" id="ai-query-input" placeholder="Ask anything about Abhishek (e.g. 'Tell me about his night vision project')..." autocomplete="off" />
              <button type="button" class="btn-voice-speak" id="btn-ai-voice" title="Read Aloud with Siri Voice">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              </button>
              <button type="submit" class="btn-ai-send" id="btn-ai-send" title="Send Question">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </form>
        </footer>

        <!-- Gemini API Key Modal -->
        <div class="gemini-key-modal" id="gemini-key-modal" style="display: none;">
          <div class="gemini-modal-content">
            <h4>Google Gemini API Settings</h4>
            <p class="modal-subtext">The assistant works out-of-the-box using Abhishek's structured resume knowledge engine. To connect live Google Gemini 1.5 Flash LLM, paste your Google AI Studio API key below:</p>
            <input type="password" id="gemini-key-input" placeholder="AIzaSy..." value="${aiService.customApiKey}" />
            <div class="gemini-modal-actions">
              <button class="btn-save-key" id="btn-save-gemini-key">Save & Activate</button>
              <button class="btn-clear-key" id="btn-clear-gemini-key">Use Built-in Engine</button>
              <button class="btn-cancel-modal" id="btn-close-gemini-modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderMessages() {
    return this.history.map((msg, index) => {
      const isUser = msg.role === 'user';
      return `
        <div class="chat-row ${isUser ? 'user-row' : 'assistant-row'}">
          <div class="chat-avatar">
            ${isUser ? '👤' : ''}
          </div>
          <div class="chat-bubble">
            <div class="chat-text">${this.formatMarkdown(msg.text)}</div>
            ${!isUser && index === this.history.length - 1 ? `
              <div class="chat-bubble-tools">
                <button class="chat-tool-btn copy-ans" data-text="${encodeURIComponent(msg.text)}" title="Copy Answer">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  formatMarkdown(text) {
    let formatted = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/^• (.*)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/^(<li>.*<\/li>)+$/gm, '<ul>$&</ul>');
    formatted = formatted.replace(/\n\n/g, '<br><br>');
    formatted = formatted.replace(/\n/g, '<br>');
    formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="chat-link">$1</a>');

    return formatted;
  }

  async handleQuery(query, container) {
    if (!query || this.isThinking) return;

    this.history.push({ role: 'user', text: query });
    this.isThinking = true;

    const messagesEl = container.querySelector('#ai-chat-messages');
    messagesEl.innerHTML = this.renderMessages() + `
      <div class="chat-row assistant-row thinking-row">
        <div class="chat-avatar"></div>
        <div class="chat-bubble thinking">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        </div>
      </div>
    `;
    messagesEl.scrollTop = messagesEl.scrollHeight;

    try {
      const answer = await aiService.ask(query);
      this.history.push({ role: 'assistant', text: answer });
    } catch (e) {
      this.history.push({
        role: 'assistant',
        text: `Abhishek Kumar is an ECE undergraduate at IEM Kolkata (8.73 CGPA) with VLSI and automation internships, IEEE publication, and strong hands-on embedded and software engineering skills.`
      });
    } finally {
      this.isThinking = false;
      messagesEl.innerHTML = this.renderMessages();
      messagesEl.scrollTop = messagesEl.scrollHeight;
      this.attachMessageListeners(container);
    }
  }

  speakLastAnswer() {
    if (!('speechSynthesis' in window)) return;
    const lastMsg = this.history[this.history.length - 1];
    if (lastMsg && lastMsg.role === 'assistant') {
      window.speechSynthesis.cancel();
      const plainText = lastMsg.text.replace(/\*\*/g, '').replace(/•/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1');
      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }

  initListeners(container) {
    const form = container.querySelector('#ai-chat-form');
    const input = container.querySelector('#ai-query-input');
    const chips = container.querySelectorAll('.chip-btn');
    const voiceBtn = container.querySelector('#btn-ai-voice');
    const clearBtn = container.querySelector('#btn-clear-ai-chat');
    const settingsBtn = container.querySelector('#btn-ai-key-settings');
    const keyModal = container.querySelector('#gemini-key-modal');
    const keyInput = container.querySelector('#gemini-key-input');
    const saveKeyBtn = container.querySelector('#btn-save-gemini-key');
    const clearKeyBtn = container.querySelector('#btn-clear-gemini-key');
    const closeModalBtn = container.querySelector('#btn-close-gemini-modal');
    const statusBadge = container.querySelector('#ai-active-mode-badge');

    const updateStatus = () => {
      if (aiService.hasCustomKey()) {
        if (statusBadge) {
          statusBadge.textContent = "Live Gemini 1.5 Active";
          statusBadge.classList.add('badge-gemini-live');
        }
      } else {
        if (statusBadge) {
          statusBadge.textContent = "Resume Intelligence Ready";
          statusBadge.classList.remove('badge-gemini-live');
        }
      }
    };
    updateStatus();

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = input.value.trim();
        if (query) {
          input.value = '';
          this.handleQuery(query, container);
        }
      });
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        if (query) {
          this.handleQuery(query, container);
        }
      });
    });

    if (voiceBtn) {
      voiceBtn.addEventListener('click', () => this.speakLastAnswer());
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.history = [{
          role: 'assistant',
          text: `Chat reset! Ask me anything about Abhishek's projects, CGPA, research, or internships.`
        }];
        const messagesEl = container.querySelector('#ai-chat-messages');
        if (messagesEl) messagesEl.innerHTML = this.renderMessages();
        this.attachMessageListeners(container);
      });
    }

    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        keyModal.style.display = 'flex';
      });
    }

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        keyModal.style.display = 'none';
      });
    }

    if (saveKeyBtn) {
      saveKeyBtn.addEventListener('click', () => {
        const val = keyInput.value.trim();
        aiService.setApiKey(val);
        updateStatus();
        keyModal.style.display = 'none';
      });
    }

    if (clearKeyBtn) {
      clearKeyBtn.addEventListener('click', () => {
        aiService.setApiKey('');
        keyInput.value = '';
        updateStatus();
        keyModal.style.display = 'none';
      });
    }

    this.attachMessageListeners(container);
  }

  attachMessageListeners(container) {
    const copyBtns = container.querySelectorAll('.copy-ans');
    copyBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const raw = decodeURIComponent(btn.getAttribute('data-text'));
        await navigator.clipboard.writeText(raw);
        btn.classList.add('copied');
        setTimeout(() => btn.classList.remove('copied'), 1500);
      });
    });
  }
}
