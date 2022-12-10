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

app.get("/menu", function (req, res) {
	res.render('menu.ejs', {
		name: "menu"
	});
});


app.listen(PORT, () => {
	console.log(`Le serv est lancé sur ${PORT}`);

});