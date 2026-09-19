import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faHeart,
  faPlus,
  faSearch,
  faSpinner,
  faStar,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import type { Preview } from "@storybook/vue3-vite";
import "@taro-ui/theme/index.css"; // 全局样式导入

/*
 * 图标按「名字」引用（<TaIcon icon="search" />）的前提：图标必须先注册进
 * FontAwesome 的 library。这件事属于使用方的初始化，由应用入口负责 —— 
 * 组件库本身不绑定任何图标集，所以不放进 @taro-ui/components。
 * 这里就相当于业务应用的入口。
 *
 * 需要更多图标时往下面这行里加；想一次注册整套可以 import { fas } 后
 * library.add(fas)（体积会明显变大）。
 * 注：FA 内部维护了改名别名表，注册 faSearch 后 "search" 与
 * "magnifying-glass" 两个名字都能解析。
 */
library.add(
  faSearch,
  faUser,
  faStar,
  faHeart,
  faSpinner,
  faCheck,
  faXmark,
  faPlus,
);

// 在浏览器环境运行的前置配置
const preview: Preview = {
  parameters: {
    layout: "centered", // 组件实例在画布正中间，四周留白
  },
};

export default preview;
