function removeRental(button, rentalId) {
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