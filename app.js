const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./config/database');
const Meta = require('./models/Meta');
const metaController = require('./controller/metaController');

// Middleware para parsear JSON e dados de formulário
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servindo arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rotas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'prefeitura2.html'));
});

app.get('/inicio', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'prefeitura1.html'));
});

app.get('/metas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'informacoes.html'));
});

// Rotas da API de Metas (CRUD)
app.get('/api/metas', metaController.listarMetas);         // Lista todas as metas
app.post('/api/metas', metaController.criarMeta);          // Cria uma nova meta
app.put('/api/metas/:id', metaController.atualizarMeta);   // Atualiza meta por ID
app.delete('/api/metas/:id', metaController.deletarMeta);  // Deleta meta por ID

// Sincroniza banco de dados (não bloqueia o servidor)
sequelize.sync()
  .then(() => {
    console.log('✅ Banco de dados sincronizado com sucesso.');
  })
  .catch((err) => {
    console.error('❌ Erro ao sincronizar banco de dados:', err);
  });

// Inicializa o servidor (acessível externamente na VPS)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
