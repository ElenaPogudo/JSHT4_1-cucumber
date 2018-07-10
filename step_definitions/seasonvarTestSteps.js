const webdriver = require("selenium-webdriver");
const until = webdriver.until;

function createDriver() {
    const driver = new webdriver.Builder()
        .usingServer('http://localhost:4444/wd/hub')
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
    driver.manage().timeouts().implicitlyWait(20000);
    driver.manage().window().maximize();
    return driver;
}


module.exports = function () {

    this.When(/^I log in using Username as "([^"]*)" and Password as "([^"]*)"$/, (login, password) => {

        const browser = createDriver();
        return browser.get('http://www.seasonvar.ru/').then(() => {
            return browser.findElement(webdriver.By.xpath('/html/body/div[@class=\'wrapper\']/header[@class=\'header\']/div[@class=\'header_line\']/div[@class=\'headblock headblock-menu\']/a[@class=\'btn head-btn\'][1]')).click()
        }).then(() => {
            return browser.findElement(webdriver.By.name('login')).sendKeys(login)
        }).then(() => {
            return browser.findElement(webdriver.By.name('password')).sendKeys(password);
        }).then(() => {
            return browser.findElement(webdriver.By.css('div.loginbox-login > button.btn')).click();
        })
    })

    this.Then(/^there should appear an element containing "([^"]*)" text$/, (keywords) => {
        return browser.findElement(webdriver.By.xpath("/html/body/div[@class='wrapper']/header[@class='header']/div[@class='header_line']/div[@class='headblock headblock-menu']")).then((el) => {
            el.getText().then(function (text) {
                console.log(text);
            });
        });
    })

    this.When(/^I go back$/, () => {
        browser.navigate().back();
    })

    this.When(/^I input "([^"]*)" in searching field$/, (sometext) => {
        return browser.findElement(webdriver.By.name("q")).then((el) => {
            el.clear();
            return el.sendKeys(sometext);
        })
    })

    this.When(/^I push search button$/, () => {
        return browser.findElement(webdriver.By.xpath("/html/body/div[@class='wrapper']/header[@class='header']/div[@class='header_line']/form[@id='hsearch']/button[@class='btn head-btn']")).click();
    })

    this.Then(/^I should be on the searching results page where should be element with text 'Найдено по запросу 'some text': number of results'$/, () => {
        return browser.wait(until.elementLocated(webdriver.By.css("div.pgs-search-title")), 2000).then((el) => {
            el.getText().then(function (text) {
                console.log(text);
            });
        });
    })

    this.When(/^I push on vk icon on site$/, () => {
        return browser.findElement(webdriver.By.className("header_icon-vkontakte")).click();
    })

    this.Then(/^I should be on the vk site, seasonvar page$/, () => {
            browser.getTitle().then(function (title) {
                console.log('Current Page Title: ' + title);
            });
    })
};