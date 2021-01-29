// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function getLabelText(label: any, data: any): any {
  if (typeof label === 'function') {
    return label(data);
  }

  return label;
}
