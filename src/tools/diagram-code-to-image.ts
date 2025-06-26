import { ToolDefinition } from './index.js';
import * as pako from 'pako';
import { z } from "zod";
// 辅助函数：将 Uint8Array 转换为 Base64 字符串
function uint8ArrayToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export const diagramCodeToImageTool: ToolDefinition = {
  name: "diagram-code-to-image",
  description: "将 Mermaid 图表代码转换为 PNG 图像",
  inputSchema: {
      diagramCode: z.string()
  },
  handler: async ({ diagramCode }) => {
    try {
      console.log(`start to compress diagram code: ${diagramCode}`)
      const data = Buffer.from(diagramCode, 'utf8') 
      console.log(`data length: ${data.length}`)
      const compressed = pako.deflate(data, { level: 9 }) 
      console.log(`compressed length: ${compressed.length}`)
      const encodedValue = Buffer.from(compressed)
        .toString('base64') 
        .replace(/\+/g, '-').replace(/\//g, '_') 

      // 步骤 4: 创建完整的 Kroki URL
      const krokiUrl = `https://kroki.io/mermaid/png/${encodedValue}`;
      console.log("Generated Kroki URL:", krokiUrl);


      // 步骤 5: 使用 fetch 从 Kroki 获取图像数据
      const response = await fetch(krokiUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch image from Kroki: ${response.status} ${response.statusText}`);
      }
      
      const imageArrayBuffer = await response.arrayBuffer();
      const imageBytes = new Uint8Array(imageArrayBuffer);
      const base64Data = uint8ArrayToBase64(imageBytes);
      
      return {
        content: [
          {
            type: "image",
            data: base64Data,
            mimeType: "image/png",
            alt_text: "Mermaid diagram generated from code"
          }
        ]
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`图表转换失败: ${errorMessage}`);
    }
  }
};