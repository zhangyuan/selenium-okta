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

const waitUtilXPathSelector = async (driver, path, max = 10, interval = 1000) => {
  let count = 0;

  while(true) {
    count ++;
    if (count > max) {
      throw new Error(`XPath selector [${path}] not found.`)
    }

    if((await driver.findElements(By.xpath(path))).length > 0) {
      break
    }

    await sleep(interval);
  }
};

const takeScreenshot = async (driver, filename) => {
  const data = await driver.takeScreenshot();

  var base64Data = data.replace(/^data:image\/png;base64,/,"");
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, base64Data, 'base64', function(err) {
      if(err) {
        return reject(err);
      }
      return resolve();
    });
  })
}



const sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
};

module.exports = {
  waitUtilCssSelector,
  waitUtilXPathSelector,
  sleep
};