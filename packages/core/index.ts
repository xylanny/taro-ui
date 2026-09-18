import "@taro-ui/theme/index.css";
import components from "./components";
import { createInstaller } from "@taro-ui/utils";

const installer = createInstaller(components);

export * from "@taro-ui/components"; // 按需引用

export default installer; // 全局注册
