const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './orders.sqlite'
});

const Order = sequelize.define('Order', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  total: { type: DataTypes.FLOAT, allowNull: false },
  address: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'created' }
}, { timestamps: false });

sequelize.sync();

const JWT_SECRET = 'garden-secret';

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    res.status(403).json({ error: 'Invalid token' });
  }
}

app.post('/api/orders', authenticateToken, async (req, res) => {
  const { items, total, address } = req.body;
  const order = await Order.create({
    userId: req.user.userId,
    total,
    address
  });
  res.status(201).json({ orderId: order.id, status: order.status });
});

app.listen(4003, () => console.log('✅ Orders on http://localhost:4003'));