// Fields
const phoneNumberField = document.querySelector("#phoneNumber");
const referenceField   = document.querySelector("#reference");
const versionField     = document.querySelector("#version");
const titleField       = document.querySelector("#title");
const imageField       = document.querySelector("#image");
const imagePreview     = document.querySelector("#image_preview");

// Buttons
const saveButton = document.querySelector("#save");

imageField.addEventListener("change", () => {
	imagePreview.src = imageField.value;
});

saveButton.addEventListener("click", () => {
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

	// No url specified because it is the same url with a POST method
	fetch("", {
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify({
				title: titleField.value,
				version: versionField.value,
				reference: referenceField.value,
				picture: imageField.value,
				phoneNumber: phoneNumberField.value
			})
		}
	).then(async function (res) {
		const response = await res.json();

		if (response.success) {
			toaster.display("Les modifications ont bien été enregistrées");
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
	document.querySelectorAll("input, button").forEach(selector => selector.disabled = state);
}