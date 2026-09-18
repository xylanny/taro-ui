import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "utils",
    environment: "jsdom", // 测试运行在JSDOM模拟的浏览器环境中
    include: ["__tests__/**/*.{test,spec}.{ts,tsx}"], // 测试文件位置
    clearMocks: true, // 每个测试用例开始前，清空所有mock的调用记录
    restoreMocks: true, // 每个测试用例开始前，所有mock恢复到原始实现

    // 覆盖率配置
    coverage: {
      provider: "v8", // 采用V8引擎原生覆盖率
      reporter: ["text"], // 覆盖率报告输出格式采用终端输出
      include: ["**/*.{ts,tsx,vue}"], // 统计范围
      exclude: [
        "**/*.config.ts",
        "**/*.d.ts",
        "**/__tests__/**",
        "**/*.stories.{ts,tsx,js,jsx}",
      ],
    },
  },
});
