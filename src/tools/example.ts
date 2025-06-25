import { ToolDefinition } from './index.js';
import { z } from 'zod';

// 示例：计算器工具
export const calculatorTool: ToolDefinition = {
  name: "计算器",
  description: "执行基本的数学计算",
  inputSchema: {
    type: "object",
    properties: {
      operation: {
        type: "string",
        enum: ["add", "subtract", "multiply", "divide"],
        description: "要执行的数学运算"
      },
      a: {
        type: "number",
        description: "第一个数字"
      },
      b: {
        type: "number",
        description: "第二个数字"
      }
    },
    required: ["operation", "a", "b"]
  },
  handler: async ({ operation, a, b }) => {
    let result: number;
    
    switch (operation) {
      case "add":
        result = a + b;
        break;
      case "subtract":
        result = a - b;
        break;
      case "multiply":
        result = a * b;
        break;
      case "divide":
        if (b === 0) {
          throw new Error("除数不能为零");
        }
        result = a / b;
        break;
      default:
        throw new Error(`不支持的运算: ${operation}`);
    }
    
    return {
      content: [{
        type: "text",
        text: `${a} ${operation} ${b} = ${result}`
      }]
    };
  }
};

// 示例：时间工具
export const timeTool: ToolDefinition = {
  name: "获取时间",
  description: "获取当前时间信息",
  inputSchema: {
    type: "object",
    properties: {
      format: {
        type: "string",
        enum: ["iso", "locale", "timestamp"],
        description: "时间格式",
        default: "locale"
      }
    }
  },
  handler: async ({ format = "locale" }) => {
    const now = new Date();
    let timeString: string;
    
    switch (format) {
      case "iso":
        timeString = now.toISOString();
        break;
      case "timestamp":
        timeString = now.getTime().toString();
        break;
      case "locale":
      default:
        timeString = now.toLocaleString('zh-CN');
        break;
    }
    
    return {
      content: [{
        type: "text",
        text: `当前时间: ${timeString}`
      }]
    };
  }
};