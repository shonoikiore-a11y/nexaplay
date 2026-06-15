const fs = require('fs');

// ─── SOURCES ───────────────────────────────────────────────────────────────
// Map each HTML file to its BloxZone scrape URL
const GAMES = [
  {
    file: 'all-star-tower-defense-codes.html',
    url: 'https://bloxz.one/game-codes/all-star-tower-defense',
    fallbackCodes: [
      { code: 'Sub2MobileOF', reward: 'Free Gems' },
      { code: 'LegendaryCode', reward: 'Free Gems + Stardust' },
      { code: '1BILVISITS', reward: 'Free Gems' },
    ]
  },
  {
    file: 'anime-adventures-codes.html',
    url: 'https://bloxz.one/game-codes/anime-adventures',
    fallbackCodes: [
      { code: 'RELEASE', reward: 'Free Gems' },
      { code: 'THANKYOU', reward: 'Free Gems' },
    ]
  },
  {
    file: 'anime-defenders-codes.html',
    url: 'https://bloxz.one/game-codes/anime-defenders',
    fallbackCodes: [
      { code: 'LAUNCH', reward: 'Free Gems' },
    ]
  },
  {
    file: 'anime-fighting-simulator-x-codes.html',
    url: 'https://bloxz.one/game-codes/anime-fighting-simulator-x',
    fallbackCodes: [
      { code: 'AFSX', reward: 'Free Yen' },
    ]
  },
  {
    file: 'anime-vanguards-codes.html',
    url: 'https://bloxz.one/game-codes/anime-vanguards',
    fallbackCodes: [
      { code: 'VANGUARD', reward: 'Free Gems' },
    ]
  },
  {
    file: 'bee-swarm-simulator-codes.html',
    url: 'https://bloxz.one/game-codes/bee-swarm-simulator',
    fallbackCodes: [
      { code: 'BEESMAS', reward: 'Free Honey' },
    ]
  },
  {
    file: 'blox-fruits-codes.html',
    url: 'https://bloxz.one/game-codes/blox-fruits',
    fallbackCodes: [
      { code: 'BIGNEWS', reward: 'Free XP Boost' },
      { code: 'ADMIN_CENA', reward: 'Free XP Boost' },
    ]
  },
  {
    file: 'blue-lock-rivals-codes.html',
    url: 'https://bloxz.one/game-codes/blue-lock-rivals',
    fallbackCodes: [
      { code: 'BLUELOCKLAUNCH', reward: 'Free Coins' },
    ]
  },
  {
    file: 'demon-piece-codes.html',
    url: 'https://bloxz.one/game-codes/demon-piece',
    fallbackCodes: [
      { code: 'DEMONLAUNCH', reward: 'Free Gems' },
    ]
  },
  {
    file: 'fruit-battlegrounds-codes.html',
    url: 'https://bloxz.one/game-codes/fruit-battlegrounds',
    fallbackCodes: [
      { code: 'FRUITSEASON', reward: 'Free Tokens' },
    ]
  },
  {
    file: 'grand-piece-online-codes.html',
    url: 'https://bloxz.one/game-codes/grand-piece-online',
    fallbackCodes: [
      { code: 'GPO2024', reward: 'Free Gems' },
    ]
  },
  {
    file: 'jailbreak-codes.html',
    url: 'https://bloxz.one/game-codes/jailbreak',
    fallbackCodes: [
      { code: 'JAILBREAK', reward: 'Free Cash' },
    ]
  },
  {
    file: 'king-legacy-codes.html',
    url: 'https://bloxz.one/game-codes/king-legacy',
    fallbackCodes: [
      { code: 'KINGGEM', reward: 'Free Gems' },
    ]
  },
  {
    file: 'murder-mystery-2-codes.html',
    url: 'https://bloxz.one/game-codes/murder-mystery-2',
    fallbackCodes: [
      { code: 'COMB4T2', reward: 'Free Knife' },
    ]
  },
  {
    file: 'my-hero-mania-codes.html',
    url: 'https://bloxz.one/game-codes/my-hero-mania',
    fallbackCodes: [
      { code: 'PLUSULTRA', reward: 'Free Spins' },
    ]
  },
];

