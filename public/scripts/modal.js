// Get the modal
var modal = document.getElementById("modal-id");

// Error text container
var error_text_container = document.getElementById("modal-error-text");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Open the modal
function open_modal() {
  modal.style.display = "block";
}

// Close the modal
function close_modal() {
  modal.style.display = "none";
}
span.onclick = close_modal;

// Sets modal error text
function set_modal_text(txt){
  error_text_container.innerHTML = txt;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 