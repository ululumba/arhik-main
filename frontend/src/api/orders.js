export const createOrder = (token, data) =>
  fetch('http://localhost:4003/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }).then(r => r.json());