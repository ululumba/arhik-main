// services/products-service/server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

let products = [
  { id: 1, title: 'Тестовый товар', price: 1000, stock: 5 }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const { title, price, stock } = req.body;
  const newProduct = { id: products.length + 1, title, price, stock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(4002, () => {
  console.log('✅ Products service running on http://localhost:4002');
});