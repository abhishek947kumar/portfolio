// macOS Mail App: Recruiter & Placement Outreach
import { resumeData } from '../data/resumeData.js';

export class MailApp {
  render() {
    return `
      <div class="mail-app-container">
        <!-- Mail Sidebar -->
        <aside class="mail-sidebar">
          <div class="mail-compose-btn-row">
            <button class="btn-new-message" id="btn-new-mail">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
              <span>New Message</span>
            </button>
          </div>
          <nav class="mail-nav">
            <div class="mail-nav-item active">
              <span>📥 Inbox (Placement)</span>
              <span class="mail-badge-count">1</span>
            </div>
            <div class="mail-nav-item">
              <span>📤 Sent</span>
            </div>
            <div class="mail-nav-item">
              <span>⭐ Important</span>
            </div>
          </nav>

          <div class="mail-contact-card">
            <h5>Direct Contact</h5>
            <p><strong>Email:</strong> ${resumeData.personal.email}</p>
            <p><strong>Phone:</strong> ${resumeData.personal.phone}</p>
            <p><strong>Address:</strong> ${resumeData.personal.address}</p>
            <button class="btn-copy-contact" id="btn-copy-contact-all">Copy Contact Info</button>
          </div>
        </aside>

        <!-- Mail Main Form -->
        <main class="mail-main">
          <div class="mail-compose-header">
            <h4>Compose Recruitment Invitation</h4>
            <div class="template-selector-row">
              <span>Quick Template:</span>
              <button class="template-chip" data-template="interview">Technical Interview</button>
              <button class="template-chip" data-template="embedded">Embedded Role</button>
              <button class="template-chip" data-template="software">Software SDE Role</button>
            </div>
          </div>

          <form class="mail-form" id="placement-mail-form">
            <div class="mail-field-row">
              <label>To:</label>
              <input type="text" value="Abhishek Kumar <${resumeData.personal.email}>" readonly class="mail-input-readonly" />
            </div>
            <div class="mail-field-row">
              <label>From:</label>
              <input type="email" id="mail-from" placeholder="recruiter@company.com" required />
            </div>
            <div class="mail-field-row">
              <label>Company / Org:</label>
              <input type="text" id="mail-company" placeholder="e.g. Texas Instruments, Qualcomm, Google, Intel" required />
            </div>
            <div class="mail-field-row">
              <label>Subject:</label>
              <input type="text" id="mail-subject" value="Placement Interview Opportunity: Abhishek Kumar" required />
            </div>
            <div class="mail-body-row">
              <textarea id="mail-body" rows="9" required placeholder="Dear Abhishek, we were impressed by your academic record (8.73 CGPA), VLSI internship, and projects..."></textarea>
            </div>
            <div class="mail-actions-footer">
              <button type="submit" class="btn-send-mail">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                <span>Send Invitation (Mailto)</span>
              </button>
              <span class="mail-sent-msg" id="mail-sent-feedback" style="display: none;">Draft ready! Opening default email client...</span>
            </div>
          </form>
        </main>
      </div>
    `;
  }

  initListeners(container) {
    const form = container.querySelector('#placement-mail-form');
    const companyInput = container.querySelector('#mail-company');
    const subjectInput = container.querySelector('#mail-subject');
    const bodyInput = container.querySelector('#mail-body');
    const templates = container.querySelectorAll('.template-chip');
    const copyContactBtn = container.querySelector('#btn-copy-contact-all');
    const sentFeedback = container.querySelector('#mail-sent-feedback');

    templates.forEach(chip => {
      chip.addEventListener('click', () => {
        const type = chip.getAttribute('data-template');
        if (type === 'interview') {
          subjectInput.value = `Technical Interview Invitation - Campus Placements | Abhishek Kumar`;
          bodyInput.value = `Hi Abhishek,\n\nWe reviewed your academic profile (8.73 CGPA at IEM Kolkata), your VLSI internship at Jadavpur University, and your IEEE publication. We would love to invite you for a Technical Interview for our engineering team.\n\nPlease let us know your availability.\n\nBest regards,\nRecruitment Team`;
        } else if (type === 'embedded') {
          subjectInput.value = `Job Opportunity: Embedded Firmware / Systems Engineer - Abhishek Kumar`;
          bodyInput.value = `Hi Abhishek,\n\nYour work on the Embedded Night-Vision System, the Piezo-electric wearable, and your Vivado 7-state traffic controller is exceptional. We have an exciting role for an Embedded Firmware Engineer and believe you would be a strong fit.\n\nCould we schedule a call this week?\n\nWarm regards,\nTalent Acquisition`;
        } else if (type === 'software') {
          subjectInput.value = `SDE Opportunity: Software Engineering Team - Abhishek Kumar`;
          bodyInput.value = `Hi Abhishek,\n\nWe came across your portfolio and noted your proficiency in Python, C++, Django, and algorithms. We are hiring for our Software Development Engineering team.\n\nLet us know if you are open to discussing opportunities.\n\nBest regards,\nEngineering Hiring`;
        }
      });
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(subjectInput.value);
        const body = encodeURIComponent(bodyInput.value + `\n\nCompany: ` + companyInput.value);
        const mailtoUrl = `mailto:${resumeData.personal.email}?subject=${subject}&body=${body}`;

        sentFeedback.style.display = 'inline-block';
        setTimeout(() => {
          window.location.href = mailtoUrl;
        }, 300);
      });
    }

    if (copyContactBtn) {
      copyContactBtn.addEventListener('click', async () => {
        const contactInfo = `Abhishek Kumar\nEmail: ${resumeData.personal.email}\nPhone: ${resumeData.personal.phone}\nLinkedIn: ${resumeData.personal.linkedin}\nGitHub: ${resumeData.personal.github}`;
        await navigator.clipboard.writeText(contactInfo);
        copyContactBtn.textContent = 'Copied to Clipboard!';
        setTimeout(() => {
          copyContactBtn.textContent = 'Copy Contact Info';
        }, 2000);
      });
    }
  }
}
