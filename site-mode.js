// Summer Long Hazel - site switch. Loaded first on every page, before any data or app code.
//   'off'      = farewell page only. Tournament data, app code, Google Sheet calls and payment links never load.
//   'archived' = read-only 2026 results from archive-scores.js (no Google Sheet calls)
//   'live'     = full functionality: live score sync, Submit Score, Pay Entry, Admin
// See SWITCH-ON.md to turn the site back on.
var SITE_MODE = 'off';

// Writes the page's data/app scripts in order, unless the site is off.
function loadSiteScripts(sources) {
    if (SITE_MODE === 'off') return;
    sources.forEach(src => document.write('<script src="' + src + '"><\/script>'));
}

(function showFarewellWhenOff() {
    if (SITE_MODE !== 'off') return;

    const logoSrc = new URL('slh-logo.svg', document.currentScript.src).href;
    const style = document.createElement('style');
    style.textContent = `
        html.site-off body { visibility: hidden; }
        html.site-off body.farewell-ready { visibility: visible; margin: 0; padding: 0; max-width: none; background: #1a3020; }
        .farewell {
            min-height: 100vh; min-height: 100dvh;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            gap: 1rem; padding: 2rem 1.25rem; box-sizing: border-box; text-align: center;
            background: linear-gradient(135deg, #1a3020 0%, #234028 100%); color: #f5f0e6;
        }
        .farewell img { width: min(520px, 90vw); height: auto; margin-bottom: 1rem; }
        .farewell h1 { margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: clamp(2rem, 8vw, 3.25rem); }
        .farewell p { margin: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: clamp(1.1rem, 4.5vw, 1.5rem); }
    `;
    document.head.appendChild(style);
    document.documentElement.classList.add('site-off');

    function render() {
        document.title = 'The Summer Long Hazel';
        const page = document.createElement('div');
        page.className = 'farewell';
        const logo = document.createElement('img');
        logo.src = logoSrc;
        logo.alt = 'The Summer Long Hazel';
        const thanks = document.createElement('h1');
        thanks.textContent = 'Thanks for playin’.';
        const later = document.createElement('p');
        later.textContent = 'See ya next year.';
        page.append(logo, thanks, later);
        document.body.replaceChildren(page);
        document.body.className = 'farewell-ready';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render, { once: true });
    } else {
        render();
    }
})();
