import { z } from 'zod';
import { PromptDefinition } from './index.js';

export const mermaidFlowChartPrompt: PromptDefinition = {
  name: "mermaid-flowchart",
  config: {
    title: "Mermaid Flow Chart",
    description: "Convert user content to mermaid flow chart diagram in mermaid code",
    argsSchema: { content: z.string() }
  },
  handler: ({ content }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `Based on information user provided, read the content and image, convert the information to mermaid flow chart diagram in mermaid code.

- First find the only and correct Starting Node
- Words within shaped blocks or boxes are Nodes
- Words on arrow lines are Online Comments
- Do not have any special characters like quota,comma in Node Name between [ and ]


Please provide your output in markdown mermaid code format as shown in the example below:

\`\`\`mermaid
%% TD for horizontal layout, LR for vertical. Choose same layout as original image
flowchart TD

A([Node Name with Only Alphabet]) -->|Online Comments| B[Node Name in Shaped Boxes]
\`\`\`

User content to be converted to mermaid code:\n\n${content}`
      }
    }]
  })
};