import "@taro-ui/theme/index.css";
import components from "./components";
import { createInstaller } from "@taro-ui/utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

// fas，“Font Awesome Solid”，即实心风格的整套图标
// 把fas这一整套图标注册进全局library；注册后，就可以用字符串名字来引用图标。比如，<font-awesome-icon icon="user" />
library.add(fas);
const installer = createInstaller(components);

export * from "@taro-ui/components"; // 按需引用

export default installer; // 全局注册
