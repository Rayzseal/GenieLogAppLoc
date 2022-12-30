const webdriver = require("selenium-webdriver");
const assert       = require("assert").strict;
const { Builder, By, Key } = require("selenium-webdriver");
//var driver;

describe("Home page", function () {

    it ("Verify title home page", async function() {
        //open Chrome browser
        let driver = await new webdriver.Builder().forBrowser("chrome").build();
        try {
            //open the website
            await driver.get("http://localhost:3000");

            //get the title of the page
            let titlePage = await driver
                .getTitle();

            //assert that the title page's text is the same as the text "Page de connexion"
            assert.equal(titlePage, "Page de connexion");
        } finally {
            //close the browser
            await driver.quit();
        }
    });

    it("Admin connection", async function () {
        //open Chrome browser
        let driver = await new webdriver.Builder().forBrowser("chrome").build();

        try {
            //open the website
            await driver.get("http://localhost:3000");

            //find the input matricule box
            await driver
                .findElement(By.xpath('//*[@id="matricule"]'))
                .sendKeys("OCB1234", Key.RETURN);

            //find the input password box
            await driver
                .findElement(By.xpath('//*[@id="password"]'))
                .sendKeys("Azertyuiop1234", Key.RETURN);


            //find the input password box
            let note = await driver
                .findElement(By.xpath('//html/body/main/h6'))
                .getText();



            //assert that the title page's text is the same as the text "(ADMINISTRATEUR)"
            assert.equal(note, "(ADMINISTRATEUR)");
        } finally {
            //close the browser
            await driver.quit();
        }
    });

    it("Simple user connection", async function () {
        //open Chrome browser
        let driver = await new webdriver.Builder().forBrowser("chrome").build();

        try {
            //open the website
            await driver.get("http://localhost:3000");

            //find the input matricule box
            await driver
                .findElement(By.xpath('//*[@id="matricule"]'))
                .sendKeys("JDZ5391", Key.RETURN);

            //find the input password box
            await driver
                .findElement(By.xpath('//*[@id="password"]'))
                .sendKeys("Azertyuiop1234", Key.RETURN);


            //find the input password box
            let note = await driver
                .findElement(By.xpath('//html/body/main/h6'))
                .getText();



            //assert that the title page's text is the same as the text "(NON ADMINISTRATEUR)"
            assert.equal(note, "(NON ADMINISTRATEUR)");
        } finally {
            //close the browser
            await driver.quit();
        }
    });
});

describe("Admin home page", function () {
    describe ("Employees", function() {

        let driver

        beforeEach( async  function() {
            //open Chrome browser
            driver = await new webdriver.Builder().forBrowser("chrome").build();


            //open the website
            await driver.get("http://localhost:3000");

            //find the input matricule box
            await driver
                .findElement(By.xpath('//*[@id="matricule"]'))
                .sendKeys("OCB1234", Key.RETURN);

            //find the input password box
            await driver
                .findElement(By.xpath('//*[@id="password"]'))
                .sendKeys("Azertyuiop1234", Key.RETURN);

            await driver
                .findElement(By.xpath('//html/body/header/menu/li[3]/a'))
                .sendKeys("", Key.ENTER);

        });

        afterEach(async function ( ) {
            await driver.quit();
        });

        it("Number of employees", async function ( ) {

            let count = 0;
            count = await driver
                .findElements(By.xpath('//html/body/main/section/ul/li'))
                .then(elements => elements.length);

            //assert that the title page's text is the same as the text "(NON ADMINISTRATEUR)"
            assert.equal(count,3);

        });

        it("Add a new employee", async function () {


        });

        it("Add an admin employee", async function () {


        });


        it("Modify an employee", async function () {


        });

        it("Modify an employee --> employee is now an admin", async function () {


        });

        it("Deleting an employee", async function () {


        });

        it("Deleting admin employee", async function () {


        });

        it("Deleting last admin employee", async function () {


        });

    });
    describe ("Materials", function() {

    });
});
