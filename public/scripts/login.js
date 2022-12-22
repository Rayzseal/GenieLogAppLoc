const loginButton = document.getElementById("loginButton");

// On submit
loginButton.addEventListener("click", (ev) => {
	ev.preventDefault();
	let matricule = document.querySelector('#matricule');
	let password  = document.querySelector('#password');


	let result_matricule = checkInput(matricule);
	let result_password  = checkInput(password);
	if (result_matricule || result_password) {
		toaster.display(getErrorFlow(), 'orange');
	}
	else{
		fetch(
			'/login',
			{
				method : 'POST',
				headers: {'Content-Type': 'application/json'},
				body : JSON.stringify({
					matricule : matricule.value,
					password : password.value
				})
			}
		).then(function(res){
			// If no error, redirect to app
			document.location.href = '/home';
		}).catch(function(res){
			toaster.display('La requête n\'a pas aboutie');
		});
	}
});