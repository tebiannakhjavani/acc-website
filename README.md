# ACC — AIS Charity Connections

A simple static website — now MULTI-PAGE (updated Oct 29). No build step, no backend, nothing to install. Each section is its own page; the menu links to real pages, not scroll anchors. Pages cross-fade smoothly when you click between them, and blocks fade in as you scroll.

## Files

```
acc-website/
  index.html      <- Home page (hero, intro, stats, featured fundraiser, donate banner)
  about.html      <- About ACC
  impact.html     <- Impact stats + How It Works
  events.html     <- Fundraisers & Events
  charities.html  <- Charities We Support
  team.html       <- Meet the Team
  gallery.html    <- Gallery
  donate.html     <- Donate (the donation box; its link is set in script.js)
  join.html       <- Get Involved + contact form
  styles.css      <- colours, layout, design (shared by every page)
  script.js       <- mobile menu, reveal-on-scroll, donate picker (shared by every page)
  images/
    logo.png      <- your logo (top bar on every page + browser tab icon)
    hero.jpg
    team/
      adam-grayson.jpg
      tebian-nakhjavani.jpg
      william-saberin.jpg
      chloe-kim.jpg
      rozalie-podzimkova.jpg
    events/
      fundraiser-1.jpg
      fundraiser-2.jpg
      fundraiser-3.jpg
    gallery/
      gallery-1.jpg
      gallery-2.jpg
      gallery-3.jpg
      gallery-4.jpg
      gallery-5.jpg
      gallery-6.jpg
```

## How to use it in Cursor

1. Unzip the folder, then in Cursor: File > Open Folder > choose `acc-website`.
2. To preview: right-click `index.html` and open it in your browser (or drag the file into Chrome).
3. To edit text: open `index.html`, search for the word you want to change, type the new text, save.

## How to add your real photos (no code changes)

Every photo in the folder right now is a placeholder. To use a real photo:

1. Rename your real photo to EXACTLY the placeholder's filename — same spelling, same `.jpg`.
   - Example: Tebian's photo must be named `tebian-nakhjavani.jpg`
2. Drop it into the same folder as the placeholder, replacing it.
   - Team photos go in `images/team/`, events in `images/events/`, gallery in `images/gallery/`, hero at `images/hero.jpg`
3. Refresh the page in your browser. Done — no code edits needed.

Rules for filenames: all lowercase, hyphens instead of spaces, no capital letters. If your photo is a `.png` or `.heic`, convert it to `.jpg` first (Preview on Mac: open > File > Export > JPEG).

Photo tips: team photos work best square / portrait and cropped at the same size for everyone. Hero and event photos work best landscape.

## Placeholders still to replace in index.html

Search `index.html` for `[` to find them all:
- Fundraiser names, dates, and descriptions (Events section)
- Charity names and descriptions (Charities section)
- `₪999` — the placeholder total raised, used in Impact and on the event cards

## Turning on the Donate button

The site has Donate buttons in the top bar and hero, plus a Donate section with One-time / Monthly options and ₪25 / ₪50 / ₪100 / ₪250 amounts.

ACC does not have a collection method yet (confirmed Oct 29). The button needs ONE real payment link, and the account should be the one the club/school has agreed for ACC money — not a personal account. Decide in this order:

1. **School / club advisor first (best).** Ask whether ACC can collect through the school, or whether an advisor should hold the account. This decides who the account holder is, and it is the most trusted setup for donors.
2. **PayBox group (best local DIY option).** An adult (advisor/parent) creates a PayBox group collection for ACC and shares its link. Made for group collections in Israel, free, everyone can see the collection. One-time only — no automatic monthly donations — and PayBox has balance/transfer limits, fine for school-scale fundraising.
3. **Bit payment request / group.** Also local and easy, but it is a personal payment app, has receiving limits, and also does not support recurring donations.
4. **For real monthly donations: link straight to the charity.** If monthly giving matters most, point the Donate button at the current charity partner's own donation page on JGive or IsraelGives instead of collecting to ACC. Those platforms handle recurring donations and issue Section 46 tax receipts, and ACC never touches the money. Trade-off: the money goes directly to the charity, not through ACC's total.
5. **Not Stripe.** Stripe has no normal Israeli signup for a local club — getting an account from Israel usually means forming a foreign company first. Not worth it for ACC.

To switch it on:

1. Create the payment link using one of the options above.
2. Open `script.js` in Cursor. At the very top, paste the link between the quotes:
   `const DONATE_LINK = "paste-your-link-here";`
3. If your link is one-time only (PayBox/Bit), also set `const DONATE_SUPPORTS_MONTHLY = false;` right under it — that hides the Monthly toggle on the site so donors are not promised something the link cannot do.
4. Save. Every Donate button now opens that link in a new tab.

Until you do this, the Donate button says donations open soon and scrolls people to the contact form — it never sends donors to a dead link. Note: the amount picker on the site is visual; the actual amount a donor pays is set on the payment link's page, so make your payment link a "donor chooses the amount" link if you can.

## Publishing later

Drag the whole `acc-website` folder onto Netlify Drop (app.netlify.com/drop) to get a live link, the same way the demo sites are hosted. Publish only when the real photos, totals, and charity names are in.
