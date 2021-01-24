export function generateHeaders(token) {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  return headers;
}

export function fetchWrapper(url, options) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          res.json().then((json) => {
            reject({ status: res.status, message: json });
          });
          return;
        }
        if (res.status === 204) {
          resolve();
          return;
        }
        res.json().then((json) => {
          resolve(json);
        });
      })
      .catch(reject);
  });
}
