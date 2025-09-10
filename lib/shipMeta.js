import rawMeta from "../data/ship-meta.json" assert { type: "json" };

// Normalize a path or filename to a simple key (lowercase, no leading "assets/ships/")
function norm(s) {
  return String(s || "")
    .replace(/^assets\/ships\//i, "")
    .replace(/^\//, "")
    .toLowerCase();
}

/**
 * Hand-tuned name overrides for tricky filenames that can't be reliably prettified.
 * Add to this map anytime you spot a weird tooltip.
 */
const NAME_OVERRIDES = new Map([
  ["geonosisfighterspy.webp",       "Geonosian Spy’s Starfighter"],
  ["geonosisfightersoldier.webp",   "Geonosian Soldier’s Starfighter"],
  ["geonosisfightersunfac.webp",    "Sun Fac’s Geonosian Starfighter"],
  ["rexarc170_02.webp",             "ARC-170 (Rex)"],
  ["fives_arc170.webp",             "ARC-170 (Fives)"],
  ["cassianuwing.webp",             "Cassian’s U-wing"],
  ["bistanuwing.webp",              "Bistan’s U-wing"],
  ["hanmfalcon.webp",               "Millennium Falcon (Han)"],
  ["reymfalcon.webp",               "Millennium Falcon (Resistance)"],
  ["poexwing.webp",                 "Poe Dameron’s X-wing"],
  ["imperialtiefighter.webp",       "TIE Fighter"],
  ["tieadvanced.webp",              "TIE Advanced"],
  ["tiebomber.webp",                "TIE Bomber"],
  ["tiedefender.webp",              "TIE Defender"],
  ["tiereaper.webp",                "TIE Reaper"],
  ["tiesilencer.webp",              "TIE Silencer"],
  ["tiedagger.webp",                "TIE Dagger"],
  ["jedi_fighter_anakin.webp",      "Anakin’s Jedi Starfighter"],
  ["jedi_fighter_ahsoka.webp",      "Ahsoka’s Jedi Starfighter"],
  ["jedi_fighter_bladeofdorin.webp","Plo Koon’s Jedi Starfighter"],
  ["consular_starfighter.webp",     "Jedi Consular’s Starfighter"],
  ["hyena_bomber.webp",             "Hyena-class Droid Bomber"],
  ["vulture_droid.webp",            "Vulture Droid"],
  ["ghost.webp",                    "Ghost"],
  ["phantom2.webp",                 "Phantom II"],
]);

/**
 * Heuristic prettifier for filenames where we don't have an explicit override.
 * - strips extension
 * - replaces underscores/dashes with spaces
 * - fixes common tokens (U-wing, X-wing, ARC-170, etc.)
 */
function prettifyBase(fileKey) {
  const base = fileKey.replace(/\.webp$/i, "");
  let s = base
    .replace(/[_-]+/g, " ")
    .trim();

  // Token fixes
  s = s.replace(/\buwing\b/gi, "U-wing");
  s = s.replace(/\bxwing\b/gi, "X-wing");
  s = s.replace(/\bywing\b/gi, "Y-wing");
  s = s.replace(/\barc ?170\b/gi, "ARC-170");
  s = s.replace(/\btiefighter\b/gi, "TIE Fighter");
  s = s.replace(/\btiebomber\b/gi, "TIE Bomber");
  s = s.replace(/\btiedefender\b/gi, "TIE Defender");
  s = s.replace(/\btiereaper\b/gi, "TIE Reaper");
  s = s.replace(/\btieadvanced\b/gi, "TIE Advanced");
  s = s.replace(/\btiesilencer\b/gi, "TIE Silencer");
  s = s.replace(/\btiedagger\b/gi, "TIE Dagger");
  s = s.replace(/\bjedi fighter\b/gi, "Jedi Starfighter");

  // Title case words
  s = s.replace(/\b([a-z])/g, (m) => m.toUpperCase());

  return s;
}

// Simple faction/role inference (kept from earlier version)
const FACTION_RULES = [
  { key: "First Order",    test: /firstorder|tiesilencer|finalizer|tiedagger/i },
  { key: "Resistance",     test: /resistance|reymfalcon|poexwing|raddus/i },
  { key: "Rebels",         test: /rebel|ghost|phantom2|ravenclaw|hanmfalcon|homeone|profundity|outrider|uwing/i },
  { key: "Empire",         test: /imperial|stardestroyer|tiebomber|tieadvanced|tiedefender|tiereaper|chimaera|executor/i },
  { key: "Sith Empire",    test: /leviathan|sith|scimitar|sithinfiltrator|sithsupremacy|mark5interceptor/i },
  { key: "Scoundrels",     test: /slave1|xanadublood|ig2000|houndstooth|gauntlet|razorcrest|punishingone/i },
  { key: "Mandalorians",   test: /gauntlet|razorcrest/i },
  { key: "Galactic Republic", test: /venator|negotiator|endurance|jedi_fighter|anakinjedifighter|ahsokajedifighter|plokoon/i },
  { key: "Separatists",    test: /malevolence|vulture|hyena|geonosis|sunfac/i },
  { key: "Droids",         test: /vulture|hyena/i },
  { key: "Bounty Hunters", test: /slave1|xanadublood|houndstooth|ig2000|punishingone/i },
  { key: "Phoenix",        test: /ghost|phantom2/i }
];

function inferAlignment(key) {
  if (/finalizer|firstorder|sith|leviathan|imperial|tie|malevolence|executor|chimaera/i.test(key)) return "Dark";
  if (/rebel|resistance|reymfalcon|poexwing|raddus|homeone|profundity|uwing|venator|negotiator|endurance|jedi/i.test(key)) return "Light";
  return "Neutral";
}
function inferRoles(key) {
  if (/executor|profundity|negotiator|malevolence|leviathan|homeone|finalizer|raddus|stardestroyer|venator/i.test(key))
    return ["Capital Ship"];
  if (/bomber|tiebomber|hyena/i.test(key)) return ["Tank"];
  if (/reaper|uwing|ghost|phantom|consular|gauntlet/i.test(key)) return ["Support"];
  return ["Attacker"];
}

const META = new Map(rawMeta.map((row) => [norm(row.key), row]));

// Public API
export function getShipMeta(fileOrName) {
  const key = norm(fileOrName);
  const overrideName = NAME_OVERRIDES.get(key);
  const row = META.get(key);

  const name = row?.name || overrideName || prettifyBase(key);
  const factions = row?.factions || FACTION_RULES.filter(r => r.test.test(key)).map(r => r.key);
  const alignment = row?.alignment || inferAlignment(key);
  const roles = row?.roles || inferRoles(key);

  return {
    key,
    name,
    factions: Array.from(new Set(factions)),
    alignment,
    roles: Array.from(new Set(roles))
  };
}

export const getDisplayName = (f) => getShipMeta(f).name;

export function allKnownFactions() {
  const s = new Set();
  for (const row of rawMeta) (row.factions || []).forEach((x) => s.add(x));
  FACTION_RULES.forEach((r) => s.add(r.key));
  return Array.from(s).sort();
}
