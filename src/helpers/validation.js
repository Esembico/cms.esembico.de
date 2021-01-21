export function required(errors, name, data, property) {
  if (!data[property]) {
    if (!errors[property]) {
      errors[property] = [];
    }
    errors[property].push(`${name} is required`);
  }
}
