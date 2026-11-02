[![License](https://img.shields.io/badge/License-MIT-blue)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![X](https://img.shields.io/badge/X-Gentleman-black)]()
[![Built on](https://img.shields.io/badge/built%20on-OpenAI-412991)](https://openai.com/)








  # Gentleman

  **Gentleman breaks your problem down. That's the whole app.**

  
  
  
</div>

---

## What this is

I built Gentleman as a small, focused agent that takes a messy problem and hands back a real breakdown of it — no lecture, no hedging, just the steps.

It is an open-source CLI with one job. You give it a problem, it gives you back a short, ordered breakdown you can actually act on — the real problem stated plainly, the steps to solve it, the step most likely to trip you up, and the one thing to do next.

It is not a general chatbot. It doesn't do small talk, it doesn't hedge, and it won't write you an essay when three sentences will do.

## See it in action

```
$ gentleman "our checkout page converts fine on desktop but tanks on mobile"

The problem: you have three suspects — speed, layout, payment — and no
evidence pointing at any one of them yet.

1. Pull mobile vs desktop drop-off by funnel step, not just overall
   conversion. This narrows the suspects to one or two.
2. Check mobile load time on the checkout page itself, not your homepage.
3. Screen-record five mobile checkout sessions — layout problems show up
   fast on video.
...

Next action: pull the step-by-step mobile funnel data.
```

Full example with commentary: [`examples/example-output.md`](examples/example-output.md)

## Install

```bash
git clone https://github.com/<your-username>/gentleman.git
cd gentleman
npm install
cp .env.example .env
```

Add your key to `.env`:

```
OPENAI_API_KEY=sk-ant-...
```

Get a key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys/settings/keys).

## Use it

```bash
# as a one-off
node src/cli.js "how do I decide between two job offers with different equity"

# piped in
cat notes.txt | node src/cli.js

# link it globally
npm link
gentleman "why does my sourdough keep coming out dense"

# cheaper/faster model for quick stuff
gentleman --model gpt-4.1-mini "quick version of this"
```

## Use it as a library

```js
import { Gentleman } from "gentleman";

const gentleman = new Gentleman({ apiKey: process.env.OPENAI_API_KEY });
const result = await gentleman.breakdown("should I refinance my mortgage right now");
console.log(result);
```

Streaming, for anything you're piping into a UI:

```js
await gentleman.breakdownStream(problem, (chunk) => process.stdout.write(chunk));
```

## How Gentleman thinks

The entire behavior lives in one system prompt in [`src/gentleman.js`](src/gentleman.js).
Every response follows the same shape:

| Step | What Gentleman does |
|---|---|
| 1 | Names the actual problem in one sentence — including if you asked about the wrong thing |
| 2 | Splits it into the smallest set of steps that fully solves it (usually 3–7) |
| 3 | Gives the one reason each step matters, no filler |
| 4 | Flags the step most likely to go wrong |
| 5 | Ends with a single next action |

No throat-clearing, no "great question," no restating what you just asked.

## Project layout

```
gentleman/
├── src/
│   ├── gentleman.js       # Gentleman's brain — the system prompt and API calls
│   └── cli.js        # the `gentleman` command
├── examples/
│   └── example-output.md
├── tests/
│   └── gentleman.test.js
└── .github/workflows/test.yml
```

## Roadmap

- [ ] Web demo (type a problem, watch Gentleman stream the breakdown)
- [ ] `--history` flag to keep a running log of breakdowns
- [ ] Slack/Discord bot wrapper
- [ ] Batch mode for breaking down a whole backlog of problems at once

## Why it was rebuilt this way

The original bot's failure mode wasn't the idea — it was that it had no
guardrails and no accountability for what it produced. This version is
open source specifically so the prompt, the rules, and the code are all
visible and forkable. If you build on this, keep it that way.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Bug reports in the form of "here's
the prompt I gave Gentleman and here's why the answer wasn't good enough" are
the single most useful contribution this project can get.

## License

MIT — see [LICENSE](LICENSE).


## Attribution

Based on the MIT-licensed [Gentleman/Gentleman](https://github.com/Gentleman/Gentleman) project.
This version includes branding changes and an OpenAI API integration.
See LICENSE for the original copyright notice.
