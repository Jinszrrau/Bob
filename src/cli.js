#!/usr/bin/env node
import "dotenv/config";
import { Gentleman } from "./gentleman.js";

const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";
const DIM = "\x1b[2m";
const BOLD = "\x1b[1m";

function printHelp() {
  console.log(`
${BOLD}gentleman${RESET} — hand Gentleman a problem, get a breakdown back.

${BOLD}Usage${RESET}
  gentleman "your problem here"
  gentleman --model gpt-4.1-mini "quick and cheap version"
  echo "your problem" | gentleman

${BOLD}Options${RESET}
  --model <id>   Model to use (default: gpt-4.1-mini)
  --no-stream    Wait for the full response instead of streaming
  -h, --help     Show this help

${BOLD}Setup${RESET}
  Set OPENAI_API_KEY in your environment or a .env file.
`);
}

async function readStdin() {
  if (process.stdin.isTTY) return "";
  let data = "";
  for await (const chunk of process.stdin) data += chunk;
  return data;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("-h") || args.includes("--help")) {
    printHelp();
    return;
  }

  let model = "gpt-4.1-mini";
  let stream = true;
  const positional = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--model") {
      model = args[++i];
    } else if (args[i] === "--no-stream") {
      stream = false;
    } else {
      positional.push(args[i]);
    }
  }

  const stdinText = await readStdin();
  const problem = positional.join(" ").trim() || stdinText.trim();

  if (!problem) {
    printHelp();
    process.exitCode = 1;
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error(
      `${BOLD}No API key found.${RESET} Set OPENAI_API_KEY in your environment or a .env file.`
    );
    process.exitCode = 1;
    return;
  }

  const gentleman = new Gentleman({ model });

  console.log(`${DIM}Gentleman is looking at it...${RESET}\n`);

  try {
    if (stream) {
      process.stdout.write(GREEN);
      await gentleman.breakdownStream(problem, (chunk) => process.stdout.write(chunk));
      process.stdout.write(RESET + "\n");
    } else {
      const result = await gentleman.breakdown(problem);
      console.log(GREEN + result + RESET);
    }
  } catch (err) {
    console.error(`${BOLD}Gentleman hit an error:${RESET} ${err.message}`);
    process.exitCode = 1;
  }
}

main();
