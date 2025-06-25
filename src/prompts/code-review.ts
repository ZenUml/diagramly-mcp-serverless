import { z } from 'zod';
import { PromptDefinition } from './index.js';

export const codeReviewPrompt: PromptDefinition = {
  name: "review-code",
  config: {
    title: "Code Review",
    description: "Review code for best practices and potential issues",
    argsSchema: { code: z.string() }
  },
  handler: ({ code }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `Please review this code:\n\n${code}`
      }
    }]
  })
};