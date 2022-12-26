class Popup {
	constructor(title, description = "") {
		this.popup       = document.querySelector(".popup"); // The modal element
		this.title       = document.querySelector(".popup > div > p:first-of-type"); // Error text container
		this.description = document.querySelector(".popup > div > p:last-of-type"); // Error text container
		this.closeButton = document.querySelector(".popup span"); // The <closeButton> element that closes the modal
		this.buttons     = document.querySelectorAll(".popup button"); // The <closeButton> element that closes the modal
		this.inputsList  = document.querySelector(".popup ol"); // The <closeButton> element that closes the modal

		this.closeButton.onclick = this.close.bind(this);
		// When the user clicks anywhere outside the modal, close it
		window.onclick           = (event) => {
			if (event.target == this.popup)
				this.close();
		};

		this.setText(title, description);
	}

	open() {
		this.popup.style.display = "flex";
	}

	async ask(options = {}) {
		// Display buttons
		this.buttons.forEach(button => {
			button.style.display = "block";
		});

		// Display potential inputs
		if (options.inputs)
			options.inputs.forEach(input => {
				const domElement     = document.createElement("li");
				domElement.innerHTML = `
					<label>${input.label}</label>
					<input type="${input.type ?? "text"}" id="${input.id}">
				`;
				this.inputsList.appendChild(domElement);
			});

		// Open the popup
		this.open();

		return await new Promise((resolve) => {
			this.buttons[0].onclick = () => {
				resolve(false);
			};
			this.buttons[1].onclick = () => {
				resolve(true);
			};
		}).then(res => {
			const inputValues = options.inputs.map(input => document.querySelector(`#${input.id}`)?.value);

			this.close();

			if (res && options.inputs)
				return inputValues;
			return res;
		});
	}

	close() {
		console.log("close");
		this.popup.style.display  = "none";
		this.inputsList.innerHTML = "";
		this.buttons.forEach(button => {
			button.onclick       = undefined;
			button.style.display = "none";
		});
	}

	// Sets modal error text
	setText(title, description) {
		this.title.innerHTML       = title;
		this.description.innerHTML = description;
	}
}