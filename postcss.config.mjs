import postcssColorMix from "postcss-color-mix";
import postcssEach from "postcss-each";
import postcssEachVariables from "postcss-each-variables";
import postcssFor from "postcss-for";
import postcssNested from "postcss-nested";

export default {
  plugins: [
    postcssEachVariables(),
    postcssEach(),
    postcssFor(),
    postcssColorMix(),
    postcssNested(),
  ],
};
