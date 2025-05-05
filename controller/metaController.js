const Meta = require('../models/Meta');

// Lista todas as metas
exports.listarMetas = async (req, res) => {
  try {
    const metas = await Meta.findAll({ order: [['prazo', 'ASC']] });
    res.json(metas); // <-- retorna JSON
  } catch (error) {
    console.error('Erro ao listar metas:', error);
    res.status(500).send('Erro ao buscar metas');
  }
};

// Renderiza o formulário de criação
exports.exibirFormulario = (req, res) => {
  res.render('formulario'); // Você precisa ter uma view chamada 'formulario'
};

// Cria uma nova meta
exports.criarMeta = async (req, res) => {
  try {
    const { acao, prazo, executor, responsavel, status } = req.body;
    const novaMeta = await Meta.create({
      acao,
      prazo,
      executor,
      responsavel,
      status: status === true || status === 'true'
    });
    res.status(201).json(novaMeta); // <-- RESPOSTA JSON
  } catch (error) {
    console.error('Erro ao criar meta:', error);
    res.status(500).send('Erro ao criar meta');
  }
};

// Atualiza uma meta existente
exports.atualizarMeta = async (req, res) => {
  try {
    const { id } = req.params;
    const { acao, prazo, executor, responsavel, status } = req.body;

    const meta = await Meta.findByPk(id);
    if (!meta) return res.status(404).send('Meta não encontrada');

    await meta.update({
      acao,
      prazo,
      executor,
      responsavel,
      status: status === true || status === 'true'
    });

    res.status(200).json(meta); // <-- RESPOSTA JSON
  } catch (error) {
    console.error('Erro ao atualizar meta:', error);
    res.status(500).send('Erro ao atualizar meta');
  }
};

// Deleta uma meta
exports.deletarMeta = async (req, res) => {
  try {
    const { id } = req.params;

    const meta = await Meta.findByPk(id);
    if (!meta) return res.status(404).send('Meta não encontrada');

    await meta.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar meta:', error);
    res.status(500).send('Erro ao deletar meta');
  }
};
