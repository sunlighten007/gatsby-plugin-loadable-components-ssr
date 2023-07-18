import { unlinkSync } from "fs"
import path from "path"
import LoadablePlugin from "@loadable/webpack-plugin"

const isWin = process.platform === "win32";

const loadableStatsName = "loadable-stats-build-javascript.json";

const statsPath = path.join(process.cwd(), `/.cache/${loadableStatsName}`);

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (
    stage === "build-javascript" ||
    stage === "develop" ||
    stage === "develop-html"
  ) {
    actions.setWebpackConfig({
      plugins: [
        new LoadablePlugin({
          filename: statsPath,
          writeToDisk: true,
          outputAsset: !isWin
        }),
      ],
    })
  }
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({ name: "@loadable/babel-plugin" })
}
