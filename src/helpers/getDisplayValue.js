export default function getDisplayValue(obj, displayDefinition) {
  if (typeof displayDefinition === "string") {
    return obj[displayDefinition];
  }

  if (typeof displayDefinition === "function") {
    return displayDefinition(obj);
  }

  return undefined;
}
