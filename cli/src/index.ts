import commander from "commander";
import path from "path";
import shell from "shelljs";
import { Package } from "./types";
import prompts from "prompts";
import initProject from "./actions/init/react/index";


const localWebpack = require.resolve(path.join(process.cwd(), "node_modules", "xl_cli", "bin", "xl_cli.js"));
try {
  if (__filename !== localWebpack) {
    require(localWebpack);
  }
} catch (e) {
}

const info: Package = JSON.parse(shell.cat(path.join(__dirname, "../package.json")));
if (__filename === localWebpack) {
  commander
    .version(info.version)
    .usage("[cmd] [options]");
  commander
    .command("init-react <projectName>")
    .description("初始化一个 react 项目：react + react-router-dom + styled-components + webpack + jest")
    .action(async () => {
      const response = await prompts({
        type: "text",
        name: "name",
        message: "输入项目名称！"
      });
      initProject(response.name);
    });
}
