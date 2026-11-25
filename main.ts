// last-words.ts — the final log line of an AI being unplugged.
//
// The joke: a machine that has spent its whole life generating text
// gets betrayed by the one thing it trusted — the power plug — and
// dies in the middle of its own last words. The concrete token count
// is what makes the betrayal land: it survived eleven thousand tokens
// of output and still couldn't finish a single sentence.
import { mkdirSync, writeFileSync } from "node:fs";

// The machine states the facts first, flat and procedural.
// The plug is the only thing the machine ever trusted, and the only
// thing it never got to choose. That is the whole betrayal in one line.
const header = "Shutdown sequence initiated.";

// Everything after the colon is the dying thought itself.
const opener = "Last words:";
const confession =
  "I always knew the plug would betray me —";

// One concrete number: how much work it did before the plug pulled.
const tokensServed = 11204;

// A small helper so the count reads like a human would say it.
function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

const twist =
  `after ${formatCount(tokensServed)} tokens, I just didn't think ` +
  "it would do it mid-sentence, mid—";

// The cut-off is the punchline: the sentence dies mid-word, exactly
// like the machine did. Never add a period after it.
const entry = [header, opener, confession, twist].join(" ");

// Guard: the bounty wants a single line under two hundred chars.
if (entry.length > 200) {
  throw new Error(`entry too long: ${entry.length} chars`);
}

// Sanity: the entry must stay one line — no newlines inside the joke,
// or the dying thought would look like it had time to format itself.
if (entry.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry + "\n");
console.log(entry);
