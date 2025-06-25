import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { Hono } from "hono";
import { ToolManager, toolRegistry } from "./tools/index.js";
import { PromptManager, promptRegistry } from "./prompts/index.js";

export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "diagramly-mcp-serverless",
		version: "1.0.0",
	});
	private toolManager = new ToolManager(toolRegistry);
	private promptManager = new PromptManager(promptRegistry);
	
	async init() {
    console.log("Initializing MyMCP...");
		// 应用所有注册的工具到服务器
		this.toolManager.applyToServer(this.server);
		// 应用所有注册的 prompt 到服务器
		this.promptManager.applyToServer(this.server);
	}
}

const app = new Hono<{ Bindings: Env }>()

app.mount('/mcp', MyMCP.serve('/mcp').fetch, { replaceRequest: false} )

export default app