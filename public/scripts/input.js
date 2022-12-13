function isEmpty(str)
{
  return typeof str === 'string' && (str === '' || !str.trim());
}

function checkInput(input)
{
  if(isEmpty(input.value))
    input.classList.add('input-error');
  else
    input.classList.remove('input-error');
}