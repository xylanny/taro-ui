import type { Component, Ref } from "vue";

export type ButtonType = "primary" | "success" | "info" | "warning" | "danger";

export type NativeType = "button" | "reset" | "submit";

export type ButtonSize = "large" | "default" | "small";

export interface ButtonProps {
  tag?: string | Component;
  type?: ButtonType;
  nativeType?: NativeType;
  size?: ButtonSize;
  disabled?: boolean;
  icon?: string;
  loading?: boolean;
  loadingIcon?: string;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  autofocus?: boolean;
  throttling?: boolean;
  duration?: number;
}

export interface ButtonEmits {
  (e: "click", val: MouseEvent): void;
}

export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>;
}
