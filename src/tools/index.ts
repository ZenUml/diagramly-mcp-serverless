import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { greetingTool } from './greeting.js';
import { calculatorTool, timeTool } from './example.js';

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: any;
  handler: (params: any) => Promise<any>;
}

// 工具注册表 - 在这里注册所有可用的工具
// 要添加新工具，只需:
// 1. 在对应的文件中定义工具
// 2. 导入工具
// 3. 添加到下面的数组中
export const toolRegistry: ToolDefinition[] = [
  greetingTool,
  // 取消注释下面的行来启用示例工具
  // calculatorTool,
  // timeTool,
  // 在这里添加更多工具
];

// 工具注册器类
export class ToolManager {
  private tools: Map<string, ToolDefinition> = new Map();

  constructor(tools: ToolDefinition[] = []) {
    this.registerTools(tools);
  }

  // 注册单个工具
  registerTool(tool: ToolDefinition): void {
    this.tools.set(tool.name, tool);
  }

  // 批量注册工具
  registerTools(tools: ToolDefinition[]): void {
    tools.forEach(tool => this.registerTool(tool));
  }

  // 获取所有工具
  getAllTools(): ToolDefinition[] {
    return Array.from(this.tools.values());
  }

  // 获取特定工具
  getTool(name: string): ToolDefinition | undefined {
    return this.tools.get(name);
  }

  // 应用工具到 MCP 服务器
  applyToServer(server: any): void {
    this.tools.forEach(tool => {
      console.log(`Registering tool: ${tool.name}`);
      server.tool(
        tool.name,
        tool.description,
        tool.inputSchema,
        tool.handler
      );

      
    });
  }
}