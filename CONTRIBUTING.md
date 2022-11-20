# Contributing to Explain This Bob

Bob is small on purpose. Before adding something, check whether it makes
the breakdown better or just makes the tool bigger.

## Setup

```bash
git clone https://github.com/<your-username>/explain-this-bob.git
cd explain-this-bob
npm install
cp .env.example .env   # add your ANTHROPIC_API_KEY
npm test
```

## Ground rules

- **Keep Bob's voice.** The system prompt in `src/bob.js` is the whole
  product. If you're changing behavior, you're probably changing that
  prompt — read it before touching anything else.
- **No filler output.** If a change makes Bob's answers longer without
  making them more useful, it doesn't ship.
- **Small PRs.** One behavior change per PR, with a before/after example
  in the description.

## Reporting a bad breakdown

If Bob gives a genuinely unhelpful answer, open an issue with the exact
prompt you gave it and the response you got. That's the most useful bug
report this project can receive.
