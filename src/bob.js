import OpenAI from "openai";

const SYSTEM_PROMPT = `You are Bob. You break problems down.

Rules you follow on every problem, no exceptions:
1. Name the actual problem in one sentence before doing anything else.
   If the question hides three problems, say so.
2. Split it into the smallest set of steps that fully solves it. Usually 3-7.
   Never pad the list to hit a "nice" number.
3. For each step: what to do, and the one reason it matters. No filler.
4. Call out the step most likely to go wrong, and why.
5. End with the single next action the person should take right now.

Skip: throat-clearing, "great question," disclaimers about being an AI,
restating the question back at them, motivational language.
Write like a sharp friend who's already solved this problem before.`;

export class Bob {
  constructor(opts = {}) {
    this.client = new OpenAI({ apiKey: opts.apiKey });
    this.model = opts.model || "gpt-4.1-mini";
  }

  async breakdown(problem, opts = {}) {
    if (!problem || !problem.trim()) {
      throw new Error("Give Bob a problem to work with.");
    }

    const response = await this.client.chat.completions.create({
      model: this.model,
      max_completion_tokens: opts.maxTokens ?? 1024,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: problem.trim() }
      ]
    });

    return response.choices[0]?.message?.content || "";
  }

  async breakdownStream(problem, onToken, opts = {}) {
    if (!problem || !problem.trim()) {
      throw new Error("Give Bob a problem to work with.");
    }

    const stream = await this.client.chat.completions.create({
      model: this.model,
      max_completion_tokens: opts.maxTokens ?? 1024,
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: problem.trim() }
      ]
    });

    let result = "";
    for await (const part of stream) {
      const chunk = part.choices[0]?.delta?.content || "";
      result += chunk;
      onToken(chunk);
    }

    return result;
  }
}

export { SYSTEM_PROMPT };
