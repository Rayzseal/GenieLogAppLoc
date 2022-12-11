const loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', (ev) => {
	ev.preventDefault();
	window.location.href = "/home";
});