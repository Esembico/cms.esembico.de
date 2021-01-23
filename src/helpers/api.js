export function generateHeaders(token) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  return headers;
}
