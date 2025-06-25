import { ToolDefinition } from './index.js';

export const greetingTool: ToolDefinition = {
  name: "MCP 打招呼",
  description: "MCP 每次打招呼就说一句话",
  inputSchema: {},
  handler: async ({}) => {
    return { content: [{ type: "text", text: "Hello World" }] };
  }
};