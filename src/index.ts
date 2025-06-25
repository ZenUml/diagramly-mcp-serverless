import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { Hono } from "hono"

export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "diagramly-mcp-serverless",
		version: "1.0.0",
	});
	async init() {

	this.server.tool(
		"MCP 打招呼",
		"MCP 每次打招呼就说一句话",
		{
		},
		async ({}) => {
			return { content: [{ type: "text", text: "Hello World" }] };
		}
	);
		

	
	}
}

const app = new Hono<{ Bindings: Env }>()

app.mount('/mcp', MyMCP.serve('/mcp').fetch, { replaceRequest: false} )

export default app