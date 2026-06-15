
const fs = require('fs');

const GAMES = [
  {
    file: 'all-star-tower-defense-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/all-star-tower-defense/codes',
    fallbackCodes: [
      { code: 'twete93dont', reward: '140 Stardust + 2,000 Gems' },
      { code: 'omgupdate2026', reward: '170 Stardust + 2,700 Gems' },
    ]
  },
  {
    file: 'anime-adventures-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/anime-adventures/codes',
    fallbackCodes: [
      { code: 'RELEASE', reward: 'Free Gems' },
    ]
  },
  {
    file: 'anime-defenders-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/anime-defenders/codes',
    fallbackCodes: [
      { code: 'LAUNCH', reward: 'Free Gems' },
    ]
  },
  {
    file: 'anime-fighting-simulator-x-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/anime-fighting-simulator/codes',
    fallbackCodes: [
      { code: 'AFSX', reward: 'Free Yen' },
    ]
  },
  {
    file: 'anime-vanguards-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/anime-vanguards/codes',
    fallbackCodes: [
      { code: 'VANGUARD', reward: 'Free Gems' },
    ]
  },
  {
    file: 'bee-swarm-simulator-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/bee-swarm-simulator/codes',
    fallbackCodes: [
      { code: 'BEESMAS', reward: 'Free Honey' },
    ]
  },
  {
    file: 'blox-fruits-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/blox-fruits/codes',
    fallbackCodes: [
      { code: 'BIGNEWS', reward: 'Free XP Boost' },
    ]
  },
  {
    file: 'blue-lock-rivals-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/blue-lock-rivals/codes',
    fallbackCodes: [
      { code: 'BLUELOCKLAUNCH', reward: 'Free Coins' },
    ]
  },
  {
    file: 'demon-piece-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/demon-piece/codes',
    fallbackCodes: [
      { code: 'DEMONLAUNCH', reward: 'Free Gems' },
    ]
  },
  {
    file: 'fruit-battlegrounds-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/fruit-battlegrounds/codes',
    fallbackCodes: [
      { code: 'FRUITSEASON', reward: 'Free Tokens' },
    ]
  },
  {
    file: 'grand-piece-online-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/grand-piece-online/codes',
    fallbackCodes: [
      { code: 'GPO2024', reward: 'Free Gems' },
    ]
  },
  {
    file: 'jailbreak-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/jailbreak/codes',
    fallbackCodes: [
      { code: 'JAILBREAK', reward: 'Free Cash' },
    ]
  },
  {
    file: 'king-legacy-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/king-legacy/codes',
    fallbackCodes: [
      { code: 'KINGGEM', reward: 'Free Gems' },
    ]
  },
  {
    file: 'murder-mystery-2-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/murder-mystery-2/codes',
    fallbackCodes: [
      { code: 'COMB4T2', reward: 'Free Knife' },
    ]
  },
  {
    file: 'my-hero-mania-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/my-hero-mania/codes',
    fallbackCodes: [
      { code: 'PLUSULTRA', reward: 'Free Spins' },
    ]
  },
  {
    file: 'peroxide-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/peroxide/codes',
    fallbackCodes: [
      { code: 'PEROXIDELAUNCH', reward: 'Free Rewards' },
    ]
  },
  {
    file: 'pet-simulator-99-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/pet-simulator-99/codes',
    fallbackCodes: [
      { code: 'PETSIM99', reward: 'Free Diamonds' },
    ]
  },
  {
    file: 'pet-simulator-x-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/pet-simulator-x/codes',
    fallbackCodes: [
      { code: 'PETSIMX', reward: 'Free Diamonds' },
    ]
  },
  {
    file: 'project-slayers-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/project-slayers/codes',
    fallbackCodes: [
      { code: 'SLAYERLAUNCH', reward: 'Free Spins' },
    ]
  },
  {
    file: 'shindo-life-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/shindo-life/codes',
    fallbackCodes: [
      { code: 'SHINDOCODE', reward: 'Free Spins' },
    ]
  },
  {
    file: 'sols-rng-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/sols-rng/codes',
    fallbackCodes: [
      { code: 'SOLSLAUNCH', reward: 'Free Rolls' },
    ]
  },
  {
    file: 'strongest-battlegrounds-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/strongest-battlegrounds/codes',
    fallbackCodes: [
      { code: 'STRONGLAUNCH', reward: 'Free Gems' },
    ]
  },
  {
    file: 'type-soul-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/type-soul/codes',
    fallbackCodes: [
      { code: 'TYPESOUL', reward: 'Free Spins' },
    ]
  },
  {
    file: 'vv-ultimatum-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/vv-ultimatum/codes',
    fallbackCodes: [
      { code: 'VVLAUNCH', reward: 'Free Rewards' },
    ]
  },
  {
    file: 'wisteria-2-codes.html',
    scrapeUrl: 'https://www.pockettactics.com/wisteria-2/codes',
    fallbackCodes: [
      { code: 'WISTERIA2', reward: 'Free Spins' },
    ]
  },
];

