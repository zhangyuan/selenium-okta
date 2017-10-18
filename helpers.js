const webdriver = require('selenium-webdriver');
const By = webdriver.By;

const waitUtilCssSelector = async (driver, path, max = 10, interval = 1000) => {
  let count = 0;

  while(true) {
    count ++;
    if (count > max) {
      throw new Error(`CSS selector [${path}] not found.`)
    }

    if((await driver.findElements(By.css(path))).length > 0) {
      break
    }
    await sleep(interval);
  }
};

const sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
};

module.exports = {
  waitUtilCssSelector,
  sleep
};