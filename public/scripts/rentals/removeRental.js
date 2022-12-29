const RENTAL_IS_FINISHED = -1;
const RENTAL_IS_ACTIVE = 0;
const RENTAL_IS_NOT_STARTED = 1;

async function removeRental(button, rentalId) {
	let popup;
	const rental = rentalsList.find(rental => rental.id === rentalId);

	if (!rental)
		return toaster.display("Impossible de supprimer cette réservation : l'identifiant donné ne correspond à aucune réservation.", "var(--error-color)");

	switch (getActiveState(rental)) {
		case RENTAL_IS_FINISHED:
			popup = new Popup("Voulez-vous vraiment supprimer cette réservation ?", "Celle-ci étant déjà terminée, elle disparaitra de l'historique des réservations.");
			break;
		case RENTAL_IS_ACTIVE:
			popup = new Popup("Attention, cette réservation est toujours active, voulez-vous tout de même la supprimer ?", "Assurez-vous que l'employé concerné par cette réservation ait bien rendue le matériel emprunté auparavant.");
			break;
		case RENTAL_IS_NOT_STARTED:
			popup = new Popup("Voulez-vous vraiment supprimer cette réservation ?", "Celle-ci n'étant pas encore débutée, l'employé concerné ne sera plus en capacité d'emprunter le matériel qui sera alors disponible pour d'autres emprunts.");
			break;
		default:
			return toaster.display("Le statu d'activité de cette réservation n'est pas reconnue.", "var(--error-color)");
	}

	if (await popup.ask()) {
		fetch("/rental/remove", {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				},
				body: JSON.stringify({
					rentalId: rentalId
				})
			}
		).then(async function (res) {
			const response = await res.json();

			if (!response.success)
				return toaster.display(response.message, "var(--error-color)");

			toaster.display("La réservation a bien été supprimée");

			button.parentNode.parentNode.remove(); // Remove the line
		}).catch(e => {
			toaster.display(e.message, "var(--error-color)");
		});
	}
}

function getActiveState(rental) {
	const today = new Date().setHours(1, 0, 0, 0);
	const starting = new Date(rental.startingDate);
	const ending = new Date(rental.endingDate);

	if (starting.getTime() <= today && today <= ending.getTime())
		return RENTAL_IS_ACTIVE;
	if (today > ending.getTime())
		return RENTAL_IS_FINISHED;
	if (today < starting.getTime())
		return RENTAL_IS_NOT_STARTED;
}