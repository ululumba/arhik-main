const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// SQLite для Auth
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './users.sqlite'
});

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'user' }
}, { timestamps: false });

// Инициализация БД + создание админа
sequelize.sync().then(() => {
  User.findOrCreate({
    where: { email: 'admin@example.com' },
    defaults: {
      name: 'Admin',
      password: bcrypt.hashSync('admin123', 10),
      role: 'admin'
    }
  });
});

const JWT_SECRET = 'garden-secret';

// 1. Регистрация
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password and name are required' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash, name });
    res.status(201).json({ id: user.id, email: user.email, name: user.name });
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'User with this email already exists' });
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
});

// 2. Логин
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({
      accessToken: token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (e) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// 3. Профиль (для проверки токена)
app.get('/api/auth/me', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token missing' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (e) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
});

app.listen(4001, () => console.log('✅ Auth Service running on http://localhost:4001'));