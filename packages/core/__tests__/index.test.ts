import { createApp } from "vue";
import { describe, expect, it } from "vitest";
import taroUI, { TaButton } from "../index";
import components from "../components";

// 建一个不挂载的应用实例，只用于断言组件注册结果
const createAppStub = () => createApp({ render: () => null });

describe("核心包入口", () => {
  it("默认导出的插件可被app.use", () => {
    const app = createAppStub();
    app.use(taroUI);
    expect(app.component("TaButton")).toBe(TaButton);
  });

  it("支持按需引用，可单独注册", () => {
    const app = createAppStub();
    expect(TaButton.install).toBeTypeOf("function");
    app.use(TaButton);
    expect(app.component("TaButton")).toBe(TaButton);
  });

  it("收录了按需导出的同一个组件实例", () => {
    expect(components).toContain(TaButton);
  });
});
