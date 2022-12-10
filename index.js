"use strict"

const express = require("express");
const app = express();
const database = require("./lib/database");

const db = database.Database.load();

db.company.addEmploye(new database.Employe("Intel", "letnI", "zemodepasse"));
db.save();

const PORT = 3000;

app.use(express.static('public'));

app.get("/", function (req, res) {
	res.render('home.ejs', {
		name: "Teddyx"
	});
});

app.get("/newUser", function (req, res) {
	res.render('newUser.ejs', {
		
	});
});

app.get("/modifyUser", function (req, res) {
	res.render('modifyUser.ejs', {
		name : "Jean",
		surname : "Lasalle",
		email : "exemple@mail.com",
		mat : "1234ABC"
	});
});


app.listen(PORT, () => {
	console.log(`Le serv est lancé sur ${PORT}`);

});