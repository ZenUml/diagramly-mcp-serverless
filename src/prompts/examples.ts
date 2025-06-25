import { z } from 'zod';
import { PromptDefinition } from './index.js';

// 示例：文档生成 prompt
export const generateDocsPrompt: PromptDefinition = {
  name: "generate-docs",
  config: {
    title: "Generate Documentation",
    description: "Generate documentation for code or API",
    argsSchema: {
      code: z.string().describe("The code to document"),
      type: z.enum(["function", "class", "api"]).describe("Type of documentation to generate")
    }
  },
  handler: ({ code, type }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `Please generate ${type} documentation for the following code:\n\n${code}\n\nInclude descriptions, parameters, return values, and usage examples.`
      }
    }]
  })
};

// 示例：代码优化 prompt
export const optimizeCodePrompt: PromptDefinition = {
  name: "optimize-code",
  config: {
    title: "Optimize Code",
    description: "Suggest optimizations for performance and readability",
    argsSchema: {
      code: z.string().describe("The code to optimize"),
      language: z.string().optional().describe("Programming language (auto-detected if not provided)"),
      focus: z.enum(["performance", "readability", "both"]).default("both").describe("Optimization focus")
    }
  },
  handler: ({ code, language, focus }) => {
    const languageText = language ? ` (${language})` : "";
    const focusText = focus === "both" ? "performance and readability" : focus;
    
    return {
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Please optimize the following code${languageText} for ${focusText}:\n\n${code}\n\nProvide the optimized version with explanations of the changes made.`
        }
      }]
    };
  }
};

// 示例：测试生成 prompt
export const generateTestsPrompt: PromptDefinition = {
  name: "generate-tests",
  config: {
    title: "Generate Tests",
    description: "Generate unit tests for the provided code",
    argsSchema: {
      code: z.string().describe("The code to test"),
      framework: z.string().optional().describe("Testing framework to use"),
      coverage: z.enum(["basic", "comprehensive"]).default("basic").describe("Test coverage level")
    }
  },
  handler: ({ code, framework, coverage }) => {
    const frameworkText = framework ? ` using ${framework}` : "";
    const coverageText = coverage === "comprehensive" ? "comprehensive" : "basic";
    
    return {
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Please generate ${coverageText} unit tests${frameworkText} for the following code:\n\n${code}\n\nInclude test cases for normal operation, edge cases, and error conditions.`
        }
      }]
    };
  }
};

// 示例：代码解释 prompt
export const explainCodePrompt: PromptDefinition = {
  name: "explain-code",
  config: {
    title: "Explain Code",
    description: "Provide detailed explanation of how code works",
    argsSchema: {
      code: z.string().describe("The code to explain"),
      level: z.enum(["beginner", "intermediate", "advanced"]).default("intermediate").describe("Explanation detail level")
    }
  },
  handler: ({ code, level }: { code: string; level: "beginner" | "intermediate" | "advanced" }) => {
    const levelDescriptions: Record<"beginner" | "intermediate" | "advanced", string> = {
      beginner: "in simple terms suitable for beginners",
      intermediate: "with moderate technical detail",
      advanced: "with comprehensive technical analysis"
    };
    
    return {
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Please explain how this code works ${levelDescriptions[level]}:\n\n${code}\n\nBreak down the logic, explain key concepts, and describe the overall flow.`
        }
      }]
    };
  }
};