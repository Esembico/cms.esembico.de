export default function getLabelText(label, data) {
  if (typeof label === 'function') {
    return label(data);
  }

  return label;
}
