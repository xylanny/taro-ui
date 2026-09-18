<template>
  <component
    :is="tag"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    :autofocus="autofocus"
    ref="_ref"
    @click="
      (e: MouseEvent) =>
        throttling ? handleBtnClickThrottle(e) : handleBtnClick(e)
    "
    class="ta-button"
    :class="{
      [`ta-button--${type}`]: type,
      [`ta-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
  >
    <i
      v-if="loading"
      class="ta-button__icon"
      :class="loadingIcon || 'ta-button__icon--loading'"
    ></i>
    <i v-else-if="icon" class="ta-button__icon" :class="icon"> </i>

    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ButtonInstance, ButtonEmits, ButtonProps } from "./type";
import { throttle } from "lodash-es";

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button", // 使用button元素
  nativeType: "button",
  throttling: true, // 使用节流
  duration: 500,
});

// 命名组件，方便全局注册使用
defineOptions({
  name: "TaButton",
});

// click事件
const emits = defineEmits<ButtonEmits>();
const handleBtnClick = (e: MouseEvent) => emits("click", e);
const handleBtnClickThrottle = throttle(handleBtnClick, props.duration, {
  trailing: false, // 一次连点最多只响应一次
});

// 插槽类型安全（这里插槽不向父组件传出数据）
defineSlots<{
  default(): any;
}>();

// 组件引用
const _ref = ref<HTMLButtonElement>();
defineExpose<ButtonInstance>({
  ref: _ref,
});
</script>

<style scoped>
@import url("./style.css");
</style>
