// Fields
const employeeIdField   = document.querySelector("#employeeId");
const startingDateField = document.querySelector("#startingDate");
const endingDateField   = document.querySelector("#endingDate");
const rentalsTable      = document.querySelector("#rentals");

// Buttons
const addRentalButton = document.querySelector("#add_rental");

addRentalButton.addEventListener("click", () => {
	if (employeeIdField.value.trim() === "")
		return toaster.display("Un emprunteur est requis", "var(--error-color)");

	if (startingDateField.value.trim() === "")
		return toaster.display("Une date de début d'emprunt est requise", "var(--error-color)");

	if (endingDateField.value.trim() === "")
		return toaster.display("Une date de fin d'emprunt est requise", "var(--error-color)");

	fetch("/rental/create", {
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify({
				employeeId: employeeIdField.value,
				materialId: document.location.pathname.split('/')[2],
				startingDate: startingDateField.value,
				endingDate: endingDateField.value
			})
		}
	).then(async function (res) {
		const response = await res.json();

		if (!response.success)
			return toaster.display(response.message, "var(--error-color)");

		toaster.display("La réservation a bien été enregistrée");

		console.log(response.rental);
		const newRow     = document.createElement("tr");
		console.log(new Date(response.rental.endingDate));

		newRow.innerHTML = `<tr>
                                <td onclick="document.location.href='/employee/${response.rental.employee.id}'">${response.rental.employee.name}</td>
                                <td>${new Date(response.rental.startingDate).toLocaleDateString()}</td>
                                <td>${new Date(response.rental.endingDate).toLocaleDateString()}</td>
                                <td>
                                    <button title="Supprimer de l'historique" onclick="removeRental(this, '${response.rental.id}');">
                                        <img src="/public/icons/trash.png" alt="Icone de poubelle pour supprimer une réservation de l'historique"/>
                                    </button>
                                </td>
                            </tr>`;
		rentalsTable.appendChild(newRow);
	}).catch(e => {
		toaster.display(e.message, "var(--error-color)");
	});
});

async function removeMaterial() {
	const popup = new Popup("Voulez-vous vraiment supprimer ce matériel ?", "Toutes les réservations (en cours et terminées) seront supprimées également");
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

			toaster.display("Le matériel a bien été supprimé");
			setTimeout(() => window.location.href = `/materials/`, 1000);
		}).catch(e => {
			toaster.display(e.message, "var(--error-color)");
		});
	}
}