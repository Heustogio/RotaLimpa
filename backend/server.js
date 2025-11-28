const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/user.route');

const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// ROTA RAIZ (corrige erro do Render)
app.get('/', (req, res) => {
  res.send("🚀 Backend RotaLimpa está online!");
});

// MongoDB conexão 
mongoose.connect('mongodb+srv://pasindu:pasindu@cluster0.gzomo.mongodb.net/garbageCollectionDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.log('MongoDB connection error:', error);
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/routes', require('./routes/routes.route'));
app.use('/api/feedback', require('./routes/feedback.route'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
