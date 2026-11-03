// ============================================================
//  DONATE SETTINGS — the ONLY places you need to edit.
//  1) Paste ACC's payment link between the quotes below.
//  2) If that link is one-time only (PayBox / Bit), set
//     DONATE_SUPPORTS_MONTHLY to false — the Monthly toggle
//     on the Donate page will hide itself.
// ============================================================
const DONATE_LINK = "https://ko-fi.com/aischarityconnections";
const DONATE_SUPPORTS_MONTHLY = true;

// Mobile menu
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Soft shadow under the header once the page scrolls
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Reveal on scroll — blocks fade/slide in as they enter the screen
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

// Donate: amount + frequency picker, and the Donate button (Donate page only)
let donateAmount = 50;
let donateFrequency = 'once'; // 'once' or 'monthly'
const donateBtn = document.getElementById('donateNowBtn');
const donateNote = document.getElementById('donateNote');

function updateDonateButton() {
  if (!donateBtn) return;
  donateBtn.textContent = donateFrequency === 'monthly'
    ? `Donate ₪${donateAmount} / month`
    : `Donate ₪${donateAmount}`;
}
document.querySelectorAll('.amount-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    donateAmount = btn.dataset.amount;
    updateDonateButton();
  });
});
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    donateFrequency = btn.dataset.frequency;
    updateDonateButton();
  });
});
// One-time-only payment link? Hide the Monthly toggle entirely.
if (!DONATE_SUPPORTS_MONTHLY) {
  const toggle = document.querySelector('.donate-toggle');
  if (toggle) toggle.style.display = 'none';
  donateFrequency = 'once';
}
if (donateBtn) {
  updateDonateButton();
  if (DONATE_LINK) {
    // Add https:// if it was pasted without one, so the browser treats it as an external site
    donateBtn.href = /^https?:\/\//i.test(DONATE_LINK) ? DONATE_LINK : 'https://' + DONATE_LINK;
    donateBtn.target = '_blank';
    donateBtn.rel = 'noopener';
  } else if (donateNote) {
    // No link yet: don't send donors nowhere — point them to the Join page form instead.
    donateNote.textContent = 'Online donations open soon — to donate now, message us using the form on the Join page.';
    donateBtn.href = 'join.html';
  }
}

// ============================================================
//  CONTACT FORM (Join page) — messages go to CONTACT_EMAIL.
//  The site has no server, so on submit the form opens the
//  visitor's email app with a message already addressed to
//  CONTACT_EMAIL and filled in from the form — the visitor
//  just presses Send there.
// ============================================================
const CONTACT_EMAIL = 'aischarityconnections@gmail.com';

const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('ACC website message from ' + data.get('name'));
    const body = encodeURIComponent('Name: ' + data.get('name') + '\n' + 'Email: ' + data.get('email') + '\n\n' + data.get('message'));
    window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;
    if (formNote) formNote.textContent = 'Opening your email app — your message is addressed to ACC at ' + CONTACT_EMAIL + ', just press Send there.';
  });
}

