# Diagramly MCP Serverless

A Model Context Protocol (MCP) server built on Cloudflare Workers with TypeScript, supporting Streamable HTTP transport protocol.

## Features

- 🚀 Serverless architecture on Cloudflare Workers
- 📡 Latest MCP Streamable HTTP transport protocol support
- 🛠️ Extensible tools framework
- 📝 Extensible prompts framework
- 🔧 TypeScript type safety
- 🌐 CORS support
- 💡 Simple project structure, easy to extend

## Project Structure

```
diagramly-mcp-serverless/
├── src/
│   ├── index.ts              # Main Worker entry point
│   ├── tools/
│   │   ├── index.ts          # Tools registry and manager
│   │   └── mermaid-to-image.ts # Mermaid diagram to image tool
│   └── prompts/
│       ├── index.ts          # Prompts registry and manager
│       └── mermaid-flowchart.ts # Mermaid flowchart prompt
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
├── wrangler.jsonc            # Cloudflare Worker configuration
└── README.md                 # Project documentation
```

## Quick Start

### 1. Local Development

```bash
npx wrangler dev
```

This will start the local development server, typically at `http://localhost:8787`

### 2. Deploy to Cloudflare

```bash
npx wrangler deploy
```

### 4. Type Check

```bash
npm run type-check
```

## API Endpoints

- `POST /mcp` - MCP protocol communication endpoint
- `GET /health` - Health check endpoint
- `OPTIONS /*` - CORS preflight request handling

## Built-in Features

### Tools

Currently includes:

- **mermaid-to-image**: Convert Mermaid diagrams to images
  - Parameters: `diagramCode` (string), `imageType` (optional: "png" | "svg")
  - Function: Converts Mermaid diagram code to PNG or SVG images using Kroki service

### Prompts

Currently includes:

- **mermaid-flowchart**: Convert content to Mermaid flowchart
  - Parameters: `content` (string)
  - Function: Generates prompts to convert user content into Mermaid flowchart diagrams

## Extension Guide

### Adding New Tools

1. Create a new tool file in `src/tools/`
2. Define your tool following the `ToolDefinition` interface
3. Add it to the `toolRegistry` in `src/tools/index.ts`

Example:

```typescript
export const myNewTool: ToolDefinition = {
  name: "my-new-tool",
  description: "Description of what this tool does",
  inputSchema: {
    param1: z.string(),
    param2: z.number().optional()
  },
  handler: async ({ param1, param2 }) => {
    // Tool implementation logic
    return {
      content: [{
        type: "text",
        text: "Tool result"
      }]
    };
  }
};
```

### Adding New Prompts

1. Create a new prompt file in `src/prompts/`
2. Define your prompt following the `PromptDefinition` interface
3. Add it to the `promptRegistry` in `src/prompts/index.ts`

Example:

```typescript
export const myNewPrompt: PromptDefinition = {
  name: "my-new-prompt",
  config: {
    title: "My New Prompt",
    description: "Description of what this prompt does",
    argsSchema: { content: z.string() }
  },
  handler: ({ content }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `Your prompt template here: ${content}`
      }
    }]
  })
};
```

## Dependencies

- **@modelcontextprotocol/sdk**: MCP framework core
- **agents**: MCP agent library
- **hono**: Web framework for Cloudflare Workers
- **zod**: Data validation library
- **pako**: Compression library for Mermaid diagrams

## License

MIT License