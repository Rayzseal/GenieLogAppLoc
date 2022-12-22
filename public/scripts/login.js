const loginButton = document.getElementById("loginButton");

// On submit
loginButton.addEventListener("click", (ev) => {
	ev.preventDefault();
	let matricule = document.getElementById("matricule");
	let password  = document.getElementById("password");


	let result_matricule = checkInput(matricule);
	let result_password  = checkInput(password);
	if (result_matricule || result_password) {
		const errorPopup = new Popup(getErrorFlow());
		return errorPopup.open();
	}

	fetch(
		'/login',
		{
			method : 'POST',
			body : JSON.stringify({
				matricule : matricule.value,
				password : password.value
			})
		}
	).then(function(res){
		// If no error, redirect to app
		document.location.href = "/home";
	}).catch(function(res){
		console.log(res);
	});
});