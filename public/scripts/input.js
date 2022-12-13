function isEmpty(str)
{
  return typeof str === 'string' && (str === '' || !str.trim());
}