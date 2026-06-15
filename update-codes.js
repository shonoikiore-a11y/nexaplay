const fs = require('fs');
 
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
 
// ─── GAMES CONFIG ────────────────────────────────────────────────────────────
const GAMES = [
  {
fallbackCodes: [
  { code: 'twete93dont', reward: '140 Stardust + 2,000 Gems' },
  { code: 'tungtungnobannersahur', reward: '120 Stardust + 300 Gems' },
  { code: 'fordanielxd', reward: '57 Stardust + 67 Gems' },
  { code: 'omgupdate2026', reward: '170 Stardust + 2,700 Gems' },
  { code: 'cosmicrebel', reward: '170 Stardust + 2,700 Gems' },
]
  },
  {
    file: 'anime-adventures-codes.html',
    youtubeQuery: 'Anime Adventures codes 2026',
    fallbackCodes: [
      { code: 'RELEASE', reward: 'Free Gems' },
      { code: 'THANKYOU', reward: 'Free Gems' },
    ]
  },
  {
    file: 'anime-defenders-codes.html',
    youtubeQuery: 'Anime Defenders codes 2026',
    fallbackCodes: [
      { code: 'LAUNCH', reward: 'Free Gems' },
    ]
  },
  {
    file: 'anime-fighting-simulator-x-codes.html',
    youtubeQuery: 'Anime Fighting Simulator X codes 2026',
    fallbackCodes: [
      { code: 'AFSX', reward: 'Free Yen' },
    ]
  },
  {
    file: 'anime-vanguards-codes.html',
    youtubeQuery: 'Anime Vanguards codes 2026',
    fallbackCodes: [
      { code: 'VANGUARD', reward: 'Free Gems' },
    ]
  },
  {
    file: 'bee-swarm-simulator-codes.html',
    youtubeQuery: 'Bee Swarm Simulator codes 2026',
    fallbackCodes: [
      { code: 'BEESMAS', reward: 'Free Honey' },
    ]
  },
  {
    file: 'blox-fruits-codes.html',
    youtubeQuery: 'Blox Fruits codes 2026',
    fallbackCodes: [
      { code: 'BIGNEWS', reward: 'Free XP Boost' },
      { code: 'ADMIN_CENA', reward: 'Free XP Boost' },
    ]
  },
  {
    file: 'blue-lock-rivals-codes.html',
    youtubeQuery: 'Blue Lock Rivals codes 2026',
    fallbackCodes: [
      { code: 'BLUELOCKLAUNCH', reward: 'Free Coins' },
    ]
  },
  {
    file: 'demon-piece-codes.html',
    youtubeQuery: 'Demon Piece codes 2026',
    fallbackCodes: [
      { code: 'DEMONLAUNCH', reward: 'Free Gems' },
    ]
  },
  {
    file: 'fruit-battlegrounds-codes.html',
    youtubeQuery: 'Fruit Battlegrounds codes 2026',
    fallbackCodes: [
      { code: 'FRUITSEASON', reward: 'Free Tokens' },
    ]
  },
  {
    file: 'grand-piece-online-codes.html',
    youtubeQuery: 'Grand Piece Online codes 2026',
    fallbackCodes: [
      { code: 'GPO2024', reward: 'Free Gems' },
    ]
  },
  {
    file: 'jailbreak-codes.html',
    youtubeQuery: 'Jailbreak Roblox codes 2026',
    fallbackCodes: [
      { code: 'JAILBREAK', reward: 'Free Cash' },
    ]
  },
  {
    file: 'king-legacy-codes.html',
    youtubeQuery: 'King Legacy codes 2026',
    fallbackCodes: [
      { code: 'KINGGEM', reward: 'Free Gems' },
    ]
  },
  {
    file: 'murder-mystery-2-codes.html',
    youtubeQuery: 'Murder Mystery 2 codes 2026',
    fallbackCodes: [
      { code: 'COMB4T2', reward: 'Free Knife' },
    ]
  },
  {
    file: 'my-hero-mania-codes.html',
    youtubeQuery: 'My Hero Mania codes 2026',
    fallbackCodes: [
      { code: 'PLUSULTRA', reward: 'Free Spins' },
    ]
  },
];
 
// ─── EXTRACT CODES FROM TEXT ──────────────────────────────────────────────────
function extractCodesFromText(text) {
  const codes = [];
 
  // Match patterns like: CODE - reward or CODE: reward or just ALLCAPS codes
  const patterns = [
    // "CODE123 - Free Gems" or "CODE123 – Free Gems"
    /\b([A-Z][A-Z0-9_!]{3,})\s*[-–]\s*([^\n,!]+)/g,
    // "Code: CODE123"
    /[Cc]ode[:\s]+([A-Z][A-Z0-9_!]{3,})/g,
    // Lines with codes in lists like "• CODE123 - reward"
    /[•\-\*]\s*([A-Z][A-Z0-9_!]{3,})\s*[-–:]\s*([^\n]+)/g,
  ];
 
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const code = match[1];
      const reward = match[2] ? match[2].trim().substring(0, 50) : 'Free Reward';
 
      // Filter out common false positives
      if (
        code.length >= 4 &&
        code.length <= 30 &&
        !['HTTP', 'HTTPS', 'HTML', 'JSON', 'NULL', 'TRUE', 'FALSE', 'SUBSCRIBE', 'ROBLOX'].includes(code)
      ) {
        if (!codes.find(c => c.code === code)) {
          codes.push({ code, reward });
        }
      }
    }
  }
 
  return codes;
}
 
