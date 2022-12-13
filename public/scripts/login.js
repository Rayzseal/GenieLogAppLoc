const loginButton = document.getElementById('loginButton');

// On submit
loginButton.addEventListener('click', (ev) => {
	ev.preventDefault();
	let matricule = document.getElementById('matricule');
	let password = document.getElementById('password');

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
	});
});