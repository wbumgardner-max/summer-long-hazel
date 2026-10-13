# Summer Long Hazel — on/off switch

The site has two modes, set by `SITE_MODE` in `data.js`.

- `'archived'` (current): read-only 2026 results loaded from `archive-scores.js`.
  No Google Sheet calls; Submit Score, Pay Entry and Admin are hidden.
- `'live'`: full functionality. Scores sync from and write to the shared Google Sheet
  through the Apps Script URL in `app.js` (`SCORE_API_URL`).

## Switch back on
1. In `data.js`, set `const SITE_MODE = 'live';` and bump `data.js?v=` in `index.html`.
2. Make sure the Google Sheet and its Apps Script web app still exist (both free).
   If they were deleted, redeploy the Apps Script and update `SCORE_API_URL`.
3. Commit to `main`; GitHub Pages redeploys in about a minute.

For a new season, reset teams/flights/dates in `data.js` and clear the Sheet's match rows.

## Hosting and domain
- Hosting is GitHub Pages (free). Free URL: https://wbumgardner-max.github.io/summer-long-hazel
- Custom domain `cgcsummerlonghazel.com` (Namecheap) is paid through 2027-04-02.
  If it lapses, delete `CNAME` (or clear the custom domain in repo Settings → Pages)
  so the free URL serves the site.

## Restore points
- Git tag `hazel-2026-live`: the exact live site before the archive switch.