// ============================================================
//  KO-FI BUTTONS — the site draws Ko-fi's own button into the
//  header (every page) plus the hero and CTA banner on some
//  pages, styled to match ACC's own buttons (same gradient,
//  font, pill shape and sizes; white on the CTA banner). Two
//  Ko-fi quirks are handled here: its widget only ever
//  reveals the FIRST button it places on a page, and its
//  button styling lives inside the button's iframe, so the
//  ACC look is injected into each button iframe.
// ============================================================
(function () {
  const KOFI_BUTTON_BASE =
    ".floatingchat-donate-button{background:linear-gradient(135deg,#13C2B2,#0A9E93)!important;" +
    "font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif!important;font-weight:700!important;line-height:1.65!important;" +
    "border-radius:999px!important;box-shadow:0 8px 20px rgba(11,165,150,.28)!important;height:auto!important;" +
    "justify-content:center!important;gap:8px!important;transition:transform .25s ease,box-shadow .25s ease!important}" +
    ".floatingchat-donate-button::before{content:'♥'}" +
    ".floatingchat-donate-button:hover{transform:translateY(-2px)!important}" +
    ".floatingchat-donate-button span{margin-left:0!important}" +
    ".kofiimg{display:none!important}";
  const KOFI_BUTTON_CSS = {
    accnav: ".floatingchat-donate-button{padding:13px 30px!important;font-size:16px!important}" +
      "body{width:100%!important;display:flex!important;justify-content:flex-end!important}",
    acchero: ".floatingchat-donate-button{padding:15px 24px!important;font-size:16px!important}",
    acccta: ".floatingchat-donate-button{padding:16px 36px!important;font-size:17.6px!important;background:#fff!important;box-shadow:0 10px 24px rgba(0,0,0,.18)!important}" +
      ".floatingchat-donate-button span{color:#0F2A44!important}" +
      ".floatingchat-donate-button::before{color:#0F2A44!important}" +
      "body{width:100%!important;display:flex!important;justify-content:center!important}"
  };

  function styleKofiButtons() {
    Object.keys(KOFI_BUTTON_CSS).forEach(cssId => {
      ['kofi-wo-container' + cssId, 'kofi-wo-container-mobi' + cssId].forEach(frameId => {
        const frame = document.getElementById(frameId);
        if (!frame) return;
        try {
          const doc = frame.contentDocument;
          if (!doc || !doc.querySelector('.floatingchat-donate-button') || doc.getElementById('accKofiStyle')) return;
          const style = doc.createElement('style');
          style.id = 'accKofiStyle';
          style.textContent = KOFI_BUTTON_BASE + KOFI_BUTTON_CSS[cssId];
          doc.head.appendChild(style);
        } catch (err) { /* iframe not ready yet — the poller retries */ }
      });
    });
  }

  let tries = 0;
  const revealTimer = setInterval(() => {
    tries++;
    document.querySelectorAll('.floatingchat-container-wrap, .floatingchat-container-wrap-mobi').forEach(wrap => {
      if (wrap.style.height === '0px') wrap.style.cssText = 'z-index:10000;';
    });
    styleKofiButtons();
    if (tries >= 24) clearInterval(revealTimer);
  }, 300);
})();

// ============================================================
//  KO-FI PANELS — Ko-fi's widget is built for ONE button per
//  page: with several, its panel close (x) button stops
//  working and panels stack on top of each other. This
//  manager watches the panels, keeps at most one open, and
//  adds a working close button. Closing re-clicks the panel's
//  own Ko-fi button — the same toggle a second click on the
//  button performs — so Ko-fi's own state stays consistent.
// ============================================================
(function () {
  const closeBtn = document.createElement('button');
  closeBtn.id = 'accKofiClose';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Close donation panel');
  closeBtn.textContent = '✕';
  closeBtn.style.cssText = 'position:fixed;top:77px;right:5px;width:28px;height:28px;border-radius:50%;' +
    'border:0;background:#fff;color:#111;font-weight:700;font-size:15px;line-height:28px;text-align:center;cursor:pointer;' +
    'box-shadow:0 4px 14px rgba(15,42,68,.25);z-index:2147483647;display:none;padding:0';
  document.body.appendChild(closeBtn);

  function popupOpen(popup) {
    const r = popup.getBoundingClientRect();
    const cs = getComputedStyle(popup);
    return r.height > 50 && r.bottom > 10 && cs.display !== 'none' && cs.visibility !== 'hidden';
  }
  function openPopups() {
    return Array.from(document.querySelectorAll('.floating-chat-kofi-popup-iframe, .floating-chat-kofi-popup-iframe-mobi')).filter(popupOpen);
  }
  function closePopup(popup) {
    const scope = popup.closest('.floatingchat-container-wrap, .floatingchat-container-wrap-mobi') || popup.closest('.kofi-slot');
    if (scope) {
      const frame = scope.querySelector('iframe[id^="kofi-wo-container"]');
      try {
        const btn = frame && frame.contentDocument && frame.contentDocument.querySelector('.floatingchat-donate-button');
        if (btn) { btn.click(); return; }
      } catch (err) { /* button iframe not ready — fall through */ }
    }
    popup.style.display = 'none';
  }

  let currentOpen = null;
  let prevOpen = [];
  closeBtn.addEventListener('click', () => { if (currentOpen) closePopup(currentOpen); });
  setInterval(() => {
    const open = openPopups();
    if (open.length > 1) {
      const newest = open.find(p => !prevOpen.includes(p)) || open[open.length - 1];
      open.forEach(p => { if (p !== newest) closePopup(p); });
      currentOpen = newest;
    } else {
      currentOpen = open[0] || null;
    }
    prevOpen = open;
    closeBtn.style.display = currentOpen ? 'block' : 'none';
  }, 300);
})();
