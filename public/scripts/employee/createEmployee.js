// Fields
const nameField      = document.querySelector("#name");
const surnameField   = document.querySelector("#surname");
const emailField     = document.querySelector("#email");
const matriculeField = document.querySelector("#matricule");
const passwordField  = document.querySelector("#password");

// Buttons
const saveButton = document.querySelector("#save");

saveButton.addEventListener("click", () => {
	setFieldsDisableState(true);

	if (nameField.value.trim() === "") {
		setFieldsDisableState(false);
		return toaster.display("Un prénom est requis", "var(--error-color)");
	}
	if (surnameField.value.trim() === "") {
		setFieldsDisableState(false);
		return toaster.display("Un nom de famille est requis", "var(--error-color)");
	}
	if (emailField.value.trim() === "") {
		setFieldsDisableState(false);
		return toaster.display("Une adresse email est requise", "var(--error-color)");
	}
	if (matriculeField.value.trim() === "") {
		setFieldsDisableState(false);
		return toaster.display("Un matricule est requis", "var(--error-color)");
	}
	if (passwordField.value.trim() === "") {
		setFieldsDisableState(false);
		return toaster.display("Un mot de passe est requis", "var(--error-color)");
	}

	fetch("/employee/create", {
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify({
				name: nameField.value,
				surname: surnameField.value,
				email: emailField.value,
				matricule: matriculeField.value,
				password: passwordField.value
			})
		}
	).then(async function (res) {
		const response = await res.json();

		if (response.success) {
			toaster.display("L'employé a bien été créé");
			setTimeout(() => window.location.href = `/employee/${response.employeeId}`, 1000);
		} else {
			toaster.display(response.message, "var(--error-color)");
			setFieldsDisableState(false);
		}
	}).catch(e => {
		toaster.display(e.message, "var(--error-color)");
		setFieldsDisableState(false);
	});
});

function setFieldsDisableState(state) {
	document.querySelectorAll("input, button").forEach(selector => selector.disabled = state);
}