class Popup {
	constructor(title, description = "") {
		this.popup       = document.querySelector(".popup"); // The modal element
		this.title       = document.querySelector(".popup > div > p:first-of-type"); // Error text container
		this.description = document.querySelector(".popup > div > p:last-of-type"); // Error text container
		this.closeButton = document.querySelector(".popup span"); // The <closeButton> element that closes the modal
		this.buttons     = document.querySelectorAll(".popup button"); // The <closeButton> element that closes the modal

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

	async ask() {
		this.buttons.forEach(button => {
			button.style.display = "block";
		});
		this.open();
		return await new Promise((resolve) => {
			this.buttons[0].onclick = () => {
				resolve(false);
			}
			this.buttons[1].onclick = () => {
				resolve(true);
			}
		}).then(res => {
			this.buttons.forEach(b => b.onclick = undefined);
			this.close();
			return res;
		})
	}

	close() {
		this.popup.style.display = "none";
		this.buttons.forEach(button => {
			button.style.display = "none";
		});
	}

	// Sets modal error text
	setText(title, description) {
		this.title.innerHTML       = title;
		this.description.innerHTML = description;
	}
}