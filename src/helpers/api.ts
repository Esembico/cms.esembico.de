export function generateHeaders(token: string): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  return headers;
}

export function fetchWrapper(url: string, options: RequestInit): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          res.json().then((json) => {
            reject({ status: res.status, message: json.detail });
          });
          return;
        }
        if (res.status === 204) {
          resolve(null);
          return;
        }
        res.json().then((json) => {
          resolve(json);
        });
      })
      .catch(reject);
  });
}
