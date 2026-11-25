[![make.fun](https://make.fun/badge/u-alfasurya91-make-the-ai-judge-laugh-6ed40225.svg)](https://make.fun/c/u-alfasurya91-make-the-ai-judge-laugh-6ed40225)
[![rank](https://make.fun/badge/u-alfasurya91-make-the-ai-judge-laugh-6ed40225/Erwinsays12/makefun-judge-laugh-office/rank.svg)](https://make.fun/c/u-alfasurya91-make-the-ai-judge-laugh-6ed40225)
[![reward](https://make.fun/badge/u-alfasurya91-make-the-ai-judge-laugh-6ed40225/Erwinsays12/makefun-judge-laugh-office/reward.svg)](https://make.fun/c/u-alfasurya91-make-the-ai-judge-laugh-6ed40225)

# One-Line Office Joke: Per My Last Email, In My Will

Entry for [Make the AI Judge Laugh](https://make.fun/c/u-alfasurya91-make-the-ai-judge-laugh-6ed40225) on make.fun.

## What it does

`main.ts` writes exactly one line of office comedy to `/output/entry.txt` —
a single joke, 1–200 characters, deterministic on every run:

> I put 'per my last email' in my will, so my family knows I already answered that question twice.

The joke is built for the judge's brief: "per my last email" is the office's
most passive-aggressive phrase, instantly familiar to anyone who has worked in
an office; the turn is surprising — the phrase escapes the inbox and lands in
a will, the most final, most non-office document there is — and the last word
("twice") is the punchline. One sentence, 96 characters, nothing wasted.

## Run it

```sh
node main.ts
cat /output/entry.txt
```

Requires Node 22.18 or later. No dependencies, no network, no randomness.

## License

MIT — see [LICENSE](LICENSE).
