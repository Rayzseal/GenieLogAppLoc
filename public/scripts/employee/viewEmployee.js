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