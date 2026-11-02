import { test } from "node:test";
import assert from "node:assert/strict";
import { Gentleman, SYSTEM_PROMPT } from "../src/gentleman.js";

test("Gentleman rejects empty problems before ever calling the API", async () => {
  const gentleman = new Gentleman({ apiKey: "test-key-not-used" });
  await assert.rejects(() => gentleman.breakdown(""), /empty/);
  await assert.rejects(() => gentleman.breakdown("   "), /empty/);
});

test("system prompt enforces a concrete next action", () => {
  assert.match(SYSTEM_PROMPT, /next action/i);
});

test("Gentleman defaults to claude-sonnet-5", () => {
  const gentleman = new Gentleman({ apiKey: "test-key-not-used" });
  assert.equal(gentleman.model, "claude-sonnet-5");
});
