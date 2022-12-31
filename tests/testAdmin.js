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

            //assert that the number of employees is equal to 3.
            assert.equal(count, 3);

        });

        it("Add a new employee", async function () {

            //Go to create a new employee page
            await driver
                .findElement(By.xpath('//main/section/menu/li[2]/button'))
                .sendKeys("", Key.ENTER);

            //find the input name box
            await driver
                .findElement(By.xpath('//*[@id="name"]'))
                .sendKeys("Nicolas", Key.RETURN);

            //find the input surname box
            await driver
                .findElement(By.xpath('//*[@id="surname"]'))
                .sendKeys("Machin", Key.RETURN);

            //find the input email box
            await driver
                .findElement(By.xpath('//*[@id="email"]'))
                .sendKeys("nicole.machin@mail.com", Key.RETURN);

            //find the input matricule box
            await driver
                .findElement(By.xpath('//*[@id="matricule"]'))
                .sendKeys("POIU426", Key.RETURN);

            //find the input password box
            await driver
                .findElement(By.xpath('//*[@id="password"]'))
                .sendKeys("Azertyuiop1234", Key.RETURN);

            //Add a new employee
            await driver
                .findElement(By.xpath('//*[@id="save"]'))
                .sendKeys("", Key.ENTER);

            await driver
                .findElement(By.xpath('//html/body/header/menu/li[3]/a'))
                .sendKeys("", Key.ENTER);

            let count = 0;
            count = await driver
                .findElements(By.xpath('//html/body/main/section/ul/li'))
                .then(elements => elements.length);

            //assert that there is 4 employees
            assert.equal(count,4);


        });

        it("Add an admin employee", async function () {
            //Go to create a new employee page
            await driver
                .findElement(By.xpath('//main/section/menu/li[2]/button'))
                .sendKeys("", Key.ENTER);

            //find the input name box
            await driver
                .findElement(By.xpath('//*[@id="name"]'))
                .sendKeys("Patrice", Key.RETURN);

            //find the input surname box
            await driver
                .findElement(By.xpath('//*[@id="surname"]'))
                .sendKeys("Truc", Key.RETURN);

            //find the input email box
            await driver
                .findElement(By.xpath('//*[@id="email"]'))
                .sendKeys("patrice.truc@mail.com", Key.RETURN);

            //find the input matricule box
            await driver
                .findElement(By.xpath('//*[@id="matricule"]'))
                .sendKeys("PATU653", Key.RETURN);

            //find the input password box
            await driver
                .findElement(By.xpath('//*[@id="password"]'))
                .sendKeys("Azertyuiop1234", Key.RETURN);

            //find the input password box
            await driver
                .findElement(By.xpath("//label[text()='Rôle sur la plateforme']")).click()

            //Add a new employee
            await driver
                .findElement(By.xpath('//*[@id="save"]'))
                .sendKeys("", Key.ENTER);

            await driver
                .findElement(By.xpath('//html/body/header/menu/li[3]/a'))
                .sendKeys("", Key.ENTER);

            let count = 0;
            count = await driver
                .findElements(By.xpath('//html/body/main/section/ul/li'))
                .then(elements => elements.length);

            //assert that there are 5 employees
            assert.equal(count,5);

        });


        it("Modify an employee", async function () {

            //Click on the employee to modify
            await driver
                .findElement(By.xpath('//main/section/ul/li[4]/div[2]/button'))
                .sendKeys("", Key.ENTER);

            //Click on modify button
            await driver
                .findElement(By.xpath('//main/section/section/div/section/ul/li[2]/button'))
                .sendKeys("", Key.ENTER);

            //Find the input matricule box
            await driver
                .findElement(By.xpath('//*[@id="matricule"]'))
                .clear();

            await driver
                .findElement(By.xpath('//*[@id="matricule"]'))
                .sendKeys("NEW6352", Key.RETURN);

            //Modify the new employee
            await driver
                .findElement(By.xpath('//*[@id="save"]'))
                .sendKeys("", Key.ENTER);

            await driver
                .findElement(By.xpath('//html/body/header/menu/li[3]/a'))
                .sendKeys("", Key.ENTER);

            await driver
                .findElement(By.xpath('//main/section/ul/li[4]/div[2]/button'))
                .sendKeys("", Key.ENTER);

            //Get the text content of the employee's "matricule"
            let text = await driver
                .findElement(By.xpath('//html/body/main/section/section/div/ul/li[3]/p'))
                .getText();


            //assert that the title page's text is the same as the text "NEW6352"
            assert.equal(text,"NEW6352");

        });

        it("Modify an employee --> employee is now an admin", async function () {

            //Click on the employee to modify
            await driver
                .findElement(By.xpath('//main/section/ul/li[4]/div[2]/button'))
                .sendKeys("", Key.ENTER);

            //Click on modify button
            await driver
                .findElement(By.xpath('//main/section/section/div/section/ul/li[2]/button'))
                .sendKeys("", Key.ENTER);

            //Change the role of the employee to admin
            await driver
                .findElement(By.xpath("//label[text()='Rôle sur la plateforme']")).click()

            //Modify the new employee
            await driver
                .findElement(By.xpath('//*[@id="save"]'))
                .sendKeys("", Key.ENTER);

            await driver
                .findElement(By.xpath('//html/body/header/menu/li[3]/a'))
                .sendKeys("", Key.ENTER);

            await driver
                .findElement(By.xpath('//main/section/ul/li[4]/div[2]/button'))
                .sendKeys("", Key.ENTER);

            //Get the text -- should be equal to 'administrateur'
            let text = await driver
                .findElement(By.xpath('//html/body/main/section/section/div/ul/li[2]/p'))
                .getText();


            //assert that the title page's text is the same as the text "Administrateur"
            assert.equal(text,"Administrateur");

        });

        it("Deleting an employee", async function () {

            //Click on the employee to delete
            await driver
                .findElement(By.xpath('//main/section/ul/li[4]/div[2]/button'))
                .sendKeys("", Key.ENTER);

            //Click on delete button
            await driver
                .findElement(By.xpath('//main/section/section/div/section/ul/li[3]/button'))
                .sendKeys("", Key.ENTER);

            //Click on confirm button
            await driver
                .findElement(By.xpath('//body/div/div/ul/li[2]/button'))
                .sendKeys("", Key.ENTER);

            await driver
                .findElement(By.xpath('//html/body/header/menu/li[3]/a'))
                .sendKeys("", Key.ENTER);

            let count = 0;
            count = await driver
                .findElements(By.xpath('//html/body/main/section/ul/li'))
                .then(elements => elements.length);

            //assert that there is 4 employees
            assert.equal(count,4);

        });

        it("Deleting admin employee", async function () {

            //Click on the employee to delete
            await driver
                .findElement(By.xpath('//main/section/ul/li[4]/div[2]/button'))
                .sendKeys("", Key.ENTER);

            //Click on delete button
            await driver
                .findElement(By.xpath('//main/section/section/div/section/ul/li[3]/button'))
                .sendKeys("", Key.ENTER);

            //Click on confirm button
            await driver
                .findElement(By.xpath('//body/div/div/ul/li[2]/button'))
                .sendKeys("", Key.ENTER);

            await driver
                .findElement(By.xpath('//html/body/header/menu/li[3]/a'))
                .sendKeys("", Key.ENTER);

            let count = 0;
            count = await driver
                .findElements(By.xpath('//html/body/main/section/ul/li'))
                .then(elements => elements.length);

            //assert that there is 3 employees
            assert.equal(count,3);

        });

        it("Deleting last admin employee", async function () {

            //Click on the employee to delete
            await driver
                .findElement(By.xpath('//main/section/ul/li[2]/div[2]/button'))
                .sendKeys("", Key.ENTER);

            //Click on delete button
            await driver
                .findElement(By.xpath('//main/section/section/div/section/ul/li[3]/button'))
                .sendKeys("", Key.ENTER);

            //Click on confirm button
            await driver
                .findElement(By.xpath('//body/div/div/ul/li[2]/button'))
                .sendKeys("", Key.ENTER);

            await driver
                .findElement(By.xpath('//html/body/header/menu/li[3]/a'))
                .sendKeys("", Key.ENTER);

            let count = 0;
            count = await driver
                .findElements(By.xpath('//html/body/main/section/ul/li'))
                .then(elements => elements.length);

            //assert that there is 3 employees -- Since it's the last admin, it should not be deleted, so we should still has 3 employees as before
            assert.equal(count,3);

        });

    });
    describe("Materials", function () {
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
                .findElement(By.xpath('//html/body/header/menu/li[2]/a'))
                .sendKeys("", Key.ENTER);

        });

        afterEach(async function () {
            await driver.quit();
        });

        it("Number of material", async function () {

            let count = 0;
            count = await driver
                .findElements(By.xpath('//html/body/main/section/ul/li'))
                .then(elements => elements.length);

            //assert that the title page's text is the same as the text "(NON ADMINISTRATEUR)"
            assert.equal(count, 3);
        });

        it("Adding a material", async function () {

            //Go to create a new material page
            await driver
                .findElement(By.xpath('//main/section/menu/li[2]/button'))
                .sendKeys("", Key.ENTER);

            //find the input title box
            await driver
                .findElement(By.xpath('//*[@id="title"]'))
                .sendKeys("Iphone10", Key.RETURN);

            //find the input version box
            await driver
                .findElement(By.xpath('//*[@id="version"]'))
                .sendKeys("V1.0", Key.RETURN);

            //find the input image box
            await driver
                .findElement(By.xpath('//*[@id="image"]'))
                .sendKeys("https://www.shutterstock.com/image-photo/new-york-usa-may-302018-260nw-1105180928.jpg", Key.RETURN);

            //find the input reference box
            await driver
                .findElement(By.xpath('//*[@id="reference"]'))
                .sendKeys("AP004", Key.RETURN);

            //find the input phone number box
            await driver
                .findElement(By.xpath('//*[@id="phoneNumber"]'))
                .sendKeys("0299765387", Key.RETURN);

            //Add a new material
            await driver
                .findElement(By.xpath('//*[@id="save"]'))
                .sendKeys("", Key.ENTER);

            await driver
                .findElement(By.xpath('//html/body/header/menu/li[2]/a'))
                .sendKeys("", Key.ENTER);

            let count = 0;
            count = await driver
                .findElements(By.xpath('//html/body/main/section/ul/li'))
                .then(elements => elements.length);

            //assert that there is 4 materials
            assert.equal(count,4);

        });

        it("Deleting a material", async function () {

            //Click on the material to delete
            await driver
                .findElement(By.xpath('//main/section/ul/li[4]/div[2]/button'))
                .sendKeys("", Key.ENTER);

            //Click on delete button
            await driver
                .findElement(By.xpath('//main/section/section/div/section/ul/li[2]/button'))
                .sendKeys("", Key.ENTER);

            //Click on confirm button
            await driver
                .findElement(By.xpath('//body/div/div/ul/li[2]/button'))
                .sendKeys("", Key.ENTER);

            await driver
                .findElement(By.xpath('//html/body/header/menu/li[2]/a'))
                .sendKeys("", Key.ENTER);

            let count = 0;
            count = await driver
                .findElements(By.xpath('//html/body/main/section/ul/li'))
                .then(elements => elements.length);

            //assert that there is 3 materials
            assert.equal(count,3);

        });

    });

    this.afterAll(function () {
        // Make sure that the server doesn't outlive tests.
        global.serverHandle.close();
    })
});
