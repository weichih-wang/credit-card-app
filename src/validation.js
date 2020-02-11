export function validations(validation, value) {
  let nameRegex = /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/;
  switch (validation) {
    case 'name':
      if (!nameRegex.test(value)) {
        return 'Please enter a valid name';
      }
      break;
    case 'creditNum':
      if (value.length < 15 || value.length > 16 || isNaN(value)) {
        return 'Please enter a valid credit card number';
      }
      break;
    case 'cvv':
      if (value.length < 3 || value.length > 5 || isNaN(value)) {
        return 'Please enter a valid CVV number';
      }
      break;
    case 'year':
      if (isNaN(value) || parseInt(value) < 1900 || parseInt(value) > 2100) {
        return 'Please enter a valid year';
      }
      break;
    default:
      return '';
  }
  return '';
}
