import { TaButton } from "@taro-ui/components";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
  title: "Component/Button", // 在Storybook左侧边栏中的分组和名称
  component: TaButton, // 这个文件描述的是TaButton组件

  // 自定义渲染函数（Vue3写法）
  render: (args) => ({
    components: { TaButton }, // 注册局部组件
    setup: () => ({ args }), // 传入args（就是一些参数）
    template: `<TaButton v-bind="args">button</TaButton>`, // 模板
  }),

  // 控制面板配置（每个属性怎么显示、怎么调）
  argTypes: {
    // 下拉框选择按钮类型
    type: {
      control: "select",
      options: ["primary", "success", "info", "warning", "danger"],
    },
    // 单选按钮选择尺寸
    size: {
      control: "inline-radio",
      options: ["large", "default", "small"],
    },
    // 禁用
    disabled: {
      control: "boolean",
    },
    // 图标
    icon: {
      control: "text",
    },
    // 加载
    loading: {
      control: "boolean",
    },
    // 加载图标
    loadingIcon: {
      control: "text",
    },
    // 形状
    plain: {
      control: "boolean",
    },
    round: {
      control: "boolean",
    },
    circle: {
      control: "boolean",
    },
    autofocus: {
      control: "boolean",
    },
    throttling: {
      control: "boolean",
    },
    duration: {
      control: "number",
    },
    // 记录点击事件
    onClick: { action: "click" },
    // 不在面板里显示，禁止手动修改
    tag: { control: false },
    nativeType: { control: false },
  },
} satisfies Meta<typeof TaButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { type: "primary", loading: true },
};

export const Disabled: Story = {
  args: { type: "primary", disabled: true },
};

export const Round: Story = {
  args: { type: "primary", round: true },
};