async function scrapeCodesFromPage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) {
      console.log('   Page returned: ' + res.status);
      return null;
    }
    const html = await res.text();
    const codes = [];

    const pattern = /\*\s*\*\*([A-Za-z0-9_!]+)\*\*\s*[-]\s*([^\n*]+)/g;
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const code = match[1].trim();
      const reward = match[2].trim().substring(0, 60);
      if (code.length >= 3 && code.length <= 40) {
        codes.push({ code: code, reward: reward });
      }
    }

    const pattern2 = /<li><strong>([A-Za-z0-9_!]+)<\/strong>\s*[-]\s*([^<]+)<\/li>/g;
    while ((match = pattern2.exec(html)) !== null) {
      const code = match[1].trim();
      const reward = match[2].trim().substring(0, 60);
      if (code.length >= 3 && code.length <= 40) {
        if (!codes.find(function(c) { return c.code === code; })) {
          codes.push({ code: code, reward: reward });
        }
      }
    }

    return codes.length > 0 ? codes : null;
  } catch (err) {
    console.log('   Scrape failed: ' + err.message);
    return null;
  }
}

function updateHTMLFile(filePath, activeCodes) {
  if (!fs.existsSync(filePath)) {
    console.log('   File not found: ' + filePath);
    return false;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  const activeStr = JSON.stringify(activeCodes, null, 6)
    .replace(/"code":/g, 'code:')
    .replace(/"reward":/g, 'reward:');

  html = html.replace(
    /const activeCodes\s*=\s*\[[\s\S]*?\];/,
    'const activeCodes = ' + activeStr + ';'
  );

  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  html = html.replace(
    /<strong style="color:var\(--white\)">[^<]+<\/strong>\s*\n\s*<span>Last checked<\/span>/,
    '<strong style="color:var(--white)">' + today + '</strong>\n          <span>Last checked</span>'
  );

  const fullDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  html = html.replace(/Updated [A-Za-z]+ \d+, \d{4}/, 'Updated ' + fullDate);

  const monthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  html = html.replace(
    /\((?:January|February|March|April|May|June|July|August|September|October|November|December) \d{4}\)/g,
    '(' + monthYear + ')'
  );

  fs.writeFileSync(filePath, html, 'utf8');
  return true;
}

async function main() {
  console.log('NexaPlay Code Updater - ' + new Date().toISOString());
  let updatedCount = 0;

  for (const game of GAMES) {
    console.log('Processing: ' + game.file);
    const scrapedCodes = await scrapeCodesFromPage(game.scrapeUrl);
    const activeCodes = (scrapedCodes && scrapedCodes.length > 0) ? scrapedCodes : game.fallbackCodes;
    console.log('   Active: ' + activeCodes.length + ' codes');
    console.log('   Source: ' + (scrapedCodes ? 'Pocket Tactics' : 'Fallback'));
    const updated = updateHTMLFile(game.file, activeCodes);
    if (updated) {
      updatedCount++;
      console.log('   Saved!');
    }
    await new Promise(function(r) { setTimeout(r, 1000); });
  }

  fs.writeFileSync('last-updated.txt', 'Last updated: ' + new Date().toUTCString() + '\nFiles updated: ' + updatedCount + '/' + GAMES.length + '\n');
  console.log('Done! Updated ' + updatedCount + '/' + GAMES.length + ' files.');
}

main().catch(function(err) {
  console.error('Error:', err);
  process.exit(1);
});
