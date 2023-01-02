const material_list = document.querySelector("ul")
const input = document.querySelector("#filter_input")

function isEmpty(str) {
	return typeof str === "string" && (str === "" || !str.trim());
}

function filter(text){
  var items = material_list.getElementsByTagName("li");
  for (i = 0; i < items.length; i++) {
    var content = items[i].querySelector(".material_title");
    if(!String(content.innerHTML).toLowerCase().includes(text.toLowerCase()))
      items[i].style.display = "none";
    else
      items[i].style.display = "";
  }
}

input.addEventListener("input", function(){
  filter(input.value);
});
