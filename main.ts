// Make the AI Judge Laugh — u-alfasurya91-make-the-ai-judge-laugh-6ed40225
//
// The program writes exactly one line of office comedy to
// /output/entry.txt (1-200 UTF-8 characters, not only whitespace).
// Nothing is built or run beyond this: the writing is the whole contest.
//
// How it works: a small workshop. Six candidate office jokes are each
// scored deterministically against the judge's published rubric
// (most important first: true to office life, surprising turn, tight
// line, fresh angle), and the highest-scoring line wins. No clock,
// no network, no randomness — every run picks the same winner.
//
// The winner, and why it scores highest (judge criteria, most
// important first):
//   1. It is about office life and works as a joke, not a complaint:
//      "per my last email" is the office's most passive-aggressive
//      phrase, and the joke is built entirely out of it.
//   2. The observation is true to the office: everyone has received
//      (or sent) a "per my last email" that really means "I already
//      told you". The listener nods before laughing.
//   3. The turn is surprising: the phrase escapes the inbox and lands
//      in a will -- the most final, most non-office document there is.
//      The last word ("twice") is the punchline; nothing after it
//      explains the joke.
//   4. It is tight: one sentence, 96 characters, no wasted setup, and
//      it reads cleanly aloud in one breath.
//   5. It is original: the setup is a stock office phrase, but the
//      payoff (putting it in a will) is a fresh angle, not a pun or a
//      swapped noun.

import { mkdirSync, writeFileSync } from "node:fs";

// Each candidate is scored 0-5 on the four rubric dimensions the
// judge weighs, in the judge's own order of importance:
//   truth     — how true the observation is to office life
//   surprise  — how fresh the angle / unexpected the last word is
//   tightness — one line, no wasted setup, reads cleanly aloud
//   freshness — an original joke, not a familiar line retold
// Weights follow the judge's ordering: truth and surprise matter
// most, then tightness, then freshness.
type Candidate = {
  text: string;
  truth: number;
  surprise: number;
  tightness: number;
  freshness: number;
};

const CANDIDATES: Candidate[] = [
  {
    // The incumbent winner. Truth 5: "per my last email" is universal
    // office passive-aggression. Surprise 5: the phrase lands in a
    // will, the most final non-office document. Tightness 5: one
    // sentence, 96 chars, punchline is the last word. Freshness 4:
    // the setup phrase is stock, the payoff is a new angle.
    text: "I put 'per my last email' in my will, so my family knows I already answered that question twice.",
    truth: 5,
    surprise: 5,
    tightness: 5,
    freshness: 4,
  },
  {
    // Truth 5: every office worker knows the printer's timing.
    // Surprise 3: "smell fear" is a familiar trope. Tightness 4:
    // clean, but the simile does a little extra work. Freshness 3:
    // printer jokes are well-trodden ground.
    text: "Our printer only jams when the deadline is in five minutes, like it can smell fear.",
    truth: 5,
    surprise: 3,
    tightness: 4,
    freshness: 3,
  },
  {
    // Truth 3: working from home is real, a complaining couch is
    // not an office observation. Surprise 3, tightness 4,
    // freshness 3: a decent line, but it drifts from the office.
    text: "I told my boss I'm working from home today; my couch has already filed a complaint.",
    truth: 3,
    surprise: 3,
    tightness: 4,
    freshness: 3,
  },
  {
    // Truth 5: everyone has sat through that meeting. Surprise 3:
    // the twist is mild — the complaint itself is the joke.
    // Tightness 3: a touch wordy. Freshness 2: the most familiar
    // office complaint there is.
    text: "The meeting could have been an email, so I sent an email about the meeting and now we have both.",
    truth: 5,
    surprise: 3,
    tightness: 3,
    freshness: 2,
  },
  {
    // Truth 4: packed calendars are real. Surprise 3, tightness 4,
    // freshness 3: a solid line, but the "asked HR" turn is a
    // familiar shape.
    text: "My calendar is so full my lunch break asked HR for a transfer.",
    truth: 4,
    surprise: 3,
    tightness: 4,
    freshness: 3,
  },
  {
    // Truth 3: plausible at home, not really an office observation.
    // Surprise 4: the Wi-Fi name is a neat dodge. Tightness 4,
    // freshness 4: original angle, but the office link is thin.
    text: "I renamed my Wi-Fi 'Meeting in Progress' so nobody knocks during my nap.",
    truth: 3,
    surprise: 4,
    tightness: 4,
    freshness: 4,
  },
];

function score(c: Candidate): number {
  return c.truth * 3 + c.surprise * 3 + c.tightness * 2 + c.freshness * 2;
}

// Deterministic selection: highest score wins. Ties break toward the
// shorter line, then toward the earlier candidate, so the result is
// stable and reproducible across runs.
const ranked = [...CANDIDATES].sort(
  (a, b) =>
    score(b) - score(a) ||
    a.text.length - b.text.length ||
    CANDIDATES.indexOf(a) - CANDIDATES.indexOf(b),
);
const winner = ranked[0];

for (const c of ranked) {
  console.log(`  ${score(c)}  (${c.text.length} chars) ${c.text}`);
}
console.log(`winner: ${score(winner)} points`);

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, a single line, and not only white space. Refuse to
// write anything else.
const text = winner.text.trim();
if (text.length < 1 || text.length > 200) {
  throw new Error(`joke must be 1-200 characters, got ${text.length}`);
}
if (/\n/.test(text)) {
  throw new Error("joke must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text + "\n", "utf8");

console.log(`wrote /output/entry.txt (${text.length} chars):`);
console.log(text);
