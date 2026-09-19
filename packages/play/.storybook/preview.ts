import type { Preview } from "@storybook/vue3-vite";
import "@taro-ui/theme/index.css"; // 全局样式导入

// 在浏览器环境运行的前置配置
const preview: Preview = {
  parameters: {
    layout: "centered", // 组件实例在画布正中间，四周留白
  },
};

export default preview;
