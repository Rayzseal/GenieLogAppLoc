// Export the `isEmpty` function
function isEmpty(str) {
  return typeof str === 'string' && (str === '' || !str.trim());
}

// Export the `checkInput` function
function checkInput(input) {
  let ret = isEmpty(input.value);
  if(ret)
    input.className += ' input-error';
  else
    input.className = input.className.replace(/\binput-error\b/,'');
  return ret;
}