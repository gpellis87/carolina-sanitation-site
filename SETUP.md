# Carolina Sanitation — Owner Setup Checklist

Before the site goes live, complete these four steps. Each takes 5–10 minutes.

---

## 1. Stripe Payment Link (Event Bookings)

1. Log in to your Stripe account (or create one at stripe.com — it's free to sign up).
2. Go to **Products → Payment Links → New**.
3. Add a product: "Weekend Event Porta-John Rental" — price **$165.00 USD**.
4. Under **Tax**: enable **Stripe Tax** and set your region to **North Carolina**. Stripe will automatically calculate and add NC sales tax at checkout.
5. Under **Custom fields**, add:
   - "Event Date" (text)
   - "Delivery Address" (text)
   - "Number of Units" (dropdown: 1, 2, 3, 4, 5+)
   - "On-site Contact Phone" (phone)
6. Under **Customer information**: collect phone number.
7. Click **Create link** — copy the URL (looks like `https://buy.stripe.com/xxxxx`).

**Then:** Open `book.html` and replace the text `STRIPE_PAYMENT_LINK_HERE` with your copied Stripe URL.
Search for: `STRIPE_PAYMENT_LINK_HERE`

---

## 2. Web3Forms (Contact & Reservation Forms)

The construction and permanent inquiry forms post to Web3Forms, which emails you when someone submits.

1. Go to **web3forms.com** and sign up (free).
2. Create a new form — enter the email address where you want to receive submissions.
3. Copy your **Access Key** (looks like `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).

**Then:** Open `book.html` and replace **both** instances of `YOUR_WEB3FORMS_ACCESS_KEY` with your actual key.
Search for: `YOUR_WEB3FORMS_ACCESS_KEY` (appears twice — once for the construction form, once for the permanent form).

---

## 3. hCaptcha (Spam Protection)

Web3Forms handles hCaptcha automatically when you load `https://web3forms.com/client/script.js` — no extra setup needed for the default captcha. If you want to use your own hCaptcha site key for custom branding:
- Sign up at hcaptcha.com
- Add `data-sitekey="YOUR_SITEKEY"` to the `.h-captcha` divs in `book.html`

For most small businesses the default Web3Forms captcha is fine.

---

## 4. Analytics (Optional but recommended)

The site is ready for **Umami Analytics** (privacy-friendly, no cookie banner needed):
1. Go to **cloud.umami.is** — create an account and add your site.
2. Copy the `<script>` tag Umami gives you.
3. Paste it before `</head>` in `index.html` and `book.html`.

Or use Google Analytics if you prefer — paste the GA4 `gtag` snippet the same way.

---

## 5. Domain & Hosting

The site is pure static HTML — it can be hosted anywhere:
- **Netlify** (free tier, drag-and-drop deploy): netlify.com
- **Cloudflare Pages** (free, fast CDN): pages.cloudflare.com
- **Your current host** for Redline (ask Ellis Local)

Once deployed, point `sanitationcarolina.com` (or your chosen domain) to the host.

**Find-and-replace after domain is confirmed:**  
Search the site for `https://sanitationcarolina.com` and replace with your final domain.
Affected files: `index.html`, `book.html`, `sitemap.xml`, all `/services/` and `/locations/` pages.

---

## Quick Test Checklist

- [ ] Open `index.html` in a browser — hero loads, photos display, nav shrinks on scroll
- [ ] Click "Book for an Event" → lands on `book.html#event` → Stripe button goes to checkout
- [ ] Switch to "Construction" tab → fill and submit form → you receive the email
- [ ] On mobile: sticky bar appears at bottom with call + book buttons
- [ ] Service area chips link correctly to location pages
