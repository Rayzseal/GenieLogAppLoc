// Error flow of input errors
var input_error_flow = ''

// Export the `isEmpty` function
function isEmpty(str) {
  return typeof str === 'string' && (str === '' || !str.trim());
}

// Export the `checkInput` function
function checkInput(input) {
  let ret = isEmpty(input.value);
  if(ret)
  {
    input.className += ' input-error';
    input_error_flow += 'Le champ de text : ' + input.id + ' est vide.<br>';
  }
  else
    input.className = input.className.replace(/\binput-error\b/,'');
  return ret;
}

// Flush the flow and returns it 
function getErrorFlow()
{
  let ret = input_error_flow;
  input_error_flow = "";
  return ret;
}