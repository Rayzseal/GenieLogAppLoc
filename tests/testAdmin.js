const webdriver = require("selenium-webdriver");
const assert       = require("assert").strict;

var driver;

describe('Display home page', function () {

    beforeEach(function (done) {

        this.timeout(30000);
        driver  = new webdriver.Builder().forBrowser('chrome').build();
        driver.get('http://localhost:3000');
        driver.getTitle().then(function(pageTitle) {
            console.log("The title is " + pageTitle);
        });

       done();
    });

    afterEach(function (done) {
       //driver.quit();
       done();
    });

    it("I open the  website", function(done) {
        driver.get("http:/localhost:3000");
        done();
    });

    it("The title is 'Page de connexion'", function(done) {
        // Since we want the title from the page, we need to manually handle the Promise
        driver.getTitle().then(function(title) {
            assert.equal(title, "Page de connexion");
        });
        done();
    });

    it('Test if tile page is corresponding to home page',function (done) {

        driver.get("http://localhost:3000").then(function() {
            return driver.findElement(By.id("matricule"));
        }).then(function(u) {
            return u.sendKeys("OCB1234");
        }).then(function() {
            return driver.findElement(By.id("password"));
        }).then(function(p) {
            return p.sendKeys("Azertyuiop1234");
        }).then(function() {
            return driver.findElement(By.id("loginButton"));
        }).then(function(loginBtn) {
            return loginBtn.click();
        });

        driver.getTitle().then(function(pageTitle) {
            console.log("The title is " + pageTitle);
        });

       done();
    });


});