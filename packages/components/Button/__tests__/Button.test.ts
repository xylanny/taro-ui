import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, markRaw } from "vue";
import Button from "../Button.vue";

// 自定义组件，仅渲染出<span class="custom-tag">
const CustomTag = markRaw(
  defineComponent({
    name: "CustomTag",
    render: () => h("span", { class: "custom-tag" }),
  }),
);

describe("按钮渲染", () => {
  it("默认渲染", () => {
    // 将组件挂载到一个真实的DOM容器中，给定一个插槽内容
    const wrapper = mount(Button, { slots: { default: "提交" } });
    // 断言根DOM节点是button元素
    expect(wrapper.element.tagName).toBe("BUTTON");
    // 断言存在.ta-button
    expect(wrapper.classes()).toContain("ta-button");
    // 断言类型为button
    expect((wrapper.element as HTMLButtonElement).type).toBe("button");
    // 断言为禁用
    expect((wrapper.element as HTMLButtonElement).disabled).toBe(false);
    // 断言插槽内容渲染成功
    expect(wrapper.text()).toBe("提交");
  });

  it("tag不是button时，不渲染type元素属性", () => {
    const submit = mount(Button, { props: { nativeType: "submit" } });
    expect((submit.element as HTMLButtonElement).type).toBe("submit");
    const anchor = mount(Button, { props: { tag: "a" } });
    expect(anchor.element.tagName).toBe("A");
    expect(anchor.attributes("type")).toBeUndefined();
  });

  it("传组件对象给tag时，渲染该组件", () => {
    const wrapper = mount(Button, { props: { tag: CustomTag } });
    expect(wrapper.find(".custom-tag").exists()).toBe(true);
    expect(wrapper.classes()).toContain("ta-button");
  });

  it("设置禁用或者加载中，生成对应的类名", () => {
    const disabled = mount(Button, { props: { disabled: true } });
    expect((disabled.element as HTMLButtonElement).disabled).toBe(true);
    expect(disabled.classes()).toContain("is-disabled");

    const loading = mount(Button, { props: { loading: true } });
    expect((loading.element as HTMLButtonElement).disabled).toBe(true);
    expect(loading.classes()).toContain("is-loading");
  });
});

describe("按钮变体", () => {
  it("使用type与size生成对应变体类；默认 type 为 primary，不传 size 不生成", () => {
    for (const type of [
      "primary",
      "success",
      "info",
      "warning",
      "danger",
    ] as const) {
      expect(mount(Button, { props: { type } }).classes()).toContain(
        `ta-button--${type}`,
      );
    }
    for (const size of ["large", "default", "small"] as const) {
      expect(mount(Button, { props: { size } }).classes()).toContain(
        `ta-button--${size}`,
      );
    }

    // 组件把 type 的默认值设成了 primary
    expect(mount(Button).classes()).toContain("ta-button--primary");
    // size 没有默认值，不传就不应生成任何 size 变体类
    expect(
      mount(Button)
        .classes()
        .filter(
          (name) =>
            name.startsWith("ta-button--") && name !== "ta-button--primary",
        ),
    ).toEqual([]);
  });

  it("使用plain/round/circle 生成对应形状类", () => {
    expect(mount(Button, { props: { plain: true } }).classes()).toContain(
      "is-plain",
    );
    expect(mount(Button, { props: { round: true } }).classes()).toContain(
      "is-round",
    );
    expect(mount(Button, { props: { circle: true } }).classes()).toContain(
      "is-circle",
    );
  });
});

describe("按钮图标", () => {
  it("icon渲染为图标元素，且位于插槽内容之前；不传则不渲染", () => {
    const wrapper = mount(Button, {
      props: { icon: "ta-icon-plus" },
      slots: { default: "提交" },
    });

    const firstChild = wrapper.element.firstElementChild as Element;
    expect(firstChild.className).toContain("ta-button__icon");
    expect(firstChild.className).toContain("ta-icon-plus");
    expect(wrapper.text()).toBe("提交");

    expect(mount(Button).find(".ta-button__icon").exists()).toBe(false);
  });

  it("loading时，loadingIcon顶替icon与内置指示器；未传loadingIcon时，回退内置指示器", () => {
    const withIcon = mount(Button, {
      props: {
        loading: true,
        icon: "ta-icon-plus",
        loadingIcon: "ta-icon-loading",
      },
    });

    const icon = withIcon.find(".ta-button__icon");
    expect(icon.classes()).toContain("ta-icon-loading");
    expect(icon.classes()).not.toContain("ta-icon-plus");
    expect(icon.classes()).not.toContain("ta-button__icon--loading");

    const fallback = mount(Button, { props: { loading: true } });
    expect(fallback.find(".ta-button__icon").classes()).toContain(
      "ta-button__icon--loading",
    );
  });
});

describe("按钮点击", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("throttling=false时每次点击都派发MouseEvent", async () => {
    const wrapper = mount(Button, { props: { throttling: false } });

    await wrapper.trigger("click");
    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toHaveLength(2);
    expect(wrapper.emitted("click")?.[0]?.[0]).toBeInstanceOf(MouseEvent);
  });

  it("采用默认节流，窗口内只派发一次且不补发；窗口长度取duration，结束后恢复", async () => {
    vi.useFakeTimers();
    const wrapper = mount(Button, { props: { duration: 1000 } });

    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);

    await wrapper.trigger("click");
    await wrapper.trigger("click");
    vi.advanceTimersByTime(999);
    expect(wrapper.emitted("click")).toHaveLength(1);

    vi.advanceTimersByTime(1);
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(2);
  });
});
