const express = require("express");
const app     = express();

const PORT = 3000;

app.use(express.static('public'));

app.get("/", function (req, res) {
	res.render('home.ejs', {
		name: "Teddyx"
	});
});



app.listen(PORT, () => {
	console.log(`Le serv est lancé sur ${PORT}`);
});