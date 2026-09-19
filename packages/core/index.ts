import "@taro-ui/theme/index.css";
import components from "./components";
import { createInstaller } from "../utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
const installer = createInstaller(components);

// 类型产出时它们会被一起编译进 dist/types，相对引用才能在产物内部自解析
export * from "../components";

export default installer;
