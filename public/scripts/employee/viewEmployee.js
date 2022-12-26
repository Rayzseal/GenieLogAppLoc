async function removeEmployee() {
	const popup = new Popup("Voulez-vous vraiment supprimer cet employé ?", "Toutes les réservations (en cours et terminées) seront supprimées également");
	if (await popup.ask()) {
		fetch("remove", {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				},
				body: JSON.stringify({
					force: true
				})
			}
		).then(async function (res) {
			const response = await res.json();

			if (!response.success)
				return toaster.display(response.message, "var(--error-color)");

			toaster.display("L'employé a bien été supprimé");
			setTimeout(() => window.location.href = `/employees/`, 1000);
		}).catch(e => {
			toaster.display(e.message, "var(--error-color)");
		});
	}
}

async function editPassword() {
	const popup  = new Popup("Veuillez saisir le nouveau mot de passe", "Ce mot de passe remplacera l'ancien qui deviendra ainsi inutilisable.");
	const answer = await popup.ask({
		inputs: [
			{ label: "Nouveau mot de passe", type: "password", id: "password" }
		]
	});

	if (!answer)
		return;
	console.log(answer);

	const newPassword = answer[0];
	if (newPassword.trim() === "")
		return toaster.display("Un nouveau mot de passe est requis", "var(--error-color)");

	if (newPassword) {
		fetch("resetPassword/", {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				},
				body: JSON.stringify({
					password: newPassword
				})
			}
		).then(async function (res) {
			const response = await res.json();

			if (!response.success)
				return toaster.display(response.message, "var(--error-color)");

			toaster.display("Le mot de passe a bien été mis à jour");
		}).catch(e => {
			toaster.display(e.message, "var(--error-color)");
		});
	}
}