// ─── FETCH CODES FROM YOUTUBE ─────────────────────────────────────────────────
async function fetchCodesFromYouTube(query) {
  try {
    if (!YOUTUBE_API_KEY) {
      console.log('   ⚠️  No YouTube API key found, using fallback codes');
      return null;
    }
 
    // Search for recent videos about this game's codes
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&order=date&maxResults=5&key=${YOUTUBE_API_KEY}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
 
    if (!searchData.items || searchData.items.length === 0) return null;
 
    const allCodes = [];
 
    // Check each video's description for codes
    for (const item of searchData.items) {
      const videoId = item.id.videoId;
      const description = item.snippet.description || '';
      const title = item.snippet.title || '';
 
      // Extract codes from title and description
      const titleCodes = extractCodesFromText(title);
      const descCodes = extractCodesFromText(description);
 
      // Get full video details for longer description
      const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`;
      const videoRes = await fetch(videoUrl);
      const videoData = await videoRes.json();
 
      if (videoData.items && videoData.items[0]) {
        const fullDesc = videoData.items[0].snippet.description || '';
        const fullCodes = extractCodesFromText(fullDesc);
        allCodes.push(...titleCodes, ...descCodes, ...fullCodes);
      }
    }
 
    // Deduplicate codes
    const seen = new Set();
    const uniqueCodes = allCodes.filter(c => {
      if (seen.has(c.code)) return false;
      seen.add(c.code);
      return true;
    });
 
    return uniqueCodes.length > 0 ? uniqueCodes : null;
 
  } catch (err) {
    console.log(`   ⚠️  YouTube fetch failed: ${err.message}`);
    return null;
  }
}
 
// ─── UPDATE HTML FILE ─────────────────────────────────────────────────────────
function updateHTMLFile(filePath, activeCodes, expiredCodes) {
  if (!fs.existsSync(filePath)) {
    console.log(`   ❌ File not found: ${filePath}`);
    return false;
  }
 
  let html = fs.readFileSync(filePath, 'utf8');
 
  const activeStr = JSON.stringify(activeCodes, null, 6)
    .replace(/"code":/g, 'code:')
    .replace(/"reward":/g, 'reward:');
 
  const expiredStr = JSON.stringify(expiredCodes, null, 6)
    .replace(/"code":/g, 'code:')
    .replace(/"reward":/g, 'reward:');
 
  html = html.replace(
    /const activeCodes\s*=\s*\[[\s\S]*?\];/,
    `const activeCodes = ${activeStr};`
  );
 
  html = html.replace(
    /const expiredCodes\s*=\s*\[[\s\S]*?\];/,
    `const expiredCodes = ${expiredStr};`
  );
 
  // Update last checked date
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  html = html.replace(
    /<strong style="color:var\(--white\)">[^<]+<\/strong>\s*\n\s*<span>Last checked<\/span>/,
    `<strong style="color:var(--white)">${today}</strong>\n          <span>Last checked</span>`
  );
 
  // Update updated date
  const fullDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  html = html.replace(/Updated [A-Za-z]+ \d+, \d{4}/, `Updated ${fullDate}`);
 
  // Update month in h1
  const monthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  html = html.replace(
    /\((?:January|February|March|April|May|June|July|August|September|October|November|December) \d{4}\)/g,
    `(${monthYear})`
  );
 
  fs.writeFileSync(filePath, html, 'utf8');
  return true;
}
 
// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`🚀 NexaPlay Code Updater — ${new Date().toISOString()}`);
  let updatedCount = 0;
 
  for (const game of GAMES) {
    console.log(`\n📋 Processing: ${game.file}`);
 
    // Try YouTube first
    const youtubeCodes = await fetchCodesFromYouTube(game.youtubeQuery);
    const activeCodes = (youtubeCodes && youtubeCodes.length > 0)
      ? youtubeCodes
      : game.fallbackCodes;
 
    console.log(`   ✅ Active: ${activeCodes.length} codes`);
    console.log(`   📡 Source: ${youtubeCodes ? 'YouTube' : 'Fallback'}`);
 
    const updated = updateHTMLFile(game.file, activeCodes, []);
    if (updated) {
      updatedCount++;
      console.log(`   💾 Saved!`);
    }
 
    await new Promise(r => setTimeout(r, 300));
  }
 
  fs.writeFileSync('last-updated.txt',
    `Last updated: ${new Date().toUTCString()}\nFiles updated: ${updatedCount}/${GAMES.length}\n`
  );
 
  console.log(`\n✅ Done! Updated ${updatedCount}/${GAMES.length} files.`);
}
 
main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
 
