# Prompt 管理系统

这个目录包含了 MCP 服务器的 prompt 管理系统，采用模块化设计，便于扩展和维护。

## 架构概述

### 核心组件

- **`index.ts`** - Prompt 管理器和注册表
- **`code-review.ts`** - 代码审查 prompt
- **`examples.ts`** - 更多 prompt 示例（文档生成、代码优化、测试生成、代码解释）

### 设计优势

1. **模块化**: 每个 prompt 都在独立的文件中定义
2. **可扩展**: 添加新 prompt 只需要几个简单步骤
3. **类型安全**: 使用 TypeScript 接口和 Zod 确保类型安全
4. **集中管理**: 所有 prompt 在一个注册表中统一管理
5. **易于维护**: 清晰的文件结构和职责分离
6. **参数验证**: 使用 Zod schema 进行输入参数验证

## 如何添加新 Prompt

### 步骤 1: 创建 prompt 定义文件

```typescript
// src/prompts/my-new-prompt.ts
import { z } from 'zod';
import { PromptDefinition } from './index.js';

export const myNewPrompt: PromptDefinition = {
  name: "my-prompt",
  config: {
    title: "我的新 Prompt",
    description: "Prompt 描述",
    argsSchema: {
      input: z.string().describe("输入参数描述"),
      option: z.enum(["option1", "option2"]).optional().describe("可选参数")
    }
  },
  handler: ({ input, option }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `处理输入: ${input}${option ? ` 选项: ${option}` : ''}`
      }
    }]
  })
};
```

### 步骤 2: 导入 prompt

在 `index.ts` 中添加导入:

```typescript
import { myNewPrompt } from './my-new-prompt.js';
```

### 步骤 3: 注册 prompt

将 prompt 添加到 `promptRegistry` 数组:

```typescript
export const promptRegistry: PromptDefinition[] = [
  codeReviewPrompt,
  myNewPrompt, // 添加新 prompt
  // 其他 prompt...
];
```

## Prompt 定义接口

```typescript
interface PromptDefinition {
  name: string;           // Prompt 名称（唯一标识符）
  config: {               // Prompt 配置
    title: string;        // 显示标题
    description: string;  // 描述
    argsSchema: any;      // 参数模式（使用 Zod）
  };
  handler: (args: any) => any; // Prompt 处理函数
}
```

## 示例 Prompt

### 代码审查 Prompt (`code-review.ts`)
- 审查代码的最佳实践和潜在问题
- 参数：`code` (string) - 要审查的代码

### 文档生成 Prompt (`examples.ts`)
- 为代码或 API 生成文档
- 参数：
  - `code` (string) - 要文档化的代码
  - `type` (enum) - 文档类型：function, class, api

### 代码优化 Prompt (`examples.ts`)
- 建议性能和可读性优化
- 参数：
  - `code` (string) - 要优化的代码
  - `language` (string, optional) - 编程语言
  - `focus` (enum) - 优化重点：performance, readability, both

### 测试生成 Prompt (`examples.ts`)
- 为提供的代码生成单元测试
- 参数：
  - `code` (string) - 要测试的代码
  - `framework` (string, optional) - 测试框架
  - `coverage` (enum) - 测试覆盖级别：basic, comprehensive

### 代码解释 Prompt (`examples.ts`)
- 详细解释代码如何工作
- 参数：
  - `code` (string) - 要解释的代码
  - `level` (enum) - 解释详细程度：beginner, intermediate, advanced

## 参数模式最佳实践

使用 Zod 定义参数模式时的建议：

```typescript
// 基本类型
z.string().describe("参数描述")
z.number().min(1).max(100).describe("1-100之间的数字")
z.boolean().describe("布尔值")

// 可选参数
z.string().optional().describe("可选字符串")
z.number().default(10).describe("默认值为10的数字")

// 枚举
z.enum(["option1", "option2", "option3"]).describe("选择选项")

// 数组
z.array(z.string()).describe("字符串数组")

// 对象
z.object({
  name: z.string(),
  age: z.number()
}).describe("用户对象")
```

## Prompt 管理器 API

`PromptManager` 类提供以下方法:

- `registerPrompt(prompt)` - 注册单个 prompt
- `registerPrompts(prompts)` - 批量注册 prompt
- `getAllPrompts()` - 获取所有注册的 prompt
- `getPrompt(name)` - 根据名称获取特定 prompt
- `applyToServer(server)` - 将所有 prompt 应用到 MCP 服务器

## 最佳实践

1. **文件命名**: 使用描述性的文件名，如 `code-analysis.ts`, `documentation.ts`
2. **Prompt 分组**: 相关的 prompt 可以放在同一个文件中
3. **参数验证**: 使用 Zod schema 进行严格的参数验证
4. **错误处理**: 在 prompt 处理函数中添加适当的错误处理
5. **描述清晰**: 为每个参数添加清晰的描述
6. **类型定义**: 为复杂的参数定义 TypeScript 类型
7. **文档**: 为每个 prompt 添加清晰的使用说明

## 与工具系统的协同

这个 prompt 管理系统与现有的工具管理系统完美协同工作：

- **工具 (Tools)**: 执行具体的操作和计算
- **Prompt**: 生成结构化的对话和指令

两个系统都采用相同的模块化架构，使得整个 MCP 服务器易于扩展和维护。

这种架构使得 prompt 管理变得简单而强大，支持项目的持续扩展和维护。