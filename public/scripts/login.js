const loginButton = document.getElementById("loginButton");

// On submit
loginButton.addEventListener("click", (ev) => {
	ev.preventDefault();
	let matricule = document.querySelector('#matricule');
	let password  = document.querySelector('#password');


	let result_matricule = checkInput(matricule);
	let result_password  = checkInput(password);
	if (result_matricule || result_password) {
		toaster.display(getErrorFlow(), 'var(--error-color)');
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
		).then( async function(res){
			const response = await res.json()
			if(response.success === true){
				document.location.href = '/home';
			}else{
				toaster.display(response.message, 'var(--error-color)');
			}
		}).catch(e => {
			toaster.display(e.message, 'var(--error-color)');
		});
	}
});