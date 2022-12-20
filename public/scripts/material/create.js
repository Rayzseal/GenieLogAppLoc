// Fields
const titleField       = document.querySelector("#title");
const versionField     = document.querySelector("#version");
const referenceField   = document.querySelector("#reference");
const phoneNumberField = document.querySelector("#phoneNumber");

// Buttons
const saveButton = document.querySelector("#save");

saveButton.addEventListener("click", (ev) => {
	setFieldsDisableState(true);

	if (titleField.value.trim() === "") {
		setFieldsDisableState(false);
		return toaster.display("Le champ titre est requis", "var(--error-color)");
	}
	if (versionField.value.trim() === "") {
		setFieldsDisableState(false);
		return toaster.display("Le champ version est requis", "var(--error-color)");
	}
	if (referenceField.value.trim() === "") {
		setFieldsDisableState(false);
		return toaster.display("Le champ référence est requis", "var(--error-color)");
	}

	fetch("/material/create", {
			method: "POST",
			headers: {
				// "Content-Type": "application/x-www-form-urlencoded"
				"Content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify({
				title: titleField.value,
				version: versionField.value,
				reference: referenceField.value,
				picture: "",
				phoneNumber: phoneNumberField.value
			})
		}
	).then(async function (res) {
		const response = await res.json();

		console.log(response);
		if (response.success) {
			toaster.display("La matériel a bien été créé");
			setTimeout(() => window.location.href = `/material/${response.materialId}`, 1000);
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
	console.log(`Changing disable state to ${state}`);
	document.querySelectorAll("input, button").forEach(selector => selector.disabled = state);
}