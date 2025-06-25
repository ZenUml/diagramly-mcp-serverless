# Diagramly MCP Serverless

一个基于 Cloudflare Worker 的 Model Context Protocol (MCP) 服务器，使用 TypeScript 开发，支持 Streamable HTTP 传输协议。

## 功能特性

- 🚀 基于 Cloudflare Workers 的无服务器架构
- 📡 支持最新的 MCP Streamable HTTP 传输协议
- 🛠️ 可扩展的工具框架
- 📝 可扩展的提示模板框架
- 🔧 TypeScript 类型安全
- 🌐 CORS 支持
- 💡 简单的项目结构，易于扩展

## 项目结构

```
diagramly-mcp-serverless/
├── src/
│   └── index.ts          # 主要的 Worker 代码
├── package.json          # 项目依赖
├── tsconfig.json         # TypeScript 配置
├── wrangler.toml         # Cloudflare Worker 配置
└── README.md            # 项目说明
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 本地开发

```bash
npm run dev
```

这将启动本地开发服务器，通常在 `http://localhost:8787`

### 3. 部署到 Cloudflare

```bash
npm run deploy
```

## API 端点

- `POST /mcp` - MCP 协议通信端点
- `GET /health` - 健康检查端点
- `OPTIONS /*` - CORS 预检请求处理

## 内置功能

### 工具 (Tools)

当前包含一个示例工具：

- **hello_world**: 简单的问候工具
  - 参数: `name` (可选字符串)
  - 功能: 返回个性化或通用问候语

### 提示 (Prompts)

当前包含一个示例提示：

- **empty_prompt**: 空提示模板
  - 用于演示提示框架结构

## 扩展指南

### 添加新工具

在 `src/index.ts` 的 `registerTools` 函数中添加新工具：

```typescript
server.registerTool(
  "your_tool_name",
  {
    title: "Your Tool Title",
    description: "Tool description",
    inputSchema: {
      param1: z.string().describe("Parameter description"),
      param2: z.number().optional().describe("Optional parameter")
    }
  },
  async ({ param1, param2 }) => {
    // 工具实现逻辑
    return {
      content: [{
        type: "text",
        text: "Tool result"
      }]
    };
  }
);
```

### 添加新提示

在 `src/index.ts` 的 `registerPrompts` 函数中添加新提示：

```typescript
server.registerPrompt(
  "your_prompt_name",
  {
    title: "Your Prompt Title",
    description: "Prompt description",
    arguments: [
      {
        name: "arg1",
        description: "Argument description",
        required: true
      }
    ]
  },
  async (args) => {
    return {
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Prompt with argument: ${args.arg1}`
        }
      }]
    };
  }
);
```

## 技术栈

- **运行时**: Cloudflare Workers
- **语言**: TypeScript
- **MCP SDK**: @modelcontextprotocol/sdk (v1.13.1)
- **传输协议**: Streamable HTTP
- **验证**: Zod
- **构建工具**: Wrangler

## 配置

### 环境变量

在 `wrangler.toml` 中可以配置环境变量：

```toml
[vars]
ENVIRONMENT = "production"
API_KEY = "your-api-key"
```

### 存储选项

如需要持久化存储，可以在 `wrangler.toml` 中配置：

- **KV Storage**: 键值存储
- **D1 Database**: SQLite 数据库
- **R2 Storage**: 对象存储

## 开发命令

```bash
# 本地开发
npm run dev

# 构建项目
npm run build

# 部署到 Cloudflare
npm run deploy

# 类型检查
npm run type-check
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！