export default function getDisplayValue(obj: any, displayDefinition: any): any {
  if (!obj) {
    return '';
  }
  if (typeof obj !== 'object') {
    return obj;
  }
  if (typeof displayDefinition === 'string') {
    return obj[displayDefinition];
  }

  if (typeof displayDefinition === 'function') {
    return displayDefinition(obj);
  }

  return '';
}
