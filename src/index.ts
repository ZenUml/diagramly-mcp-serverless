import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { Hono } from "hono";
import { ToolManager, toolRegistry } from "./tools/index.js";

export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "diagramly-mcp-serverless",
		version: "1.0.0",
	});
	
	private toolManager = new ToolManager(toolRegistry);
	
	async init() {
		// 应用所有注册的工具到服务器
		this.toolManager.applyToServer(this.server);
    this.server.registerPrompt(
      "review-code",
      {
        title: "Code Review",
        description: "Review code for best practices and potential issues",
        argsSchema: { code: z.string() }
      },
      ({ code }) => ({
        messages: [{
          role: "user",
          content: {
            type: "text",
            text: `Please review this code:\n\n${code}`
          }
        }]
      })
    );
	}
}

const app = new Hono<{ Bindings: Env }>()

app.mount('/mcp', MyMCP.serve('/mcp').fetch, { replaceRequest: false} )

export default app