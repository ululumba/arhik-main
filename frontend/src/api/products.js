export const getProducts = () =>
  fetch('http://localhost:4002/api/products').then(r => r.json());

export const getProduct = (id) =>
  fetch(`http://localhost:4002/api/products/${id}`).then(r => r.json());

export const createProduct = (token, data) =>
  fetch('http://localhost:4002/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }).then(r => r.json());