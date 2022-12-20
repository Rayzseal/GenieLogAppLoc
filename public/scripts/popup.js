class Popup {
	constructor(txt) {
		this.popup       = document.querySelector(".popup"); // The modal element
		this.errorText   = document.querySelector(".popup .error-text"); // Error text container
		this.closeButton = document.querySelector(".popup .close"); // The <closeButton> element that closes the modal

		this.closeButton.onclick = this.close.bind(this);
		// When the user clicks anywhere outside the modal, close it
		window.onclick       = (event) => {
			if (event.target == this.popup)
				this.close();
		};

		this.setText(txt);
	}

	open() {
		this.popup.style.display = "flex";
	}

	close() {
		this.popup.style.display = "none";
	}

	// Sets modal error text
	setText(txt) {
		this.errorText.innerHTML = txt;
	}
}