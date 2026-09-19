# Changesets

这个目录用来记录"本次改动要不要发版、发什么版本"。流程：

## 1. 开发时：添加 changeset

```bash
pnpm changeset
```

交互式选包、选 bump 类型（patch / minor / major），写一句变更说明。
它会生成一个 Markdown 文件提交到仓库里，随 PR 一起合并。

## 2. 合并到 main 后：版本与发布

交给 CI（`.github/workflows/release.yaml`）自动完成，等价于手动执行：

```bash
pnpm run version-packages   # = changeset version，消费 changeset 并改写版本号 + CHANGELOG
pnpm run release            # = 构建 + changeset publish，真正推到 npm
```

CI 的行为是：有未消费的 changeset 时，开一个 "chore: release" 的 PR；
该 PR 被合并后，才真正执行构建与 `npm publish`。

## 只发布 taro-ui 一个包

本仓库只有 `packages/core`（包名 `taro-ui`）会发布到 npm —— 它的构建会把
`@taro-ui/components`、`@taro-ui/utils`、`@taro-ui/theme` 的内容打包进 `dist`。

因此 `config.json` 的 `ignore` 里列出了其余 6 个工作区包，避免 changesets
把它们也当成待发布对象。

> 注意：`ignore` 只影响 changesets 的版本与发布行为，不会让包变成 `private`。
> 如果以后要单独发布某个子包，把它从 `ignore` 中移除，并给它补上构建与发布配置。

## 发布前需要配置的仓库密钥

在 GitHub 仓库的 Settings → Secrets and variables → Actions 里添加：

- `NPM_TOKEN`：npm 账号的 Automation Token（用于 `npm publish`）

`GITHUB_TOKEN` 由 Actions 自动提供，用于开 release PR 与推 tag。
