const ProgressBar = require("progress");


const getProgressBar = (type = false, total = 100) => {
  const bar = new ProgressBar("progress:[:percent] [:bar]", { total, width: 60 });
  let timer;
  if (type) {
    timer = setInterval(function() {
      bar.tick((total - bar.curr) / (Math.random() * 20 + 10));
    }, 1000);
  }


  return {
    ...bar,
    end: (type) => {
      timer && clearInterval(timer);
      type ? bar.terminate() : bar.interrupt();
    }
  };
};

getProgressBar(true);




