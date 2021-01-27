export default function makeValidationErrorHandler(errors, data) {
  const required = (name, property) => {
    if (!data[property]) {
      if (!errors[property]) {
        errors[property] = [];
      }
      errors[property].push(`${name} is required`);
    }
  };

  const requireNumber = (name, property) => {
    const value = data[property];
    if (value && isNaN(value)) {
      if (!errors[property]) {
        errors[property] = [];
      }
      errors[property].push(`${name} should be a number`);
    }
  };

  const requireUrl = (name, property) => {
    const value = data[property];
    try {
      // eslint-disable-next-line no-new
      new URL(value, 'http://esembico.de');
    } catch {
      if (!errors[property]) {
        errors[property] = [];
      }
      errors[property].push(`${name} should be a valid url`);
    }
  };

  return { required, requireNumber, requireUrl };
}
