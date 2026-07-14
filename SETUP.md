# Carolina Sanitation — Owner Setup Checklist

Before the site goes live, complete these steps. Each takes 5–10 minutes.

There is no online payment step — events, construction, and permanent/other requests all go through
one request form on `book.html`. Event payment is collected at delivery or pickup (cash, card, or check).

---

## 1. Web3Forms (Booking & Reservation Form)

`book.html` has a single request form (shared by the Event / Construction / Permanent tabs) that posts
to Web3Forms, which emails you when someone submits.

1. Go to **web3forms.com** and sign up (free).
2. Create a new form — enter the email address where you want to receive submissions.
3. Copy your **Access Key** (looks like `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).

**Then:** Open `book.html` and replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual key.
Search for: `YOUR_WEB3FORMS_ACCESS_KEY` (appears once — the form's `access_key` hidden field).

---

## 2. hCaptcha (Spam Protection)

Web3Forms handles hCaptcha automatically when you load `https://web3forms.com/client/script.js` — no extra setup needed for the default captcha. If you want to use your own hCaptcha site key for custom branding:
- Sign up at hcaptcha.com
- Add `data-sitekey="YOUR_SITEKEY"` to the `.h-captcha` divs in `book.html`

For most small businesses the default Web3Forms captcha is fine.

---

## 3. Analytics (Optional but recommended)

The site is ready for **Umami Analytics** (privacy-friendly, no cookie banner needed):
1. Go to **cloud.umami.is** — create an account and add your site.
2. Copy the `<script>` tag Umami gives you.
3. Paste it before `</head>` in `index.html` and `book.html`.

Or use Google Analytics if you prefer — paste the GA4 `gtag` snippet the same way.

---

## 4. Domain & Hosting

The site is pure static HTML — it can be hosted anywhere:
- **Netlify** (free tier, drag-and-drop deploy): netlify.com
- **Cloudflare Pages** (free, fast CDN): pages.cloudflare.com
- **Your current host** for Redline (ask Ellis Local)

Once deployed, point `carolinasanitationnc.com` (or your chosen domain) to the host.

**Find-and-replace after domain is confirmed:**  
Search the site for `https://carolinasanitationnc.com` and replace with your final domain.
Affected files: `index.html`, `book.html`, `sitemap.xml`, all `/services/` and `/locations/` pages.

---

## Quick Test Checklist

- [ ] Open `index.html` in a browser — hero loads, photos display, nav shrinks on scroll
- [ ] Click "Book Now" → lands on `book.html` → "Weekend Event" tab is selected by default
- [ ] Fill and submit the Event form → you receive the email → success message shows
- [ ] Switch to "Construction" tab → confirm fields change → fill and submit → you receive the email
- [ ] Switch to "Permanent / Other" tab → confirm fields change → fill and submit → you receive the email
- [ ] On mobile: sticky bar appears at bottom with call + book buttons
- [ ] Service area chips link correctly to location pages
