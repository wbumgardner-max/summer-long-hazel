# Summer Long Hazel — on/off switch

The site has three modes, set by `SITE_MODE` in `site-mode.js`. That file loads first on
`/` and `/admin/`, before any tournament data or app code.

- `'off'` (current): a single farewell page — logo, "Thanks for playin’." and "See ya next year."
  `data.js`, `archive-scores.js` and `app.js` are never loaded, so there is no navigation,
  no Google Sheet polling or writes, no payment links and no admin view (on `/admin/` too).
- `'archived'`: read-only 2026 results from `archive-scores.js` (final score snapshot).
  No Google Sheet calls; Submit Score, Pay Entry and Admin are hidden.
- `'live'`: full functionality. Scores sync from and write to the shared Google Sheet
  through the Apps Script URL in `app.js` (`SCORE_API_URL`).

## Switch back on
1. In `site-mode.js`, set `var SITE_MODE = 'live';` (or `'archived'` for read-only results).
2. Bump `site-mode.js?v=` in both `index.html` and `admin/index.html` so browsers fetch the new switch.
3. Make sure the Google Sheet and its Apps Script web app still exist (both free).
   If they were deleted, redeploy the Apps Script and update `SCORE_API_URL` in `app.js`.
4. Commit to `main`; GitHub Pages redeploys in about a minute. Check `/` and `/admin/`.

For a new season, reset teams/flights/dates in `data.js` and clear the Sheet's match rows.

## What "off" does not do
- It only changes what newly loaded pages show. A browser tab that was already open on the
  old live site keeps its old code until reloaded, and can still poll or submit to the Sheet.
- The Google Sheet and Apps Script backend are untouched and still accept requests at
  `SCORE_API_URL`. Turning the backend off is a separate step (Apps Script → Deploy → Manage
  deployments → archive), which also breaks `'live'` mode until it is redeployed.
- The repo is public, so the code and `data.js` remain readable on GitHub and as raw files.
- Old commit previews (for example rawcdn.githack.com links to a past commit) still show that commit.
- Visitors with JavaScript disabled see the static page shell with no working controls.

## Hosting and domain
- Hosting is GitHub Pages (free). Free URL: https://wbumgardner-max.github.io/summer-long-hazel
- Custom domain `cgcsummerlonghazel.com` (Namecheap) is paid through 2027-04-02; turning the
  site off does not cancel or change it. If it lapses, delete `CNAME` (or clear the custom
  domain in repo Settings → Pages) so the free URL serves the site.

## Restore points
- Git tag `hazel-2026-live`: the exact live site before the archive/off switch.
- `archive-scores.js`: final 2026 score snapshot used by `'archived'` mode.
