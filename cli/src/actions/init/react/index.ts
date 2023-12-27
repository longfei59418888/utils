import path from "path";

const download = require("download-git-repo");
const tmp = require("tmp");
const chalk = require("chalk");
const cp = require("child_process");
import shell from "shelljs";
import { exit, getProgressBar } from "../../../utils";
import process from "process";

const cwd = process.cwd();
const initProject = (name: string) => {
  const dir = tmp.dirSync();
  const targetDir = path.join(cwd, name);
  const progressPull = getProgressBar("pull code", () => dir.removeCallback());
  download("longfei59418888/templates", dir.name, (err: unknown) => {
    try {
      if (err) chalk.red("pull longfei59418888/templates error!");
      else {
        shell.mkdir("-p", targetDir);
        cp.execSync(`cp -rf ${path.join(dir.name, "init/react-webpack", "/")} ${targetDir}`);
        progressPull.end();


      }
    } catch (e) {
    }
    dir.removeCallback();
    exit("创建项目已成功，你可以执行一下步骤启动项目：", `  1. cd ${name}`, "  2. yarn install", "  3. yun run start");
  });
};

export default initProject;
