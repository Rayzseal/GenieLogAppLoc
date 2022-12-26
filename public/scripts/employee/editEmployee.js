// Fields
const nameField      = document.querySelector("#name");
const surnameField   = document.querySelector("#surname");
const emailField     = document.querySelector("#email");
const matriculeField = document.querySelector("#matricule");

// Buttons
const saveButton    = document.querySelector("#save");
const isAdminButton = document.querySelector("#role");

// Paragraph
const adminStatus = document.querySelector(".switch + p");

isAdminButton.addEventListener("change", (ev) => {
	if(isAdminButton.checked)
		adminStatus.innerHTML = "Administrateur";
	else
		adminStatus.innerHTML = "Emprunteur";
});

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

	// No url specified because it is the same url with a POST method
	fetch("", {
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify({
				name: nameField.value,
				surname: surnameField.value,
				email: emailField.value,
				matricule: matriculeField.value,
				isAdmin: isAdminButton.checked
			})
		}
	).then(async function (res) {
		const response = await res.json();
		console.log(response);

		if (response.success) {
			toaster.display("Les modifications ont bien été enregitrées");
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