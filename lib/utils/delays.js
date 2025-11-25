const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = (min = 500, max = 2000) =>
  sleep(Math.floor(Math.random() * (max - min) + min));

export { sleep, randomDelay };
