const pool = require('../db');

exports.login = async (req, res) => {
  const { username, senha } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE username = $1 AND senha = $2',
      [username, senha]
    );

    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Login bem-sucedido' });
    } else {
      res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
