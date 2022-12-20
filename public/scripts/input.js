// Error flow of input errors
let input_error_flow = "";

function isEmpty(str) {
	return typeof str === "string" && (str === "" || !str.trim());
}

function checkInput(input) {
	let inputIsEmpty = isEmpty(input.value);

	if (inputIsEmpty) {
		input.className = "input-error";
		input_error_flow += `Le champ ${input.id} est vide.<br>`;
	} else {
      input.className = "";
    }

	return inputIsEmpty;
}

// Flush the flow and returns it 
function getErrorFlow() {
	let ret          = input_error_flow;
	input_error_flow = "";
	return ret;
}