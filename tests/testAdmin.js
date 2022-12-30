const assert = require("assert").strict;
const { Builder, By, Key } = require("selenium-webdriver");
const { Database } = require("../lib/Database")
const { copyFileSync } = require("fs");
const { setTimeout } = require("timers/promises");
//var driver;

describe("Home page", function () {
    // Setup server
    before("Start the test server", async function () {
        // HACK: Due to the way the server is made, there is no clean way to start a custom server for the tests.
        //       But what we can do is to start the server while overriding some values, and hope that it works.
        process.env.PORT = "5555";

        // Start server
        require("../index")

        // Override server database with the test one.
        copyFileSync("tests/db_original.json", "tests/db.json");
        global.database = Database.load("tests/db.json");

        // Wait, to make "almost" sure that the socket is bound.
        await setTimeout(1000);
    })

    it("Verify title home page", async function () {
        //open Chrome browser
        let driver = await new Builder().forBrowser("chrome").build();
        try {
            //open the website
            await driver.get("http://localhost:5555");

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
        let driver = await new Builder().forBrowser("chrome").build();

        try {
            //open the website
            await driver.get("http://localhost:5555");

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
        let driver = await new Builder().forBrowser("chrome").build();

        try {
            //open the website
            await driver.get("http://localhost:5555");

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
    describe("Employees", function () {

        let driver

        beforeEach(async function () {
            //open Chrome browser
            driver = await new Builder().forBrowser("chrome").build();


            //open the website
            await driver.get("http://localhost:5555");

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

        afterEach(async function () {
            await driver.quit();
        });

        it("Number of employees", async function () {

            let count = 0;
            count = await driver
                .findElements(By.xpath('//html/body/main/section/ul/li'))
                .then(elements => elements.length);

            //assert that the title page's text is the same as the text "(NON ADMINISTRATEUR)"
            assert.equal(count, 3);

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
    describe("Materials", function () {

    });

    this.afterAll(function () {
        // Make sure that the server doesn't outlive tests.
        global.serverHandle.close();
    })
});
