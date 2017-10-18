const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const authenticator = require('./authenticator');
const helpers = require('./helpers');

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.stack);
  throw error;
});

const selectGoogle = async (driver) => {
  await helpers.waitUtilCssSelector(driver, '.dropdown.more-actions a');

  await (await driver.findElement(By.css('.dropdown.more-actions a'))).click()
  await (await driver.findElement(By.css('.okta-dropdown-list span.mfa-google-auth-30'))).click()
};

async function signIn(driver) {
  await driver.findElement(By.css('#okta-signin-username')).sendKeys(process.env.OKTA_USERNAME)
  await driver.findElement(By.css('#okta-signin-password')).sendKeys(process.env.OKTA_PASSWORD)
  await driver.findElement(By.css(`#okta-signin-submit`)).click()
}
async function submitCode(driver) {
  const code = authenticator.generate();

  await driver.findElement(By.css('input[type=text]')).sendKeys(code);
  await driver.findElement(By.css('input[type=submit]')).click();
}

const main = (async () => {
  const driver = new webdriver.Builder().forBrowser('chrome').build();

  await driver.get(process.env.OKTA_URL);

  await signIn(driver);

  await selectGoogle(driver);

  await helpers.sleep(500);
  await submitCode(driver);
});

(async () => {
  main();
})();