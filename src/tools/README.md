# 工具管理系统

这个目录包含了 MCP 服务器的工具管理系统，采用模块化设计，便于扩展和维护。

## 架构概述

### 核心组件

- **`index.ts`** - 工具管理器和注册表
- **`greeting.ts`** - 打招呼工具示例
- **`example.ts`** - 更多工具示例（计算器、时间工具）

### 设计优势

1. **模块化**: 每个工具都在独立的文件中定义
2. **可扩展**: 添加新工具只需要几个简单步骤
3. **类型安全**: 使用 TypeScript 接口确保类型安全
4. **集中管理**: 所有工具在一个注册表中统一管理
5. **易于维护**: 清晰的文件结构和职责分离

## 如何添加新工具

### 步骤 1: 创建工具定义文件

```typescript
// src/tools/my-new-tool.ts
import { ToolDefinition } from './index';

export const myNewTool: ToolDefinition = {
  name: "我的新工具",
  description: "工具描述",
  inputSchema: {
    type: "object",
    properties: {
      // 定义输入参数
    },
    required: ["必需参数"]
  },
  handler: async (params) => {
    // 工具逻辑
    return {
      content: [{
        type: "text",
        text: "工具输出"
      }]
    };
  }
};
```

### 步骤 2: 导入工具

在 `index.ts` 中添加导入:

```typescript
import { myNewTool } from './my-new-tool';
```

### 步骤 3: 注册工具

将工具添加到 `toolRegistry` 数组:

```typescript
export const toolRegistry: ToolDefinition[] = [
  greetingTool,
  myNewTool, // 添加新工具
  // 其他工具...
];
```

## 工具定义接口

```typescript
interface ToolDefinition {
  name: string;           // 工具名称
  description: string;    // 工具描述
  inputSchema: any;       // 输入参数模式
  handler: (params: any) => Promise<any>; // 工具处理函数
}
```

## 示例工具

### 打招呼工具 (`greeting.ts`)
- 简单的无参数工具示例
- 返回固定的问候消息

### 计算器工具 (`example.ts`)
- 带参数的工具示例
- 支持基本数学运算
- 包含错误处理

### 时间工具 (`example.ts`)
- 可选参数的工具示例
- 支持多种时间格式
- 展示默认值处理

## 最佳实践

1. **文件命名**: 使用描述性的文件名，如 `calculator.ts`, `weather.ts`
2. **工具分组**: 相关的工具可以放在同一个文件中
3. **错误处理**: 在工具处理函数中添加适当的错误处理
4. **类型定义**: 为复杂的输入参数定义 TypeScript 类型
5. **文档**: 为每个工具添加清晰的描述和使用说明

## 工具管理器 API

`ToolManager` 类提供以下方法:

- `registerTool(tool)` - 注册单个工具
- `registerTools(tools)` - 批量注册工具
- `getAllTools()` - 获取所有注册的工具
- `getTool(name)` - 根据名称获取特定工具
- `applyToServer(server)` - 将所有工具应用到 MCP 服务器

这种架构使得工具管理变得简单而强大，支持项目的持续扩展和维护。