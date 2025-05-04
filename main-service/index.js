const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Inicialização
app.listen(port, () => console.log(`🚀 Servidor rodando na porta ${port}`));