// ─── SCRAPER ────────────────────────────────────────────────────────────────
async function fetchCodes(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NexaPlayBot/1.0)'
      }
    });
    if (!res.ok) return null;
    const html = await res.text();

    // Extract codes from the page - look for patterns like code text in tables or lists
    const activeCodes = [];
    const expiredCodes = [];

    // Match code patterns - BloxZone typically shows codes in structured format
    // Look for code entries: usually in <td> or <li> elements
    const codePattern = /([A-Z0-9_!]+)\s*(?:<[^>]+>)*\s*[-–]\s*([^<\n]+)/gi;
    const matches = [...html.matchAll(codePattern)];

    // Also try to find JSON data embedded in the page
    const jsonMatch = html.match(/"codes"\s*:\s*(\[[\s\S]*?\])/);
    if (jsonMatch) {
      try {
        const codes = JSON.parse(jsonMatch[1]);
        codes.forEach(c => {
          if (c.active !== false) {
            activeCodes.push({ code: c.code || c.name, reward: c.reward || c.description || 'Free Reward' });
          } else {
            expiredCodes.push({ code: c.code || c.name, reward: c.reward || c.description || 'Expired' });
          }
        });
        if (activeCodes.length > 0) return { activeCodes, expiredCodes };
      } catch (e) {}
    }

    return null;
  } catch (e) {
    console.log(`Failed to fetch ${url}: ${e.message}`);
    return null;
  }
}

// ─── HTML UPDATER ────────────────────────────────────────────────────────────
function updateHTMLFile(filePath, activeCodes, expiredCodes) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return false;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Build new code arrays as JS
  const activeStr = JSON.stringify(activeCodes, null, 6)
    .replace(/"code":/g, 'code:')
    .replace(/"reward":/g, 'reward:');

  const expiredStr = JSON.stringify(expiredCodes, null, 6)
    .replace(/"code":/g, 'code:')
    .replace(/"reward":/g, 'reward:');

  // Replace the activeCodes array
  html = html.replace(
    /const activeCodes\s*=\s*\[[\s\S]*?\];/,
    `const activeCodes = ${activeStr};`
  );

  // Replace the expiredCodes array
  html = html.replace(
    /const expiredCodes\s*=\s*\[[\s\S]*?\];/,
    `const expiredCodes = ${expiredStr};`
  );

  // Update the "Last checked" date
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  html = html.replace(
    /<strong style="color:var\(--white\)">[^<]+<\/strong>\s*\n\s*<span>Last checked<\/span>/,
    `<strong style="color:var(--white)">${today}</strong>\n          <span>Last checked</span>`
  );

  // Update the "Updated" date in article-meta-top
  const fullDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  html = html.replace(
    /Updated [A-Za-z]+ \d+, \d{4}/,
    `Updated ${fullDate}`
  );

  // Update month in h1 title
  const monthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  html = html.replace(
    /\((?:January|February|March|April|May|June|July|August|September|October|November|December) \d{4}\)/g,
    `(${monthYear})`
  );

  fs.writeFileSync(filePath, html, 'utf8');
  return true;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`🚀 NexaPlay Code Updater — ${new Date().toISOString()}`);
  let updatedCount = 0;

  for (const game of GAMES) {
    console.log(`\n📋 Processing: ${game.file}`);

    // Try to scrape live codes
    const scraped = await fetchCodes(game.url);
    const activeCodes = (scraped && scraped.activeCodes.length > 0)
      ? scraped.activeCodes
      : game.fallbackCodes;
    const expiredCodes = (scraped && scraped.expiredCodes.length > 0)
      ? scraped.expiredCodes
      : [];

    console.log(`   ✅ Active: ${activeCodes.length} codes`);
    console.log(`   ❌ Expired: ${expiredCodes.length} codes`);
    console.log(`   📡 Source: ${scraped ? 'Live scrape' : 'Fallback codes'}`);

    const updated = updateHTMLFile(game.file, activeCodes, expiredCodes);
    if (updated) {
      updatedCount++;
      console.log(`   💾 Saved!`);
    }

    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 500));
  }

  // Write a log file
  fs.writeFileSync('last-updated.txt',
    `Last updated: ${new Date().toUTCString()}\nFiles updated: ${updatedCount}/${GAMES.length}\n`
  );

  console.log(`\n✅ Done! Updated ${updatedCount}/${GAMES.length} files.`);
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
