const pool = require('../db');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

exports.getMedalhas = async (req, res) => {
  const result = await pool.query(
    `SELECT medalhas.*, olimpiadas.nome AS olimpiada_nome 
     FROM medalhas 
     JOIN olimpiadas ON medalhas.olimpiada_id = olimpiadas.id`
  );
  res.json(result.rows);
};

exports.createMedalha = async (req, res) => {
  const { olimpiada_id, ano, resultado, certificadoBase64, fileName } = req.body;

  // Upload do certificado
  const { data, error } = await supabase.storage
    .from('certificados')
    .upload(fileName, Buffer.from(certificadoBase64, 'base64'), {
      contentType: 'application/pdf'
    });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/certificados/${fileName}`;

  const result = await pool.query(
    'INSERT INTO medalhas (olimpiada_id, ano, resultado, certificado_url) VALUES ($1, $2, $3, $4) RETURNING *',
    [olimpiada_id, ano, resultado, url]
  );

  res.json(result.rows[0]);
};

exports.deleteMedalha = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM medalhas WHERE id = $1', [id]);
  res.json({ message: 'Medalha deletada' });
};
