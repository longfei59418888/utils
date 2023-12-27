import * as process from "process";

const ProgressBar = require("progress");
const chalk = require("chalk");


export const getProgressBar = (message: string, callback?: (() => void) | false, type = true, outTime = 60000, total = 100) => {
  const bar = new ProgressBar(`${message}:[:percent] [:bar]`, { total, width: 60 });
  let timer: NodeJS.Timeout;
  let timer2: NodeJS.Timeout;
  if (type && callback !== false) {
    timer = setInterval(function() {
      bar.tick((total - bar.curr) / (Math.random() * 20 + 10));
    }, 1000);
    timer2 = setTimeout(() => {
      callback?.();
      timer && clearInterval(timer);
      bar.terminate()
      console.log(chalk.red(`${message}: timeout error!`));
      process.exit(0);
    }, outTime);
  }

  return {
    end: (type = true) => {
      type && bar.tick(100);
      timer && clearInterval(timer);
      timer2 && clearTimeout(timer2);
    }
  };
};

export const exit = (...messages: string[]) => {
  messages.forEach(message => console.log(chalk.green(message)));
  process.exit(0);
};
