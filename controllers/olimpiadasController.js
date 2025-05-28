const pool = require('../db');

exports.getOlimpiadas = async (req, res) => {
  const result = await pool.query('SELECT * FROM olimpiadas');
  res.json(result.rows);
};

exports.createOlimpiada = async (req, res) => {
  const { nome, logo_url, materia } = req.body;
  const result = await pool.query(
    'INSERT INTO olimpiadas (nome, logo_url, materia) VALUES ($1, $2, $3) RETURNING *',
    [nome, logo_url, materia]
  );
  res.json(result.rows[0]);
};

exports.updateOlimpiada = async (req, res) => {
  const { id } = req.params;
  const { nome, logo_url, materia } = req.body;
  const result = await pool.query(
    'UPDATE olimpiadas SET nome = $1, logo_url = $2, materia = $3 WHERE id = $4 RETURNING *',
    [nome, logo_url, materia, id]
  );
  res.json(result.rows[0]);
};

exports.deleteOlimpiada = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM olimpiadas WHERE id = $1', [id]);
  res.json({ message: 'Olimpíada deletada' });
};
