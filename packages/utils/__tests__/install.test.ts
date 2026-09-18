import { createApp, defineComponent, h, type App, type Plugin } from "vue";
import { describe, expect, it, vi } from "vitest";
import { attachInstall, createInstaller } from "../install";

/**
 * 伪造App实例的工厂函数
 *
 * @returns 伪造的App实例
 */
function createSpyApp() {
  // 创建模拟app.use的spy函数
  const use = vi.fn();
  // 创建模拟app.component的spy函数
  const component = vi.fn();

  // 由于这个app对象只有两个方法则不满足App类型定义，使用双重断言
  return { app: { use, component } as unknown as App, use, component };
}

// 定义一个真实Vue组件
const VueComponentDemo = defineComponent({
  name: "VueComponentDemo", // 命名组件
  render: () => h("div", "demo"), // 定义渲染函数
});

// 开启第一个测试分组
describe("attachInstall test", () => {
  // 定义测试用例
  it("返回原组件本身，不改变引用", () => {
    // 断言attachInstall()的返回值与传入的组件是同一个引用
    expect(attachInstall(VueComponentDemo)).toBe(VueComponentDemo);
  });

  it("为组件挂上install方法，使其可作为插件使用", () => {
    // 断言attachInstall()返回值的install属性是函数类型
    expect(typeof attachInstall(VueComponentDemo).install).toBe("function");
  });

  it("安装插件时，以组件的name作为注册名", () => {
    const { app, component } = createSpyApp();
    // 给组件扩展install()，然后调用传递伪造的App实例
    attachInstall(VueComponentDemo).install(app);
    // 断言component()恰好被调用一次
    expect(component).toHaveBeenCalledTimes(1);
    // 断言component()调用时，传入的第一个参数、第二个参数
    expect(component).toHaveBeenCalledWith(
      "VueComponentDemo",
      VueComponentDemo,
    );
  });

  it("增强后的组件，可直接交给app.use完成全局注册", () => {
    // 创建一个真实App实例app
    const app = createApp({ render: () => null });
    // 将扩展了install()的组件注册到app
    app.use(attachInstall(VueComponentDemo));
    // 断言能在应用中取出注册的组件，且引用相同
    expect(app.component("VueComponentDemo")).toBe(VueComponentDemo);
  });

  it("保留组件原有的选项，不破坏其作为普通组件的用法", () => {
    const withInstall = attachInstall(VueComponentDemo);
    // 断言name属性存在且值正确
    expect(withInstall.name).toBe("VueComponentDemo");
    // 断言渲染函数引用不变
    expect(withInstall.render).toBe(VueComponentDemo.render);
  });
});

// 开启第二个测试分组
describe("createInstaller", () => {
  it("返回函数，满足Vue插件的函数式写法", () => {
    // 期望createInstaller()返回值是函数类型
    expect(typeof createInstaller([])).toBe("function");
  });

  it("没有任何子插件时，安装不会调用app.use", () => {
    // 创建伪造的App实例，解构出use()
    const { app, use } = createSpyApp();
    // 用空数组创建总安装器，立即调用
    createInstaller([])(app);
    // 断言app.use()没有被调用
    expect(use).not.toHaveBeenCalled();
  });

  it("安装时按传入顺序依次app.use每个插件", () => {
    const { app, use } = createSpyApp();
    // 创建三个伪造插件
    const plugins: Plugin[] = [
      { install: vi.fn() },
      { install: vi.fn() },
      { install: vi.fn() },
    ];
    // 创建总安装器，立即调用
    createInstaller(plugins)(app);
    // 断言app.use()被调用次数等于插件数量
    expect(use).toHaveBeenCalledTimes(plugins.length);
    expect(use.mock.calls.map(([plugin]) => plugin)).toEqual(plugins);
  });

  it("可作为插件交给app.use，批量注册多个组件", () => {
    const A = defineComponent({ name: "A", render: () => null });
    const B = defineComponent({ name: "B", render: () => null });
    const app = createApp({ render: () => null });

    app.use(createInstaller([attachInstall(A), attachInstall(B)]));

    expect(app.component("A")).toBe(A);
    expect(app.component("B")).toBe(B);
  });
});
