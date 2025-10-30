const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/user.route'); // Certifique-se de ter este arquivo e caminho definidos corretamente

const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config(); // No topo do seu arquivo principal (por exemplo, app.js ou server.js)

// Middleware
app.use(cors());
app.use(express.json()); // Usando o middleware integrado do Express

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

// Routes
app.use('/api/auth', authRoutes); // Rotas de autenticação para inscrição e login
app.use('/api/routes', require('./routes/routes.route'));
app.use('/api/feedback', require('./routes/feedback.route'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// RotaLImpa