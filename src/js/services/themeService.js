// Typography & Theme Customization Service for macOS Portfolio

export const FONT_STYLES = {
  inter: {
    id: 'inter',
    name: 'SF Pro / Inter',
    category: 'macOS Native Sans',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    sample: 'Clean, elegant, authentic macOS default typography.'
  },
  outfit: {
    id: 'outfit',
    name: 'Outfit',
    category: 'Futuristic Geometric',
    fontFamily: '"Outfit", "Inter", sans-serif',
    sample: 'Modern geometric curves tailored for sleek digital interfaces.'
  },
  jakarta: {
    id: 'jakarta',
    name: 'Plus Jakarta Sans',
    category: 'Modern Tech Sans',
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    sample: 'Crisp contemporary sans-serif engineered for high readability.'
  },
  jetbrains: {
    id: 'jetbrains',
    name: 'JetBrains Mono',
    category: 'Developer Code Monospace',
    fontFamily: '"JetBrains Mono", "SF Mono", Menlo, monospace',
    sample: 'True developer terminal aesthetics with high contrast glyphs.'
  },
  playfair: {
    id: 'playfair',
    name: 'Playfair Display',
    category: 'Executive Editorial Serif',
    fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
    sample: 'Refined editorial serif for prestigious executive portfolios.'
  }
};

export class ThemeService {
  constructor() {
    this.currentFontId = localStorage.getItem('abhishek_portfolio_font_id') || 'inter';
    this.currentFontSize = parseInt(localStorage.getItem('abhishek_portfolio_font_size') || '100', 10);
    this.currentLetterSpacing = localStorage.getItem('abhishek_portfolio_letter_spacing') || 'normal';
    this.listeners = [];

    this.applyAll();
  }

  onChange(callback) {
    this.listeners.push(callback);
  }

  notify() {
    this.listeners.forEach(fn => fn({
      fontId: this.currentFontId,
      fontSize: this.currentFontSize,
      letterSpacing: this.currentLetterSpacing
    }));
  }

  setFontStyle(fontId) {
    if (!FONT_STYLES[fontId]) return;
    this.currentFontId = fontId;
    localStorage.setItem('abhishek_portfolio_font_id', fontId);
    this.applyAll();
    this.notify();
  }

  setFontSize(percent) {
    const clamped = Math.max(75, Math.min(140, percent));
    this.currentFontSize = clamped;
    localStorage.setItem('abhishek_portfolio_font_size', clamped.toString());
    this.applyAll();
    this.notify();
  }

  increaseFontSize(delta = 5) {
    this.setFontSize(this.currentFontSize + delta);
  }

  decreaseFontSize(delta = 5) {
    this.setFontSize(this.currentFontSize - delta);
  }

  setLetterSpacing(spacing) {
    this.currentLetterSpacing = spacing;
    localStorage.setItem('abhishek_portfolio_letter_spacing', spacing);
    this.applyAll();
    this.notify();
  }

  resetDefaults() {
    this.setFontStyle('inter');
    this.setFontSize(100);
    this.setLetterSpacing('normal');
  }

  applyAll() {
    const fontConfig = FONT_STYLES[this.currentFontId] || FONT_STYLES.inter;
    const root = document.documentElement;

    root.style.setProperty('--font-system', fontConfig.fontFamily);
    root.style.setProperty('--base-font-size', `${13 * (this.currentFontSize / 100)}px`);
    root.style.fontSize = `${13 * (this.currentFontSize / 100)}px`;

    if (this.currentLetterSpacing === 'tight') {
      root.style.setProperty('--letter-spacing-custom', '-0.02em');
    } else if (this.currentLetterSpacing === 'wide') {
      root.style.setProperty('--letter-spacing-custom', '0.04em');
    } else {
      root.style.setProperty('--letter-spacing-custom', 'normal');
    }
  }
}

export const themeService = new ThemeService();
