#!/usr/bin/env node

import commander from "commander";
import path from "path";
import shell from "shelljs";
import { Package } from "./types";
import prompts from "prompts";
import initProject from "./actions/init/react/index";



function cli() {
  try {
    const localWebpack = require.resolve(path.join(process.cwd(), "node_modules", "@xlong/cli", "bin", "index.js"));
    if (__filename !== localWebpack) {
      return require(localWebpack);
    }
  } catch (e) {
  }

  const info: Package = JSON.parse(shell.cat(path.join(__dirname, "../package.json")));
  commander
    .version(info.version)
    .usage("[cmd] [options]");
  commander
    .command("init-react")
    .description("初始化一个 react 项目：react + react-router-dom + styled-components + webpack + jest")
    .action(async () => {
      const response = await prompts({
        type: "text",
        name: "name",
        message: "输入项目名称！"
      });
      initProject(response.name);
    });
  commander.parse(process.argv);
}

cli();
