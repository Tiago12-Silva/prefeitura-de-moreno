const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./config/database');
const Meta = require('./models/Meta');
const metaController = require('./controller/metaController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servindo arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota inicial → redireciona para a tela de login (prefeitura2.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'prefeitura2.html'));
});

// Rota para tela inicial após login (prefeitura1.html)
app.get('/inicio', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'prefeitura1.html'));
});

// Rota para tela de metas (informacoes.html)
app.get('/metas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'informacoes.html'), {metas: []});
});

// API de Metas (CRUD)
app.get('/api/metas', metaController.listarMetas);
app.post('/api/metas', metaController.criarMeta);
app.put('/api/metas/:id', metaController.atualizarMeta);
app.delete('/api/metas/:id', metaController.deletarMeta);

// Inicia o servidor
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});