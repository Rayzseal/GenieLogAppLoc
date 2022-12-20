class Toast {
	constructor() {
		this.toast = document.createElement('div');
		this.toast.setAttribute('id', 'toast');

		document.querySelector('body').append(this.toast);
	}

	display(message, color="var(--success-color)") {
		this.toast.innerHTML = toast_structure
			.replace('%MESSAGE%', message)
			.replace('%COLOR%', color);
		this.toast.style.transform = "translateY(0)";

		setTimeout(() => {
			this.toast.style.transform = "";
		}, 5000);
	}
}

const toaster = new Toast();