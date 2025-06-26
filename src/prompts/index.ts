import { z } from 'zod';
import { mermaidFlowChartPrompt } from './mermaid-flowchart.js';

export interface PromptDefinition {
  name: string;
  config: {
    title: string;
    description: string;
    argsSchema: any;
  };
  handler: (args: any) => any;
}

// Prompt 注册表 - 在这里注册所有可用的 prompt
// 要添加新 prompt，只需:
// 1. 在对应的文件中定义 prompt
// 2. 导入 prompt
// 3. 添加到下面的数组中
export const promptRegistry: PromptDefinition[] = [
  mermaidFlowChartPrompt,
  // 在这里添加更多 prompt
];

// Prompt 管理器类
export class PromptManager {
  private prompts: Map<string, PromptDefinition> = new Map();

  constructor(prompts: PromptDefinition[] = []) {
    this.registerPrompts(prompts);
  }

  // 注册单个 prompt
  registerPrompt(prompt: PromptDefinition): void {
    this.prompts.set(prompt.name, prompt);
  }

  // 批量注册 prompt
  registerPrompts(prompts: PromptDefinition[]): void {
    prompts.forEach(prompt => this.registerPrompt(prompt));
  }

  // 获取所有 prompt
  getAllPrompts(): PromptDefinition[] {
    return Array.from(this.prompts.values());
  }

  // 获取特定 prompt
  getPrompt(name: string): PromptDefinition | undefined {
    return this.prompts.get(name);
  }

  // 应用 prompt 到 MCP 服务器
  applyToServer(server: any): void {
    this.prompts.forEach(prompt => {
      console.log(`Registering prompt: ${prompt.name}`);

      
      server.registerPrompt(
        prompt.name,
        prompt.config,
        prompt.handler
      );
    });
  }
}