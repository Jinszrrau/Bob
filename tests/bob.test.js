import { test } from "node:test";
import assert from "node:assert/strict";
import { Bob, SYSTEM_PROMPT } from "../src/bob.js";

test("Bob rejects empty problems before ever calling the API", async () => {
  const bob = new Bob({ apiKey: "test-key-not-used" });
  await assert.rejects(() => bob.breakdown(""), /empty/);
  await assert.rejects(() => bob.breakdown("   "), /empty/);
});

test("system prompt enforces a concrete next action", () => {
  assert.match(SYSTEM_PROMPT, /next action/i);
});

test("Bob defaults to claude-sonnet-5", () => {
  const bob = new Bob({ apiKey: "test-key-not-used" });
  assert.equal(bob.model, "claude-sonnet-5");
});
